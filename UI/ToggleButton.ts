/// <reference path="Button.ts"/>

module GrabArt.UI {
    export class ToggleButton extends Button {
        private pressed : bool = false;

        /** protected */
        onMouseDownGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {
                if (this.pressed) {
                    this.setBackgroundColor(
                        this.previousColor__ != '' ? this.previousColor__ : this.basicColor__
                    );
                    this.redraw();
                } else {
                    this.previousColor__ = this.getBackgroundColor();
                    this.setBackgroundColor(this.pressedColor__);
                    this.redraw();
                }
                this.pressed = !this.pressed;
            }
        }

        /** protected */
        onMouseUpGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {};
        }

        /** protected */
        onMouseOverGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {
                if (! this.pressed) {
                    this.reactToMouseEvent__(this.hoverColor__);
                }
            }
        }

        /** protected */
        onMouseLeaveGetCallback__() : (sender : Object, args : any) => void {
            return (sender, args) => {
                if (! this.pressed) {
                    this.reactToMouseEvent__(this.basicColor__);
                }
            }
        }
    }
}