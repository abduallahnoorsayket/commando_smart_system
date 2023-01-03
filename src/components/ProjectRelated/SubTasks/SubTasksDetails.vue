<template >
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
              <router-link
                v-if="hasPermission('view_subissue')"
                :to="{ path: '/sub-task-list' ,query:{project_id:projectID, version_id:versionID, sprint_id:sprintID, task_id:taskID} }"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> SubTaskList
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <projectNavbar />
        <EditSubTasksModal @load-subtask="SubTaskLoad" v-if="isEditModalVisible" />
        <AddFileModal @load-file="FileLoad" v-if="isFileAddModalVisible" />
        <EditFileModal @load-file="FileLoad" v-if="isFileEditModalVisible" />
        <div v-if="form_data  && form_data != null">
          <div class="row mt-3">
            <div class="col-md-9">
              <div class="main-card card">
                <div class="detailContaier">
                  <!-- <h6 class="overviewMarign mb-4"></h6> -->
                  <div class="float-right mt-3">
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
                          v-if="hasPermission('change_subissue')"
                          class="dropdown-item"
                          href="#"
                          @click="OpenEditModal()"
                        >Edit</a>
                      </div>
                    </div>
                  </div>
                  <div id="commentss">
                    <div class="mediaa">
                      <a class="pull-left" href="#">
                        <img
                          v-if="form_data.assignee.user_profile && form_data.assignee.user_profile.image"
                          class="mediaa-object"
                          :src="form_data.assignee.user_profile.image"
                          alt
                        />
                        <img
                          v-else
                          class="mediaa-object"
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt
                        />
                      </a>
                    </div>
                  </div>

                  <div class="mediaa-body mt-3">
                    <div class="mediaa-heading">
                      <h6 v-if="form_data.subject">{{form_data.subject}}</h6>
                    </div>

                    <span
                      class="text-muted"
                      v-if="form_data.assignee && form_data.assignee.first_name &&form_data.assignee.last_name
                    "
                    >by {{ form_data.assignee.first_name + " " + form_data.assignee.last_name }}</span>
                  </div>
                  <!-- main image & title -->
                  <!-- <div class="row">
                  <div class="col-md-1">
                    <div class="imageContainerr">
                      <img
                        width="60"
                        height="60"
                        class="rounded-circle"
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt
                      />
                    </div>
                  </div>
                  <div class="col-md mt-2">
                    <h5>
                      <span class="todoTitle">Designation create page</span>
                    </h5>
                    <span class="text-muted assigneeName">by Abdullah sayket</span>
                  </div>
                  </div>-->

                  <br />
                  <div class="row mt-3">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md">
                          <label class="labelRightMargin">Status:</label>
                          <span
                            v-if="form_data.status == 'assigned'"
                            class="badge badge-info"
                          >Assigned</span>
                          <span v-if="form_data.status == 'done'" class="badge badge-success">Done</span>
                          <span v-if="form_data.status == 'pause'" class="badge badge-warning">Pause</span>
                          <span
                            v-if="form_data.status == 'running'"
                            class="badge badge-primary"
                          >Running</span>
                          <span
                            v-if="form_data.status == 'problematic'"
                            class="badge badge-danger"
                          >Problematic</span>
                          <br />
                          <label class="labelRightMargin">Task:</label>
                          <span
                            v-if="form_data.issue && form_data.issue.subject"
                          >{{ form_data.issue.subject}}</span>
                          <br />

                          <label class="labelRightMargin">Start datetime:</label>
                          <span v-if="form_data.start_datetime">{{form_data.start_datetime}}</span>
                          <br />
                          <label class="labelRightMargin">End datetime:</label>
                          <span v-if="form_data.end_datetime">{{form_data.end_datetime}}</span>
                          <br />
                        </div>
                        <div class="col-md">
                          <label class="labelRightMargin">Work type:</label>
                          <span
                            v-if="form_data.work_type && form_data.work_type.name"
                          >{{form_data.work_type.name}}</span>
                          <br />
                          <label class="labelRightMargin">Priority:</label>
                          <span
                            v-if="form_data.work_priority && form_data.work_priority.name"
                          >{{ form_data.work_priority.name}}</span>
                          <br />
                          <label class="labelRightMargin">Created at:</label>

                          <span v-if="form_data.created_datetime">{{ form_data.created_datetime}}</span>
                          <br />
                          <label class="labelRightMargin">Updated at:</label>
                          <span v-if="form_data.updated_at">{{ form_data.updated_at}}</span>
                          <br />
                        </div>
                        <div class="col-md-3">
                          <!-- circular progress bar -->
                          <div
                            class="progress-circle"
                            :class="[form_data.progress>50 ?'over50 p'+form_data.progress : 'p'+form_data.progress]"
                          >
                            <span
                              v-if="form_data.progress  &&form_data.progress != null"
                            >{{form_data.progress+'%'}}</span>
                            <span v-else>0%</span>
                            <div class="left-half-clipper">
                              <div class="first50-bar"></div>
                              <div class="value-bar"></div>
                            </div>
                          </div>
                          <!-- <span class="text-muted progressText ml-2">Todo progress 50%</span> -->
                        </div>
                      </div>
                    </div>
                    <!-- <div class="col-md-2"></div> -->
                  </div>

                  <h6 class="descriptionTitle">Description</h6>
                  <p v-if="form_data.description">
                    <span v-html="form_data.description"></span>
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
                    <i class="fas fa-info-circle"></i>SubTask Information
                  </h5>
                </div>

                <div class="infoContaier">
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Project:</strong>
                    <span
                      v-if="form_data.issue.sprint.version && form_data.issue.sprint.version.project && form_data.issue.sprint.version.project.project_name"
                    >{{ form_data.issue.sprint.version.project.project_name}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Version:</strong>
                    <span
                      v-if="form_data.issue.sprint.version && form_data.issue.sprint.version.version_name"
                    >{{ form_data.issue.sprint.version.version_name}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Sprint:</strong>
                    <span
                      v-if="form_data.issue.sprint && form_data.issue.sprint.sprint_name"
                    >{{ form_data.issue.sprint.sprint_name}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Expected start date:</strong>
                    <span v-if="form_data.expected_start_date">{{ form_data.expected_start_date}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Expected end date:</strong>
                    <span v-if="form_data.expected_end_date">{{form_data.expected_end_date}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Estimated hours:</strong>
                    <span v-if="form_data.estimated_hour">{{ form_data.estimated_hour}} H</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Working hours:</strong>
                    <span v-if="form_data.working_hour">{{form_data.working_hour}} M</span>
                  </p>
                </div>
              </div>

              <div class="main-card Infocard">
                <div class="card-header">
                  <h5 class="capitalizeNames infoText">
                    <i class="fas fa-file-text"></i>SubTask Files
                  </h5>
                  <div class="float-right" v-if="hasPermission('add_file')">
                    <i class="fas fa-plus-circle" @click="OpenFileAddModal()"></i>
                  </div>
                </div>

                <div class="infoContaier" v-if="form_data.files && hasPermission('view_file')">
                  <p class="projectInfo" v-for="(file,index) in form_data.files" :key="index">
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
              <!-- Comments sections 
               :comment_info="{
                commentInfo:commentInfo,
                subtaskID:subtaskID,
                contentType:contentType
              }"-->

              <Comments
                @load-comment="CommentLoad"
                v-if="subtask_response_ID"
                :comment_info="commentInfo"
                :ObejectID="subtask_response_ID"
                :contenType="contentType"
              />
            </div>
            <div class="col-md-3">
              <div class="main-card Infocard">
                <div class="card-header">
                  <h5 class="capitalizeNames infoText">
                    <i class="fas fa-history"></i>SubTask History
                  </h5>
                </div>

                <div class="infoContaier" v-if="form_data.todo_history">
                  <div class="row">
                    <div class="col-md-12">
                      <ul class="timeline">
                        <li v-for="(history,index) in form_data.todo_history" :key="index">
                          <label class="labelRightMargin">Status:</label>
                          <span
                            v-if="history.status == 'assigned'"
                            class="badge badge-info"
                          >Assigned</span>
                          <span v-if="history.status == 'done'" class="badge badge-success">Done</span>
                          <span v-if="history.status == 'pause'" class="badge badge-warning">Pause</span>
                          <span
                            v-if="history.status == 'running'"
                            class="badge badge-primary"
                          >Running</span>
                          <span
                            v-if="history.status == 'problematic'"
                            class="badge badge-danger"
                          >Problematic</span>
                          <br />
                          <label class="labelRightMargin">Progress:</label>
                          {{history.progress}}
                          <br />
                          <label class="labelRightMargin">Working Hour:</label>
                          {{history.working_hour}} M
                          <br />
                        </li>
                        <!-- <li>
                        <label class="labelRightMargin">Status:</label>
                        <span class="badge badge-warning">Runnig</span>
                        <br />
                        <label class="labelRightMargin">Progress:</label>
                        30%
                        <br />
                        <label class="labelRightMargin">Working Hour:</label>
                        10.50H
                        <br />
                      </li>
                      <li>
                        <label class="labelRightMargin">Status:</label>
                        <span class="badge badge-success">Done</span>
                        <br />
                        <label class="labelRightMargin">Progress:</label>
                        100%
                        <br />
                        <label class="labelRightMargin">Working Hour:</label>
                        10.50H
                        <br />
                        </li>-->
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-success" role="alert">No Data Found!</div>
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Master from "../../layouts/Master";
import EditSubTasksModal from "./EditSubTasksModal";
import Comments from "../../layouts/partials/projectRelated/Comments";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import ProjectName from "../../layouts/partials/projectRelated/ProjectName.vue";
import AddFileModal from "../Files/AddFileModal.vue";
import EditFileModal from "../Files/EditFileModal .vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "SubTasksDetails",
  components: {
    Master,
    EditSubTasksModal,
    Comments,
    projectNavbar,
    AddFileModal,
    EditFileModal,
    ProjectName,
  },
  data() {
    return {
      queryString: {},
      comment_reload: false,
      form_data: null,
      isUpdateVisible: false,
      update_attendance_id: null,
      searchName: null,
      all_clients: null,
      contentType: null,
      subtaskID: null,
      projectID: null,
      versionID: null,
      sprintID: null,
      taskID: null,
      subtask_response_ID: null,
      commentInfo: [],
      SubTask_error_data: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
      todoId: 2000,
    };
  },
  created() {
    // this.projectID = this.$route.query.project_id;
    // this.subtaskID = this.$route.query.id;
    this.projectID = this.$route.query.project_id;
    this.versionID = this.$route.query.version_id;
    this.sprintID = this.$route.query.sprint_id;
    this.taskID = this.$route.query.task_id;
    this.subtaskID = this.$route.query.subtask_id;
    this.getSubTaskDeatails();
    this.processQueryString();

    // this.SendObjectID_ContentType();
    console.log("425", this.subtaskID);
  },
  // mounted() {

  // },
  updated() {
    this.getSubTaskDeatails();
  },
  computed: {
    // Todo Edit Modal
    isEditModalVisible() {
      return this.$store.state.projectRelated.TodoEditModalVisible;
    },
    // file
    isFileAddModalVisible() {
      return this.$store.state.projectRelated.FileAddModalVisible;
    },
    isFileEditModalVisible() {
      return this.$store.state.projectRelated.FileEditModalVisible;
    },
    // comment
    isCommentVisible() {
      // if (this.$store.state.projectRelated.CommentSectionVisible == true) {
      //   this.getSubTaskDeatails();
      //   return this.$store.state.projectRelated.CommentSectionVisible;
      // }
      return this.$store.state.projectRelated.CommentSectionVisible;
    },
  },
  methods: {
    OpenEditModal() {
      this.$store.commit("projectRelated/toggleTodoEditModal", this.subtaskID);
    },
    OpenFileAddModal() {
      this.$store.commit("projectRelated/toggleFileAddModal", {
        content_Type: this.contentType,
        object_id: this.subtask_response_ID,
        // file_id: id,
      });
    },
    OpenFileEditModal(id) {
      this.$store.commit("projectRelated/toggleFileEditModal", {
        content_Type: this.contentType,
        object_id: this.subtask_response_ID,
        file_id: id,
      });
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
    async SubTaskLoad() {
      // this.subtask_response_ID = null;
      await this.getSubTaskDeatails();
    },
    async CommentLoad() {
      this.subtask_response_ID = null;
      await this.getSubTaskDeatails();
    },
    async FileLoad() {
      await this.getSubTaskDeatails();
    },
    SendObjectID_ContentType() {
      console.log("521");
      this.$store.commit("projectRelated/id_typeForComment", {
        content_Type: this.contentType,
        object_id: this.subtask_response_ID,
        // file_id: id,
      });
      console.log("528");
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
              this.getSubTaskDeatails();
            }
          });
          Swal.fire("Deleted!", "Your file has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Your file has not been deleted !", "error");
        }
      });
    },
    getSubTaskDeatails: function () {
      axios.get("sub-issues/" + this.subtaskID + "/").then(
        (response) => {
          this.form_data = response.data;
          this.subtask_response_ID = response.data.id;
          this.commentInfo = response.data.comment;

          this.contentType = response.data.content_type;

          // this.form_data.leave_type = this.form_data.leave_type.id;
          console.log("558", this.commentInfo);
        },
        (response) => {
          console.log("----", response);
        }
      );
      // .catch((error) => {
      //   this.SubTask_error_data = error.response.data;
      //   console.log("544--++", error.response);
      // });
    },
    /*Delete Project*/
    deleteSubTaskItem(id) {
      console.log("820", id);
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
          axios.delete("sub-issues/" + id + "/").then((response) => {
            if (response.status === 204) {
              // this.subtaskID = null;
              this.getSubTaskDeatails();
            }
          });
          Swal.fire("Deleted!", "Subtasks has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Subtasks has not been deleted !", "error");
        }
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
.fa-history:before {
  content: "\f1da";
  cursor: pointer;
  padding: 10px 6px 10px 0px;
  color: white;
}
.fa-info:before {
  content: "\f129";
  padding: 10px 5px 10px 0px;
}
.card-header {
  align-items: center;
}

/* for todo history timeline */
/* The actual timeline (the vertical ruler) */
ul.timeline {
  list-style-type: none;
  position: relative;
}
ul.timeline:before {
  content: " ";
  background: #d4d9df;
  display: inline-block;
  position: absolute;
  left: 2px;
  width: 2px;
  height: 100%;
  z-index: 400;
  margin-top: 5px;
}
ul.timeline > li {
  margin: 20px 5px 20px 18px;
  /* padding-left: 1px; */
  background: #f1f1f1;
  padding: 10px 0px 10px 10px;
  border-radius: 15px;
  border-top-left-radius: 0px;
  font-size: 13px;
  line-height: 1.25;
}
ul.timeline > li:before {
  content: " ";
  background: white;
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  border: 3px solid #69c5a5;
  left: -7px;
  width: 20px;
  height: 20px;
  z-index: 400;
  margin-top: -5px;
}
/* circular progress */
/* .progress-circle.p10 .value-bar {
  transform: rotate(180deg);
} */
.fa-gear:before,
.fa-cog:before {
  content: "\f013";
  color: #69c5a5;
}
</style>