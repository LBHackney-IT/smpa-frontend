<template>
  <div>
    <h1 class="govuk-heading-xl">Check your answers before sending the application</h1>

    <h2 class="govuk-heading-l">Personal details</h2>

    <div v-if="this.application">

      <dl class="govuk-summary-list" >
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Applicant name
          </dt>
          <dd class="govuk-summary-list__value">
            <p>{{this.applicantFullName}}</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'ApplicationContactApplicant'}"> 
              Change<span class="govuk-visually-hidden"> applicant name</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Agent name
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="this.hasAgentFullName">{{this.agentFullName}}</p>
            <p v-if="!this.hasAgentFullName">You did not provide this information.</p>
          </dd>
          <dd class="govuk-summary-list__actions">

              <router-link :to="{ name: 'ApplicationContact'}"> 
              Change<span class="govuk-visually-hidden"> name of agent</span>
              </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Contact information (agent)
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="this.hasContactInformationAgent.hasAgent">{{this.hasContactInformationAgent.address_line_1}} </p>
            <p v-if="this.hasContactInformationAgent.hasAgent">{{this.hasContactInformationAgent.address_line_2}}</p>
            <p v-if="this.hasContactInformationAgent.hasAgent">{{this.hasContactInformationAgent.town_city}}</p>
            <p v-if="this.hasContactInformationAgent.hasAgent">{{this.hasContactInformationAgent.postcode}}</p>
            <p v-if="this.hasContactInformationAgent.hasAgent">{{this.hasContactInformationAgent.email}}</p>
            <p v-if="this.hasContactInformationAgent.hasAgent">{{this.hasContactInformationAgent.phone}}</p>
            <p v-if="!this.hasContactInformationAgent.hasAgent">{{this.hasContactInformationAgent.answer}}</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'ApplicationContactAgent'}"> 
              Change<span class="govuk-visually-hidden"> contact information</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Contact information (applicant)
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="this.hasContactInformationApplicant.hasApplicant">{{this.hasContactInformationApplicant.address_line_1}} </p>
            <p v-if="this.hasContactInformationApplicant.hasApplicant">{{this.hasContactInformationApplicant.address_line_2}}</p>
            <p v-if="this.hasContactInformationApplicant.hasApplicant">{{this.hasContactInformationApplicant.town_city}}</p>
            <p v-if="this.hasContactInformationApplicant.hasApplicant">{{this.hasContactInformationApplicant.postcode}}</p>
            <p v-if="this.hasContactInformationApplicant.hasApplicant">{{this.hasContactInformationApplicant.email}}</p>
            <p v-if="this.hasContactInformationApplicant.hasApplicant">{{this.hasContactInformationApplicant.phone}}</p>
            <p v-if="!this.hasContactInformationApplicant.hasApplicant">{{this.hasContactInformationApplicant.answer}} here</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'ApplicationContactApplicant'}"> 
              Change<span class="govuk-visually-hidden"> contact details</span>
            </router-link>
          </dd>
        </div>
      </dl>

      <h2 class="govuk-heading-l">Application details</h2>

      <dl class="govuk-summary-list">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Address
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="this.application.data.site_address && this.application.data.site_address.address_line_1">{{this.application.data.site_address.address_line_1}} </p>
            <p v-if="this.application.data.site_address && this.application.data.site_address.address_line_2">{{this.application.data.site_address.address_line_2}}</p>
            <p v-if="this.application.data.site_address && this.application.data.site_address.town_city">{{this.application.data.site_address.town_city}}</p>
            <p v-if="this.application.data.site_address && this.application.data.site_address.postcode">{{this.application.data.site_address.postcode}}</p>
            <p v-if="!this.application.data.site_address">There isn't an address associated with this application.</p>
          </dd>

          <dd class="govuk-summary-list__actions">
            
          </dd>
        </div>
        <div class="govuk-summary-list__row" v-if="this.application.data.free_text_description">
          <dt class="govuk-summary-list__key">
            Free text form description
          </dt>
          <dd class="govuk-summary-list__value">
            {{this.application.data.free_text_description}}
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'FreeTextForm'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> free text form description</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Description
          </dt>
          <dd class="govuk-summary-list__value">
            <ul>
              <li v-bind:key="work" v-for="work in this.worksDescription">
                {{ work }}
              </li>
            </ul>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'Proposal'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> works</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Have the works already started?
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="this.application.data.works_started">
              {{this.hasWorksStarted}} <br>
            </p>
            <p v-if="!this.application.data.works_started">No</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'WorkStart'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> works started information</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Floor area added (GIA)
          </dt>
          <dd class="govuk-summary-list__value">
            <p class="govuk-body">{{this.hasFloorAreaAdded}}</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'WorksFloorArea'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> floor area added</span>
            </router-link>
          </dd>
        </div>
      </dl>

      <h2 class="govuk-heading-l">Surroundings</h2>

      <dl class="govuk-summary-list">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Trees inside the boundary
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="!this.hasProposalExtension">You didn't provide this information.</p>
            <p v-if="this.hasTreesInformation && this.hasTreesInsideBoundary">{{this.hasTreesInsideBoundary}}</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'Trees'}" class="govuk-link" v-if="this.hasProposalExtension">
              Change<span class="govuk-visually-hidden"> trees inside boundary</span>
            </router-link>

            <router-link :to="{ name: 'Proposal'}" class="govuk-link" v-if="!this.hasProposalExtension">
              Change<span class="govuk-visually-hidden"> trees inside boundary</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Trees outside the boundary
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="!this.hasProposalExtension">You didn't provide this information.</p>
            <p v-if="this.hasTreesInformation && this.hasTreesOutsideBoundary">{{this.hasTreesOutsideBoundary}}</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'Trees'}" class="govuk-link" v-if="this.hasProposalExtension">
              Change<span class="govuk-visually-hidden"> trees outside boundary</span>
            </router-link>

            <router-link :to="{ name: 'Proposal'}" class="govuk-link" v-if="!this.hasProposalExtension">
              Change<span class="govuk-visually-hidden"> trees outside boundary</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Trees pruned or removed
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="!this.hasProposalExtension">You didn't provide this information.</p>
            <p v-if="this.hasTreesInformation && this.hasTreesPrunedOrRemoved">{{this.hasTreesPrunedOrRemoved}}</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'Trees'}" class="govuk-link" v-if="this.hasProposalExtension">
              Change<span class="govuk-visually-hidden"> trees outside boundary</span>
            </router-link>

            <router-link :to="{ name: 'Proposal'}" class="govuk-link" v-if="!this.hasProposalExtension">
              Change<span class="govuk-visually-hidden"> trees outside boundary</span>
            </router-link>
          </dd>
        </div>
      </dl>

      <h2 class="govuk-heading-l">Materials</h2>

      <p>{{this.hasMaterials}}</p>

      <dl class="govuk-summary-list" v-if="hasMaterials">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Walls cladding
          </dt>
          <dd class="govuk-summary-list__value">
            {{this.wallsMaterials}}
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'WhatMaterials'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> walls cladding materials</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Roof covering
          </dt>
          <dd class="govuk-summary-list__value">
            {{this.roofMaterials}}
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'WhatMaterials'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> roof covering materials</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Windows
          </dt>
          <dd class="govuk-summary-list__value">
            {{this.windowsMaterials}}
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'WhatMaterials'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> windows materials</span>
            </router-link>
          </dd>
        </div>
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Doors
          </dt>
          <dd class="govuk-summary-list__value">
            {{this.doorsMaterials}}
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'WhatMaterials'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> change doors materials</span>
            </router-link>
          </dd>
        </div>

        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Other materials
          </dt>
          <dd class="govuk-summary-list__value">
            <ul v-if="this.hasOtherMaterials">
              <li v-bind:key="other" v-for="other in this.application.data.proposal_extension.materials.other">
                {{ other }}
              </li>
            </ul>

            <p v-if="!this.hasOtherMaterials">You did not provide any other materials.</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'WhatMaterials'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> other materials</span>
            </router-link>
          </dd>
        </div>
      </dl>

      <h2 class="govuk-heading-l">Supporting documentation</h2>

      <dl class="govuk-summary-list" v-if="this.application.data.document_files.length > 0">
        <div class="govuk-summary-list__row" v-bind:key="file.id" v-for="file in this.application.data.document_files">
          <dd class="govuk-summary-list__value">
            {{ file.original_name }}
          </dd>
    
          <dd class="govuk-summary-list__actions">
            <button class="govuk-link" @click="downloadFile(file.id)">
              Download<span class="govuk-visually-hidden"> file</span>
            </button>

            <router-link :to="{ name: 'SupportingDocumentation'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> files</span>
            </router-link>
          </dd>
        </div>
      </dl>

      <dl class="govuk-summary-list" v-if="this.application.data.document_files.length === 0">
        <div class="govuk-summary-list__row">
          <dd class="govuk-summary-list__value">
            No documentation uploaded.
          </dd>
    
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'SupportingDocumentation'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> files</span>
            </router-link>
          </dd>
        </div>
      </dl>

      <h2 class="govuk-heading-l">Declaration of interest</h2>

      <dl class="govuk-summary-list">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Your answer
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="this.hasDeclaration">{{this.application.data.declaration.name}}</p>
            <p v-if="!this.hasDeclaration">You did not provide this information.</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'DeclarationOfInterest'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> declaration of interest.</span>
            </router-link>
          </dd>
        </div>
      </dl>

      <h2 class="govuk-heading-l">Ownership Certificates and Agricultural Land Declaration</h2>
      <dl class="govuk-summary-list">
        <div class="govuk-summary-list__row">
          <dt class="govuk-summary-list__key">
            Your answer
          </dt>
          <dd class="govuk-summary-list__value">
            <p v-if="this.hasOwnershipDeclaration">{{ this.application.data.ownership_type.name }}</p>
            <p v-if="!this.hasOwnershipDeclaration">You did not provide this information.</p>
          </dd>
          <dd class="govuk-summary-list__actions">
            <router-link :to="{ name: 'DeclarationsOwnership'}" class="govuk-link">
              Change<span class="govuk-visually-hidden"> declaration of ownership.</span>
            </router-link>
          </dd>
        </div>
      </dl>

    </div>

    <div v-if="!applicationSubmitted">
      
      <h3 class="govuk-heading-m">Now submit your application</h3>

      <p>By submitting this application you are confirming that, to the best of your knowledge, the details you are providing are correct.</p>

      <v-cta name="Confirm" :onClick="navigate"></v-cta>

    </div>

    <div v-if="applicationSubmitted">
      
      <h3 class="govuk-heading-m">This application has already been submitted.</h3>

    </div>



  </div>
</template>

<script>
import vCta from '../../components/Cta.vue';
import router from '../../router';
import { getRouteAppId } from '../../mixins/getRouteAppId';
import GenerateWorks from '../../common/worksDescription';

export default {
  name: 'AnswersOverview',
  mixins: [ getRouteAppId ],
  components: {
    vCta
  },
  methods: {
    navigate() {  
      router.push({ name: 'Payment' });
    },
    containsKey(obj, key ) {
      if (obj === null || obj === undefined) {
        return false;
      }
      var containsKey = Object.keys(obj).includes(key) ? true : false;
      return containsKey; 
    },
    downloadFile(id) {
      this.$store.dispatch('downloadDocument', id).then((response) => {
        if (response.error) {
          this.showErrorMessage = true;
        } else {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;

          let fileName;

          if (response.headers["content-type"] === 'application/pdf') {
            fileName = id + '.pdf';
          } else if (response.headers["content-type"] === 'application/msword') {
            fileName = id + '.doc';
          } else if (response.headers["content-type"] === 'image/jpeg') {
            fileName = id + '.jpg';
          } else if (response.headers["content-type"] === 'application/vnd.ms-excel') {
            fileName = id + '.xls';
          }

          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        }
      })
    }
  },
  computed: {
    application () {
      let index = this.$store.state.state.applications.findIndex( application => application.data.id === this.applicationId );
      return this.$store.state.state.applications[index];
    },
    applicantFullName () {
      if (this.application.data.applicant) {
        return this.application.data.applicant.full_name.length > 0 ? this.application.data.applicant.full_name : 'You did not provide full name.'
      } else {
        return 'You did not provide applicant details.'
      }
    },
    hasAgentFullName () {
      return this.containsKey(this.application.data.agent, 'full_name');
    },
    agentFullName () {
      if (this.hasAgentFullName) {
        return this.application.data.agent.full_name;
      }
    },
    hasContactInformationAgent () {
      let contact = {};
      if (this.application.data.agent) {
        contact.hasAgent = true;
        contact.address_line_1 = this.application.data.agent.address_line_1.length > 0 ? this.application.data.agent.address_line_1 : 'You did not provide address line 1';
        contact.address_line_2 = this.application.data.agent.address_line_2.length > 0 ? this.application.data.agent.address_line_2 : 'You did not provide address line 2';
        contact.town_city = this.application.data.agent.town_city.length > 0 ? this.application.data.agent.town_city : 'You did not provide town and/or city';
        contact.postcode = this.application.data.agent.postcode.length > 0 ? this.application.data.agent.postcode : 'You did not provide postcode';
        contact.email = this.application.data.agent.email.length > 0 ? this.application.data.agent.email : 'You did not provide an email address';
        contact.phone = this.application.data.agent.phone.length > 0 ? this.application.data.agent.phone : 'You did not provide a phone number';
        return contact;
      } else {
        contact.hasAgent = false;
        contact.answer = 'You did not provide any contact details for an agent.';
        return contact;
      }
    },
    hasContactInformationApplicant () {
      let contact = {};
      if (this.application.data.applicant) {
        contact.hasApplicant = true;
        contact.address_line_1 = this.application.data.applicant.address_line_1.length > 0 ? this.application.data.applicant.address_line_1 : 'You did not provide address line 1';
        contact.address_line_2 = this.application.data.applicant.address_line_2.length > 0 ? this.application.data.applicant.address_line_2 : 'You did not provide address line 2';
        contact.town_city = this.application.data.applicant.town_city.length > 0 ? this.application.data.applicant.town_city : 'You did not provide town and/or city';
        contact.postcode = this.application.data.applicant.postcode.length > 0 ? this.application.data.applicant.postcode : 'You did not provide postcode';
        contact.email = this.application.data.applicant.email.length > 0 ? this.application.data.applicant.email : 'You did not provide an email address';
        contact.phone = this.application.data.applicant.phone.length > 0 ? this.application.data.applicant.phone : 'You did not provide a phone number';
        return contact;
      } else {
        contact.hasApplicant = false;
        contact.answer = 'You did not provide any contact details for an applicant.';
        return contact;
      }
    },
    hasProposalExtension () {
      return this.application.data.proposal_extension !== null;
    },
    hasWorksStarted () {
      let answer;
      if (this.containsKey(this.application.data, 'works_started')) {
        answer = 'Yes. ';

        if (this.application.data.date_works_started) {
          answer += 'Works started in ' + this.application.data.date_works_started + '. ';
        }

        if (this.application.data.works_completed) {
          answer += 'Works were completed. ';
        }

        if (this.application.data.date_works_completed) {
          answer += 'Works were completed in ' + this.application.data.date_works_completed + '. ';
        }

        if (this.application.data.works_description) {
          answer += 'Description of works: ' + this.application.data.works_description;
        }

        return answer;

      } else {
        return answer = 'You did not provide this information';
      }

    },
    hasFloorAreaAdded () {
      let answer;
      if (this.hasProposalExtension) {
        if (this.application.data.proposal_extension.additional_floor_area 
        && this.application.data.proposal_extension.additional_floor_area_units 
        && this.application.data.proposal_extension.additional_floor_area_units.name) {
          answer = this.application.data.proposal_extension.additional_floor_area + ' ' + this.application.data.proposal_extension.additional_floor_area_units.name;
          return answer;
        } else {
          return answer = 'You did not provide this information.'
        }
      } else {
        return 'You did not provide this information.';
      }
    },
    hasTreesInformation () {
      return this.containsKey(this.application.data.proposal_extension, 'trees');
    },
    hasTreesInsideBoundary () {
      if (this.hasProposalExtension && this.hasTreesInformation) {
        let answer = this.application.data.proposal_extension.trees && this.application.data.proposal_extension.trees.inside_boundary ? "Yes" : "No";
        return answer;
      } else {
        return false;
      }
    },
    hasTreesOutsideBoundary () {
      if (this.hasProposalExtension && this.hasTreesInformation) {
        let answer = this.application.data.proposal_extension.trees && this.application.data.proposal_extension.trees.outside_boundary ? "Yes" : "No";
        return answer;
      } else {
        return false;
      }
    },
    hasTreesPrunedOrRemoved () {
      if (this.hasProposalExtension && this.hasTreesInformation) {
        let answer = this.application.data.proposal_extension.trees && this.application.data.proposal_extension.trees.removed_or_pruned ? "Yes" : "No";
        return answer;
      } else {
        return false;
      }
    },
    hasDeclaration () {
      return this.containsKey(this.application.data, 'declaration');
    },
    hasOwnershipDeclaration () {
      return this.containsKey(this.application.data, 'ownership_declaration');
    },
    hasMaterials () {
      let materials = {};
      if (this.hasProposalExtension) {
        if (this.application.data.proposal_extension.materials) {

          if (this.application.data.proposal_extension.materials.definitions_in_documents) {
            return materials.answer = "You chose to define materials on supporting documentation.";
          } else if (this.application.data.proposal_extension.materials.definitions_to_follow) {
            return materials.answer = "You don’t know yet and will submit an Approval of Conditions later";
          } else if (this.application.data.proposal_extension.materials.definitions_in_form) {
            return materials.answer = "You chose to define materials in the form";
          } else {
            return materials.answer = 'You did not provide this information.';
          }

        } else {
          return materials.answer = 'You did not provide this information.';
        }
      } else {
        return materials.answer = 'You did not provide this information.';
      }
    },
    wallsMaterials() {
      if (this.hasProposalExtension) {
        if (this.containsKey(this.application.data.proposal_extension, 'materials') && this.containsKey(this.application.data.proposal_extension.materials, 'walls')) {

          if (this.application.data.proposal_extension.materials.definitions_in_documents) {
            return "You chose to define materials on supporting documentation.";
          } else if (this.application.data.proposal_extension.materials.definitions_to_follow) {
            return "You don’t know yet and will submit an Approval of Conditions later";
          }
          
          if (this.application.data.proposal_extension.materials.walls.matches_existing) {
            return 'You chose: materials match existing.'
          }

          if (this.application.data.proposal_extension.materials.walls.not_applicable) {
            return 'You chose: not applicable.'
          }

          if (this.application.data.proposal_extension.materials.walls.proposals && this.application.data.proposal_extension.materials.walls.proposals.length > 0) {

            let wallsMaterial = "";

            for (var i = 0; i < this.application.data.proposal_extension.materials.walls.proposals.length; i++) {
 
              if (this.application.data.proposal_extension.materials.walls.proposals[i].material) {
                wallsMaterial = 'Material selected: ' + this.application.data.proposal_extension.materials.walls.proposals[i].material.name + '. Colour and type: ' + this.application.data.proposal_extension.materials.walls.proposals[i].colour_and_type;
              } else {
                wallsMaterial = 'Colour and type: ' + this.application.data.proposal_extension.materials.walls.proposals[i].colour_and_type;
              }
            }

            return wallsMaterial;
          } else {
            return 'No selections were made regarding the materials of the walls. ';
          }
        }
      }
    },
    roofMaterials() {
      if (this.hasProposalExtension) {
        if (this.containsKey(this.application.data.proposal_extension, 'materials') && this.containsKey(this.application.data.proposal_extension.materials, 'roof')) {

          if (this.application.data.proposal_extension.materials.definitions_in_documents) {
            return "You chose to define materials on supporting documentation.";
          } else if (this.application.data.proposal_extension.materials.definitions_to_follow) {
            return "You don’t know yet and will submit an Approval of Conditions later";
          }

          if (this.application.data.proposal_extension.materials.roof.matches_existing) {
            return 'You chose: materials match existing.'
          }

          if (this.application.data.proposal_extension.materials.roof.not_applicable) {
            return 'You chose: not applicable.'
          }

          if (this.application.data.proposal_extension.materials.roof.proposals && this.application.data.proposal_extension.materials.roof.proposals.length > 0) {

            let roofMaterial = "";

            for (var i = 0; i < this.application.data.proposal_extension.materials.roof.proposals.length; i++) {

              if (this.application.data.proposal_extension.materials.roof.proposals[i].material) {
                roofMaterial = 'Material selected: ' + this.application.data.proposal_extension.materials.roof.proposals[i].material.name + '. Colour and type: ' + this.application.data.proposal_extension.materials.roof.proposals[i].colour_and_type;
              } else {
                roofMaterial = 'Colour and type: ' + this.application.data.proposal_extension.materials.roof.proposals[i].colour_and_type;
              }
              
            }

            return roofMaterial;
          } else {
            return 'No selections were made regarding the materials of the roof. ';
          }
        }
      }
    },
    windowsMaterials() {
      if (this.hasProposalExtension) {
        if (this.containsKey(this.application.data.proposal_extension, 'materials') && this.containsKey(this.application.data.proposal_extension.materials, 'windows')) {

          if (this.application.data.proposal_extension.materials.definitions_in_documents) {
            return "You chose to define materials on supporting documentation.";
          } else if (this.application.data.proposal_extension.materials.definitions_to_follow) {
            return "You don’t know yet and will submit an Approval of Conditions later";
          }
          


          if (this.application.data.proposal_extension.materials.windows.matches_existing) {
            return 'You chose: materials match existing.'
          }

          if (this.application.data.proposal_extension.materials.windows.not_applicable) {
            return 'You chose: not applicable.'
          }

          if (this.application.data.proposal_extension.materials.windows.proposals && this.application.data.proposal_extension.materials.windows.proposals.length > 0) {

            let windowsMaterial = "";

            for (var i = 0; i < this.application.data.proposal_extension.materials.windows.proposals.length; i++) {

              if (this.application.data.proposal_extension.materials.windows.proposals[i].material) {
                windowsMaterial = 'Material selected: ' + this.application.data.proposal_extension.materials.windows.proposals[i].material.name +  '. Colour and type: ' + this.application.data.proposal_extension.materials.windows.proposals[i].colour_and_type;
              } else {
                windowsMaterial = 'Colour and type: ' + this.application.data.proposal_extension.materials.windows.proposals[i].colour_and_type;
              }
            }

            return windowsMaterial;
          } else {
            return 'No selections were made regarding the materials of the windows. ';
          }
        }
      }
    },
    doorsMaterials() {
      if (this.hasProposalExtension) {
        if (this.containsKey(this.application.data.proposal_extension, 'materials') && this.containsKey(this.application.data.proposal_extension.materials, 'doors')) {

          if (this.application.data.proposal_extension.materials.definitions_in_documents) {
            return "You chose to define materials on supporting documentation.";
          } else if (this.application.data.proposal_extension.materials.definitions_to_follow) {
            return "You don’t know yet and will submit an Approval of Conditions later";
          }
          


          if (this.application.data.proposal_extension.materials.doors.matches_existing) {
            return 'You chose: materials match existing.'
          }

          if (this.application.data.proposal_extension.materials.doors.not_applicable) {
            return 'You chose: not applicable.'
          }

          if (this.application.data.proposal_extension.materials.doors.proposals && this.application.data.proposal_extension.materials.doors.proposals.length > 0) {

            let doorsMaterial = "";

            for (var i = 0; i < this.application.data.proposal_extension.materials.doors.proposals.length; i++) {
              if (this.application.data.proposal_extension.materials.doors.proposals[i].material) {
                doorsMaterial = 'Material selected: ' + this.application.data.proposal_extension.materials.doors.proposals[i].material.name + '. Colour and type: ' + this.application.data.proposal_extension.materials.doors.proposals[i].colour_and_type;
              } else {
                doorsMaterial = 'Colour and type: ' + this.application.data.proposal_extension.materials.doors.proposals[i].colour_and_type;
              }
            }

            return doorsMaterial;
          } else {
            return 'No selections were made regarding the materials of the doors. ';
          }
        }
      }
    },
    hasOtherMaterials () {
      if (this.application.data.proposal_extension && this.application.data.proposal_extension.materials && this.application.data.proposal_extension.materials.other) {
        if (this.application.data.proposal_extension.materials.other.length === 1 && this.application.data.proposal_extension.materials.other[0] === "") {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    worksDescription () {
      return GenerateWorks.generateWorkDescription(this.application.data);
    },

    applicationSubmitted() {

      if (this.application.data.status.name === "Submitted") {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
