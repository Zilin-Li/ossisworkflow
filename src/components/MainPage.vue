<template>
<div class="mainPage">

  <div class="searchBar">
    <label>Job Number:</label>
    <input v-model="searchNum" class="inputBox form-control" type="text" placeholder="Enter job number">
    <input type="button" value="Search" @click="searchJob" class="searchBtn btn btn-primary">
  </div>
  <!-- <p>{{info}}</p> -->
  <!-- <button @click="searchJobInMonday">点击获取数据</button> -->
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
          <router-link to="/jobdetail"> {{this.$root.jobNum}}</router-link>
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
    <input type="button" :disabled='isDisabled' value="Data synchronization" @click="syncToMonday" class="syncBtn btn btn-primary">
    <!-- <input type="button" value="Update Status" @click="updateStatus" class="updateBtn btn btn-primary"> -->
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
      searchNum: '', //this number use to send to backend
      // jobNum:'',// this number use to display.
      statuSelected: this.$root.statuSelected,
      DHFstatuSelected: this.$root.DHFstatuSelected,
      mondayAuthor: '*****', // This monday.com token.
      info: '',
      itemId: '',
      jobExist: null,
      jobId:'',
      userMassage:'',
      isDisabled:false
      // client: '',
      // patient: '',
      // dateOfBirth: '',
      // device: '',
      // anatomy: '',
      // pathology: '',
      // sApproach: '',
      // hospital: '',
      // sDate: '',

    }
  },

  methods: {
    searchJob() {
      //send request to back-send
      let requestUrl="http://localhost/api/test?jobId=" + this.searchNum

      fetch(requestUrl)
      .then(res =>res.json())
      .then(res => {
        this.$root.jobNum=res.jobId
        this.$root.client =res.client
        this.statuSelected = this.$root.statuSelected =res.state
        this.DHFstatuSelected = this.$root.DHFstatuSelected=res.DHFStatus

        this.$root.patient =res.patienName
        // this.$root.dateOfBirth = res.dateOfBirth
        this.$root.device = res.deviceType
        this.$root.anatomy = res.anatomy
        this.$root.pathology = res.pathology
        this.$root.sApproach = res.surgicalApproach
        this.$root.hospital = res.hospital
        // this.$root.sDate = res.surgeryDate
      })

      //if jobNum exist in worflow max, get job detail in JASON. format
      //Assign values to global variables

      //Display on user interface
      // this.displayJob();

      //If jobNum isnot exist in worflow max, through error massage

    },

    syncToMonday() {

      this.isDisabled = true

      //Check job number whether exist.
      let query = '{ items_by_column_values(board_id: 736609738, column_id: "name", column_value: "' + this.$root.jobNum + '", state: active) {id name}}';
      fetch("https://api.monday.com/v2", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.mondayAuthor
          },
          body: JSON.stringify({
            'query': query
          })
        })
        .then(res => res.json())
        .then(res => {
        //if the length==1,means the id is exist.if length==0, means the id is not exist.
          this.info = res.data.items_by_column_values.length

          //if the jobNum not exist on monday.com
          if(this.info == 0){
            //create a new item on monday
            this.creatItemToMonday()
            this.userMassage = "Created a new item on Monday"
            console.log("Created a new item on Monday")
            this.isDisabled = false

            // if the status changs, also update status to worflowmax.

          }else{
            //else if the jobNum exist on monday.com
            //Update the job detail on monday.com
            this.updateStatus()
            this.isDisabled = false

            // if the status changs, also update status to worflowmax.
            this.userMassage = "Updated the item on Monday"
            console.log("Update the item on Monday")
          }


        })
        .then()

      this.$root.statuSelected = this.statuSelected
      this.$root.DHFstatuSelected = this.DHFstatuSelected
    },

    creatItemToMonday() {
      //Creat item to Monday

      let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id: 736609738,item_name:$myItemName, column_values:$columnVals) { id } }';
      let vars = {
        "myItemName": this.$root.jobNum,
        "columnVals": JSON.stringify({
          "patient_name": this.$root.patient,
          "dob": {
            "date": this.$root.dateOfBirth
          },
          "status": {
            "label": this.$root.statuSelected
          },
          "dhf_status": {
            "label": this.$root.DHFstatuSelected
          },
          // dropdawn box is similar with status, the Monday.com label should be some with Workfolow Max.
          // There we choose text type.
          "device2": this.$root.device,
          "anatomy0": this.$root.anatomy,
          "pathology9": this.$root.pathology,
          "surgical_approach0": this.$root.sApproach,
          "surgeon": this.$root.client,
          "hospital": this.$root.hospital,
          "surgery_date": {
            "date": this.$root.sDate
          }
        })
      };
      fetch("https://api.monday.com/v2", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.mondayAuthor
          },
          body: JSON.stringify({
            'query': query5,
            'variables': JSON.stringify(vars)
          })
        })
        .then(res => res.json())
        .then(res => console.log(JSON.stringify(res, null, 2)))
    },



    // displayJob() {
    //   //get job details from workflow max
    //     this.$root.client = "Mr.D",
    //     this.$root.patient = "Alice",
    //     this.$root.statuSelected = "Shipped",
    //     this.$root.DHFstatuSelected = "Section 1 For Review",
    //     this.$root.dateOfBirth = "2020-06-03",
    //     this.$root.device = "Hemi-Pelvis",
    //     this.$root.anatomy = "Anatomy1",
    //     this.$root.pathology = "Pathology2",
    //     this.$root.sApproach = "Approach1",
    //     this.$root.hospital = "Hospital",
    //     this.$root.sDate = "2021-09-15",
    //
    //     //get job number from user input
    //     this.$root.jobNum = this.searchNum,
    //     //get job status from global variable
    //     this.statuSelected = this.$root.statuSelected,
    //     this.DHFstatuSelected = this.$root.DHFstatuSelected
    // },

    updateStatus() {
      let query1 = '{ items_by_column_values(board_id: 736609738, column_id: "name", column_value: "' + this.$root.jobNum + '", state: active) {id}}';
      fetch("https://api.monday.com/v2", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.mondayAuthor
          },
          body: JSON.stringify({
            'query': query1
          })
        })
        .then(res => res.json())
        .then(res => {
        //Get the job ID in monday.com
          this.jobId = res.data.items_by_column_values[0].id
          let query = 'mutation ($columnVals: JSON!) { change_multiple_column_values (board_id: 736609738,item_id:' + this.jobId + ', column_values:$columnVals) { id } }';
          let vars = {
            // "$myItemID": parseInt(this.$root.jobNum),
            "columnVals": JSON.stringify({
              "patient_name": this.$root.patient,
              "dob": {
                "date": this.$root.dateOfBirth
              },
              "status": {
                "label": this.$root.statuSelected
              },
              "dhf_status": {
                "label": this.$root.DHFstatuSelected
              },
              // dropdawn box is similar with status, the Monday.com label should be some with Workfolow Max.
              // There we choose text type.
              "device2": this.$root.device,
              "anatomy0": this.$root.anatomy,
              "pathology9": this.$root.pathology,
              "surgical_approach0": this.$root.sApproach,
              "surgeon": this.$root.client,
              "hospital": this.$root.hospital,
              "surgery_date": {
                "date": this.$root.sDate
              }
            })
          };
            fetch("https://api.monday.com/v2", {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.mondayAuthor
                },
                body: JSON.stringify({
                  'query': query,
                  'variables': JSON.stringify(vars)
                })
              })
              .then(res => res.json())
              .then(res => console.log(JSON.stringify(res, null, 2)));
        })
      }



  //Update status.
    // let query = 'mutation($columnVals: JSON!) {change_column_value (board_id: 732358871, item_id: 763955795, column_id: "status", value: $columnVals) {id}}'
  //   let vars = {
  //     "columnVals": JSON.stringify({
  //       "label": "Design",
  //     })
  //   };
  //   fetch("https://api.monday.com/v2", {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': this.mondayAuthor
  //       },
  //       body: JSON.stringify({
  //         'query': query,
  //         'variables': JSON.stringify(vars)
  //       })
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //     console.log(res)
  //     });
  //
  //   //Update DHFstatus.
  //   let query = 'mutation($columnVals: JSON!) {change_column_value (board_id: 732358871, item_id: 763955795, column_id: "dhf_status", value: $columnVals) {id}}'
  //   let vars = {
  //     "columnVals": JSON.stringify({
  //       "label": "Section 5 Complete",
  //     })
  //   };
  //   fetch("https://api.monday.com/v2", {
  //       method: 'post',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': this.mondayAuthor
  //       },
  //       body: JSON.stringify({
  //         'query': query,
  //         'variables': JSON.stringify(vars)
  //       })
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //     console.log(res)
  //     });
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
