//-----------------------------------------
// DEVICE DETECTION
//-----------------------------------------

const isMobile =
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
);

console.log("Device:", isMobile ? "Mobile" : "Desktop");
