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
//-----------------------------------------
// PHONE DEBUG
//-----------------------------------------

if (isMobile) {

    console.log("Phone Module Loaded");

    navigator.mediaDevices.enumerateDevices()
    .then(function(devices){

        console.log("Available Devices:");

        devices.forEach(function(device){

            console.log(
                device.kind,
                device.label,
                device.deviceId
            );

        });

    });

}
