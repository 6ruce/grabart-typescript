/// <reference path="../TestCase.ts" />
/// <reference path="../../UI/Widget.ts" />

module GrabArt.Tests.UI {
    export class WidgetTest extends GrabArt.Tests.TestCase {
        getDescription() : string {
            return 'UI.Widget tests';
        }

        testNewWidgetCreationWithoutParams() : void {
            var testWidget = new GrabArt.UI.Widget('test');
            var domElem    = testWidget.drawSelf();

            this.assertEquals('static', domElem.style.position);
            this.assertEquals(0       , domElem.style.left    );
            this.assertEquals(0       , domElem.style.top     );
            this.assertEquals(100     , domElem.style.width   );
            this.assertEquals(75      , domElem.style.height  );
        }
    }
}