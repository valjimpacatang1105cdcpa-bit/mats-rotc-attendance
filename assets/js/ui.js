//-----------------------------------------
// UI HELPERS
//-----------------------------------------

function setStatus(message){
    document.getElementById("status").innerHTML = message;
}

function setStudent(name){
    document.getElementById("student").innerHTML = name || "";
}

function setTime(time){
    document.getElementById("time").innerHTML = time || "";
}

function clearStudent(){
    setStudent("");
    setTime("");
}
