/// <reference  path="UI/MainWidget.ts"      />
/// <reference  path="UI/StartButton.ts"     />
/// <reference  path="UI/CopyButton.ts"      />
/// <reference  path="UI/GrabProgress.ts"    />
/// <reference  path="UI/Grid.ts"            />
/// <reference  path="Config.ts"             />
/// <reference  path="../Core/Console.ts"    />
/// <reference_ path="../jquery.d.ts"        />

module GrabArt.GApp {
    declare var $;
    export class Application {
        private mainWindow  = new GrabArt.GApp.UI.MainWidget();
        private startButton = new GrabArt.GApp.UI.StartButton();
        private copyButton  = new GrabArt.GApp.UI.CopyButton();
        private progressBar = new GrabArt.GApp.UI.GrabProgress();
        private grid        = new GrabArt.GApp.UI.Grid(20, 10);

        constructor(private page){}

        main() : void {
            this.mainWindow.addWidget(this.startButton)
                           .addWidget(this.copyButton)
                           .addWidget(this.progressBar)
                           .addWidget(this.grid);

            this.grid.activateCell(2, 2);
            this.mainWindow.enableDragging();


            this.applyColorScheme().wireEvents();
            $(this.page).append(this.mainWindow.draw());
        }

        grid_Resize_GetCallback() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.mainWindow.resize(args.dw, args.dh);
                this.copyButton.resize(args.dw, 0);
                this.progressBar.resize(args.dw, 0);
                this.mainWindow.redraw();
            };
        }

        startButton_Click_GetCallback() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.grid.setGridDimensions(200, 100).redraw();
            };
        }

        private applyColorScheme() : Application {
            var colorScheme = GrabArt.GApp.Config.colorScheme;
            this.mainWindow.setBackgroundColor(colorScheme.mainWindowColor);

            this.startButton.setBasicColor(colorScheme.startButton.basicColor)
                            .setHoverColor(colorScheme.startButton.hoverColor)
                            .setPressedColor(colorScheme.startButton.pressedColor);

            this.copyButton.setBasicColor(colorScheme.startButton.basicColor)
                           .setHoverColor(colorScheme.startButton.hoverColor)
                           .setPressedColor(colorScheme.startButton.pressedColor)

            this.progressBar.setBarColor(colorScheme.progressBar.barColor)
                            .setBackgroundColor(colorScheme.progressBar.backColor);

            this.grid.setActiveColor(colorScheme.grid.activeColor)
                     .setRegularColor(colorScheme.grid.regularColor)
                     .setBackgroundColor(colorScheme.mainWindowColor);

            return this;
        }

        private wireEvents() : Application {
            this.grid.Resize.addListener(this.grid_Resize_GetCallback());
            this.startButton.Click.addListener(this.startButton_Click_GetCallback());
            return this;
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