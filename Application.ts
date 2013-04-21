/// <reference  path="GApp/UI/MainWidget.ts"    />
/// <reference  path="GApp/UI/StartButton.ts"   />
/// <reference  path="GApp/UI/CopyButton.ts"    />
/// <reference  path="GApp/UI/GrabProgress.ts"  />
/// <reference  path="Core/Console.ts"          />
/// <reference_ path="jquery.d.ts"              />

module GrabArt {
    declare var $;
    export class Application {
        private mainWindow  = new GrabArt.GApp.UI.MainWidget();
        private startButton = new GrabArt.GApp.UI.StartButton();
        private copyButton  = new GrabArt.GApp.UI.CopyButton();
        private progressBar = new GrabArt.GApp.UI.GrabProgress();


        constructor(private page){}

        main() : void {
            this.mainWindow.addWidget(this.startButton)
                           .addWidget(this.copyButton)
                           .addWidget(this.progressBar);

            this.mainWindow.enableDragging();

            $(this.page).append(this.mainWindow.draw());
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