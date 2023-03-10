---
blog: maxrohde.com
categories:
- javascript
date: "2019-10-25"
tags:
- open-source
- three-js
title: Camera Movement with Three.js
---

I have recently been working on small example application using [three.js](https://threejs.org/) and [react-three-fiber](https://github.com/react-spring/react-three-fiber). In the first two iterations, I first developed a simple draggable shape floating in space and then supported multiple shapes that can be moved on a physical plane. In this post, I am going to be extending the example to support camera movements. Here links to the previous two iterations and the one developed in this post:

## Prototypes

### Iteration 3: Camera Movements (this post)

Source Code: [threejs-test](https://github.com/mxro/threejs-test/tree/master/test3)

Published App: [three-js-camera.surge.sh](https://three-js-camera.surge.sh/)

You can move the camera using WASD and zoom in and out using the mouse scroll wheel. You can create new objects by clicking on any empty spot on the plane.

### Iteration 2: Movable objects on Plane

Blog Post: [Create and Drag Shapes with Three.js, React and Cannon.js](https://maxrohde.com/2019/10/23/create-and-drag-shapes-with-three-js-react-and-cannon-js/)

Published App: [react-three-fiber-draggable-v2](https://react-three-fiber-draggable-v2.surge.sh/)

### Iteration 1: Draggable Shape in Space

Blog Post: [Creating a Draggable Shape with React Three Fiber](https://maxrohde.com/2019/10/19/creating-a-draggable-shape-with-react-three-fiber/)

Published App: [react-three-fiber-draggable.surge.sh](https://react-three-fiber-draggable.surge.sh/)

In the following I will describe the two ways in which camera movement is supported:

## Camera Movements

### Using the Keyboard

The easiest way to move the camera using the keyboard would be to change the position of the camera on key press. That is what I first tried and it turned out to be a very insufficient solution. Instead, I stored for how long each key is pressed in an object and then calculate camera movement for every frame.

```javascript
const keyPressed = {
}

function App() {
    ...
    const handleKeyDown = (e) => {
        if (!keyPressed[e.key]) {
            keyPressed[e.key] = new Date().getTime();
        }
    };

    const handleKeyUp = (e) => {
        delete keyPressed[e.key];
    };
    ...
}
```

In react-three-fiber, the useful `useFrame` hook is available where we then calculate the camera movement:

```javascript
useFrame((_, delta) => {
  // move camera according to key pressed
  Object.entries(keyPressed).forEach((e) => {
    const [key, start] = e;
    const duration = new Date().getTime() - start;

    // increase momentum if key pressed longer
    let momentum = Math.sqrt(duration + 200) * 0.01 + 0.05;

    // adjust for actual time passed
    momentum = (momentum * delta) / 0.016;

    // increase momentum if camera higher
    momentum = momentum + camera.position.z * 0.02;

    switch (key) {
      case 'w':
        camera.translateY(momentum);
        break;
      case 's':
        camera.translateY(-momentum);
        break;
      case 'd':
        camera.translateX(momentum);
        break;
      case 'a':
        camera.translateX(-momentum);
        break;
      default:
    }
  });
});
```

We first calculate the `duration` how long a key is pressed and then use this to determine the momentum. Finally we use this momentum to update the position of the camera.

### Using the Mouse Wheel

We use the mouse wheel to zoom in and out. For this, the position of the camera needs to change along the z axis.

```javascript
const mouseWheel = (e) => {
  let delta = e.wheelDelta;
  delta = delta / 240;
  delta = -delta;
  if (delta <= 0) {
    delta -= camera.position.z * 0.1;
  } else {
    delta += camera.position.z * 0.1;
  }
  if (camera.position.z + delta > 1 && camera.position.z + delta < 200) {
    camera.translateZ(delta);
  }
};
```

Here we simply determine the direction in which the wheel is scrolled and adjust the position of the camera to be higher or lower accordingly. There is a certain range in which the camera is permitted. If it gets to close to the ground or too far away from it, its position is not changed anymore even if the mouse wheel is turned.

I further had to change the way the drag movement was implemented. This originally worked only using the position of the mouse on the screen, since the screen never moved.

In case of an dynamic camera, we need a bit more calculation to be done which I encapsulated in the `get3DPosition` method.

```javascript
const get3DPosition = ({ screenX, screenY, camera }) => {
  var vector = new THREE.Vector3(screenX, screenY, 0.5);
  vector.unproject(camera);
  var dir = vector.sub(camera.position).normalize();
  var distance = -camera.position.z / dir.z;
  var pos = camera.position.clone().add(dir.multiplyScalar(distance));
  return [pos.x, pos.y, 0];
};
```

The major limitation I want to work on next is the lightning. There is currently a [SpotLight](https://threejs.org/docs/#api/en/lights/SpotLight) light source that only covers a small part of the plane and objects which are not within the cone of this spotlight are not rendered in an aesthetically pleasing fashion.

The full source code is available on [GitHub](https://github.com/mxro/threejs-test/tree/master/test3).
