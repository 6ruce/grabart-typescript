<<<<<<< HEAD:application.js
var GrabArt;
(function (GrabArt) {
    var Application = (function () {
        function Application() { }
        Application.prototype.run = function () {
            var container = this.configureWidgets(new GrabArt.UI.WidgetContainer());
        };
        Application.prototype.configureWidgets = function (wc) {
            return wc;
        };
        return Application;
    })();
    GrabArt.Application = Application;    
})(GrabArt || (GrabArt = {}));
//@ sourceMappingURL=application.js.map
=======
var GrabArt;
(function (GrabArt) {
    var Application = (function () {
        function Application() { }
        Application.prototype.run = function () {
            var container = this.configureWidgets(new GrabArt.UI.WidgetContainer());
            var test = "test";
        };
        Application.prototype.configureWidgets = function (wc) {
            return wc;
        };
        return Application;
    })();
    GrabArt.Application = Application;    
})(GrabArt || (GrabArt = {}));

//@ sourceMappingURL=Application.js.map
>>>>>>> origin/master:Application.js