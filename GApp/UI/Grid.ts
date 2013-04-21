/// <reference path="../../UI/CanvasWidget.ts" />

module GrabArt.GApp.UI {
    export class Grid extends GrabArt.UI.CanvasWidget {
        private separatorSize : number = 1;
        private activeColor   : string = 'red';
        private regularColor  : string = 'yellow';

        private cellSizes     : {w: number; h: number;};
        private cellsMap = [];

        constructor(private nw : number, private nh : number) {
            super('grid');
            this.setPosition({x: 10, y: 90})
                .setSizes({w: 280, h: 100});
        }

        draw() : any {
            var domElement = super.draw();
            this.buildGrid(domElement);
            return domElement;
        }

        buildGrid(domElement) : void {
            var heightOffset = 0,
                widthOffset  = 0,
                context      = domElement[0].getContext('2d'),
                heightBlocks = this.getGridDimensions().nh,
                widthBlocks  = this.getGridDimensions().nw,
                cellWidth    = Math.round((this.getSizes().w - (widthBlocks  - 1) * this.separatorSize) / widthBlocks ),
                cellHeight   = Math.round((this.getSizes().h - (heightBlocks - 1) * this.separatorSize) / heightBlocks);

                cellWidth  = (cellWidth < 2)  ? 2 : cellWidth;
                cellHeight = (cellHeight < 2) ? 2 : cellHeight;

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
            //this.setWidth(cellWidth * widthBlocks + (widthBlocks - 1) * this.separatorSize);
            //this.setHeight(cellHeight * heightBlocks + (heightBlocks - 1) * this.separatorSize);
        }

        rebuildGrid() : void {
            this.buildGrid(this.domElement__);
        }

        activateCell(x : number, y : number) : void {
            if (x < 0 || x > this.getGridDimensions().nw) throw "x parameter out of bounds";
            if (y < 0 || y > this.getGridDimensions().nh) throw "y parameter out of bounds";

            this.cellsMap[x]    = this.cellsMap[x] || [];
            this.cellsMap[x][y] = true;
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