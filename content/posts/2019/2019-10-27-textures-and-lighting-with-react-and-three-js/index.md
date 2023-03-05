---
categories:
- javascript
coverImage: version-4.png
date: "2019-10-27"
primaryBlog: maxrohde.com
tags:
- open-source
- programming
- react
- react-hooks
- three-js
title: Textures and Lighting with React and Three.js
---

In my previous three posts, I have developed a simple WebGL application using [react-three-fiber](https://github.com/react-spring/react-three-fiber) and [three.js](https://threejs.org/). In this post, I am adding texture loading and proper lighting to the application.

For reference, here the links to the previous versions of the app:

- [Version 1](https://maxrohde.com/2019/10/19/creating-a-draggable-shape-with-react-three-fiber/): Just being able to drag a shape on the screen
- [Version 2](https://maxrohde.com/2019/10/23/create-and-drag-shapes-with-three-js-react-and-cannon-js/): Dragging and dropping shapes using physics
- [Version 3](https://maxrohde.com/2019/10/25/camera-movement-with-three-js/): Being able to move the camera

Here the version developed for this post:

[threejs-react-textures-light](https://threejs-react-textures-light.surge.sh/)

[Source Code](https://github.com/mxro/threejs-test/tree/master/test4)

You can click to add objects, click and drag them as well as move the camera using WASD keys and mouse wheel to zoom.

![](https://nexnet.files.wordpress.com/2019/10/version-4.png?w=1024)

## Loading Textures

Textures can be loaded easily in react-three-fiber using the `useResource` hook.

All that is required to place the texture in the `public/` folder of the react application, load the texture and then link it to the material by setting the `map` property.

```javascript
const [texture] = useLoader(TextureLoader, 'textures/grasslight-big.jpg');

if (texture) {
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1500, 1500);
  texture.anisotropy = 16;
}

return (
  <mesh ref={ref} receiveShadow position={position} onClick={onPlaneClick}>
    <planeBufferGeometry attach="geometry" args={[10000, 10000]} />
    {texture && <meshPhongMaterial attach="material" map={texture} />}
  </mesh>
);
```

I found that textures are often quite large in size; larger than 1 MB. This significantly extends loading times. Thus I have added a [simple loading screen](https://github.com/mxro/threejs-test/blob/master/test4/src/Spinner.js). Unfortunately to be able to display the text 'loading' I had to create a [TextGeometry](https://threejs.org/docs/#api/en/geometries/TextGeometry) which in turn required a font to be loaded (I prepared the Roboto font using [facetype.js](https://gero3.github.io/facetype.js/). This font by itself is more than 300 kb, so even loading the loading screen takes a bit of time.

## Lighting

The goal of this application is to have a simple, very large plane on which any number of objects may be added. The issue I encountered with this was that to get shadows working with a [DirectionalLight](https://threejs.org/docs/api/en/lights/DirectionalLight) turned out to be very tricky. In the end, I used a combination of an [AmbientLight](https://threejs.org/docs/api/en/lights/AmbientLight.html) with a [SpotLight](https://threejs.org/docs/api/en/lights/SpotLight.html).

```javascript
        <ambientLight intensity={0.9} />

        <primitive object={lightTarget} position={lightTargetPosition} />
        <spotLight
            castShadow
            intensity={0.25}
            position={lightPosition}
            angle={Math.PI / 3}
            penumbra={1}
            shadow-mapSize={new Vector2(2048 * 5, 2048 * 5)}
            target={lightTarget}
        />
```

Since the SpotLight would not be able to cover the whole of the plane (as said, it is meant to be very large) and provide accurate shadows, I opted for moving the SpotLight when a user moves the camera.

```javascript
const lightTargetYDelta = 120;
const lightTargetXDelta = 80;
const [lightPosition, setLightPosition] = useState([
  -lightTargetXDelta,
  -lightTargetYDelta,
  200,
]);
const [lightTargetPosition, setLightTargetPosition] = useState([0, 0, 0]);
const onCameraMoved = (delta) => {
  const newLightPosition = delta.map((e, idx) => lightPosition[idx] + e);
  setLightPosition(newLightPosition);
  const newLightTargetPosition = [
    newLightPosition[0] + lightTargetXDelta,
    newLightPosition[1] + lightTargetYDelta,
    0,
  ];
  setLightTargetPosition(newLightTargetPosition);
};
```

This required both updating the position of the light `setLightPosition` as well as moving the light target `setLightTargetPosition`.

## Modularity

Since the amount of code for this example increased quite a bit over the past three iterations, I broke up the application into multiple modules, with most React components now sitting in their own file.

I think this really shows the advantage of using React with Three.js, since it is easy for each component to manage its own state.

For the next iteration, I will most likely be looking at how I can remove the textures or use much smaller textures. I would like the application to be able to load as quickly as possible, and textures clearly do not seem a great option for this.