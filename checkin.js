/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwBRkFGgdmcMZ8E1UHAIkskmu_6iAvLpgoiywGXh28I-mwoJ0hRW7sm__sSR0Ow_VhR/exec";

let latitude = null;
let longitude = null;

/* ==========================================
   START
========================================== */

window.onload = () => {

    requestLocation();

    setupStudentId();

    setupSubmit();

    setupFormWatcher();

    document.getElementById("submitBtn").disabled = true;

};

/* ==========================================
   GPS
========================================== */

function requestLocation(){

    const gpsStatus = document.getElementById("gpsStatus");

    if(!navigator.geolocation){

        gpsStatus.innerHTML="🔴 อุปกรณ์ไม่รองรับ GPS";
        gpsStatus.style.color="#D32F2F";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        (position)=>{

            latitude=position.coords.latitude;

            longitude=position.coords.longitude;

            gpsStatus.innerHTML="🟢 พร้อมบันทึกข้อมูล";

            gpsStatus.style.color="#2E7D32";

            checkForm();

        },

        ()=>{

            latitude=null;

            longitude=null;

            gpsStatus.innerHTML="🔴 กรุณาอนุญาตการเข้าถึงตำแหน่ง";

            gpsStatus.style.color="#D32F2F";

            checkForm();

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

    const input=document.getElementById("studentId");

    input.addEventListener("input",()=>{

        let value=input.value.replace(/\D/g,"");

        if(value.length>10){

            value=value.substring(0,10);

        }

        if(value.length>=10){

            value=value.substring(0,9)+"-"+value.substring(9);

        }

        input.value=value;

        checkForm();

    });

}

/* ==========================================
   WATCH FORM
========================================== */

function setupFormWatcher(){

    document.querySelectorAll("input,select").forEach(item=>{

        item.addEventListener("input",checkForm);

        item.addEventListener("change",checkForm);

    });

}

/* ==========================================
   BUTTON
========================================== */

function checkForm(){

    const name=document.getElementById("name").value.trim();

    const studentId=document.getElementById("studentId").value.trim();

    const email=document.getElementById("email").value.trim();

    const major=document.getElementById("major").value;

    const button=document.getElementById("submitBtn");

    if(

        name!=="" &&

        studentId!=="" &&

        email!=="" &&

        major!=="" &&

        latitude!==null &&

        longitude!==null

    ){

        button.disabled=false;

        button.classList.add("active");

    }

    else{

        button.disabled=true;

        button.classList.remove("active");

    }

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
   SUBMIT DATA
========================================== */

function submitData(){

    const name=document.getElementById("name").value.trim();

    const studentId=document.getElementById("studentId").value.trim();

    const email=document.getElementById("email").value.trim();

    const major=document.getElementById("major").value;

    if(

        name==="" ||

        studentId==="" ||

        email==="" ||

        major===""

    ){

        showWarning();

        return;

    }

    if(latitude===null || longitude===null){

        showLocationError();

        return;

    }

    document.getElementById("submitBtn").disabled=true;

    document.getElementById("submitBtn").innerHTML="กำลังบันทึก...";

    // ===== Part 2 จะมาต่อจากตรงนี้ =====

}
