/// <reference  path="../../Core/Event.ts" />

module GrabArt.GApp.Workers {
    declare var $;
    export class LayerFinder {
        private layers          : any[] = [];
        private selectedLayer   : string = '';
        private stableCandidate : number;

        private layerFoundEv   : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private layerChangedEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public  LayerFound   : GrabArt.Core.Event;
        public  LayerChanged : GrabArt.Core.Event;

        constructor() {
            this.LayerFound   = this.layerFoundEv;
            this.LayerChanged = this.layerChangedEv;
        }

        getRunner() : () => void {
            return () => {
                var   layer = $('.m2-tileLayer').filter(function (_) { return $(this).children().length !=0; }).last()
                    , key    : string
                    , width  : number
                    , height : number
                    , layerSizes = this.getLayerActualSizes(layer);

                if (layer[0]) {
                    width  = layerSizes.w;
                    height = layerSizes.h
                    if (width == this.stableCandidate) {
                        key = width + 'x' + height;
                        if (! this.layers[key]) {
                            this.layers[key] = layer;
                            this.layerFoundEv.fire(this, {w : width, h : height});
                        }

                        if (this.selectedLayer != key) {
                            this.selectedLayer = key;
                            this.layerChangedEv.fire(this, {w : width, h : height});
                        }
                    }
                    this.stableCandidate = width;
                }
            }
        }

        getCurrentLayer() {
            if (this.selectedLayer != '') {
                var actualSizes = this.getLayerActualSizes(this.layers[this.selectedLayer]);
                return {
                    w   : actualSizes.w,
                    h   : actualSizes.h,
                    dom : this.layers[this.selectedLayer]
                };
            } else {
                return null;
            }
        }

        private getLayerActualSizes(layer : any) : {w: number; h: number;} {
            var imageWidth  = parseInt(layer.children().first().css('width')),
                imageHeight = parseInt(layer.children().first().css('height')),
                width  = Math.round((parseInt(layer.css('width'))  / imageWidth  + 0.49)) * 512,
                height = Math.round((parseInt(layer.css('height')) / imageHeight + 0.49)) * 512;

            return {w: width, h: height};
        }
    }
}
