/// <reference path="GApp/UI/MainWidget.ts" />
/// <reference path="jquery.d.ts" />

module GrabArt {
    export class Application {
        constructor(private page){}

        run () : void {
            var mainWindow = new GrabArt.GApp.UI.MainWidget('main');
            mainWindow.addWidget(
                new GrabArt.UI.Widget('test')
                    .setBackgroundColor('red')
            );

            $(this.page).append(mainWindow.draw());
        }
    }
}