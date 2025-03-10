import { ModuleDir, ModuleFile } from "./module-types";
import { capitalize } from "./utils";

export function getModuleFolderStructure(moduleName: string, moduleContent: string): ModuleDir[] {
    const capitalizedModuleName = capitalize(moduleName);
    return [
        {
            name: moduleName,
            subDirs: [
                {
                    name: 'application',
                    subDirs: [
                        {name: 'types'} as ModuleDir,
                        {name: 'use-cases'} as ModuleDir,
                    ]
                } as ModuleDir,
                {
                    name: 'domain',
                    subDirs: [
                        {name: 'entities'} as ModuleDir,
                        {name: 'enums'} as ModuleDir,
                        {name: 'repositories'} as ModuleDir,
                    ]
                } as ModuleDir,
                {
                    name: 'infrastructure',
                    subDirs: [
                        {name: 'implementations'} as ModuleDir,
                        {name: 'dto'} as ModuleDir,
                    ]
                } as ModuleDir,
                {
                    name: 'presentation',
                    subDirs: [
                        {name: 'components'} as ModuleDir,
                        {name: 'screens'} as ModuleDir,
                        {name: 'store'} as ModuleDir,
                        {name: 'states'} as ModuleDir,
                    ]
                } as ModuleDir
            ],
            files: [
                {name: capitalizedModuleName+'Module.ts', content: moduleContent } as ModuleFile,
            ]
        } as ModuleDir
    ]
}