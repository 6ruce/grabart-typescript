/// <reference path="Widget.ts" />

module GrabArt.UI {
    declare var $;
    export class CanvasWidget extends Widget {
        draw() : any {
            var domElement = super.draw();
            this.refreshCanvasSizes__(domElement);
            return domElement;
        }

        redraw() : void {
            super.redraw();
            this.refreshCanvasSizes__(this.domElement__);
        }

        /** protected */
        refreshCanvasSizes__(domElement) : void {
            domElement.attr('width'  , this.getSizes().w)
                      .attr('height' , this.getSizes().h);
        }

        /** protected */
        createDomElement__() : any {
            return $('<canvas></canvas>');
        }
    }
}