define(function (require) {
    var activity = require("sugar-web/activity/activity");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        init();
    });

});

var READY = 0;
var AWAIT = 1;
var CLICK = 2;

var state;
var clickMeElement;
var currentTimer;
var beginCount;

function init() {
    state = READY;
    clickMeElement = document.getElementById("click-me");
    clickMeElement.onclick = function (el) {
        if (state == READY) {
            clearTimeout(currentTimer);
            state = AWAIT;
            clickMeElement.style.backgroundColor = "#ff0";
            clickMeElement.innerHTML = '';
            currentTimer = setTimeout(function () {
                beginCount = Date.now();
                state = CLICK;
                clickMeElement.style.backgroundColor = '#0f0';
            }, Math.random() * 3000);
        } else if (state == AWAIT) {
            clearTimeout(currentTimer);
            state = READY;
            clickMeElement.style.backgroundColor = "#f00";
            currentTimer = setTimeout(function () {
                clickMeElement.style.backgroundColor = '#00f';
                clickMeElement.innerHTML = 'Start';
            }, 1000);
        } else if (state == CLICK) {
            endCount = Date.now();
            state = READY;
            clickMeElement.innerHTML = 'Congrats!';
            miliSeconds = endCount - beginCount;
            if (miliSeconds > 1000)
                miliSeconds = (miliSeconds / 1000.0).toFixed(3) + ' s';
            else
                miliSeconds += ' ms';
            clickMeElement.innerHTML += '<br />' + miliSeconds;
            currentTimer = setTimeout(function () {
                clickMeElement.style.backgroundColor = '#00f';
                clickMeElement.innerHTML = 'Start';
            }, 1000);
        }
    };
}
