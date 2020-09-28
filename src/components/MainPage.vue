<template>
<div class="mainPage">

  <div class="searchBar">
    <label>Job Number:</label>
    <input v-model="searchNum" class="inputBox form-control" type="text" placeholder="Enter job number">
    <input type="button" value="Search" @click="searchJob" class="searchBtn btn btn-primary">
  </div>


  <!-- searchNum must be int -->
  <!-- <p>{{searchNum}}</p>
  <p>{{selected}}</p> -->

  <p>{{info}}</p>
  <!-- <button @click="getInfo">点击获取数据</button> -->

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
        <td> <a href="/jobdetail">{{jobNum}}</a> </td>
        <td>{{client}}</td>
        <td>{{patient}}</td>
        <td>
          <select v-model="selected" class="form-control" id="exampleFormControlSelect1">
            <option>Awaiting Surgeon Sign Off</option>
            <option>Segmentation</option>
            <option>Design</option>
            <option>Design review</option>
            <option>Design Signed Off</option>
          </select>
        </td>
        <td>
          <select class="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="btnOptions">
    <input type="button" value="Sync Data To Monday.com" @click="syncToMonday" class="syncBtn btn btn-primary">
    <input type="button" value="Update Status" @click="updateStatus" class="updateBtn btn btn-primary">
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
      searchNum: null,
      jobNum: null,
      client: "clientName",
      patient: "patientName",
      selected: '',
      dateOfBirth: '',
      status: '',
      statusOfDhf: '',
      device: '',
      anatomy: '',
      pathology: '',
      sApproach: '',
      surgeon: '',
      hospital: '',
      sDate: '',
      info: null,
      mondayAuthor: 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjc4MTY5MzcwLCJ1aWQiOjE1NjM4NDA4LCJpYWQiOiIyMDIwLTA5LTEwVDIxOjE0OjMwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.JrO-C3NiSJ-vLhmCg0v1N4muBxiYH-wRSTDIWXxgibA',
      statusId: 'status',
      dhfStatusID: 'dhf_status',
      itemId: null
    }
  },



  methods: {
    searchJob() {
      this.jobNum = this.searchNum,
        this.selected = "Design"
      //1. sent request to workflowMax with job number
      //--default value
      //--client value
      //2. find out the data user need
      //3.display
    },

    // getInfo() {
    //   //test sent request to Monday.com
    //   let query = '{ boards (limit:5) {name id} }';
    //
    //   fetch("https://api.monday.com/v2", {
    //       method: 'post',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': this.mondayAuthor
    //       },
    //       body: JSON.stringify({
    //         'query': query
    //       })
    //     })
    //     .then(res => res.json())
    //     .then(res => this.info = JSON.stringify(res, null, 2));
    // },

    syncToMonday() {
////Creat item to Monday
        // let query5 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id: 732358871,item_name:$myItemName, column_values:$columnVals) { id } }';
        // let vars = {
        //   "myItemName": "test!",
        //   "columnVals": JSON.stringify({
        //     "status": {
        //       "label": "Design"
        //     }
        //   })
        // };
        //
        //
        // fetch("https://api.monday.com/v2", {
        //     method: 'post',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization': this.mondayAuthor
        //     },
        //     body: JSON.stringify({
        //       'query': query5,
        //       'variables': JSON.stringify(vars)
        //     })
        //   })
        //   .then(res => res.json())
        //   .then(res => console.log(JSON.stringify(res, null, 2)));
      // let query = 'mutation($columnVals: JSON!) {creat_item (board_id: 732358871, group_id:\"topics\", item_name: \"test\", column_values: $columnVals) {id}}'
      // let vars = {
      //   "columnVals": JSON.stringify({
      //     "text4": "User1",
      //     // "date_14":2016-1-2,
      //     "label": "Design",
      //   })
      // };
      // fetch("https://api.monday.com/v2", {
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': this.mondayAuthor
      //     },
      //     body: JSON.stringify({
      //       'query': query,
      //       'variables': JSON.stringify(vars)
      //     })
      //   })
      //   .then(res => res.json())
      //   .then(res => {
      //     console.log(res)
      //   });

    },
    updateStatus() {
      ////Check whether the jobID is exist.
      // let query = '{ items_by_column_values(board_id: 732358871, column_id: "name", column_value: "60545", state: active) {id name}}';
      //
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
      //     this.info = res.data.items_by_column_values
      //     this.itemId = this.info[0].id
      //     //if the length==1,means the id is exist.if length==0, means the id is not exist.
      //     // console.log(this.info.length)
      //     console.log(this.info[0].id)
      //   });

      // job id does not exist


      ////job Id exist

      ////Update status.
      // let query = 'mutation($columnVals: JSON!) {change_column_value (board_id: 732358871, item_id: 763955795, column_id: "status", value: $columnVals) {id}}'
      // let vars = {
      //   "columnVals": JSON.stringify({
      //     "label": "Design",
      //   })
      // };
      // fetch("https://api.monday.com/v2", {
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': this.mondayAuthor
      //     },
      //     body: JSON.stringify({
      //       'query': query,
      //       'variables': JSON.stringify(vars)
      //     })
      //   })
      //   .then(res => res.json())
      //   .then(res => {
      //   console.log(res)
      //   });

      ////Update DHFstatus.
      // let query = 'mutation($columnVals: JSON!) {change_column_value (board_id: 732358871, item_id: 763955795, column_id: "dhf_status", value: $columnVals) {id}}'
      // let vars = {
      //   "columnVals": JSON.stringify({
      //     "label": "Section 5 Complete",
      //   })
      // };
      // fetch("https://api.monday.com/v2", {
      //     method: 'post',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': this.mondayAuthor
      //     },
      //     body: JSON.stringify({
      //       'query': query,
      //       'variables': JSON.stringify(vars)
      //     })
      //   })
      //   .then(res => res.json())
      //   .then(res => {
      //   console.log(res)
      //   });
    }
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
