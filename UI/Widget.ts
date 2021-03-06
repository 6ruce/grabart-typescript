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

        private position      : IPosition = { x : 0,   y : 0, relative : 'absolute' };
        private sizes         : ISizes    = { w : 100, h : 75 };

        private visible       : bool      = true;
        private bgColor       : string    = 'grey';
        private cursorStyle   : string    = 'default';
        private zIndex        : number    = 1;

        /** protected */
        unit__        : string    = 'px';
        domId__       : string    = null;
        domElement__  : any       = null;

        private dragger       : GrabArt.UI.Services.Dragger   = null;

        private mouseOverEv   : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseOutEv    : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseLeaveEv  : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseMoveEv   : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseDownEv   : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseUpEv     : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private clickEv       : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private sizesChangeEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private resizeEv      : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public  MouseOver   : GrabArt.Core.Event;
        public  MouseOut    : GrabArt.Core.Event;
        public  MouseLeave  : GrabArt.Core.Event;
        public  MouseMove   : GrabArt.Core.Event;
        public  MouseDown   : GrabArt.Core.Event;
        public  MouseUp     : GrabArt.Core.Event;
        public  Click       : GrabArt.Core.Event;
        public  SizesChange : GrabArt.Core.Event;
        public  Resize      : GrabArt.Core.Event;


        constructor (private name : string) {
            this.MouseOver   = this.mouseOverEv;
            this.MouseOut    = this.mouseOutEv;
            this.MouseLeave  = this.mouseLeaveEv;
            this.MouseMove   = this.mouseMoveEv;
            this.MouseDown   = this.mouseDownEv;
            this.MouseUp     = this.mouseUpEv;
            this.Click       = this.clickEv;
            this.SizesChange = this.sizesChangeEv;
            this.Resize      = this.resizeEv;
        }

        draw() : any {
            if (this.domElement__ === null) {
                this.domId__      = '' + this.getName() + new Date().getTime().toString();
                this.domElement__ = this.createDomElement__();
                this.bindEvents__(this.domElement__);
                this.domElement__.attr('id', this.domId__)
            }
            this.refreshCss__(this.domElement__);

            return this.domElement__;
        }

        redraw() : void {
            if (this.domId__ === null) {
                this.draw();
            }
            this.refreshCss__(this.domElement__);
        }

        /** protected */
        createDomElement__() : any {
            return $('<div></div>');
        }

        /** protected */
        refreshCss__(domElement) : void {
            domElement.css({
                  left            : this.position.x + this.unit__
                , top             : this.position.y + this.unit__
                , width           : this.sizes.w    + this.unit__
                , height          : this.sizes.h    + this.unit__
                , backgroundColor : this.bgColor
                , position        : this.position.relative || this.defaultRelativePos
                , cursor          : this.cursorStyle
                , zIndex          : this.zIndex
            });
        }

        /** protected */
        bindEvents__(domElement : Object) : void {
            $(domElement).on('mouseover'  , (event) => this.mouseOverEv.fire(this, event))
                         .on('mouseout'   , (event) => this.mouseOutEv.fire(this, event))
                         .on('mouseleave' , (event) => this.mouseLeaveEv.fire(this, event))
                         .on('mousemove'  , (event) => this.mouseMoveEv.fire(this, event))
                         .on('mousedown'  , (event) => this.mouseDownEv.fire(this, event))
                         .on('mouseup'    , (event) => this.mouseUpEv.fire(this, event))
                         .on('click'      , (event) => this.clickEv.fire(this, event));
        }

        move(dx : number, dy : number) : void {
            var currentPosition = this.getPosition();
            this.setPosition({
                x : currentPosition.x + dx,
                y : currentPosition.y + dy
            });
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

        moveOn(dx : number, dy : number) : Widget {
            this.setPosition({x: this.getPosition().x + dx, y: this.getPosition().y + dy});
            return this;
        }

        getPosition() : IPosition {
            return this.position;
        }

        setSizes(sizes : ISizes) : Widget {
            if (sizes === null) {
                throw "sizes is null";
            }

            var oldSizes = this.sizes;

            this.sizes = sizes;
            if (sizes.w != oldSizes.w || sizes.h != oldSizes.h) {
                this.resizeEv.fire(this, {dw: sizes.w - oldSizes.w, dh: sizes.h - oldSizes.h});
            }
            this.sizesChangeEv.fire(this, sizes);
            return this;
        }

        resize(dw : number, dh : number) : Widget {
            this.setSizes({w: this.sizes.w + dw, h: this.sizes.h + dh});
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
            return this.unit__;
        }

        setZIndex(zIndex : number) : Widget {
            this.zIndex = zIndex;
            return this;
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