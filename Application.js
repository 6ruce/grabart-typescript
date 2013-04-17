var GrabArt;
(function (GrabArt) {
    var Application = (function () {
        function Application(page) {
            this.page = page;
        }
        Application.prototype.run = function () {
            $(this.page).append(new GrabArt.UI.Widget('main').draw());
        };
        return Application;
    })();
    GrabArt.Application = Application;    
})(GrabArt || (GrabArt = {}));

//@ sourceMappingURL=Application.js.map
