function updateClock(){

    const now = new Date();

    document.getElementById("today").innerHTML =
        now.toLocaleDateString("en-US",{
            weekday:"long",
            year:"numeric",
            month:"long",
            day:"numeric"
        });

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("en-US");

}

setInterval(updateClock,1000);
updateClock();
