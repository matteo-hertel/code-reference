/* jshint esversion: 6 */
'use strict';

class SpeechRecognitionDemo {

    constructor(button, output) {
        this.button = button;
        this.output = output;
        this.defaults();
        this.setUp();
        this.bindDomEvents();
    }

    defaults() {
        this.recognition = new(webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition || SpeechRecognition)();
        this.messages = ["Listening...", "Start listening"];
    }

    setUp() {
        this.recognition.lang = 'en-GB';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;
        this.bindAudioEvents();
    }

    bindDomEvents() {
        this.button.addEventListener("click", this.startListening.bind(this), false);
    }

    startListening() {
        this.recognition.start();
        this.button.children[0].innerHTML = this.messages[0];
    }

    bindAudioEvents() {
        this.recognition.onresult = this.handleResult.bind(this);
        this.recognition.onend = this.restoreButtonMessage.bind(this);
    }
    handleResult(e) {
        this.output.addOutput(e.results[0][0].transcript);
    }
    restoreButtonMessage() {
        this.button.children[0].innerHTML = this.messages[1];
    }
}
class Output {
    constructor(output) {
        this.output = output;
    }

    clearOutput() {
        this.output.innerHTML = "";
    }
    generateOutput(msg) {
        var b = document.createElement("b");
        b.innerHTML = `${Helpers.getDate()}: `;

        var span = document.createElement("span");
        span.innerHTML = msg;

        var p = document.createElement("p");
        p.appendChild(b);
        p.appendChild(span);

        return p;
    }
    addOutput(msg) {
        this.output.appendChild(this.generateOutput(msg));
    }

}

class Helpers {
    static getDate() {
        return new Date().toISOString();
    }
}
new SpeechRecognitionDemo(document.getElementById("startListening"), new Output(document.getElementById("audioOutput")));
