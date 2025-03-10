
export function getModuleTemplate(moduleName: string) {
    return `import { getModuleContainer, module } from "inversiland";

@module({
  providers: [ 
    // TODO: add the providers here. 
  ],
})
export class ${moduleName}Module {}

export const ${moduleName.toLowerCase()}ModuleContainer = getModuleContainer(${moduleName}Module);`;

}