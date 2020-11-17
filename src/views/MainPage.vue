<template>
<div class="mainPage">
  <Header />
  <div class="main">
    <div class="searchBar">
      <label>Job ID:</label>
      <input v-model="searchNum" @keyup="checkEnterNum" @keyup.enter="searchJob" class="inputBox form-control" type="text" placeholder="Please enter a job ID">
      <input type="button" value="Search" @click="searchJob" class="searchBtn btn btn-primary">
    </div>
    <p v-if="isShow" class="errorInfo hint1"> {{errorMsg}}</p>

    <table class="jobTable table table-bordered">
      <thead>
        <tr>
          <th>Job ID</th>
          <th>Client</th>
          <th>Patient Name</th>
          <th>Status</th>
          <th>DHF Status</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <router-link to="/jobdetail">{{this.$root.jobNum}}</router-link>
          </td>
          <td>{{this.$root.client}}</td>
          <td>{{this.$root.patient}}</td>
          <td>
            <select v-model="statusSelected" class="form-control">
              <option v-for="(item1, index) in statusOptions " :key="item1.option">
                {{ item1.option }}
              </option>
            </select>
          </td>
          <td>
            <select v-model="DHFstatusSelected" class="form-control">
              <option v-for="(item2, index) in dhfStatusOptions" :key="item2.option">
                {{ item2.option }}
              </option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>

    <p class="hint2" v-show="messageShow">{{userMessage}}</p>
    <div class="waitingDot" v-show = "dotShow">
      <div class="dots"></div>
      <div class="dots"></div>
      <div class="dots"></div>
      <div class="dots"></div>
      <div class="dots"></div>
    </div>

    <div class="btnOptions">
      <button class="syncBtn btn btn-primary" @click="syncData">
        {{content}}
      </button>
    </div>

  </div>
</div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Main',
  beforeCreate: function() {
    document.body.className = 'mainPage';
  },
  components: {
    Header
  },
  data() {
    return {
      statusOptions: [
        // these options can be get from backend in next step
        {
          option: 'Awaiting Scans/Prescription Form'
        },
        {
          option: 'Segmentation'
        },
        {
          option: 'Design'
        },
        {
          option: 'Design Review'
        },
        {
          option: 'Design Sign Off'
        },
        {
          option: 'Awaiting Funding'
        },
        {
          option: 'Manufacturing'
        },
        {
          option: 'Machining'
        },
        {
          option: 'Cleaning'
        },
        {
          option: 'Coating'
        },
        {
          option: 'At OSSIS'
        },
        {
          option: 'Shipped'
        },
        {
          option: 'At Hospital'
        },
        {
          option: 'Awaiting Post-Op'
        },
        {
          option: 'Awaiting Payment'
        },
        {
          option: 'On Hold'
        },
        {
          option: 'Cancelled'
        },
        {
          option: 'Invoiced'
        },
        {
          option: 'Completed - Pelvis Implants'
        },
        {
          option: 'Completed(Other)'
        },
      ],
      dhfStatusOptions: [
        // these options can be get from backend in next step
        {
          option: ' '
        },
        {
          option: 'Section 1 For Review'
        },
        {
          option: 'Section 2 For Review'
        },
        {
          option: 'Section 3 For Review'
        },
        {
          option: 'Section 4 For Review'
        },
        {
          option: 'Section 5 For Review'
        },
        {
          option: 'Section 1 In Progress'
        },
        {
          option: 'Section 2 In Progress'
        },
        {
          option: 'Section 3 In Progress'
        },
        {
          option: 'Section 4 In Progress'
        },
        {
          option: 'Section 5 In Progress'
        },
        {
          option: 'Section 1 Complete'
        },
        {
          option: 'Section 2 Complete'
        },
        {
          option: 'Section 3 Complete'
        },
        {
          option: 'Section 4 Complete'
        },
        {
          option: 'Section 5 Complete'
        },
        {
          option: 'Ready For Scanning'
        },
      ],
      sycnCount: 0,
      messageShow: false,
      userMessage: '',
      content: 'Synchronization',
      totalTime: 5,
      searchNum: '',
      statusSelected: this.$root.statusSelected,
      DHFstatusSelected: this.$root.DHFstatusSelected,
      mondayAuthor: '',
      jobExistInfo: '',
      jobId: '',
      isShow: false,
      errorMsg: '',
      dotShow: false
    }
  },
  methods: {
    //Check the format of job id.
    checkEnterNum() {
      this.errorMsg = ""
      this.userMessage = ""

      if (isNaN(this.searchNum)) {
        this.errorMsg = "Invalid input. Please enter a number."
        this.isShow = true
        return false
      } else {
        this.isShow = false
        return true
      }
    },

    // When user click Search button, send the search number to backend.
    // Receives a response in JSON format
    searchJob() {
      this.userMessage = ""
      this.sycnCount = 0
      // If the input is not a number, the search function does not perform.
      if (!this.checkEnterNum()) {
        return
      }
      let requestUrl = this.$root.severDomain + '/api/searchjob?jobId=' + this.searchNum
      // let requestUrl = "https://ossisserver.willin.xyz/api/searchjob?jobId=" + this.searchNum
      fetch(requestUrl)
        .then(res => res.json())
        .then(res => {
          // If status is "OK", means the job number is exist in Workflow Max
          // Assign values to global variables
          if (res.status == "OK") {
            this.$root.jobNum = res.jobId
            this.$root.client = res.client
            this.statusSelected = this.$root.statusSelected = res.state
            this.DHFstatusSelected = this.$root.DHFstatusSelected = res.DHFStatus
            this.$root.patient = res.patienName
            this.$root.dateOfBirth = res.dateOfBirth
            this.$root.device = res.deviceType
            this.$root.anatomy = res.anatomy
            this.$root.pathology = res.pathology
            this.$root.sApproach = res.surgicalApproach
            this.$root.hospital = res.hospital
            this.$root.sDate = res.surgeryDate
            this.$root.dhfStatusUUID = res.DHFStatusUUID
            this.errorMsg = ""
          }
          // If status is "ERROR", means the job number is not exist in Workflow Max
          // Retrun the error description.
          else if (res.status == "ERROR") {
            this.errorMsg = res.description
            this.isShow = true

          } else if (res.status == "Unauthorized") {
            window.location = this.$root.severDomain + '/authorization'
            // window.location = 'https://ossisserver.willin.xyz/authorization'
          }
        })
    },

    syncData() {
      this.dotShow= true
      this.messageShow = false
      if (this.sycnCount == 0 || this.statusSelected != this.$root.statusSelected || this.DHFstatusSelected != this.$root.DHFstatusSelected) {
        this.$root.statusSelected = this.statusSelected
        this.$root.DHFstatusSelected = this.DHFstatusSelected
        var jobDetail = new Object()

        // jobDetail.jobId = this.$root.jobNum
        jobDetail.state = this.$root.statusSelected
        jobDetail.DHFStatus = this.$root.DHFstatusSelected
        jobDetail.client = this.$root.client
        jobDetail.patientName = this.$root.patient
        jobDetail.dateOfBirth = this.$root.dateOfBirth
        jobDetail.deviceType = this.$root.device
        jobDetail.anatomy = this.$root.anatomy
        jobDetail.pathology = this.$root.pathology
        jobDetail.surgicalApproach = this.$root.sApproach
        jobDetail.hospital = this.$root.hospital
        jobDetail.surgeryDate = this.$root.sDate
        jobDetail.DHFStatusUUID = this.$root.dhfStatusUUID

        if (this.$root.jobNum != "") {
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(jobDetail)
          };
          let requestUrl =this.$root.severDomain + '/api/syncdata?jobId='+ this.$root.jobNum
          // let requestUrl = "https://ossisserver.willin.xyz/api/syncdata?jobId=" + this.$root.jobNum
          fetch(requestUrl, requestOptions)
            .then(res => res.json())
            .then(res => {
              if (res.status == "Unauthorized") {
                window.location = this.$root.severDomain +'/authorization'
                // window.location = 'https://ossisserver.willin.xyz/authorization'

              } else {
                this.messageShow = true
                this.dotShow= false
                this.userMessage = res.description
              }
            })
          this.sycnCount++
        } else {
          this.isShow = true
        }

      } else {
        this.messageShow = true
        this.dotShow= false
        this.userMessage = "The data has not changed, please do not repeat the submission."
      }
    }
  }
}
</script>

<style scoped>
.mainPage {
  height: 100%;
}

.main {
  position: relative;
  padding: 5%;
  text-align: center;
  height: 100%;
  font-weight: bold;
}

.searchBar {
  display: flex;
  padding-left: 10%;
}

.errorInfo {
  text-align: left;
  color: red;
  padding-left: 18%;
}

label {
  padding-top: 10px;
}

.inputBox {
  width: 30%;
  margin-left: 2%;
  margin-right: 2%;
}

table {
  background-color: white;
  margin: 5% auto;
}

.btnOptions {
  display: flex;
  justify-content: space-around;
  padding-top: 2%;
}

.syncBtn {
  width: 20%;
}

.btn {
  background-color: #1C3E50;
  border-radius: 25px;
  font-weight: bold;
}

.hint1,
.hint2,
.waitingDot {
  position: absolute;

}

.hint2,.waitingDot {
  margin-top: -2%;
  width: 90%;
}


.dots{
  height: 20px;
  width:20px;
  border-radius:50%;
  /* background-color: white; */
  display:inline-block;
  margin:.5rem;
  animation: scaling 2.5s ease-in-out infinite;
}

@keyframes scaling{
  0%,100%{
    transform:scale(0.2);
    background-color:#30FFb7;
  }
  40%{
    transform:scale(1);
    background-color:#07deff;
  }
  50%{
    transform:scale(1);
    background-color:#0761ff;
  }
}

.dots:nth-child(0){
  animation-delay: 0s;

}
.dots:nth-child(1){
  animation-delay: 0.2s;

}
.dots:nth-child(2){
  animation-delay: 0.4s;

}
.dots:nth-child(3){
  animation-delay: 0.6s;

}
.dots:nth-child(4){
  animation-delay: 0.8s;
}
.dots:nth-child(5){
  animation-delay: 1s;
}

</style>
