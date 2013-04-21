/// <reference path="Widget.ts" />

module GrabArt.UI {
    declare var $;
    export class ContainingWidget extends Widget {

        private widgets     : { [name : string] : Widget; } = {};

        draw() : any {
            var domElem = super.draw();
            for (var widgetName in this.widgets) {
                domElem.append(this.widgets[widgetName].draw());
            }
            return domElem;
        }

        redraw() : void {
            super.redraw();
            for (var widgetName in this.widgets) {
                this.widgets[widgetName].redraw();
            }
        }

        addWidget(widget : Widget) : ContainingWidget {
            this.widgets[widget.getName()] = widget;
            return this;
        }
    }
}