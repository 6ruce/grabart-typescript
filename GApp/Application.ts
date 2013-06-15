/// <reference  path="UI/MainWidget.ts"                 />
/// <reference  path="UI/StartButton.ts"                />
/// <reference  path="UI/CopyButton.ts"                 />
/// <reference  path="UI/GrabProgress.ts"               />
/// <reference  path="UI/Layers.ts"                     />
/// <reference  path="UI/Grid.ts"                       />
/// <reference  path="Config.ts"                        />
/// <reference_ path="../jquery.d.ts"                   />
/// <reference  path="../UI/Services/Application.ts"    />

module GrabArt.GApp {
    export class Application extends GrabArt.UI.Services.Application {
        private mainWindow  = new GrabArt.GApp.UI.MainWidget();
        private startButton = new GrabArt.GApp.UI.StartButton();
        private copyButton  = new GrabArt.GApp.UI.CopyButton();
        private progressBar = new GrabArt.GApp.UI.GrabProgress();
        private layers      = new GrabArt.GApp.UI.Layers();
        private grid        = new GrabArt.GApp.UI.Grid(20, 10);

        main() : void {
            this.mainWindow.addWidget(this.startButton)
                           .addWidget(this.copyButton)
                           .addWidget(this.progressBar)
                           .addWidget(this.grid)
                           .addWidget(this.layers);

            this.grid.activateCell(2, 2);
            this.grid.selectCell(4, 4);
            this.mainWindow.enableDragging();

            this.layers.addLayer({w: 10, h: 10});
            this.layers.addLayer({w: 11, h: 330});
            this.layers.addLayer({w: 123, h: 330});
            this.layers.addLayer({w: 136456, h: 330});
            this.layers.addLayer({w: 17856, h: 330});
            this.layers.setSelectedLayer(10);

            this.applyColorScheme().wireEvents();
            this.setMainWidget(this.mainWindow);
        }

        grid_Resize_GetCallback() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.mainWindow.resize(args.dw, args.dh);
                this.copyButton.resize(args.dw, 0);
                this.progressBar.resize(args.dw, 0);
                this.layers.resize(args.dw, 0);
                this.mainWindow.redraw();
            };
        }

        startButton_Click_GetCallback() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.grid.setGridDimensions(200, 100).redraw();
            };
        }

        copyButton_Click_GetCallback() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.progressBar.increase(10).redraw();
            };
        }

        layers_Resize_GetCallback() : (sender : Object, args : any) => void {
            return (sender, args) => {
                console.log('dw:' + args.dw + ' dh:' + args.dh);
                this.grid.moveOn(args.dw, args.dh);
                this.mainWindow.resize(args.dw, args.dh).redraw();
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
            this.copyButton.Click.addListener(this.copyButton_Click_GetCallback());
            this.layers.Resize.addListener(this.layers_Resize_GetCallback());
            return this;
        }
    }
}