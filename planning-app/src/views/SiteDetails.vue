<template>
  <div>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">Site details</h1>
        <table class="govuk-table govuk-!-margin-bottom-9">
          <caption class="govuk-table__caption">This is the information we currently hold about the selected address:</caption>
          <tbody class="govuk-table__body">
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Address</th>
              <td class="govuk-table__cell">{{site.address.result.line1}} {{site.address.result.line2}} {{site.address.result.line3}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">UPRN</th>
              <td class="govuk-table__cell">{{site.address.result.uprn}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Easting & Northing:</th>
              <td class="govuk-table__cell">{{site.siteInfo.eastingAndNorthing}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Ward:</th>
              <td class="govuk-table__cell">Hoxton East and Shoreditch</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Use:</th>
              <td class="govuk-table__cell">{{site.siteInfo.use}}</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Property type:</th>
              <td class="govuk-table__cell">{{site.siteInfo.propertyType}}</td>
            </tr>
          </tbody>
        </table>

        <div class="map govuk-!-margin-bottom-9" id="map"></div>
        </div>

        <div class="govuk-grid-column-one-third">
          <Steps v-bind:steps="steps" />
        </div>
    </div>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-full">
        <div class="govuk-tabs" data-module="tabs">
          <h2 class="govuk-tabs__title">
            Contents
          </h2>

          <ul class="govuk-tabs__list">
            <li class="govuk-tabs__list-item">
              <a class="govuk-tabs__tab govuk-tabs__tab--selected" href="#constraints">
                Constraints
              </a>
            </li>
            <li class="govuk-tabs__list-item">
              <a class="govuk-tabs__tab" href="#site-planning-history">
                Site Planning History <strong>2</strong>
              </a>
            </li>
          </ul>

          <section class="govuk-tabs__panel" id="constraints">
            <h2 class="govuk-heading-l">This property</h2>
            <table class="govuk-table">
              <tbody class="govuk-table__body">
                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">Conservation area</td>
                  <td class="govuk-table__cell">Road name and Name of conservation area</td>
                  <td class="govuk-table__cell">View on map</td>
                </tr>
              </tbody>
            </table>

            <table class="govuk-table">
              <thead class="govuk-table__head">
                <tr class="govuk-table__row">
                  <th class="govuk-table__header" scope="col">Listed building</th>
                </tr>
              </thead>
              <tbody class="govuk-table__body">
                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">Statuary</td>
                  <td class="govuk-table__cell">No</td>
                </tr>
                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">Local</td>
                  <td class="govuk-table__cell">No</td>
                </tr>
              </tbody>
            </table>

            <table class="govuk-table">
              <tbody class="govuk-table__body">
                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">Flood zone</td>
                  <td class="govuk-table__cell">2B</td>
                  <td class="govuk-table__cell">Find out more</td>
                </tr>
                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">Trees Preservation Orders</td>
                  <td class="govuk-table__cell">Yes</td>
                  <td class="govuk-table__cell">Find out more</td>
                </tr>

                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">Article 4 directions</td>
                  <td class="govuk-table__cell">
                    <ul>
                      <li>
                        A4D Light Industrial to Residential Use
                      </li>
                      <li>
                        A4D Storage and Distribution to Residential Use
                      </li>
                    </ul>

                  </td>
                </tr>
              </tbody>
            </table>

            <p>These are all the constraints for this site and property</p>
          </section>

          <section class="govuk-tabs__panel govuk-tabs__panel--hidden" id="site-planning-history">
            <h2 class="govuk-heading-l">Site Planning History</h2>
            <table class="govuk-table">
              <thead class="govuk-table__head">
                <tr class="govuk-table__row">
                  <th class="govuk-table__header" scope="col">Application</th>
                  <th class="govuk-table__header" scope="col">Details</th>
                </tr>
              </thead>
              <tbody class="govuk-table__body">
                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">
                    <p>31st July</p>
                    <p>2015</p>
                    <strong>Rejected</strong>
                  </td>
                  <td class="govuk-table__cell">
                    <p>Roof Extension</p>
                    <p>WR - 21432434</p>
                    <p>Proposed a roof extension in the rear of an existing property</p>
                    <p>View documents attached</p>
                  </td>
                </tr>
                <tr class="govuk-table__row">
                  <td class="govuk-table__cell">
                    <p>31st July</p>
                    <p>2015</p>
                    <strong>Rejected</strong>
                  </td>
                  <td class="govuk-table__cell">
                    <p>Roof Extension</p>
                    <p>WR - 21432434</p>
                    <p>Proposed a roof extension in the rear of an existing property</p>
                    <p>View documents attached</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>These are all the planning applications for this site.</p>
          </section>
        </div>

        <v-cta name="Continue" :onClick="navigate"></v-cta>
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

  const steps = [{
    title: "Site details",
    name: "SiteDetails",
    content: '<p>Enter your site address</p>',
    isActive: false
  },
  {
    title: "Description of the works",
    name: "FormWorkDescription",
    content: '<p>Describe your proposal.</p><ul><li>Development</li><li>Materials</li><li>Surroundings</li></ul>',
    isActive: false
  },
  {
    title: "Supporting documentation",
    name: "FormDocumentation",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  },
  {
    title: "Declarations", 
    name: "FormDeclarations",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  },
  {
    title: "Contact details",
    name: "FormContact",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  },
  {
    title: "Pay and submit",
    name: "FormPaySubmit",
    content: '<p>Hello Step 2!!</p>',
    isActive: false
  }];

  export default {
    name: 'SiteDetails',
    components: {
      HelpLink,
      Steps,
      vCta
    },
    data() {
      return { 
        steps
      };
    },
    props: {
			postcode: {
				type: String,
				required: true
			}
    },
    mounted() {
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

      
      var geojson = this.$store.state.site.geojson;

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

      var currentApplications = L.tileLayer.wms('https://map.hackney.gov.uk/geoserver/wms/', {
          layers: 'lbhplanning:PLA_APPS_CURRENT_VW',
          transparent: true,
          format: 'image/png',
          maxZoom: 20
      });

      map.addLayer(currentApplications);

      var $tab = document.querySelector('[data-module="tabs"]')
      if ($tab) {
        new Tabs($tab).init()
      }
    },
    methods: {
      navigate() {
        router.push({ name: 'WorkStart' });
      }
    },
    computed: {
      site () {
        return this.$store.state.site;
      }
    },
  }
</script>
