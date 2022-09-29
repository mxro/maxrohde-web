---
title: "Creating a Draggable Shape with React Three Fiber"
date: "2019-10-19"
categories: 
  - "javascript"
tags: 
  - "open-source"
  - "react"
  - "three-js"
coverImage: "draggable.png"
---

I recently became interested how to render 3D graphics in the browser. I think [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) is an extremely powerful technology and may one day become an important way of rendering content on the web.

There are various frameworks and tools available to use WebGL such as [Babylon.js](https://www.babylonjs.com/) and [three.js](https://threejs.org/). To me, three.js looks the most promising for the use cases I am interested in.

For simple examples, three.js works beautifully but I think more complex applications can easily become unwieldy when using this framework. Thus I was very happy to come across [react-three-fiber](https://github.com/react-spring/react-three-fiber), which provides a wrapper around three.js using [React](https://reactjs.org/). React, for all its shortcomings, is a powerful way to keep code modular and maintainable.

To get my hands dirty with this library, I have created a little example of an application that renders a [Dodecahedron](https://en.wikipedia.org/wiki/Regular_dodecahedron) and allows dragging this shape by tapping or clicking and dragging with the mouse.

![](https://nexnet.files.wordpress.com/2019/10/draggable.png?w=815)

Here the link to the deployed application:

[react-three-fiber-draggable.surge.sh](https://react-three-fiber-draggable.surge.sh/)

And here the link to the source code:

[github.com/mxro/threejs-test/tree/master/test1](https://github.com/mxro/threejs-test/tree/master/test1)

I think the source code is pretty self-explanatory. Essentially all logic is encapsulated into `index.js`:

```javascript
import ReactDOM from "react-dom"
import React, { useRef, useState } from "react"
import { Canvas, useThree, useFrame } from "react-three-fiber"
import { useDrag } from "react-use-gesture"
import "./index.css"

function DraggableDodecahedron() {
    const colors = ["hotpink", "red", "blue", "green", "yellow"];
    const ref = useRef();
    const [colorIdx, setColorIdx] = useState(0);
    const [position, setPosition] = useState([0, 0, 0]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    useFrame(() => {
        ref.current.rotation.z += 0.01
        ref.current.rotation.x += 0.01
    });
    const bind = useDrag(({ offset: [x, y] }) => {
        const [,, z] = position;
        setPosition([x / aspect, -y / aspect, z]);
    }, { pointerEvents: true });

    return (
        <mesh position={position} {...bind()}
            ref={ref}
            onClick={e => {
                if (colorIdx === 4) {
                    setColorIdx(0);
                } else {
                    setColorIdx(colorIdx+1);
                }
            }}
            onPointerOver={e => console.log('hover')}
            onPointerOut={e => console.log('unhover')}>

            <dodecahedronBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color={colors[colorIdx]} />

        </mesh>
    )
}

ReactDOM.render(
    <Canvas>
        <spotLight intensity={1.2} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
        <DraggableDodecahedron />
    </Canvas>,
    document.getElementById("root")
)
```

Noteworthy here is that instead of creating a Material, Geometry and Mesh directly, they are defined in JSX. Also, instead of having to request an animation frame, we are using the hook `useFrame` to drive the animation for our component.

I think it can easily be seen how react-three-fiber could be used to make three.js applications more modular, for instance by handling the animation specifically for each `component`. I think this project is also testament to the power of React in that it cannot only be used with the DOM but also with other rendering technologies.
