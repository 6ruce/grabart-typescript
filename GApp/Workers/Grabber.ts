/// <reference  path="../../Core/Event.ts"   />

module GrabArt.GApp.Workers {
    declare var $;
    export class Grabber {
        private oldImages        = {};
        private newImages        = {};
        private cells            = [];
        private cellsData        = [];
        private layer            = null;

        private cellFoundFlag    = 1;
        private cellDisabledFlag = 2;

        private cellChangedEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private imageFoundEv  : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public  CellChanged   : GrabArt.Core.Event;
        public  ImageFound    : GrabArt.Core.Event;

        constructor () {
            this.CellChanged = this.cellChangedEv;
            this.ImageFound  = this.imageFoundEv;
        }

        getRunner(layer : any) : () => void {
            if (! layer) throw 'layer is empty';

            var _this = this;

            this.layer           = layer;
            this.oldImages       = {};
            this.newImages       = {};
            this.cells           = [];

            return () => {
                try {
                    layer.children().each(function (_1, _2) {
                        var currentImage = $(this),
                            x = Math.round(parseInt(currentImage.css('left')) / parseInt(currentImage.css('width'))),
                            y = Math.round(parseInt(currentImage.css('top'))  / parseInt(currentImage.css('height')));

                        if (!_this.oldImages[x + 'x' + y]) {
                            _this.cellChangedEv.fire(_this, {x: x, y: y});
                        }
                        _this.newImages[x + 'x' + y] = x + 'x' + y;

                        if (currentImage.attr('src')) {
                            if (! _this.cells[x]
                                || !_this.cells[x][y]
                                || (_this.cells[x][y] != _this.cellFoundFlag
                                    && _this.cells[x][y] != _this.cellDisabledFlag)
                                ) {
                                _this.cells[x]        = _this.cells[x] || [];
                                _this.cells[x][y]     = _this.cellFoundFlag;
                                _this.cellsData[x]    = _this.cellsData[x] || [];
                                _this.cellsData[x][y] = currentImage.attr('src');
                                _this.imageFoundEv.fire(_this, {x: x, y: y});
                            }
                        }


                    });
                    this.oldImages = this.newImages;
                    this.newImages = {};
                } catch (ex) {
                    console.log(ex);
                }
            };
        }

        disableActiveCells() : Grabber {
            for (var w in this.cells) {
                for (var h in this.cells[w]) {
                    this.cells[w][h] = this.cellDisabledFlag;
                    delete this.cellsData[w][h];
                }
            }
            return this;
        }

        postCollectedString(textArea : any) : void {
            if (this.cellsData.length) {
                var layerWidth  = Math.round(
                        parseInt(this.layer.css('width'))
                            / parseInt(this.layer.children().first().css('width'))  + 0.49
                    ),
                    layerHeight = Math.round(
                        parseInt(this.layer.css('height'))
                            / parseInt(this.layer.children().first().css('height')) + 0.49
                    );

                textArea.val('[' + layerWidth + ',' + layerHeight + ']');
                for (var w in this.cellsData) {
                    for (var h in this.cellsData[w]) {
                        textArea[0].value += '{<' + w + ',' + h + '>' + this.cellsData[w][h] + '}';
                        delete this.cellsData[w][h];
                    }
                }
            }
        }
    }
}