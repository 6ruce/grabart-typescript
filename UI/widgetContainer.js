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
            function WidgetContainer(n) {
                        _super.call(this);
            }
            WidgetContainer.getConstructorTypes = function getConstructorTypes() {
                return [];
            };
            return WidgetContainer;
        })(UI.Widget);
        UI.WidgetContainer = WidgetContainer;        
    })(GrabArt.UI || (GrabArt.UI = {}));
    var UI = GrabArt.UI;
})(GrabArt || (GrabArt = {}));
