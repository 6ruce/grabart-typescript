/// <reference path="../../UI/CanvasWidget.ts" />

module GrabArt.GApp.UI {
    export class Grid extends GrabArt.UI.CanvasWidget {
        private separatorSize : number = 1;
        private activeColor   : string = 'red';
        private regularColor  : string = 'yellow';
        private cellSizes     : {w: number; h: number;};
        private cellsMap = [];

        private resizeEv  : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public  Resize    : GrabArt.Core.Event;

        constructor(private nw : number, private nh : number) {
            super('grid');

            this.Resize = this.resizeEv;

            this.setPosition({x: 10, y: 90})
                .setSizes({w: 280, h: 100});
        }

        draw() : any {
            var domElement = super.draw();
            this.buildGrid(domElement);
            return domElement;
        }

        redraw() : void {
            super.redraw();
            this.buildGrid(this.domElement__);
        }

        private buildGrid(domElement) : void {
            var heightOffset = 0,
                widthOffset  = 0,
                dw           = 0,
                dh           = 0,
                context      = domElement[0].getContext('2d'),
                heightBlocks = this.nh,
                widthBlocks  = this.nw,
                cellWidth    = Math.round((this.getSizes().w - (widthBlocks  - 1) * this.separatorSize) / widthBlocks ),
                cellHeight   = Math.round((this.getSizes().h - (heightBlocks - 1) * this.separatorSize) / heightBlocks);

            cellWidth  = (cellWidth  < 2) ? 2 : cellWidth;
            cellHeight = (cellHeight < 2) ? 2 : cellHeight;

            this.cellSizes = {w: cellWidth, h: cellHeight};

            widthOffset  = (cellWidth  + this.separatorSize) * this.nw;
            heightOffset = (cellHeight + this.separatorSize) * this.nh;
            if (widthOffset  - this.getSizes().w > 2) {
                dw = widthOffset  - this.getSizes().w;
                this.setSizes({w: widthOffset, h: this.getSizes().h});
            }
            if (heightOffset - this.getSizes().h > 2) {
                dh = heightOffset - this.getSizes().h;
                this.setSizes({w: this.getSizes().w, h: heightOffset});
            }

            if (dw != 0 || dh != 0) {
                this.refreshCss__(domElement);
                this.refreshCanvasSizes__(domElement);
            }

            widthOffset = heightOffset = 0;
            for (var i = 0; i < heightBlocks; i++) {
                widthOffset = 0;
                this.cellsMap[i] = this.cellsMap[i] || [];
                for (var j = 0; j < widthBlocks; j++) {
                    context.fillStyle = (this.cellsMap[i][j]) ? this.activeColor : this.regularColor;
                    context.fillRect(widthOffset, heightOffset, cellWidth, cellHeight);
                    widthOffset += cellWidth + this.separatorSize;
                }
                heightOffset += cellHeight + this.separatorSize;
            }

            if (dw != 0 || dh != 0) this.resizeEv.fire(this, {dw: dw, dh: dh});
        }

        activateCell(x : number, y : number) : void {
            if (x < 0 || x >= this.getGridDimensions().nw) throw "x parameter out of bounds";
            if (y < 0 || y >= this.getGridDimensions().nh) throw "y parameter out of bounds";

            this.cellsMap[x]    = this.cellsMap[x] || [];
            this.cellsMap[x][y] = true;
            this.drawCell(x, y, this.activeColor);
        }

        private drawCell(x : number, y : number, color : string) : void {
            if (this.domElement__) {
                var context      = this.domElement__[0].getContext('2d'),
                    currentStyle = context.fillStyle;

                context.fillStyle = color;
                context.fillRect(
                      (this.cellSizes.w + this.separatorSize) * x
                    , (this.cellSizes.h + this.separatorSize) * y
                    , this.cellSizes.w
                    , this.cellSizes.h
                );

                context.fillStyle = currentStyle;
            }
        }

        setGridDimensions(nw : number, nh : number) : Grid {
            this.nw = (nw <= 0) ? 1 : nw;
            this.nh = (nh <= 0) ? 1 : nh;
            return this;
        }

        getGridDimensions() : {nw : number; nh : number; } {
            return {
                nw : this.nw,
                nh : this.nh
            };
        }
    }
}