class Particle {
  constructor(index, radius, position, hue) {
    this.index = index
    this.radius = radius;
    this.currentPosition = position;
    this.oldPosition = position;
    this.color = hue;
  }
  
  updatePosition(timestep) {
    let term1 = this.currentPosition.copy().mult(2);
    let term2 = this.oldPosition.copy();
    let term3 = (gravity.copy().mult(timestep)).mult(timestep);
    
    this.oldPosition = this.currentPosition;
    this.currentPosition = (term1.sub(term2)).add(term3);
  }
  
  handleCollisions() {
    let boarderDist = createVector(200, 200).sub(this.currentPosition);
    if (boarderDist.mag() > 350/2 - this.radius) {
      this.currentPosition.add(boarderDist.setMag(boarderDist.mag() - (350/2 - this.radius)));
    }
    
    for (let i = 0; i < particles.length; i++) {
      if (i != this.index) {
        let b = particles[i];
        
        let dist = (this.currentPosition.copy()).sub(b.currentPosition);
        if (dist.mag() < this.radius + b.radius) {
          let displacement = dist.setMag((dist.mag() - (this.radius + b.radius)));
          let scale1 = 1 / (1 + (this.radius * this.radius)/(b.radius * b.radius));
          let scale2 = 1 - scale1;
          this.currentPosition.sub(displacement.copy().mult(scale1));
          b.currentPosition.add(displacement.copy().mult(scale2));
        }
      }
    }
  }
  
  show() {
    fill(this.color, 100, 100);
    circle(this.currentPosition.x, this.currentPosition.y, this.radius * 2);
  }
}