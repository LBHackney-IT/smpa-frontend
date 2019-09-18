<template>
  <div class="map govuk-!-margin-bottom-9" id="map"></div>
</template>

<script>
import L from 'leaflet';
export default {
  name: 'Map',
  props: {
    geoJson: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.renderMap();
  },
  methods: {
    renderMap() {
      const map = L.map('map', {
        zoomControl: true, 
        maxZoom:20, 
        minZoom:1
      });  

      var Mapbox_Basemap = L.tileLayer('https://api.mapbox.com/styles/v1/hackneygis/cjk8lmw5r9mlz2sohv2n6xnfq/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        opacity: 1.0,
        attribution: 'Contains OS data © Crown copyright and database right (2018) - Licensed under the Open Government Licence',
        accessToken: 'pk.eyJ1IjoiaGFja25leWdpcyIsImEiOiJjajh2ZGRiMDMxMzc5MndwbHBmaGtjYTAyIn0.G75YwN8Zgr8gqDJoV8XMFw'
      }).addTo(map);



      map.addLayer(Mapbox_Basemap);

      var overlay_OSMM_light_1 = L.tileLayer.wms("https://map.hackney.gov.uk/geoserver/wms", {
        layers: 'osmm:OSMM_outdoor',
        format: 'image/png',
        uppercase: true,
        transparent: true,
        continuousWorld : true,
        tiled: true,
        info_format: 'text/html',
        opacity: 1,
        identify: false,
        minZoom: 10,
        maxZoom: 20
      });

      map.addLayer(overlay_OSMM_light_1);

      function style_BLPU() {
        return {
          pane: 'pane_BLPU',
          opacity: 0.5,
          color: 'rgba(255,0,0,1.0)',
          dashArray: '',
          lineCap: 'butt',
          lineJoin: 'miter',
          weight: 4.0,
          fill: true,
          fillOpacity: 1,
          fillColor: 'rgba(222,80,58,0.0)',
        }
      }
      map.createPane('pane_BLPU');

      var layer_BLPU = L.geoJson(null, {
        attribution: '<a href=""></a>',
        style: style_BLPU,
        pane: 'pane_BLPU',
      });

      var geojson = this.geoJson;

      layer_BLPU.addData(geojson);

      if (layer_BLPU.getLayers().length>0){
        map.fitBounds(layer_BLPU.getBounds());
      }
      else {
        map.setView([51.545032, -0.056434], 15);
      }
    
      map.addLayer(layer_BLPU);
    }
  }
}
</script>