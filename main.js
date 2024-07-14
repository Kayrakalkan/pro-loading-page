import * as BABYLON from '@babylonjs/core'; // imported babylon.js directory 
import "@babylonjs/loaders";

const canvas = document.getElementById('renderCanvas'); 
const engine = new BABYLON.Engine(canvas, true);  
var camera;

var loadingContainer = document.getElementById("loadingContainer");// get loadingContainer from html and define 

const progressBar = document.querySelector(".progress-circle-fill");
const progressText = document.querySelector(".progress-text");

function setProgress(percent) {
  const offset = ((100 - percent) / 100) * 314;
  progressBar.style.strokeDashoffset = offset;
  progressText.textContent = percent + "%";
}

function customLoadingScreen() {  // i create custom loading screen
    console.log("customLoadingScreen creation")
}
customLoadingScreen.prototype.displayLoadingUI = function () {
    console.log("customLoadingScreen loading")
};
customLoadingScreen.prototype.hideLoadingUI = function () { // when if page is loaded to disappear loading page
    console.log("customLoadingScreen loaded")
    loadingContainer.style.display = "none";
};

var loadingScreen = new customLoadingScreen(); // define the loading screen 
engine.loadingScreen = loadingScreen;

engine.displayLoadingUI(); 

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // i enabled a physics

    camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 7, 0), scene);
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;



    // gun importing 
    BABYLON.SceneLoader.ImportMesh("", "https://models.babylonjs.com//", "fish.glb", scene, function (meshes) { 
        var mesh = meshes[0]; // define the mesh
        mesh.scaling.set(30,30,30)
        engine.hideLoadingUI(); // i added this line because when loaded the guns.glb file to disappear loadingui
    },
    function (evt) { // this function related loading percent i got help documentation then i write 
        var loadedPercent = 0;
        if (evt.lengthComputable) {
            loadedPercent = (evt.loaded * 100 / evt.total).toFixed();
        } else {
            var dlCount = evt.loaded / (1024 * 1024);
            loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
        }
    
        // i get loadingScreenPercent froum from html file and i added loading... text 
        setProgress(loadedPercent); // i used updateProgressBar function
    }
);
    
    return scene;
};

var scene = createScene();



engine.runRenderLoop(function () {
    if (scene){
        scene.render();
    }
});

window.addEventListener('resize', function () {
    engine.resize();
});