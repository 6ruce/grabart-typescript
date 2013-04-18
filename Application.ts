/// <reference  path="GApp/UI/MainWidget.ts" />
/// <reference_ path="jquery.d.ts"           />

module GrabArt {
    declare var $;
    export class Application {
        constructor(private page){}

        run () : void {
            var mainWindow = new GrabArt.GApp.UI.MainWidget('main'),
                test       = new GrabArt.UI.Widget('test').setBackgroundColor('red')
                                                          .enableDragging()
            mainWindow.addWidget(test);
            //mainWindow.enableDragging();

            $(this.page).append(mainWindow.draw());
        }
    }
}