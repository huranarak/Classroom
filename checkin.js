/* ==========================================
   CONFIG
========================================== */

let latitude = null;
let longitude = null;

/* ==========================================
   START
========================================== */

window.onload = () => {

    requestLocation();

    setupStudentId();

    setupSubmit();

};

/* ==========================================
   GPS
========================================== */

function requestLocation(){

    const gpsStatus = document.getElementById("gpsStatus");

    if(!navigator.geolocation){

        gpsStatus.innerHTML = "🔴 อุปกรณ์ไม่รองรับ GPS";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position)=>{

            latitude = position.coords.latitude;

            longitude = position.coords.longitude;

            gpsStatus.innerHTML = "🟢 พร้อมบันทึกข้อมูล";

            gpsStatus.style.color = "#2E7D32";

        },

        ()=>{

            gpsStatus.innerHTML = "🔴 กรุณาอนุญาตการเข้าถึงตำแหน่ง";

            gpsStatus.style.color = "#D32F2F";

        },

        {

            enableHighAccuracy:true

        }

    );

}

/* ==========================================
   STUDENT ID
========================================== */

function setupStudentId(){

    const input = document.getElementById("studentId");

    input.addEventListener("input",()=>{

        let value = input.value.replace(/\D/g,'');

        if(value.length>9){

            value = value.substring(0,9) + "-" + value.substring(9,10);

        }

        input.value = value;

    });

}

/* ==========================================
   SUBMIT
========================================== */

function setupSubmit(){

    document
        .getElementById("submitBtn")
        .addEventListener("click",submitData);

}

/* ==========================================
   CHECK
========================================== */

function submitData(){

    const name = document.getElementById("name").value.trim();

    const studentId = document.getElementById("studentId").value.trim();

    const email = document.getElementById("email").value.trim();

    const major = document.getElementById("major").value;

    if(

        name === "" ||

        studentId === "" ||

        email === "" ||

        major === ""

    ){

        showWarning();

        return;

    }

    if(latitude === null || longitude === null){

        showLocationError();

        return;

    }

    // =====================================
    // ขั้นต่อไปจะส่งข้อมูลเข้า Apps Script
    // =====================================

    showSuccess();

}

/* ==========================================
   POPUP
========================================== */

function showSuccess(){

    document.getElementById("popupImage").src = "images/success.jpeg";

    document.getElementById("popupTitle").innerHTML =
    "บันทึกข้อมูลเรียบร้อยแล้ว";

    document.getElementById("popupMessage").innerHTML =
    "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว";

    document.getElementById("popup").style.display = "flex";

}

function showWarning(){

    document.getElementById("popupImage").src = "images/error.jpeg";

    document.getElementById("popupTitle").innerHTML =
    "กรอกข้อมูลไม่ครบ";

    document.getElementById("popupMessage").innerHTML =
    "กรุณากรอกข้อมูลให้ครบถ้วน";

    document.getElementById("popup").style.display = "flex";

}

function showLocationError(){

    document.getElementById("popupImage").src = "images/error.jpeg";

    document.getElementById("popupTitle").innerHTML =
    "ไม่พบตำแหน่ง";

    document.getElementById("popupMessage").innerHTML =
    "กรุณาอนุญาตการเข้าถึงตำแหน่ง";

    document.getElementById("popup").style.display = "flex";

}

/* ==========================================
   CLOSE POPUP
========================================== */

document.getElementById("popupButton").onclick = function(){

    document.getElementById("popup").style.display = "none";

};
