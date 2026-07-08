/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbzvi1bmDcNANr3EUYzbKek__1ewUk34XT9bW3-4lciVIIMU0e4rMlXDBp-8cQp3NysJRw/exec";

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

            email.value.trim() !== "" &&

            studentId.value.trim() !== ""

        ){

            button.disabled = false;

        }

        else{

            button.disabled = true;

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
    .onclick = function(){

        document
        .getElementById("popup")
        .style.display = "none";

    };

}

function showPopup(image,title,message){

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
    .getElementById("popup")
    .style.display = "flex";

}

/* ==========================================
   CHECK SCORE
========================================== */

document
.getElementById("checkBtn")
.addEventListener("click",function(){

    const button =
    document.getElementById("checkBtn");

    button.disabled = true;

    button.innerHTML = "กำลังตรวจสอบ...";

    const data = {

        action : "score",

        email :
        document.getElementById("email").value.trim(),

        studentId :
        document.getElementById("studentId").value.trim()

    };

    fetch(

        WEB_APP_URL,

        {

            method : "POST",

            headers : {

                "Content-Type" : "application/json"

            },

            body : JSON.stringify(data)

        }

    )

    .then(response => response.json())

    .then(result => {

        button.disabled = false;

        button.innerHTML = "ตรวจสอบข้อมูล";

        if(result.success){

            document
            .getElementById("loginCard")
            .style.display = "none";

            document
            .getElementById("resultPage")
            .style.display = "block";

            document
            .getElementById("studentName")
            .innerHTML =
            result.fullName;

            document
            .getElementById("studentIdShow")
            .innerHTML =
            result.studentId;

            document
            .getElementById("attendanceScore")
            .innerHTML =
            result.attendanceScore;

            document
            .getElementById("examScore")
            .innerHTML =
            result.examScore;

            document
            .getElementById("totalScore")
            .innerHTML =
            result.totalScore;

            document
            .getElementById("grade")
            .innerHTML =
            result.grade;

        }

        else{

            showPopup(

                "images/ERROR.JPG",

                "กรุณากรอกข้อมูลให้ถูกต้อง",

                "ไม่พบข้อมูลนักศึกษา"

            );

        }

    })

    .catch(error => {

        console.error(error);

        button.disabled = false;

        button.innerHTML = "ตรวจสอบข้อมูล";

        showPopup(

            "images/ERROR.JPG",

            "ไม่สามารถเชื่อมต่อระบบได้",

            "กรุณาลองใหม่อีกครั้ง"

        );

    });

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

        "ติดต่อผ่าน Gmail :\n\npichitra.k@kkumail.com\n\nเท่านั้น\n\nโปรดระบุ\n\n• ชื่อ-สกุล\n• รหัสนักศึกษา\n\nขอตรวจสอบคะแนนในรายวิชา CL303353"

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

/* ==========================================
   POPUP
========================================== */

function setupPopup(){

    document
    .getElementById("popupButton")
    .addEventListener("click",function(){

        document
        .getElementById("popup")
        .style.display = "none";

        // ถ้าอยู่หน้าผลคะแนน
        if(

            document
            .getElementById("resultPage")
            .style.display == "block"

        ){

            location.href = "human.html";

        }

    });

}
