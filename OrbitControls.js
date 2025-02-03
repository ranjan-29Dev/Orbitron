

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.25; 
controls.screenSpacePanning = false; 
controls.update(); 


const loader = new THREE.TextureLoader();


function loadTexture(path, { onSuccess = () => {}, onError = (error) => {} } = {}) {
  return loader.load(
    path,
    (texture) => {
      onSuccess(texture);
    },
    undefined, 
    (error) => {
      console.error(`Error loading texture from ${path}:`, error);
      onError(error);
    }
  );
}


loadTexture('assets/space.jpg', {
  onSuccess: (texture) => {
    scene.background = texture; 
  },
  onError: (error) => {
    console.warn('Falling back to default background due to loading error');
    scene.background = new THREE.Color(0x000000); 
  }
});


const earthTexture = loadTexture('assets/earth.jpg', {
  onSuccess: (texture) => {
    
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: texture, 
      roughness: 0.8, 
      metalness: 0.2, 
      emissive: new THREE.Color(0x000000), 
    });

    
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32); 
    scene.add(earth); 

    
    earth.position.set(5, 0, 0); 
  },
  onError: (error) => {
    console.warn('Falling back to default Earth texture due to loading error');
    
    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000ff, 
    });
    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth); 
  }
});
