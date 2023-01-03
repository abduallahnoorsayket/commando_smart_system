<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="recordsModal">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div v-if="project_name">{{project_name}}</div>
              <router-link
                :to="{ path: '/sprint-list',query:{project_id:projectID, version_id:versionID}  }"
                v-if="hasPermission('view_sprint')"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> Sprint List
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <projectNavbar />
        <EditSprintModal @load-sprint="SprintLoad" v-if="isEditModalVisible" />
        <AddFileModal @load-file="FileLoad" v-if="isFileAddModalVisible" />
        <EditFileModal @load-file="FileLoad" v-if="isFileEditModalVisible" />
        <div class="row mt-3" v-if="sprint_details">
          <div class="col-md-9">
            <div class="main-card card">
              <div class="detailContaier">
                <h5 class="overviewMarign mb-4">
                  <span v-if="sprint_details.sprint_name">{{sprint_details.sprint_name }}</span>

                  <div class="float-right">
                    <div class="btn-group dropleft">
                      <a
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="p-0 btn"
                      >
                        <i id="addIcon" class="nav-link-icon fas fa-ellipsis-v mr-2 float-right"></i>
                      </a>
                      <div
                        tabindex="-1"
                        role="menu"
                        aria-hidden="true"
                        class="dropdown-menu dropdown-menu-right"
                      >
                        <a
                          class="dropdown-item"
                          @click="OpenEditModal()"
                          v-if="hasPermission('change_sprint')"
                        >Edit</a>

                        <router-link
                          class="dropdown-item"
                          v-if="hasPermission('view_issue')"
                          :to="{
                            name: 'taskList',  query:queryString 
                          }"
                        >Tasks</router-link>
                        <!-- <router-link
                          class="dropdown-item"
                          :to="{ name: 'GanttChart', query: queryString}"
                        >Gantt Chart</router-link>-->
                        <a
                          href="#"
                          class="dropdown-item"
                          @click="loadGantt(queryString)"
                        >Gantt Chart</a>
                        <router-link
                          class="dropdown-item"
                          :to="{ name: 'Activities', query: queryString}"
                        >Activity</router-link>
                      </div>
                    </div>
                  </div>
                </h5>

                <div class="row">
                  <div class="col-md-12">
                    <div class="row">
                      <div class="col-md">
                        <label class="labelRightMargin">Status:</label>

                        <span v-if="sprint_details.status == 'PN'" class="badge badge-info">Pending</span>
                        <span
                          v-if="sprint_details.status == 'CM'"
                          class="badge badge-success"
                        >Completed</span>
                        <span
                          v-if="sprint_details.status == 'HO'"
                          class="badge badge-secondary"
                        >Handovered</span>
                        <span
                          v-if="sprint_details.status == 'RN'"
                          class="badge badge-primary"
                        >Running</span>
                        <br />
                        <label class="labelRightMargin">Current:</label>

                        <span v-if="sprint_details.is_current == false" class="currentColor">
                          <i class="fas fa-times-circle"></i>
                        </span>
                        <span v-else class="currentColor">
                          <i class="fas fa-check-circle"></i>
                        </span>
                        <br />
                        <label class="labelRightMargin">Expected start date:</label>
                        <span
                          v-if="sprint_details.expected_start_date"
                        >{{sprint_details.expected_start_date}}</span>
                        <br />
                        <!-- <label class="labelRightMargin">Start date:</label>
                        <span v-if="sprint_details.start_date">{{sprint_details.start_date}}</span>
                        <br />-->
                      </div>
                      <div class="col-md">
                        <label class="labelRightMargin">Expected end date:</label>
                        <span
                          v-if="sprint_details.expected_end_date"
                        >{{sprint_details.expected_end_date}}</span>
                        <br />
                        <!-- <label class="labelRightMargin">End date:</label>
                        <span v-if="sprint_details.end_date">{{sprint_details.end_date}}</span>
                        <br />-->
                        <label class="labelRightMargin">Expected hanover date:</label>
                        <span
                          v-if="sprint_details.expected_handover_date"
                        >{{sprint_details.expected_handover_date}}</span>
                        <br />
                        <!-- <label class="labelRightMargin">Hanover date:</label>
                        <span v-if="sprint_details.handover_date">{{sprint_details.handover_date}}</span>
                        <br />-->
                      </div>
                      <div class="col-md-3">
                        <!-- circular progress bar -->
                        <div
                          class="progress-circle"
                          :class="[sprint_Progress >50 ?'over50 p'+sprint_Progress : 'p'+sprint_Progress]"
                        >
                          <!-- <span
                            v-if="sprint_Progress  &&sprint_Progress != NaN"
                          >{{sprint_Progress+'%'}}</span>-->
                          <span
                            v-if="sprint_details.sprint_progress  &&sprint_details.sprint_progress != NaN"
                          >{{sprint_details.sprint_progress+'%'}}</span>
                          <span v-else>0%</span>
                          <div class="left-half-clipper">
                            <div class="first50-bar"></div>
                            <div class="value-bar"></div>
                          </div>
                        </div>
                        <!-- <span class="text-muted progressText ml-2">Sprint progress 50%</span> -->
                      </div>
                    </div>
                  </div>
                  <!-- <div class="col-md-2"></div> -->
                </div>
                <div class="row">
                  <div class="col-md">
                    <span class="badge badge-warning bageRightMargin">
                      Tasks
                      <span class="badge badge-light">{{sprint_details.total_issues}}</span>
                    </span>
                    <span class="badge badge-warning badge-todo bageRightMargin">
                      SubTasks
                      <span class="badge badge-light">{{sprint_details.total_sub_issue}}</span>
                    </span>
                  </div>
                </div>
                <br />
                <h6 class="descriptionTitle">Sprint Goal</h6>
                <p v-if="sprint_details.description">
                  <span v-html="sprint_details.description"></span>
                </p>
                <p v-else>
                  <br />
                  <span>No details found !</span>
                </p>
                <br />
                <!-- <br />
                <strong class="mb-2">Project Files:</strong>
                <br />
                <template v-for="(file, index) in form_data.files" :key="index">
                  <a :href="file.upload_files" class="btn btn-info ml-1">{{file.file_name}}</a>
                </template>-->
              </div>
            </div>
          </div>
          <!-- info card , files & Actions -->
          <div class="col-md-3">
            <div class="main-card Infocard">
              <div class="card-header">
                <h5 class="capitalizeNames infoText">
                  <i class="fas fa-info-circle"></i> Sprint Information
                </h5>
              </div>

              <div class="infoContaier">
                <p class="projectInfo">
                  <strong class="labelRightMargin">Project:</strong>
                  <span
                    v-if="sprint_details.version.project && sprint_details.version.project.project_name"
                  >{{sprint_details.version.project.project_name}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Version:</strong>
                  <span
                    v-if="sprint_details.version && sprint_details.version.version_name"
                  >{{sprint_details.version.version_name}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Total hours:</strong>
                  <span v-if="sprint_details.total_hour">{{sprint_details.total_hour}} H</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Start date:</strong>
                  <span v-if="sprint_details.start_date">{{sprint_details.start_date}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">End date:</strong>
                  <span v-if="sprint_details.end_date">{{sprint_details.end_date}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Hanover date:</strong>
                  <span v-if="sprint_details.handover_date">{{sprint_details.handover_date}}</span>
                </p>
                <!-- <p class="projectInfo">
                  <strong class="labelRightMargin">Spent Hours:</strong>
                  <span>18:50 Hours</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Duration:</strong>
                  <span>6 days</span>
                </p>-->
              </div>
            </div>
            <div class="main-card Infocard">
              <div class="card-header">
                <h5 class="capitalizeNames infoText">
                  <i class="fas fa-file-text"></i>Sprint Files
                </h5>
                <div class="float-right" v-if="hasPermission('add_file')">
                  <i class="fas fa-plus-circle" @click="OpenFileAddModal()"></i>
                </div>
              </div>

              <div class="infoContaier" v-if="sprint_details.files && hasPermission('view_file')">
                <p class="projectInfo" v-for="(file,index) in sprint_details.files" :key="index">
                  <i class="fas fa-file-pdf-o labelRightMargin"></i>
                  <a v-if="file.upload_files" :href="file.upload_files">
                    <span v-if="file.file_name" class="baseColorFont">{{file.file_name}}</span>
                  </a>
                  <span class="float-right">
                    <div class="btn-group dropright">
                      <a
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="p-0 btn"
                      >
                        <i class="nav-link-icon fa fa-cog actionMargin"></i>
                      </a>
                      <div
                        tabindex="-1"
                        role="menu"
                        aria-hidden="true"
                        class="dropdown-menu dropdown-menu-right"
                      >
                        <a
                          v-if="hasPermission('change_file')"
                          class="dropdown-item"
                          @click="OpenFileEditModal(file.id)"
                        >Edit</a>
                        <a
                          v-if="hasPermission('delete_file')"
                          class="dropdown-item"
                          @click="deleteFile(file.id)"
                        >Delete</a>
                      </div>
                    </div>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-9">
            <!-- Comments sections -->
            <Comments
              @load-comment="CommentLoad"
              v-if="sprint_response_ID"
              :comment_info="commentInfo"
              :ObejectID="sprint_response_ID"
              :contenType="contentType"
            />
          </div>
          <div class="col-md-3"></div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Master from "../../layouts/Master";
import EditSprintModal from "./EditSprintModal";
import Comments from "../../layouts/partials/projectRelated/Comments";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import AddFileModal from "../Files/AddFileModal.vue";
import EditFileModal from "../Files/EditFileModal .vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "SprintDetails",
  components: {
    Master,
    EditSprintModal,
    Comments,
    projectNavbar,
    AddFileModal,
    EditFileModal,
  },
  data() {
    return {
      queryString: {},
      form_data: null,
      sprint_details: null,
      sprint_response_ID: null,
      contentType: null,
      commentInfo: null,
      sprint_Progress: null,
      isUpdateVisible: false,
      update_attendance_id: null,
      searchName: null,
      all_clients: null,
      project_name: null,
      projectID: null,
      versionID: null,
      sprintID: null,
      // sprintId: 22,
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
    this.projectID = this.$route.query.project_id;
    this.versionID = this.$route.query.version_id;
    // this.sprintID = this.$route.query.sprint_id;
    this.sprintID = this.$route.query.sprint_id;
    console.log("347", this.projectID, this.versionID, this.sprintID);
    this.initialLoad();
    this.processQueryString();
  },
  computed: {
    isEditModalVisible() {
      return this.$store.state.projectRelated.SprintEditModalVisible;
    },
    // file
    isFileAddModalVisible() {
      return this.$store.state.projectRelated.FileAddModalVisible;
    },
    isFileEditModalVisible() {
      return this.$store.state.projectRelated.FileEditModalVisible;
    },
  },
  methods: {
    loadGantt(queryString) {
      if (
        queryString.project_id &&
        queryString.version_id &&
        queryString.sprint_id
      ) {
        window.location.href =
          "/gantt-chart?project_id=" +
          queryString.project_id +
          "&version_id=" +
          queryString.version_id +
          "&sprint_id=" +
          queryString.sprint_id;
      } else if (queryString.project_id && queryString.sprint_id) {
        window.location.href =
          "/gantt-chart?project_id=" +
          queryString.project_id +
          "&sprint_id=" +
          queryString.sprint_id;
      }
    },
    OpenEditModal() {
      this.$store.commit("projectRelated/toggleSprintEditModal", this.sprintID);
    },
    // file
    OpenFileAddModal() {
      this.$store.commit("projectRelated/toggleFileAddModal", {
        content_Type: this.contentType,
        object_id: this.sprint_response_ID,
      });
    },
    OpenFileEditModal(id) {
      this.$store.commit("projectRelated/toggleFileEditModal", {
        object_id: this.sprint_response_ID,
        file_id: id,
      });
    },
    initialLoad: function () {
      this.getProjectDeatails();
      this.getSprintDetails();
    },
    processQueryString() {
      // this.projectID = this.$route.query.project_id;
      // this.versionID = this.$route.query.version_id;
      // this.sprintID = this.$route.query.sprint_id;
      if (this.projectID) {
        this.queryString["project_id"] = this.projectID;
      }
      if (this.versionID) {
        this.queryString["version_id"] = this.versionID;
      }
      if (this.sprintID) {
        this.queryString["sprint_id"] = this.sprintID;
      }
    },
    async SprintLoad() {
      // this.subtask_response_ID = null;
      await this.getSprintDetails();
    },
    async CommentLoad() {
      this.sprint_response_ID = null;
      await this.getSprintDetails();
    },
    async FileLoad() {
      console.log("480--- fileload");
      await this.getSprintDetails();
    },
    deleteFile: function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("files/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.getSprintDetails();
            }
          });
          Swal.fire("Deleted!", "Your file has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Your file has not been deleted !", "error");
        }
      });
    },
    // getSprintDetails
    getSprintDetails() {
      axios.get("sprints/" + this.sprintID + "/").then(
        // axios.get("sprints/1/").then(
        (response) => {
          this.sprint_details = response.data;
          this.sprint_response_ID = response.data.id;
          this.contentType = response.data.content_type;
          this.commentInfo = response.data.comment;
          this.sprint_Progress = parseInt(response.data.sprint_progress);

          console.log("----sprint_details---", this.sprint_details);
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    getProjectDeatails: function () {
      axios.get("projects/" + this.projectID + "/").then(
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
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
/* icons */
.fa-history:before {
  content: "\f1da";
  cursor: pointer;
  padding: 10px 10px 10px 0px;
  color: white;
}
.card-header {
  align-items: center;
}
/* circular progress */
.progress-circle.p10 .value-bar {
  transform: rotate(180deg);
}
.fa-gear:before,
.fa-cog:before {
  content: "\f013";
  color: #69c5a5;
}
.currentColor {
  font-size: 15px;
}
</style>