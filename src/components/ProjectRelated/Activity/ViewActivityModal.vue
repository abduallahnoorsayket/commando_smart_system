<template>
  <teleport to="body">
    <div v-if="isModalVisible" class="modal">
      <div class="modal-dialog" v-if="activity_details">
        <div class="modal-content">
          <div class="card-header">
            <p
              class="float-left capitalizeNames"
              v-if="activity_details.subject"
            >{{activity_details.subject}}</p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="subissue-modal">
                  <div class="row mb-2">
                    <div class="col-md-12 mb-2">
                      <strong>Task name:</strong>

                      <span
                        v-if="activity_details.issue.subject"
                      >{{ activity_details.issue.subject}}</span>
                    </div>
                    <div class="col-md-12 mb-2">
                      <strong>Task ID:</strong>
                      <span
                        v-if=" activity_details.issue.issue_id"
                      >{{ activity_details.issue.issue_id}}</span>
                    </div>
                    <div class="col-md-12">
                      <strong>SubTask ID:</strong>
                      <span
                        v-if=" activity_details.sub_issue_id"
                      >{{ activity_details.sub_issue_id}}</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <strong>Created by:</strong>
                      <span
                        v-if=" activity_details.assignee.first_name && activity_details.assignee.last_name"
                      >{{ activity_details.assignee.first_name +" "+ activity_details.assignee.last_name }}</span>
                    </div>
                    <div class="col-md-4">
                      <strong>Priority:</strong>
                      <span
                        v-if="activity_details.work_priority.name"
                      >{{activity_details.work_priority.name}}</span>
                    </div>
                    <div class="col-md-4">
                      <strong>Work type:</strong>
                      <span
                        v-if="activity_details.work_type.name"
                      >{{activity_details.work_type.name}}</span>
                    </div>
                  </div>
                  <!-- <div class="row mb-2">
                    <div class="col-md-4">
                      <strong>Task previous done:</strong> 10%
                    </div>
                    <div class="col-md-4">
                      <strong>Task finishing done:</strong> 40%
                    </div>
                    <div class="col-md-4 mb-7">
                      <strong>Progress:</strong>
                      {{activity_details.progress}}
                    </div>
                  </div>-->
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <strong>Progress:</strong>

                      <span v-if="activity_details.progress == null">0%</span>
                      <span v-else>{{activity_details.progress}}%</span>
                    </div>
                    <div class="col-sm-8 mt-1">
                      <div class="progress" style="height: 12px;">
                        <div
                          class="progress-bar"
                          role="progressbar"
                          aria-valuenow="40"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          :style="{'width': `${activity_details.progress}%`}"
                        >{{activity_details.progress}}%</div>
                      </div>

                      <!-- <div class="progress progress-sm progress-striped active">
                        <div
                          class="progress-bar bg-info"
                          data-toggle="tooltip"
                          :data-original-title="all_activity.progress"
                          :style="{'width': `${all_activity.progress}%`}"
                        >{{all_activity.progress + '%'}}</div>
                      </div>-->
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <strong>SubTask Status:</strong>

                      <span
                        v-if="activity_details.status == 'assigned'"
                        class="badge badge-info"
                      >Assigned</span>
                      <span
                        v-if="activity_details.status == 'done'"
                        class="badge badge-success"
                      >Done</span>
                      <span
                        v-if="activity_details.status == 'pause'"
                        class="badge badge-warning"
                      >Pause</span>
                      <span
                        v-if="activity_details.status == 'running'"
                        class="badge badge-primary"
                      >Running</span>
                      <span
                        v-if="activity_details.status == 'problematic'"
                        class="badge badge-danger"
                      >Problematic</span>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <strong>Working hour:</strong>
                      <span v-if="activity_details.working_hour">{{activity_details.working_hour}} M</span>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-md-12">
                      <strong>Work Description:</strong>
                      <p v-if="activity_details.description">
                        <span v-html="activity_details.description"></span>
                      </p>
                      <p v-else>
                        <br />
                        <span>No details found !</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="float-right ml-2 btn btn-base" @click="CloseModal()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
// import Swal from "sweetalert2";
// import permissions from "../../../../../authorization/permissions";
export default {
  name: "ViewActivityModal",

  data() {
    return {
      activity_id: null,
      all_activity: null,
      activity_details: null,
      modalOpen: false,
      AddAttendance_error: {
        attendance_datetime: null,
        employee: null,
        login_time: null,
        breakin_time: null,
        breakout_time: null,
        logout_time: null,
        remarks: null,
        cost: null,
      },
    };
  },
  created() {
    this.activity_id = this.$store.state.projectRelated.actvityId;
    // this.activity_id = this.$props.employee_id.sub_issue_id;
    // this.isModalVisible = this.$props.employee_id.isModalVisible;
    this.initialLoad();
    console.log(" view  activity created");
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.ActivityModalVisible;
    },
  },

  methods: {
    CloseModal() {
      this.$store.commit("projectRelated/toggleActivityModal");
    },
    initialLoad: function () {
      this.loadActivitydDetails();
    },

    loadActivitydDetails() {
      axios
        .get("sub-issues/" + this.activity_id + "/", {
        })
        .then((response) => {
          this.activity_details = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
</style>