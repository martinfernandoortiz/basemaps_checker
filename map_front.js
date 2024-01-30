let urls = {
    arg: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    gri: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    osc: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/argenmap_oscuro@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    top: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_topo@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    hib: "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_hibrido@EPSG%3A3857@png/{z}/{x}/{-y}.png",
    cus: "",
    osm: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    goo: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    esr: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    esr_national:"http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
    esr_physical: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
    esr_streets: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    esr_terrain: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
    esr_topo:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    esr_transportation: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
    sta_terrai:"http://a.tile.stamen.com/terrain/{z}/{x}/{y}.png",
    sta_toner:"http://tile.stamen.com/toner/{z}/{x}/{y}.png",
    sta_watercolor:"http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",
    car_positron: "https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    car_dark:"http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    bin_map: "http://ecn.dynamic.t0.tiles.virtualearth.net/comp/CompositionHandler/{q}?mkt=en-us&it=G,VE,BX,L,LA&shading=hill",
    bin_sat: "http://ecn.t3.tiles.virtualearth.net/tiles/a{q}.jpeg?g=0&dir=dir_n’",
    goo_Maps: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
    goo_Hybrid: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
    goo_Terrain: "https://mt1.google.com/vt/lyrs=t&x={x}&y={y}&z={z}",
    goo_Traffic: "https://mt1.google.com/vt?lyrs=h@159000000,traffic|seconds_into_week:-1&style=3&x={x}&y={y}&z={z}",
    goo_Roads: "https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}",
    osm_Mapnick: "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
    osm_Cycle: "http://tile.thunderforest.com/cycle/{z}/{x}/{y}.png",
    osm_bw: "http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
    osm_world_3D: "http://tiles.osm2world.org/osm/pngtiles/n/{z}/{x}/{y}.png"
};


// Opciones del mapa
let map = L.map("map", {
    center: [-30.61, -63.38],
    zoom: 6,
});

let left = L.tileLayer(urls.osm, {
    ext: "jpg",
    attribution: '<a>Esto es Boca</a>',
    minZoom: 2,
    maxZoom: 18,
}).addTo(map);


let right = L.tileLayer(urls.gri).addTo(map);


var izq = left
var der = right

var sideBySideControl = L.control.sideBySide(left, right).addTo(map);


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

function increment_left(base) {
    let currentLeftLayers = sideBySideControl._leftLayers; // Accedemos al array directamente
    currentLeftLayers.forEach(layer => map.removeLayer(layer));    // Remover todas las capas izquierdas
    sideBySideControl._leftLayers = []; // Limpiar el array de capas izquierdas
    let basemap = L.tileLayer(urls[base]).addTo(map);
    sideBySideControl.setLeftLayers(basemap);    // Agregar la capa ign (o cualquier otra acción que desees realizar)
    izq = basemap


};

function increment_left_hib(base) {
 
    let basemap = L.tileLayer(urls.hib).addTo(map);
    console.log("push")
    sideBySideControl._leftLayers.push(basemap);
    izq = basemap;
    der.bringToFront();
};

function increment_right(base) {
    let currentRightLayers = sideBySideControl._rightLayers; // Accedemos al array directamente
    currentRightLayers.forEach(layer => map.removeLayer(layer));    // Remover todas las capas izquierdas
    sideBySideControl._rightLayers = []; // Limpiar el array de capas izquierdas
    let basemap = L.tileLayer(urls[base]).addTo(map);
    sideBySideControl.setRightLayers(basemap);    // Agregar la capa ign (o cualquier otra acción que desees realizar)
    der = basemap
};

function increment_right_hib(base) {
 
    let basemap = L.tileLayer(urls.hib).addTo(map);
    console.log("push")
    sideBySideControl._rightLayers.push(basemap);
    der = basemap;
    izq.bringToFront();
};

function toggleAndChange_izq(id,map) {
    toggleButton(id);
    increment_left(map);
    console.log(sideBySideControl._leftLayers);
};

function toggleAndhib_izq(id,map) {
    toggleButton(id);
    increment_left_hib(map);
};

function toggleAndChange_der(id,map) {
    toggleButton(id);
    increment_right(map);
};

function toggleAndhib_der(id,map) {
    toggleButton(id);
    increment_right_hib(map);
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



// Añadimos un evento click al botón
addButton_left.addEventListener("click", function() {
urls.cus = input.value
// Utilizar el valor del input para actualizar la URL
increment_left('cus');
});


// Añadimos un evento click al botón
addButton_right.addEventListener("click", function() {
    urls.cus = miInput_right.value
    // Utilizar el valor del input para actualizar la URL
    increment_right('cus');
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
function addButton_list_left() {
    var miDropdown = document.getElementById("dropdownMenu_left");
    var opcionSeleccionadaValor = miDropdown.value;

    // Aquí puedes realizar acciones adicionales según la opción seleccionada
    console.log("Opción seleccionada:", opcionSeleccionadaValor);

    // Luego, puedes llamar a la función increment_left o realizar otras acciones según tus necesidades
    increment_left(opcionSeleccionadaValor);
};

function addButton_list_right() {
    var miDropdown = document.getElementById("dropdownMenu_right");
    var opcionSeleccionadaValor = miDropdown.value;

    // Aquí puedes realizar acciones adicionales según la opción seleccionada
    console.log("Opción seleccionada:", opcionSeleccionadaValor);

    // Luego, puedes llamar a la función increment_left o realizar otras acciones según tus necesidades
    increment_right(opcionSeleccionadaValor);
};
