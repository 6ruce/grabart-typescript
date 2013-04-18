/// <reference path="Widget.ts" />

module GrabArt.UI {
    export class Button extends Widget {

        private basicColor   : string = 'aqua';
        private hoverColor   : string = 'blue';
        private pressedColor : string = 'darkblue';

        constructor(name : string) {
            super(name);
            this.setBackgroundColor(this.basicColor);
            this.initInteractionEvents();
        }

        private initInteractionEvents() : void {
            this.MouseOver.addListener((_1, _2) => {
                this.setBackgroundColor(this.hoverColor);
                this.redraw();
            });
            this.MouseLeave.addListener((_1, _2) => {
                this.setBackgroundColor(this.basicColor);
                this.redraw();
            });
        }
    }
}