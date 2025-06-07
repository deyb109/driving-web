// Set up scene, camera, renderer
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

// Movement variables
let speed = 0
let angle = 0
const keys = {}

// Mouse control
let isRightMouseDown = false
let mouseX = 0
let mouseY = 0
let camYaw = 0
let camPitch = 0
let camDistance = 10

document.addEventListener("keydown", (e) => keys[e.key.toLowerCase()] = true)
document.addEventListener("keyup", (e) => keys[e.key.toLowerCase()] = false)

document.addEventListener("mousedown", (e) => {
  if (e.button === 2) {
    isRightMouseDown = true
    mouseX = e.clientX
    mouseY = e.clientY
  }
})

document.addEventListener("mouseup", (e) => {
  if (e.button === 2) isRightMouseDown = false
})

document.addEventListener("mousemove", (e) => {
  if (isRightMouseDown) {
    const deltaX = e.clientX - mouseX
    const deltaY = e.clientY - mouseY
    camYaw -= deltaX * 0.005
    camPitch -= deltaY * 0.005
    camPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, camPitch))
    mouseX = e.clientX
    mouseY = e.clientY
  }
})

document.addEventListener("wheel", (e) => {
  camDistance += e.deltaY * 0.01
  camDistance = Math.max(5, Math.min(30, camDistance))
})

document.addEventListener("contextmenu", (e) => e.preventDefault()) // Disable right-click menu

function animate() {
  requestAnimationFrame(animate)

  // Speed control
  if (keys["w"]) speed = Math.min(speed + 0.01, 0.2)
  else if (keys["s"]) speed = Math.max(speed - 0.01, -0.1)
  else speed *= 0.98

  // Steering
  if (keys["a"]) angle += 0.03
  if (keys["d"]) angle -= 0.03

  // Car movement
  car.rotation.y = angle
  car.position.x -= Math.sin(angle) * speed
  car.position.z -= Math.cos(angle) * speed

  // Camera follows car with right-click orbit
  const offsetX = Math.sin(camYaw) * Math.cos(camPitch) * camDistance
  const offsetY = Math.sin(camPitch) * camDistance
  const offsetZ = Math.cos(camYaw) * Math.cos(camPitch) * camDistance

  camera.position.set(
    car.position.x + offsetX,
    car.position.y + offsetY + 1.5,
    car.position.z + offsetZ
  )

  camera.lookAt(car.position.x, car.position.y + 0.5, car.position.z)

  renderer.render(scene, camera)
}

animate()
