module GrabArt.UI {
    declare var $;
    export interface IPosition {
        x         : number;
        y         : number;
        relative? : string;
    }

    export interface ISizes {
        w : number;
        h : number;
    }

    export /* abstract */ class Widget {
        private position   : IPosition = { x : 0, y : 0, relative : "static" };
        private sizes      : ISizes    = { w : 100, h : 75 };
        private unit       : string    = 'px';
        private visible    : bool      = true;
        private domId      : string    = null;
        private domElement : any       = null;

        private widgets    : { [name : string] : Widget; };

        constructor (private name : string) {
            this.init();
        }

        draw() : any {
            var domElem = this.drawSelf(parent);

            for (var widgetName in this.widgets) {
                $(domElem).append(this.widgets[widgetName].draw());
            }

            return domElem;
        }

        drawSelf(parent : Widget) : any {
            if (this.domId === null) {
                this.domId      = '' + this.getName() + new Date().getTime().toString();
                this.domElement = $('<div></div>');
                var $element    = $(this.domElement).id(this.domId);
                $element.css({ left : this.position.x + this.unit })
                        .css({ top  : this.position.y + this.unit });

                $element.style(
                      'position'
                    , 
                );

            }

            return this.domElement;
        }

        addWidget(widget : Widget) : Widget {
            this.widgets[widget.getName()] = widget;
            return this;
        }



        getName() { return this.name; }

        setPosition(pos : IPosition) : Widget {
            if (pos === null) {
                throw "pos is null";
            }

            this.position = pos;

            return this;
        }

        getPosition() : IPosition {
            return this.position;
        }

        setSizes(sizes : ISizes) : Widget {
            if (sizes === null) {
                throw "pos is null";
            }

            this.sizes = sizes;
        }

        /* abstract */
        drawSelf(drawer : any) : void {}

        /* abstract */
        init() : void {}
    }
}