//-----------------------------------------
// SEND QR TO GOOGLE APPS SCRIPT
//-----------------------------------------

async function sendAttendance(qr){

    const response = await fetch(
        API_URL + "?qr=" + encodeURIComponent(qr)
    );

    return await response.json();

}
