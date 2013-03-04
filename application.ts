/// <reference path="UI/widgetContainer.ts" />

module GrabArt {
    export class Application {

        run () : void {
            var container = this.configureWidgets(new UI.WidgetContainer());

        }

        configureWidgets(wc : UI.WidgetContainer) : UI.WidgetContainer {
            return wc;
        }
    }
}