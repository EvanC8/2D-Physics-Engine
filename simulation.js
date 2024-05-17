let gravity;
let startTime;

let particles = [];

function setup() {
  createCanvas(400, 400);
  
  gravity = createVector(0,300);
  
  startTime = new Date();
}

function draw() {
  colorMode(RGB);
  background(0);
  
  let endTime = new Date();
  let timestep = (endTime - startTime) / 1000;
  
  fill(0);
  stroke(255);
  strokeWeight(5);
  circle(200, 200, 355);
  
  noStroke();
  colorMode(HSB);
  
  let substeps = 10;
  for (let step = 0; step < substeps; step++) {
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      
      p.updatePosition(timestep/substeps);
      
      p.show();
      
      p.handleCollisions();
    }
  }
  
  startTime = endTime;
}

function mouseClicked() {
  let p = new Particle(particles.length, random(10, 20), createVector(mouseX, mouseY), random(0,360));
  
  particles.push(p);
}


