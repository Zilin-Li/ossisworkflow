<template>
<div class="mainPage">

  <div class="searchBar">
    <label>Job Number:</label>
    <input v-model="searchNum" class="inputBox form-control" type="text" placeholder="Enter job number">
    <input type="button" value="Search" @click="searchJob" class="searchBtn btn btn-primary">
  </div>
  <!-- searchNum must be int -->
  <p>{{searchNum}}</p>
  <p>{{selected}}</p>

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
    <input type="button" value="Sync Data To Monday.com" @click="" class="syncBtn btn btn-primary">
    <input type="button" value="Update Status" @click="" class="updateBtn btn btn-primary">
  </div>

</div>
</template>


<script>
export default {
  beforeCreate: function() {
       document.body.className = 'mainPage';
   },
   data() {
     return{
       searchNum:null,
       jobNum:null,
       client:"clientName",
       patient:"patientName",
       selected: ''
     }

   },
   methods:{
     searchJob(){
       this.jobNum = this.searchNum,
       this.selected = "Design"
       //1. sent request to workflowMax with job number
       //--default value
       //--client value
       //2. find out the data user need
       //3.display

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
