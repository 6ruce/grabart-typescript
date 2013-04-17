/// <reference  path="GApp/UI/MainWidget.ts" />
/// <reference_ path="jquery.d.ts"           />

module GrabArt {
    declare var $;
    export class Application {
        constructor(private page){}

        run () : void {
            var mainWindow = new GrabArt.GApp.UI.MainWidget('main');
            mainWindow.addWidget(
                new GrabArt.UI.Widget('test')
                    .setBackgroundColor('red')
            );

            mainWindow.MouseMove.addListener((sender, args) => { console.log(args);});

            $(this.page).append(mainWindow.draw());
        }
    }
}