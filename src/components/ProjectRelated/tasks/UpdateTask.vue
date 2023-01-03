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
        <h5></h5>
        <projectNavbar v-if="projectID"/>
        <!--Task  Edit Form-->
        <div class="row" v-if="form_data">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <h5 class="baseColorFont">Update Task</h5>

                <form @submit.prevent="submitEditIssueForm">
                  <div class="form-group mt-4">
                    <div class="form-row">
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
                            <option value="false" disabled selected>Select Issue Type</option>
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
                            <option disabled selected>
                              Select Work
                              Type
                            </option>
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
                            <input 
                              type="checkbox"
                              v-model="hasParentTask"
                            />
                            <!-- :checked="hasParentTask == true" -->
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
                            v-model="form_data.sprint.version"
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
                            <option value  selected>Select task</option>
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

                    <!--Priority & Start Date-->
                    <div class="form-row">
                      <!--Start Date-->
                      <div class="col-md-6">
                        <label>
                          Start Date
                          <span class="asterisk">*</span>
                        </label>
                        <input
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

                      <!--Estimated time-->
                    </div>
                    <!--Upload File & Assignee-->
                    <!-- <div class="form-row mt-2">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <template v-for="(file, k) in files_related" :key="k">
                            <div class="row mt-4">
                              <div class="col-md-5">
                                <label>
                                  Upload Document
                                  <span class="asterisk">*</span>
                                </label>
                                <input
                                  type="file"
                                  class="form-control"
                                  @change="handleImage($event,k)"
                                  id="file"
                                />
                              </div>
                              <div class="col-md-5">
                                <label>
                                  Document Name
                                  <span class="asterisk">*</span>
                                </label>
                                <input
                                  class="form-control"
                                  type="text"
                                  autocomplete="off"
                                  v-model="file.file_name"
                                />
                              </div>
                              <div class="col-md-2" v-if="k==0"></div>
                              <div class="col-md-2" v-else>
                                <button
                                  class="btn btn-sm btn-del remove mt-4"
                                  style="color: firebrick; font-size: 20px; "
                                >
                                  <i class="fas fa-trash-alt" @click="deleteRow(k)"></i>
                                </button>
                              </div>
                            </div>
                            <div
                              v-if="error_data && error_data.non_field_errors"
                              class="col-md-6 alert alert-danger alert-dismissible fade show text-center"
                              role="alert"
                            >
                              These fields may not be blank
                              <button
                                type="button"
                                class="close"
                                data-dismiss="alert"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                          </template>
                        </div>
                        <button type="button" class="btn btn-base mt-2" @click="addNewRow">
                          <i class="fas fa-plus-circle"></i>
                          ADD NEW
                        </button>
                      </div>
                    </div>-->

                    <div class="form-group">
                      <button
                        @submit.prevent="submitEditIssueForm"
                        class="mt-2 btn btn-successs btn-lg float-right"
                      >Update task</button>
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
import axios from "axios";
import Swal from "sweetalert2";
import Master from "../../layouts/Master";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import ProjectName from "../../layouts/partials/projectRelated/ProjectName.vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "UpdateTask",
  components: {
    Master,
    projectNavbar,
    ckeditor: CKEditor.component,
    ProjectName,
  },
  data() {
    return {
      form_data: null,
      taskID: null,
      updateTaskID: null,
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
      upload_file: null,
      estimated_time: null,
      parent_task: null,
      version: null,
      sprint: null,
      files_related: [],
      filtered_sprints: null,
      fiterByVersionSprint: null,
      hasParentTask: false,
      all_work_type: null,
      all_work_statuses: null,
      all_work_priority: null,
      // all_users: null,
      all_versions: null,
      all_sprints: null,
      all_tasks: null,
      task_details: null,
      sprint_details: null,
      searchQuery: null,
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
    this.updateTaskID = this.$route.query.task_id;
    this.sprintID = this.$route.query.sprint_id;
    console.log("505", this.sprintID);
    this.initialLoad();
  },

  methods: {
    OpenParentTaskChoose() {
      this.hasParentTask = !this.hasParentTask;
    },
    initialLoad: function () {
      this.getTaskData();
      this.loadWorkType();
      this.loadWorkStatus();
      this.loadWorkPriority();
      // this.loadUsers();
      this.loadVersion();
      this.loadSprint();
      // this.loadFilteredSprint();
      this.loadTask();
      this.getProjectDeatails();
      // this.getSprintDetails();
      // this.getTaskDetails();
      // this.loadContentType();
    },
    // Submit Add Issue Form
    submitEditIssueForm() {
      const response = axios
        .put("issues/" + this.taskID + "/", {
          work_type: this.work_type,
          privacy_status: this.privacy_status,
          subject: this.subject,
          description: this.description,
          work_status: this.work_status,
          parent_issue: this.parent_task,
          work_priority: this.work_priority,
          start_date: this.start_date,
          assignee: this.assignee,
          due_date: this.due_date,
          estimated_time: this.estimated_time,
          sprint: this.sprint,

          // project: this.project_details,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: "You have successfully edited a task..",
          }).then((result) => {
            this.$router.push({
              name: "taskList",
              query: {
                project_id: this.projectID,
                version_id: this.versionID,
                sprint_id: this.sprintID,
                // id: this.updateTaskID,
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

    /*Get Issue Data*/
    getTaskData: function () {
      // axios.get(`issues/${this.$route.params.id}/`).then(
      axios.get("issues/" + this.updateTaskID + "/").then(
        (response) => {
          this.form_data = response.data;
          this.taskID = response.data.id;
          this.work_type = response.data.work_type.id;
          this.privacy_status = response.data.privacy_status;
          this.subject = response.data.subject;
          this.description = response.data.description;
          this.work_status = response.data.work_status.id;
          this.work_priority = response.data.work_priority.id;
          this.start_date = response.data.start_date;
          this.assignee = response.data.assignee.map((assignee) => assignee.id);
          this.due_date = response.data.due_date;
          this.sprint = response.data.sprint.id;
          this.estimated_time = response.data.estimated_time;
          if(response.data.parent_issue && response.data.parent_issue.id){
            this.parent_task = response.data.parent_issue.id;
          }
          if (this.parent_task != null) {
            this.hasParentTask = true;
          }
        },
        (response) => {
          console.log("----", response);
        }
      );
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
            version: this.form_data.sprint.version,
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
    loadTask() {
      var queryParam = {
        sprint__version__project: this.projectID,
        // sprint__version: this.$route.query.sprint__version,
        sprint: this.fiterByVersionSprint,
        page: this.$route.query.page,
      };
      axios
        .get("issues/", {
          params: queryParam,
        })
        .then(
          function (response) {
            this.all_tasks = response.data.results;
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

    // new row adding
    addNewRow() {
      this.files_related.push({
        file_name: "",
        upload_files: "",
        content_type: this.content_id,
      });
    },
    deleteRow(index) {
      if (index == 0) {
        alert("Can not be deleted !!");
      } else if (index > 0) {
        this.files_related.splice(index, 1);
      }
    },
    handleImage(e, index) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.getBase64(files[0], index);
    },
    getBase64(file, index) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var vm = this;
      reader.onload = function () {
        console.log(reader.result);
        vm.files_related[index].upload_files = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
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