import { module } from "inversiland";
import { CoreModule } from "./core/CoreModule";
import { CommonModule } from "./common/CommonModule";

/**
 * Decorador @module para definir o módulo principal da aplicação.
 * O módulo principal importa outros módulos que serão usados na aplicação.
 */
@module({
  imports: [CoreModule, CommonModule],
})
export default class AppModule {}