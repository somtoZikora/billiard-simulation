const scene = new THREE.Scene();
const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const ambientLight = new THREE.AmbientLight(0x404040);
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new THREE.TrackballControls(camera, canvas);
const axesHelper = new THREE.AxisHelper(2000);

renderer.setClearColor('white');

camera.position.set(17, 6, 30);
camera.lookAt(scene.position);

scene.add(ambientLight);
scene.add(axesHelper);

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

render();
