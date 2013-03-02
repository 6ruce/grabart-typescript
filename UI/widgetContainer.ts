/// <reference path="widget.ts" />
/// <reference path="../Core/iInspectable.ts" />

module GrabArt.UI {
    export class WidgetContainer extends Widget {

        constructor (n : number) { super(); }

        static getConstructorTypes() : Core.IInspectable[] { return []; }
    }
}