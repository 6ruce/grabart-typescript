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
        var Widget = (function () {
            function Widget(name) {
                this.name = name;
                this.position = {
                    x: 0,
                    y: 0,
                    relative: 'absolute'
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
                this.dragging = false;
                this.turnOnDragg = null;
                this.turnOffDragg = null;
                this.performDragg = null;
                this.widgets = {
                };
                this.mouseOverEv = new GrabArt.Core.EntireEvent();
                this.mouseMoveEv = new GrabArt.Core.EntireEvent();
                this.mouseDownEv = new GrabArt.Core.EntireEvent();
                this.mouseUpEv = new GrabArt.Core.EntireEvent();
                this.MouseOver = this.mouseOverEv;
                this.MouseMove = this.mouseMoveEv;
                this.MouseDown = this.mouseDownEv;
                this.MouseUp = this.mouseUpEv;
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
                    this.bindEvents(this.domElement);
                    this.domElement.attr('id', this.domId);
                }
                this.domElement.css({
                    left: this.position.x + this.unit,
                    top: this.position.y + this.unit,
                    width: this.sizes.w + this.unit,
                    height: this.sizes.h + this.unit,
                    backgroundColor: this.bgColor,
                    position: this.position.relative || 'relative'
                });
                return this.domElement;
            };
            Widget.prototype.bindEvents = function (domElement) {
                var _this = this;
                $(domElement).on('mouseover', function (event) {
                    return _this.mouseOverEv.fire(_this, event);
                }).on('mousemove', function (event) {
                    return _this.mouseMoveEv.fire(_this, event);
                }).on('mousedown', function (event) {
                    return _this.mouseDownEv.fire(_this, event);
                }).on('mouseup', function (event) {
                    return _this.mouseUpEv.fire(_this, event);
                });
            };
            Widget.prototype.move = function (dx, dy) {
                var currentPosition = this.getPosition();
                this.setPosition({
                    x: currentPosition.x + dx,
                    y: currentPosition.y + dy
                });
            };
            Widget.prototype.addWidget = function (widget) {
                this.widgets[widget.getName()] = widget;
                return this;
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
                this.position.relative = position.relative || this.position.relative || 'static';
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
            Widget.prototype.getSizes = function () {
                return this.sizes;
            };
            Widget.prototype.enableDragging = function () {
                var _this = this;
                if(this.turnOnDragg === null) {
                    this.performDragg = function (sender, args) {
                        if(_this.dragging) {
                            _this.move(args.clientX - _this.previosX, args.clientY - _this.previosY);
                            _this.drawSelf();
                            _this.previosX = args.clientX;
                            _this.previosY = args.clientY;
                        }
                    };
                    this.turnOnDragg = function (_1, args) {
                        _this.dragging = true;
                        _this.previosX = args.clientX;
                        _this.previosY = args.clientY;
                    };
                    this.turnOffDragg = function (_1, _2) {
                        return _this.dragging = false;
                    };
                    this.MouseDown.addListener(this.turnOnDragg);
                    this.MouseUp.addListener(this.turnOffDragg);
                    this.MouseMove.addListener(this.performDragg);
                }
                return this;
            };
            Widget.prototype.disableDragging = function () {
                if(this.turnOnDragg !== null) {
                    this.MouseDown.removeListener(this.turnOnDragg);
                    this.MouseUp.removeListener(this.turnOffDragg);
                    this.MouseMove.removeListener(this.performDragg);
                    this.turnOnDragg = null;
                    this.turnOffDragg = null;
                    this.performDragg = null;
                }
                return this;
            };
            Widget.prototype.changeDragging = function (dragging) {
                this.dragging = dragging;
            };
            Widget.prototype.getUnit = function () {
                return this.unit;
            };
            Widget.prototype.setBackgroundColor = function (color) {
                if(color === null) {
                    throw "color is null";
                }
                this.bgColor = color;
                return this;
            };
            Widget.prototype.init = function () {
            };
            return Widget;
        })();
        UI.Widget = Widget;        
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
                    _super.apply(this, arguments);

                }
                MainWidget.prototype.init = function () {
                    this.setPosition({
                        x: 600,
                        y: 100,
                        relative: 'fixed'
                    }).setSizes({
                        w: 200,
                        h: 100
                    });
                };
                return MainWidget;
            })(GrabArt.UI.Widget);
            UI.MainWidget = MainWidget;            
        })(GApp.UI || (GApp.UI = {}));
        var UI = GApp.UI;
    })(GrabArt.GApp || (GrabArt.GApp = {}));
    var GApp = GrabArt.GApp;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    var Application = (function () {
        function Application(page) {
            this.page = page;
        }
        Application.prototype.run = function () {
            var mainWindow = new GrabArt.GApp.UI.MainWidget('main'), test = new GrabArt.UI.Widget('test').setBackgroundColor('red').enableDragging();
            mainWindow.addWidget(test);
            $(this.page).append(mainWindow.draw());
        };
        return Application;
    })();
    GrabArt.Application = Application;    
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
        var SampleTest = (function (_super) {
            __extends(SampleTest, _super);
            function SampleTest() {
                _super.apply(this, arguments);

            }
            SampleTest.prototype.getDescription = function () {
                return 'Recover after git push conflicts';
            };
            SampleTest.prototype.testMustSucced = function () {
                this.assertEquals(1, 1);
            };
            return SampleTest;
        })(Tests.TestCase);
        Tests.SampleTest = SampleTest;        
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
                    var testWidget = new GrabArt.UI.Widget('test'), domElem = testWidget.drawSelf()[0], unit = testWidget.getUnit();
                    this.assertEquals('static', domElem.style.position);
                    this.assertEquals(0 + unit, domElem.style.left);
                    this.assertEquals(0 + unit, domElem.style.top);
                    this.assertEquals(100 + unit, domElem.style.width);
                    this.assertEquals(75 + unit, domElem.style.height);
                };
                WidgetTest.prototype.testNewWidgetCreationWithCustomSizes = function () {
                    var testWidget = new GrabArt.UI.Widget('test').setSizes({
                        w: 200,
                        h: 200
                    }), domElem = testWidget.drawSelf()[0], unit = testWidget.getUnit();
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
                    new Tests.Core.EventsTest()
                ];
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;
})(GrabArt || (GrabArt = {}));
