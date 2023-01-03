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
              <div v-if="project_name">{{project_name}}</div>
              <router-link
                v-if="hasPermission('view_issue')"
                :to="{ path: '/task-list',query: {project_id:projectID, version_id:versionID, sprint_id:sprintID} }"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> Task List
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <projectNavbar />
        <AddFileModal @load-file="FileLoad" v-if="isAddModalVisible" />
        <EditFileModal @load-file="FileLoad" v-if="isEditModalVisible" />
        <div class="row mt-3" v-if="task_details">
          <div class="col-md-9">
            <div class="main-card card">
              <div class="detailContaier">
                <h5 class="overviewMarign mb-4">
                  <span v-if="task_details.subject">{{task_details.subject}}</span>
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
                        <router-link
                          v-if="hasPermission('change_issue')"
                          class="dropdown-item"
                          :to="{
                            name: 'UpdateTask',query: queryString
                          }"
                        >Edit</router-link>

                        <router-link
                          v-if="hasPermission('view_subissue')"
                          class="dropdown-item"
                          :to="{ name: 'SubTasksList', query: queryString }"
                        >SubTasks</router-link>
                        <!-- <router-link
                          class="dropdown-item"
                          :to="{ name: 'GanttChart', query: queryString }"
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
                        <label class="labelRightMargin">Privacy Status:</label>
                        <span v-if="task_details.privacy_status == 'Pub' ">
                          <span class="badge badge-success">Public</span>
                        </span>
                        <span v-if="task_details.privacy_status == 'Pri' ">
                          <span class="badge badge-info">Private</span>
                        </span>
                        <span v-if="task_details.privacy_status == 'Oth' ">
                          <span class="badge badge-secondary">Others</span>
                        </span>
                        <br />
                        <label class="labelRightMargin">Created by:</label>
                        <span
                          v-if="Current_user && Current_user.first_name &&Current_user.last_name"
                        >{{Current_user.first_name+" "+Current_user.last_name }}</span>
                        <br />
                        <label class="labelRightMargin">Work type:</label>
                        <span
                          v-if="task_details.work_type && task_details.work_type.name"
                        >{{ task_details.work_type.name}}</span>
                        <br />
                        <label class="labelRightMargin">Work Status:</label>
                        <span
                          v-if="task_details.work_status && task_details.work_status.name"
                        >{{ task_details.work_status.name}}</span>
                        <br />
                      </div>
                      <div class="col-md">
                        <label class="labelRightMargin">Work Priority:</label>
                        <span
                          v-if="task_details.work_priority && task_details.work_priority.name"
                        >{{ task_details.work_priority.name}}</span>
                        <br />
                        <label class="labelRightMargin">Estimate time:</label>
                        <span v-if="task_details.estimated_time">{{task_details.estimated_time}} H</span>
                        <br />
                        <label class="labelRightMargin">Working hours:</label>
                        <span
                          v-if="task_details.total_working_hour"
                        >{{task_details.total_working_hour}} M</span>
                        <br />
                        <label class="labelRightMargin">Average working hours:</label>
                        <span
                          v-if="task_details.average_working_hour"
                        >{{task_details.average_working_hour}} M</span>
                        <br />
                        <!-- <label class="labelRightMargin">Sub Tasks:</label>
                        33
                        <br />-->
                      </div>
                      <div class="col-md-3">
                        <!-- circular progress bar -->
                        <div
                          class="progress-circle"
                          :class="[task_Progress >50 ?'over50 p'+task_Progress : 'p'+task_Progress]"
                        >
                          <span
                            v-if="task_details.issue_progress  &&task_details.issue_progress != NaN"
                          >{{task_details.issue_progress+'%'}}</span>
                          <span v-else>0%</span>
                          <div class="left-half-clipper">
                            <div class="first50-bar"></div>
                            <div class="value-bar"></div>
                          </div>
                        </div>
                        <!-- <span class="text-muted progressText ml-2">Task progress 50%</span> -->
                      </div>
                    </div>
                  </div>
                  <!-- <div class="col-md-2"></div> -->
                </div>
                <div class="row">
                  <div class="col-md">
                    <span class="badge badge-warning badge-todo bageRightMargin">
                      SubTasks
                      <span class="badge badge-light">{{ task_details.total_sub_issues}}</span>
                    </span>
                  </div>
                </div>
                <br />
                <h6 class="descriptionTitle">Description</h6>
                <p v-if="task_details.description">
                  <span v-html="task_details.description"></span>
                </p>
                <p v-else>
                  <br />
                  <span>No details found !</span>
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
                  <i class="fas fa-info-circle"></i>Task Information
                </h5>
              </div>

              <div class="infoContaier">
                <p class="projectInfo">
                  <strong class="labelRightMargin">Project name:</strong>
                  <span
                    v-if=" task_details.sprint && task_details.sprint.version && task_details.sprint.version.project && task_details.sprint.version.project.project_name"
                  >{{task_details.sprint.version.project.project_name}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Version:</strong>
                  <span
                    v-if=" task_details.sprint && task_details.sprint.version && task_details.sprint.version.version_name"
                  >{{task_details.sprint.version.version_name}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Sprint:</strong>
                  <span
                    v-if="task_details.sprint && task_details.sprint.sprint_name"
                  >{{task_details.sprint.sprint_name}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Parent Task:</strong>
                  <span
                    v-if="task_details.parent_issue && task_details.parent_issue.subject"
                  >{{task_details.parent_issue.subject}}</span>
                </p>

                <p class="projectInfo">
                  <strong class="labelRightMargin">Start date:</strong>
                  <span v-if="task_details.start_date">{{task_details.start_date}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Due date:</strong>
                  <span v-if="task_details.due_date">{{task_details.due_date}}</span>
                </p>
                <!-- <p class="projectInfo">
                  <strong class="labelRightMargin">Estimate time:</strong>
                  <span v-if="task_details.estimated_time">{{task_details.estimated_time}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Working hours:</strong>
                  <span v-if="task_details.total_working_hour">{{task_details.total_working_hour}}</span>
                </p>
                <p class="projectInfo">
                  <strong class="labelRightMargin">Average working hours:</strong>
                  <span
                    v-if="task_details.average_working_hour"
                  >{{task_details.average_working_hour}}</span>
                </p>-->
                <p class="projectInfo">
                  <strong class="mb-4 labelRightMargin">Assignee:</strong>

                  <template v-if="task_details.assignee">
                    <span v-for="(assignee,index) in task_details.assignee" :key="index">
                      <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        :title="assignee.first_name +' '+assignee.last_name"
                      >
                        <img
                          v-if="assignee.user_profile.image"
                          :src="assignee.user_profile.image"
                          class="rounded-circle thumb-sm"
                          alt="No image"
                        />
                        <img
                          v-else
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          class="rounded-circle thumb-sm"
                          alt="No image"
                        />
                      </a>
                    </span>
                  </template>
                </p>
              </div>
            </div>

            <div class="main-card Infocard">
              <div class="card-header">
                <h5 class="capitalizeNames infoText">
                  <i class="fas fa-file-text"></i>Task Files
                </h5>
                <div class="float-right" v-if="hasPermission('add_file')">
                  <i class="fas fa-plus-circle" @click="OpenAddModal()"></i>
                </div>
              </div>

              <div class="infoContaier" v-if="task_details.files && hasPermission('view_file')">
                <p class="projectInfo" v-for="(file,index) in task_details.files" :key="index">
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
                          href="#"
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
            <!-- :Taskcomment_info="commentInfo"
              :TaskcontenType="contentType"
            :TaskObejectID="task_ID"-->
            <Comments
              @load-comment="CommentLoad"
              v-if="task_response_ID"
              :comment_info="commentInfo"
              :ObejectID="task_response_ID"
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
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import Comments from "../../layouts/partials/projectRelated/Comments";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import AddFileModal from "../Files/AddFileModal.vue";
import EditFileModal from "../Files/EditFileModal .vue";

// import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";

export default {
  name: "taskDetails",
  components: { Master, Comments, projectNavbar, AddFileModal, EditFileModal },
  data() {
    return {
      queryString: {},
      issues: null,
      sub_issue_list: null,
      task_details: null,
      task_Progress: null,
      contentType: null,
      project_name: null,
      projectID: null,
      versionID: null,
      sprintID: null,
      taskID: null,
      task_response_ID: null,
      commentInfo: [],
      Current_user: null,
      // taskId: 10,
    };
  },
  created() {
    this.projectID = this.$route.query.project_id;
    this.versionID = this.$route.query.version_id;
    this.sprintID = this.$route.query.sprint_id;
    this.taskID = this.$route.query.task_id;
    console.log(
      "472",
      this.projectID,
      this.versionID,
      this.sprintID,
      this.taskID
    );
    this.initialLoad();
    this.processQueryString();
  },
  computed: {
    isAddModalVisible() {
      return this.$store.state.projectRelated.FileAddModalVisible;
    },
    isEditModalVisible() {
      return this.$store.state.projectRelated.FileEditModalVisible;
    },
  },
  methods: {
    loadGantt(queryString) {
      if (
        queryString.project_id &&
        queryString.version_id &&
        queryString.sprint_id &&
        queryString.task_id
      ) {
        window.location.href =
          "/gantt-chart?project_id=" +
          queryString.project_id +
          "&version_id=" +
          queryString.version_id +
          "&sprint_id=" +
          queryString.sprint_id +
          "&task_id=" +
          queryString.task_id;
      } else if (
        queryString.project_id &&
        queryString.sprint_id &&
        queryString.task_id
      ) {
        window.location.href =
          "/gantt-chart?project_id=" +
          queryString.project_id +
          "&sprint_id=" +
          queryString.sprint_id +
          "&task_id=" +
          queryString.task_id;
      } else if (
        queryString.project_id &&
        queryString.version_id &&
        queryString.task_id
      ) {
        window.location.href =
          "/gantt-chart?project_id=" +
          queryString.project_id +
          "&version_id=" +
          queryString.version_id +
          "&task_id=" +
          queryString.task_id;
      } else if (queryString.project_id && queryString.task_id) {
        window.location.href =
          "/gantt-chart?project_id=" +
          queryString.project_id +
          "&task_id=" +
          queryString.task_id;
      }
    },
    OpenAddModal() {
      this.$store.commit(
        "projectRelated/toggleFileAddModal",
        { content_Type: this.contentType, object_id: this.task_response_ID }
        // this.employee
      );
    },
    OpenFileEditModal(id) {
      this.$store.commit("projectRelated/toggleFileEditModal", {
        content_Type: this.contentType,
        object_id: this.task_response_ID,
        file_id: id,
      });
    },
    // OpenEditModal(id) {
    //   this.$store.commit("projectRelated/toggleFileEditModal", {
    //     object_id: this.taskID,
    //     file_id: id,
    //   });
    // },
    initialLoad: function () {
      this.GetTaskDetails();
      this.fetchAuthenticatedUser();
      this.getProjectDeatails();
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
      if (this.taskID) {
        this.queryString["task_id"] = this.taskID;
      }
    },
    async CommentLoad() {
      this.task_response_ID = null;
      await this.GetTaskDetails();
    },
    async FileLoad() {
      console.log("480--- fileload");
      await this.GetTaskDetails();
    },
    GetTaskDetails() {
      axios.get("issues/" + this.taskID + "/").then((response) => {
        this.task_details = response.data;
        this.task_response_ID = response.data.id;
        this.contentType = response.data.content_type;
        this.commentInfo = response.data.comment;
        this.task_Progress = parseInt(response.data.issue_progress);

        console.log(
          " comment lentgth",
          this.contentType,
          this.task_response_ID
        );

        console.log(response.status);
      });
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
              this.GetTaskDetails();
            }
          });
          Swal.fire("Deleted!", "Your file has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Your file has not been deleted !", "error");
        }
      });
    },
    fetchAuthenticatedUser() {
      axios
        .get("/profiles/me/", {
        })
        .then((response) => {
          this.Current_user = response.data.user;
          console.log(response.data);
        });
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
.card-header {
  align-items: center;
  justify-content: space-between;
}

.fa-gear:before,
.fa-cog:before {
  content: "\f013";
  color: #69c5a5;
}
</style>