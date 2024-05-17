# 2D Physics Engine
Welcome! This 2D Physics Engine was built using p5.js. Particles experience collisions and a gravitational force. Click to spawn circular particles into the scene.
# How it works
### Motion
Verlet Integration is the method used to calculate the positions of particles in the presence of a gravitational force. 

**Verlet Equation**
$$x_{n+1} = 2x_{n} - x_{n-1} + a_{n}Δt^2$$
A particle's **current positon** $x_{n}$, **previous position** $x_{n-1}$, **acceleration** $a_{n}$, and the **time-step** $Δt$ are used to approximate the new position $x_{n+1}$ of the particle.

**Sub-stepping**
<br>Position approximation is improved with a smaller time-step. The more frequent the position of a particle is updated, the closer of an approximation to the particles ideal motion. The time-step for the draw function in p5.js is approximately 60 times/second (every ~0.017 seconds). By dividing the time-step into smaller sub-steps, a particle's position can be updated multiple times per frame change, increasing the precision and realistic presentation of the simulation. 

### Collisions
**Detecting Collisions**
<br>A collision is detected by measuring the distance between the center's of two particles in the scene. If this distance is greater than the sum of their radii, then two particles have intersected, indicating a collision.

**Handling Collisions**
<br>A collision can be handled by altering the current positions of two colliding particles, moving each particle half of the distance of their intersection so that they are no longer intersecting. Thanks to the structure of the verlet equation, a resulting velocity is imparted on both particles, creating the effect of the particles bouncing apart. 
