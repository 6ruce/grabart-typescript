module GrabArt.UI {
    export class Widget {
        private widgets : { [name : string] : Widget; };

        constructor (private name : string) {}

        draw(drawer : any) : void {
            this.drawSelf(drawer);

            for (var widgetName in widgets) {
                widgets[widgetName].draw(drawer);
            }
        }

        addWidget(widget : Widget) : Widget {
            this.widgets[widget.getName()] = widget;
            return this;
        }

        drawSelf(drawer : any) : void {
            //Hook
        }

        getName() { return this.name; }
    }
}