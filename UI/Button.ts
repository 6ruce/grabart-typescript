/// <reference path="ContainingWidget.ts"/>

module GrabArt.UI {
    export class Button extends Widget {
        private caption       : string = '';
        
        /** protected */
        basicColor__    : string = 'aqua';
        pressedColor__  : string = 'darkblue';
        hoverColor__    : string = 'blue';
        previousColor__ : string = '';
        

        constructor(name : string) {
            super(name);
            this.setCaption(name);
            this.initInteractionEvents();
        }

        draw() : any {
            this.setBackgroundColor(this.basicColor__);
            var domElement = super.draw();
            domElement.html(this.caption)
                      .attr('align', 'center')
                      .css('line-height', this.getSizes().h + this.unit__)
                      .css('font-family', 'Verdana, Geneva, sans-serif')
                      .css('font-weight', 'bold');

            return domElement;
        }

        setCaption(caption : string) : Button {
            this.caption = caption;
            return this;
        }

        /** protected */
        onMouseDownGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.reactToMouseEvent__(this.pressedColor__);
            };
        }

        /** protected */
        onMouseUpGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.setBackgroundColor(
                    this.previousColor__ != '' ? this.previousColor__ : this.basicColor__
                );
                this.redraw();
            };
        }

        /** protected */
        onMouseOverGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.reactToMouseEvent__(this.hoverColor__);
            };
        }

        /** protected */
        onMouseLeaveGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {
                this.reactToMouseEvent__(this.basicColor__);
            };
        }

        /** protected */
        reactToMouseEvent__(color : string) : void {
            this.previousColor__ = this.getBackgroundColor();
            this.setBackgroundColor(color);
            this.redraw();
        }

        setBasicColor(color : string) : Button {
            if (color == '') throw "color is empty";
            this.basicColor__ = color;
            return this;
        }

        setPressedColor(color : string) : Button {
            if (color == '') throw "color is empty";
            this.pressedColor__ = color;
            return this;
        }

        setHoverColor(color : string) : Button {
            if (color == '') throw "color is empty";
            this.hoverColor__ = color;
            return this;
        }

        private initInteractionEvents() : void {
            this.MouseOver.addListener(this.onMouseOverGetCallback__());
            this.MouseLeave.addListener(this.onMouseLeaveGetCallback__());
            this.MouseDown.addListener(this.onMouseDownGetCallback__());
            this.MouseUp.addListener(this.onMouseUpGetCallback__());
        }
    }
}