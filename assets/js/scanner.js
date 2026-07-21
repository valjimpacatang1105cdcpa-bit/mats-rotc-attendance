//-----------------------------------------
// QR SCANNER
//-----------------------------------------

let scanner = null;
let scannerEnabled = false;

//-----------------------------------------
// START SCANNER
//-----------------------------------------

function startScanner() {

    if (scanner) return;

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

        scanner = null;

    });

}

//-----------------------------------------
// STOP SCANNER
//-----------------------------------------

async function stopScanner() {

    if (!scanner) return;

    try {

        await scanner.stop();
        await scanner.clear();

    } catch (e) {

        console.log(e);

    }

    scanner = null;

}

//-----------------------------------------
// QR SUCCESS
//-----------------------------------------

async function onScanSuccess(decodedText) {

    await stopScanner();

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

        if (scannerEnabled) {

            setStatus("🟢 READY TO SCAN");
            startScanner();

        } else {

            setStatus("⏹ Scanner Stopped");

        }

    }, 3000);

}

//-----------------------------------------
// START BUTTON
//-----------------------------------------

document.getElementById("startBtn").addEventListener("click", function () {

    scannerEnabled = true;

    setStatus("🟢 READY TO SCAN");

    startScanner();

});

//-----------------------------------------
// STOP BUTTON
//-----------------------------------------

document.getElementById("stopBtn").addEventListener("click", async function () {

    scannerEnabled = false;

    await stopScanner();

    setStatus("⏹ Scanner Stopped");

});
