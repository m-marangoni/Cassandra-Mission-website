//all three.js planet codes based on SuperHi tutorial about experimental javascript https://www.superhi.com/

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1)

const sectionTag = document.querySelector("section")
sectionTag.appendChild(renderer.domElement)

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.00020)

// add some lighting
const ambientLight = new THREE.AmbientLight(0x777777)
scene.add(ambientLight)

// add a spotlight
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(300, 300, -2000)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.z = -3000

// make a THREE.js loader
const loader = new THREE.TextureLoader()



// make planet 
const makePlanet = function () {
  const texture = loader.load("/src/mapamundi.png")
  const geometry = new THREE.SphereGeometry(600, 128, 128)
  const material = new THREE.MeshLambertMaterial({
    //color: 0x2727e6,
    map: texture
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  return mesh
}



const makeStars = function (url, maxNum) {
  const texture = loader.load(url)
  const geometry = new THREE.Geometry()

  for (let i = 0; i < maxNum; i = i + 1) {
    const point = new THREE.Vector3()
    const sphericalPoint = new THREE.Spherical(
      1200 + Math.random() * 1200,
      2 * Math.PI * Math.random(),
      Math.PI * Math.random()
    )

    point.setFromSpherical(sphericalPoint)

    geometry.vertices.push(point)
  }

  const material = new THREE.PointsMaterial({
    size: 30,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false
  })

  const points = new THREE.Points(geometry, material)

  scene.add(points)

  return points
}

// make a curved line
const makeLine = function () {
  const path = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(800, 0, 0),
    new THREE.Vector3(1200, 0, -1200),
    new THREE.Vector3(0, 0, -800)
  )

  const geometry = new THREE.TubeGeometry(path, 50, 8, 20, false)
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  })

  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  return mesh
}


//make a moon
const makeMoon = function () {
  const texture = loader.load("/src/moontexture.png")
  const geometry = new THREE.SphereGeometry(100, 64, 64)
  const material = new THREE.MeshLambertMaterial({
    map: texture
  })
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
  return mesh
}



// const loadFiles = function (mtlUrl, objUrl) {
//   return new Promise((resolve, reject) => {
//     const objLoader = new THREE.OBJLoader()
// 		const mtlLoader = new THREE.MTLLoader()

//     mtlLoader.load(mtlUrl, function (materials) {
//   		objLoader.setMaterials(materials)
//   		objLoader.load(objUrl, function (obj) {
//    			resolve(obj)
//   		})
// 		})
//   })
// }

// // let loader2 = new THREE.OBJLoader();
// // loader2.crossOrigin = true;
// // loader2.load( 'Pioneer.mtl','Pioneer.obj', function ( data ) {


// //     var object = data.scene;
// //    // object.rotation.set(Math.PI / -2, 0, 0);

// //     scene.add( object );
// // });

// // let pioneer = null
// // let pioneerGroup = new THREE.Group()
// // scene.add(pioneerGroup)

// let loader2 = new THREE.OBJLoader();
// loader2.crossOrigin = true;
// loader2.load("Pioneer.mtl", "Pioneer.obj", function (obj) {


//   const material = new THREE.MeshLambertMaterial({
//     color: new THREE.Color('#333333')
//   })

//   obj.traverse(child => {
//     child.material = material
//     child.castShadow = true
//     child.scale(3)
//   })

//   pioneer = obj
//   pioneerGroup.add(pioneer)
// })

const earth = makePlanet()

const stars2 = makeStars("/src/particle.png", 4000)

const moon = makeMoon()
const moonGroup = new THREE.Group()
moonGroup.add(moon)
scene.add(moonGroup)
moon.translateX(-1500)
moon.rotateY(0.02)


// hold the camera positions
let currentX = 0
let currentY = 0
let aimX = 0
let aimY = 0

const animate = function () {
  const diffX = aimX - currentX
  const diffY = aimY - currentY

  currentX = currentX + diffX * 0.01
  currentY = currentY + diffY * 0.01

  const sphere = new THREE.Spherical(
    3000,
    (currentY * 0.001) - Math.PI / 2,
    (currentX * 0.001)
  )

  camera.position.setFromSpherical(sphere)

  camera.position.x = currentX

  camera.position.y = currentY

  camera.lookAt(scene.position)

  earth.rotateY(0.002)
  moon.rotateY(0.002)
  moonGroup.rotateY(0.004)

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}
animate()

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
})

// variation: scroll down page
// document.addEventListener("scroll", function () {
//   const scrollPosition = window.pageYOffset

//   earth.rotation.set(0, scrollPosition / 100, 0)
// })

let isMouseDown = false
let startX = 0
let startY = 0

document.addEventListener("mousedown", function (event) {
  isMouseDown = true
  startX = event.pageX
  startY = event.pageY
})

document.addEventListener("mouseup", function () {
  isMouseDown = false
})

document.addEventListener("mousemove", function (event) {
  if (isMouseDown) {
    // aimX = ((window.innerWidth / 2) - event.pageX) * 4
    // aimY = ((window.innerHeight / 2) - event.pageY) * 4
    aimX = aimX + ((event.pageX - startX) * 2)
    aimY = aimY + ((event.pageY - startY) * 2)
    startX = event.pageX
    startY = event.pageY
  }

})

document.addEventListener("touchmove", function (event) {
  aimX = ((window.innerWidth / 2) - event.pageX) * 4
  aimY = ((window.innerHeight / 2) - event.pageY) * 4
})





document.addEventListener("click", function (event) {
  const mouse = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()

  mouse.set(
    (event.pageX / window.innerWidth) * 2 - 1,
    (event.pageY / window.innerHeight) * -2 + 1

  )
  raycaster.setFromCamera(mouse, camera)
  const intersections = raycaster.intersectObjects([earth, moon])

  intersections.forEach(intersection => {

      var spriteMap = new THREE.TextureLoader().load('/src/glow.png');

      var spriteMaterial = new THREE.SpriteMaterial({
        map: spriteMap,
        color: 'white'
      });

      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(200, 200, 1)

      scene.add(sprite);

      // intersection.object.material = new THREE.MeshStandardMaterial({
      //   color: ['#245dff','#00000'],
      //   transparent: true, opacity: 0.8, 

      // })
      window.open("pioneerplaque.html", "mywindow2", "width=400,height=230, left=800, top=100,directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, dependent=yes");
      window.open("spiral/index.html", "mywindow3", "width=400,height=400,left=10, top=300,  directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, dependent=yes");
      window.open("remnants.html", "mywindow", "width=450,height=200, left=100, top=100, directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, dependent=yes");
      window.open("lunarlibrary.html", "mywindow4", "width=400,height=200, left=700, top=500, directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, dependent=yes");
      window.open("rot/index.html", "mywindow5", "width=350,height=350, left=1200, top=300, directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no, dependent=yes");


    }

    // var x = document.createElement("IMG");
    // x.setAttribute("src", "rad.jpg");
    // x.setAttribute("height", "200");
    // x.setAttribute("alt", "suppp");
    // document.getElementById("popup").appendChild(x);
    // document.getElementById("popup2").appendChild(x);



  );




})