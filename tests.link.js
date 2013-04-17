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

var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
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
            return EntireEvent;
        })(Event);
        Core.EntireEvent = EntireEvent;        
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
                    new Tests.SampleTest()
                ];
            };
            return TestSuit;
        })();
        Tests.TestSuit = TestSuit;        
    })(GrabArt.Tests || (GrabArt.Tests = {}));
    var Tests = GrabArt.Tests;

})(GrabArt || (GrabArt = {}));

