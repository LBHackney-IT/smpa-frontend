<template>
  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">
      <h1 class="govuk-heading-xl">Submit a planning application</h1>

      <p class="govuk-body">
        View spacial information about your site and submit your planning application to Hackney Council.
      </p>

      <div class="govuk-inset-text">
        You can only use this service if you are undertaking extensions of modifications to a house. For now, the prototype only works with postcodes E8 3HW or N16 8ED Please note it doesn’t save your answers yet so you’ll have to go through all in one go.
      </div>

      <div class="steps govuk-body">
        <div class="steps__single-step">
          <div class="steps__step-guide">
            <div class="steps__step-number">
              1
            </div>
            <div class="steps__line-guide"></div>
          </div>
          
          <div class="steps__step-info">
            <h4>Check if you need planning permission</h4>
            <a class="govuk-link" href="#hide" v-if="isShown1" v-on:click="isShown1=false">Hide</a>
            <a class="govuk-link" href="#show" v-if="!isShown1" v-on:click="isShown1=true">Show</a>
            <div v-if="isShown1">
              <p><a href="https://www.planx.uk">Use Plan X</a>, a digital planning tool, to check if your proposal requires permission and how well it complies with local planning policies.</p>
            </div>
          </div>
        </div>

        <div class="steps__single-step">
          <div class="steps__step-guide">
            <div class="steps__step-number">
              2
            </div>
            <div class="steps__line-guide"></div>
          </div>
          
          <div class="steps__step-info">
            <h4>Submit a pre-application</h4>
            <a class="govuk-link" href="#hide" v-if="isShown2" v-on:click="isShown2=false">Hide</a>
            <a class="govuk-link" href="#show" v-if="!isShown2" v-on:click="isShown2=true">Show</a>
            <div v-if="isShown2">
              <p>Prospective applicants can seek pre-application advice from the local authority to improve the quality of the planning application by submitting a pre-application. Submission of a pre-application requires submission of required documents and relevant information to describe the proposal.</p>
              <p>There are three different types of pre-application service at Hackney:</p>
              <ul>
                <li><strong>For free</strong> you can speak with the <strong>Duty Planner</strong> and receive non-site specific verbal advice</li>
                <li><strong>For a fee</strong> you can use the <strong>15 day pre-application service</strong>. This is suitable for householder and small-scale development </li>
                <li><strong>For a fee</strong> you can use the <strong>30 day pre-application service</strong> for a more comprehensive, written response. This is only available for specific proposals. </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="steps__single-step">
          <div class="steps__step-guide">
            <div class="steps__step-number">
              3
            </div>
            <div class="steps__line-guide"></div>
          </div>
          
          <div class="steps__step-info">
            <h4>Understand planning considerations relevant to your site</h4>
            <a class="govuk-link" href="#hide" v-if="isShown3" v-on:click="isShown3=false">Hide</a>
            <a class="govuk-link" href="#show" v-if="!isShown3" v-on:click="isShown3=true">Show</a>
            <div v-if="isShown3">
              <p>View the property and planning details related to a site address. You can find out which planning designations and local policies apply to your site, as well as your site planning history and previous applications nearby.</p>
              <p>This information will tell you:</p>
              <ul>
                <li>If you site address is in a conservation area</li>
                <li>If your site address includes listed buildings</li>
                <li>The location of trees with protected orders</li>
                <li>If your site address is in a floodrisk area</li>
                <li>If your site address is affected by Article 4</li>
                <li>The planning history of your site address</li>
                <li>Nearby planning applications to your site address</li>
              </ul>
              <a class="govuk-button" href="/start">Find about your site</a>
            </div>
          </div>
        </div>
        <div class="steps__single-step">
          <div class="steps__step-guide">
            <div class="steps__step-number">
              4
            </div>
            <div class="steps__line-guide"></div>
          </div>
          
          <div class="steps__step-info">
            <h4>Prepare your application</h4>
            <a class="govuk-link" href="#hide" v-if="isShown4" v-on:click="isShown4=false">Hide</a>
            <a class="govuk-link" href="#show" v-if="!isShown4" v-on:click="isShown4=true">Show</a>
            <div v-if="isShown4">
              <p>Prepare your planning application for submission to the relevant local authority. By using this service you will be asked to supply relevant information to describe your proposal. This will include:</p>
              <ul>
                <li>Description of works</li>
                <li>Documents and plans needed to support your application. Use the validation checklist to make sure you provide all information needed</li>
              </ul>
              <p>You will also be asked to submit relevant documentation to support your proposal. This service will inform you which documents are required based on your site address.</p>
            </div>
          </div>
        </div>
        <div class="steps__single-step">
          <div class="steps__step-guide">
            <div class="steps__step-number">
              5
            </div>
            <div class="steps__line-guide"></div>
          </div>
          
          <div class="steps__step-info">
            <h4>Submit a planning application</h4>
            <a class="govuk-link" href="#hide" v-if="isShown5" v-on:click="isShown5=false">Hide</a>
            <a class="govuk-link" href="#show" v-if="!isShown5" v-on:click="isShown5=true">Show</a>
            <div v-if="isShown5">
              <p>Submit your application directly to Hackney Council through “Submit a planning application’.</p>
              <a class="govuk-button" href="/start">Apply for planning permission</a>
            </div>
          </div>
        </div>
        <div class="steps__single-step">
          <div class="steps__step-guide">
            <div class="steps__step-number">
              6
            </div>
            <div class="steps__line-guide"></div>
            <div class="steps__line-end"></div>
          </div>
          
          <div class="steps__step-info">
            <h4>What's next</h4>
            <a class="govuk-link" href="#hide" v-if="isShown6" v-on:click="isShown6=false">Hide</a>
            <a class="govuk-link" href="#show" v-if="!isShown6" v-on:click="isShown6=true">Show</a>
            <div v-if="isShown6">
              <h4 class="govuk-heading-s">Having your application accepted</h4>
              <p>After your application has been received, it will be checked to ensure that all the required information and documentation has been provided. This is known as the 'validation' process. If your application is missing required information or documentation, it will be invalidated and you will be contacted within 5 days for the additional information required. Your application will be returned if you do not supply the required information within 28 days.</p>
              
              <p>If all information has been provided, we will write to you confirming the application is valid, give you a unique reference number and advise you the name of the planning officer who will assess your application.</p>
              
              <h4 class="govuk-heading-s">Consultation</h4>
              <p>The consultation process then starts, allowing at least 21 days for responses. Depending on the application type and size, we may consult using one or more of the following methods:</p>
              <ul>
                <li>individual letters to neighbours</li>
                <li>site notice (usually attached to a lamppost or other fixture near site)</li>
                <li>press adverts (Southwark News)</li>
              </ul>
              
              <h4 class="govuk-heading-s">Receiving a decision</h4>
              <p>After expiry of the consultation period, the case officer will complete a full assessment of the proposed development and agree the appropriate decision level for the application. Planning applications have to be decided in line with the council’s development plan – unless there is a very good reason not to do so.</p>
              
              <p>Planning decisions on householder and other minor applications are usually completed within 8 weeks. Major applications take up to 13 weeks or longer (through a formal planning performance agreement with the applicant) to decide. We will issue a decision notice for all applications, advising that the development is either approved with conditions, or refused.</p>

              <p>A planning application permission is generally valid for three years from the date of the decision. This period may be increased or reduced if the situation warrants it, however this is the standard period.</p>

              <p>You must commence, but do not need to complete your development, within this period.</p>
              <p>If your permission lapses before you start work, you will need to re-apply for planning permission. This will be treated as a new application.</p>

              <h4 class="govuk-heading-s">Conditions to your permission</h4>
              <p>In certain circumstances we may approve your development subject to a condition (or conditions) that require you to submit further information, such as types of materials, landscaping details etc. Most householder applications will be subject to standard conditions, such as a requirement to build the development in accordance with the approved plans, for the materials proposed to match the existing materials and that the development must commence within three years.</p>

              <p>Please read your decision notice carefully and be sure you understand any conditions of the permission. These form part of your permission and any failure to comply with these conditions represents a breach of planning control that we may take enforcement action against. Find out about planning enforcement.</p>

              <p>Any neighbour who has commented on the application will be sent a letter outlining the details of our decision including any conditions.</p>

              <h4 class="govuk-heading-s">Appealing a decision</h4>
              <p>If you do not agree with our decision to refuse the application, you are recommended in the first instance to read the officer's planning report, setting out the background of the decision. This will be available on our website once the decision has been issued. If you are still unhappy with the decision, you should contact your case officer to discuss it. Finally, if you still do not agree with the decision, you can appeal to the Planning Inspectorate. The Planning Inspectorate are a third party body outside of the Council who will review our decision and either uphold or dismiss your appeal. Appeal guidance is included with your decision.</p>

              <p>You have 12 weeks from the date of the decision to submit an appeal, and it must be submitted directly to the Planning Inspectorate and not to the Council. If you do not submit your appeal within this timeframe, you lose the right of appeal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Overview',
    data() {
      return {
        isShown1: false,
        isShown2: false,
        isShown3: false,
        isShown4: false,
        isShown5: false,
        isShown6: false
      }
    }
  }
</script>
