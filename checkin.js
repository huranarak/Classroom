/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"ใส่ URL Apps Script ของคุณ";

/* ==========================================
   VARIABLE
========================================== */

let latitude = null;
let longitude = null;

/* ==========================================
   START
========================================== */

window.onload = function(){

    requestLocation();

    setupStudentId();

    setupButton();

    watchForm();

    checkForm();

};

/* ==========================================
   LOCATION
========================================== */

function requestLocation(){

    const status =
    document.getElementById("gpsStatus");

    if(!navigator.geolocation){

        status.innerHTML =
        "🔴 อุปกรณ์ไม่รองรับการระบุตำแหน่ง";

        status.style.color =
        "#D32F2F";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position){

            latitude =
            position.coords.latitude;

            longitude =
            position.coords.longitude;

            status.innerHTML =
            "🟢 บันทึกตำแหน่งที่ตั้งเรียบร้อย";

            status.style.color =
            "#2E7D32";

            checkForm();

        },

        function(){

            latitude = null;

            longitude = null;

            status.innerHTML =
            "🔴 กรุณาเปิดตำแหน่งที่ตั้งเพื่อบันทึกข้อมูล";

            status.style.color =
            "#D32F2F";

            checkForm();

        },

        {

            enableHighAccuracy:true,

            timeout:10000,

            maximumAge:0

        }

    );

}

/* ==========================================
   STUDENT ID
========================================== */

function setupStudentId(){

    const input =
    document.getElementById("studentId");

    input.addEventListener(

        "input",

        function(){

            let value =
            input.value.replace(/\D/g,"");

            if(value.length>10){

                value =
                value.substring(0,10);

            }

            if(value.length>=10){

                value =
                value.substring(0,9)
                +
                "-"
                +
                value.substring(9);

            }

            input.value = value;

            checkForm();

        }

    );

}

/* ==========================================
   WATCH FORM
========================================== */

function watchForm(){

    document

    .querySelectorAll(

        "input,select"

    )

    .forEach(item=>{

        item.addEventListener(

            "input",

            checkForm

        );

        item.addEventListener(

            "change",

            checkForm

        );

    });

}

/* ==========================================
   CHECK FORM
========================================== */

function checkForm(){

    const email =
    document.getElementById("email")
    .value.trim();

    const name =
    document.getElementById("name")
    .value.trim();

    const studentId =
    document.getElementById("studentId")
    .value.trim();

    const major =
    document.getElementById("major")
    .value;

    const photo =
    document.getElementById("photo")
    .files.length;

    const button =
    document.getElementById("submitBtn");

    if(

        email!=="" &&

        name!=="" &&

        studentId!=="" &&

        major!=="" &&

        photo>0 &&

        latitude!==null &&

        longitude!==null

    ){

        button.disabled = false;

    }

    else{

        button.disabled = true;

    }

}
