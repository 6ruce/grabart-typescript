/// </reference path="Widget.ts" />

module GrabArt.UI {
    declare var $;
    export class CanvasWidget extends Widget {
        draw() : any {
            var domElement = super.draw();
            this.refreshCanvasSizes(domElement);
            return domElement;
        }

        redraw() : void {
            super.redraw();
            this.refreshCanvasSizes(this.domElement__);
        }

        private refreshCanvasSizes(domElement) : void {
            domElement.attr('width'  , this.getSizes().w)
                      .attr('height' , this.getSizes().h);
        }

        /** protected */
        createDomElement__() : any {
            return $('<canvas></canvas>');
        }
    }
}