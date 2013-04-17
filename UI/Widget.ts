/// <reference_ path="../jquery.d.ts"   />
/// <reference  path="../Core/Event.ts" />

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
        private position   : IPosition = { x : 0,   y : 0, relative : "static" };
        private sizes      : ISizes    = { w : 100, h : 75 };
        private unit       : string    = 'px';
        private visible    : bool      = true;
        private domId      : string    = null;
        private domElement : any       = null;
        private bgColor    : string    = 'grey';

        private widgets    : { [name : string] : Widget; } = {};

        private mouseOverEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseMoveEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        public  MouseOver   : GrabArt.Core.Event;
        public  MouseMove   : GrabArt.Core.Event;


        constructor (private name : string) {
            this.MouseOver = this.mouseOverEv;
            this.MouseMove = this.mouseMoveEv;

            this.init();
        }

        draw() : any {
            var domElem = this.drawSelf();

            for (var widgetName in this.widgets) {
                $(domElem).append(this.widgets[widgetName].draw());
            }

            return domElem;
        }

        drawSelf() : any {
            if (this.domId === null) {
                this.domId      = '' + this.getName() + new Date().getTime().toString();
                this.domElement = $('<div></div>');
                this.bindEvents(this.domElement);
            }

            this.domElement
                .attr('id', this.domId)
                .css({
                      left            : this.position.x + this.unit
                    , top             : this.position.y + this.unit
                    , width           : this.sizes.w    + this.unit
                    , height          : this.sizes.h    + this.unit
                    , backgroundColor : this.bgColor
                    , position        : this.position.relative || 'static'
                });

            return this.domElement;
        }

        private bindEvents(domElement : Object) : void {
            $(domElement).on('mouseover', (event) => this.mouseOverEv.fire(this, event))
                         .on('mousemove', (event) => this.mouseMoveEv.fire(this, event));
        }

        addWidget(widget : Widget) : Widget {
            this.widgets[widget.getName()] = widget;
            return this;
        }

        getName() { return this.name; }

        setPosition(position : IPosition) : Widget {
            if (position === null) {
                throw "position is null";
            }

            this.position = position;

            return this;
        }

        getPosition() : IPosition {
            return this.position;
        }

        setSizes(sizes : ISizes) : Widget {
            if (sizes === null) {
                throw "sizes is null";
            }

            this.sizes = sizes;

            return this;
        }

        getSizes() : ISizes {
            return this.sizes;
        }

        getUnit() : string {
            return this.unit;
        }

        setBackgroundColor(color : string) : Widget {
            if (color === null) {
                throw "color is null";
            }

            this.bgColor = color;

            return this;
        }

        /* abstract */
        init() : void {}
    }
}