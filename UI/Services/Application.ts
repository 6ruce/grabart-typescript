/// <reference path="../Widget.ts"         />
/// <reference path="../../Core/Console.ts"  />

module GrabArt.UI.Services {
    declare var $;
    export class Application {
        private mainWidget : GrabArt.UI.Widget = null;

        constructor(private page){}

        run () : void {
            try {
                this.main();
                if (this.mainWidget !== null) {
                    $(this.page).append(this.mainWidget.draw());
                }
            } catch (exc) {
                //console.log(exc);
                GrabArt.Core.Console.writeLine('Exception: ' + exc.stack, 'red');
            }
        }

        setMainWidget(widget : GrabArt.UI.Widget) : Application {
            if (widget == null) throw 'widget is null';
            this.mainWidget = widget;
            return this;
        }

        main() : void {}
    }
}