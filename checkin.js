/* ==========================================
   CONFIG
========================================== */

const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbzyIJribl0ISovWWfdWWdsWQUgpPasMok2E_fqLD2u62VF715IcXWKOJQKCSul0je8EYA/exec";

/* ==========================================
   VARIABLE
========================================== */

let latitude = null;
let longitude = null;

/* ==========================================
   START
========================================== */

window.onload = function(){

    // แสดง Popup ขออนุญาตตำแหน่ง
    document.getElementById("locationPopup").style.display = "flex";

    // เลือกรูป
    document.getElementById("photo").addEventListener("change",function(){

        const text = document.getElementById("uploadText");

        if(this.files.length > 0){

            text.innerHTML = "✅ " + this.files[0].name;

        }else{

            text.innerHTML = "📷 เลือกรูปภาพ";

        }

        checkForm();

    });

    // ปุ่มอนุญาต
    document.getElementById("allowLocation").addEventListener("click",function(){

        document.getElementById("locationPopup").style.display = "none";

        requestLocation();

    });

    // ปุ่มยกเลิก
    document.getElementById("cancelLocation").addEventListener("click",function(){

        document.getElementById("locationPopup").style.display = "none";

    });

    setupStudentId();

    watchForm();

    checkForm();

};
/* ==========================================
   LOCATION
========================================== */

function requestLocation(){

    const status =
    document.getElementById("gpsStatus");

    if(!navigator.geolocation){

        status.innerHTML =
        "🔴 อุปกรณ์ไม่รองรับการระบุตำแหน่ง";

        status.style.color =
        "#D32F2F";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position){

            latitude =
            position.coords.latitude;

            longitude =
            position.coords.longitude;

            status.innerHTML =
            "🟢 บันทึกตำแหน่งที่ตั้งเรียบร้อย";

            status.style.color =
            "#2E7D32";

            checkForm();

        },

        function(){

            latitude = null;

            longitude = null;

            status.innerHTML =
            "🔴 กรุณาเปิดตำแหน่งที่ตั้งเพื่อบันทึกข้อมูล";

            status.style.color =
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

    input.addEventListener(

        "input",

        function(){

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

            checkForm();

        }

    );

}

/* ==========================================
   WATCH FORM
========================================== */

function watchForm(){

    document

    .querySelectorAll(

        "input,select"

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
    document.getElementById("email")
    .value.trim();

    const name =
    document.getElementById("name")
    .value.trim();

    const studentId =
    document.getElementById("studentId")
    .value.trim();

    const major =
    document.getElementById("major")
    .value;

    const photo =
    document.getElementById("photo")
    .files.length;

    const button =
    document.getElementById("submitBtn");

    if(

        email!=="" &&

        name!=="" &&

        studentId!=="" &&

        major!=="" &&

        photo>0 &&

        latitude!==null &&

        longitude!==null

    ){

        button.disabled = false;

    }

    else{

        button.disabled = true;

    }

}

/* ==========================================
   SUBMIT DATA
========================================== */

function submitData(){

    const button =
    document.getElementById("submitBtn");

    const email =
    document.getElementById("email").value.trim();

    const name =
    document.getElementById("name").value.trim();

    const studentId =
    document.getElementById("studentId").value.trim();

    const major =
    document.getElementById("major").value;

    const photo =
    document.getElementById("photo").files[0];

    if(

        email === "" ||

        name === "" ||

        studentId === "" ||

        major === "" ||

        !photo ||

        latitude === null ||

        longitude === null

    ){

        showWarning();

        return;

    }

    button.disabled = true;

    button.innerHTML = "กำลังบันทึกข้อมูล...";

    const data = {

        action : "checkin",

        email : email,

        name : name,

        studentId : studentId,

        major : major,

        latitude : latitude,

        longitude : longitude

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

        button.innerHTML = "บันทึกข้อมูล";

        if(result.success){

            showSuccess(result.datetime);

        }

        else{

            if(result.message === "OUT_OF_RANGE"){

                showError(

                    "อยู่นอกรัศมีการเช็คชื่อ",

                    "กรุณาอยู่ภายในห้องเรียนก่อนบันทึกข้อมูล"

                );

            }

            else if(result.message === "CHECKED_IN"){

                showError(

                    "เช็คชื่อแล้ว",

                    "วันนี้คุณเช็คชื่อเรียบร้อยแล้ว"

                );

            }

            else{

                showError(

                    "ไม่สามารถบันทึกข้อมูลได้",

                    result.message || "โปรดลองอีกครั้ง"

                );

            }

        }

    })

    .catch(error => {

        console.error(error);

        button.disabled = false;

        button.innerHTML = "บันทึกข้อมูล";

        showError(

            "ไม่สามารถบันทึกข้อมูลได้",

            "กรุณาลองใหม่อีกครั้ง หากยังไม่สามารถบันทึกได้ กรุณาแจ้งปัญหาการใช้งาน"

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
    "เวลาที่บันทึก :<br><b>" + dateTime + "</b>";

    document.getElementById("reportButton").style.display =
    "none";

    document.getElementById("popup").style.display =
    "flex";

    document.getElementById("popupButton").innerHTML =
    "ตกลง";

    document.getElementById("popupButton").onclick =
    function(){

        window.location.href =
        "human.html";

    };

}

/* ==========================================
   ERROR POPUP
========================================== */

function showError(title,message){

    document.getElementById("popupImage").src =
    "images/ERROR.JPG";

    document.getElementById("popupTitle").innerHTML =
    title;

    document.getElementById("popupMessage").innerHTML =
    message;

    document.getElementById("reportButton").style.display =
    "block";

    document.getElementById("popup").style.display =
    "flex";

    document.getElementById("popupButton").innerHTML =
    "ตกลง";

    document.getElementById("popupButton").onclick =
    function(){

        document.getElementById("popup").style.display =
        "none";

    };

    document.getElementById("reportButton").onclick =
    function(){

        document.getElementById("popup").style.display =
        "none";

        document.getElementById("reportPopup").style.display =
        "flex";

    };

}

/* ==========================================
   WARNING
========================================== */

function showWarning(){

    showError(

        "กรุณากรอกข้อมูลให้ครบ",

        "กรุณากรอกข้อมูลทุกช่องก่อนบันทึกข้อมูล"

    );

}

/* ==========================================
   LOCATION ERROR
========================================== */

function showLocationError(){

    showError(

        "ไม่พบตำแหน่งที่ตั้ง",

        "กรุณาอนุญาตการเข้าถึงตำแหน่งที่ตั้ง แล้วลองใหม่อีกครั้ง"

    );

}

/* ==========================================
   CLOSE REPORT
========================================== */

document.getElementById("closeReport").onclick = function(){

    document.getElementById("reportPopup").style.display = "none";

    window.location.href = "human.html";

};
