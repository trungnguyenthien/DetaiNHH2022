function randInt(min, max) {
    return min + Math.floor(Math.random() * max - min - 1);
}

function forEach(array, action) {
    for (var i = 0; i < array.length; i++)
        action(array[i]);
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
        vibrate: [300, 100, 400, 300, 100, 400],
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
            if (perm === "granted") {
                alert("bạn đã đăng kí nhận thông báo thành công");
                registerSW();
            } else {
                alert("bạn cần phải đồng ý để được nhận thông báo");
            }
        })

    } else {
        registerSW();
    }
}