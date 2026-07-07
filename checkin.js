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

            gpsStatus.style.color="#2E7D32";

        },

        ()=>{

            gpsStatus.innerHTML="🔴 กรุณาอนุญาตการเข้าถึงตำแหน่ง";

            gpsStatus.style.color="#D32F2F";

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

            value=value.substring(0,9)+"-"+value.substring(9,10);

        }

        input.value=value;

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

        alert("⚠️ กรุณากรอกข้อมูลให้ครบถ้วน");

        return;

    }

    if(latitude===null || longitude===null){

        alert("📍 กรุณาอนุญาตการเข้าถึงตำแหน่ง");

        return;

    }

    // ส่งข้อมูลในขั้นต่อไป

    alert("✅ พร้อมส่งข้อมูล");

}
