<template>
  <div v-if="project_name">{{project_name}}</div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProjectName",
  props: ["project_ID"],

  data() {
    return {
      project_name: null,
      project_received_ID: null,
    };
  },
  created() {
    this.project_received_ID = this.$props.project_ID;
    // this.projectID = this.$route.query.project_id;
    // this.versionID = this.$route.query.version_id;
    // this.sprintID = this.$route.query.sprint_id;
    // this.taskID = this.$route.query.id;
    // console.log(
    //   "472",
    //   this.projectID,
    //   this.versionID,
    //   this.sprintID,
    //   this.taskID
    // );
    this.initialLoad();
  },
  methods: {
    initialLoad: function () {
      this.getProjectDeatails();
    },
    getProjectDeatails: function () {
      axios.get("projects/" + this.project_received_ID + "/").then(
        (response) => {
          // this.form_data = response.data;
          this.project_name = response.data.project_name;

          // this.form_data.leave_type = this.form_data.leave_type.id;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
  },
};
</script>

<style>
</style>