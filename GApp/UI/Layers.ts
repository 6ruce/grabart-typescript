/// <reference path="../../UI/Widget.ts" />

module GrabArt.GApp.UI {
    export class Layers extends GrabArt.UI.CanvasWidget {
        private layers        = {};
        private layersWidths  = [];
        private selectedLayer : number = null;
        private padding       : number = 5;
        private fontColor     : string = 'white';
        private separatorSize : number = 1;

        constructor() {
            super('layers');
            this.setPosition({x: 10, y: 85})
                .setSizes({w: 280, h: 25});
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
                horizontalOffset  = 5,
                emptyText         = '<- Layers ->';

            context.fillStyle = this.fontColor;
            context.font = 'italic 16px Calibri';
            if (this.layersWidths.length) {
                for (var layerIndex in this.layersWidths.sort()) {
                    currentLayer      = this.layers[this.layersWidths[layerIndex]];
                    currentLayerLabel = currentLayer.w + 'x' + currentLayer.h;
                    context.fillText(
                        currentLayerLabel,
                        horizontalOffset + this.separatorSize + this.padding,
                        this.getSizes().h / 2 + 4
                    );
                    horizontalOffset += this.separatorSize * 2 + this.padding * 2 + context.measureText(emptyText).width;
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

        addLayer(layer : {w: number; h: number;}) : Layers {
            if (layer == null) throw 'layer is null';
            this.layers[layer.w] = layer;
            this.layersWidths.push(layer.w);
            return this;
        }
    }
}