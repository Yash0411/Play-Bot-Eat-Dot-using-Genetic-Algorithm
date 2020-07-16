class Bar{
  constructor() {
      this.x = Math.random()*parseInt(3*windowHeight/4)
      this.w = 80;
      this.y = Math.random()*parseInt(3*windowHeight/4)
      this.r = 10
      this.speed = 80;
  }

  hits(bot) {
      if(bot.y <= this.y+10 && bot.y >= this.y-10) {
          if(bot.x <= this.x+10 && bot.x >= this.x-10) {
            //alert(JSON.stringify(bot))
              return true;
          }
      }
      return false;
  }

  show() {
    stroke(240,28,95);
    fill(240,28,95, 100);
    ellipse(this.x, this.y, this.r, this.r);
  }


}