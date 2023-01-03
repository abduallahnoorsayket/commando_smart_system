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
                class="float"
                style="position: absolute; right: 0"
                @click="OpenAddModal()"
                v-if="hasPermission('add_sprint')"
              >
                <button type="button" class="btn btn-successs" style="font-size: 15px">
                  <span class="fas fa-plus-square"></span> Add New Sprint
                </button>
              </a>
            </div>
          </div>
        </div>
        <projectNavbar v-if="projectID"/>
        <AddSprintModal @load-sprint="SprintLoad" v-if="isAddModalVisible" />
        <EditSprintModal @load-sprint="SprintLoad" v-if="isEditModalVisible" />
        <!-- <AddVersionModal v-if="isAddModalVisible" />
        <EditVersionModal v-if="isEditModalVisible" />-->
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
                <form action @submit.prevent="searchSprint">
                  <div class="form-row">
                    <!--Version-->
                    <div class="col-md-6" v-if="hasPermission('view_version')">
                      <label>Version</label>
                      <div class="form-group">
                        <select name="select" v-model="version" class="form-control">
                          <option value selected>select version</option>
                          <option
                            v-for="(version,index) in all_versions"
                            :key="index"
                            :value="version.id"
                          >{{ version.version_name }}</option>
                        </select>
                      </div>
                    </div>

                    <!--Sprint name-->
                    <div class="col-md-6">
                      <label>Sprint name</label>
                      <div class="form-group">
                        <input class="form-control" type="text" v-model="sprint_name" />
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
                          @submit.prevent="searchSprint"
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

        <!-- Sprint card -->
        <div v-if="sprints && sprints.length >0">
          <template v-for="(sprint,index) in sprints" :key="index">
            <div class="card" :class="[ sprint.is_current == true ? 'activeCard' : null]">
              <div class="cardContent">
                <div class="row" style="line-height: 1">
                  <div class="col-sm-2">
                    <h5 class="userName baseColorFont" v-if="sprint.sprint_name">
                      <i class="fas fa-history"></i>
                      {{ sprint.sprint_name}}
                    </h5>
                  </div>

                  <div class="vl"></div>

                  <div class="col-sm-8">
                    <div class="row userInfo">
                      <div class="col-sm">
                        <label>Expected start date:</label>
                        <br />
                        <span v-if="sprint.expected_start_date">{{ sprint.expected_start_date}}</span>
                      </div>
                      <div class="vl"></div>
                      <div class="col-sm">
                        <label>Expected end date:</label>
                        <br />
                        <span v-if="sprint.expected_end_date">{{ sprint.expected_end_date}}</span>
                      </div>
                      <div class="vl"></div>
                      <div class="col-sm-6">
                        <label>Sprint progress:</label>
                        <span class="float-right">
                          <b v-if="sprint.sprint_progress == null">0.00%</b>
                          <b v-else>{{ sprint.sprint_progress + '%'}}</b>
                        </span>
                        <br />
                        <template class="progress mb-1" style="height: 10px;">
                          <template
                            class="progress-bar"
                            role="progressbar"
                            aria-valuenow="50"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            :data-original-title="sprint.sprint_progress"
                            :style="{'width': `${sprint.sprint_progress ? sprint.sprint_progress : 0}%`}"
                          ></template>
                        </template>
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
                          <!-- <i id="addIcon" class="nav-link-icon fa fa-cog" style="font: 45px"></i> -->
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
                            v-if="hasPermission('view_sprint')"
                            class="dropdown-item"
                            :to="{ name: 'SprintDetails', query: { project_id: projectID ,version_id: versionID,sprint_id: sprint.id}}"
                          >View</router-link>
                          <a
                            class="dropdown-item"
                            v-if="hasPermission('change_sprint')"
                            @click="OpenEditModal(sprint.id)"
                          >Edit</a>
                          <a
                            v-if="hasPermission('delete_sprint')"
                            class="dropdown-item"
                            href="#"
                            @click="deleteSprintItem(sprint.id) in sprints"
                          >Delete</a>

                          <router-link
                            v-if="hasPermission('view_issue')"
                            class="dropdown-item"
                            :to="{ name: 'taskList', query: { project_id: projectID ,version_id: versionID,sprint_id: sprint.id} }"
                          >Tasks</router-link>
                          <!-- <router-link
                          class="dropdown-item"
                          :to="{ name: 'Activities', query: { project_id: 1 ,version_id: 1,sprint_id: 1 } }"
                          >Activity</router-link>-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

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
import AddSprintModal from "./AddSprintModal";
import EditSprintModal from "./EditSprintModal";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
// import Swal from "sweetalert2";

export default {
  name: "SprintList",
  components: {
    Master,
    AddSprintModal,
    EditSprintModal,
    projectNavbar,
  },
  data() {
    return {
      sprints: null,
      sprint_name: null,
      form_data: null,
      project_name: null,
      all_versions: null,
      version: null,
      client: null,
      status: null,
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

  created() {
    this.projectID = this.$route.query.project_id ? this.$route.query.project_id:this.$route.query.version__project;
    this.versionID = this.$route.query.version_id ? this.$route.query.version_id :this.$route.query.version;
    this.initialLoad();
  },

  updated() {
    this.projectID = this.$route.query.project_id ? this.$route.query.project_id:this.$route.query.version__project;
    this.versionID = this.$route.query.version_id ? this.$route.query.version_id :this.$route.query.version;
    this.initialLoad();
  },
  computed: {
    isAddModalVisible() {
      return this.$store.state.projectRelated.SprintAddModalVisible;
    },
    isEditModalVisible() {
      return this.$store.state.projectRelated.SprintEditModalVisible;
    },
  },
  methods: {
    OpenAddModal() {
      this.$store.commit(
        "projectRelated/toggleSprintAddModal"
        // this.employee
      );
    },
    OpenEditModal(id) {
      this.$store.commit("projectRelated/toggleSprintEditModal", id);
    },
    initialLoad: function () {
      this.getProjectDeatails();
      this.GetSprintList();
      this.loadVersion();
    },
    async SprintLoad() {
      // this.subtask_response_ID = null;
      await this.GetSprintList();
    },
    // Load Work Priority into dropdown
    loadVersion() {
      var queryParam = {
        project: this.projectID
          ? this.projectID
          : this.$route.query.version__project,
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
    /*GetSprintList*/
    GetSprintList: function () {
      var queryParam = {
        version__project: this.projectID
          ? this.projectID
          : this.$route.query.version__project,
        // version: this.versionID ? this.versionID : this.version,
        version: this.versionID ? this.versionID : this.$route.query.version,
        sprint_name: this.$route.query.sprint_name,
        page: this.$route.query.page,
      };
      axios
        .get("sprints/", {
          params: queryParam,
        })
        .then((response) => {
          this.sprints = response.data.results;

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;

          console.log("GetSprintList////", this.sprints);
          console.log(response.status);
        });
    },

    /*Delete sprints*/
    deleteSprintItem: function (id) {
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
          axios.delete("sprints/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetSprintList();
            }
          });
          Swal.fire("Deleted!", "Sprint has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Sprints has not been deleted !", "error");
        }
      });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchSprint();
    },

    /*search Project*/
    async searchSprint() {
      await this.$router.push({
        path: "sprint-list",
        query: {
          // project_name: this.project_name,
          version__project: this.projectID
            ? this.projectID
            : this.$route.query.version__project,
          // version: this.$route.query.version ? this.$route.query.version : this.version,
          version: this.version ? this.version : this.$route.query.version_id,
          sprint_name: this.sprint_name,
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
.userName {
  overflow-wrap: break-word;
  margin-top: 5px !important;
  margin-left: 5px;
}
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
  margin-left: 10px;
}
.fa-cog:before {
  content: "\f013";
  margin-right: 5px;
}
.fa-history:before {
  content: "\f1da";
  cursor: pointer;
  padding: 10px 10px 10px 0px !important;
  color: #69c5a5;
}
.activeCard {
  border: 1px solid #eaeaea;
  background-color: #e6f7f4;
  /* margin-bottom: 20px; */
  border-left: 2px solid #69c5a5;
  border-radius: 0px;
}
</style>
