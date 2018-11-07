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
              <td class="govuk-table__cell">123 London Lane</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">UPRN</th>
              <td class="govuk-table__cell">123213213123</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Easting & Northing:</th>
              <td class="govuk-table__cell">12313123, 23232432432</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Ward:</th>
              <td class="govuk-table__cell">Hoxton East and Shoreditch</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Use:</th>
              <td class="govuk-table__cell">Residential</td>
            </tr>
            <tr class="govuk-table__row">
              <th class="govuk-table__header" scope="row">Property type:</th>
              <td class="govuk-table__cell">Semi-detached-house</td>
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

        <button type="submit" class="govuk-button">
          Continue
        </button>

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
      Steps
    },
    data() {
      return { steps };
    },
    mounted() {
      const map = L.map('map', {
        zoomControl:true, maxZoom:20, minZoom:13
      }).fitBounds([[51.5481204892,-0.101132443234],[51.5637904091,-0.0576258819491]]);
  

      var Mapbox_Basemap = L.tileLayer('https://api.mapbox.com/styles/v1/hackneygis/cjk8lmw5r9mlz2sohv2n6xnfq/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 17,
        opacity: 1.0,
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
        minZoom: 18,
        maxZoom: 20,
      });

      map.addLayer(overlay_OSMM_light_1);

      var $tab = document.querySelector('[data-module="tabs"]')
      if ($tab) {
        new Tabs($tab).init()
      }
    }
  }
</script>
