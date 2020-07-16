class Bot {

  constructor(brain) {
      this.r = 10;
      this.y = parseInt(3*windowHeight/8);
      this.x = parseInt(3*windowHeight/8);

      this.vy = 0
      this.vx = 0
      
      this.ax = 0
      this.ay = 0
      this.ax1 = 0
      this.ay1 = 0

      this.score = 0
      this.fitness = 0
      this.output = null;
      this.n = null;
      this.n1 = null;
      this.n2 = null;
      this.counter = 0;

      if(brain){
          this.brain = brain.copy()
      }
      else{
          this.brain = new NeuralNetwork(4,8,4);
      }
  }

  dispose() {
      this.brain.dispose();
  }

  show(){
      stroke(81, 219, 146);
      fill(81, 219, 146, 100);
      ellipse(this.x, this.y, this.r, this.r);
  }

  mutate() {
      this.brain.mutate(0.1);
  }

  think(bars) {
      

      if(1){
          let inputs = [];
          inputs[0] = this.x; 
          inputs[1] = this.y; 
          inputs[2] = bars[bars.length - 1].x;
          inputs[3] = bars[bars.length - 1].x;
      
          this.output = this.brain.predict(inputs);
      
            this.ax = this.output[0];
            this.ay = this.output[1];
            this.ax1 = this.output[2];
            this.ay1 = this.output[3];
      }
      else{
          this.ax = 0;
          this.ay = 0;
      }
  }

  offScreen() {
      if(this.y < 0 || this.y > 3*windowHeight/4) return true;

      if (this.x > 3*windowHeight/4 || this.x < 0) return true;

      return false
  }

  hitGround() {
      if(this.y + this.r/2 >= height) return true;
      return false;
  }

  update() {

    
    let m = this.output.indexOf(Math.max(...this.output))
    
    let z=0
    //console.log(m)
    if (this.n == m && this.n1==this.n2){
        m = (m+1)
        //console.log("True")
        z = Math.random()*15*Math.random()
    }

        this.n2 = this.n
        this.n = this.n1
        this.n1 = m


    if (m==0) {
        this.vy = 0;
        this.vx = 10-10*z;
        
    }
    else if (m==1) {
        this.vy = 10-10*z;
        this.vx = 0;
        
    }
    else if (m==2) {
        this.vy = 0;
        this.vx = -10+10*z;
        
    }
    else if (m==3) {
        this.vy = -10+10*z;
        this.vx = 0;
        
    }
    else{
        this.vy = 0
        this.vx = 0
    }
    //console.log(this.output)

      this.y += this.vy;
      this.x += this.vx
  }
}