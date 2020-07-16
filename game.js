const population = 100;
let bots = []
let savedBots = []
let bars = []
let counter = 0;
let slider = 0;
let gen = 0;
let maxcore = 0;

function setup() {
    createCanvas(3*windowHeight/4, 3*windowHeight/4);
    tf.setBackend('cpu');
    slider = createSlider(1, 10, 5);
    slider.position(windowWidth/2 - 150, 4*windowHeight/5);
    slider.addClass("slide");
    for (let i = 0; i < population; i++) {
      bots[i] = new Bot();
    }
    
}

function draw(){
  for (let n = 0; n < slider.value(); n++){

    if (counter == 0){
      pos = [Math.random(0,parseInt(3*windowHeight/4)), Math.random(0,parseInt(3*windowHeight/4))];
      b = new Bar();
      //alert(JSON.stringify(b))
      bars.push(b);
      maxScore = 0
    }

    counter = 1;
    //console.log(bars.length)
    for (let i = bots.length - 1; i >= 0; i--) {
      //bars[i].update();      
        if (bars[bars.length-1].hits(bots[i])==true) {
          bars.pop()
          //alert(JSON.stringify(bars[bars.length-1]))
          bots[i].score = bots[i].score+10;
          //New Bar
          b = new Bar();
          bars.push(b);
      }
      
      if(bots[i].offScreen()) {
        savedBots.push(bots.splice(i,1)[0])
      }
      
    }

    for(let i=bots.length-1; i>=0; i--) {

      if(bots[i].offScreen()) {
        savedBots.push(bots.splice(i, 1)[0])  
      }
    }

    for(let bot of bots) {
      bot.think(bars);
      bot.update();
    }

    if(bots.length === 0) {
      counter = 0;
      nextGeneration();
      maxScore = 0
      bars = [];
    }
  }

  background(21, 22, 36);
  textSize(25);
  noStroke();
  fill(180);
  text('max score:', 10, 30);
  text('generation:', 10, 85);
  
  //maxScore = 0
  for (let bot of bots) {
    bot.show();
    maxScore = max(maxScore, bot.score);
  }
  //alert(maxcore)
  
  stroke(235, 189, 23);
  fill(235, 189, 23, 100);
  text(str(gen), 10, 112);
  text(str(maxScore), 10, 55);

  for (let bar of bars) {
    bar.show();
  }
}