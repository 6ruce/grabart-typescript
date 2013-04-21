/// <reference path="../../UI/ProgressBar.ts" />

module GrabArt.GApp.UI {
    export class GrabProgress extends GrabArt.UI.ProgressBar {
        constructor() {
            super('grabProgress');
            this.setPosition({x: 115, y: 47})
                .setSizes({w: 175, h: 33});
        }
    }
}