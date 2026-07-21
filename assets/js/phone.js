//-----------------------------------------
// PHONE MODULE
//-----------------------------------------

if (isMobile) {

    console.log("Phone Module Loaded");

} else {

    console.log("Desktop - Phone Module Disabled");

}
//-----------------------------------------
// PHONE CAMERA SETTINGS
//-----------------------------------------

if (isMobile) {

    window.CAMERA_CONFIG = {
        facingMode: "environment"
    };

} else {

    window.CAMERA_CONFIG = {
        facingMode: "environment"
    };

}
