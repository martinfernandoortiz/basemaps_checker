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
let ign = L.tileLayer(urls.osm, {
    ext: "jpg",
    attribution: '<a>Esto es Boca</a>',
    minZoom: 2,
    maxZoom: 18,
}).addTo(map);

let arcgis = L.tileLayer(urls.goo).addTo(map);
let osc = L.tileLayer(urls.osc);

// Creamos un control que agrega una pantalla dividida
let sideBySideControl = L.control.sideBySide(ign, arcgis).addTo(map);

function increment() {
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
