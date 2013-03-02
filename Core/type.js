var GrabArt;
(function (GrabArt) {
    (function (Core) {
        var Type = (function () {
            function Type(type) {
                this.typeHolder = type;
            }
            Type.prototype.getType = function () {
                return this.typeHolder;
            };
            Type.take = function take(type) {
                return new Type(type);
            };
            Type.prototype.getConstructorTypes = function () {
                return [];
            };
            return Type;
        })();
        Core.Type = Type;        
    })(GrabArt.Core || (GrabArt.Core = {}));
    var Core = GrabArt.Core;
})(GrabArt || (GrabArt = {}));
