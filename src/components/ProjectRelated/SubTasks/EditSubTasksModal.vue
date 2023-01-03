<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Edit SubTask</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateSubIssueForm">
              <div class="form-group">
                <!-- <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class="labelMargin">Project:</label>
                      <i class="baseColorFont font-weight-bold">HRM-Nippon</i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class="labelMargin">Version:</label>
                      <i class="baseColorFont font-weight-bold">v1.0.01</i>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class="labelMargin">Sprint:</label>
                      <i class="baseColorFont font-weight-bold">Sprint 1</i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class="labelMargin">Task:</label>
                      <i class="baseColorFont font-weight-bold">Designation CRUD</i>
                    </div>
                  </div>
                </div>-->
                <!-- Subject-->
                <div class="form-row">
                  <!--Subject-->
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label>
                        Subject
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="subject"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.subject }"
                      />

                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.subject }"
                        v-if="SubTask_error_data && SubTask_error_data.subject"
                      >{{ SubTask_error_data.subject[0] }}</div>
                    </div>
                  </div>
                </div>

                <!--Priority & Start Date-->
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
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.work_type }"
                      >
                        <option value="false" disabled selected>Select Work Type</option>
                        <option
                          v-for="work_type in all_work_type"
                          :key="work_type.id"
                          :value="work_type.id"
                        >{{work_type.name}}</option>
                      </select>

                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.work_type }"
                        v-if="SubTask_error_data && SubTask_error_data.work_type"
                      >{{ SubTask_error_data.work_type[0] }}</div>
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
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.work_priority }"
                      >
                        <option disabled selected>Select Work Type</option>
                        <option
                          v-for="work_priority in all_work_priority"
                          :key="work_priority.id"
                          :value="work_priority.id"
                        >{{ work_priority.name }}</option>
                      </select>
                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.work_priority }"
                        v-if="SubTask_error_data && SubTask_error_data.work_priority"
                      >{{ SubTask_error_data.work_priority[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        Status
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        name="select"
                        type="choice"
                        v-model="status"
                        class="form-control"
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.status }"
                      >
                        <option disabled>Select Status</option>
                        <option value="assigned">Assigned</option>
                        <option value="running">Running</option>
                        <option value="pause">Pause</option>
                        <option value="done">Done</option>
                        <option value="problematic">Problematic</option>
                      </select>
                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.status }"
                        v-if="SubTask_error_data && SubTask_error_data.status"
                      >{{ SubTask_error_data.status[0] }}</div>
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
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <!--Start Date type="datetime-local"-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Expected Start Date
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="expected_start_date"
                        type="date"
                        class="form-control"
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.expected_start_date }"
                      />
                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.expected_start_date }"
                        v-if="SubTask_error_data && SubTask_error_data.expected_start_date"
                      >{{ SubTask_error_data.expected_start_date[0] }}</div>
                    </div>
                  </div>

                  <!--Due Date-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Expected End Date
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="expected_end_date"
                        type="date"
                        class="form-control"
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.expected_end_date }"
                      />
                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.expected_end_date }"
                        v-if="SubTask_error_data && SubTask_error_data.expected_end_date"
                      >{{ SubTask_error_data.expected_end_date[0] }}</div>
                    </div>
                  </div>
                </div>
                <!-- <div class="form-row">
                  
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>Runnig Datetime</label>
                      <input
                        name="joining-date"
                        v-model="start_date"
                        type="datetime-local"
                        class="form-control"
                      />
                    </div>
                  </div>

                  
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>Completed Datetime</label>
                      <input
                        name="joining-date"
                        v-model="due_date"
                        type="datetime-local"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>-->
                <!--Working Hour & Range-->
                <div class="form-row">
                  <!--Estimated Hour-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Estimated Hour
                        <span class="asterisk">*</span>
                      </label>
                      <span class="text-muted">(Hours)</span>
                      <input
                        v-model="estimated_hour"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.estimated_hour }"
                      />
                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.estimated_hour }"
                        v-if="SubTask_error_data && SubTask_error_data.estimated_hour"
                      >{{ SubTask_error_data.estimated_hour[0] }}</div>
                    </div>
                  </div>
                  <!--Working Hour-->
                  <!-- <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Working Hour
                        <span class="asterisk">*</span>
                      </label>
                      <span class="text-muted">(Hours)</span>
                      <input
                        v-model="working_hour"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.working_hour }"
                      />
                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.working_hour }"
                        v-if="SubTask_error_data && SubTask_error_data.working_hour"
                      >{{ SubTask_error_data.working_hour[0] }}</div>
                    </div>
                  </div>-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Task
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        name="select"
                        v-model="issue_id"
                        class="form-control"
                        :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.issue }"
                      >
                        <option value selected disabled>Select task</option>
                        <option
                          v-for="(task,index) in all_tasks"
                          :key="index"
                          :value="task.id"
                        >{{task.subject}}</option>
                      </select>
                      <div
                        :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.issue }"
                        v-if="SubTask_error_data && SubTask_error_data.issue"
                      >{{ SubTask_error_data.issue[0] }}</div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <!--Range-->
                  <div class="col-md-6">
                    <label>
                      Progress
                      <!-- <span class="asterisk">*</span> -->
                    </label>
                    <input
                      type="range"
                      v-model="progress"
                      min="1"
                      max="100"
                      oninput="this.nextElementSibling.value = this.value"
                    />
                    <!-- :class="{ 'is-invalid': SubTask_error_data && SubTask_error_data.progress }"
                      <div
                      :class="{ 'invalid-feedback': SubTask_error_data && SubTask_error_data.progress }"
                      v-if="SubTask_error_data && SubTask_error_data.progress"
                    >{{ SubTask_error_data.progress[0] }}</div>-->

                    <output class="float-right">{{progress}}</output>
                    <div
                      v-if="SubTask_error_data && SubTask_error_data.progress"
                      class="alert alert-danger mt-4"
                      role="alert"
                    >
                      <strong>No progress given</strong>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="updateSubIssueForm()" class="mt-2 btn btn-base float-right">Submit</button>
            <button class="mt-2 float-right ml-2 btn btn-successs" @click="CloseModal()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
// import Swal from "sweetalert2";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Swal from "sweetalert2";

// import Swal from "sweetalert2";
// import permissions from "../../../authorization/permissions";

export default {
  name: "EditSubTasksModal",
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      subject: null,
      description: null,
      issue: null,
      work_type: null,
      work_priority: null,
      updated_at: null,
      estimated_hour: null,
      working_hour: null,
      progress: null,
      status: null,
      expected_start_date: null,
      expected_end_date: null,
      // new properties
      all_tasks: null,
      subtask_id: null,
      subtask_info: null,
      issue_id: null,
      projectID: null,
      files_related: [],
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
      SubTask_error_data: {
        subject: null,
        work_type: null,
        work_priority: null,
        estimated_hour: null,
        working_hour: null,
        progress: null,
        status: null,
      },

      // for CKEditor
      editor: ClassicEditor,

      load_issue: null,

      all_work_type: null,
      all_work_priority: null,
    };
  },
  created() {
    this.projectID = this.$route.query.project_id;
    this.subtask_id = this.$store.state.projectRelated.SubtaskId;
    this.loadWorkType();
    this.loadWorkPriority();
    // this.getIssueList();
    this.loadTask();
    this.getSubIssueData();
    // this.loadContentType();
  },
  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.TodoEditModalVisible;
    },
  },
  methods: {
    CloseModal() {
      this.$store.commit("projectRelated/toggleTodoEditModal", null);
    },
    // getSubIssueData
    getSubIssueData: function () {
      axios.get("sub-issues/" + this.subtask_id + "/").then(
        // axios.get(`sub-issues/15/`).then(
        (response) => {
          this.subject = response.data.subject;
          this.description = response.data.description;
          this.work_type = response.data.work_type.id;
          this.work_priority = response.data.work_priority.id;
          this.updated_at = response.data.updated_at;
          this.working_hour = response.data.working_hour;
          this.status = response.data.status;
          this.expected_start_date = response.data.expected_start_date;
          this.expected_end_date = response.data.expected_end_date;
          this.progress = response.data.progress;
          this.estimated_hour = response.data.estimated_hour;
          this.issue_id = response.data.issue.id;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    // updateSubIssue
    updateSubIssueForm() {
      const employeeID = localStorage.getItem("id");
      axios
        .put("sub-issues/" + this.subtask_id + "/", {
          subject: this.subject,
          description: this.description,
          issue: this.issue_id,
          work_type: this.work_type,
          work_priority: this.work_priority,
          estimated_hour: this.estimated_hour,
          // working_hour: this.working_hour,
          progress: this.progress,
          status: this.status,
          expected_start_date: this.expected_start_date,
          expected_end_date: this.expected_end_date,
          assignee: employeeID,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: "You have successfully edited a SubTask..",
          }).then((response) => {
            // this.$router.push({ name: "SubTasksList" });
            // this.$router.go();
            this.CloseModal();
            this.$emit("load-subtask");
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          this.SubTask_error_data = error.response.data;
          console.log("--++", error.response);
        });
    },
    // Load Work Priority into dropdown
    loadTask() {
      var queryParam = {
        sprint__version__project: this.projectID,
        // sprint__version: this.$route.query.sprint__version,
        // sprint: this.fiterByVersionSprint,
        page: this.$route.query.page,
      };
      axios
        .get("issues/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_tasks = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
        })
        // .then(
        //   function (response) {
        //     this.all_tasks = response.data.results;
        //   }.bind(this)
        // )
        .catch(function (error) {
          console.log(error);
        });
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

    // getIssueList
    getIssueList() {
      axios.get(`issues/${this.$route.params.id}/`).then(
        (response) => {
          this.load_issue = response.data.id;
          console.log("----UpdateIssue---", this.load_issue);
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
  },
};
</script>

<style scoped>
.card-body {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
