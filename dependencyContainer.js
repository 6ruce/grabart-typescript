var GrabArt;
(function (GrabArt) {
    var DependencyContainer = (function () {
        function DependencyContainer() { }
        DependencyContainer.prototype.resolve = function (type) {
            var dependencies = type.getConstructorTypes();
            if(dependencies.length == 0) {
                return new type();
            } else {
                return new type(1);
            }
            return;
        };
        return DependencyContainer;
    })();
    GrabArt.DependencyContainer = DependencyContainer;    
})(GrabArt || (GrabArt = {}));
