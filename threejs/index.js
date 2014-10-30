/* globals THREE */


console.log(document.body.width);
console.log(document.body.height);

// set the scene size
var WIDTH = document.body.clientWidth,
  HEIGHT = document.body.clientHeight;

// set some camera attributes
var VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 0.1,
  FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var container = document.getElementById('container');

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var camera =
  new THREE.PerspectiveCamera(
    VIEW_ANGLE,
    ASPECT,
    NEAR,
    FAR);

var scene = new THREE.Scene();

// add the camera to the scene
scene.add(camera);

// the camera starts at 0,0,0
// so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
container.appendChild(renderer.domElement);

// set up the sphere vars
var radius = 50,
    segments = 20,
    rings = 20;

// Create sphere mesh
var sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// create a new mesh with
// sphere geometry
var sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    radius,
    segments,
    rings),

  sphereMaterial);

// add the sphere to the scene
scene.add(sphere);

var areaLight = new THREE.AmbientLight(0x025600);

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);
scene.add(areaLight);

renderer.render(scene, camera);

var draw = function() {
  window.requestAnimationFrame(function(time) {
    sphere.position.y = Math.sin(time / 500) * 50;
    sphere.position.x = Math.cos(time / 500) * 50;
    renderer.render(scene, camera);
    draw();
  });
};

draw();