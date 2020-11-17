<template>
<div class="jobDetail">
  <Header />
  <div class="detailPage">
    <label>Job Detail:</label>
    <table class="DetailTable table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th style="width:25%">Title</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Job ID</td>
          <td>{{this.$root.jobNum}}</td>

        </tr>
        <tr>
          <td>Client</td>
          <td>{{this.$root.client}}</td>
        </tr>
        <tr>
          <td>Patient Name</td>
          <td>{{this.$root.patient}}</td>
        </tr>
        <tr>
          <td>Date Of Birth</td>
          <td>{{this.$root.dateOfBirth}}</td>
        </tr>
        <tr>
          <td>Hospital</td>
          <td>{{this.$root.hospital}}</td>
        </tr>
        <tr>
          <td>Surgery Date</td>
          <td>{{this.$root.sDate}}</td>
        </tr>
        <tr>
          <td>Device Type</td>
          <td>{{this.$root.device}}</td>
        </tr>
        <tr>
          <td>Anatomy</td>
          <td>{{this.$root.anatomy}}</td>
        </tr>
        <tr>
          <td>Pathology</td>
          <td>{{this.$root.pathology}}</td>
        </tr>
        <tr>
          <td>Surgical Approach</td>
          <td>{{this.$root.sApproach}}</td>
        </tr>
        <tr>
          <td>Status</td>
          <td>{{this.$root.statusSelected}}</td>
        </tr>
        <tr>
          <td>DHF Status</td>
          <td>{{this.$root.DHFstatusSelected}}</td>
        </tr>
      </tbody>
    </table>
    <router-link v-bind:to="'/mainpage'" class="btn btn-primary">Back</router-link>
  </div>
</div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  name: 'Detail',
  beforeCreate: function() {
    document.body.className = 'detailPage'
  },
  components: {
    Header
  }
}
</script>

<style scoped>
.jobDetail {
  height: 100%;
}
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
  width: 200px;

  margin-left: 80%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
