/// <reference path="dependencyContainer.ts" />
/// <reference path="UI/widgetContainer.ts" />

module GrabArt {
    export class Application {

        run () : void {
            var container = this.configureDependencies(new DependencyContainer());

            container.resolve(UI.WidgetContainer);
        }

        configureDependencies (dc : DependencyContainer ) : DependencyContainer {
            return dc;
        }
    }
}