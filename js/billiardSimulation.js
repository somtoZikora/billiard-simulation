const scene = new THREE.Scene();
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.clientHeight, 0.1, 2000);
const ambientLight = new THREE.AmbientLight(0x404040);
const controls = new THREE.TrackballControls(camera, canvas);

camera.position.set(17, 6, 30);
camera.lookAt(scene.position);
scene.add(ambientLight);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', onWindowResize, false);

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

render();
