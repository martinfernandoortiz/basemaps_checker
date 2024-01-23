
let urls = {
	arg: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
	gri: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png",
	osc: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/argenmap_oscuro@EPSG%3A3857@png/{z}/{x}/{-y}.png",
	top: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_topo@EPSG%3A3857@png/{z}/{x}/{-y}.png",
	hib: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_hibrido@EPSG%3A3857@png/{z}/{x}/{-y}.png",
	cus:"",
	osm:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",
	goo:"https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
};


var tileLayer1 = L.tileLayer(urls.goo);
var tileLayer2 = L.tileLayer(urls.hib);
var layerGroup =  L.layerGroup[tileLayer1, tileLayer2];





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

let arcgis = L.tileLayer(
	"https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png",
	{ ext: "jpg" }
).addTo(map);



// Creamos un control que agrega una pantalla dividida
L.control.sideBySide(ign, arcgis).addTo(map);




// Codigo para agregar la url personalizada

var input = document.getElementById("miInput");
var addButton = document.getElementById("addButton");

// Añadimos un evento click al botón
addButton.addEventListener("click", function() {
	urls.cus = input.value
	// Utilizar el valor del input para actualizar la URL
	increment('cus');
});

function increment(base) {
	ign.setUrl(urls[base]);
};

function hibrid() {
	// Elimina la capa 'ign' si ya está en el mapa
	map.eachLayer(function (layer) {
		if (layer instanceof L.TileLayer && layer === ign) {
			map.removeLayer(layer);
		}
	});

	// Añade el LayerGroup al mapa solo si 'ign' no está presente
	if (!map.hasLayer(ign)) {
		ign.addTo(map);
	}
}


// Para modificar el estilo del cuadro de texto input

function handleClick(element) {
	// Limpiar el valor y cambiar el color cuando el campo de entrada es clicado
	if (element.value === "Ingrese otra url para agregar su mapa base") {
		element.value = "";
		element.style.color = "black"; // Cambiar el color del texto
		// Puedes agregar más estilos según sea necesario
	}
}

//  Lista de elementos
var miDropdown = document.getElementById("miDropdown");
var botonMostrar = document.getElementById("addButton_ext");

// Añadimos un evento click al botón
botonMostrar.addEventListener("click", function() {
	// Obtener el valor de la opción seleccionada
	var opcionSeleccionadaValor = miDropdown.value;

	// Ejecutar acciones basadas en la opción seleccionada
	switch (opcionSeleccionadaValor) {
		case "osm":
		// Lógica para la opción OpenStreetMap
		urls.osm = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
		increment('osm');
		break;
		case "sta":
		// Lógica para la opción 2
		increment('urls.goo');
		break;
		// Agrega más casos según sea necesario
	}
});
