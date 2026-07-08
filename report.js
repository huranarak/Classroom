/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbwBRkFGgdmcMZ8E1UHAIkskmu_6iAvLpgoiywGXh28I-mwoJ0hRW7sm__sSR0Ow_VhR/exec";

/* ==========================================
   START
========================================== */

window.onload = () => {

    setupStudentId();

    watchForm();

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

        checkForm();

    });

}

/* ==========================================
   WATCH FORM
========================================== */

function watchForm(){

    document

    .querySelectorAll(

        "input,select,textarea"

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
    document.getElementById("email").value.trim();

    const name =
    document.getElementById("name").value.trim();

    const studentId =
    document.getElementById("studentId").value.trim();

    const problem =
    document.getElementById("problem").value;

    const detail =
    document.getElementById("detail").value.trim();

    const button =
    document.getElementById("submitBtn");

    if(

        email!=="" &&

        name!=="" &&

        studentId!=="" &&

        problem!=="" &&

        detail!==""

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
   BUTTON
========================================== */

function setupSubmit(){

    document

    .getElementById("submitBtn")

    .addEventListener(

        "click",

        submitReport

    );

}

/* ==========================================
   SUBMIT
========================================== */

function submitReport(){

    const email =
    document.getElementById("email").value.trim();

    const name =
    document.getElementById("name").value.trim();

    const studentId =
    document.getElementById("studentId").value.trim();

    const problem =
    document.getElementById("problem").value;

    const detail =
    document.getElementById("detail").value.trim();

    if(

        email==="" ||

        name==="" ||

        studentId==="" ||

        problem==="" ||

        detail===""

    ){

        showError(

            "กรอกข้อมูลไม่ครบ",

            "กรุณากรอกข้อมูลให้ครบถ้วน"

        );

        return;

    }

    const button =
    document.getElementById("submitBtn");

    button.disabled = true;

    button.innerHTML =
    "กำลังส่งข้อมูล...";

    /* ======================================
       APPS SCRIPT
       จะเชื่อมในขั้นตอนถัดไป
    ====================================== */

    setTimeout(()=>{

        button.disabled = false;

        button.innerHTML = "ส่งข้อมูล";

        showSuccess();

    },1200);

}

/* ==========================================
   SUCCESS
========================================== */

function showSuccess(){

    document.getElementById("popupImage").src =
    "images/SUCCESS.JPG";

    document.getElementById("popupTitle").innerHTML =
    "แจ้งปัญหาเรียบร้อย";

    document.getElementById("popupMessage").innerHTML =
    "ข้อมูลของคุณถูกส่งเรียบร้อยแล้ว<br><br>ผู้สอนจะตรวจสอบและดำเนินการโดยเร็วที่สุด";

    document.getElementById("popup").style.display =
    "flex";

    document.getElementById("popupButton").onclick = function(){

        window.location.href = "human.html";

    };

}

/* ==========================================
   ERROR
========================================== */

function showError(title,message){

    document.getElementById("popupImage").src =
    "images/ERROR.JPG";

    document.getElementById("popupTitle").innerHTML =
    title;

    document.getElementById("popupMessage").innerHTML =
    message;

    document.getElementById("popup").style.display =
    "flex";

    document.getElementById("popupButton").onclick = function(){

        document.getElementById("popup").style.display =
        "none";

    };

}
