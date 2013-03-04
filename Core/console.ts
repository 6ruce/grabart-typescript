module GrabArt.Core {
    declare var $;
    export class Console {

        static writeLine(text : string, color : string = "black") {
            $('#consoleContent').append($('<div></div>').html('> ' + text).css('color', color));
        }
    }
}