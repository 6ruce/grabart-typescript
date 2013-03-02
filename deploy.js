var GrabArt;
(function (GrabArt) {
    })(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    var DependencyContainer = (function () {
        function DependencyContainer() { }
        DependencyContainer.prototype.resolve = function (type) {
            return new type();
        };
        return DependencyContainer;
    })();
    GrabArt.DependencyContainer = DependencyContainer;    
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var Widget = (function () {
            function Widget() { }
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
};
var GrabArt;
(function (GrabArt) {
    (function (UI) {
        var WidgetContainer = (function (_super) {
            __extends(WidgetContainer, _super);
            function WidgetContainer() {
                _super.apply(this, arguments);

            }
            return WidgetContainer;
        })(UI.Widget);
        UI.WidgetContainer = WidgetContainer;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
var GrabArt;
(function (GrabArt) {
    var Application = (function () {
        function Application() { }
        Application.prototype.run = function () {
            var container = this.configureDependencies(new GrabArt.DependencyContainer());
            container.resolve(GrabArt.UI.WidgetContainer);
        };
        Application.prototype.configureDependencies = function (dc) {
            return dc;
        };
        return Application;
    })();
    GrabArt.Application = Application;    
})(GrabArt || (GrabArt = {}));
var application = new GrabArt.Application();
try  {
    application.run();
} catch (exc) {
    console.log(exc);
}
