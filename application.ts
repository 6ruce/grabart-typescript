/// <reference path="UI/widgetContainer.ts" />

module GrabArt {
    export class Application {

        run () : void {
            var container = this.configureWidgets(new UI.WidgetContainer());
            var test = "test";

        }

        configureWidgets(wc : UI.WidgetContainer) : UI.WidgetContainer {
            return wc;
        }
    }
}