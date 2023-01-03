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
              <div v-if="project_name">{{ project_name }}</div>
              <router-link
                :to="{ path: '/add-new-task', query: queryString }"
                v-if="hasPermission('add_issue')"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button
                    type="button"
                    class="btn btn-successs"
                    style="font-size: 15px"
                  >
                    <span class="fas fa-plus-square"></span> Add New task
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <projectNavbar v-if="projectID" />
        <!--Advanced Search Start-->
        <div id="accordion" class="acordinContainer">
          <div class="searchFormCard">
            <div
              class="row cursorPointer"
              data-toggle="collapse"
              data-target="#collapseOne1"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div class="col-md-10">
                <div class="float-left headerContaier">
                  <div class="div">
                    <h5>
                      <i class="fa fa-search"></i>
                      &nbsp; Search
                      <!-- <span class="text-muted" style="font-size:12px;">(Click for open)</span> -->
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="float-right"></div>
              </div>
              <div class="col-md-1"></div>
            </div>

            <div data-parent="#accordion" id="collapseOne1" class="collapse">
              <hr />
              <div class="card-body">
                <form action @submit.prevent="searchTask">
                  <div class="form-row">
                    <!--Version-->
                    <div class="col-md-3" v-if="hasPermission('view_version')">
                      <label>Version</label>
                      <div class="form-group">
                        <select
                          name="select"
                          v-model="sprint__version"
                          class="form-control"
                        >
                          <option value selected>select version</option>
                          <option
                            v-for="(version, index) in all_versions"
                            :key="index"
                            :value="version.id"
                          >
                            {{ version.version_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <!--Client-->
                    <div class="col-md-3" v-if="hasPermission('view_sprint')">
                      <label>Sprint</label>
                      <select
                        name="select"
                        v-model="sprint"
                        class="form-control"
                      >
                        <option value selected>Select sprint</option>
                        <option
                          v-for="(sprnt, index) in all_sprints"
                          :key="index"
                          :value="sprnt.id"
                        >
                          {{ sprnt.sprint_name }}
                        </option>
                      </select>
                      <!--:class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                         <div
                        :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                        v-if="task_error_data && task_error_data.sprint"
                      >{{ task_error_data.sprint[0] }}</div>-->
                    </div>
                    <!--Client-->
                    <div
                      class="col-md-3"
                      v-if="hasPermission('view_workpriority')"
                    >
                      <label>Priority</label>
                      <select
                        name="select"
                        v-model="work_priority"
                        class="form-control"
                      >
                        <option value selected>Select priority</option>
                        <option
                          v-for="(priority, index) in all_work_priority"
                          :key="index"
                          :value="priority.id"
                        >
                          {{ priority.name }}
                        </option>
                      </select>
                      <!-- :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                         <div
                        :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                        v-if="task_error_data && task_error_data.sprint"
                      >{{ task_error_data.sprint[0] }}</div>-->
                    </div>

                    <!--Status-->
                    <div class="col-md-3">
                      <label>Task Subject</label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          v-model="subject"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4"></div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-base float-right"
                          @submit.prevent="searchProject"
                        >
                          Search
                          <i class="fa fa-search"></i>&nbsp;
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!--Advanced Search End-->

        <div class="row" v-if="tasks">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <div>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">SL</th>
                        <th colspan="4">Subject</th>
                        <th scope="col">Task ID</th>
                        <th scope="col">Sprint Name</th>
                        <th scope="col">Privacy status</th>
                        <th scope="col" style="width: 20%">Work Type</th>
                        <th scope="col">Priority</th>
                        <th colspan="4">Progress</th>
                        <th scope="col">Start date</th>
                        <th scope="col">Due date</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody v-if="tasks.length > 0">
                      <tr v-for="(task, index) in tasks" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td colspan="4">{{ task.subject }}</td>
                        <td>{{ task.issue_id }}</td>
                        <td>{{ task.sprint.sprint_name }}</td>

                        <td v-if="task.privacy_status == 'Pub'">
                          <span class="badge badge-success">Public</span>
                        </td>
                        <td v-if="task.privacy_status == 'Pri'">
                          <span class="badge badge-info">Private</span>
                        </td>
                        <td v-if="task.privacy_status == 'Oth'">
                          <span class="badge badge-secondary">Others</span>
                        </td>
                        <td>{{ task.work_type.name }}</td>
                        <td>{{ task.work_priority.name }}</td>

                        <td colspan="4">
                          <span>
                            <span
                              v-if="task.issue_progress == null"
                              class="float-right progressNumber"
                              >0.00%</span
                            >
                            <span v-else class="float-right progressNumber">{{
                              task.issue_progress + "%"
                            }}</span>
                            <br />
                            <template class="progress mb-1" style="height: 9px">
                              <template
                                class="progress-bar"
                                role="progressbar"
                                aria-valuenow="50"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                :data-original-title="task.issue_progress"
                                :style="{
                                  width: `${
                                    task.issue_progress
                                      ? task.issue_progress
                                      : 0
                                  }%`,
                                }"
                              ></template>
                            </template>
                          </span>
                        </td>
                        <td>{{ task.start_date }}</td>
                        <td>{{ task.due_date }}</td>

                        <td class="td_action">
                          <div class="demoClass">
                            <div class="btn-group dropright">
                              <a
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                class="p-0 btn"
                              >
                                <i
                                  class="nav-link-icon fa fa-cog actionMargin"
                                ></i>
                              </a>
                              <div
                                tabindex="-1"
                                role="menu"
                                aria-hidden="true"
                                class="dropdown-menu dropdown-menu-right"
                              >
                                <router-link
                                  v-if="hasPermission('view_issue')"
                                  class="dropdown-item"
                                  :to="{
                                    name: 'taskDetails',
                                    query: {
                                      project_id: projectID,
                                      version_id: versionID,
                                      sprint_id: sprintID,
                                      task_id: task.id,
                                    },
                                  }"
                                  >View</router-link
                                >
                                <router-link
                                  v-if="hasPermission('change_issue')"
                                  class="dropdown-item"
                                  :to="{
                                    name: 'UpdateTask',
                                    query: {
                                      project_id: projectID,
                                      version_id: versionID,
                                      sprint_id: sprintID,
                                      task_id: task.id,
                                    },
                                  }"
                                  >Edit</router-link
                                >
                                <!-- <a class="dropdown-item" href="#" @click="OpenEditModal()">Edit</a> -->
                                <a
                                  v-if="hasPermission('delete_issue')"
                                  class="dropdown-item"
                                  href="#"
                                  @click="deleteTaskItem(task.id) in tasks"
                                  >Delete</a
                                >

                                <router-link
                                  v-if="hasPermission('view_subissue')"
                                  class="dropdown-item"
                                  :to="{
                                    name: 'SubTasksList',
                                    query: {
                                      project_id: projectID,
                                      version_id: versionID,
                                      sprint_id: sprintID,
                                      task_id: task.id,
                                    },
                                  }"
                                >
                                  <!-- <i class="fas fa-eye"></i> -->
                                  SubTasks
                                </router-link>
                                <!-- <a class="dropdown-item" href="#"></a> -->
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <!-- <tr>
                        <td>2</td>
                        <td colspan="4">Attendance records</td>
                        <td>Bug fix</td>
                        <td>New</td>
                        <td>
                          <span class="badge badge-pill badge-success">Normal</span>
                        </td>

                        <td colspan="4">
                          <div class="progress mb-1" style="height: 7px;">
                            <div
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style="width: 50%;"
                            ></div>
                          </div>
                        </td>
                        <td>22-04-2021</td>

                        <td class="td_action">
                          <div class="demoClass">
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
                                <router-link
                                  class="dropdown-item"
                                  :to="{ name: 'VersionDetails'}"
                                >View</router-link>
                                <a class="dropdown-item" href="#" @click="OpenEditModal()">Edit</a>
                                <a class="dropdown-item" href="#">Delete</a>
                                <a class="dropdown-item" href="#">Todos</a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      -->
                    </tbody>
                    <!--  if No result  -->
                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="18" class="text-center align-middle">
                          <h4>No data found !!</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <ul class="pagination" v-if="pagination.count">
              <li class="page-item">
                <a href="#"
                  >Showing {{ pagination.showing }} of {{ pagination.count }}</a
                >
              </li>
              <li :class="{ disabled: !pagination.previous }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.previous)"
                  >Previous</a
                >
              </li>

              <li :class="{ disabled: !pagination.next }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.next)">Next</a>
              </li>
            </ul>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Master from "../../layouts/Master";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "taskList",
  components: { Master, projectNavbar },
  data() {
    return {
      queryString: {},
      project_name: null,
      issue_list: null,
      tasks: null,
      work_priority: null,
      sprint__version: null,
      sprint: null,
      all_versions: null,
      all_sprints: null,
      all_work_priority: null,
      projectID: null,
      versionID: null,
      sprintID: null,
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
    // this.pagination.count = null;
    // this.pagination.next = null;
    // this.pagination.previous = null;
    // this.pagination.showing = null;
    this.projectID = this.$route.query.project_id
      ? this.$route.query.project_id
      : this.$route.query.sprint__version__project;
    this.versionID = this.$route.query.version_id;
    this.sprintID = this.$route.query.sprint_id
      ? this.$route.query.sprint_id
      : this.$route.query.sprint;
    this.initialLoad();
    this.processQueryString();
  },
  updated() {
    this.projectID = this.$route.query.project_id
      ? this.$route.query.project_id
      : this.$route.query.sprint__version__project;
    this.versionID = this.$route.query.version_id;
    this.sprintID = this.$route.query.sprint_id
      ? this.$route.query.sprint_id
      : this.$route.query.sprint;
    this.initialLoad();
    this.processQueryString();
  },

  methods: {
    initialLoad: function () {
      this.GetTaskList();
      this.loadSprint();
      this.loadVersion();
      this.loadWorkPriority();
      this.getProjectDeatails();
    },
    processQueryString() {
      this.projectID = this.$route.query.project_id
        ? this.$route.query.project_id
        : this.$route.query.sprint__version__project;
      this.versionID = this.$route.query.version_id;
      this.sprintID = this.$route.query.sprint_id
        ? this.$route.query.sprint_id
        : this.$route.query.sprint;
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
    // Load Work Priority into dropdown
    loadVersion() {
      var queryParam = {
        project: this.projectID
          ? this.projectID
          : this.$route.query.sprint__version__project,
        page: this.$route.query.page,
      };
      axios
        .get("versions/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_versions = response.data.results;
          // this.pagination.count = response.data.count;
          // this.pagination.next = response.data.next;
          // this.pagination.previous = response.data.previous;
          // this.pagination.showing = response.data.results.length;
          console.log("556", this.all_versions);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // Load Work Priority into dropdown
    loadSprint() {
      var queryParam = {
        version__project: this.projectID
          ? this.projectID
          : this.$route.query.sprint__version__project,
        page: this.$route.query.page,
      };
      axios
        .get("sprints/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_sprints = response.data.results;
          // this.pagination.count = response.data.count;
          // this.pagination.next = response.data.next;
          // this.pagination.previous = response.data.previous;
          // this.pagination.showing = response.data.results.length;
          console.log("556", this.all_sprints);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // Load Work Priority into dropdown
    loadWorkPriority() {
      // const token = localStorage.getItem("token");
      axios.get("work-priorities/").then((response) => {
        this.all_work_priority = response.data;
        console.log(response.status);
      });
    },

    /*GetSubtaskList*/
    GetTaskList: function () {
      // this.pagination.count = null;
      // this.pagination.next = null;
      // this.pagination.previous = null;
      // this.pagination.showing = null;
      var queryParam = {
        sprint__version__project: this.projectID
          ? this.projectID
          : this.$route.query.sprint__version__project,
        sprint__version: this.$route.query.sprint__version,
        sprint: this.$route.query.sprint
          ? this.$route.query.sprint
          : this.sprintID,
        subject: this.$route.query.subject,
        work_priority: this.work_priority,
        page: this.$route.query.page,
      };
      axios
        .get("issues/", {
          params: queryParam,
        })
        .then((response) => {
          this.tasks = response.data.results;

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;

          console.log(response.status);
        });
    },
    deleteTaskItem(id) {
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
          axios.delete("issues/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetTaskList();
            }
          });
          Swal.fire("Deleted!", "Tasks has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Tasks has not been deleted !", "error");
        }
      });
    },
    getProjectDeatails: function () {
      axios.get("projects/" + this.projectID + "/").then(
        (response) => {
          this.form_data = response.data;
          this.project_name = response.data.project_name;
          // this.form_data.leave_type = this.form_data.leave_type.id;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    setPage(page) {
      this.pagination.page = page;
      this.searchTask();
    },
    searchTask() {
      this.$router.push({
        path: "task-list",
        query: {
          sprint__version__project: this.projectID
            ? this.projectID
            : this.$route.query.sprint__version__project,
          sprint__version: this.sprint__version,
          sprint: this.sprint ? this.sprint : this.$route.query.sprint_id,
          subject: this.subject,
          work_priority: this.work_priority,
          page: this.pagination.page,
        },
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
.nav-item {
  margin: 0px 30px;
}

/* for searhForm */
.h5 {
  font-size: 1.25rem;
  /* font-weight: 700; */
  font-family: Karla, sans-serif;
  color: #495057;
}
hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.actionMargin {
  margin-left: 10px;
}

.fa-gear:before,
.fa-cog:before {
  content: "\f013";
  color: #69c5a5;
}
.progressNumber {
  font-size: 11px;
}
</style>
