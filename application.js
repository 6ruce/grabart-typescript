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
