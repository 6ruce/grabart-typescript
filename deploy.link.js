var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Event = (function () {
            function Event() {
                this.handlers = [];
            }
            Event.prototype.addListener = function (handler) {
                this.handlers.push(handler);
                return this;
            };
            Event.prototype.removeListener = function (handler) {
                if(this.handlers.length != 0) {
                    for(var i in this.handlers) {
                        if(handler == this.handlers[i]) {
                            delete this.handlers[i];
                        }
                    }
                }
                return this;
            };
            return Event;
        })();
        Core.Event = Event;        
        var EntireEvent = (function (_super) {
            __extends(EntireEvent, _super);
            function EntireEvent() {
                _super.apply(this, arguments);

                this.handlers = [];
            }
            EntireEvent.prototype.fire = function (sender, args) {
                if(this.handlers.length != 0) {
                    for(var i in this.handlers) {
                        this.handlers[i](sender, args);
                    }
                }
            };
            EntireEvent.prototype.clear = function () {
                if(this.handlers.length != 0) {
                    for(var i in this.handlers) {
                        delete this.handlers[i];
                    }
                }
            };
            return EntireEvent;
        })(Event);
        Core.EntireEvent = EntireEvent;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        (function (Services) {
            var Dragger = (function () {
                function Dragger(subject, mouseMoveEvent, mouseDownEvent, mouseUpEvent) {
                    this.dragging = false;
                    this.turnOnDrag = null;
                    this.turnOffDrag = null;
                    this.performDrag = null;
                    if(subject == null) {
                        throw 'subject is null';
                    }
                    if(mouseMoveEvent == null) {
                        throw 'mouseMoveEvent is null';
                    }
                    if(mouseDownEvent == null) {
                        throw 'mouseDownEvent is null';
                    }
                    if(mouseUpEvent == null) {
                        throw 'mouseUpEvent is null';
                    }
                    this.subject = subject;
                    this.mouseMoveEv = mouseMoveEvent;
                    this.mouseDownEv = mouseDownEvent;
                    this.mouseUpEv = mouseUpEvent;
                }
                Dragger.prototype.onDragging = function () {
                    var _this = this;
                    if(this.turnOnDrag === null) {
                        this.performDrag = function (sender, args) {
                            if(_this.dragging) {
                                _this.subject.move(args.clientX - _this.previousX, args.clientY - _this.previousY);
                                _this.subject.redraw();
                                _this.previousX = args.clientX;
                                _this.previousY = args.clientY;
                            }
                        };
                        this.turnOnDrag = function (_, args) {
                            _this.dragging = true;
                            _this.previousX = args.clientX;
                            _this.previousY = args.clientY;
                        };
                        this.turnOffDrag = function (_1, _2) {
                            return _this.dragging = false;
                        };
                        this.mouseDownEv.addListener(this.turnOnDrag);
                        this.mouseUpEv.addListener(this.turnOffDrag);
                        this.mouseMoveEv.addListener(this.performDrag);
                    }
                };
                Dragger.prototype.offDragging = function () {
                    if(this.turnOnDrag !== null) {
                        this.mouseDownEv.removeListener(this.turnOnDrag);
                        this.mouseUpEv.removeListener(this.turnOffDrag);
                        this.mouseMoveEv.removeListener(this.performDrag);
                        this.turnOnDrag = null;
                        this.turnOffDrag = null;
                        this.performDrag = null;
                    }
                };
                return Dragger;
            })();
            Services.Dragger = Dragger;            
        })(UI.Services || (UI.Services = {}));
        var Services = UI.Services;
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var Widget = (function () {
            function Widget(name) {
                this.name = name;
                this.defaultRelativePos = 'absolute';
                this.position = {
                    x: 0,
                    y: 0,
                    relative: 'absolute'
                };
                this.sizes = {
                    w: 100,
                    h: 75
                };
                this.visible = true;
                this.bgColor = 'grey';
                this.cursorStyle = 'default';
                this.unit__ = 'px';
                this.domId__ = null;
                this.domElement__ = null;
                this.dragger = null;
                this.mouseOverEv = new GrabArt.Core.EntireEvent();
                this.mouseOutEv = new GrabArt.Core.EntireEvent();
                this.mouseLeaveEv = new GrabArt.Core.EntireEvent();
                this.mouseMoveEv = new GrabArt.Core.EntireEvent();
                this.mouseDownEv = new GrabArt.Core.EntireEvent();
                this.mouseUpEv = new GrabArt.Core.EntireEvent();
                this.clickEv = new GrabArt.Core.EntireEvent();
                this.MouseOver = this.mouseOverEv;
                this.MouseOut = this.mouseOutEv;
                this.MouseLeave = this.mouseLeaveEv;
                this.MouseMove = this.mouseMoveEv;
                this.MouseDown = this.mouseDownEv;
                this.MouseUp = this.mouseUpEv;
                this.Click = this.clickEv;
            }
            Widget.prototype.draw = function () {
                if(this.domElement__ === null) {
                    this.domId__ = '' + this.getName() + new Date().getTime().toString();
                    this.domElement__ = this.createDomElement__();
                    this.bindEvents__(this.domElement__);
                    this.domElement__.attr('id', this.domId__);
                }
                this.refreshCss__(this.domElement__);
                return this.domElement__;
            };
            Widget.prototype.redraw = function () {
                if(this.domId__ === null) {
                    this.draw();
                }
                this.refreshCss__(this.domElement__);
            };
            Widget.prototype.createDomElement__ = function () {
                return $('<div></div>');
            };
            Widget.prototype.refreshCss__ = function (domElement) {
                domElement.css({
                    left: this.position.x + this.unit__,
                    top: this.position.y + this.unit__,
                    width: this.sizes.w + this.unit__,
                    height: this.sizes.h + this.unit__,
                    backgroundColor: this.bgColor,
                    position: this.position.relative || this.defaultRelativePos,
                    cursor: this.cursorStyle
                });
            };
            Widget.prototype.bindEvents__ = function (domElement) {
                var _this = this;
                $(domElement).on('mouseover', function (event) {
                    return _this.mouseOverEv.fire(_this, event);
                }).on('mouseout', function (event) {
                    return _this.mouseOutEv.fire(_this, event);
                }).on('mouseleave', function (event) {
                    return _this.mouseLeaveEv.fire(_this, event);
                }).on('mousemove', function (event) {
                    return _this.mouseMoveEv.fire(_this, event);
                }).on('mousedown', function (event) {
                    return _this.mouseDownEv.fire(_this, event);
                }).on('mouseup', function (event) {
                    return _this.mouseUpEv.fire(_this, event);
                }).on('click', function (event) {
                    return _this.clickEv.fire(_this, event);
                });
            };
            Widget.prototype.move = function (dx, dy) {
                var currentPosition = this.getPosition();
                this.setPosition({
                    x: currentPosition.x + dx,
                    y: currentPosition.y + dy
                });
            };
            Widget.prototype.getName = function () {
                return this.name;
            };
            Widget.prototype.setPosition = function (position) {
                if(position === null) {
                    throw "position is null";
                }
                this.position.x = position.x;
                this.position.y = position.y;
                this.position.relative = position.relative || this.position.relative || this.defaultRelativePos;
                return this;
            };
            Widget.prototype.getPosition = function () {
                return this.position;
            };
            Widget.prototype.setSizes = function (sizes) {
                if(sizes === null) {
                    throw "sizes is null";
                }
                this.sizes = sizes;
                return this;
            };
            Widget.prototype.resize = function (dw, dh) {
                this.sizes.w += dw;
                this.sizes.h += dh;
                return this;
            };
            Widget.prototype.getSizes = function () {
                return this.sizes;
            };
            Widget.prototype.enableDragging = function () {
                this.setCursorStyle('pointer');
                this.getDragger().onDragging();
                return this;
            };
            Widget.prototype.disableDragging = function () {
                this.setCursorStyle('default');
                this.getDragger().offDragging();
                return this;
            };
            Widget.prototype.getDragger = function () {
                if(this.dragger === null) {
                    this.dragger = new GrabArt.UI.Services.Dragger(this, this.MouseMove, this.MouseDown, this.MouseUp);
                }
                return this.dragger;
            };
            Widget.prototype.getUnit = function () {
                return this.unit__;
            };
            Widget.prototype.setBackgroundColor = function (color) {
                if(color == null || color == '') {
                    throw "color is empty";
                }
                this.bgColor = color;
                return this;
            };
            Widget.prototype.getBackgroundColor = function () {
                return this.bgColor;
            };
            Widget.prototype.setCursorStyle = function (style) {
                this.cursorStyle = style;
                return this;
            };
            return Widget;
        })();
        UI.Widget = Widget;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var ContainingWidget = (function (_super) {
            __extends(ContainingWidget, _super);
            function ContainingWidget() {
                _super.apply(this, arguments);

                this.widgets = {
                };
            }
            ContainingWidget.prototype.draw = function () {
                var domElem = _super.prototype.draw.call(this);
                for(var widgetName in this.widgets) {
                    domElem.append(this.widgets[widgetName].draw());
                }
                return domElem;
            };
            ContainingWidget.prototype.redraw = function () {
                _super.prototype.redraw.call(this);
                for(var widgetName in this.widgets) {
                    this.widgets[widgetName].redraw();
                }
            };
            ContainingWidget.prototype.addWidget = function (widget) {
                this.widgets[widget.getName()] = widget;
                return this;
            };
            return ContainingWidget;
        })(UI.Widget);
        UI.ContainingWidget = ContainingWidget;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        (function (UI) {
            var MainWidget = (function (_super) {
                __extends(MainWidget, _super);
                function MainWidget() {
                                _super.call(this, 'main');
                    this.setPosition({
                        x: 600,
                        y: 100,
                        relative: 'fixed'
                    }).setSizes({
                        w: 300,
                        h: 225
                    });
                }
                return MainWidget;
            })(GrabArt.UI.ContainingWidget);
            UI.MainWidget = MainWidget;            
        })(GApp.UI || (GApp.UI = {}));
        var UI = GApp.UI;
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(name) {
                        _super.call(this, name);
                this.caption = '';
                this.basicColor__ = 'aqua';
                this.pressedColor__ = 'darkblue';
                this.hoverColor__ = 'blue';
                this.previousColor__ = '';
                this.setCaption(name);
                this.initInteractionEvents();
            }
            Button.prototype.draw = function () {
                this.setBackgroundColor(this.basicColor__);
                var domElement = _super.prototype.draw.call(this);
                domElement.html(this.caption).attr('align', 'center').css('line-height', this.getSizes().h + this.unit__).css('font-family', 'Verdana, Geneva, sans-serif').css('font-weight', 'bold');
                return domElement;
            };
            Button.prototype.setCaption = function (caption) {
                this.caption = caption;
                return this;
            };
            Button.prototype.onMouseDownGetCallback__ = function () {
                var _this = this;
                return function (sender, args) {
                    _this.reactToMouseEvent__(_this.pressedColor__);
                };
            };
            Button.prototype.onMouseUpGetCallback__ = function () {
                var _this = this;
                return function (sender, args) {
                    _this.setBackgroundColor(_this.previousColor__ != '' ? _this.previousColor__ : _this.basicColor__);
                    _this.redraw();
                };
            };
            Button.prototype.onMouseOverGetCallback__ = function () {
                var _this = this;
                return function (sender, args) {
                    _this.reactToMouseEvent__(_this.hoverColor__);
                };
            };
            Button.prototype.onMouseLeaveGetCallback__ = function () {
                var _this = this;
                return function (sender, args) {
                    _this.reactToMouseEvent__(_this.basicColor__);
                };
            };
            Button.prototype.reactToMouseEvent__ = function (color) {
                this.previousColor__ = this.getBackgroundColor();
                this.setBackgroundColor(color);
                this.redraw();
            };
            Button.prototype.setBasicColor = function (color) {
                if(color == '') {
                    throw "color is empty";
                }
                this.basicColor__ = color;
                return this;
            };
            Button.prototype.setPressedColor = function (color) {
                if(color == '') {
                    throw "color is empty";
                }
                this.pressedColor__ = color;
                return this;
            };
            Button.prototype.setHoverColor = function (color) {
                if(color == '') {
                    throw "color is empty";
                }
                this.hoverColor__ = color;
                return this;
            };
            Button.prototype.initInteractionEvents = function () {
                this.MouseOver.addListener(this.onMouseOverGetCallback__());
                this.MouseLeave.addListener(this.onMouseLeaveGetCallback__());
                this.MouseDown.addListener(this.onMouseDownGetCallback__());
                this.MouseUp.addListener(this.onMouseUpGetCallback__());
            };
            return Button;
        })(UI.Widget);
        UI.Button = Button;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var ToggleButton = (function (_super) {
            __extends(ToggleButton, _super);
            function ToggleButton() {
                _super.apply(this, arguments);

                this.pressed = false;
            }
            ToggleButton.prototype.onMouseDownGetCallback__ = function () {
                var _this = this;
                return function (sender, args) {
                    if(_this.pressed) {
                        _this.setBackgroundColor(_this.previousColor__ != '' ? _this.previousColor__ : _this.basicColor__);
                        _this.redraw();
                    } else {
                        _this.previousColor__ = _this.getBackgroundColor();
                        _this.setBackgroundColor(_this.pressedColor__);
                        _this.redraw();
                    }
                    _this.pressed = !_this.pressed;
                };
            };
            ToggleButton.prototype.onMouseUpGetCallback__ = function () {
                return function (sender, args) {
                };
            };
            ToggleButton.prototype.onMouseOverGetCallback__ = function () {
                var _this = this;
                return function (sender, args) {
                    if(!_this.pressed) {
                        _this.reactToMouseEvent__(_this.hoverColor__);
                    }
                };
            };
            ToggleButton.prototype.onMouseLeaveGetCallback__ = function () {
                var _this = this;
                return function (sender, args) {
                    if(!_this.pressed) {
                        _this.reactToMouseEvent__(_this.basicColor__);
                    }
                };
            };
            return ToggleButton;
        })(UI.Button);
        UI.ToggleButton = ToggleButton;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        (function (UI) {
            var StartButton = (function (_super) {
                __extends(StartButton, _super);
                function StartButton() {
                                _super.call(this, 'start');
                    this.setCaption("START");
                    this.setPosition({
                        x: 10,
                        y: 10
                    }).setSizes({
                        w: 100,
                        h: 70
                    });
                }
                return StartButton;
            })(GrabArt.UI.ToggleButton);
            UI.StartButton = StartButton;            
        })(GApp.UI || (GApp.UI = {}));
        var UI = GApp.UI;
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        (function (UI) {
            var CopyButton = (function (_super) {
                __extends(CopyButton, _super);
                function CopyButton() {
                                _super.call(this, 'copy');
                    this.setCaption("COPY TO CLIPBOARD");
                    this.setPosition({
                        x: 115,
                        y: 10
                    }).setSizes({
                        w: 175,
                        h: 32
                    });
                }
                return CopyButton;
            })(GrabArt.UI.Button);
            UI.CopyButton = CopyButton;            
        })(GApp.UI || (GApp.UI = {}));
        var UI = GApp.UI;
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var CanvasWidget = (function (_super) {
            __extends(CanvasWidget, _super);
            function CanvasWidget() {
                _super.apply(this, arguments);

            }
            CanvasWidget.prototype.draw = function () {
                var domElement = _super.prototype.draw.call(this);
                this.refreshCanvasSizes__(domElement);
                return domElement;
            };
            CanvasWidget.prototype.redraw = function () {
                _super.prototype.redraw.call(this);
                this.refreshCanvasSizes__(this.domElement__);
            };
            CanvasWidget.prototype.refreshCanvasSizes__ = function (domElement) {
                domElement.attr('width', this.getSizes().w).attr('height', this.getSizes().h);
            };
            CanvasWidget.prototype.createDomElement__ = function () {
                return $('<canvas></canvas>');
            };
            return CanvasWidget;
        })(UI.Widget);
        UI.CanvasWidget = CanvasWidget;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var ProgressBar = (function (_super) {
            __extends(ProgressBar, _super);
            function ProgressBar(name) {
                        _super.call(this, name);
                this.progress = 100;
                this.barColor = 'red';
                this.fontColor = 'white';
                this.setSizes({
                    w: 100,
                    h: 20
                });
            }
            ProgressBar.prototype.draw = function () {
                var domElement = _super.prototype.draw.call(this);
                this.refreshProgress(domElement);
                return domElement;
            };
            ProgressBar.prototype.redraw = function () {
                _super.prototype.redraw.call(this);
                this.refreshProgress(this.domElement__);
            };
            ProgressBar.prototype.setProgress = function (progress) {
                if(progress < 0) {
                    this.progress = 0;
                } else if(progress > 100) {
                    this.progress = 100;
                } else {
                    this.progress = progress;
                }
            };
            ProgressBar.prototype.increase = function (amount) {
                amount = amount >= 0 ? amount : 0;
                this.progress = (amount + this.progress <= 100) ? amount + this.progress : 100;
                return this;
            };
            ProgressBar.prototype.refreshProgress = function (canvasElement) {
                if(!canvasElement[0].getContext) {
                    throw 'Cant get canvas context';
                }
                var textProgress = this.progress + '%', context = canvasElement[0].getContext('2d');
                context.fillStyle = this.getBackgroundColor();
                context.fillRect(0, 0, this.getSizes().w, this.getSizes().h);
                context.fillStyle = this.barColor;
                context.fillRect(0, 0, this.getSizes().w / 100 * this.progress, this.getSizes().h);
                context.fillStyle = this.fontColor;
                context.font = 'italic 16px Calibri';
                context.fillText(textProgress, (this.getSizes().w - context.measureText(textProgress).width) / 2, (this.getSizes().h / 2 + 4));
            };
            ProgressBar.prototype.setBarColor = function (color) {
                if(color == '') {
                    throw "color is empty";
                }
                this.barColor = color;
                return this;
            };
            return ProgressBar;
        })(UI.CanvasWidget);
        UI.ProgressBar = ProgressBar;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        (function (UI) {
            var GrabProgress = (function (_super) {
                __extends(GrabProgress, _super);
                function GrabProgress() {
                                _super.call(this, 'grabProgress');
                    this.setPosition({
                        x: 115,
                        y: 47
                    }).setSizes({
                        w: 175,
                        h: 33
                    });
                    this.setProgress(10);
                }
                return GrabProgress;
            })(GrabArt.UI.ProgressBar);
            UI.GrabProgress = GrabProgress;            
        })(GApp.UI || (GApp.UI = {}));
        var UI = GApp.UI;
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        (function (UI) {
            var Layers = (function (_super) {
                __extends(Layers, _super);
                function Layers() {
                                _super.call(this, 'layers');
                    this.layers = {
                    };
                    this.layersWidths = [];
                    this.selectedLayer = null;
                    this.padding = 5;
                    this.fontColor = 'white';
                    this.separatorSize = 1;
                    this.setPosition({
                        x: 10,
                        y: 85
                    }).setSizes({
                        w: 280,
                        h: 25
                    });
                }
                Layers.prototype.draw = function () {
                    var domElement = _super.prototype.draw.call(this);
                    this.refreshLayers(domElement);
                    return domElement;
                };
                Layers.prototype.redraw = function () {
                    _super.prototype.redraw.call(this);
                    this.refreshLayers(this.domElement__);
                };
                Layers.prototype.refreshLayers = function (domElement) {
                    var context = domElement[0].getContext('2d'), currentStyle = context.fillStyle, currentLayer = null, currentLayerLabel = '', horizontalOffset = 5, emptyText = '<- Layers ->';
                    context.fillStyle = this.fontColor;
                    context.font = 'italic 16px Calibri';
                    if(this.layersWidths.length) {
                        for(var layerIndex in this.layersWidths.sort()) {
                            currentLayer = this.layers[this.layersWidths[layerIndex]];
                            currentLayerLabel = currentLayer.w + 'x' + currentLayer.h;
                            context.fillText(currentLayerLabel, horizontalOffset + this.separatorSize + this.padding, this.getSizes().h / 2 + 4);
                            horizontalOffset += this.separatorSize * 2 + this.padding * 2 + context.measureText(emptyText).width;
                        }
                    } else {
                        context.fillText(emptyText, (this.getSizes().w - context.measureText(emptyText).width) / 2, (this.getSizes().h / 2 + 4));
                    }
                    context.fillStyle = currentStyle;
                };
                Layers.prototype.addLayer = function (layer) {
                    if(layer == null) {
                        throw 'layer is null';
                    }
                    this.layers[layer.w] = layer;
                    this.layersWidths.push(layer.w);
                    return this;
                };
                return Layers;
            })(GrabArt.UI.CanvasWidget);
            UI.Layers = Layers;            
        })(GApp.UI || (GApp.UI = {}));
        var UI = GApp.UI;
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        (function (UI) {
            var Grid = (function (_super) {
                __extends(Grid, _super);
                function Grid(nw, nh) {
                                _super.call(this, 'grid');
                    this.nw = nw;
                    this.nh = nh;
                    this.separatorSize = 1;
                    this.activeColor = 'red';
                    this.regularColor = 'yellow';
                    this.selectColor = 'yellow';
                    this.prevSelected = null;
                    this.cellsMap = [];
                    this.resizeEv = new GrabArt.Core.EntireEvent();
                    this.Resize = this.resizeEv;
                    this.setPosition({
                        x: 10,
                        y: 115
                    }).setSizes({
                        w: 280,
                        h: 100
                    });
                }
                Grid.prototype.draw = function () {
                    var domElement = _super.prototype.draw.call(this);
                    this.buildGrid(domElement);
                    return domElement;
                };
                Grid.prototype.redraw = function () {
                    _super.prototype.redraw.call(this);
                    this.buildGrid(this.domElement__);
                };
                Grid.prototype.buildGrid = function (domElement) {
                    var heightOffset = 0, widthOffset = 0, dw = 0, dh = 0, context = domElement[0].getContext('2d'), heightBlocks = this.nh, widthBlocks = this.nw, cellWidth = Math.round((this.getSizes().w - (widthBlocks - 1) * this.separatorSize) / widthBlocks), cellHeight = Math.round((this.getSizes().h - (heightBlocks - 1) * this.separatorSize) / heightBlocks);
                    cellWidth = (cellWidth < 2) ? 2 : cellWidth;
                    cellHeight = (cellHeight < 2) ? 2 : cellHeight;
                    this.cellSizes = {
                        w: cellWidth,
                        h: cellHeight
                    };
                    widthOffset = (cellWidth + this.separatorSize) * this.nw;
                    heightOffset = (cellHeight + this.separatorSize) * this.nh;
                    if(widthOffset - this.getSizes().w > 2) {
                        dw = widthOffset - this.getSizes().w;
                        this.setSizes({
                            w: widthOffset,
                            h: this.getSizes().h
                        });
                    }
                    if(heightOffset - this.getSizes().h > 2) {
                        dh = heightOffset - this.getSizes().h;
                        this.setSizes({
                            w: this.getSizes().w,
                            h: heightOffset
                        });
                    }
                    if(dw != 0 || dh != 0) {
                        this.refreshCss__(domElement);
                        this.refreshCanvasSizes__(domElement);
                    }
                    widthOffset = heightOffset = 0;
                    for(var i = 0; i < heightBlocks; i++) {
                        widthOffset = 0;
                        this.cellsMap[i] = this.cellsMap[i] || [];
                        for(var j = 0; j < widthBlocks; j++) {
                            context.fillStyle = (this.cellsMap[i][j]) ? this.activeColor : this.regularColor;
                            context.fillRect(widthOffset, heightOffset, cellWidth, cellHeight);
                            widthOffset += cellWidth + this.separatorSize;
                        }
                        heightOffset += cellHeight + this.separatorSize;
                    }
                    if(this.prevSelected !== null) {
                        this.selectCell(this.prevSelected.x, this.prevSelected.y);
                    }
                    if(dw != 0 || dh != 0) {
                        this.resizeEv.fire(this, {
                            dw: dw,
                            dh: dh
                        });
                    }
                };
                Grid.prototype.activateCell = function (x, y) {
                    if(x < 0 || x >= this.getGridDimensions().nw) {
                        throw "x parameter out of bounds";
                    }
                    if(y < 0 || y >= this.getGridDimensions().nh) {
                        throw "y parameter out of bounds";
                    }
                    this.cellsMap[x] = this.cellsMap[x] || [];
                    this.cellsMap[x][y] = true;
                    this.drawCell(x, y, this.activeColor);
                };
                Grid.prototype.selectCell = function (x, y) {
                    if(x < 0 || x >= this.getGridDimensions().nw) {
                        throw "x parameter out of bounds";
                    }
                    if(y < 0 || y >= this.getGridDimensions().nh) {
                        throw "y parameter out of bounds";
                    }
                    if(this.domElement__) {
                        var context = this.domElement__[0].getContext('2d'), currentStyle = context.strokeStyle;
                        if(this.prevSelected !== null) {
                            context.strokeStyle = this.getBackgroundColor();
                            context.strokeRect((this.cellSizes.w + this.separatorSize) * this.prevSelected.x - this.separatorSize, (this.cellSizes.h + this.separatorSize) * this.prevSelected.y - this.separatorSize, this.cellSizes.w + 2 * this.separatorSize, this.cellSizes.h + 2 * this.separatorSize);
                        }
                        context.strokeStyle = this.selectColor;
                        context.strokeRect((this.cellSizes.w + this.separatorSize) * x - this.separatorSize, (this.cellSizes.h + this.separatorSize) * y - this.separatorSize, this.cellSizes.w + 2 * this.separatorSize, this.cellSizes.h + 2 * this.separatorSize);
                        context.strokeStyle = currentStyle;
                    }
                    this.prevSelected = {
                        x: x,
                        y: y
                    };
                };
                Grid.prototype.drawCell = function (x, y, color) {
                    if(this.domElement__) {
                        var context = this.domElement__[0].getContext('2d'), currentStyle = context.fillStyle;
                        context.fillStyle = color;
                        context.fillRect((this.cellSizes.w + this.separatorSize) * x, (this.cellSizes.h + this.separatorSize) * y, this.cellSizes.w, this.cellSizes.h);
                        context.fillStyle = currentStyle;
                    }
                };
                Grid.prototype.setRegularColor = function (color) {
                    if(color == '') {
                        throw "color is empty";
                    }
                    this.regularColor = color;
                    return this;
                };
                Grid.prototype.setActiveColor = function (color) {
                    if(color == '') {
                        throw "color is empty";
                    }
                    this.activeColor = color;
                    return this;
                };
                Grid.prototype.setGridDimensions = function (nw, nh) {
                    this.nw = (nw <= 0) ? 1 : nw;
                    this.nh = (nh <= 0) ? 1 : nh;
                    return this;
                };
                Grid.prototype.getGridDimensions = function () {
                    return {
                        nw: this.nw,
                        nh: this.nh
                    };
                };
                return Grid;
            })(GrabArt.UI.CanvasWidget);
            UI.Grid = Grid;            
        })(GApp.UI || (GApp.UI = {}));
        var UI = GApp.UI;
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        var Config = (function () {
            function Config() { }
            Config.colorScheme = {
                mainWindowColor: '#C7C5C1',
                startButton: {
                    basicColor: '#8F8C88',
                    hoverColor: '#6B6967',
                    pressedColor: '#5D482C'
                },
                progressBar: {
                    barColor: '#646B44',
                    backColor: '#828575'
                },
                grid: {
                    regularColor: '#ACAAB0',
                    activeColor: '#A2000C',
                    backColor: '#484749'
                }
            };
            return Config;
        })();
        GApp.Config = Config;        
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Console = (function () {
            function Console() { }
            Console.writeLine = function writeLine(text, color) {
                if (typeof color === "undefined") { color = "black"; }
                $('#consoleContent').append($('<div></div>').html('> ' + text).css('color', color));
            };
            return Console;
        })();
        Core.Console = Console;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        (function (Services) {
            var Application = (function () {
                function Application(page) {
                    this.page = page;
                    this.mainWidget = null;
                }
                Application.prototype.run = function () {
                    try  {
                        this.main();
                        if(this.mainWidget !== null) {
                            $(this.page).append(this.mainWidget.draw());
                        }
                    } catch (exc) {
                        GrabArt.Core.Console.writeLine('Exception: ' + exc, 'red');
                    }
                };
                Application.prototype.setMainWidget = function (widget) {
                    if(widget == null) {
                        throw 'widget is null';
                    }
                    this.mainWidget = widget;
                    return this;
                };
                Application.prototype.main = function () {
                };
                return Application;
            })();
            Services.Application = Application;            
        })(UI.Services || (UI.Services = {}));
        var Services = UI.Services;
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (GApp) {
        var Application = (function (_super) {
            __extends(Application, _super);
            function Application() {
                _super.apply(this, arguments);

                this.mainWindow = new GrabArt.GApp.UI.MainWidget();
                this.startButton = new GrabArt.GApp.UI.StartButton();
                this.copyButton = new GrabArt.GApp.UI.CopyButton();
                this.progressBar = new GrabArt.GApp.UI.GrabProgress();
                this.layers = new GrabArt.GApp.UI.Layers();
                this.grid = new GrabArt.GApp.UI.Grid(20, 10);
            }
            Application.prototype.main = function () {
                this.mainWindow.addWidget(this.startButton).addWidget(this.copyButton).addWidget(this.progressBar).addWidget(this.layers).addWidget(this.grid);
                this.grid.activateCell(2, 2);
                this.grid.selectCell(4, 4);
                this.layers.addLayer({
                    w: 10,
                    h: 10
                });
                this.layers.addLayer({
                    w: 11,
                    h: 330
                });
                this.mainWindow.enableDragging();
                this.applyColorScheme().wireEvents();
                this.setMainWidget(this.mainWindow);
            };
            Application.prototype.grid_Resize_GetCallback = function () {
                var _this = this;
                return function (sender, args) {
                    _this.mainWindow.resize(args.dw, args.dh);
                    _this.copyButton.resize(args.dw, 0);
                    _this.progressBar.resize(args.dw, 0);
                    _this.layers.resize(args.dw, 0);
                    _this.mainWindow.redraw();
                };
            };
            Application.prototype.startButton_Click_GetCallback = function () {
                var _this = this;
                return function (sender, args) {
                    _this.grid.setGridDimensions(200, 100).redraw();
                };
            };
            Application.prototype.copyButton_Click_GetCallback = function () {
                var _this = this;
                return function (sender, args) {
                    _this.progressBar.increase(10).redraw();
                };
            };
            Application.prototype.applyColorScheme = function () {
                var colorScheme = GrabArt.GApp.Config.colorScheme;
                this.mainWindow.setBackgroundColor(colorScheme.mainWindowColor);
                this.startButton.setBasicColor(colorScheme.startButton.basicColor).setHoverColor(colorScheme.startButton.hoverColor).setPressedColor(colorScheme.startButton.pressedColor);
                this.copyButton.setBasicColor(colorScheme.startButton.basicColor).setHoverColor(colorScheme.startButton.hoverColor).setPressedColor(colorScheme.startButton.pressedColor);
                this.progressBar.setBarColor(colorScheme.progressBar.barColor).setBackgroundColor(colorScheme.progressBar.backColor);
                this.grid.setActiveColor(colorScheme.grid.activeColor).setRegularColor(colorScheme.grid.regularColor).setBackgroundColor(colorScheme.mainWindowColor);
                return this;
            };
            Application.prototype.wireEvents = function () {
                this.grid.Resize.addListener(this.grid_Resize_GetCallback());
                this.startButton.Click.addListener(this.startButton_Click_GetCallback());
                this.copyButton.Click.addListener(this.copyButton_Click_GetCallback());
                return this;
            };
            return Application;
        })(GrabArt.UI.Services.Application);
        GApp.Application = Application;        
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var TestCase = (function () {
            function TestCase() { }
            TestCase.prototype.assertEquals = function (expected, real) {
                if(expected !== real) {
                    var errorMessage = "`" + real + "`:" + typeof (real) + " not equals `" + expected + "`:" + typeof (expected) + " as expected";
                    throw errorMessage;
                }
            };
            return TestCase;
        })();
        Tests.TestCase = TestCase;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        (function (UI) {
            var WidgetTest = (function (_super) {
                __extends(WidgetTest, _super);
                function WidgetTest() {
                    _super.apply(this, arguments);

                }
                WidgetTest.prototype.getDescription = function () {
                    return 'UI.Widget tests';
                };
                WidgetTest.prototype.testNewWidgetCreationWithoutParams = function () {
                    var testWidget = new GrabArt.UI.Widget('test'), domElem = testWidget.draw()[0], unit = testWidget.getUnit();
                    this.assertEquals('absolute', domElem.style.position);
                    this.assertEquals(0 + unit, domElem.style.left);
                    this.assertEquals(0 + unit, domElem.style.top);
                    this.assertEquals(100 + unit, domElem.style.width);
                    this.assertEquals(75 + unit, domElem.style.height);
                };
                WidgetTest.prototype.testNewWidgetCreationWithCustomSizes = function () {
                    var testWidget = new GrabArt.UI.Widget('test').setSizes({
                        w: 200,
                        h: 200
                    }), domElem = testWidget.draw()[0], unit = testWidget.getUnit();
                    this.assertEquals(200 + unit, domElem.style.width);
                    this.assertEquals(200 + unit, domElem.style.height);
                };
                WidgetTest.prototype.testSizesSetup = function () {
                    var testWidget = new GrabArt.UI.Widget('test').setSizes({
                        w: 200,
                        h: 200
                    }), unit = testWidget.getUnit();
                    this.assertEquals(200, testWidget.getSizes().w);
                    this.assertEquals(200, testWidget.getSizes().h);
                };
                return WidgetTest;
            })(GrabArt.Tests.TestCase);
            UI.WidgetTest = WidgetTest;            
        })(Tests.UI || (Tests.UI = {}));
        var UI = Tests.UI;
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        (function (UI) {
            (function (Services) {
                (function (Mocks) {
                    var DraggerTestSubjectMock = (function () {
                        function DraggerTestSubjectMock() {
                            this.mouseMoveEv = new GrabArt.Core.EntireEvent();
                            this.mouseDownEv = new GrabArt.Core.EntireEvent();
                            this.mouseUpEv = new GrabArt.Core.EntireEvent();
                            this.moved = {
                                dx: 0,
                                dy: 0
                            };
                            this.redrawed = false;
                        }
                        DraggerTestSubjectMock.prototype.move = function (dx, dy) {
                            this.moved.dx = dx;
                            this.moved.dy = dy;
                        };
                        DraggerTestSubjectMock.prototype.redraw = function () {
                            this.redrawed = true;
                        };
                        return DraggerTestSubjectMock;
                    })();
                    Mocks.DraggerTestSubjectMock = DraggerTestSubjectMock;                    
                })(Services.Mocks || (Services.Mocks = {}));
                var Mocks = Services.Mocks;
            })(UI.Services || (UI.Services = {}));
            var Services = UI.Services;
        })(Tests.UI || (Tests.UI = {}));
        var UI = Tests.UI;
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        (function (UI) {
            (function (Services) {
                var DraggerTest = (function (_super) {
                    __extends(DraggerTest, _super);
                    function DraggerTest() {
                        _super.apply(this, arguments);

                    }
                    DraggerTest.prototype.getDescription = function () {
                        return 'UI.Services.Dragger tests';
                    };
                    DraggerTest.prototype.setUp = function () {
                        var mock = new GrabArt.Tests.UI.Services.Mocks.DraggerTestSubjectMock();
                        return {
                            mock: mock,
                            subject: new GrabArt.UI.Services.Dragger(mock, mock.mouseMoveEv, mock.mouseDownEv, mock.mouseUpEv)
                        };
                    };
                    DraggerTest.prototype.testDraggingProperWork = function () {
                        var setup = this.setUp(), mock = setup.mock, subject = setup.subject;
                        subject.onDragging();
                        mock.mouseDownEv.fire(mock, {
                            clientX: 0,
                            clientY: 0
                        });
                        mock.mouseMoveEv.fire(mock, {
                            clientX: 5,
                            clientY: 10
                        });
                        this.assertEquals(5, mock.moved.dx);
                        this.assertEquals(10, mock.moved.dy);
                        this.assertEquals(true, mock.redrawed);
                    };
                    DraggerTest.prototype.testNotDraggingAfterTurnOff = function () {
                        var setup = this.setUp(), mock = setup.mock, subject = setup.subject;
                        subject.onDragging();
                        subject.offDragging();
                        mock.mouseDownEv.fire(mock, {
                            clientX: 0,
                            clientY: 0
                        });
                        mock.mouseMoveEv.fire(mock, {
                            clientX: 5,
                            clientY: 10
                        });
                        this.assertEquals(0, mock.moved.dx);
                        this.assertEquals(0, mock.moved.dy);
                        this.assertEquals(false, mock.redrawed);
                    };
                    DraggerTest.prototype.testNotDraggingAfterMovingAndThenTurnOff = function () {
                        var setup = this.setUp(), mock = setup.mock, subject = setup.subject;
                        subject.onDragging();
                        mock.mouseDownEv.fire(mock, {
                            clientX: 0,
                            clientY: 0
                        });
                        mock.mouseMoveEv.fire(mock, {
                            clientX: 5,
                            clientY: 10
                        });
                        subject.offDragging();
                        mock.mouseMoveEv.fire(mock, {
                            clientX: 5,
                            clientY: 10
                        });
                        this.assertEquals(5, mock.moved.dx);
                        this.assertEquals(10, mock.moved.dy);
                    };
                    DraggerTest.prototype.testNotDraggingAfterMouseUp = function () {
                        var setup = this.setUp(), mock = setup.mock, subject = setup.subject;
                        subject.onDragging();
                        mock.mouseDownEv.fire(mock, {
                            clientX: 0,
                            clientY: 0
                        });
                        mock.mouseMoveEv.fire(mock, {
                            clientX: 5,
                            clientY: 10
                        });
                        mock.mouseUpEv.fire(mock, {
                        });
                        mock.mouseMoveEv.fire(mock, {
                            clientX: 5,
                            clientY: 10
                        });
                        this.assertEquals(5, mock.moved.dx);
                        this.assertEquals(10, mock.moved.dy);
                    };
                    return DraggerTest;
                })(GrabArt.Tests.TestCase);
                Services.DraggerTest = DraggerTest;                
            })(UI.Services || (UI.Services = {}));
            var Services = UI.Services;
        })(Tests.UI || (Tests.UI = {}));
        var UI = Tests.UI;
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        (function (Core) {
            var EventsTest = (function (_super) {
                __extends(EventsTest, _super);
                function EventsTest() {
                    _super.apply(this, arguments);

                }
                EventsTest.prototype.getDescription = function () {
                    return 'Core.Event tests';
                };
                EventsTest.prototype.testEventsProperWorkWithCasts = function () {
                    var entireEvent = new GrabArt.Core.EntireEvent(), event = entireEvent, callsNum = 0, testCallback = function (sender, args) {
                        callsNum += 1;
                    };
                    event.addListener(testCallback);
                    entireEvent.fire({
                    }, '');
                    this.assertEquals(1, callsNum);
                };
                EventsTest.prototype.testAddAndDeleteCallbackFromEvent = function () {
                    var entireEvent = new GrabArt.Core.EntireEvent(), event = entireEvent, callsNum = 0, testCallback = function (sender, args) {
                        callsNum += 1;
                    };
                    event.addListener(testCallback);
                    entireEvent.fire({
                    }, '');
                    this.assertEquals(1, callsNum);
                    event.removeListener(testCallback);
                    this.assertEquals(1, callsNum);
                };
                return EventsTest;
            })(GrabArt.Tests.TestCase);
            Core.EventsTest = EventsTest;            
        })(Tests.Core || (Tests.Core = {}));
        var Core = Tests.Core;
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (Tests) {
        var TestSuit = (function () {
            function TestSuit() { }
            TestSuit.prototype.run = function () {
                var testCases = this.configure();
                GrabArt.Core.Console.writeLine("[Start tests ...]", "green");
                for(var tests in testCases) {
                    GrabArt.Core.Console.writeLine(testCases[tests].getDescription(), "brown");
                    for(var test in testCases[tests]) {
                        try  {
                            if(test.search("test") != -1) {
                                testCases[tests][test]();
                                GrabArt.Core.Console.writeLine(test + ' - OK', "green");
                            }
                        } catch (ex) {
                            GrabArt.Core.Console.writeLine(test + ' - ' + ex, "red");
                        }
                    }
                }
            };
            TestSuit.prototype.configure = function () {
                return [
                    new Tests.UI.WidgetTest(), 
                    new Tests.Core.EventsTest(), 
                    new Tests.UI.Services.DraggerTest()
                ];
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
