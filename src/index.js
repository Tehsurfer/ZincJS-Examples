var Zinc = require('zincjs');

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


