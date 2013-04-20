/// <reference  path="GApp/UI/MainWidget.ts" />
/// <reference  path="UI/Button.ts"          />
/// <reference  path="Core/Console.ts"       />
/// <reference_ path="jquery.d.ts"           />

module GrabArt {
    declare var $;
    export class Application {
        constructor(private page){}

        main() : void {
            var mainWindow = new GrabArt.GApp.UI.MainWidget('main'),
                test       = new GrabArt.UI.Button('test');

            mainWindow.addWidget(test).enableDragging();

            $(this.page).append(mainWindow.draw());
        }

        run () : void {
            try {
                this.main();
            } catch (exc) {
                GrabArt.Core.Console.writeLine('Exception: ' + exc, 'red');
            }
        }
    }
}