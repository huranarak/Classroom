/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"ใส่ URL Apps Script";

/* ==========================================
   START
========================================== */

window.onload = function(){

    setupStudentId();

    setupButton();

    setupPopup();

};

/* ==========================================
   STUDENT ID
========================================== */

function setupStudentId(){

    const input =
    document.getElementById("studentId");

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
   BUTTON
========================================== */

function setupButton(){

    const email =
    document.getElementById("email");

    const studentId =
    document.getElementById("studentId");

    const button =
    document.getElementById("checkBtn");

    function check(){

        if(

            email.value.trim()!=="" &&

            studentId.value.trim()!==""

        ){

            button.disabled=false;

        }

        else{

            button.disabled=true;

        }

    }

    email.addEventListener("input",check);

    studentId.addEventListener("input",check);

    check();

}

/* ==========================================
   POPUP
========================================== */

function setupPopup(){

    document

    .getElementById("popupButton")

    .onclick=function(){

        document

        .getElementById("popup")

        .style.display="none";

    };

}

function showPopup(image,title,message){

    document

    .getElementById("popupImage")

    .src=image;

    document

    .getElementById("popupTitle")

    .innerHTML=title;

    document

    .getElementById("popupMessage")

    .innerHTML=message;

    document

    .getElementById("popup")

    .style.display="flex";

}

/* ==========================================
   CHECK SCORE (MOCK)
========================================== */

document

.getElementById("checkBtn")

.addEventListener("click",function(){

    const email =
    document.getElementById("email").value.trim();

    const studentId =
    document.getElementById("studentId").value.trim();

    if(

        email==="student@kkumail.com"

        &&

        studentId==="613280123-4"

    ){

        document

        .getElementById("loginCard")

        .style.display="none";

        document

        .getElementById("resultPage")

        .style.display="block";

    }

    else{

        showPopup(

            "images/ERROR.JPG",

            "กรุณากรอกข้อมูลให้ถูกต้อง",

            "Email หรือรหัสนักศึกษาไม่ถูกต้อง"

        );

    }

});

/* ==========================================
   RESULT BUTTON
========================================== */

document
.getElementById("reviewScore")
.addEventListener("click",function(){

    showPopup(

        "images/REPORT.JPG",

        "วิธีการขอตรวจสอบคะแนน",

        "ติดต่อผ่าน Gmail :\n\npichitra.k@kkumail.com\n\nเท่านั้น\n\nโปรดระบุ\n• ชื่อ-สกุล\n• รหัสนักศึกษา\n\nขอตรวจสอบคะแนนในรายวิชา CL303353"

    );

});

document
.getElementById("finishScore")
.addEventListener("click",function(){

    showPopup(

        "images/SUCCESS.JPG",

        "ตรวจสอบเรียบร้อย",

        "ระบบแสดงผลคะแนนเรียบร้อยแล้ว"

    );

});

function setupPopup(){

    document
    .getElementById("popupButton")
    .onclick=function(){

        document
        .getElementById("popup")
        .style.display="none";

        location.href="human.html";

    };

}
