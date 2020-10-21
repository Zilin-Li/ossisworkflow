<template>
<div class="mainPage">

  <div class="searchBar">
    <label>Job Number:</label>
    <input v-model="searchNum" @keyup="checkEnterNum" @keyup.enter="keyEnterCheck" class="inputBox form-control" type="text" placeholder="Enter job number">

    <input type="button" value="Search" @click="searchJob" class="searchBtn btn btn-primary">
  </div>

  <p v-show="isShow" class="errerInfo"> "Please enter a job number."</p>
  <p class="errerInfo"> {{errorMsg}}</p>

  <table class="jobTable table table-bordered">

    <thead>
      <tr>
        <th>Job Number</th>
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
          <select v-model="statuSelected" class="form-control">
            <option>Awaiting Scans/Prescription Form</option>
            <option>Segmentation</option>
            <option>Design</option>
            <option>Design Review</option>
            <option>Design Sign Off</option>
            <option>Awaiting Funding</option>
            <option>Manufacturing</option>
            <option>Machining</option>
            <option>Cleaning</option>
            <option>Coating</option>
            <option>At OSSIS</option>
            <option>Shipped</option>
            <option>At Hospital</option>
            <option>Awaiting Post-Op</option>
            <option>Awaiting Payment</option>
            <option>On Hold</option>
            <option>Cancelled</option>
            <option>Invoiced</option>
            <option>Completed - Pelvis Implants</option>
            <option>Completed(Other)</option>
          </select>
        </td>
        <td>
          <select v-model="DHFstatuSelected" class="form-control">
            <option>Section 1 For Review</option>
            <option>Section 2 For Review</option>
            <option>Section 3 For Review</option>
            <option>Section 4 For Review</option>
            <option>Section 5 For Review</option>
            <option>Section 1 In Progress</option>
            <option>Section 2 In Progress</option>
            <option>Section 3 In Progress</option>
            <option>Section 4 In Progress</option>
            <option>Section 5 In Progress</option>
            <option>Section 1 Complete</option>
            <option>Section 2 Complete</option>
            <option>Section 3 Complete</option>
            <option>Section 4 Complete</option>
            <option>Section 5 Complete</option>
            <option>Ready For Scanning</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>

  <p>{{userMassage}}</p>

  <div class="btnOptions">
    <input type="button" value="Data synchronization" @click="syncData" class="syncBtn btn btn-primary">
  </div>

</div>
</template>


<script>
export default {
  beforeCreate: function() {
    document.body.className = 'mainPage';
  },
  data() {
    return {
      searchNum: '',
      statuSelected: this.$root.statuSelected,
      DHFstatuSelected: this.$root.DHFstatuSelected,
      mondayAuthor: '',
      jobExistInfo: '',
      userMassage: '',
      jobId: '',
      isShow: false,
      errorMsg: ''
    }
  },

  methods: {
    // This function checks if the user input is a number
    // If input is not a number, prompts the user to change.
    // If input is a number,return true.And vice versa.
    checkEnterNum() {
      this.errorMsg = ""
      if (isNaN(this.searchNum)) {
        this.isShow = true
        return false
      } else {
        this.isShow = false
        return true
      }
    },

    //When the user use the Enter key, the 'searchJob' functions are automatically performed
    keyEnterCheck() {
      this.searchJob()
    },

    // When user click Search button, send the search number to backend.
    // Receives a response in JSON format
    searchJob() {
      // If the input is not a number, the search function does not perform.
      if (!this.checkEnterNum()) {
        return
      }
      // this.$root.jobNum = this.searchNum

      let requestUrl = "http://localhost/api/searchjob?jobId=" + this.searchNum
      fetch(requestUrl)
        .then(res => res.json())
        .then(res => {
          // If status is "OK", means the job number is exist in Workflow Max
          // Assign values to global variables
          if (res.status == "OK") {
            this.$root.jobNum = res.jobId
            this.$root.client = res.client
            this.statuSelected = this.$root.statuSelected = res.state
            this.DHFstatuSelected = this.$root.DHFstatuSelected = res.DHFStatus
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
          }
        })
    },

    syncData() {
      this.$root.statuSelected = this.statuSelected
      this.$root.DHFstatuSelected = this.DHFstatuSelected

      var jobDetail = new Object()

      // jobDetail.jobId = this.$root.jobNum
      jobDetail.state =this.$root.statuSelected
      jobDetail.DHFStatus =  this.$root.DHFstatuSelected
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

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ title: "Vue POST Request Example" })
        body: JSON.stringify(jobDetail)
      };

      let requestUrl = "http://localhost/api/syncdata?jobId=" + this.$root.jobNum
        fetch(requestUrl,requestOptions)
          // .then(res => res.text())
          .then(res => console.log(res))
  }

  //   creatItemToMonday() {
  // //----------------------------------------------------------------------------------------------------------
  //     // Creat item to Monday
  //     let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id: 736609738,item_name:$myItemName, column_values:$columnVals) { id } }';
  //     let vars = {
  //       "myItemName": this.$root.jobNum,
  //       "columnVals": JSON.stringify({
  //         "patient_name": this.$root.patient,
  //         "dob": {
  //           "date": this.$root.dateOfBirth
  //         },
  //         "status": {
  //           "label": this.$root.statuSelected
  //         },
  //         "dhf_status": {
  //           "label": this.$root.DHFstatuSelected
  //         },
  //         // dropdawn box is similar with status, the Monday.com label should be some with Workfolow Max.
  //         // There we choose text type.
  //         "device2": this.$root.device,
  //         "anatomy0": this.$root.anatomy,
  //         "pathology9": this.$root.pathology,
  //         "surgical_approach0": this.$root.sApproach,
  //         "surgeon": this.$root.client,
  //         "hospital": this.$root.hospital,
  //         "surgery_date": {
  //           "date": this.$root.sDate
  //         }
  //       })
  //     };
  //     fetch("https://api.monday.com/v2", {
  //         method: 'post',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': this.mondayAuthor
  //         },
  //         body: JSON.stringify({
  //           'query': query5,
  //           'variables': JSON.stringify(vars)
  //         })
  //       })
  //       .then(res => res.json())
  //       .then(res => console.log(JSON.stringify(res, null, 2)))
  //
  //   },
  //
  //   updateToMonday() {
  //     //---------------------------------------------------------------------------------------------------------------
  //     let query1 = '{ items_by_column_values(board_id: 736609738, column_id: "name", column_value: "' + this.$root.jobNum + '", state: active) {id}}';
  //     fetch("https://api.monday.com/v2", {
  //         method: 'post',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': this.mondayAuthor
  //         },
  //         body: JSON.stringify({
  //           'query': query1
  //         })
  //       })
  //       .then(res => res.json())
  //       .then(res => {
  //         //Get the job ID in monday.com
  //         this.jobId = res.data.items_by_column_values[0].id
  //         let query = 'mutation ($columnVals: JSON!) { change_multiple_column_values (board_id: 736609738,item_id:' + this.jobId + ', column_values:$columnVals) { id } }';
  //         // Consider that user may change other values on Workfolow Max, so here we update all the data in Monday.com.
  //         let vars = {
  //           "columnVals": JSON.stringify({
  //             "patient_name": this.$root.patient,
  //             "dob": {
  //               "date": this.$root.dateOfBirth
  //             },
  //             "status": {
  //               "label": this.$root.statuSelected
  //             },
  //             "dhf_status": {
  //               "label": this.$root.DHFstatuSelected
  //             },
  //             // dropdawn box is similar with status, the Monday.com label should be some with Workfolow Max.
  //             // There we choose text type.
  //             "device2": this.$root.device,
  //             "anatomy0": this.$root.anatomy,
  //             "pathology9": this.$root.pathology,
  //             "surgical_approach0": this.$root.sApproach,
  //             "surgeon": this.$root.client,
  //             "hospital": this.$root.hospital,
  //             "surgery_date": {
  //               "date": this.$root.sDate
  //             }
  //           })
  //         };
  //         fetch("https://api.monday.com/v2", {
  //             method: 'post',
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'Authorization': this.mondayAuthor
  //             },
  //             body: JSON.stringify({
  //               'query': query,
  //               'variables': JSON.stringify(vars)
  //             })
  //           })
  //           .then(res => res.json())
  //           .then(res => console.log(JSON.stringify(res, null, 2)));
  //       })
  //
  //
  //   },


  // updateToWM() {
  //   let requestUrl = "http://localhost/api/update?jobId=" + this.$root.jobNum + "&Status=" + this.statuSelected + "&DHFStatus=" + this.DHFstatuSelected + "&dhfStatusUUID=" + this.$root.dhfStatusUUID
  //   fetch(requestUrl)
  //     .then(res => console.log(res))
  // },


  // syncData() {
  // this.updateToWM()
  // //Check job number whether exist.
  // let query = '{ items_by_column_values(board_id: 736609738, column_id: "name", column_value: "' + this.$root.jobNum + '", state: active) {id name}}';
  // fetch("https://api.monday.com/v2", {
  //     method: 'post',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': this.mondayAuthor
  //     },
  //     body: JSON.stringify({
  //       'query': query
  //     })
  //   })
  //   .then(res => res.json())
  //   .then(res => {
  //     //if the length==1,means the id is exist.if length==0, means the id is not exist.
  //     this.jobExistInfo = res.data.items_by_column_values.length
  //     console.log(res)
  //     console.log(res.data)
  //
  //     // if the jobNum not exist on monday.com
  //     if (this.jobExistInfo == 0) {
  //       //create a new item on monday
  //       this.creatItemToMonday()
  //       this.userMassage = "Created a new item on Monday"
  //       // if the status changs,update status to worflowmax.
  //       if (this.$root.statuSelected != this.statuSelected) {
  //
  //       }
  //     } else {
  //       //If the jobNum exist on monday.com, update the job detail on monday.com
  //       this.updateToMonday()
  //       this.userMassage = "Updated the item on Monday"
  //       // if the status changs,update status to worflowmax.
  //       if (this.$root.statuSelected != this.statuSelected) {
  //         // update status to worflowmax.
  //       }
  //     }
  //   })
  //   .then()
  //
  // this.$root.statuSelected = this.statuSelected
  // this.$root.DHFstatuSelected = this.DHFstatuSelected
  // }
}
}
</script>

<style scoped>
.mainPage {
  padding: 5%;
  text-align: center;
  height: 100%;
  font-weight: bold;
}

.searchBar {
  display: flex;
  padding-left: 10%;
}

.errerInfo {

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

.syncBtn,
.updateBtn {
  width: 20%;
}

.btn {
  background-color: #1C3E50;
  border-radius: 25px;
  font-weight: bold;
}
</style>
