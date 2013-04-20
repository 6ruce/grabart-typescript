/// <reference_ path="../jquery.d.ts"     />
/// <reference  path="../Core/Event.ts"   />
/// <reference  path="Services/Dragger.ts" />

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

    /** Base class for all widgets */
    export class Widget {

        /** const */
        private defaultRelativePos = 'absolute';

        private position    : IPosition = { x : 0,   y : 0, relative : 'absolute' };
        private sizes       : ISizes    = { w : 100, h : 75 };
        private unit        : string    = 'px';
        private visible     : bool      = true;
        private domId       : string    = null;
        private domElement  : any       = null;
        private bgColor     : string    = 'grey';
        private cursorStyle : string    = 'default';

        private dragger     : GrabArt.UI.Services.Dragger   = null;

        private widgets     : { [name : string] : Widget; } = {};

        private mouseOverEv  : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseOutEv   : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseLeaveEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseMoveEv  : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseDownEv  : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseUpEv    : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private clickEv      : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public  MouseOver   : GrabArt.Core.Event;
        public  MouseOut    : GrabArt.Core.Event;
        public  MouseLeave  : GrabArt.Core.Event;
        public  MouseMove   : GrabArt.Core.Event;
        public  MouseDown   : GrabArt.Core.Event;
        public  MouseUp     : GrabArt.Core.Event;
        public  Click       : GrabArt.Core.Event;


        constructor (private name : string) {
            this.MouseOver   = this.mouseOverEv;
            this.MouseOut    = this.mouseOutEv;
            this.MouseLeave  = this.mouseLeaveEv;
            this.MouseMove   = this.mouseMoveEv;
            this.MouseDown   = this.mouseDownEv;
            this.MouseUp     = this.mouseUpEv;
            this.Click       = this.clickEv;

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
                this.domElement.attr('id', this.domId)
            }

            this.domElement
                .css({
                      left            : this.position.x + this.unit
                    , top             : this.position.y + this.unit
                    , width           : this.sizes.w    + this.unit
                    , height          : this.sizes.h    + this.unit
                    , backgroundColor : this.bgColor
                    , position        : this.position.relative || this.defaultRelativePos
                    , cursor          : this.cursorStyle
                });

            return this.domElement;
        }

        redraw() : void {
            this.drawSelf();
        }

        private bindEvents(domElement : Object) : void {
            $(domElement).on('mouseover'  , (event) => this.mouseOverEv.fire(this, event))
                         .on('mouseout'   , (event) => this.mouseOutEv.fire(this, event))
                         .on('mouseleave' , (event) => this.mouseLeaveEv.fire(this, event))
                         .on('mousemove'  , (event) => this.mouseMoveEv.fire(this, event))
                         .on('mousedown'  , (event) => this.mouseDownEv.fire(this, event))
                         .on('mouseup'    , (event) => this.mouseUpEv.fire(this, event));
        }

        move(dx : number, dy : number) : void {
            var currentPosition = this.getPosition();
            this.setPosition({
                x : currentPosition.x + dx,
                y : currentPosition.y + dy
            });
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

            this.position.x        = position.x;
            this.position.y        = position.y;
            this.position.relative = position.relative || this.position.relative || this.defaultRelativePos;

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

        enableDragging() : Widget {
            this.setCursorStyle('pointer');
            this.getDragger().onDragging();
            return this;
        }

        disableDragging() : Widget {
            this.setCursorStyle('default');
            this.getDragger().offDragging();
            return this;
        }

        getDragger() : GrabArt.UI.Services.Dragger {
            if (this.dragger === null) {
                this.dragger = new GrabArt.UI.Services.Dragger(
                      this
                    , this.MouseMove
                    , this.MouseDown
                    , this.MouseUp
                );
            }

            return this.dragger;
        }

        getUnit() : string {
            return this.unit;
        }

        setBackgroundColor(color : string) : Widget {
            if (color == null || color == '') {
                throw "color is empty";
            }

            this.bgColor = color;

            return this;
        }

        getBackgroundColor() : string {
            return this.bgColor;
        }

        setCursorStyle(style : string) : Widget {
            this.cursorStyle = style;
            return this;
        }
    }
}