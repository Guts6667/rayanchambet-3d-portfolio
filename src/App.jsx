import "./App.css";
import Home from "./Components/Home";
import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    renderer.render(scene, camera);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(20, 20, 20);
    const ambiantLight = new THREE.AmbientLight(0x1818181);
    scene.add(ambiantLight, pointLight);
    const lightHelper = new THREE.PointLightHelper(pointLight);
    scene.add(lightHelper);
    /**
     *  const gridHelper = new THREE.GridHelper(200, 50);
     */
    // create a torus and add it to the scene
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    // scene.add(gridHelper);
    const controls = new OrbitControls(camera, renderer.domElement);
    function addStar() {
      const geometry = new THREE.SphereGeometry(0.15, 24, 24);
      // create an array of colors to be used in a material for each star in the galaxy and assign a random color to each star, also add an array of colors for emissive light to be used in a material for each star in the galaxy and assign a random color to each star
      const colors = [
        "#FFF5F2",
        "#cc5c28",
        "#d5e784",
        "#7c2454",
        "#7558aa",
        "#a3a4c8",
        "#38384a",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const emissiveColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0x00ffff];
      const emissiveColor =
        emissiveColors[Math.floor(Math.random() * emissiveColors.length)];
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: emissiveColor,
      });
      const star = new THREE.Mesh(geometry, material);
      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(200).fill().forEach(addStar);
    const spaceTexture = new THREE.TextureLoader().load("background.jpeg");
    scene.background = spaceTexture;
    const moonTexture = new THREE.TextureLoader().load("2k_moon.jpg");
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: moonTexture,
      })
    );
    scene.add(moon);
    moon.position.z = -30;
    moon.position.setX(-15);
    moon.position.setY(-10);
    const marsTexture = new THREE.TextureLoader().load("2k_mars.jpg");
    const mars = new THREE.Mesh(
      new THREE.SphereGeometry(12, 32, 32),
      new THREE.MeshStandardMaterial({
        map: marsTexture,
        normalMap: marsTexture,
        emissive: "#e95b08",
        emissiveIntensity: 0.2,
      })
    );
    scene.add(mars);
    mars.position.z = -55;
    mars.position.setX(25);
    mars.position.setY(25);
    const saturnTexture = new THREE.TextureLoader().load("2k_saturn.jpg");
    const saturn = new THREE.Mesh(
      new THREE.SphereGeometry(25, 32, 32),
      new THREE.MeshStandardMaterial({
        map: saturnTexture,
        normalMap: saturnTexture,
      })
    );
    scene.add(saturn);
    saturn.position.z = -100;
    saturn.position.setX(10);
    saturn.position.setY(-70);
    const saturnRingTexture = new THREE.TextureLoader().load("2k_saturn_ring_alpha.png");
    const saturnRing = new THREE.Mesh(
    new THREE.RingGeometry(35, 40, 70),
    // Explain the values of the ring geometry above
    // The first value is the inner radius of the ring, the second value is the outer radius of the ring, and the third value is the number of segments that make up the ring
    new THREE.MeshStandardMaterial({
      map: saturnRingTexture,
      normalMap: saturnRingTexture,
      side: THREE.DoubleSide,
    })
    );
    scene.add(saturnRing);
    saturnRing.position.z = -100;
    saturnRing.position.setX(10);
    saturnRing.position.setY(-70);
    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;
      saturn.rotation.x += 0.05;
      saturn.rotation.y += 0.075;
      saturn.rotation.z += 0.05;
      saturnRing.rotation.x += 0.05;
      saturnRing.rotation.y += 0.075;
      saturnRing.rotation.z += 0.05;
      moon.rotation.x += 0.05;
      moon.rotation.y += 0.075;
      moon.rotation.z += 0.05;
      mars.rotation.x += 0.05;
      mars.rotation.y += 0.075;
      mars.rotation.z += 0.05;
      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.position.y = t * -0.0002;
    }
    document.body.onscroll = moveCamera;
    function animate() {
      requestAnimationFrame(animate);
      saturn.rotation.x += 0.005;
      saturn.rotation.y -= 0.005;
      saturn.rotation.z += 0.005;
      saturnRing.rotation.x += 0.005;
      saturnRing.rotation.y -= 0.005;
      saturnRing.rotation.z += 0.005;
      moon.rotation.x += 0.005;
      moon.rotation.y -= 0.005;
      moon.rotation.z += 0.005;
      mars.rotation.x += 0.00005;
      mars.rotation.y -= 0.005;
      mars.rotation.z += 0.005;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  }, []);
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
