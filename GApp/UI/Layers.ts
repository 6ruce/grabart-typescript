/// <reference path="../../UI/CanvasWidget.ts" />
/// <reference path="../../Core/Console.ts"    />

module GrabArt.GApp.UI {
    export interface Layer {
        w : number;
        h : number;
    }
    export class Layers extends GrabArt.UI.CanvasWidget {
        private layers          : any     = {};
        private selectedLayer   : string  = null;
        private initialHeight   : number  = 0;
        private initialHOffset  : number  = 2;
        private initialVOffset  : number  = 2;
        private padding         : number  = 3;
        private fontColorActive : string  = 'white';
        private fontColor       : string  = '#B5B5B5';
        private backColor       : string  = 'grey';

        constructor() {
            super('layers');

            var height = 18;

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
                emptyText         = '<- Layers ->',
                trackIndex        = 0,
                containerParams  ,
                containerHeight  ;

            context.fillStyle = this.fontColor;
            context.font = 'italic 13px Calibri';
            if (Object.keys(this.layers).length) {
                containerParams = this.calculateContainerParams(context);

                containerHeight = this.initialHeight * containerParams.rowsCount;

                if (containerHeight != this.getSizes().h) {
                    this.setSizes({w: this.getSizes().w, h: containerHeight});
                    this.refreshCss__(domElement);
                    this.refreshCanvasSizes__(domElement);
                    context.font = 'italic 13px Calibri';
                }

                context.fillStyle = this.backColor;
                context.fillRect(0, 0, this.getSizes().w, this.getSizes().h);

                for (var layerIndex in this.layers) {
                    currentLayer      = this.layers[layerIndex];
                    currentLayerLabel = currentLayer.w + 'x' + currentLayer.h;

                    if (this.selectedLayer != null
                        && currentLayerLabel == this.selectedLayer)
                    {
                        context.fillStyle = this.fontColorActive;
                    } else {
                        context.fillStyle = this.fontColor;
                    }

                    context.fillText(
                          currentLayerLabel
                        , horizontalOffset
                        , verticalOffset
                    );

                    if (trackIndex == containerParams.columnsCount - 1) {
                        horizontalOffset = this.initialHOffset;
                        verticalOffset  += this.initialHeight;
                        trackIndex = 0;
                    } else {
                        horizontalOffset += (this.padding + containerParams.cellWidth);
                        trackIndex++;
                    }
                }
            } else {
                context.fillText(
                    emptyText,
                    (this.getSizes().w - context.measureText(emptyText).width) / 2,
                    (this.getSizes().h / 2 + this.initialVOffset)
                );
            }

            context.fillStyle = currentStyle;
        }

        private calculateContainerParams(context : any)
            : {rowsCount : number; columnsCount : number; cellWidth : number;}
        {
            var   currentLayer
                , currentLayerLabel
                , currentTextWidth
                , columnsCount
                , rowsCount
                , maxTextWidth = 0
                , layerCount   = Object.keys(this.layers).length;

            for (var layerIndex in this.layers) {
                currentLayer      = this.layers[layerIndex];
                currentLayerLabel = currentLayer.w + 'x' + currentLayer.h;


                currentTextWidth = context.measureText(currentLayerLabel).width;
                maxTextWidth     = maxTextWidth >= currentTextWidth ? maxTextWidth : currentTextWidth;
            }

            columnsCount = Math.floor((this.getSizes().w - 2 * this.initialHOffset) / (maxTextWidth + this.padding));
            if (Math.floor(layerCount / columnsCount) == layerCount / columnsCount) {
                rowsCount = Math.floor(layerCount / columnsCount);
            } else {
                rowsCount = Math.floor(layerCount / columnsCount) + 1;
            }

            return {rowsCount : rowsCount, columnsCount : columnsCount, cellWidth : maxTextWidth};
        }

        addLayer(layer : Layer) : Layers {
            if (layer == null) throw 'layer is null';
            this.layers[layer.w + 'x' +layer.h] = layer;
            return this;
        }

        setSelectedLayer(layer : Layer) : Layers {
            this.selectedLayer = layer.w + 'x' + layer.h;
            return this;
        }
    }
}