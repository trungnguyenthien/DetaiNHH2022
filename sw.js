// Triggered by postMessage in the page
onmessage = function (evt) {
    var time = 0;
    setInterval(function () {
        postMessage(time++);
    }, 50);
};