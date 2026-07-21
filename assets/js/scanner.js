//-----------------------------------------
// QR SCANNER
//-----------------------------------------

let scanner = null;
let scannerRunning = false;

function startScanner() {

    // Huwag mag-start kung tumatakbo na
    if (scannerRunning) return;

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

    ).then(function () {

        scannerRunning = true;
        setStatus("🟢 READY TO SCAN");

    }).catch(function (err) {

        console.log(err);
        setStatus("❌ Camera Error");

    });

}

function stopScanner() {

    if (!scanner || !scannerRunning) return;

    scanner.stop().then(function () {

        scannerRunning = false;
        setStatus("⏹ Scanner Stopped");

    }).catch(function (err) {

        console.log(err);

    });

}

async function onScanSuccess(decodedText) {

    // Iwas double scan
    if (!scannerRunning) return;

    scannerRunning = false;

    await scanner.pause(true);

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

    setTimeout(async function () {

        clearStudent();
        setStatus("🟢 READY TO SCAN");

        try {

            await scanner.resume();
            scannerRunning = true;

        } catch (err) {

            console.log(err);

        }

    }, 3000);

}

//-----------------------------------------
// START BUTTON
//-----------------------------------------

document.getElementById("startBtn").addEventListener("click", function () {

    startScanner();

});

//-----------------------------------------
// STOP BUTTON
//-----------------------------------------

document.getElementById("stopBtn").addEventListener("click", function () {

    stopScanner();

});
