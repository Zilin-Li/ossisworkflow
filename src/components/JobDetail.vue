<template>
<div class="detailPage">

  <label>Job Detail:</label>
  <table class="DetailTable table table-bordered">
    <thead class="thead-dark" >
      <tr>
        <th style="width:25%">Title</th>
        <th >Details</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Job No.</td>
        <td></td>
      </tr>
      <tr>
        <td>Surgenon</td>
        <td></td>
      </tr>
      <tr>
        <td>Patient Name</td>
        <td></td>
      </tr>
      <tr>
        <td>Patient DOB</td>
        <td></td>
      </tr>
      <tr>
        <td>Hospital</td>
        <td></td>
      </tr>
      <tr>
        <td>Surgery Date</td>
        <td></td>
      </tr>
      <tr>
        <td>Device Type</td>
        <td></td>
      </tr>
      <tr>
        <td>Anatomy</td>
        <td></td>
      </tr>
      <tr>
        <td>Pathology</td>
        <td></td>
      </tr>
      <tr>
        <td>JSurgical Approach</td>
        <td></td>
      </tr>
      <tr>
        <td>Status</td>
        <td></td>
      </tr>
      <tr>
        <td>DHF Status</td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <input type="button" value="Back" @click="" class="backBtn btn btn-primary">
</div>
</template>


<script>
export default {
  beforeCreate: function() {
    document.body.className = 'detailPage';
  }
}
</script>

<style scoped>
.detailPage {
  padding: 3% 10%;
  height: 100%;
}

label {
  padding-top: 10px;
}

table {
  background-color: white;
}

.btn {
  background-color: #1C3E50;
  border-radius: 25px;
  font-weight: bold;
  width:200px;

  margin-left: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
