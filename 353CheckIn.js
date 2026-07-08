/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwxIYLgmiyFvpaggmosKeor20zscCmE7nKIGYhuBhZjhRhxHfjhIskJN0y1CWlPIYwE/exec";

/* ==========================================
   VARIABLE
========================================== */

let latitude = "";
let longitude = "";
let photoFile = null;

/* ==========================================
   ELEMENT
========================================== */

const locationPopup = document.getElementById("locationPopup");
const allowLocation = document.getElementById("allowLocation");
const denyLocation = document.getElementById("denyLocation");

const locationStatus = document.getElementById("locationStatus");

const saveBtn = document.getElementById("saveBtn");

const photo = document.getElementById("photo");
const previewArea = document.getElementById("previewArea");

const successPopup = document.getElementById("successPopup");
const errorPopup = document.getElementById("errorPopup");
const reportPopup = document.getElementById("reportPopup");

/* ==========================================
   SHOW LOCATION POPUP
========================================== */

window.onload = () => {

    locationPopup.style.display = "flex";

};

/* ==========================================
   GPS
========================================== */

allowLocation.onclick = () => {

    navigator.geolocation.getCurrentPosition(

        success,

        error,

        {
            enableHighAccuracy:true
        }

    );

};

denyLocation.onclick = () => {

    locationPopup.style.display = "none";

};

function success(position){

    latitude = position.coords.latitude;

    longitude = position.coords.longitude;

    locationStatus.classList.remove("red");

    locationStatus.classList.add("green");

    locationStatus.innerHTML =
    "🟢 อนุญาตให้เข้าถึงตำแหน่งที่ตั้งแล้ว";

    locationPopup.style.display = "none";

}

function error(){

    locationPopup.style.display = "none";

}

/* ==========================================
   PHOTO
========================================== */

photo.addEventListener("change",(e)=>{

    photoFile = e.target.files[0];

    if(!photoFile) return;

    const reader = new FileReader();

    reader.onload = function(event){

        previewArea.innerHTML =

        `<img src="${event.target.result}">`;

    }

    reader.readAsDataURL(photoFile);

});

/* ==========================================
   SAVE
========================================== */

saveBtn.onclick = async ()=>{

    if(latitude==""){

        errorPopup.style.display="flex";

        return;

    }

    if(photoFile==null){

        alert("กรุณาแนบรูปภาพ");

        return;

    }

    saveBtn.disabled=true;

    saveBtn.innerHTML="กำลังบันทึก...";

    const formData = new FormData();

    formData.append("email",
    document.getElementById("email").value);

    formData.append("fullname",
    document.getElementById("fullname").value);

    formData.append("studentid",
    document.getElementById("studentid").value);

    formData.append("major",
    document.getElementById("major").value);

    formData.append("latitude",
    latitude);

    formData.append("longitude",
    longitude);

    formData.append("photo",
    photoFile);

    try{

        const response = await fetch(

            WEB_APP_URL,

            {

                method:"POST",

                body:formData

            }

        );

        const result = await response.text();

        console.log(result);

        const now = new Date();

        document.getElementById("saveTime").innerHTML =

        now.toLocaleDateString("th-TH")+

        "<br>"+

        now.toLocaleTimeString("th-TH");

        successPopup.style.display="flex";

    }

    catch(e){

        errorPopup.style.display="flex";

    }

    saveBtn.disabled=false;

    saveBtn.innerHTML="บันทึก";

}

/* ==========================================
   SUCCESS
========================================== */

document.getElementById("successClose").onclick=()=>{

    window.location.href="Human.html";

};

/* ==========================================
   ERROR
========================================== */

document.getElementById("errorClose").onclick=()=>{

    errorPopup.style.display="none";

};

document.getElementById("gotoReport").onclick=()=>{

    errorPopup.style.display="none";

    reportPopup.style.display="flex";

};
