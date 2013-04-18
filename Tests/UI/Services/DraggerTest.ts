/// <reference path="../../TestCase.ts"                />
/// <reference path="_Mocks/DraggerTestSubjectMock.ts" />
/// <reference path="../../../UI/Services/Dragger.ts" />

module GrabArt.Tests.UI.Services {
    export class DraggerTest extends GrabArt.Tests.TestCase {
        getDescription() : string {
            return 'UI.Services.Dragger tests';
        }

        setUp() : {
            subject : GrabArt.UI.Services.Dragger;
            mock    : GrabArt.Tests.UI.Services.Mocks.DraggerTestSubjectMock;
        } {
            var mock = new GrabArt.Tests.UI.Services.Mocks.DraggerTestSubjectMock()
            return {
                mock    : mock,
                subject : new GrabArt.UI.Services.Dragger(
                      mock
                    , mock.mouseMoveEv
                    , mock.mouseDownEv
                    , mock.mouseUpEv
                )
            };
        }

        testDraggingProperWork() : void {
            var   setup   = this.setUp()
                , mock    = setup.mock
                , subject = setup.subject

            subject.onDragging();
            mock.mouseDownEv.fire(mock, {clientX: 0, clientY: 0});
            mock.mouseMoveEv.fire(mock, {clientX: 5, clientY: 10});

            this.assertEquals(5   , mock.moved.dx);
            this.assertEquals(10  , mock.moved.dy);
            this.assertEquals(true, mock.redrawed);
        }

        testNotDraggingAfterTurnOff() : void {
            var   setup   = this.setUp()
                , mock    = setup.mock
                , subject = setup.subject

            subject.onDragging();
            subject.offDragging();
            mock.mouseDownEv.fire(mock, {clientX: 0, clientY: 0});
            mock.mouseMoveEv.fire(mock, {clientX: 5, clientY: 10});

            this.assertEquals(0    , mock.moved.dx);
            this.assertEquals(0    , mock.moved.dy);
            this.assertEquals(false, mock.redrawed);
        }

        testNotDraggingAfterMovingAndThenTurnOff() : void {
            var   setup   = this.setUp()
                , mock    = setup.mock
                , subject = setup.subject

            subject.onDragging();
            mock.mouseDownEv.fire(mock, {clientX: 0, clientY: 0});
            mock.mouseMoveEv.fire(mock, {clientX: 5, clientY: 10});
            subject.offDragging();

            mock.mouseMoveEv.fire(mock, {clientX: 5, clientY: 10});

            this.assertEquals(5  , mock.moved.dx);
            this.assertEquals(10 , mock.moved.dy);
        }

        testNotDraggingAfterMouseUp() : void {
            var   setup   = this.setUp()
                , mock    = setup.mock
                , subject = setup.subject

            subject.onDragging();
            mock.mouseDownEv.fire(mock, {clientX: 0, clientY: 0});
            mock.mouseMoveEv.fire(mock, {clientX: 5, clientY: 10});
            mock.mouseUpEv.fire(mock, {});
            mock.mouseMoveEv.fire(mock, {clientX: 5, clientY: 10});

            this.assertEquals(5  , mock.moved.dx);
            this.assertEquals(10 , mock.moved.dy);
        }
    }
}