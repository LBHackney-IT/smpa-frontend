<template>
  <div>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">Your site details</h1>

        <p v-if="loading">Loading...</p>

        <table class="govuk-table govuk-!-margin-bottom-9" v-if="!loading && selectedAddress">
          <caption class="govuk-table__caption govuk-!-margin-bottom-8">This is the information we currently hold about the selected address:</caption>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Address</th>
              <td class="govuk-table__cell">
                {{selectedAddress.buildingNumber}} {{selectedAddress.street}}<br> 
                {{selectedAddress.postcode}}<br> 
                {{selectedAddress.locality}}
              </td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Easting & Northing</th>
              <td class="govuk-table__cell">{{selectedAddress.easting}}, {{selectedAddress.northing}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Property type</th>
              <td class="govuk-table__cell">{{selectedAddress.usageClassDescription}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">BLPU classification</th>
              <td class="govuk-table__cell">{{selectedAddress.usageClassCode}}</td>
            </tr>
          </tbody>
        </table>


        <div class="map govuk-!-margin-bottom-9" id="map"></div>

        <table class="govuk-table govuk-!-margin-bottom-9" v-if="!loading && site">
          <caption class="govuk-table__caption govuk-!-font-weight-regular govuk-!-margin-bottom-8">The following are particular planning considerations that you might want to know to carry on with your proposal</caption>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Conservation area</th>
              <td class="govuk-table__cell">
                <span v-if="site.properties.nb_conarea > 0">{{site.properties.conarea_name }}</span>
                <span v-if="site.properties.nb_conarea === 0">No</span>
              </td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Listed building</th>
              <td class="govuk-table__cell">
                <span v-if="parseInt(site.properties.is_listed_building) > 0">Yes</span>
                <span v-if="parseInt(site.properties.is_listed_building) === 0">No</span>
              </td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Article 4 Directions</th>
              <td class="govuk-table__cell">
                <span v-if="site.properties.nb_a4d > 0">{{site.properties.a4d_name }}</span>
              </td>
            </tr>
            <tr class="govuk-table__row" v-if="parseInt(site.properties.is_floodzone_2) > 0 || parseInt(site.properties.is_floodzone_3a) > 0 || parseInt(site.properties.is_floodzone_3b) > 0 ">
              <th class="govuk-table__header" scope="row">Climate change and environmental sustainability</th>
              <td class="govuk-table__cell">
                <span v-if="parseInt(site.properties.is_floodzone_2) > 0">Flood Zone 2</span>
                <span v-if="parseInt(site.properties.is_floodzone_3a) > 0">Flood Zone 3a</span>
                <span v-if="parseInt(site.properties.is_floodzone_3b) > 0">Flood Zone 3b</span>
              </td>
            </tr>
          </tbody>
        </table>

        <v-cta name="Continue" :onClick="navigate" v-if="!loading"></v-cta>
      </div>

      <div class="govuk-grid-column-one-third">
      </div>
    </div>
  </div>
</template>

<script>
  import L from 'leaflet';
  import { Tabs } from 'govuk-frontend';
  import HelpLink from '../components/HelpLink.vue';
  import Steps from '../components/Steps.vue';
  import vCta from '../components/Cta.vue';
  import router from '../router';
  import axios from 'axios';

  export default {
    name: 'SiteDetails',
    components: {
      HelpLink,
      Steps,
      vCta
    },
    data() {
      return { 
        loading: false,
        loadingMap: false,
        geoJson: {}
      };
    },
    props: {
			selectedAddress: {
				type: Object,
				required: true
			}
    },
    mounted() {
        this.loading = true;

        const api = "https://map.hackney.gov.uk/geoserver/wfs?REQUEST=GetFeature&TYPENAME=llpg:lu_blpu_planning_constraint&SRSNAME=EPSG:4326&outputFormat=json&cql_filter=uprn=" + this.selectedAddress.uprn;
        axios.get(api , {})
        .then(response => {
          this.loading = false;

          var responseData = response.data;

          this.geoJson = response.data;
        })
        .catch(error => {
          this.error = true;
          console.log('error', error);
        })
        .finally(() => { 
          this.loading = false;
          this.renderMap();
        })
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

        // var hackneyBoundary = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
        //     layers: 'BDY_HACKNEY',
        //     transparent: true,
        //     format: 'image/png'
        // }).addTo(map);

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

        var treesOrdersPointsLayers = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
            layers: 'lbhdesign:Tree Preservation Orders Points',
            transparent: true,
            format: 'image/png',
            maxZoom: 20
        });

        map.addLayer(treesOrdersPointsLayers);

        var treesOrdersPointsAreas = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
            layers: 'lbhdesign:Tree Preservation Orders Areas',
            transparent: true,
            format: 'image/png',
            maxZoom: 20
        });

        map.addLayer(treesOrdersPointsAreas);

        var conservationAreas = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
            layers: 'lbhdesign:PLA Conservation Area',
            transparent: true,
            format: 'image/png',
            maxZoom: 20
        });

        map.addLayer(conservationAreas);

        var locallyListedBuildings = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
            layers: 'lbhdesign:Locally Listed Building',
            transparent: true,
            format: 'image/png',
            maxZoom: 20
        });

        map.addLayer(locallyListedBuildings);

        var statuaryListedBuildings = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
            layers: 'lbhdesign:Statutory Listed Buildings',
            transparent: true,
            format: 'image/png',
            maxZoom: 20
        });

        map.addLayer(statuaryListedBuildings);

        // var currentApplications = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
        //     layers: 'lbhplanning:PLA_APPS_CURRENT_VW',
        //     transparent: true,
        //     format: 'image/png',
        //     maxZoom: 20
        // });

        // map.addLayer(currentApplications);
      },
      
      navigate() {
        router.push({ name: 'WorkStart' });
      }
    },
    computed: {
      site () {
        if (this.geoJson && this.geoJson.features) {
          return this.geoJson.features[0];
        } else {
          return undefined;
        }
      }
    },
  }
</script>
