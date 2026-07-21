//-----------------------------------------
// APP START
//-----------------------------------------

window.onload = function(){

    startScanner();

};

//-----------------------------------------
// STOP BUTTON
//-----------------------------------------

document.getElementById("stopBtn").addEventListener("click", async function(){

    if(scanner){

        try{

            await scanner.stop();

            setStatus("⏹ Scanner Stopped");

        }catch(err){

            console.log(err);

        }

    }

});
