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
              <!-- <div v-if="project_name">{{project_name}}</div> -->
              <ProjectName :project_ID="projectID" />
              <router-link
                :to="{ path: '/version-list', query:{project_id:projectID}  }"
                v-if="hasPermission('view_version')"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> Version List
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>

        <projectNavbar />
        <EditVersionModal @load-version="VersionLoad" v-if="isEditModalVisible" />
        <AddFileModal @load-file="FileLoad" v-if="isFileAddModalVisible" />
        <EditFileModal @load-file="FileLoad" v-if="isFileEditModalVisible" />
        <div class="row mt-3" v-if="version_details">
          <div class="col-md-9">
            <div class="main-card card">
              <div class="detailContaier">
                <h5 class="overviewMarign mb-4">
                  <span v-if="version_details.version_name">{{version_details.version_name}}</span>
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
                          v-if="hasPermission('change_version')"
                          class="dropdown-item"
                          @click="OpenEditModal()"
                        >Edit</a>

                        <router-link
                          v-if="hasPermission('view_sprint')"
                          class="dropdown-item"
                          :to="{
                            name: 'SprintList', query: queryString
                          }"
                        >Sprints</router-link>
                        <!-- <router-link
                          class="dropdown-item"
                          :to="{ name: 'GanttChart', query:queryString }"
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
                        <span v-if="version_details.status == 'PN' ">
                          <span class="badge badge-info">Pending</span>
                        </span>
                        <span v-if="version_details.status == 'RN' ">
                          <span class="badge badge-primary">Running</span>
                        </span>
                        <span v-if="version_details.status == 'CM' ">
                          <span class="badge badge-success">Completed</span>
                        </span>
                        <span v-if="version_details.status == 'PP' ">
                          <span class="badge badge-danger">Postpoend</span>
                        </span>
                        <span v-if="version_details.status == 'HO' ">
                          <span class="badge badge-secondary">Handovered</span>
                        </span>
                        <br />
                        <label class="labelRightMargin">Current:</label>
                        <span v-if="version_details.is_current == false" class="currentColor">
                          <!-- <i class="fas fa-window-close"></i> -->
                          <i class="fas fa-times-circle"></i>
                        </span>

                        <!-- "/task-details?project_id=" +project.id+"&task_id=" + task.id; -->
                        <span v-else class="currentColor">
                          <i class="fas fa-check-circle"></i>
                        </span>
                        <br />
                        <label class="labelRightMargin">Expected start date:</label>
                        <span
                          v-if="version_details.expected_start_date"
                        >{{version_details.expected_start_date}}</span>
                        <br />

                        <!-- <label class="labelRightMargin">Version URL:</label>
                        <a href>http://evdata.testenvs.com/projectOverview/65</a>
                        <br />-->
                        <br />
                      </div>
                      <div class="col-md">
                        <label class="labelRightMargin">Expected end date:</label>
                        <span
                          v-if="version_details.expected_end_date"
                        >{{version_details.expected_end_date}}</span>
                        <br />
                        <label class="labelRightMargin">Expected handover date:</label>
                        <span
                          v-if="version_details.expected_handover_date"
                        >{{version_details.expected_handover_date}}</span>
                        <br />
                        <!-- <label class="labelRightMargin">End date:</label>30-07-2020
                        <br />-->
                        <!-- <label class="labelRightMargin">Released date:</label>15-08-2020
                        <br />-->
                      </div>
                      <div class="col-md-3">
                        <!-- circular progress bar -->
                        <div
                          class="progress-circle"
                          :class="[version_Progress >50 ?'over50 p'+version_Progress : 'p'+version_Progress]"
                        >
                          <!-- <span
                            v-if="version_Progress  &&version_Progress != NaN"
                          >{{version_Progress+'%'}}</span>-->
                          <span
                            v-if="version_details.version_progress  &&version_details.version_progress != NaN"
                          >{{version_details.version_progress+'%'}}</span>
                          <span v-else>0%</span>
                          <div class="left-half-clipper">
                            <div class="first50-bar"></div>
                            <div class="value-bar"></div>
                          </div>
                        </div>
                        <!-- <span class="text-muted progressText ml-2">Version progress 50%</span> -->
                      </div>
                    </div>
                  </div>
                  <!-- <div class="col-md-2"></div> -->
                </div>
                <div class="row">
                  <div class="col-md">
                    <span class="badge badge-primary bageRightMargin">
                      Sprints
                      <span class="badge badge-light">{{version_details.total_sprint}}</span>
                    </span>
                    <span class="badge badge-warning bageRightMargin">
                      Tasks
                      <span class="badge badge-light">{{version_details.total_task}}</span>
                    </span>
                    <span class="badge badge-warning badge-todo bageRightMargin">
                      SubTasks
                      <span class="badge badge-light">{{version_details.total_sub_task}}</span>
                    </span>
                  </div>
                </div>

                <br />
                <h6 class="descriptionTitle">Description</h6>
                <p v-if="version_details.description">
                  <span v-html="version_details.description"></span>
                </p>
                <br />
              </div>
            </div>
          </div>
          <!-- info card , files & Actions -->
          <div class="col-md-3">
            <div class="main-card Infocard">
              <div class="card-header">
                <h5 class="capitalizeNames infoText">
                  <i class="fas fa-info-circle"></i>Version Information
                </h5>
              </div>

              <div class="infoContaier">
                <p class="projectInfo">
                  <strong class="labelRightMargin">Project:</strong>
                  <span
                    v-if="version_details.project && version_details.project.project_name"
                  >{{version_details.project.project_name}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Start date:</strong>
                  <span v-if="version_details.start_date">{{version_details.start_date}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">End date:</strong>
                  <span v-if="version_details.end_date">{{version_details.end_date}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Hanover date:</strong>
                  <span v-if="version_details.handover_date">{{version_details.handover_date}}</span>
                </p>
              </div>
            </div>

            <div class="main-card Infocard">
              <div class="card-header">
                <h5 class="capitalizeNames infoText">
                  <i class="fas fa-file-text"></i>Version Files
                </h5>
                <div class="float-right" v-if="hasPermission('add_file')">
                  <i class="fas fa-plus-circle" @click="OpenFileAddModal()"></i>
                </div>
              </div>
              <div class="infoContaier" v-if="version_details.files && hasPermission('view_file')">
                <p class="projectInfo" v-for="(file,index) in version_details.files" :key="index">
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
                          class="dropdown-item"
                          v-if="hasPermission('change_file')"
                          @click="OpenFileEditModal(file.id)"
                        >Edit</a>
                        <a
                          class="dropdown-item"
                          v-if="hasPermission('delete_file')"
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
              v-if="version_response_ID"
              :comment_info="commentInfo"
              :ObejectID="version_response_ID"
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
import EditVersionModal from "./EditVersionModal";
import Comments from "../../layouts/partials/projectRelated/Comments";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import ProjectName from "../../layouts/partials/projectRelated/ProjectName.vue";
import AddFileModal from "../Files/AddFileModal.vue";
import EditFileModal from "../Files/EditFileModal .vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "VersionDetails",
  components: {
    Master,
    EditVersionModal,
    Comments,
    AddFileModal,
    EditFileModal,
    projectNavbar,
    ProjectName,
  },
  data() {
    return {
      queryString: {},
      version_details: null,
      version_response_ID: null,
      contentType: null,
      commentInfo: null,
      version_Progress: null,
      project_name: null,
      //
      form_data: null,
      isUpdateVisible: false,
      update_attendance_id: null,
      searchName: null,
      all_clients: null,
      projectID: null,
      versionID: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },
  computed: {
    isEditModalVisible() {
      return this.$store.state.projectRelated.VersionEditModalVisible;
    },
    // file
    isFileAddModalVisible() {
      return this.$store.state.projectRelated.FileAddModalVisible;
    },
    isFileEditModalVisible() {
      return this.$store.state.projectRelated.FileEditModalVisible;
    },
  },
  created() {
    this.projectID = this.$route.query.project_id;
    // this.versionID = this.$route.query.version_id;
    // this.sprintID = this.$route.query.sprint_id;
    this.versionID = this.$route.query.version_id;
    // console.log(
    //   "472",
    //   this.projectID,
    //   this.versionID,
    //   this.sprintID,
    //   this.taskID
    // );
    this.initialLoad();
    this.processQueryString();
  },
  methods: {
    loadGantt(queryString) {
      window.location.href =
        "/gantt-chart?project_id=" +
        queryString.project_id +
        "&version_id=" +
        queryString.version_id;
    },
    OpenEditModal() {
      this.$store.commit(
        "projectRelated/toggleVersionEditModal",
        this.versionID
      );
    },
    OpenFileAddModal() {
      this.$store.commit("projectRelated/toggleFileAddModal", {
        content_Type: this.contentType,
        object_id: this.version_response_ID,
      });
    },
    OpenFileEditModal(id) {
      this.$store.commit("projectRelated/toggleFileEditModal", {
        object_id: this.version_response_ID,
        file_id: id,
      });
    },
    initialLoad: function () {
      this.GetVersionDetails();
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
    async VersionLoad() {
      // this.subtask_response_ID = null;
      await this.GetVersionDetails();
    },
    async CommentLoad() {
      this.version_response_ID = null;
      await this.GetVersionDetails();
    },
    async FileLoad() {
      await this.GetVersionDetails();
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
              this.GetVersionDetails();
            }
          });
          Swal.fire("Deleted!", "Your file has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Your file has not been deleted !", "error");
        }
      });
    },
    GetVersionDetails() {
      axios.get("versions/" + this.versionID + "/").then((response) => {
        // axios.get("versions/2/").then((response) => {
        this.version_details = response.data;
        this.version_response_ID = response.data.id;
        this.contentType = response.data.content_type;
        this.commentInfo = response.data.comment;
        this.version_Progress = parseInt(response.data.version_progress);

        // console.log(
        //   " comment lentgth",
        //   this.contentType,
        //   this.task_response_ID
        // );

        console.log(response.status);
      });
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
/* new css for version overview*/
.fa-info:before {
  content: "\f129";
  padding: 10px 6px 10px 0px;
}
.card-header {
  align-items: center;
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