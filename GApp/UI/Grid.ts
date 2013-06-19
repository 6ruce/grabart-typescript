/// <reference path="../../UI/CanvasWidget.ts" />

module GrabArt.GApp.UI {
    export class Grid extends GrabArt.UI.CanvasWidget {
        private separatorSize : number = 1;
        private activeColor   : string = 'red';
        private regularColor  : string = 'yellow';
        private selectColor   : string = 'yellow';
        private cellSizes     : {w: number; h: number;};
        private prevSelected  : {x: number; y: number;} = null;
        private minCellSize   : number = 4;
        private cellsMap = [];

        private resizeEv  : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        constructor(private nw : number, private nh : number) {
            super('grid');

            this.Resize = this.resizeEv;

            this.setPosition({x: 10, y: 110})
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
            var heightOffset ,
                widthOffset  ,
                dw           ,
                dh           ,
                context      = domElement[0].getContext('2d'),
                heightBlocks = this.nh,
                widthBlocks  = this.nw,
                cellWidth    = Math.round((this.getSizes().w - (widthBlocks  - 1) * this.separatorSize) / widthBlocks ),
                cellHeight   = Math.round((this.getSizes().h - (heightBlocks - 1) * this.separatorSize) / heightBlocks);

            cellWidth  = (cellWidth  < this.minCellSize) ? this.minCellSize : cellWidth;
            cellHeight = (cellHeight < this.minCellSize) ? this.minCellSize : cellHeight;

            this.cellSizes = {w: cellWidth, h: cellHeight};

            widthOffset  = (cellWidth  + this.separatorSize) * this.nw;
            heightOffset = (cellHeight + this.separatorSize) * this.nh;

            dw = widthOffset  - this.getSizes().w;
            dh = heightOffset - this.getSizes().h;
            if (dw > 2 || dh > 2) {
                this.resize(dw, dh);
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

            if (this.prevSelected !== null) {
                this.selectCell(this.prevSelected.x, this.prevSelected.y);
            }
        }

        activateCell(x : number, y : number) : void {
            if (x < 0 || x >= this.getGridDimensions().nw) throw "x parameter out of bounds";
            if (y < 0 || y >= this.getGridDimensions().nh) throw "y parameter out of bounds";

            this.cellsMap[x]    = this.cellsMap[x] || [];
            this.cellsMap[x][y] = true;
            this.drawCell(x, y, this.activeColor);
        }

        selectCell(x : number, y : number) : void {
            if (x < 0 || x >= this.getGridDimensions().nw) throw "x parameter out of bounds";
            if (y < 0 || y >= this.getGridDimensions().nh) throw "y parameter out of bounds";

            if (this.domElement__) {
                var   context = this.domElement__[0].getContext('2d')
                    , currentStyle = context.strokeStyle;

                if (this.prevSelected !== null) {
                    context.strokeStyle = this.getBackgroundColor();
                    context.strokeRect(
                          (this.cellSizes.w + this.separatorSize) * this.prevSelected.x - this.separatorSize
                        , (this.cellSizes.h + this.separatorSize) * this.prevSelected.y - this.separatorSize
                        , this.cellSizes.w + 2 * this.separatorSize
                        , this.cellSizes.h + 2 * this.separatorSize
                    );
                }

                context.strokeStyle = this.selectColor;
                context.strokeRect(
                      (this.cellSizes.w + this.separatorSize) * x - this.separatorSize
                    , (this.cellSizes.h + this.separatorSize) * y - this.separatorSize
                    , this.cellSizes.w + 2 * this.separatorSize
                    , this.cellSizes.h + 2 * this.separatorSize
                );

                context.strokeStyle = currentStyle;
            }

            this.prevSelected = {x: x, y: y};
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

        setRegularColor(color : string) : Grid {
            if (color == '') throw "color is empty";
            this.regularColor = color;
            return this;
        }

        setActiveColor(color : string) : Grid {
            if (color == '') throw "color is empty";
            this.activeColor = color;
            return this;
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