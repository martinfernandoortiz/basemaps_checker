let urls = {
    arg: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    gri: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    osc: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/argenmap_oscuro@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    top: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_topo@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    hib: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_hibrido@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    cus: "",
    osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    goo: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    hig: ["https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_hibrido@EPSG%3A3857@png/{z}/{x}/{-y}.png"]
};

let map = L.map("map", {
    center: [-34.61, -58.38],
    zoom: 10,
});

// Usa las URLs como sea necesario
let left = L.tileLayer(urls.osm, {
    ext: "jpg",
    attribution: '<a>Esto es Boca</a>',
    minZoom: 2,
    maxZoom: 18,
}).addTo(map);

var right = L.tileLayer(urls.gri).addTo(map);

// Creamos un control que agrega una pantalla dividida
let sideBySideControl = L.control.sideBySide(left, right).addTo(map);


  var offsetX, offsetY;
    var isDragging = false;
    var dragInterval;

    function toggleMovible(id){
        //e.stopPropagation(); // Evitar que el evento llegue al documento y active el clic del mapa
        var movible = document.getElementById(id);

        if (movible.classList.contains('maximized')) {
            movible.classList.remove('maximized');
        } else {
            movible.classList.add('maximized');
        }
        
        updateContentVisibility(id);
    }




function addButton() {
    // Lógica para agregar botones
    console.log('Botón agregado');
}

function submitForm() {
    // Lógica para enviar el formulario
    console.log('Formulario enviado');
}

function updateContentVisibility(id) {
    var movible = document.getElementById(id);
    var content = document.querySelector('.content');
    
    if (movible.classList.contains('minimized')) {
        content.style.visibility = 'hidden';
        content.style.height = '0';
    } else {
        content.style.visibility = 'visible';
        content.style.height = 'auto';
    }
}



function toggleButton(buttonId) {
    var button = document.getElementById(buttonId);

    // Alternar la clase 'active' para cambiar el estilo cuando se presiona
    button.classList.toggle('active');
}






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


function increment_right(base) {
    let currentRightLayers = sideBySideControl._rightLayers; // Accedemos al array directamente

    // Remover todas las capas izquierdas
    currentRightLayers.forEach(layer => map.removeLayer(layer));
    sideBySideControl._rightLayers = []; // Limpiar el array de capas izquierdas

    let basemap = L.tileLayer(urls[base]).addTo(map);

    // Agregar la capa ign (o cualquier otra acción que desees realizar)
    sideBySideControl.setRightLayers(basemap);
    console.log("Agrego os...");
};






function hibrid() {
console.log("Incrementing...");
// Obtén las capas izquierdas actuales del control sideBySide
let currentLeftLayers = sideBySideControl._leftLayers; // Accedemos al array directamente

// Remover todas las capas izquierdas
currentLeftLayers.forEach(layer => map.removeLayer(layer));
sideBySideControl._leftLayers = []; // Limpiar el array de capas izquierdas
let goo = L.tileLayer(urls.goo).addTo(map);


let hib = L.tileLayer(urls.hib).addTo(map);

let currentRightLayers = sideBySideControl._rightLayers; // Accedemos al array directamente
currentRightLayers.forEach(layer => map.removeLayer(layer));
sideBySideControl._rightLayers = []; // Limpiar el array de capas izquierdas

let newRight = arcgis

// Agregar la capa ign (o cualquier otra acción que desees realizar)
sideBySideControl.setLeftLayers(hib);
sideBySideControl.setRightLayers(newRight);

console.log("HIBRIDO CARGADO");

};

function inhalo() {
console.log("INHALO")
console.log("EXHALO")
}


function toggleAndChange(id,map) {
    toggleButton(id);
    increment(map);
}


function toggleAndhib(id,map) {
    toggleButton(id);
    hibrid(map);
}

function toggleAndChange_right(id,map) {
    toggleButton(id);
    increment_right(map);
}

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

