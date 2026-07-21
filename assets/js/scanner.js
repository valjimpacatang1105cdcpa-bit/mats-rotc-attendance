//-----------------------------------------
// QR SCANNER
//-----------------------------------------

let scanner = null;

function startScanner() {

    scanner = new Html5Qrcode("reader");

    scanner.start(

        {
            facingMode: "environment"
        },

        {
            fps: 10,
            qrbox: 250
        },

        onScanSuccess

    ).catch(function (err) {

        console.log(err);
        setStatus("❌ Camera Error");

    });

}

function stopScanner() {

    if (scanner) {

        scanner.stop();

    }

}

async function onScanSuccess(decodedText) {

    stopScanner();

    setStatus("⏳ Processing...");
    clearStudent();

    try {

        const data = await sendAttendance(decodedText);

        if (data.success) {

            setStatus("✅ " + data.message);
            setStudent(data.student);
            setTime(data.time);

        } else {

            setStatus("❌ " + data.message);

        }

    } catch (err) {

        console.log(err);
        setStatus("❌ Connection Error");

    }

    setTimeout(function () {

        clearStudent();
        setStatus("🟢 READY TO SCAN");

        startScanner();

    }, 3000);

}

//-----------------------------------------
// STOP BUTTON
//-----------------------------------------

document.getElementById("stopBtn").addEventListener("click", function () {

    stopScanner();

    setStatus("⏹ Scanner Stopped");

});
