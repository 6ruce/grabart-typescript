/// <reference path="../../UI/Button.ts" />

module GrabArt.GApp.UI {
    export class CopyButton extends GrabArt.UI.Button {
        constructor() {
            super('copy');
            this.setCaption("COPY TO CLIPBOARD");
            this.setPosition({x: 115, y: 10})
                .setSizes({w: 175, h: 32})
        }
    }
}