//-----------------------------------------
// QR SCANNER
//-----------------------------------------

let scanner = null;
let scanning = false;

async function startScanner() {

    if (scanner) {
        try {
            await scanner.stop();
        } catch(e){}
    }

    scanner = new Html5Qrcode("reader");

    scanner.start(
        {
            facingMode: { exact: "environment" }
        },
        {
            fps: 10,
            qrbox: 250
        },

        async function(decodedText){

            if(scanning) return;

            scanning = true;

            setStatus("⏳ Processing...");

            scanner.pause(true);

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

                clearUI();

                scanning = false;

                scanner.resume();

            },3000);

        },

        function(errorMessage){
            // ignore scan errors
        }

    ).catch(async function(){

        // Android fallback
        try{

            await scanner.start(

                { facingMode:"environment" },

                {
                    fps:10,
                    qrbox:250
                },

                async function(decodedText){

                    if(scanning) return;

                    scanning = true;

                    setStatus("⏳ Processing...");

                    scanner.pause(true);

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

                        clearUI();

                        scanning = false;

                        scanner.resume();

                    },3000);

                }

            );

        }catch(err){

            console.log(err);

            setStatus("❌ Camera Error");

        }

    });

}
