


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50; 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


const loader = new THREE.TextureLoader();
loader.load(
  'assets/space.jpg',
  (texture) => {
    scene.background = texture; },
  undefined,
  (error) => {
    console.error('Error loading background texture:', error);
  }
);


function createPlanet(radius, color, distance, orbitSpeed) {
  const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const planetMaterial = new THREE.MeshStandardMaterial({ color });
  const planet = new THREE.Mesh(planetGeometry, planetMaterial);

  
  const orbitGroup = new THREE.Group();
  planet.position.x = distance;
  orbitGroup.add(planet);
  scene.add(orbitGroup);

  return { orbitGroup, speed: orbitSpeed };
}


const sunGeometry = new THREE.SphereGeometry(3, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);


const sunLight = new THREE.PointLight(0xffffff, 2, 100);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);


const planetsData = [
  { name: "Mercury", radius: 0.38, distance: 4, color: 0xaaaaaa, orbitSpeed: 0.02 },
  { name: "Venus", radius: 0.95, distance: 7, color: 0xffcc00, orbitSpeed: 0.015 },
  { name: "Earth", radius: 1, distance: 10, color: 0x0000ff, orbitSpeed: 0.01 },
  { name: "Mars", radius: 0.53, distance: 15, color: 0xff4500, orbitSpeed: 0.008 },
  { name: "Jupiter", radius: 11.21, distance: 20, color: 0xffa500, orbitSpeed: 0.005 },
  { name: "Saturn", radius: 9.45, distance: 25, color: 0xffd700, orbitSpeed: 0.004 },
  { name: "Uranus", radius: 4.01, distance: 30, color: 0x87ceeb, orbitSpeed: 0.003 },
  { name: "Neptune", radius: 3.88, distance: 35, color: 0x0000ff, orbitSpeed: 0.002 },
];


const planetGroups = planetsData.map((planet) =>
  createPlanet(planet.radius, planet.color, planet.distance, planet.orbitSpeed)
);


const saturnRingsGeometry = new THREE.RingGeometry(10, 12, 64);
const saturnRingsMaterial = new THREE.MeshBasicMaterial({
  color: 0xd2b48c,
  side: THREE.DoubleSide,
});
const saturnRings = new THREE.Mesh(saturnRingsGeometry, saturnRingsMaterial);
saturnRings.rotation.x = Math.PI / 2; 
saturnRings.position.set(25, 0, 0); 
scene.add(saturnRings);


function animate() {
  requestAnimationFrame(animate);

 
  planetGroups.forEach(({ orbitGroup, speed }) => {
    orbitGroup.rotation.y += speed;
  });

  renderer.render(scene, camera);
}


animate();
