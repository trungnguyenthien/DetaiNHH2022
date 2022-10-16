function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffledArray(array) {
    return array.sort((a, b) => 0.5 - Math.random());
}

function pickOne(array) {
    return shuffledArray(array).slice(0, 1);
}

function forEach(array, action) {
    for (var i = 0; i < array.length; i++)
        action(array[i]);
}

function forEachIndex(array, action) {
    for (var i = 0; i < array.length; i++)
        action(i, array[i]);
}

String.prototype.format = function () {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

function getProvince(selectId) {
    axios.get('https://provinces.open-api.vn/api/p/')
        .then(function (response) {
            $.each(response.data, function (i, item) {
                $('#' + selectId).append($('<option>', {
                    selected: false,
                    value: item.code,
                    text: item.name
                }));
            });
        });
}

function getDistrict(pid, selectId) {
    axios.get("https://provinces.open-api.vn/api/p/" + pid + "?depth=2")
        .then(function (response) {
            $.each(response.data.districts, function (i, item) {
                $('#' + selectId).append($('<option>', {
                    selected: false,
                    value: item.code,
                    text: item.name
                }));
            });
        });
}

/// Refer: https://www.javascripttutorial.net/web-apis/javascript-notification/
/// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
function showNoti(message, fullMessage) {
    const isGranted = Notification.permission === "granted"
    if (!isGranted) return;

    myRegistration.showNotification(message, {
        body: fullMessage,
        icon: './assets/icon.png',
        image: './assets/noti-bg.jpeg',
        // sound: 'https://github.com/trungnguyenthien/DetaiNHH2022/blob/main/assets/ring.mp3?raw=true',
        silent: false,
        vibrate: [300, 100, 400],
        tag: 'blah-blah-blah'
    });
}

var myRegistration = null;

function registerSW() {
    navigator.serviceWorker
        .register('sw.js')
        .then(function (registration) {
            myRegistration = registration;
        });
}

function requestNotificationPermission() {
    if (!("Notification" in window)) return alert("Trình duyệt của bạn k hỗ trợ cái noti")

    if (Notification.permission === "denied" || Notification.permission === "default") {
        Notification.requestPermission().then((perm) => {
            if (perm === "granted") registerSW();
        })
    } else {
        registerSW();
    }
}
//use to load navbar every page with included navbar div
$("#navbar").load("/component/navbar.html")


function makeInterval(delay, time, callback) {
    var count = 0;
    var intervarlId;
    intervarlId = setInterval(function () {
        if (count === time) {
            clearInterval(intervarlId);
            return;
        }
        count++;
        callback();

    }, delay);
}

const playSound = () => {
    const audio = new Audio("https://github.com/trungnguyenthien/DetaiNHH2022/blob/main/assets/ring.mp3?raw=true");
    audio.play();
}