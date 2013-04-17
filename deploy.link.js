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
                this.widgets = {
                };
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
            Widget.prototype.setPosition = function (position) {
                if(position === null) {
                    throw "position is null";
                }
                this.position = position;
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

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
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
            var mainWindow = new GrabArt.GApp.UI.MainWidget('main');
            mainWindow.addWidget(new GrabArt.UI.Widget('test').setBackgroundColor('red'));
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
            }
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
                    var testWidget = new GrabArt.UI.Widget('test');
                    var domElem = testWidget.drawSelf()[0];
                    var unit = testWidget.getUnit();

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
                    });
                    var domElem = testWidget.drawSelf()[0];
                    var unit = testWidget.getUnit();

                    this.assertEquals(200 + unit, domElem.style.width);
                    this.assertEquals(200 + unit, domElem.style.height);
                };
                WidgetTest.prototype.testSizesSetup = function () {
                    var testWidget = new GrabArt.UI.Widget('test').setSizes({
                        w: 200,
                        h: 200
                    });
                    var unit = testWidget.getUnit();

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
                    new Tests.UI.WidgetTest()
                ];
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;

})(GrabArt || (GrabArt = {}));

