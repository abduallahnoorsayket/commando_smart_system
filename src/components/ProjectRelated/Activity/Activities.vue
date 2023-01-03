<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <ProjectName :project_ID="projectID" />
              <div>
                <div>
                  <router-link v-if="hasPermission('view_project')" :to="{ path: '/project-list' }">
                    <a class="float" style="position: absolute; right: 0">
                      <button type="button" class="btn btn-successs" style="font-size: 15px">
                        <span class="fas fa-list"></span> Project List
                      </button>
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <projectNavbar /> -->
        <ViewActivityModal v-if="isModalVisible" />
        <!-- activity new design -->
        <div class="mt-4">
          <div
            class="activity-timeline-container"
            v-if="activity_form_data && activity_form_data.length >0"
          >
            <div class="timeline" v-if="organised_data">
              <!-- <div class="timeline-month">January</div> -->
              <div class="timeline-month" v-if="taskID">Task Activities</div>
              <div class="timeline-month" v-else-if="sprintID">Sprint Activities</div>
              <div class="timeline-month" v-else-if="versionID">Version Activities</div>
              <div class="timeline-month" v-else-if="projectID">Project Activities</div>
              <div
                class="timeline-section"
                v-for="(acitivity,index) in organised_data"
                :key="index"
              >
                <div class="timeline-date">
                  <i class="fas fa-calendar"></i>
                  <span v-if="index">{{index}}</span>
                </div>

                <div class="row">
                  <template v-if="index">
                    <div class="col-sm-4" v-for="(act,id) in acitivity" :key="id">
                      <div class="timeline-box">
                        <div class="box-title">
                          <i class="fa fa-history" aria-hidden="true"></i>
                          <span v-if="act.subject">{{ act.subject}}</span>
                        </div>
                        <div class="box-content">
                          <button
                            type="button"
                            class="btn btn-successs pull-right btnPadding"
                            style
                            @click="OpenModal(act.id)"
                          >Details</button>
                          <!-- <div class="box-item">
                            <strong class="labelMargin">SubTask ID:</strong>
                            <span v-if="act.sub_issue_id">{{ act.sub_issue_id}}</span>
                          </div> -->
                          <div class="box-item">
                            <strong class="labelMargin">Working hour:</strong>
                            <span>{{ act.working_hour}}H</span>
                          </div>

                          <div class="box-item">
                            <strong class="labelMargin">SubTask status:</strong>
                            <span v-if="act.status == 'assigned'" class="badge badge-info">Assigned</span>
                            <span v-if="act.status == 'done'" class="badge badge-success">Done</span>
                            <span v-if="act.status == 'pause'" class="badge badge-warning">Pause</span>
                            <span v-if="act.status == 'running'" class="badge badge-primary">Running</span>
                            <span
                              v-if="act.status == 'problematic'"
                              class="badge badge-danger"
                            >Problematic</span>
                          </div>

                          <div class="row progresssMarign">
                            <div class="col-sm-5">
                              <div class="FinalIssue">
                                <strong class="labelMargin">Progress:</strong>
                                <span v-if="act.progress == null">0%</span>
                                <span v-else>{{act.progress}}%</span>
                              </div>
                            </div>
                            <div class="col-sm-7 colMargin">
                              <div class="progress" style="height: 11px;">
                                <div
                                  class="progress-bar"
                                  role="progressbar"
                                  aria-valuenow="40"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                  :style="{'width': `${act.progress}%`}"
                                >{{act.progress}}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="box-footer">
                          <i class="fa fa-user" aria-hidden="true"></i>
                          <span
                            v-if=" act.assignee.first_name && act.assignee.last_name"
                          >{{ act.assignee.first_name +" "+ act.assignee.last_name }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="alert alert-success" role="alert">No Data Found!</div>
        </div>
        <!-- tree  previus design-->
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Master from "../../layouts/Master";
import ViewActivityModal from "./ViewActivityModal";
import ProjectName from "../../layouts/partials/projectRelated/ProjectName.vue";
import permissions from "../../../authorization/permissions";
// import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
// import "../authheader";

export default {
  name: "Activities",
  components: {
    Master,
    ViewActivityModal,
    ProjectName,
    //  projectNavbar
  },
  data() {
    return {
      activity_form_data: null,
      projectID: null,
      versionID: null,
      sprintID: null,
      taskID: null,
      sub_issue_id: null,
      filterIssue: null,
      all_assignee: null,
      progressPercent: null,
      all_activity: [],
      all_task_activity: [],
      organised_data: {},
      issueObject: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },

  created() {
    this.taskID = this.$route.query.task_id;
    this.sprintID = this.$route.query.sprint_id;
    this.versionID = this.$route.query.version_id;
    this.projectID = this.$route.query.project_id;
    this.initialLoad();
    console.log("created");
  },
  updated() {
    this.initialLoad();
    console.log("updated");
    this.organised_data = {};
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.ActivityModalVisible;
    },
  },

  methods: {
    initialLoad: function () {
      this.loadActivity();
      // if (this.taskID) {
      //   this.loadTaskActivity();
      // }
      // if (this.sprintID) {
      //   this.loadSprintActivity();
      // }
      // if (this.versionID) {
      //   // this.loadVersionGanttChart();
      // }
      // if (this.projectID) {
      //   // this.loadProjectGanttChart();
      // }
    },

    OpenModal(id) {
      this.$store.commit("projectRelated/toggleActivityModal", id);
    },
    //  task actvity
    // loadTaskActivity() {
    //   this.all_activity = [];
    //   axios
    //     // .get("sub-issues/" + this.taskID + "/", {})
    //     .get("sub-issues/")
    //     .then((response) => {
    //       this.task_activity_form_data = response.data.results;
    //       this.all_activity = response.data.issue_sub_issue;
    //       console.log("538=========/////////////", this.all_activity);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },
    //  task actvity date wise
    loadActivity() {
      this.all_activity = [];
      var queryParam = {
        issue: this.taskID,
        sprint: this.sprintID,
        version: this.versionID,
        project: this.projectID,
      };
      axios
        .get("activities/", {
          params: queryParam,
        })
        .then((response) => {
          this.activity_form_data = response.data;
          // this.all_task_activity = response.data.issue_sub_issue;
          console.log("293=========/////////////", this.all_task_activity);
          this.activity_form_data.map((x) => {
            if (
              Object.prototype.hasOwnProperty.call(
                this.organised_data,
                x.updated_at
              )
            ) {
              this.organised_data[x.updated_at].push(x);
              // this.newAttdanceList.push(this.organised_data[resultdate]);
            } else {
              this.organised_data[x.updated_at] = [x];
            }

            console.log("303////////", this.organised_data);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
  // end of Methods
};
</script>
<style scoped>
.row {
  /* text-align: center; */
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin-bottom: 8px;
}

.card {
  margin-top: 30px;
  padding-top: 30px;
  margin-bottom: 30px;
}

.card-content p {
  padding-bottom: 3px;
}
.nav-item {
  margin: 0px 30px;
}
hr {
  height: 1px;
  background-color: #dcdcdc;
  border: none;
  /* margin-bottom: 20px; */
  margin: 0px 10px;
}
/* card tree */

/* .calenderIcon{
  margin-right:px;
} */
/* new Css  */
.fa-calendar:before {
  content: "\f133";
  color: #ffffff;
  font-size: 14px;
  margin-right: 5px;
}

.fa-history:before {
  content: "\f1da";
  cursor: pointer;
  padding: 10px 5px 10px 0px;
  color: #ffffff;
}
.btnPadding {
  padding: 2px 10px;
}
.box-item {
  margin-bottom: 3px;
}
.progresssMarign {
  margin-top: 7px;
}
.colMargin {
  margin-top: 7px;
}
</style>
