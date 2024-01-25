let urls = {
    arg: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    gri: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    osc: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/argenmap_oscuro@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    top: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_topo@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    hib: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_hibrido@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    cus: "",
	sta: "http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png",
    osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    goo: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
};


let map = L.map("map", {
	center: [-34.61, -58.38],
	zoom: 10,
});

// Usa las URLs como sea necesario
let ign = L.tileLayer(urls.arg, {
	ext: "jpg",
	attribution: '<a>Esto es Boca</a>',
	minZoom: 2,
	maxZoom: 18,
}).addTo(map);



let arcgis = L.tileLayer(urls.gri).addTo(map);




// Creamos un control que agrega una pantalla dividida
let sideBySideControl = L.control.sideBySide(ign, arcgis).addTo(map);




////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

/*Funcion de los botones de agregar mapas base. Hasta ahora hay 2 : para los mapas comunes y para el hibrido.
Cada uno de estos primero borra el layer del mapa y despues agrega uno.*/

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


/*
// Esta es una forma mas simple pero el tema del hibrido la caga
function increment(base) {
ign.setUrl(urls[base]); 
};

*/

		function increment(base) {
			let currentLeftLayers = sideBySideControl._leftLayers; // Accedemos al array directamente

			// Remover todas las capas izquierdas
			currentLeftLayers.forEach(layer => map.removeLayer(layer));
			sideBySideControl._leftLayers = []; // Limpiar el array de capas izquierdas
			let basemap = L.tileLayer(urls[base]).addTo(map);
		
			// Agregar la capa ign (o cualquier otra acción que desees realizar)
			sideBySideControl.setLeftLayers(basemap);
			console.log("Agrego os...");
		};




function hibrid() {
    console.log("Incrementing...");
    // Obtén las capas izquierdas actuales del control sideBySide
    let currentLeftLayers = sideBySideControl._leftLayers; // Accedemos al array directamente

    // Remover todas las capas izquierdas
    currentLeftLayers.forEach(layer => map.removeLayer(layer));
    sideBySideControl._leftLayers = []; // Limpiar el array de capas izquierdas
    let osc = L.tileLayer(urls.goo).addTo(map);
    let hib = L.tileLayer(urls.hib).addTo(map);

    // Agregar la capa ign (o cualquier otra acción que desees realizar)
    sideBySideControl.setLeftLayers(hib);
    console.log("Agrego os...");

};

/*
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// Funciones para el input
1- Botones para agregar
2 - Para modificar el estilo del cuadro de texto input


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
*/

// Codigo para agregar la url personalizada
// 

function handleClick(element) {
	// Limpiar el valor y cambiar el color cuando el campo de entrada es clicado
	if (element.value == "Ingrese otra url para agregar su mapa base") {
		element.value = "";
		element.style.color = "black"; // Cambiar el color del texto
		// Puedes agregar más estilos según sea necesario
	}
}




var input = document.getElementById("miInput");
var addButton = document.getElementById("addButton");

// Añadimos un evento click al botón
addButton.addEventListener("click", function() {
	urls.cus = input.value
	// Utilizar el valor del input para actualizar la URL
	increment('cus');
});

/*
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// Lista de elementos


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
*/



var miDropdown = document.getElementById("miDropdown");
var botonMostrar = document.getElementById("addButton_ext");

// Añadimos un evento click al botón
botonMostrar.addEventListener("click", function() {
	// Obtener el valor de la opción seleccionada
	var opcionSeleccionadaValor = miDropdown.value;

	// Ejecutar acciones basadas en la opción seleccionada
	switch (opcionSeleccionadaValor) {
		case "osma":
		increment('osm');
		break;
		case "stam":
		increment('sta');
		break;
		case "goog":
		increment('goo');
		break
		}
});
