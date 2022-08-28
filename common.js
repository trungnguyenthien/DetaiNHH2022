

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