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
              <router-link :to="{ path: '/project-list' }" v-if="hasPermission('view_project')">
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> Project List
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <projectNavbar />

        <AddFileModal @load-file="FileLoad" v-if="isFileAddModalVisible" />
        <EditFileModal @load-file="FileLoad" v-if="isFileEditModalVisible" />
        <div v-if="form_data">
          <div class="row mt-3">
            <div class="col-md-9">
              <div class="main-card card">
                <div class="detailContaier">
                  <h5 class="overviewMarign mb-4">
                    <span v-if="form_data.project_name">{{form_data.project_name}}</span>
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
                            v-if="hasPermission('change_project')"
                            class="dropdown-item"
                            :to="{ name: 'UpdateNewProject',query: { project_id: form_data.id } }"
                          >Edit</router-link>

                          <router-link
                            v-if="hasPermission('view_version')"
                            class="dropdown-item"
                            :to="{name: 'VersionList' ,query: { project_id:  form_data.id} }"
                          >Versions</router-link>
                          <a
                            href="#"
                            class="dropdown-item"
                            @click="loadGantt(form_data.id)"
                          >Gantt Chart</a>

                          <router-link
                            class="dropdown-item"
                            :to="{ name: 'Activities', query: { project_id: projectID}}"
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
                          <span v-if="form_data.status == 'PN' ">
                            <span class="badge badge-info">Pending</span>
                          </span>
                          <span v-if="form_data.status == 'RN' ">
                            <span class="badge badge-primary">Running</span>
                          </span>
                          <span v-if="form_data.status == 'CM' ">
                            <span class="badge badge-success">Completed</span>
                          </span>
                          <span v-if="form_data.status == 'PP' ">
                            <span class="badge badge-danger">Postpoend</span>
                          </span>
                          <span v-if="form_data.status == 'HO' ">
                            <span class="badge badge-secondary">Handovered</span>
                          </span>
                          <br />
                          <label class="labelRightMargin">Project ID:</label>
                          <span v-if="form_data.project_id">{{form_data.project_id}}</span>
                          <br />
                          <label class="labelRightMargin">Client:</label>
                          <span
                            v-if="form_data.client && form_data.client.client_name"
                          >{{form_data.client.client_name}}</span>
                          <br />

                          <br />
                        </div>
                        <div class="col-md">
                          <label class="labelRightMargin">Expected start date:</label>
                          <span
                            v-if="form_data.expected_start_date"
                          >{{form_data.expected_start_date}}</span>
                          <br />
                          <label class="labelRightMargin">Expected end date:</label>
                          <span v-if="form_data.expected_end_date">{{form_data.expected_end_date}}</span>
                          <br />
                          <label class="labelRightMargin">Expected handover date:</label>
                          <span
                            v-if="form_data.expected_handover_date"
                          >{{form_data.expected_handover_date}}</span>
                          <br />
                        </div>
                        <div class="col-md-3">
                          <!-- circular progress bar -->
                          <div
                            class="progress-circle"
                            :class="[project_progress >50 ?'over50 p'+project_progress : 'p'+project_progress]"
                          >
                            <!-- <span
                            v-if="version_Progress  &&version_Progress != NaN"
                            >{{version_Progress+'%'}}</span>-->
                            <span
                              v-if="form_data.project_progress  &&form_data.project_progress != NaN"
                            >{{form_data.project_progress+'%'}}</span>
                            <span v-else>0%</span>
                            <div class="left-half-clipper">
                              <div class="first50-bar"></div>
                              <div class="value-bar"></div>
                            </div>
                          </div>
                          <!-- <span class="text-muted progressText ml-2">Project progress 50%</span> -->
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <label class="labelRightMargin">Proeject URL:</label>
                          <!-- <a href="" v-if="form_data.project_url ==nullI"> No Url found</a> -->
                          <span v-if="form_data.project_url ==null">No URL found</span>
                          <a
                            :href="form_data.project_url"
                            v-if="form_data.project_url"
                          >{{form_data.project_url}}</a>

                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md">
                      <span class="badge badge-info bageRightMargin">
                        Versions
                        <span class="badge badge-light">{{form_data.total_version}}</span>
                      </span>

                      <span class="badge badge-primary bageRightMargin">
                        Sprints
                        <span class="badge badge-light">{{form_data.total_sprint}}</span>
                      </span>
                      <span class="badge badge-warning bageRightMargin">
                        Tasks
                        <span class="badge badge-light">{{form_data.total_task}}</span>
                      </span>
                      <span class="badge badge-warning badge-todo bageRightMargin">
                        SubTasks
                        <span class="badge badge-light">{{form_data.total_sub_task}}</span>
                      </span>
                    </div>
                  </div>
                  <br />
                  <h6 class="descriptionTitle">Description</h6>
                  <p v-if="form_data.description">
                    <span v-html="form_data.description"></span>
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
                    <!-- <i class="fas fa-info"></i> -->
                    <i class="fas fa-info-circle"></i> Project Information
                  </h5>
                </div>

                <div class="infoContaier">
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Branch:</strong>
                    <span
                      v-if="form_data.branch && form_data.branch.branch_name"
                    >{{form_data.branch.branch_name}}</span>
                  </p>
                  <!-- <p class="projectInfo">
                    <strong class="labelRightMargin">Client:</strong>
                    <span v-if="form_data.client.client_name">{{form_data.client.client_name}}</span>
                  </p>-->
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Current version:</strong>
                    <span
                      v-if="form_data.project_version && form_data.project_version[0]"
                    >{{form_data.project_version[0].version_name}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Current sprint:</strong>
                    <span
                      v-if="form_data.project_version && form_data.project_version[0] && form_data.project_version[0].current_sprint"
                    >{{form_data.project_version[0].current_sprint.sprint_name}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Start date:</strong>
                    <span v-if="form_data.start_date">{{form_data.start_date}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">End date:</strong>
                    <span v-if="form_data.end_date">{{form_data.end_date}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="labelRightMargin">Hanover date:</strong>
                    <span v-if="form_data.handover_date">{{form_data.handover_date}}</span>
                  </p>
                  <p class="projectInfo">
                    <strong class="mb-3">Team Members:</strong>
                  </p>
                  <template v-if="form_data.members">
                    <span v-for="(member,index) in form_data.members" :key="index">
                      <!-- <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title
                        data-original-title="Mat Helme"
                      >
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          class="rounded-circle thumb-sm"
                          alt="friend"
                        />
                      </a>-->
                      <a :title="member.first_name+' '+member.last_name">
                        <p
                          hidden
                          v-if="member.first_name && member.last_name"
                        >{{member.first_name+" "+member.last_name }}</p>
                        <img
                          v-if="member.user_profile && member.user_profile.image"
                          :src="member.user_profile.image"
                          class="rounded-circle thumb-sm"
                          alt="friend"
                        />

                        <img
                          v-else
                          src="https://image.flaticon.com/icons/png/512/3135/3135715.png"
                          class="rounded-circle thumb-sm"
                          alt="friend"
                        />
                      </a>
                    </span>
                  </template>
                </div>
              </div>

              <div class="main-card Infocard">
                <div class="card-header">
                  <h5 class="capitalizeNames infoText">
                    <i class="fas fa-file-text"></i>Project Files
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
                            class="dropdown-item"
                            @click="OpenFileEditModal(file.id)"
                            v-if="hasPermission('change_file')"
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

              <!-- <div class="main-card Infocard">
              <div class="card-header">
                <h5 class="capitalizeNames infoText">
                  <i class="fas fa-history"></i> Recent Actions
                </h5>
              </div>

              <div class="infoContaier">
                <div class="row mb-3">
                  <div class="col-md-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      class="rounded-circle thumb-sm marginRight"
                      alt="friend"
                    />
                  </div>
                  <div class="col-md-10">
                    <span class="float-left actionContent">
                      <span class="baseColorFont">Mostaq Mahmud</span>
                      <span class="actionText">add a new task on sprint 1</span>
                    </span>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      class="rounded-circle thumb-sm marginRight"
                      alt="friend"
                    />
                  </div>
                  <div class="col-md-10">
                    <span class="float-left actionContent">
                      <span class="baseColorFont">Mostaq Mahmud</span>
                      <span class="actionText">add a new task on sprint 1</span>
                    </span>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-2">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar4.png"
                      class="rounded-circle thumb-sm marginRight"
                      alt="friend"
                    />
                  </div>
                  <div class="col-md-10">
                    <span class="float-left actionContent">
                      <span class="baseColorFont">Mostaq Mahmud</span>
                      <span class="actionText">add a new task on sprint 1</span>
                    </span>
                  </div>
                </div>

                
              </div>
              </div>-->
            </div>
          </div>
          <div class="row">
            <div class="col-md-9">
              <!-- Comments sections -->
              <!-- <Comments /> -->

              <Comments
                @load-comment="CommentLoad"
                v-if="project_response_ID"
                :comment_info="commentInfo"
                :ObejectID="project_response_ID"
                :contenType="contentType"
              />
            </div>
            <div class="col-md-3"></div>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Master from "../../layouts/Master";
import Comments from "../../layouts/partials/projectRelated/Comments";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";

import AddFileModal from "../Files/AddFileModal.vue";
import EditFileModal from "../Files/EditFileModal .vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "ProjectDetails",
  components: { Master, Comments, projectNavbar, AddFileModal, EditFileModal },
  data() {
    return {
      form_data: null,
      project_name: null,
      project_response_ID: null,
      contentType: null,
      commentInfo: [],
      project_progress: null,
      isUpdateVisible: false,
      update_attendance_id: null,
      searchName: null,
      all_clients: null,
      // projectId: 1,
      projectID: null,
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
    // this.getProjectDeatails();
    this.projectID = this.$route.query.project_id;
    console.log("497", this.projectID);
    this.initialLoad();
  },
  computed: {
    // file
    isFileAddModalVisible() {
      return this.$store.state.projectRelated.FileAddModalVisible;
    },
    isFileEditModalVisible() {
      return this.$store.state.projectRelated.FileEditModalVisible;
    },
  },
  methods: {
    loadGantt(id) {
      window.location.href = "/gantt-chart?project_id=" + id;
    },
    OpenFileAddModal() {
      this.$store.commit("projectRelated/toggleFileAddModal", {
        content_Type: this.contentType,
        object_id: this.project_response_ID,
      });
    },
    OpenFileEditModal(id) {
      this.$store.commit("projectRelated/toggleFileEditModal", {
        object_id: this.project_response_ID,
        file_id: id,
      });
    },
    initialLoad: function () {
      this.getProjectDeatails();
    },
    async CommentLoad() {
      this.project_response_ID = null;
      await this.getProjectDeatails();
    },
    async FileLoad() {
      await this.getProjectDeatails();
    },
    getProjectDeatails: function () {
      // const currentUserID = localStorage.getItem("id");
      axios.get("projects/" + this.projectID + "/").then(
        (response) => {
          this.form_data = response.data;
          this.project_response_ID = response.data.id;
          this.contentType = response.data.content_type;
          this.commentInfo = response.data.comment;
          // response.data.comment.forEach((element) => {
          //   console.log("496", element);
          //   if (element.created_by.id == currentUserID) {
          //     this.commentInfo.push(element);
          //     console.log("498", this.commentInfo);
          //   }
          // });
          this.project_name = response.data.project_name;
          this.project_progress = parseInt(response.data.project_progress);
          // this.form_data.leave_type = this.form_data.leave_type.id;
        },
        (response) => {
          console.log("----", response);
        }
      );
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
              this.getProjectDeatails();
            }
          });
          Swal.fire("Deleted!", "Your file has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Your file has not been deleted !", "error");
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
  padding: 10px 10px 10px 0px;
  color: white;
}
.fa-info:before {
  content: "\f129";
  padding: 10px 3px 10px 0px;
}

.card-header {
  align-items: center;
}
.actionText {
  /* font-style: italic; */
  margin-left: 5px;
}
.actionContent {
  margin-top: 6px;
  margin-left: 6px;
}
/* circular progress */
/* .progress-circle.p10 .value-bar {
  transform: rotate(280deg);
} */
/* .progress-circle.p10 .value-bar2 {
  transform: rotate(280deg);
} */
.fa-gear:before,
.fa-cog:before {
  content: "\f013";
  color: #69c5a5;
}
</style>