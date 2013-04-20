/// <reference path="../../UI/Widget.ts" />

module GrabArt.GApp.UI {
    export class MainWidget extends GrabArt.UI.Widget {
        constructor(name : string) {
            super(name);
            this.setPosition({ x : 600, y : 100, relative : 'fixed' })
                .setSizes({ w : 200, h : 100 });
        }
    }
}