import { log } from 'console';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { getModuleTemplate } from './_resources/module-template';
import { ModuleDir, ModuleFile } from './_resources/module-types';
import { capitalize, removeSpecialChars } from './_resources/utils';
import { get } from 'http';
import { getModuleFolderStructure } from './_resources/module-folder-structure';


class PromptService {
    private rl: readline.Interface;

    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    ask(query: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(query, (answer) => resolve(answer));
        });
    }

    close(): void {
        this.rl.close();
    }
}

interface IFileService {
    baseDir: string;
    createDirectory(dirName: string): Promise<string>;
    createFile(directory: string, fileName: string, content: string): Promise<string>;
    deleteFile(filePath: string): Promise<void>;
}

class FileService implements IFileService {
    public baseDir: string;

    constructor(baseDir: string) {
        this.baseDir = baseDir;
    }

    async createDirectory(dirName: string): Promise<string> {
        const dirPath = path.join(this.baseDir, dirName);
        try {
            const stats = await fs.stat(dirPath);
            if (stats.isDirectory()) {
                console.log(`Diretório já existe: ${dirPath}`);
            } else {
                await fs.mkdir(dirPath, { recursive: true });
                console.log(`Diretório criado: ${dirPath}`);
            }
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.mkdir(dirPath, { recursive: true });
                console.log(`Diretório criado: ${dirPath}`);
            } else {
                throw error;
            }
        }
        return dirPath;
    }

    async createFile(directory: string, fileName: string, content: string): Promise<string> {
        const filePath = path.join(directory, fileName);
        try {
            await fs.stat(filePath);
            console.log(`Arquivo já existe: ${filePath}`);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(filePath, content);
                console.log(`Arquivo criado: ${filePath}`);
            } else {
                throw error;
            }
        }
        return filePath;
    }

    async deleteFile(filePath: string): Promise<void> {
        try {
            await fs.unlink(filePath);
            console.log(`Arquivo apagado: ${filePath}`);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                console.log(`Arquivo para apagar não encontrado: ${filePath}`);
            } else {
                throw error;
            }
        }
    }
}

async function createModule(
    fileService: IFileService,
    dir: ModuleDir,
    parentPath?: string,
): Promise<void> {

    const newPath = parentPath && path.join(parentPath, dir.name) || dir.name;

    const currentDir = await fileService.createDirectory(newPath);

    // Cria os arquivos, se existirem
    if (dir.files?.length) {
        for (const file of dir.files) {
            // Você pode definir um conteúdo padrão ou personalizado para o arquivo, aqui usamos um conteúdo vazio
            await fileService.createFile(currentDir, file.name, file.content);
        }
    }

    // Se houver subdiretórios, chama a função recursivamente
    if (dir.subDirs?.length) {
        for (const subDir of dir.subDirs) {
            await createModule(fileService, subDir, newPath);
        }
    }
}

async function addImport(content: string, moduleName: string, moduleFile: string): Promise<string> {
    // Adiciona import do ${moduleName}Module, se não existir
    if (!content.includes(moduleName)) {
        const lines = content.split("\n");
        let lastImportIndex = -1;
        lines.forEach((line, index) => {
            if (line.startsWith("import")) {
                lastImportIndex = index;
            }
        });
        
        lines.splice(lastImportIndex + 1, 0, `import { ${moduleFile} } from "./${moduleName}/${moduleFile}";`);
        content = lines.join("\n");
    }
    return content;

}

async function updateAppModule(fileService: IFileService, moduleName: string): Promise<void> {
    const appModulePath = path.join(fileService.baseDir, "AppModule.ts");
    let content = await fs.readFile(appModulePath, 'utf8');

    let moduleFile = capitalize(moduleName)+'Module';

    content = await addImport(content, moduleName, moduleFile);

    // Atualiza o array de imports no decorator @module
    const importsRegex = /imports:\s*\[((?:.|\n)*?)\]/m;
    const match = content.match(importsRegex);
    if (match) {
        let importsContent = match[1].trim();
        if (!importsContent.includes(moduleFile)) {
            // Adiciona vírgula se necessário
            if (importsContent.length > 0) {
                importsContent += ", "+moduleFile;
            } else {
                importsContent = moduleFile;
            }
            content = content.replace(importsRegex, `imports: [${importsContent}]`);
        }
    } else {
        console.error("Não foi possível encontrar o array de imports no decorator");
    }

    await fs.writeFile(appModulePath, content);
    console.log(`AppModule.ts atualizado com CommonModule`);
}

async function main(): Promise<void> {
    const promptService = new PromptService();
    let moduleName = (await promptService.ask('Digite o nome do módulo: ')).toLowerCase();
    promptService.close();
    moduleName = removeSpecialChars(moduleName);

    const moduleContent = getModuleTemplate(capitalize(moduleName));
    
    const modulesDirs = getModuleFolderStructure(moduleName, moduleContent);

    const baseDir = "src/";
    const fileService = new FileService(baseDir);

    try {
        for (const moduleDir of modulesDirs) {
            await createModule(fileService, moduleDir);
        }

        await updateAppModule(fileService, moduleName);
    } catch (error) {
        console.error(`Ocorreu um erro: ${error}`);
    }
}

main();