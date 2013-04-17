/// <reference path="UI/WidgetContainer.ts" />
/// <reference path="jquery.d.ts" />

module GrabArt {
    export class Application {
        constructor(private page){}

        run () : void {
            $(this.page).append(new GrabArt.UI.Widget('main').draw());
        }
    }
}