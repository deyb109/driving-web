// Set up the scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(10, 20, 10)
scene.add(light)

// Terrain
const terrainGeometry = new THREE.PlaneGeometry(500, 500)
const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x2c7a1a })
const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial)
terrain.rotation.x = -Math.PI / 2
scene.add(terrain)

// Car
const carGeometry = new THREE.BoxGeometry(1, 1, 2)
const carMaterial = new THREE.MeshStandardMaterial({ color: 0xff3333 })
const car = new THREE.Mesh(carGeometry, carMaterial)
car.position.y = 0.5
scene.add(car)

// Camera follows behind the car
camera.position.set(0, 5, -10)
camera.lookAt(car.position)

// Movement
let speed = 0
let angle = 0
const keys = {}

document.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true)
document.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false)

function animate() {
  requestAnimationFrame(animate)

  // Speed control
  if (keys["w"]) speed = Math.min(speed + 0.01, 0.2)
  else if (keys["s"]) speed = Math.max(speed - 0.01, -0.1)
  else speed *= 0.98  // Friction

  // Steering
  if (keys["a"]) angle +=
