var Zinc = require('zincjs');
var THREE = require('three');

var currentModel = undefined;
container = document.createElement( 'div' );
document.body.appendChild( container );
container.style.height = "100%";
zincRenderer = new Zinc.Renderer(container, window);
zincRenderer.initialiseVisualisation();






function loadMyModel(model_name) {
	if (currentModel != model_name) {
		var scene = zincRenderer.getSceneByName(model_name)
		if (scene == undefined) {
			scene = zincRenderer.createScene(model_name);
			scene.loadFromViewURL("models/"+model_name);
		} else {
			scene.resetView();
		}
		zincRenderer.setCurrentScene(scene);
		var geometry = new THREE.BoxGeometry(20.4,20.4,20.4);

		vt = canvasVideo(videoLoadedCallback);
		var material = new THREE.MeshLambertMaterial( { map: vt} );
		this.material = material;
		cube = new THREE.Mesh(geometry, material);
		zincRenderer.addToScene(cube);
		
	}
}

function resetView()
{
	zincRenderer.resetView();
}

function viewAll()
{
	zincRenderer.viewAll();
}

loadMyModel("deforming_heart");
zincRenderer.animate();

exports.loadMyModel = loadMyModel;
exports.resetView = resetView;
exports.viewAll = viewAll;


function canvasVideo(callback){
	// create the video element
	video = document.createElement( 'video' );
	video.src = "models/videos/videoplayback.mp4";
	video.load(); // must call after setting/changing source
	video.play();
	video.loop = true;
	this.video = video;
	videoImage = document.createElement( 'canvas' );
	videoImage.width = 480;
	videoImage.height = 480;

	videoImageContext = videoImage.getContext( '2d' );
	// background color if no video present
	videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	videoTexture = new THREE.VideoTexture( video );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	videoTexture.format = THREE.RGBFormat;
	callback();
	return videoTexture
}

function videoLoadedCallback(){
	slider = document.getElementById('vidSlider')
	var adjustVideoTime = function(){
		video.currentTime = slider.value*video.duration/100;
	}
	slider.oninput = adjustVideoTime
}


