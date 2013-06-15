/// <reference path="../../UI/CanvasWidget.ts" />
/// <reference path="../../Core/Console.ts"    />

module GrabArt.GApp.UI {
    export interface Layer {
        w : number;
        h : number;
    }
    export class Layers extends GrabArt.UI.CanvasWidget {
        private layers          : Layer[]  = [];
        private layersWidths    : number[] = [];
        private selectedLayer   : number = null;
        private initialHeight   : number = 0;
        private initialHOffset  : number = 2;
        private initialVOffset  : number = 4;
        private padding         : number = 3;
        private fontColorActive : string = 'white';
        private fontColor       : string = '#B5B5B5';
        private backColor       : string = 'grey';

        constructor() {
            super('layers');

            var height = 25;

            this.setPosition({x: 10, y: 85})
                .setSizes({w: 280, h: height});
            this.initialHeight = height;
        }

        draw() : any {
            var domElement = super.draw();
            this.refreshLayers(domElement);
            return domElement;
        }

        redraw() : void {
            super.redraw();
            this.refreshLayers(this.domElement__);
        }

        private refreshLayers(domElement) : void {
            var context           = domElement[0].getContext('2d'),
                currentStyle      = context.fillStyle,
                currentLayer      = null,
                currentLayerLabel = '',
                horizontalOffset  = this.initialHOffset,
                verticalOffset    = this.initialHeight / 2 + this.initialVOffset,
                emptyText         = '<- Layers ->';



            context.fillStyle = this.fontColor;
            context.font = 'italic 16px Calibri';
            if (this.layersWidths.length) {
                var rowsAndHeight = this.separateOnRows(context);
                if (rowsAndHeight.height != this.getSizes().h) {
                    this.setSizes({w: this.getSizes().w, h: rowsAndHeight.height});
                    this.refreshCss__(domElement);
                    this.refreshCanvasSizes__(domElement);
                    context.font = 'italic 16px Calibri';
                }

                context.fillStyle = this.backColor;
                context.fillRect(0, 0, this.getSizes().w, this.getSizes().h);

                for (var rowIndex in rowsAndHeight.rows) {
                    var layers = rowsAndHeight.rows[rowIndex];
                    for (var layerIndex in layers) {
                        currentLayer      = layers[layerIndex];
                        currentLayerLabel = currentLayer.w + 'x' + currentLayer.h;

                        if (this.selectedLayer != null
                            && currentLayer.w == this.selectedLayer)
                        {
                            context.fillStyle = this.fontColorActive;
                        } else {
                            context.fillStyle = this.fontColor;
                        }

                        context.fillText(
                            currentLayerLabel,
                            horizontalOffset  + this.padding,
                            verticalOffset
                        );
                        horizontalOffset += this.padding * 2 + context.measureText(currentLayerLabel).width;
                    }
                    horizontalOffset = this.initialHOffset;
                    verticalOffset   += this.initialHeight;
                }
            } else {
                context.fillText(
                    emptyText,
                    (this.getSizes().w - context.measureText(emptyText).width) / 2,
                    (this.getSizes().h / 2 + 4)
                );
            }

            context.fillStyle = currentStyle;
        }

        private separateOnRows(context : any) : {rows : any[]; height : number;} {
            var horizontalOffset  = this.initialHOffset,
                currentLayer      ,
                currentLayerLabel ,
                totalHeight       = this.initialHeight,
                rowIndex          = 0,
                rows : any[]      = [];

            for (var layerIndex in this.layersWidths.sort()) {
                currentLayer      = this.layers[this.layersWidths[layerIndex]];
                currentLayerLabel = currentLayer.w + 'x' + currentLayer.h;

                if (horizontalOffset
                    + this.padding
                    + context.measureText(currentLayerLabel).width >= this.getSizes().w)
                {
                    horizontalOffset = this.initialHOffset;
                    totalHeight += this.initialVOffset + this.initialHeight;
                    rowIndex++;
                } else {
                    horizontalOffset += this.padding * 2 + context.measureText(currentLayerLabel).width;
                }

                if (typeof rows[rowIndex] == 'undefined')
                    rows[rowIndex] = [];

                rows[rowIndex].push(currentLayer);
            }

            return {rows : rows, height : totalHeight};
        }

        addLayer(layer : Layer) : Layers {
            if (layer == null) throw 'layer is null';
            this.layers[layer.w] = layer;
            this.layersWidths.push(layer.w);
            return this;
        }

        setSizes(sizes : {w: number; h: number;}) : Layers {
            super.setSizes(sizes);
            return this;
        }

        setSelectedLayer(layer : number) : Layers {
            this.selectedLayer = layer;
            return this;
        }
    }
}