/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbzvi1bmDcNANr3EUYzbKek__1ewUk34XT9bW3-4lciVIIMU0e4rMlXDBp-8cQp3NysJRw/exec";

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
   SUBMIT REPORT
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

    const description =
    document.getElementById("description").value.trim();

    const data = {

        action : "report",

        email : email,

        fullName : fullName,

        studentId : studentId,

        issueType : issueType,

        description : description

    };

    fetch(

        WEB_APP_URL,

        {

            method : "POST",

            headers : {

                "Content-Type":"application/json"

            },

            body : JSON.stringify(data)

        }

    )

    .then(response=>response.json())

    .then(result=>{

        if(result.success){

            showPopup(

                "images/SUCCESS.JPG",

                "ส่งข้อมูลเรียบร้อย",

                "คำร้องของคุณถูกส่งเข้าสู่ระบบแล้ว",

                "ปิด"

            );

        }

        else{

            showPopup(

                "images/ERROR.JPG",

                "เกิดข้อผิดพลาด",

                result.message,

                "ตกลง"

            );

        }

    })

    .catch(error=>{

        console.error(error);

        showPopup(

            "images/ERROR.JPG",

            "ไม่สามารถเชื่อมต่อระบบได้",

            "กรุณาลองใหม่อีกครั้ง",

            "ตกลง"

        );

    });

});

/* ==========================================
   CHECK STATUS
========================================== */

document
.getElementById("checkStatus")
.addEventListener("click",function(){

    const data = {

        action : "reportStatus",

        email :

        document
        .getElementById("statusEmail")
        .value.trim(),

        studentId :

        document
        .getElementById("statusStudentId")
        .value.trim()

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

    .then(response=>response.json())

    .then(result=>{

        if(result.success){

            showPopup(

                "images/SUCCESS.JPG",

                result.status,

                result.adminMessage,

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

    })

    .catch(error=>{

        console.error(error);

    });

});
