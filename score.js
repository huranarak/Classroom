/* ==========================================
   START
========================================== */

window.onload = () => {

    setupStudentId();

    setupSubmit();

};

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

        input.value=value;

    });

}

/* ==========================================
   BUTTON
========================================== */

function setupSubmit(){

    document

    .getElementById("searchBtn")

    .addEventListener(

        "click",

        searchScore

    );

}

/* ==========================================
   SEARCH
========================================== */

function searchScore(){

    const email =
    document
    .getElementById("email")
    .value
    .trim();

    const studentId =
    document
    .getElementById("studentId")
    .value
    .trim();

    if(

        email==="" ||

        studentId===""

    ){

        showPopup(

            "กรอกข้อมูลไม่ครบ",

            "กรุณากรอกอีเมลและรหัสนักศึกษาให้ครบถ้วน"

        );

        return;

    }

    /* ======================================
       APPS SCRIPT
       จะเชื่อมในขั้นตอนถัดไป
    ====================================== */

    // ตัวอย่างทดสอบ

    if(

        email==="student@kkumail.com"

        &&

        studentId==="653280123-4"

    ){

        window.location.href="score-result.html";

    }

    else{

        showPopup(

            "ไม่พบข้อมูล",

            "กรุณาตรวจสอบอีเมลและรหัสนักศึกษาให้ถูกต้อง"

        );

    }

}

/* ==========================================
   POPUP
========================================== */

function showPopup(title, message){

    document
    .getElementById("popupImage")
    .src = "images/error.jpg";

    document
    .getElementById("popupTitle")
    .innerHTML = title;

    document
    .getElementById("popupMessage")
    .innerHTML = message;

    document
    .getElementById("popup")
    .style.display = "flex";

}

/* ==========================================
   CLOSE
========================================== */

document

.getElementById("popupButton")

.onclick=function(){

    document

    .getElementById("popup")

    .style.display="none";

};
