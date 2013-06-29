/// <reference path="CanvasWidget.ts" />

module GrabArt.UI {
    declare var $;
    export class ProgressBar extends CanvasWidget {
        private progress  : number = 0;
        private barColor  : string = 'red';
        private fontColor : string = 'white';

        constructor(name : string) {
            super(name);
            this.setSizes({w: 100, h: 20});
        }

        draw() : any {
            var domElement = super.draw();
            this.refreshProgress(domElement);
            return domElement;
        }

        redraw() : void {
            super.redraw();
            this.refreshProgress(this.domElement__);
        }

        setProgress(progress : number) : ProgressBar {
            if      (progress < 0  ) this.progress = 0;
            else if (progress > 100) this.progress = 100;
            else                     this.progress = progress;

            return this;
        }

        increase(amount : number) : ProgressBar {
            amount = amount >=0  ? amount : 0;
            this.progress = (amount + this.progress <= 100) ? amount + this.progress : 100 ;
            return this;
        }

        private refreshProgress(canvasElement) : void {
            if (! canvasElement[0].getContext)
                throw 'Cant get canvas context';

            var textProgress = this.progress.toFixed(2) + '%',
                context      = canvasElement[0].getContext('2d');

            context.fillStyle = this.getBackgroundColor();
            context.fillRect(0, 0, this.getSizes().w, this.getSizes().h);
            context.fillStyle = this.barColor;
            context.fillRect(0, 0, this.getSizes().w / 100 * this.progress, this.getSizes().h);
            context.fillStyle = this.fontColor;
            context.font = 'italic 16px Calibri';
            context.fillText(
                textProgress,
                (this.getSizes().w - context.measureText(textProgress).width) / 2,
                (this.getSizes().h / 2 + 4)
            );
        }

        setBarColor(color : string) : ProgressBar {
            if (color == '') throw "color is empty";
            this.barColor = color;
            return this;
        }
    }
}