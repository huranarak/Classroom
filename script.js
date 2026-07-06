console.log("COLA Classroom Ready");
// ===== CONFIG =====

const SCRIPT_URL = ""; // ใส่ URL Apps Script ทีหลัง

const CENTER_LAT = 16.473588299122117;
const CENTER_LNG = 102.83122754864361;
const RADIUS = 30;
const AREA = "COLA";

// ==================

const form = document.getElementById("attendanceForm");
const btn = document.getElementById("checkBtn");
const locationStatus = document.getElementById("locationStatus");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!navigator.geolocation) {

        alert("อุปกรณ์นี้ไม่รองรับ GPS");

        return;

    }

    btn.disabled = true;
    btn.innerHTML = "กำลังตรวจสอบ...";

    locationStatus.innerHTML = "กำลังค้นหาตำแหน่ง...";

    navigator.geolocation.getCurrentPosition(

        success,

        error,

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

});

function success(position) {

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    const distance = calculateDistance(
        CENTER_LAT,
        CENTER_LNG,
        lat,
        lng
    );

    let status = "";

    if (distance <= RADIUS) {

        status = "อยู่ในพื้นที่";

        locationStatus.innerHTML =
            "<span class='success'>✅ อยู่ในพื้นที่ (" +
            distance.toFixed(2) +
            " เมตร)</span>";

    } else {

        status = "อยู่นอกพื้นที่";

        locationStatus.innerHTML =
            "<span class='warning'>⚠️ อยู่นอกพื้นที่ (" +
            distance.toFixed(2) +
            " เมตร)</span>";

    }

    const data = {

        fullname: document.getElementById("fullname").value,

        studentId: document.getElementById("studentId").value,

        email: document.getElementById("email").value,

        major: document.getElementById("major").value,

        latitude: lat,

        longitude: lng,

        distance: distance.toFixed(2),

        area: AREA,

        status: status

    };

    if (SCRIPT_URL == "") {

        console.log(data);

        alert("เชื่อม Apps Script ก่อน");

        btn.disabled = false;
        btn.innerHTML = "เช็คชื่อเข้าเรียน";

        return;

    }

    fetch(SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify(data)

    })

        .then(res => res.text())

        .then(result => {

            alert("✅ เช็คชื่อสำเร็จ");

            form.reset();

            locationStatus.innerHTML = "ยังไม่ได้ตรวจสอบ";

            btn.disabled = false;

            btn.innerHTML = "เช็คชื่อเข้าเรียน";

        })

        .catch(err => {

            console.log(err);

            alert("เกิดข้อผิดพลาด");

            btn.disabled = false;

            btn.innerHTML = "เช็คชื่อเข้าเรียน";

        });

}

function error(err) {

    locationStatus.innerHTML =
        "<span class='error'>❌ ไม่สามารถระบุตำแหน่งได้</span>";

    alert("กรุณาอนุญาตการเข้าถึงตำแหน่ง");

    btn.disabled = false;

    btn.innerHTML = "เช็คชื่อเข้าเรียน";

}

function calculateDistance(lat1, lon1, lat2, lon2) {

    const R = 6371000;

    const dLat = (lat2 - lat1) * Math.PI / 180;

    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =

        Math.sin(dLat / 2) * Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *

        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *

        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;

}
