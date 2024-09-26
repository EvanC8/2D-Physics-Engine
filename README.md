# 2D Physics Engine
Welcome! This 2D Physics Engine was built to experiment with physics and vector concepts to create an artifical simulation of motion. The simulation features circular objects called particles that can experience collisions and a gravitational force. Particles can be added to the scene with a click.<br>
<!-- <img src="https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/75f1ae1c-479b-4091-96eb-5752c00d31d9" width="200"> -->
![](https://github.com/EvanC8/2D-Physics-Engine/blob/main/simulation.gif)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li>
      <a href="#how-it-works">How it works</a>
      <ul>
        <li><a href="#motion">Motion</a></li>
        <li><a href="#collisions">Collisions</a></li>
      </ul>
    </li>
    <li><a href="#next-steps">Next Steps</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

# Installation
* Clone the repo
   ```sh
   git clone https://github.com/EvanC8/2D-Physics_Engine.git
   ```
# Usage
1. Downlaod project.
2. Run `index.html` in your browser.
3. Click to add particles to the scene.
4. Enjoy!

# How it works
### Motion
`Verlet Integration` is the method used to calculate the positions of particles in the presence of a gravitational force. 

**Verlet Integration**

$$x_{n+1} = 2x_{n} - x_{n-1} + a_{n}Δt^2$$
A particle's **current positon** $x_{n}$, **previous position** $x_{n-1}$, **acceleration** $a_{n}$, and the **time-step** $Δt$ are used to approximate the new position $x_{n+1}$ of the particle.

**Sub-stepping**
<br>Position approximation is improved with a smaller time-step. The more frequent the position of a particle is updated, the closer of an approximation to the particles ideal motion. The time-step for the draw function in p5.js is approximately 60 times/second (every ~0.017 seconds). By dividing the time-step into smaller sub-steps, a particle's position can be updated multiple times per frame change, increasing the precision and realistic presentation of the simulation. 

### Collisions
<sup><i>Note: Visuals can only be seen with dark mode enabled on github</i></sup>
<!-- ![BeforeCollision](https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/83369bd5-8282-48cb-983c-6957958581f3) -->

<p align="center">Before Collision</p>
<p align="center">
  <img height="50" src="https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/83369bd5-8282-48cb-983c-6957958581f3">
</p>

**Detecting Collisions**
<br>A collision is detected by measuring the distance between the center's of two particles. If this distance is greater than the sum of their radii, then two particles have intersected, indicating a collision.

<!--![AfterCollision](https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/292f3dc9-3340-43df-837f-bfed42eae133) -->
<p align="center">Collision Detected</p>
<p align="center">
  <img height="50" src="https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/292f3dc9-3340-43df-837f-bfed42eae133">
</p>

**Handling Collisions**
<br>A collision is handled by altering the current positions of two colliding particles. One option is to move each particle half of the distance of their intersection so that they are no longer overlapping. Additionally, due to the structure of the verlet equation, both objects push apart with the same velocity in opposite directions, creating a semi-realistic collision.

<!--![AfterCollision (1)](https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/b4715a65-cf42-492a-8429-c2a974bdd6bb) -->
<p align="center">After Collision</p>
<p align="center">
  <img height="50" src="https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/b4715a65-cf42-492a-8429-c2a974bdd6bb">
</p>


However, this approach does not take into account the relative sizes of the particles. Realistically, in a collision, a larger particle with a greater mass has more inertia and thus, will be more resistant to a change in its motion than a smaller particle. This is accounted for by applying `conservation of momentum`. 

The momentum of a particle is given by its mass $m$ and velocity $v$. Both particles experience the same change in momentum $mΔv$ in a collision. Assuming the initial momentums of the particles $m_{1}v_{i,1}$ and $m_{2}v_{i,2}$ are the same at the instant before they collide, their momentums post-collision are given by:
$$m_{1}v_{f,1} = m_{2}v_{f,2}$$

The mass of the particles is equal to their area and their post-collision velocities are dependent on how far each particle is displaced to resolve the collision. With this in mind, the formula above becomes:
$$A_{1}d_{1} = A_{2}d_{2}$$
$$πr_{1}^{2}d_{1} = πr_{2}^{2}d_{2}$$
$$r_{1}^{2}d_{1} = r_{2}^{2}d_{2}$$
Since $d_{1}$ + $d_{2}$ equals the total intersecting distance $d$ of two particles, the system of equations yields displacements in terms of $d$ for each particle relative to their mass: 

$$d_{1} = d/{(1+r_{1}^{2}/r_{2}^{2})}$$

$$d_{2} = d - d_{1}$$

Using this system, a particle with four times the mass of another particle will be displaced only a fourth of the distance as the smaller particle in a collision. Resultingly, the post-collision velocity imparted on the larger particle is approximately a fourth of that for the smaller particle. A more realistic collision is portrayed.

<!--![AfterCollision2](https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/59acce82-172e-4ff5-9912-35e88f901bfe)-->
<p align="center">After Collision</p>
<p align="center">
  <img height="50" src="https://github.com/EvanC8/2D-Physics-Engine/assets/137731839/59acce82-172e-4ff5-9912-35e88f901bfe">
</p>

# Next Steps
* Binding
  * Will allow particles to bind together by a fixed or springy distance.
* Optimizations

# License
Destributed under the MIT License. See `LICENSE.txt` for more information.

# Contact
Evan Cedeno - escedeno8@gmail.com

Project Link: [2D Physics Engine](https://github.com/EvanC8/2D-Physics-Engine)

# Acknowledgments 
* [Verlet Integration - Wikipedia](https://en.wikipedia.org/wiki/Verlet_integration)
* [p5.js](https://p5js.org/)
