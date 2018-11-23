<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Search site</h1>

			<div class="govuk-form-group">
				<label class="govuk-label" for="name">
					Enter postcode
				</label>
				<input class="govuk-input" id="name" name="name" type="text" v-model="postcode">
			</div>
			<v-cta name="Find address" :onClick="navigate"></v-cta>
    </div>
  </div>
</template>

<script>
	import vCta from '../components/Cta.vue';
	import router from '../router';

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
		geojson: {"type":"FeatureCollection","totalFeatures":1,"features":[{"type":"Feature","id":"LAND_TERRIER_BLPU_MV.56403","geometry":{"type":"Polygon","coordinates":[[[-0.07554707523183894,51.55619772166164],[-0.07556365335444343,51.556197993584185],[-0.07562205614485953,51.55619850189066],[-0.07564151742043561,51.556198821091414],[-0.07570132386090031,51.55620025163303],[-0.07572892092336307,51.55602490042486],[-0.07573777833666329,51.555951756628815],[-0.07574263387486208,51.555922160936504],[-0.0757332826512895,51.55592155794116],[-0.07566131807712186,51.55591767987012],[-0.07558286646521187,51.55591369535268],[-0.07557947135786451,51.55594286536729],[-0.07556917212282145,51.5560159855037],[-0.07554707523183894,51.55619772166164]]]},"geometry_name":"GEOLOC","properties":{"UPRN":100023160623,"UNIQUE_POLY_KEY":"25650","FLAG":null,"CONFIDENCE_LEVEL":"2","PROVENANCE_CODE":"P","POLY_VERSION_NUMBER":"V1","BLPU_CLASS":"PP","BLPU_LOGICAL_STATUS":1,"LPI_LOGICAL_STATUS":1,"ID":"8 - 10 Walford Road, Hackney,","PK":"258189","PGP_PK":"430941","CODE":"100023160623","ADDRESS":"8 - 10","STREETNAME":"Walford Road","LOCALITY":"Hackney","TOWN":"London","ADMINAREA":null,"POSTCODE":"N16 8ED","EASTING":"533502","NORTHING":"185878","SE_COUNTER":"258189","MI_STYLE":null,"MI_PRINX":56403,"bbox":[-0.07574263387486208,51.55591369535268,-0.07554707523183894,51.55620025163303]}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"bbox":[-0.07574263387486208,51.55591369535268,-0.07554707523183894,51.55620025163303]},
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
		geojson: {"type":"FeatureCollection","totalFeatures":1,"features":[{"type":"Feature","id":"LAND_TERRIER_BLPU_MV.90505","geometry":{"type":"Polygon","coordinates":[[[-0.06771306599167362,51.54272043247306],[-0.06771151332278802,51.54294432142094],[-0.06771859398584049,51.54301547919975],[-0.06772412202826868,51.543072223322724],[-0.06783822066676556,51.54306825743709],[-0.06780338488534718,51.54271607494256],[-0.06771306599167362,51.54272043247306]]]},"geometry_name":"GEOLOC","properties":{"UPRN":10008300494,"UNIQUE_POLY_KEY":"29667","FLAG":null,"CONFIDENCE_LEVEL":"2","PROVENANCE_CODE":"P","POLY_VERSION_NUMBER":"V1","BLPU_CLASS":"PP","BLPU_LOGICAL_STATUS":1,"LPI_LOGICAL_STATUS":1,"ID":"128 Richmond Road, Hackney, E8","PK":"215629","PGP_PK":"281591","CODE":"10008300494","ADDRESS":"128","STREETNAME":"Richmond Road","LOCALITY":"Hackney","TOWN":"London","ADMINAREA":null,"POSTCODE":"E8 3HW","EASTING":"534091","NORTHING":"184445","SE_COUNTER":"215629","MI_STYLE":null,"MI_PRINX":90505,"bbox":[-0.06783822066676556,51.54271607494256,-0.06771151332278802,51.543072223322724]}}],"crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:EPSG::4326"}},"bbox":[-0.06783822066676556,51.54271607494256,-0.06771151332278802,51.543072223322724]},
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
		name: 'SiteSearch',
		components: {
			vCta
		},
		data () {
			return {
				postcode: ''
			}
		},
		methods: {
			navigate() {
        let transformedPostcode = this.postcode.replace(/\s/g, '').toLowerCase();
				if (transformedPostcode === 'n168ed' || transformedPostcode === 'e83hw') {

        let site = {};
        if (transformedPostcode === 'n168ed') {
          site = siteNoConservationArea;
        } else {
          site = siteConservationArea;
        }

        this.$store.commit('setSite', JSON.parse(JSON.stringify(site)));

        //todo check if site id is still necessary at this point. random number for mocking purposes
        const randomNumber = parseInt((Math.random() * 10000000) + 1);

        router.push({ name: 'SiteDetails', params: { siteId: randomNumber, postcode: this.postcode} });
				}
			}
		}
	}
</script>
