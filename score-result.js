/* ==========================================
   START
========================================== */

window.onload = () => {

    setupButton();

};

/* ==========================================
   BUTTON
========================================== */

function setupButton(){

    document
        .getElementById("reportBtn")
        .addEventListener("click", openPopup);

    document
        .getElementById("okBtn")
        .addEventListener("click", goHome);

    document
        .getElementById("closePopup")
        .addEventListener("click", closePopup);

}

/* ==========================================
   OPEN POPUP
========================================== */

function openPopup(){

    document
        .getElementById("popupImage")
        .src = "images/REPORT.JPG";

    document
        .getElementById("popup")
        .style.display = "flex";

}

/* ==========================================
   CLOSE POPUP
========================================== */

function closePopup(){

    window.location.href = "human.html";

}

/* ==========================================
   GO HOME
========================================== */

function goHome(){

    window.location.href = "human.html";

}
