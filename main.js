
// Set up the scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Add light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(10, 20, 10)
scene.add(light)

// Add terrain (simple plane)
const terrainGeometry = new THREE.PlaneGeometry(100, 100, 10, 10)
const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, wireframe: false })
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
terrain.rotation.x = -Math.PI / 2
scene.add(terrain)

// Add car (a cube for now)
const carGeometry = new THREE.BoxGeometry(1, 1, 2)
const carMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
const car = new THREE.Mesh(carGeometry, carMaterial)
car.position.y = 0.5
scene.add(car)

camera.position.set(0, 5, 10)
camera.lookAt(car.position)

// Controls
const keys = {}
document.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true)
document.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false)

function animate() {
  requestAnimationFrame(animate)

  if (keys["w"]) car.position.z -= 0.1
  if (keys["s"]) car.position.z += 0.1
  if (keys["a"]) car.position.x -= 0.1
  if (keys["d"]) car.position.x += 0.1

  renderer.render(scene, camera)
}

animate()
