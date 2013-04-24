/// <reference path="../Core/Process.ts" />

module GrabArt.GApp {
    declare var $;
    export class Graber {
        enableLayerFinding() : void {
            GrabArt.Core.Process.create('layersFind', 300, () => {

            });
        }

        disableLayerFinding() : void {
            GrabArt.Core.Process.remove('layersFind');
        }
    }
}