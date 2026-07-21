//-----------------------------------------
// QR SCANNER
//-----------------------------------------

let scanner = null;

function startScanner() {

    if (scanner) {
        try {
            scanner.stop();
        } catch (e) {}
    }

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

        scanner.stop().catch(function(){});

    }

}

async function onScanSuccess(decodedText) {

const t0 = performance.now();
console.log("QR detected");
    
    setStatus("⏳ Processing...");
    clearStudent();

    try {

        const data = await sendAttendance(decodedText);

const t1 = performance.now();
console.log("Google Script:", (t1 - t0).toFixed(0), "ms");

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
    
const t2 = performance.now();
console.log("Total before restart:", (t2 - t0).toFixed(0), "ms");
    setTimeout(function () {

    clearStudent();
    setStatus("🟢 READY TO SCAN");
    startScanner();

}, 3000);

}

document.getElementById("stopBtn").addEventListener("click", function () {

    stopScanner();
    setStatus("⏹ Scanner Stopped");

});
