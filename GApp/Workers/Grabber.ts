/// <reference  path="../../Core/Event.ts"   />

module GrabArt.GApp.Workers {
    declare var $;
    export class Grabber {
        private oldImages = {};
        private newImages = {};

        private cellChangedEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public  CellChanged   : GrabArt.Core.Event;

        constructor () {
            this.CellChanged = this.cellChangedEv;
        }

        getRunner(layer : any) : () => void {
            var _this = this;
            return () => {
                try {
                    layer.children().each(function (_1, _2) {
                        var currentImage = $(this),
                            x = Math.round(parseInt(currentImage.css('left')) / parseInt(currentImage.css('width'))),
                            y = Math.round(parseInt(currentImage.css('top')) / parseInt(currentImage.css('height')));

                        if (!_this.oldImages[x + 'x' + y]) {
                            _this.cellChangedEv.fire(_this, {x: x, y: y});
                        }
                        _this.newImages[x + 'x' + y] = x + 'x' + y;

                    });
                    this.oldImages = this.newImages;
                    this.newImages = {};
                } catch (ex) {
                    console.log(ex);
                }
            };
        }
    }
}