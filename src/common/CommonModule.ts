import { getModuleContainer, module } from "inversiland";

@module({
  providers: [ 
    // TODO: add the providers here. 
  ],
})
export class CommonModule {}

export const commonModuleContainer = getModuleContainer(CommonModule);