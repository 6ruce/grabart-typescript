/// <reference path="../../../../Core/Event.ts" />

module GrabArt.Tests.UI.Services.Mocks {
    export class DraggerTestSubjectMock {
        public mouseMoveEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        public mouseDownEv : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();
        public mouseUpEv   : GrabArt.Core.EntireEvent = new GrabArt.Core.EntireEvent();

        public moved     = {dx : 0, dy : 0};
        public redrawed  = false;

        move(dx : number, dy : number) : void {
            this.moved.dx = dx;
            this.moved.dy = dy;
        }

        redraw() : void {
            this.redrawed = true;
        }
    }
}