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


var ciudades = {
    "Buenos Aires": { lat: -34.61, lon: -58.38, zoom: 10 },
    "Nueva York": { lat: 40.71, lon: -74.01, zoom: 12 },
    // Agrega más ciudades según sea necesario
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


var dropdown = document.getElementById("ciudadesDropdown");


var ciudadesPorProvincia = {
    "Buenos Aires": ["Ciudad de Buenos Aires", "La Plata", "Mar del Plata"],
    "Córdoba": ["Córdoba"],
    // Agrega más ciudades según sea necesario
};

var sitiosInteres = ["Cataratas de Iguazú", "El Chaltén", "Mar del Plata"];

// Llena el dropdown de ubicación según la selección del primer dropdown
function llenarUbicacionDropdown() {
    var tipoUbicacion = document.getElementById("tipoUbicacionDropdown").value;
    var ubicacionDropdown = document.getElementById("ubicacionDropdown");

    // Limpia las opciones actuales
    ubicacionDropdown.innerHTML = "";

    // Llena las opciones según la selección del primer dropdown
    switch (tipoUbicacion) {
        case "provincias":
            for (var provincia in ciudadesPorProvincia) {
                var option = document.createElement("option");
                option.value = provincia;
                option.text = provincia;
                ubicacionDropdown.appendChild(option);
            }
            break;
        case "ciudades":
            for (var ciudad in ciudadesPorProvincia["Buenos Aires"]) {
                var option = document.createElement("option");
                option.value = ciudadesPorProvincia["Buenos Aires"][ciudad];
                option.text = ciudadesPorProvincia["Buenos Aires"][ciudad];
                ubicacionDropdown.appendChild(option);
            }
            break;
        case "sitiosInteres":
            for (var sitio in sitiosInteres) {
                var option = document.createElement("option");
                option.value = sitiosInteres[sitio];
                option.text = sitiosInteres[sitio];
                ubicacionDropdown.appendChild(option);
            }
            break;
    }
}

// Llena el dropdown de ubicación al cargar la página
llenarUbicacionDropdown();

// ...

// Evento al cambio del dropdown para seleccionar el tipo de ubicación
document.getElementById("tipoUbicacionDropdown").addEventListener("change", function() {
    llenarUbicacionDropdown();
});

// Evento al cambio del dropdown para volar al lugar seleccionado
function moverMapa() {
    var tipoUbicacion = document.getElementById("tipoUbicacionDropdown").value;
    var ubicacionSeleccionada = document.getElementById("ubicacionDropdown").value;
    var zoomSeleccionado = parseInt(document.getElementById("zoomInput").value, 10);

    // Verifica que el valor de zoom esté dentro del rango permitido
    if (ubicacionSeleccionada && !isNaN(zoomSeleccionado) && zoomSeleccionado >= 3 && zoomSeleccionado <= 18) {
        var coords;

        switch (tipoUbicacion) {
            case "provincias":
                // Obtiene las coordenadas de la provincia (usando un valor de ejemplo)
                coords = { lat: -34.61, lon: -58.38 };
                break;
            case "ciudades":
                // Obtiene las coordenadas de la ciudad (usando un valor de ejemplo)
                coords = { lat: -34.61, lon: -58.38 };
                break;
            case "sitiosInteres":
                // Obtiene las coordenadas del sitio de interés (usando un valor de ejemplo)
                coords = { lat: -34.61, lon: -58.38 };
                break;
        }

        // Opciones para la animación
        var options = {
            duration: 2,  // Duración en segundos
            easeLinearity: 0.25  // Factor de suavizado
        };

        map.flyTo([coords.lat, coords.lon], zoomSeleccionado, options);
    } else {
        alert("Ingresa un valor de zoom válido y selecciona una ubicación.");
    }
}