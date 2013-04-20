/// <reference path="Widget.ts" />

module GrabArt.UI {
    export class Button extends Widget {

        private basicColor    : string = 'aqua';
        private hoverColor    : string = 'blue';
        private pressedColor  : string = 'darkblue';
        private previousColor : string = '';

        constructor(name : string) {
            super(name);
            this.setBackgroundColor(this.basicColor);
            this.initInteractionEvents();
        }

        private initInteractionEvents() : void {
            var getChangeColorCallback = (color : string) => (_1, _2) => {
                this.previousColor = this.getBackgroundColor();
                this.setBackgroundColor(color);
                this.redraw();
            };
            var getBackColorCallback = (color : string) => (_1, _2) => {
                this.setBackgroundColor(
                    this.previousColor != '' ? this.previousColor : color
                );
                this.redraw();
            };

            this.MouseOver.addListener(getChangeColorCallback(this.hoverColor));
            this.MouseDown.addListener(getChangeColorCallback(this.pressedColor));
            this.MouseLeave.addListener(getChangeColorCallback(this.basicColor));

            this.MouseUp.addListener(getBackColorCallback(this.basicColor));

        }
    }
}