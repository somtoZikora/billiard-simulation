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

const floorDimensions = dimensions.floor;
let floorGeometry = new THREE.PlaneGeometry(floorDimensions.width, floorDimensions.height);
let floorMaterial = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.DoubleSide });
let floor = new THREE.Mesh(floorGeometry, floorMaterial);

scene.add(floor);
orient(floor);

const tableTopDimensions = dimensions.tableTop;
let tableTop = new THREE.Mesh(
  new THREE.BoxBufferGeometry(
    tableTopDimensions.width,
    tableTopDimensions.height,
    tableTopDimensions.depth
  ),
  new THREE.MeshBasicMaterial({ color: 'green' })
);

scene.add(tableTop);
orient(tableTop);
tableTop.position.y = 11 + tableTopDimensions.depth / 2;
console.log(tableTop.position);

const tableFootDimensions = dimensions.tableFoot;
addTableFoot({
  x: tableTopDimensions.width / 2 - 1,
  y: tableFootDimensions.depth / 2,
  z: -tableFootDimensions.depth / 2 - tableTopDimensions.depth / 2,
});
addTableFoot({
  x: tableTopDimensions.width / 2 - 1,
  y: -tableFootDimensions.depth / 2,
  z: -tableFootDimensions.depth / 2 - tableTopDimensions.depth / 2,
});
addTableFoot({
  x: -tableTopDimensions.width / 2 + 1,
  y: tableFootDimensions.depth / 2,
  z: -tableFootDimensions.depth / 2 - tableTopDimensions.depth / 2,
});
addTableFoot({
  x: -tableTopDimensions.width / 2 + 1,
  y: -tableFootDimensions.depth / 2,
  z: -tableFootDimensions.depth / 2 - tableTopDimensions.depth / 2,
});

const cushionDimensions = { x: dimensions.cushionX, y: dimensions.cushionY };
addCushion({
  y: tableTopDimensions.height / 2 + cushionDimensions.x.height / 2,
  z: cushionDimensions.x.depth / 2 - tableTopDimensions.depth / 2,
  axis: 'x',
});
addCushion({
  y: -(tableTopDimensions.height / 2 + cushionDimensions.x.height / 2),
  z: cushionDimensions.x.depth / 2 - tableTopDimensions.depth / 2,
  axis: 'x',
});
addCushion({
  x: tableTopDimensions.width / 2 + cushionDimensions.y.width / 2,
  z: cushionDimensions.y.depth / 2 - tableTopDimensions.depth / 2,
  axis: 'y',
});
addCushion({
  x: -(tableTopDimensions.width / 2 + cushionDimensions.y.width / 2),
  z: cushionDimensions.y.depth / 2 - tableTopDimensions.depth / 2,
  axis: 'y',
});

function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
}

function orient(object) {
  object.rotateX(-Math.PI / 2);
}

function addTableFoot({ x = 0, y = 0, z = 0 } = {}) {
  let tableFoot = new THREE.Mesh(
    new THREE.BoxBufferGeometry(
      tableFootDimensions.width,
      tableFootDimensions.height,
      tableFootDimensions.depth
    ),
    new THREE.MeshBasicMaterial({ color: 'black' })
  );

  tableTop.add(tableFoot);
  tableFoot.position.x = x;
  tableFoot.position.y = y;
  tableFoot.position.z = z;
}

function addCushion({ x = 0, y = 0, z = 0, axis } = {}) {
  let cushion = new THREE.Mesh(
    axis === 'x'
      ? new THREE.BoxBufferGeometry(
          cushionDimensions.x.width,
          cushionDimensions.x.height,
          cushionDimensions.x.depth
        )
      : new THREE.BoxBufferGeometry(
          cushionDimensions.y.width,
          cushionDimensions.y.height,
          cushionDimensions.y.depth
        ),
    new THREE.MeshBasicMaterial({ color: 'black' })
  );

  tableTop.add(cushion);
  cushion.position.x = x;
  cushion.position.y = y;
  cushion.position.z = z;
}

render();
