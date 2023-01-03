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

              <!-- <router-link v-if="hasPermission('add_project')">
                
              </router-link>-->
              <a
                v-if="hasPermission('add_subissue')"
                class="float"
                style="position: absolute; right: 0"
                @click="OpenAddModal()"
              >
                <button type="button" class="btn btn-successs" style="font-size: 15px">
                  <span class="fas fa-plus-square"></span> Add New SubTask
                </button>
              </a>
            </div>
          </div>
        </div>
        <projectNavbar  v-if="projectID"/>
        <AddSubTasksModal @load-subtask="SubTaskLoad" v-if="isAddModalVisible" />

        <EditSubTasksModal @load-subtask="SubTaskLoad" v-if="isEditModalVisible" />

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
                      &nbsp;
                      Search
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
                <form action @submit.prevent="searchSubTask">
                  <div class="form-row">
                    <!--Project Name-->
                    <div class="col-md-4" v-if="hasPermission('view_issue')">
                      <label>Task Name</label>
                      <div class="form-group">
                        <select name="select" v-model="task" class="form-control">
                          <option value="false" selected>Select task</option>
                          <option
                            v-for="(task,index) in all_tasks"
                            :key="index"
                            :value="task.id"
                          >{{task.subject}}</option>
                        </select>
                      </div>
                    </div>

                    <!--Branch-->
                    <div class="col-md-4">
                      <label>SubTask Subject</label>
                      <div class="form-group">
                        <input id="project_name" v-model="subject" type="text" class="form-control" />
                      </div>
                    </div>

                    <!--Client-->
                    <div class="col-md-4" v-if="hasPermission('view_user')">
                      <label>Assignee</label>
                      <select
                        name="select"
                        id="client"
                        v-model="filter_assignee"
                        class="form-control"
                      >
                        <option value>select assignee</option>
                        <option
                          v-for="(assignee,index)  in project_members"
                          :key="index"
                          :value="assignee.id"
                        >{{assignee.first_name + " " + assignee.last_name }}</option>
                      </select>
                    </div>

                    <!--Status-->
                    <!-- <div class="col-md-3">
                      <label>Status</label>
                      <select
                        name="select"
                        id="type"
                        v-model="status"
                        type="choice"
                        class="form-control"
                      >
                        <option value>select status</option>
                        <option value="PN">Pending</option>
                        <option value="RN">Running</option>
                        <option value="CM">Completed</option>
                        <option value="HO">Handover</option>
                        <option value="PP">Postponed</option>
                      </select>
                    </div>-->
                  </div>

                  <div class="form-row">
                    <div class="col-md-4"></div>
                    <div class="col-md-4"></div>

                    <div class="col-md-4">
                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-base float-right"
                          @submit.prevent="searchSubTask"
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
        <div class="card detailCard" v-if="load_task">
          <div class="cardContent">
            <div class="row">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-6">
                    <label class="labelMargin">Version:</label>
                    <span
                      v-if="load_task.sprint.version.version_name"
                    >{{load_task.sprint.version.version_name}}</span>
                  </div>
                  <div class="col-md-6">
                    <label class="labelMargin">Sprint:</label>
                    <span v-if="load_task.sprint.sprint_name">{{load_task.sprint.sprint_name}}</span>
                  </div>
                </div>

                <label class="labelMargin">Task:</label>
                <!-- <span
                  v-if="subtasks[0].issue.subject"
                  class="italicFont"
                >{{ subtasks[0].issue.subject}}</span>-->
                <span v-if="load_task.subject">{{load_task.subject}}</span>
              </div>
              <!-- <div class="vl"></div> -->
              <div class="col-md-6">
                <!-- <span class="badge badge-info bageRightMargin">
                  Assigned
                  <span class="badge badge-light">4</span>
                </span>
                <span class="badge badge-success bageRightMargin">
                  Done
                  <span class="badge badge-light">2</span>
                </span>
                <span class="badge badge-warning bageRightMargin">
                  Pause
                  <span class="badge badge-light">2</span>
                </span>
                <span class="badge badge-primary bageRightMargin">
                  Running
                  <span class="badge badge-light">1</span>
                </span>
                <span class="badge badge-danger bageRightMargin">
                  problematic
                  <span class="badge badge-light">0</span>
                </span>-->
              </div>
            </div>
          </div>
        </div>

        <!-- Todo card  api -->
        <div v-if="subtasks && subtasks.length >0">
          <div class="card" v-for="(subtask,index) in subtasks" :key="index">
            <div class="cardContent">
              <div class="row" style="line-height: 1">
                <div class="col-sm-1">
                  <div class="imgeContainer">
                    <img
                      v-if="subtask.assignee  && subtask.assignee.user_profile.image"
                      width="45"
                      height="45"
                      class="rounded-circle"
                      :src="subtask.assignee.user_profile.image"
                      alt="no image"
                    />
                    <img
                      v-else
                      width="45"
                      height="45"
                      class="rounded-circle"
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt
                    />
                  </div>
                </div>
                <div class="col-sm-2 float-left">
                  <div
                    v-if="subtask.subject"
                    class="todoTitle"
                    :title="subtask.subject"
                  >{{subtask.subject}}</div>
                  <span
                    class="text-muted"
                    v-if="subtask.assignee"
                  >by {{ subtask.assignee.first_name + " " + subtask.assignee.last_name }}</span>
                </div>

                <div class="col-sm-7">
                  <div class="row userInfo">
                    <div class="col-sm">
                      <label>Priority:</label>
                      <br />
                      <span class="baseColorFont">{{ subtask.work_priority.name}}</span>
                    </div>

                    <div class="col-sm">
                      <label>Status:</label>
                      <br />
                      <span v-if="subtask.status == 'assigned'" class="badge badge-info">Assigned</span>
                      <span v-if="subtask.status == 'done'" class="badge badge-success">Done</span>
                      <span v-if="subtask.status == 'pause'" class="badge badge-warning">Pause</span>
                      <span v-if="subtask.status == 'running'" class="badge badge-primary">Running</span>
                      <span
                        v-if="subtask.status == 'problematic'"
                        class="badge badge-danger"
                      >Problematic</span>
                    </div>
                    <div class="col-sm">
                      <label>Updated at:</label>
                      <br />
                      <span v-if="subtask.updated_at">{{subtask.updated_at}}</span>
                    </div>

                    <div class="col-sm-5">
                      <label>SubTask progress:</label>
                      <span>
                        <span v-if="subtask.progress ==null" class="float-right">
                          <b>0%</b>
                        </span>
                        <span v-else class="float-right">
                          <b>{{ subtask.progress + '%'}}</b>
                        </span>
                        <br />
                        <template class="progress mb-1" style="height: 10px;">
                          <template
                            class="progress-bar"
                            role="progressbar"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :data-original-title="subtask.progress"
                            :style="{'width': `${subtask.progress ? subtask.progress : 0}%`}"
                          ></template>
                        </template>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-sm">
                  <div class="float-right actionDropdown">
                    <div class="btn-group dropright">
                      <a
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="p-0 btn"
                      >
                        <button type="button" class="btn btn-successs actionButton">
                          <i id="addIcon" class="nav-link-icon fa fa-cog"></i>Action
                        </button>
                      </a>
                      <div
                        tabindex="-1"
                        role="menu"
                        aria-hidden="true"
                        class="dropdown-menu dropdown-menu-right"
                      >
                        <router-link
                          v-if="hasPermission('view_subissue')"
                          class="dropdown-item"
                          :to="{ name: 'SubTasksDetails',query: { project_id: projectID ,version_id: versionID,sprint_id:sprintID,task_id:taskID, subtask_id: subtask.id}}"
                        >View</router-link>
                        <a
                          v-if="hasPermission('change_subissue')"
                          class="dropdown-item"
                          href="#"
                          @click="OpenEditModal(subtask.id)"
                        >Edit</a>
                        <a
                          v-if="hasPermission('delete_subissue')"
                          class="dropdown-item"
                          href="#"
                          @click="deleteSubTaskItem(subtask.id) in subtasks"
                        >Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Pagination Start-->
          <div class="row mt-4">
            <div class="col-md-4">
              <ul class="pagination" v-if="pagination.count">
                <li class="page-item">
                  <a href="#">Showing {{ pagination.showing }} of {{ pagination.count }}</a>
                </li>
                <li :class="{ disabled: !pagination.previous }" class="page-item">
                  <a href="#!" v-on:click="setPage(pagination.previous)">Previous</a>
                </li>

                <li :class="{ disabled: !pagination.next }" class="page-item">
                  <a href="#!" v-on:click="setPage(pagination.next)">Next</a>
                </li>
              </ul>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-2"></div>
          </div>
          <!--Pagination End-->
        </div>
        <div v-else class="alert alert-success" role="alert">No Data Found!</div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import AddSubTasksModal from "./AddSubTasksModal";
import EditSubTasksModal from "./EditSubTasksModal";
// import Swal from "sweetalert2";

export default {
  name: "SubTasksList",
  components: {
    Master,
    projectNavbar,
    AddSubTasksModal,
    EditSubTasksModal,
  },
  data() {
    return {
      project_name: null,
      project_members: null,
      filter_assignee: null,
      users: null,
      task: null,
      all_tasks: null,
      subject: null,
      subtasks: null,
      load_task: null,
      all_branches: null,
      branch: null,
      client: null,
      status: null,
      projectID: null,
      versionID: null,
      sprintID: null,
      taskID: null,
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
    this.projectID = this.$route.query.project_id ? this.$route.query.project_id : this.$route.query.project;
    this.versionID = this.$route.query.version_id;
    this.sprintID = this.$route.query.sprint_id;
    this.taskID = this.$route.query.task_id ? this.$route.query.task_id : this.$route.query.issue;
    this.initialLoad();
  },

  updated() {
    this.projectID = this.$route.query.project_id ? this.$route.query.project_id : this.$route.query.project;
    this.versionID = this.$route.query.version_id;
    this.sprintID = this.$route.query.sprint_id;
    this.taskID = this.$route.query.task_id ? this.$route.query.task_id : this.$route.query.issue;
    this.initialLoad();
  },
  computed: {
    isAddModalVisible() {
      return this.$store.state.projectRelated.TodoAddModalVisible;
    },
    isEditModalVisible() {
      return this.$store.state.projectRelated.TodoEditModalVisible;
    },
  },
  methods: {
    OpenAddModal() {
      this.$store.commit(
        "projectRelated/toggleTodoAddModal",
        this.taskID
        // this.employee
      );
    },
    OpenEditModal(id) {
      this.$store.commit("projectRelated/toggleTodoEditModal", id);
    },
    initialLoad: function () {
      this.GetSubtaskList();
      this.getProjectDeatails();
      this.loadBranch();
      this.getTaskDetails();
      this.loadTask();
      // this.loadUsers();
    },
    loadUsers: function () {
      var queryParam = {};
      axios
        .get("users/", {
          params: queryParam,
        })
        .then((response) => {
          this.users = response.data.results;
          // this.pagination.count = response.data.count;
          // this.pagination.next = response.data.next;
          // this.pagination.previous = response.data.previous;
          // this.pagination.showing = response.data.results.length;
        });
    },
    // Load Work Priority into dropdown
    loadTask() {
      var queryParam = {
        sprint__version__project: this.projectID
          ? this.projectID
          : this.$route.query.project,
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
          // this.pagination.count = response.data.count;
          // this.pagination.next = response.data.next;
          // this.pagination.previous = response.data.previous;
          // this.pagination.showing = response.data.results.length;
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
    async SubTaskLoad() {
      // this.subtask_response_ID = null;
      await this.GetSubtaskList();
    },

    /*GetSubtaskList*/
    GetSubtaskList: function () {
      var queryParam = {
        subject: this.$route.query.subject,
        issue: this.$route.query.issue ? this.$route.query.issue : this.taskID,
        assignee: this.filter_assignee,
        // status: this.$route.query.status,
        project: this.projectID ? this.projectID : this.$route.query.project,
        page: this.$route.query.page,
      };
      axios
        .get("sub-issues/", {
          params: queryParam,
        })
        .then((response) => {
          this.subtasks = response.data.results;

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
          console.log("568", response.data.results);
          console.log(response.status);
        });
    },

    /*Delete Project*/
    deleteSubTaskItem: function (id) {
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
              this.GetSubtaskList();
            }
          });
          Swal.fire("Deleted!", "Subtasks has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Subtasks has not been deleted !", "error");
        }
      });
    },

    /*Load Branch*/
    loadBranch: function () {
      axios
        .get("branches/", {
        })
        .then(
          function (response) {
            this.all_branches = response.data;
          }.bind(this)
        );
    },

    // getTaskDetails
    getTaskDetails() {
      // axios.get(`issues/1/`).then(
      axios.get("issues/" + this.taskID + "/").then(
        (response) => {
          this.load_task = response.data;
          console.log("----load_task---", this.load_task);
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    getProjectDeatails: function () {
      axios.get("projects/" + this.projectID + "/").then(
        (response) => {
          this.form_data = response.data;
          this.project_name = response.data.project_name;
          this.project_members = response.data.members;
          // this.form_data.leave_type = this.form_data.leave_type.id;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    setPage(page) {
      this.pagination.page = page;
      this.searchSubTask();
    },
    /*search Project*/
    async searchSubTask() {
      await this.$router.push({
        path: "sub-task-list",
        query: {
          project: this.projectID ? this.projectID : this.$route.query.project,
          subject: this.subject,
          // issue: this.task ,
          issue: this.task ? this.task : this.taskID,
          // status: this.status,
          assignee: this.filter_assignee,
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

h3,
.h3 {
  font-size: 1.5rem;
}

/*  card */

.listTitle {
  margin-right: 10px;
}
/* navbar */
.nav-item {
  margin: 0px 20px;
}
/* sprint card */
.vl {
  border: 1px solid #eeeeee;
  margin-top: 0px;
  margin-bottom: 5px;
}

#addIcon {
  cursor: pointer;
}

.card {
  margin-top: 18px;
  padding-top: 18px;
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  background-color: #fff;
  border-left: 2px solid #69c5a5;
}

.card-content p {
  padding-bottom: 3px;
}
/* @media (min-width: 576px) */
.col-sm {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  text-align: left;
}

/* left border card  design */

.card p {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

/* .text-muted {
  color: #6c757d !important;
  margin-left: 5px;
  font-size: 85%;
} */
.card {
  /* transition: box-shadow 0.3s; */
  transition: box-shadow 0.2s ease-in-out, transform 0.35s ease-in-out;
}
.card:hover {
  /* box-shadow: 0 0 11px rgba(33, 33, 33, 0.2); */
  box-shadow: 0 11px 11px 0 rgba(0, 0, 0, 0.06);
  /* transform: translateY(-5px); */
}

.userInfo {
  vertical-align: middle;
}
.cardContent {
  margin: 5px 5px 5px 20px;
}
.fa-cog:before {
  content: "\f013";
  margin-right: 5px;
}

/* todo  */
.todoTitle {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 2px;
}
.imgeContainer {
  text-align: center;
  vertical-align: middle;
  margin-top: -3px;
  margin-bottom: 5px;
}
.text-muted {
    color: #6c757d !important;
    margin-left: 0px !important;
    font-size: 100% !important;
}
/* .detailCard {
  border: 1px solid #eaeaea;
}
.detailContent {
  margin: 5px 5px 5px 10px;
} */
</style>
