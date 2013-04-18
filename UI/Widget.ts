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
        private position    : IPosition = { x : 0,   y : 0, relative : 'absolute' };
        private sizes       : ISizes    = { w : 100, h : 75 };
        private unit        : string    = 'px';
        private visible     : bool      = true;
        private domId       : string    = null;
        private domElement  : any       = null;
        private bgColor     : string    = 'grey';

        private dragging     : bool      = false;
        private turnOnDragg  : (sender : Object, args : any) => void = null;
        private turnOffDragg : (sender : Object, args : any) => void = null;
        private performDragg : (sender : Object, args : any) => void = null;
        private previosX     : number;
        private previosY     : number;

        private widgets     : { [name : string] : Widget; } = {};

        private mouseOverEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseMoveEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseDownEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        private mouseUpEv   : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public  MouseOver   : GrabArt.Core.Event;
        public  MouseMove   : GrabArt.Core.Event;
        public  MouseDown   : GrabArt.Core.Event;
        public  MouseUp     : GrabArt.Core.Event;


        constructor (private name : string) {
            this.MouseOver = this.mouseOverEv;
            this.MouseMove = this.mouseMoveEv;
            this.MouseDown = this.mouseDownEv;
            this.MouseUp   = this.mouseUpEv;

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
                this.domElement.attr('id', this.domId)
            }

            this.domElement
                .css({
                      left            : this.position.x + this.unit
                    , top             : this.position.y + this.unit
                    , width           : this.sizes.w    + this.unit
                    , height          : this.sizes.h    + this.unit
                    , backgroundColor : this.bgColor
                    , position        : this.position.relative || 'relative'
                });

            return this.domElement;
        }

        private bindEvents(domElement : Object) : void {
            $(domElement).on('mouseover', (event) => this.mouseOverEv.fire(this, event))
                         .on('mousemove', (event) => this.mouseMoveEv.fire(this, event))
                         .on('mousedown', (event) => this.mouseDownEv.fire(this, event))
                         .on('mouseup'  , (event) => this.mouseUpEv.fire(this, event));
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
            this.position.relative = position.relative || this.position.relative || 'static';

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
            if (this.turnOnDragg === null) {
                this.performDragg = (sender, args) => {
                    if (this.dragging) {
                        this.move(args.clientX - this.previosX, args.clientY - this.previosY);
                        this.drawSelf();
                        this.previosX = args.clientX;
                        this.previosY = args.clientY;
                    }
                }
                this.turnOnDragg  = (_1, args) => {
                    this.dragging = true;
                    this.previosX = args.clientX;
                    this.previosY = args.clientY;
                }
                this.turnOffDragg = (_1, _2) => this.dragging = false;
                this.MouseDown.addListener(this.turnOnDragg);
                this.MouseUp.addListener(this.turnOffDragg);
                this.MouseMove.addListener(this.performDragg);
            }

            return this;
        }

        disableDragging() : Widget {
            if (this.turnOnDragg !== null) {
                this.MouseDown.removeListener(this.turnOnDragg);
                this.MouseUp.removeListener(this.turnOffDragg);
                this.MouseMove.removeListener(this.performDragg);
                this.turnOnDragg  = null;
                this.turnOffDragg = null;
                this.performDragg = null;
            }
            return this;
        }

        private changeDragging(dragging : bool) : void {
            this.dragging = dragging;
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