/// <reference path="../../UI/ToggleButton.ts"/>

module GrabArt.GApp.UI {
    export class StartButton extends GrabArt.UI.ToggleButton {
        constructor() {
            super('start');
            this.setCaption("START");
            this.setPosition({x: 10, y: 10})
                .setSizes({w: 100, h: 70});
        }
    }
}