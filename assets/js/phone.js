//-----------------------------------------
// PHONE SCANNER (ORIGINAL VERSION)
//-----------------------------------------

if (isMobile) {

    console.log("📱 Phone Scanner Active");

    function startPhoneScanner() {

        scanner = new Html5Qrcode("reader");

        scanner.start(

            {
                facingMode: "environment"
            },

            {
                fps: 10,
                qrbox: 250
            },

            async function(decodedText){

                stopPhoneScanner();

                setStatus("⏳ Processing...");
                clearStudent();

                try{

                    const data = await sendAttendance(decodedText);

                    if(data.success){

                        setStatus("✅ " + data.message);
                        setStudent(data.student);
                        setTime(data.time);

                    }else{

                        setStatus("❌ " + data.message);

                    }

                }catch(err){

                    console.log(err);
                    setStatus("❌ Connection Error");

                }

                setTimeout(function(){

                    clearStudent();
                    setStatus("🟢 READY TO SCAN");

                    startPhoneScanner();

                },3000);

            }

        ).catch(function(err){

            console.log(err);
            setStatus("❌ Camera Error");

        });

    }

    function stopPhoneScanner(){

        if(scanner){

            scanner.stop().catch(function(){});

        }

    }

    // Override desktop functions
    startScanner = startPhoneScanner;
    stopScanner = stopPhoneScanner;

}
