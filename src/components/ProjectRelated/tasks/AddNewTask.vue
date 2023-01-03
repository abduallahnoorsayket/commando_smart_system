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
              <ProjectName :project_ID="projectID" />
              <router-link v-if="hasPermission('view_issue')" :to="{ path: '/task-list' }">
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> Task List
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <projectNavbar v-if="projectID" />
        <!--Task Form-->
        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <h5 class="baseColorFont">Add New Task</h5>

                <form @submit.prevent="submitAddIssueForm">
                  <div class="form-group mt-4">
                    <div class="form-row">
                      <!-- <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label for="exampleEmail11" class="labelMargin">Version:</label>
                          <i
                            v-if="sprint_details.version.version_name"
                          >{{ sprint_details.version.version_name}}</i>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label for="exampleEmail11" class="labelMargin">Sprint:</label>
                          <i v-if="sprint_details.sprint_name">{{sprint_details.sprint_name}}</i>
                        </div>
                      </div>-->

                      <!--  -->
                      <!--version -->
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>Version</label>
                          <select
                            name="select"
                            v-model="version"
                            class="form-control"
                            @change="loadSprint()"
                          >
                            <option value="false" disabled selected>Select version</option>
                            <option
                              v-for="(version,index) in all_versions"
                              :key="index"
                              :value="version.id"
                            >{{version.version_name}}</option>
                          </select>
                          <!-- :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                             <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                            v-if="task_error_data && task_error_data.sprint"
                          >{{ task_error_data.sprint[0] }}</div>-->
                        </div>
                      </div>

                      <!--Sprint -->

                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Sprint
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            v-model="sprintID"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                          >
                            <option value disabled selected>Select sprint</option>
                            <option
                              v-for="(sprnt,index) in all_sprints"
                              :key="index"
                              :value="sprnt.id"
                            >{{sprnt.sprint_name}}</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                            v-if="task_error_data && task_error_data.sprint"
                          >{{ task_error_data.sprint[0] }}</div>
                        </div>
                      </div>
                    </div>
                    <!--Work Type & privacy status-->
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label>
                            Subject
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            id="project_name"
                            v-model="subject"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.subject }"
                          />

                          <!--error handling-->
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.subject }"
                            v-if="task_error_data && task_error_data.subject"
                          >{{ task_error_data.subject[0] }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <!--Work Type-->
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                            Work Type
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            v-model="work_type"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.work_type }"
                          >
                            <option value="false" disabled selected>Select Work Type</option>
                            <option
                              v-for="work_type in all_work_type"
                              :key="work_type.id"
                              :value="work_type.id"
                            >{{work_type.name}}</option>
                          </select>

                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.work_type }"
                            v-if="task_error_data && task_error_data.work_type"
                          >{{ task_error_data.work_type[0] }}</div>
                        </div>
                      </div>
                      <!--Status-->
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                            Work Status
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            v-model="work_status"
                            type="choice"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.work_status }"
                          >
                            <option value="false" disabled selected>Select Work Status</option>
                            <option
                              v-for="work_statuses in all_work_statuses"
                              :key="work_statuses.id"
                              :value="work_statuses.id"
                            >{{ work_statuses.name }}</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.work_status }"
                            v-if="task_error_data && task_error_data.work_status"
                          >{{ task_error_data.work_status[0] }}</div>
                        </div>
                      </div>
                      <!--Priority-->
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                            Work Priority
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            v-model="work_priority"
                            type="choice"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.work_priority }"
                          >
                            <option disabled selected>Select Work Priority</option>
                            <option
                              v-for="work_priority in all_work_priority"
                              :key="work_priority.id"
                              :value="work_priority.id"
                            >{{ work_priority.name }}</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.work_priority }"
                            v-if="task_error_data && task_error_data.work_priority"
                          >{{ task_error_data.work_priority[0] }}</div>
                        </div>
                      </div>
                    </div>

                    <!--Description-->
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label>
                            Description
                            <span class="asterisk">*</span>
                          </label>
                          <br />
                          <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
                          <div
                            v-if="task_error_data && task_error_data.description"
                            class="alert alert-danger alert-dismissible fade show text-left mt-1"
                            role="alert"
                          >
                            {{ task_error_data.description[0] }}
                            <button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-row mt-2">
                      <div class="col-md-3 col-lg-3 col-xl-2">
                        <div class="position-relative form-group">
                          <label class="form-check-label" style="font-weight: 600;">
                            <input type="checkbox" v-model="hasParentTask" />
                            <span class="checkmark"></span>
                            <label class="ml-2" @click="OpenParentTaskChoose()">Has Parent Task</label>
                          </label>
                        </div>
                      </div>
                    </div>
                    <!-- hasparent task -->
                    <div class="form-row" v-if="hasParentTask">
                      <!--version -->
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>Version</label>
                          <select
                            name="select"
                            v-model="hasParentVersion"
                            class="form-control"
                            @change="loadFilteredSprint()"
                          >
                            <option value="false" disabled selected>Select version</option>
                            <option
                              v-for="(version,index) in all_versions"
                              :key="index"
                              :value="version.id"
                            >{{version.version_name}}</option>
                          </select>
                          <!-- :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                             <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                            v-if="task_error_data && task_error_data.sprint"
                          >{{ task_error_data.sprint[0] }}</div>-->
                        </div>
                      </div>

                      <!--Sprint -->
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>Sprint</label>
                          <select
                            name="select"
                            class="form-control"
                            v-model="fiterByVersionSprint"
                            @change="loadTask()"
                          >
                            <option value="false" disabled selected>Select sprint</option>
                            <option
                              v-for="(sprnt,index) in filtered_sprints"
                              :key="index"
                              :value="sprnt.id"
                            >{{sprnt.sprint_name}}</option>
                          </select>

                          <!-- :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                            v-if="task_error_data && task_error_data.sprint"
                          >{{ task_error_data.sprint[0] }}</div>-->
                        </div>
                      </div>
                      <!--task -->
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>Parent task</label>
                          <select name="select" v-model="parent_task" class="form-control">
                            <option value="false" disabled selected>Select task</option>
                            <option
                              v-for="(task,index) in all_tasks"
                              :key="index"
                              :value="task.id"
                            >{{task.subject}}</option>
                          </select>
                          <!-- :class="{ 'is-invalid': task_error_data && task_error_data.task }"
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.task }"
                            v-if="task_error_data && task_error_data.task"
                          >{{ task_error_data.task[0] }}</div>-->

                          <div
                            v-if="hasParentTask==true &&  parent_task==null"
                            class="alert alert-info alert-dismissible fade show text-left mt-1"
                            role="alert"
                          >
                            Please select an option.
                            <button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <!--Sprint -->
                      <!-- <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Sprint
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            v-model="sprint"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                          >
                            <option value="false" disabled selected>Select sprint</option>
                            <option
                              v-for="(sprnt,index) in all_sprints"
                              :key="index"
                              :value="sprnt.id"
                            >{{sprnt.sprint_name}}</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                            v-if="task_error_data && task_error_data.sprint"
                          >{{ task_error_data.sprint[0] }}</div>
                        </div>
                      </div>-->
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Privacy Status
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            v-model="privacy_status"
                            type="choice"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.privacy_status }"
                          >
                            <option disabled selected>Select Privacy Status</option>
                            <option value="Pub">Public</option>
                            <option value="Pri">Private</option>
                            <option value="Oth">Others</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.privacy_status }"
                            v-if="task_error_data && task_error_data.privacy_status"
                          >{{ task_error_data.privacy_status[0] }}</div>
                        </div>
                      </div>
                      <!--Estimated time-->
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Estimated time
                            <span class="asterisk">*</span>
                          </label>
                          <span class="text-muted">(Hours)</span>
                          <input
                            v-model="estimated_time"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': task_error_data && task_error_data.estimated_time }"
                          />
                          <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.estimated_time }"
                            v-if="task_error_data && task_error_data.estimated_time"
                          >{{ task_error_data.estimated_time[0] }}</div>
                        </div>
                      </div>
                    </div>

                    <!--Status & Parent Issue-->
                    <div class="form-row">
                      <!--Parent Issue-->
                      <!--<div class="col-md-6">
                                                <div class="position-relative form-group">
                                                    <label>Parent Issue</label>
                                                    <select name="select" v-model="parent_issue" type="choice"
                                                            class="form-control"
                                                            :class="{ 'is-invalid': error_add_holiday && error_add_holiday.type }">
                                                        <option value="PN">Select Issue Type</option>
                                                        <option value="PN">Database Migration</option>
                                                        <option value="RN">Upload Image</option>
                                                        <option value="CM">Development Model And Migrations</option>
                                                    </select>
                                                    <div :class="{ 'invalid-feedback': error_add_holiday && error_add_holiday.type }"
                                                         v-if="error_add_holiday && error_add_holiday.type">
                                                        {{ error_add_holiday.type[0] }}
                                                    </div>
                                                </div>
                      </div>-->
                    </div>

                    <!--Priority & Start Date-->
                    <div class="form-row">
                      <!--Start Date-->
                      <div class="col-md-6">
                        <label>
                          Start Date
                          <span class="asterisk">*</span>
                        </label>
                        <input
                          id="date"
                          v-model="start_date"
                          type="date"
                          class="form-control"
                          :class="{ 'is-invalid': task_error_data && task_error_data.start_date }"
                        />
                        <div
                          :class="{ 'invalid-feedback': task_error_data && task_error_data.start_date }"
                          v-if="task_error_data && task_error_data.start_date"
                        >{{ task_error_data.start_date[0] }}</div>
                      </div>

                      <!--Due Date-->
                      <div class="col-md-6">
                        <label>
                          Due Date
                          <span class="asterisk">*</span>
                        </label>
                        <input
                          v-model="due_date"
                          type="date"
                          class="form-control"
                          :class="{ 'is-invalid': task_error_data && task_error_data.due_date }"
                        />
                        <div
                          :class="{ 'invalid-feedback': task_error_data && task_error_data.due_date }"
                          v-if="task_error_data && task_error_data.due_date"
                        >{{ task_error_data.due_date[0] }}</div>
                      </div>
                    </div>

                    <!--Estimated time & Due Date-->
                    <div class="form-row mt-4">
                      <!--Assignee-->
                      <div class="col-md-12 permissions">
                        <label>Assignee</label>
                        <br />

                        <div class="p-listbox p-component">
                          <div class="p-listbox-header">
                            <div class="p-listbox-filter-container">
                              <input
                                type="text"
                                class="p-listbox-filter p-inputtext p-component"
                                v-model="searchQuery"
                                placeholder="Filter"
                              />
                              <span class="p-listbox-filter-icon pi pi-search"></span>
                            </div>
                          </div>
                          <div class="p-listbox-list-wrapper">
                            <div
                              role="listbox"
                              aria-multiselectable="multiple"
                              class="p-listbox-list"
                              v-if="project_members"
                            >
                              <div
                                class="p-listbox-item"
                                v-for="user in resultQuery"
                                :key="user.id"
                              >
                                <label class="form-check-label" style="font-weight: 300;">
                                  <input
                                    type="checkbox"
                                    :id="user"
                                    :value="user.id"
                                    v-model="assignee"
                                  />
                                  <span class="checkmark"></span>
                                  {{ user.first_name + ' ' + user.last_name}}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <button
                        @submit.prevent="submitAddIssueForm"
                        class="mt-2 btn btn-successs btn-lg float-right"
                      >Add task</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Swal from "sweetalert2";
import Master from "../../layouts/Master";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import axios from "axios";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import ProjectName from "../../layouts/partials/projectRelated/ProjectName.vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "AddNewTask",
  components: {
    Master,
    projectNavbar,
    ckeditor: CKEditor.component,
    ProjectName,
  },
  data() {
    return {
      version: null,
      sprint: null,
      hasParentVersion: null,
      fiterByVersionSprint: null,
      task: null,
      work_type: null,
      privacy_status: null,
      subject: null,
      description: null,
      work_status: null,
      parent_issue: null,
      work_priority: null,
      start_date: null,
      assignee: [],
      due_date: null,
      estimated_time: null,

      parent_task: null,
      files_related: [],
      filtered_sprints: null,
      all_versions: null,
      all_sprints: null,
      all_tasks: null,
      all_work_type: null,
      all_work_statuses: null,
      all_work_priority: null,
      // all_users: null,
      project_details: null,
      searchQuery: null,
      sprint_details: null,
      hasParentTask: false,
      projectID: null,
      versionID: null,

      sprintID: null,
      project_members:null,

      // for CKEditor
      editor: ClassicEditor,

      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },

      task_error_data: {
        subject: null,
        description: null,
        work_status: null,
        work_type: null,
        work_priority: null,
        start_date: null,
        due_date: null,
        sprint: null,
        privacy_status: null,
        estimated_time: null,
      },
    };
  },

  created() {
    this.projectID = this.$route.query.project_id;
    this.versionID = this.$route.query.version_id;
    this.sprintID = this.$route.query.sprint_id ? this.$route.query.sprint_id : this.$route.query.sprint;
    // console.log("551", this.projectID, this.versionID, this.sprintID);
    this.initialLoad();
  },
  updated(){
    // this.projectID = this.$route.query.project_id;
    // this.versionID = this.$route.query.version_id;
    // this.sprintID = this.$route.query.sprint_id ? this.$route.query.sprint_id : this.$route.query.sprint;
    // // console.log("551", this.projectID, this.versionID, this.sprintID);
    // this.initialLoad();
  },
  methods: {
    OpenParentTaskChoose() {
      this.hasParentTask = !this.hasParentTask;
    },
    initialLoad: function () {
      this.loadWorkType();
      this.loadWorkStatus();
      this.loadWorkPriority();
      // this.loadUsers();
      this.loadSprint();
      this.loadVersion();
      // this.loadTask();
      this.getSprintDetails();
      this.getProjectDeatails();
    },
    // Submit Add Issue Form
    async submitAddIssueForm() {
      const response = await axios
        .post("issues/", {
          subject: this.subject,
          description: this.description,
          work_type: this.work_type,
          work_status: this.work_status,
          // parent_issue: this.parent_issue,
          work_priority: this.work_priority,
          sprint: this.sprintID,
          assignee: this.assignee,
          start_date: this.start_date,
          due_date: this.due_date,
          estimated_time: this.estimated_time,
          privacy_status: this.privacy_status,
          parent_issue: this.parent_task,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: "You have successfully created a task..",
          }).then((result) => {
            this.$router.push({
              name: "taskList",
              query: {
                project_id: this.projectID,
                version_id: this.versionID,
                sprint_id: this.sprintID,
                // task_id: taskID,
              },
            });
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.task_error_data = error.response.data;
          console.log("--++", error.response);
        });
      console.log(response);
    },

    // Load Work Type into dropdown
    loadWorkType() {
      axios
        .get("work-types/", {
        })
        .then((response) => {
          this.all_work_type = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // Load Work Status into dropdown
    loadWorkStatus() {
      axios
        .get("work-statuses/", {
        })
        .then((response) => {
          this.all_work_statuses = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // Load Work Priority into dropdown
    loadWorkPriority() {
      axios
        .get("work-priorities/", {
        })
        .then((response) => {
          this.all_work_priority = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // loadVersion
    loadVersion() {
      var queryParam = {
        project: this.projectID,
        page: this.$route.query.page,
      };
      axios
        .get("versions/", {
          params: queryParam,
        })

        .then(
          function (response) {
            this.all_versions = response.data.results;
            this.pagination.count = response.data.count;
            this.pagination.next = response.data.next;
            this.pagination.previous = response.data.previous;
            this.pagination.showing = response.data.results.length;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    // Load Work sprint into dropdown
    loadSprint() {
      var queryParam = {
        version__project: this.projectID,
        page: this.$route.query.page,
        version: this.version,
      };
      axios
        .get("sprints/", {
          params: queryParam,
        })
        .then(
          function (response) {
            this.all_sprints = response.data.results;
            console.log("408", this.all_sprints);

            this.pagination.count = response.data.count;
            this.pagination.next = response.data.next;
            this.pagination.previous = response.data.previous;
            this.pagination.showing = response.data.results.length;

            console.log(response.status);
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    // Load Work Priority into dropdown
    loadFilteredSprint() {
      axios
        .get("sprints/", {
          params: {
            version: this.hasParentVersion,
          },
        })

        .then(
          function (response) {
            this.filtered_sprints = response.data.results;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    // Load Work Priority into dropdown
    loadTask() {
      axios
        .get("issues/", {
          params: {
            sprint: this.fiterByVersionSprint,
          },
        })
        // .then((response) => {
        //   this.all_tasks = response.data.results;
        // })
        .then(
          function (response) {
            this.all_tasks = response.data.results;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },

    // Load User Assignee
    // loadUsers() {
    //   axios
    //     .get("users/", {
    //     })
    //     .then((response) => {
    //       this.all_users = response.data.results;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },

    // getSprintDetails
    getSprintDetails() {
      axios.get("sprints/" + this.sprintID + "/").then(
        (response) => {
          this.sprint_details = response.data;
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
          // this.project_name = response.data.project_name;
          this.project_members = response.data.members;
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

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.project_members.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.project_members;
      }
    },
  },
};
</script>

<style scoped>
.text-muted {
  color: #6c757d !important;
  margin-left: 5px;
  font-size: 85%;
}
</style>