<<<<<<< HEAD:UI/widget.js
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var Widget = (function () {
            function Widget(name) {
                this.name = name;
                this.position = {
                    x: 0,
                    y: 0,
                    relative: "static"
                };
                this.sizes = {
                    w: 100,
                    h: 75
                };
                this.visible = true;
                this.domId = null;
                this.domElement = null;
                this.init();
            }
            Widget.prototype.draw = function () {
                var domElem = this.drawSelf(parent);
                for(var widgetName in this.widgets) {
                    $(domElem).append(this.widgets[widgetName].draw());
                }
                return domElem;
            };
            Widget.prototype.drawSelf = function (parent) {
                if(this.domId === null) {
                    this.domId = '' + this.getName() + new Date().getTime().toString();
                    this.domElement = $('<div></div>');
                    var $element = $(this.domElement).id(this.domId);
                    $element.style('position');
                }
            };
            Widget.prototype.addWidget = function (widget) {
                this.widgets[widget.getName()] = widget;
                return this;
            };
            Widget.prototype.getName = function () {
                return this.name;
            };
            Widget.prototype.setPosition = function (pos) {
                if(pos === null) {
                    throw "pos is null";
                }
                this.position = pos;
                return this;
            };
            Widget.prototype.getPosition = function () {
                return this.position;
            };
            Widget.prototype.setSizes = function (sizes) {
                if(sizes === null) {
                    throw "pos is null";
                }
                this.sizes = sizes;
            };
            Widget.prototype.drawSelf = function (drawer) {
            };
            Widget.prototype.init = function () {
            };
            return Widget;
        })();
        UI.Widget = Widget;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
//@ sourceMappingURL=Widget.js.map
=======
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
>>>>>>> origin/master:UI/Widget.js