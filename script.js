let middenpagina = document.querySelector('#middenpagina');
let welkuuropkomendezon = document.querySelector('#welkuuropkomendezon');
let tekstcurrentDate = document.querySelector('#welkuuropkomendezon');
let innermodal = document.querySelector('#innermodal');
let modal = document.querySelector('#modal');
let buttonbelow = document.querySelector('#buttonbelow');
let closemodalbutton = document.querySelector('#X');

let date = new Date();
let minute = date.getMinutes();
let hour = date.getHours();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

let divider = 1.5

function closeModal() {

    modal.style.display = '';
}

closemodalbutton.onclick = closeModal;


function time() {
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    tekstcurrentDate.textContent =
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ' ' + "UUR";
}

setInterval(time, 1000);


let currentDate = `${hour}:${minute}`;
console.log(currentDate);

if (minute <= 10) {
    currentDate = `${hour}:0${minute}`;
}

tekstcurrentDate.innerHTML = currentDate + ' ' + 'UUR';


let apiKey = 'openuv-fbefzfrlgqebxx5-io';
let apiUrl = 'https://api.openuv.io/api/v1/uv?lat=51.9&lng=4.4';



fetch(apiUrl, {
        method: 'GET',
        headers: {
            'x-access-token': apiKey,
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let uv = data.result.uv / divider;

        let tekstUV = document.querySelector('#welkeUVopkomendezon');
        let n = uv.toFixed(1);
        tekstUV.innerHTML = 'UV' + ' ' + n;

        let uv_max = data.result.uv_max / divider;
        let tekstUVmax = document.querySelector('#UVmaxmelding');
        let n2 = uv_max.toFixed(1);
        tekstUVmax.innerHTML = n2;
    })
    .catch(error => console.error(error));



function reqListener() {
    let getal = this.responseText.trim();
    if (getal >= 745) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = '';
    }
}

function serverGet() {
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "https://cmd.camp/iot/get/34UcuqLr");
    oReq.send();
}

let timer = setInterval(serverGet, 10);

let data = {
    // hier alles dat openuv teruggeeft
    'result': {
        'uv': 0.9716,
        'uv_max': 1.8738,
        'uv_time': "2023-04-17T13:55:49.412Z",
        'uv_max_time': "2023-04-17T11:42:50.337Z",
    },
    'ozone': 273.1,
    'ozone_time': "2023-04-12T15:04:31.773Z",

    'safe_exposure_time': {
        'st1': 213,
        'st2': 255,
        'st3': 340,
        'st4': 426,
        'st5': 681,
        'st6': 1277,

        'sun_info': {
            'sun_position': {
                'altitude': 0.32145799793163493,
                'azimuth': 2.393364261860886,
            },
            'sun_times': {
                'dawn': "2023-04-17T05:56:43.741Z",
                'dusk': "2023-04-17T17:28:56.933Z",
                'goldenHour': "2023-04-17T16:07:14.599Z",
                'goldenHourEnd': "2023-04-17T07:18:26.075Z",
                'nadir': "2023-04-16T23:42:50.337Z",
                'nauticalDawn': "2023-04-17T05:17:37.152Z",
                'nauticalDusk': "2023-04-17T18:08:03.522Z",
                'night': "2023-04-17T18:47:02.039Z",
                'nightEnd': "2023-04-17T04:38:38.635Z",
                'solarNoon': "2023-04-17T11:42:50.337Z",
                'sunrise': "2023-04-17T06:31:04.038Z",
                'sunriseEnd': "2023-04-17T06:34:39.983Z",
                'sunset': "2023-04-17T16:54:36.636Z",
                'sunsetStart': "2023-04-17T16:51:00.690Z",
            },
        }

    }

}