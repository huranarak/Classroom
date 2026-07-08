/* ==========================================================
   353CheckIn.js
   Part 1
========================================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwxIYLgmiyFvpaggmosKeor20zscCmE7nKIGYhuBhZjhRhxHfjhIskJN0y1CWlPIYwE/exec";

/* ==========================================================
   ELEMENT
========================================================== */

const email = document.getElementById("email");
const fullname = document.getElementById("fullname");
const studentid = document.getElementById("studentid");
const major = document.getElementById("major");

const photo = document.getElementById("photo");
const previewArea = document.getElementById("previewArea");

const saveBtn = document.getElementById("saveBtn");

const locationStatus =
document.getElementById("locationStatus");

/* Popup */

const locationPopup =
document.getElementById("locationPopup");

const successPopup =
document.getElementById("successPopup");

const errorPopup =
document.getElementById("errorPopup");

const reportPopup =
document.getElementById("reportPopup");

const saveTime =
document.getElementById("saveTime");

/* ==========================================================
   VARIABLE
========================================================== */

let latitude = "";
let longitude = "";
let photoBase64 = "";

/* ==========================================================
   POPUP
========================================================== */

function openPopup(id){

    document
    .getElementById(id)
    .classList
    .add("active");

}

function closePopup(id){

    document
    .getElementById(id)
    .classList
    .remove("active");

}

/* ==========================================================
   START
========================================================== */

window.onload=()=>{

    openPopup("locationPopup");

}

/* ==========================================================
   GPS
========================================================== */

document
.getElementById("allowLocation")
.addEventListener("click",()=>{

    if(!navigator.geolocation){

        alert("อุปกรณ์ไม่รองรับ GPS");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        gpsSuccess,

        gpsError,

        {

            enableHighAccuracy:true,

            timeout:10000,

            maximumAge:0

        }

    );

});

document
.getElementById("denyLocation")
.addEventListener("click",()=>{

    closePopup("locationPopup");

});

function gpsSuccess(position){

    latitude=position.coords.latitude;

    longitude=position.coords.longitude;

    locationStatus.classList.remove("red");

    locationStatus.classList.add("green");

    locationStatus.innerHTML=
    "🟢 อนุญาตให้เข้าถึงตำแหน่งที่ตั้งแล้ว";

    closePopup("locationPopup");

}

function gpsError(){

    locationStatus.classList.remove("green");

    locationStatus.classList.add("red");

    locationStatus.innerHTML=
    "🔴 ไม่สามารถเข้าถึงตำแหน่งที่ตั้ง";

    closePopup("locationPopup");

}

/* ==========================================================
   STUDENT ID
========================================================== */

studentid.addEventListener("input",()=>{

    let value=studentid.value;

    value=value.replace(/[^0-9]/g,"");

    if(value.length>9){

        value=value.substring(0,9)+"-"+value.substring(9,10);

    }

    studentid.value=value;

});

/* ==========================================================
   EMAIL
========================================================== */

function checkEmail(){

    return email.value
    .trim()
    .toLowerCase()
    .endsWith("@kkumail.com");

}

/* ==========================================================
   PHOTO
========================================================== */

photo.addEventListener("change",(event)=>{

    const file=event.target.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(e){

        photoBase64=e.target.result
        .split(",")[1];

        previewArea.innerHTML=

        `
        <img
        src="${e.target.result}"
        style="
        width:100%;
        border-radius:15px;
        ">
        `;

    }

    reader.readAsDataURL(file);

});

/* ==========================================================
   VALIDATE
========================================================== */

function validateForm(){

    if(email.value==""){

        alert("กรุณากรอก Email");

        return false;

    }

    if(!checkEmail()){

        alert("กรุณาใช้ KKU Mail");

        return false;

    }

    if(fullname.value==""){

        alert("กรุณากรอกชื่อ");

        return false;

    }

    if(studentid.value.length!=11){

        alert("รหัสนักศึกษาไม่ถูกต้อง");

        return false;

    }

    if(major.value==""){

        alert("กรุณาเลือกสาขา");

        return false;

    }

    if(latitude==""){

        openPopup("errorPopup");

        return false;

    }

    if(photoBase64==""){

        alert("กรุณาแนบรูปภาพ");

        return false;

    }

    return true;

}

/* ==========================================================
   SAVE
========================================================== */

saveBtn.addEventListener("click", async () => {

    if (!validateForm()) return;

    saveBtn.disabled = true;
    saveBtn.innerHTML = "กำลังบันทึก...";

    const data = {

        email: email.value.trim(),

        fullname: fullname.value.trim(),

        studentid: studentid.value.trim(),

        major: major.value,

        latitude: latitude,

        longitude: longitude,

        photo: photoBase64

    };

    try {

        const response = await fetch(WEB_APP_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.status === "success") {

            const now = new Date();

            saveTime.innerHTML =

                now.toLocaleDateString("th-TH") +

                "<br>" +

                now.toLocaleTimeString("th-TH");

            openPopup("successPopup");

        } else {

            console.log(result);

            openPopup("errorPopup");

        }

    }

    catch (error) {

        console.log(error);

        openPopup("errorPopup");

    }

    saveBtn.disabled = false;

    saveBtn.innerHTML = "บันทึก";

});

/* ==========================================================
   SUCCESS
========================================================== */

document
.getElementById("successClose")
.addEventListener("click", () => {

    window.location.href = "Human.html";

});

/* ==========================================================
   ERROR
========================================================== */

document
.getElementById("errorClose")
.addEventListener("click", () => {

    closePopup("errorPopup");

});

document
.getElementById("gotoReport")
.addEventListener("click", () => {

    closePopup("errorPopup");

    openPopup("reportPopup");

});

/* ==========================================================
   REPORT
========================================================== */

document
.getElementById("closeReport")
.addEventListener("click", () => {

    window.location.href = "353Report.html";

});

/* ==========================================================
   CLICK OUTSIDE POPUP
========================================================== */

window.addEventListener("click", (event) => {

    document.querySelectorAll(".popup").forEach((popup) => {

        if (event.target === popup) {

            popup.classList.remove("active");

        }

    });

});

/* ==========================================================
   ENTER KEY
========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        event.preventDefault();

        saveBtn.click();

    }

});

/* ==========================================================
   PREVENT DOUBLE CLICK
========================================================== */

let isSaving = false;

saveBtn.addEventListener("click", () => {

    if (isSaving) return;

    isSaving = true;

    setTimeout(() => {

        isSaving = false;

    }, 3000);

});

/* ==========================================================
   END
========================================================== */
