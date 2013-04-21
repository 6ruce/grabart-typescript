/// <reference path="Widget.ts" />

module GrabArt.UI {
    declare var $;
    export class ProgressBar extends Widget {
        private progress : number = 50;
        private barColor : string = 'red';

        constructor(name : string) {
            super(name);
            this.setSizes({w: 100, h: 20});
        }

        draw() : any {
            var domElement = super.draw();
            this.refreshCanvasSizes(domElement);
            this.refreshProgress(domElement);
            return domElement;
        }

        redraw() : void {
            super.redraw();
            this.refreshCanvasSizes(this.domElement__);
            this.refreshProgress(this.domElement__);
        }

        private refreshCanvasSizes(domElement) : void {
            domElement.attr('width'  , this.getSizes().w)
                      .attr('height' , this.getSizes().h);
        }

        private refreshProgress(canvasElement) : void {
            if (! canvasElement[0].getContext)
                throw 'Cant get canvas context';

            var context = canvasElement[0].getContext('2d');
            context.fillStyle = this.getBackgroundColor();
            context.fillRect(0, 0, 100, 100);
            context.fillStyle = this.barColor;
            context.fillRect(0, 0, this.getSizes().w / 100 * this.progress, this.getSizes().h);
        }

        /** protected */
        createDomElement__() : any {
            return $('<canvas></canvas>');
        }
    }
}