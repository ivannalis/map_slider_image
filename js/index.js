const IMG_FOLDER = "assets/images/"
const GEOJSON_FOLDER = "assets/geojson/location3.geojson"
const IMG_FORMAT = '.jpg'

mapboxgl.accessToken =
    'pk.eyJ1IjoiaXZhbm5hbGlzIiwiYSI6ImNrbzM0Y2c5ZjBzOTAydmpudXdtcnBuZTYifQ.BRwjq1JbwZfZOty3CnXTXA';

const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-3.931,50.3465], // starting position [lng, lat]
    zoom: 18 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', function () {
    map.addSource("location", {
        "type": "geojson",
        "data": GEOJSON_FOLDER
    });

    map.addLayer({
        "id": "location",
        "type": "circle",
        "source": "location",
        "paint": {
            "circle-radius": 5,
            "circle-color": "#ff0000"
        }
    });
});

var p = 'assets/images/location_1.png'
map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['location'] // replace this with the name of the layer
    });

    if (!features.length) {
        return;
    }
    let feature = features[0];
    let popup = new mapboxgl.Popup({
            offset: [0, 0]
        })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(`<p>Location </p><h3 style="font-size:18px; font-weight:bold;">Test Location</h3><iframe width="350" height="270px" allowfullscreen style="border-style:none;" src="http://127.0.0.1:5500/p360image.html?image_id=${feature.properties.id}"></iframe> `) // CHANGE THIS TO REFLECT THE PROPERTIES YOU WANT TO SHOW
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);

});
