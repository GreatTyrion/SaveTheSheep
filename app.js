// jshint esversion: 6
const app = () => {
  const grassland = document.querySelector(".grassland");
  const wolf = document.querySelector(".wolf");
  const sheep = document.querySelector(".sheep");
  const animationDiv = document.querySelector(".animation");
  const beginEat = document.querySelector(".beginEat");
  const finishDinner = document.querySelector(".finishDinner");
  const song = document.querySelector(".song");
  const song2 = document.querySelector(".song2");
  const song3 = document.querySelector(".song3");
  const timeDisplay = document.querySelector(".timeDisplay");
  let fakeDuration = 1800;

  const topOffset = grassland.offsetTop;
  const height = grassland.height;
  const wolfWidth = wolf.width;
  const wolfInit = wolf.offsetLeft;
  const distance = sheep.offsetLeft - wolfWidth;
  // console.log(distance);

  wolf.style.top = (height * 0.2 + topOffset).toString() + "px";
  sheep.style.top = (height * 0.4 + topOffset).toString() + "px";
  animationDiv.style.height = (height*0.92 + topOffset).toString() + "px";

  const moveUp = setInterval(sheepUp, 500);
  const moveDown = setInterval(sheepDown, 1000);
  function sheepUp() {
    if (song.currentTime <= 1500) {
      sheep.style.top = (height * 0.4 + topOffset - 10).toString() + "px";
    }
  }
  function sheepDown() {
    if (song.currentTime <= 1500) {
      sheep.style.top = (height * 0.4 + topOffset).toString() + "px";
    }
  }

  beginEat.addEventListener("click", function(){
    sheep.src = "./figures/sheep.png";
    wolf.src = "./figures/wolf.png";
    timeDisplay.style.color = "#DBEBB7";
    // song.currentTime = 0;
    if (song.currentTime >= fakeDuration || song2.currentTime > 0) {
      song2.currentTime = 0;
      song.currentTime = 0;
      sheep.classList.remove("sheepEaten");
      sheep.classList.remove("trembleSheep");
      checkSong(song);
    } else {
      checkSong(song);
    }

  });

  finishDinner.addEventListener("click", function(){
    if (!song.paused) {
      song.pause();
      song2.play();
      sheep.src = "./figures/happy.png";
      wolf.src = "./figures/cryWolf2.png";
    }
  });

  function checkSong(song) {
    if (song.paused) {
      song.play();
      beginEat.src = "./figures/pause.jpg";
      beginEat.title = "Click when stop eating";
    } else {
      song.pause();
      beginEat.src = "./figures/beginEat.png";
      beginEat.title = "Click when begin to eat";
    }
  }

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;

    if (song.currentTime > 1500) {
      sheep.classList.add("trembleSheep");
    }

    // console.log(currentTime);
    let elaped = fakeDuration - currentTime;
    let minutes = Math.floor(elaped / 60);
    let seconds = Math.floor(elaped % 60);
    let progress = distance * currentTime / fakeDuration;
    wolf.style.left = (wolfInit + progress).toString() + "px";

    //Animate the circle

    //Animate the text
    if (seconds >= 10) {
      timeDisplay.innerHTML = minutes + ":" + seconds;
    } else {
      timeDisplay.innerHTML = minutes + ":0" + seconds;
    }

    if (minutes < 5) {
      timeDisplay.style.color = "#f18c8e";
    }

    if (song.paused && !song2.paused) {
      timeDisplay.innerHTML = "Great! You saved the sheep!";
    }

    //Stop Sounds
    if (currentTime >= fakeDuration) {
      song.pause();
      song3.play();
      sheep.classList.add("sheepEaten");
      wolf.src = "./figures/wolfEatSheep.png";
      beginEat.src = "./figures/beginEat.png";
      beginEat.title = "Click when begin to eat";
      timeDisplay.innerHTML = "So bad! You didn't save the sheep!";
      timeDisplay.style.color = "#f18c8e";
    }

  };

};

app();
