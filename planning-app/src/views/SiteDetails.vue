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
              <td class="govuk-table__cell">{{selectedAddress.usageDescription}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">BLPU classification</th>
              <td class="govuk-table__cell">{{selectedAddress.usageCode}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Use class</th>
              <td class="govuk-table__cell">{{selectedAddress.planningUseClass}}</td>
            </tr>
          </tbody>
        </table>


        <div class="map govuk-!-margin-bottom-9" id="map"></div>

        <table class="govuk-table govuk-!-margin-bottom-9" v-if="!loading && site">
          <caption class="govuk-table__caption govuk-!-font-weight-regular govuk-!-margin-bottom-8">The following planning considerations are relevant to your planning application.</caption>
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
  import HelpLink from '../components/HelpLink.vue';
  import vCta from '../components/Cta.vue';
  import router from '../router';
  import axios from 'axios';
  import JwtService from '@/common/jwt.service';

  export default {
    name: 'SiteDetails',
    components: {
      HelpLink,
      vCta
    },
    data() {
      return { 
        loading: false,
        loadingMap: false,
        geoJson: {},
        application: {
          address: {},
          constraints: {}
        }
      };
    },
    props: {
			selectedAddress: {
				type: Object,
				required: true
      },
      postcode: {
				type: String,
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
      },
      
      navigate() {

        this.application.address.siteGeoJson = this.geoJson;
        this.application.address.number = this.selectedAddress.buildingNumber;
        this.application.address.property_name = this.selectedAddress.buildingName;
        this.application.address.address_line_1 = this.selectedAddress.line1;
        this.application.address.address_line_2 = this.selectedAddress.line2;
        this.application.address.address_line_3 = this.selectedAddress.line3;
        this.application.address.town_city = this.selectedAddress.town;
        this.application.address.postcode = this.selectedAddress.postcode;
        this.application.address.easting = this.selectedAddress.easting.toString();
        this.application.address.northing = this.selectedAddress.northing.toString();
        this.application.address.ward = this.selectedAddress.ward;
        this.application.address.uprn = this.selectedAddress.uprn;
        this.application.address.property_type = this.selectedAddress.usageDescription;
        this.application.address.description = this.selectedAddress.usageCode;

        this.application.constraints = this.site.properties;

        if (!!JwtService.getToken()) {
          this.$store.dispatch('generateApplication', this.application).then((response) => {
            router.push({ name: 'ApplicationTaskOverview', params: { 'applicationId': response.data.application_id } });
          })
        } else {
          router.push({ name: 'SignIn', params: { 'origin': 'constraints-finder', 'application': this.application} });
        }
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
