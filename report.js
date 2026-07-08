/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"ใส่ URL Apps Script";

/* ==========================================
   START
========================================== */

window.onload = function(){

    setupMenu();

    setupStudentId();

    setupUpload();

    setupPopup();

};

/* ==========================================
   MENU
========================================== */

function setupMenu(){

    const reportBtn =
    document.getElementById("openReport");

    const statusBtn =
    document.getElementById("openStatus");

    const reportForm =
    document.getElementById("reportForm");

    const statusForm =
    document.getElementById("statusForm");

    reportBtn.onclick = function(){

        reportForm.style.display = "block";

        statusForm.style.display = "none";

    };

    statusBtn.onclick = function(){

        statusForm.style.display = "block";

        reportForm.style.display = "none";

    };

}

/* ==========================================
   STUDENT ID
========================================== */

function setupStudentId(){

    formatStudentId("studentId");

    formatStudentId("statusStudentId");

}

function formatStudentId(id){

    const input =
    document.getElementById(id);

    input.addEventListener("input",function(){

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

    });

}

/* ==========================================
   UPLOAD
========================================== */

function setupUpload(){

    const photo =
    document.getElementById("photo");

    const text =
    document.getElementById("uploadText");

    photo.addEventListener("change",function(){

        if(photo.files.length>0){

            text.innerHTML =
            "✅ " + photo.files[0].name;

        }

        else{

            text.innerHTML =
            "📷 เลือกรูปภาพ";

        }

    });

}

/* ==========================================
   POPUP
========================================== */

function setupPopup(){

    document
    .getElementById("popupButton")
    .onclick = function(){

        document
        .getElementById("popup")
        .style.display = "none";

        location.href = "human.html";

    };

}

function showPopup(image,title,message,buttonText){

    document
    .getElementById("popupImage")
    .src = image;

    document
    .getElementById("popupTitle")
    .innerHTML = title;

    document
    .getElementById("popupMessage")
    .innerHTML = message;

    document
    .getElementById("popupButton")
    .innerHTML = buttonText;

    document
    .getElementById("popup")
    .style.display = "flex";

}

/* ==========================================
   SUBMIT REPORT (MOCK)
========================================== */

document
.getElementById("submitReport")
.addEventListener("click",function(){

    const email =
    document.getElementById("email").value.trim();

    const fullName =
    document.getElementById("fullName").value.trim();

    const studentId =
    document.getElementById("studentId").value.trim();

    const issueType =
    document.getElementById("issueType").value;

    if(

        email==="" ||

        fullName==="" ||

        studentId==="" ||

        issueType===""

    ){

        showPopup(

            "images/ERROR.JPG",

            "กรุณากรอกข้อมูลให้ครบถ้วน",

            "โปรดตรวจสอบข้อมูลก่อนส่ง",

            "ตกลง"

        );

        return;

    }

    showPopup(

        "images/SUCCESS.JPG",

        "ส่งข้อมูลเรียบร้อย",

        "คำร้องของคุณถูกส่งเข้าสู่ระบบแล้ว",

        "ปิด"

    );

});

/* ==========================================
   CHECK STATUS (MOCK)
========================================== */

document
.getElementById("checkStatus")
.addEventListener("click",function(){

    const email =
    document.getElementById("statusEmail").value.trim();

    const studentId =
    document.getElementById("statusStudentId").value.trim();

    if(

        email==="student@kkumail.com"

        &&

        studentId==="613280123-4"

    ){

        showPopup(

            "images/SUCCESS.JPG",

            "Completed",

            "ข้อความจากผู้ดูแลระบบ\n\nเพิ่มคะแนนเช็คชื่อเรียบร้อยแล้ว",

            "ปิด"

        );

    }

    else{

        showPopup(

            "images/ERROR.JPG",

            "ไม่พบข้อมูล",

            "กรุณาตรวจสอบ Email และรหัสนักศึกษา",

            "ปิด"

        );

    }

});
