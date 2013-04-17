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
                this.unit = 'px';
                this.visible = true;
                this.domId = null;
                this.domElement = null;
                this.bgColor = 'grey';
                this.init();
            }
            Widget.prototype.draw = function () {
                var domElem = this.drawSelf();
                for(var widgetName in this.widgets) {
                    $(domElem).append(this.widgets[widgetName].draw());
                }
                return domElem;
            };
            Widget.prototype.drawSelf = function () {
                if(this.domId === null) {
                    this.domId = '' + this.getName() + new Date().getTime().toString();
                    this.domElement = $('<div></div>');
                    this.domElement.attr('id', this.domId).css({
                        left: this.position.x + this.unit,
                        top: this.position.y + this.unit,
                        width: this.sizes.w + this.unit,
                        height: this.sizes.h + this.unit,
                        backgroundColor: this.bgColor,
                        position: this.position.relative || 'static'
                    });
                }
                return this.domElement;
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
                return this;
            };
            Widget.prototype.getUnit = function () {
                return this.unit;
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
