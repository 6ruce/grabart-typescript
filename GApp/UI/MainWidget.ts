/// <reference path="../../UI/ContainingWidget.ts" />

module GrabArt.GApp.UI {
    export class MainWidget extends GrabArt.UI.ContainingWidget {
        constructor() {
            super('main');
            this.setPosition({ x : 600, y : 100, relative : 'fixed' })
                .setSizes({ w : 300, h : 225 })
                .setZIndex(3000);
        }
    }
}