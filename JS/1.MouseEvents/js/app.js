'use strict';

class MouseEventsDemo {

    constructor($box, $console, $button) {
        this.box = $box;
        this.console = new Console($console, $button);
        this.bindEvents();
    }

    bindEvents() {
        this.box.on({
            mouseup: this.debounce(this.mouseUp.bind(this), 50),
            mousedown: this.debounce(this.mouseDown.bind(this), 50),
            mousemove: this.debounce(this.mouseMove.bind(this), 50),
            wheel: this.debounce(this.scroll.bind(this), 50)
        })
    }
    scroll(e) {
        if (!e) {
            return;
        }
        var delta = e.originalEvent.deltaY;

        if (delta > 0) {
            this.console.log("Scrolling Down");
        } else {
            this.console.log("Scrolling Up");
        }

        return false;

    }
    mouseUp() {
        this.console.log("Mouse Up");
    }
    mouseDown(e) {
        if (e) {
            e.preventDefault();
        }
        this.console.log("Mouse Down");
    }
    mouseMove() {
        this.console.log("Mouse Move");
    }
    /**
     * As usual thanks to David Walsh for the debounce function
     * https://davidwalsh.name/javascript-debounce-function
     */
    debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate)
                    func.apply(context, args);
                };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
            };
    };

}

class Console {
    constructor($console, $button) {
        this.console = $console.find("pre");
        this.clearButton = $button;
        this.bindEvents();
    }

    bindEvents() {
        this.clearButton.on("click", this.clearConsole.bind(this));
    }

    clearConsole() {
        this.console.html("");
    }

    log(msg) {
        this.console.append($("<p>", {text: msg}));
        this.console.get(0).scrollTop = this.console.get(0).scrollHeight
    }
}
new MouseEventsDemo($(".jumbotron"), $(".console"), $("#clearConsole"));
