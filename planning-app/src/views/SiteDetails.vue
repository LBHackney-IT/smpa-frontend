<template>
  <div>
    <div class="govuk-grid-row">
      <div class="govuk-grid-column-two-thirds">
        <h1 class="govuk-heading-xl">Site details</h1>
        <table class="govuk-table">
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

        <div class="map" id="map"></div>
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

        <HelpLink />
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

  const siteNoConservationArea = {
    address: {
      result: {
        line1: "10D", 
        line2: "Walford Rd", 
        line3: "Stoke Newington", 
        line4: null, 
        city: "LONDON", 
        postcode: "N16 8ED", 
        uprn: 100023160623, 
        addressID: "5360L000016232" 
      }
    },
    siteInfo: {
      eastingAndNorthing: '533502, 185878',
      use: 'Residential',
      propertyType: 'detached house'
    },
    siteConstraints: {
      conservationArea: false,
      listedBuilding: {
        statuary: false,
        listed: false,
      },
      trees: {
        preservationOrderPoints: false,
        preservationOrderArea: false
      },
      article4Directions: ['A4D Light Industrial to Res. Use', 'A4D Storage and Distribution to Res. Use'],
      floodRiskZone: false
    },
    sitePlanningHistory: []
  };

  const siteConservationArea = {
    address: {
      result: {
        line1: "128", 
        line2: "Richmond Rd", 
        line3: "London", 
        line4: null, 
        city: "LONDON", 
        postcode: "E8 3HW", 
        uprn: 10008300494, 
        addressID: "32433435435353" 
      }
    },
    siteInfo: {
      eastingAndNorthing: '534091, 184445',
      use: 'Residential',
      propertyType: 'Semi-detached house'
    },
    siteConstraints: {
      conservationArea: true,
      conservationAreaName: 'Graham Road and Mapledene',
      listedBuilding: {
        statuary: false,
        listed: false,
      },
      trees: {
        preservationOrderPoints: false,
        preservationOrderArea: false
      },
      article4Directions: ['A4D Light Industrial to Res. Use', 'A4D Storage and Distribution to Res. Use'],
      floodRiskZone: false
    },
    sitePlanningHistory: [
      {
        id: '2013/4179',
        status: 'FINAL DECISION',
        title: 'Side and rear extension',
        description: 'Demolition of part of existing boundary wall with no.126 and erection of a single storey side extension at lower ground floor level, a single storey rear extension at lower ground floor level with terrace at upper ground floor level and associated excavation of lightwell at lower ground floor level at the rear of the building.'
      },
      {
        id: '2013/1651',
        status: 'FINAL DECISION',
        title: 'Side and rear extension',
        description: 'Erection of a single storey ground floor side and rear extension.'
      },
      {
        id: '2017/2745',
        status: 'FINAL DECISION',
        title: 'Trees work',
        description: 'T1, Acer pseudoplatanus - Reduce crown back to previous points of reduction, leaving suitable furnishing growth (branch lengths of up to approximately 2m).'
      }
    ]
  };

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
        maxZoom: 20,
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

      var geojson = {"type":"FeatureCollection","totalFeatures":1,"features":[{"type":"Feature","id":"LAND_TERRIER_BLPU_MV.56403","geometry":{"type":"Polygon","coordinates":[[[-0.07554707523183894,51.55619772166164],[-0.07556365335444343,51.556197993584185],[-0.07562205614485953,51.55619850189066],[-0.07564151742043561,51.556198821091414],[-0.07570132386090031,51.55620025163303],[-0.07572892092336307,51.55602490042486],[-0.07573777833666329,51.555951756628815],[-0.07574263387486208,51.555922160936504],[-0.0757332826512895,51.55592155794116],[-0.07566131807712186,51.55591767987012],[-0.07558286646521187,51.55591369535268],[-0.07557947135786451,51.55594286536729],[-0.07556917212282145,51.5560159855037],[-0.07554707523183894,51.55619772166164]]]},"geometry_name":"GEOLOC","properties":{"UPRN":100023160623,"UNIQUE_POLY_KEY":"25650","FLAG":null,"CONFIDENCE_LEVEL":"2","PROVENANCE_CODE":"P","POLY_VERSION_NUMBER":"V1","BLPU_CLASS":"PP","BLPU_LOGICAL_STATUS":1,"LPI_LOGICAL_STATUS":1,"ID":"8 - 10 Walford Road, Hackney,","PK":"258189","PGP_PK":"430941","CODE":"100023160623","ADDRESS":"8 - 10","STREETNAME":"Walford Road","LOCALITY":"Hackney","TOWN":"London","ADMINAREA":null,"POSTCODE":"N16 8ED","EASTING":"533502","NORTHING":"185878","SE_COUNTER":"258189","MI_STYLE":null,"MI_PRINX":56403,"bbox":[-0.07574263387486208,51.55591369535268,-0.07554707523183894,51.55620025163303]}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"bbox":[-0.07574263387486208,51.55591369535268,-0.07554707523183894,51.55620025163303]};
      layer_BLPU.addData(geojson);

      if (layer_BLPU.getLayers().length>0){
        map.fitBounds(layer_BLPU.getBounds());
        map.setZoom(19);
      }
      else{
        map.setView([51.545032, -0.056434], 15);
      }
    
      map.addLayer(layer_BLPU);


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
        let site = {};
        if (this.postcode === 'N16 8ED') {
          site = siteNoConservationArea;
        } else {
          site = siteConservationArea;
        }
        return site;
      }
    },
  }
</script>
