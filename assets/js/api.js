//-----------------------------------------
// SEND QR TO GOOGLE APPS SCRIPT
//-----------------------------------------

async function sendAttendance(qr){

    try{

        console.log("Sending:", API_URL + "?qr=" + encodeURIComponent(qr));

        const response = await fetch(
            API_URL + "?qr=" + encodeURIComponent(qr)
        );

        console.log("STATUS:", response.status);

        const text = await response.text();

        console.log("RAW:", text);

        return JSON.parse(text);

    }catch(err){

        console.log("FETCH ERROR:", err);

        throw err;

    }

}
