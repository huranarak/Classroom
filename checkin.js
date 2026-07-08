/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwBRkFGgdmcMZ8E1UHAIkskmu_6iAvLpgoiywGXh28I-mwoJ0hRW7sm__sSR0Ow_VhR/exec";

/* ==========================================
   GPS
========================================== */

const BUILDING_LAT = 16.473682724858868;
const BUILDING_LNG = 102.8312857029792;
const MAX_DISTANCE = 30;

/* ==========================================
   VARIABLE
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

    watchForm();

    const button = document.getElementById("submitBtn");

    button.disabled = true;

};

/* ==========================================
   REQUEST LOCATION
========================================== */

function requestLocation(){

    const gpsStatus = document.getElementById("gpsStatus");

    if(!navigator.geolocation){

        gpsStatus.innerHTML =
        "🔴 อุปกรณ์ไม่รองรับ GPS";

        gpsStatus.style.color = "#D32F2F";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position)=>{

            latitude = position.coords.latitude;

            longitude = position.coords.longitude;

            gpsStatus.innerHTML =
            "🟢 พร้อมบันทึกข้อมูล";

            gpsStatus.style.color =
            "#2E7D32";

            checkForm();

        },

        ()=>{

            latitude = null;

            longitude = null;

            gpsStatus.innerHTML =
            "🔴 กรุณาอนุญาตการเข้าถึงตำแหน่ง";

            gpsStatus.style.color =
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

    input.addEventListener("input",()=>{

        let value =
        input.value.replace(/\D/g,"");

        if(value.length>10){

            value=value.substring(0,10);

        }

        if(value.length>=10){

            value =
            value.substring(0,9)
            + "-"
            + value.substring(9);

        }

        input.value = value;

        checkForm();

    });

}

/* ==========================================
   WATCH FORM
========================================== */

function watchForm(){

    document
    .querySelectorAll("input,select")
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

    const name =
    document
    .getElementById("name")
    .value
    .trim();

    const studentId =
    document
    .getElementById("studentId")
    .value
    .trim();

    const email =
    document
    .getElementById("email")
    .value
    .trim();

    const major =
    document
    .getElementById("major")
    .value;

    const button =
    document
    .getElementById("submitBtn");

    if(

        name !== "" &&

        studentId !== "" &&

        email !== "" &&

        major !== "" &&

        latitude !== null &&

        longitude !== null

    ){

        button.disabled = false;

        button.classList.add("active");

    }

    else{

        button.disabled = true;

        button.classList.remove("active");

    }

}

/* ==========================================
   SUBMIT
========================================== */

function setupSubmit(){

    document

    .getElementById("submitBtn")

    .addEventListener(

        "click",

        submitData

    );

}

/* ==========================================
   SUBMIT DATA
========================================== */

function submitData(){

    const name =
    document.getElementById("name").value.trim();

    const studentId =
    document.getElementById("studentId").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const major =
    document.getElementById("major").value;

    if(

        name === "" ||

        studentId === "" ||

        email === "" ||

        major === ""

    ){

        showWarning();

        return;

    }

    if(

        latitude === null ||

        longitude === null

    ){

        showLocationError();

        return;

    }

    const button =
    document.getElementById("submitBtn");

    button.disabled = true;

    button.innerHTML =
    "กำลังบันทึกข้อมูล...";

/* ==========================================
   SEND DATA
========================================== */

    const data={

        action:"checkin",

        name:name,

        studentId:studentId,

        email:email,

        major:major,

        latitude:latitude,

        longitude:longitude

    };

    fetch(

    WEB_APP_URL,

    {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(data)

    }

)

    .then(response => response.json())

    .then(result=>{

        button.disabled=false;

        button.innerHTML="บันทึกข้อมูล";

      if(result.success){

    showSuccess(result.datetime);

}else{

    if(result.message === "นอกรัศมี"){

        showError(
            "คุณอยู่นอกรัศมีในการเช็คชื่อ",
            "กรุณากลับไปยังห้องเรียน"
        );

    }else{

        showError(
            "ไม่สามารถบันทึกข้อมูลได้",
            result.message || "โปรดลองอีกครั้ง"
        );

    }

}
    })

    .catch(error=>{

        console.error(error);

        button.disabled=false;

        button.innerHTML="บันทึกข้อมูล";

        showError(

            "ไม่สามารถบันทึกข้อมูลได้",

            "โปรดลองอีกครั้ง<br><br>หากยังไม่สามารถบันทึกข้อมูลได้ กรุณาแจ้งปัญหาการใช้งาน"

        );

    });

}

/* ==========================================
   SUCCESS POPUP
========================================== */

function showSuccess(dateTime){

    document.getElementById("popupImage").src =
    "images/SUCCESS.JPG";

    document.getElementById("popupTitle").innerHTML =
    "บันทึกข้อมูลเรียบร้อยแล้ว";

    document.getElementById("popupMessage").innerHTML =
    dateTime;

    document.getElementById("reportButton").style.display =
    "none";

    document.getElementById("popup").style.display =
    "flex";

    document.getElementById("popupButton").onclick = function(){

        window.location.href = "human.html";

    };

}

/* ==========================================
   WARNING
========================================== */

function showWarning(){

    showError(

        "กรอกข้อมูลไม่ครบ",

        "กรุณากรอกข้อมูลให้ครบถ้วน"

    );

}

/* ==========================================
   LOCATION ERROR
========================================== */

function showLocationError(){

    showError(

        "ไม่พบตำแหน่ง",

        "กรุณาอนุญาตการเข้าถึงตำแหน่ง"

    );

}

/* ==========================================
   ERROR POPUP
========================================== */

function showError(title, message){

    document.getElementById("popupImage").src =
    "images/ERROR.JPG";

    document.getElementById("popupTitle").innerHTML =
    title;

    document.getElementById("popupMessage").innerHTML =
    message;

    document.getElementById("reportButton").style.display =
    "inline-block";

    document.getElementById("popup").style.display =
    "flex";

    document.getElementById("popupButton").onclick = function(){

        document.getElementById("popup").style.display =
        "none";

    };

    document.getElementById("reportButton").onclick = function(){

        window.location.href = "report.html";

    };

}
