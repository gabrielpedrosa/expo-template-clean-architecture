export type ModuleFile = {
    name: string;
    content: string;
}

export type ModuleDir = {
    name: string;
    subDirs?: ModuleDir[];
    files?: ModuleFile[];
}
