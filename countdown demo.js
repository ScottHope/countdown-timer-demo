//VARIABLES
let targetD = document.querySelector("input[type='date']"),
targetT = document.querySelector("input[type='time']"),
count = document.querySelector(".countDown"),
speaker = document.querySelector(".far"),
zero = "00<h6>DAYS</h6>00<h6>HRS</h6>00<h6>MINS</h6>00<h6>SECS</h6>",
endAudio = new Audio(),
endDate,ms,s,m,h,d,repeat;

//PROPERTIES, ATTRIBUTES & METHODS
targetD.min = new Date().toISOString().substring(0,10);
targetD.max = new Date(new Date().setDate(new Date().getDate()+9998)).toISOString().substring(0,10);
targetD.addEventListener("change", dateTimeChange);
targetT.addEventListener("change", dateTimeChange);
//endAudio.src = "https://freesound.org/data/previews/200/200318_2641534-lq.mp3";
endAudio.src = "audio/bell.mp3";
speaker.className = "far";
speaker.addEventListener("click", audioOnOff);

//FUNCTIONS
function time(){
    ms = endDate - Date.now();

    s = ("0" + Math.floor(ms / 1000)%60).slice(-2);
    m = ("0" + Math.floor(ms / 60000)%60).slice(-2);
    h = ("0" + Math.floor(ms / 3600000)%24).slice(-2);
    d = Math.floor(ms / 86400000);

    count.innerHTML = d + "<h6>DAYS</h6>" + h + "<h6>HRS</h6>" + m + "<h6>MINS</h6>" + s + "<h6>SECS</h6>";

    repeat = setTimeout(time,1000);

    ms <= 0 ? (count.classList.add("ended"), count.innerHTML = "ENDED", endAudio.play(), clearTimeout(repeat)) : undefined;

}

function checkLocalTarget(){
  if (localStorage.targetTime === "" || localStorage.targetTime === undefined) {
      localStorage.targetTime = "00:00";
  } else {
      targetT.value = localStorage.targetTime;
  }
 if (localStorage.targetDate === "" || localStorage.targetDate === undefined) {
     clearTimeout(repeat); count.innerHTML = zero;
  } else {
     targetD.value = localStorage.targetDate; targetT.value = localStorage.targetTime;
     endDate = new Date(targetD.value + "T" + targetT.value);
     clearTimeout(repeat);
     time();
  }
}

function checkLocalAudio(){
    if (localStorage.countDownAudio === undefined) {
        localStorage.setItem("countDownAudio","fa-bell");
    }
    if (localStorage.countDownAudio === "fa-bell") {
		speaker.classList.add("fa-bell");
		speaker.classList.remove("fa-bell-slash");
		endAudio.muted = false;
	} else {
		speaker.classList.remove("fa-bell");
		speaker.classList.add("fa-bell-slash");
		endAudio.muted = true;
	}
}

function dateTimeChange(){
 count.classList.contains("ended") ? count.classList.remove("ended") : undefined;
 localStorage.targetDate = targetD.value;
 localStorage.targetTime = targetT.value;
 checkLocalTarget();
}

function audioOnOff(){
	localStorage.countDownAudio === "fa-bell" ? localStorage.countDownAudio = "fa-bell-slash" : localStorage.countDownAudio = "fa-bell";
	checkLocalAudio();
}

checkLocalTarget();
checkLocalAudio();