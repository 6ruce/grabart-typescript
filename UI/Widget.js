var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var Widget = (function () {
            function Widget(name) {
                this.name = name;
            }
            Widget.prototype.draw = function (drawer) {
                this.drawSelf(drawer);
                for(var widgetName in this.widgets) {
                    this.widgets[widgetName].draw(drawer);
                }
            };
            Widget.prototype.addWidget = function (widget) {
                this.widgets[widget.getName()] = widget;
                return this;
            };
            Widget.prototype.drawSelf = function (drawer) {
            };
            Widget.prototype.getName = function () {
                return this.name;
            };
            return Widget;
        })();
        UI.Widget = Widget;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;

})(GrabArt || (GrabArt = {}));

//@ sourceMappingURL=Widget.js.map
