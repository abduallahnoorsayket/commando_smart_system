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
              <!-- <div v-if="project_name">{{project_name}}</div> -->
              <ProjectName v-if="projectID" :project_ID="projectID" />
              <a
                class="float"
                style="position: absolute; right: 0"
                @click="OpenAddModal()"
                v-if="hasPermission('add_version')"
              >
                <button type="button" class="btn btn-successs" style="font-size: 15px">
                  <span class="fas fa-plus-square"></span> Add New Version
                </button>
              </a>
            </div>
          </div>
        </div>

        <projectNavbar v-if="projectID" />
        <AddVersionModal @load-version="VersionLoad" v-if="isAddModalVisible" />
        <EditVersionModal @load-version="VersionLoad" v-if="isEditModalVisible" />
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
                <form action @submit.prevent="searchVersion">
                  <div class="form-row">
                    <!--Version-->
                    <!-- <div class="col-md-6">
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
                    </div>-->

                    <!--Sprint name-->
                    <div class="col-md-12">
                      <label>Version name</label>
                      <div class="form-group">
                        <input class="form-control" type="text" v-model="version_name" />
                      </div>
                    </div>
                    <!-- <div class="col-md-6">
                      <label>Status</label>
                      <select name="select" v-model="status" type="choice" class="form-control">
                        <option value="PN">Pending</option>
                        <option value="RN">Running</option>
                        <option value="PP">Postponed</option>
                        <option value="CM">Completed</option>
                        <option value="HO">Handovered</option>
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
                          @submit.prevent="searchVersion"
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

        <!-- newcard -->
        <div v-if="versions  && versions.length >0">
          <div class="row mt-3">
            <div class="col-md-4" v-for="(version,index) in versions" :key="index">
              <div
                class="main-card card"
                :class="[ version.is_current == true ? 'activeCard' : null]"
              >
                <div class="detailContaier">
                  <h3 class="overviewMarign" v-if="version.version_name">
                    {{version.version_name}}
                    <span
                      v-if="version.version_id"
                      class="text-muted version_ID"
                    >({{version.version_id}})</span>
                    <div class="float-right">
                      <div class="btn-group dropleft">
                        <a
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          class="p-0 btn"
                        >
                          <i id="addIcon" class="nav-link-icon fas fa-ellipsis-h mr-2 float-right"></i>
                        </a>
                        <div
                          tabindex="-1"
                          role="menu"
                          aria-hidden="true"
                          class="dropdown-menu dropdown-menu-right"
                        >
                          <router-link
                            v-if="hasPermission('view_version')"
                            class="dropdown-item"
                            :to="{ name: 'VersionDetails', query: { project_id: projectID ,version_id: version.id}}"
                          >View</router-link>
                          <a
                            v-if="hasPermission('change_version')"
                            class="dropdown-item"
                            @click="OpenEditModal(version.id)"
                          >Edit</a>
                          <a
                            v-if="hasPermission('delete_version')"
                            class="dropdown-item"
                            href="#"
                            @click="deleteVersionItem(version.id) in versions"
                          >Delete</a>

                          <router-link
                            v-if="hasPermission('view_sprint')"
                            class="dropdown-item"
                            :to="{ name: 'SprintList', query: { project_id: projectID ,version_id: version.id} }"
                          >Sprints</router-link>
                        </div>
                      </div>
                    </div>
                  </h3>

                  <div class="row">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-6">
                          <label class="labelRightMargin">Status:</label>
                          <span v-if="version.status == 'PN' ">
                            <span class="badge badge-info">Pending</span>
                          </span>
                          <span v-if="version.status == 'RN' ">
                            <span class="badge badge-primary">Running</span>
                          </span>
                          <span v-if="version.status == 'CM' ">
                            <span class="badge badge-success">Completed</span>
                          </span>
                          <span v-if="version.status == 'PP' ">
                            <span class="badge badge-danger">Postpoend</span>
                          </span>
                          <span v-if="version.status == 'HO' ">
                            <span class="badge badge-secondary">Handovered</span>
                          </span>
                          <br />
                          <label class="labelRightMargin">Current:</label>
                          <span v-if="version.is_current == false" class="currentColor">
                            <i class="fas fa-times-circle"></i>
                          </span>
                          <span v-else class="currentColor">
                            <i class="fas fa-check-circle"></i>
                          </span>
                          <br />
                          <label class="labelRightMargin">Total Sprints:</label>
                          <router-link
                            :to="{ name: 'SprintList', query: { project_id: projectID ,version_id: version.id} }"
                            v-if="hasPermission('view_sprint')"
                            class="text-muted newLink"
                          >
                            <span v-if="version.total_sprint == 0">0</span>
                            <span v-else-if="version.total_sprint">{{version.total_sprint}}</span>
                          </router-link>

                          <br />
                        </div>
                        <div class="col-md-6 progressMargin">
                          <br />
                          <label class="labelRightMargin">Progress:</label>
                          <span
                            v-if="version.version_progress == null"
                            class="float-right text-muted progressText"
                          >0.00%</span>
                          <span
                            v-else
                            class="float-right text-muted progressText"
                          >{{version.version_progress}}%</span>
                          <template class="progress mb-1" style="height: 10px;">
                            <template 
                              class="progress-bar"
                              role="progressbar"
                              aria-valuenow="20"
                              aria-valuemin="0"
                              aria-valuemax="100"
                              :data-original-title="version.version_progress"
                              :style="{'width': `${version.version_progress ? version.version_progress : 0}%`}"
                            ></template>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-success" role="alert">No Data Found!</div>

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
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";
import AddVersionModal from "./AddVersionModal";
import EditVersionModal from "./EditVersionModal";
import projectNavbar from "../../layouts/partials/projectRelated/projectNavbar.vue";
import ProjectName from "../../layouts/partials/projectRelated/ProjectName.vue";
// import Swal from "sweetalert2";

export default {
  name: "VersionList",
  components: {
    Master,
    AddVersionModal,
    EditVersionModal,
    projectNavbar,
    ProjectName,
  },
  data() {
    return {
      queryString: {},
      versions: null,
      project_name: null,
      version_name: null,
      all_branches: null,
      branch: null,
      client: null,
      status: null,
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
    this.projectID = this.$route.query.project_id ? this.$route.query.project_id :this.$route.query.project;
    this.initialLoad();
    this.processQueryString();
  },

  updated() {
    this.projectID = this.$route.query.project_id ? this.$route.query.project_id :this.$route.query.project;
    this.initialLoad();
    this.processQueryString();
  },
  computed: {
    isAddModalVisible() {
      return this.$store.state.projectRelated.VersionAddModalVisible;
    },
    isEditModalVisible() {
      return this.$store.state.projectRelated.VersionEditModalVisible;
    },
  },
  methods: {
    OpenAddModal() {
      this.$store.commit(
        "projectRelated/toggleVersionAddModal"
        // this.employee
      );
    },
    OpenEditModal(id) {
      this.$store.commit("projectRelated/toggleVersionEditModal", id);
    },

    initialLoad: function () {
      this.getProjectDeatails();
      this.GetVersionList();
      // this.loadVersion();
    },
    processQueryString() {
      this.projectID = this.$route.query.project_id ? this.$route.query.project_id :this.$route.query.project;
      this.versionID = this.$route.query.version_id;
      this.sprintID = this.$route.query.sprint_id;
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
      await this.GetVersionList();
    },
    // Load Work Priority into dropdown
    loadVersion() {
      axios
        .get("versions/", {
          params: {
            // version: this.sprint_details.version.id,
          },
        })
        .then((response) => {
          this.all_versions = response.data.results;
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
    GetVersionList: function () {
      var queryParam = {
        project: this.projectID ? this.projectID : this.$route.query.project,
        // version: this.$route.query.version_id
        //   ? this.$route.query.version_id
        //   : this.version,
        version_name: this.$route.query.version_name,
        page: this.$route.query.page,
      };
      axios
        .get("versions/", {
          params: queryParam,
        })
        .then((response) => {
          this.versions = response.data.results;

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;

          console.log(response.status);
        });
    },

    /*Delete deleteVersionItem*/
    deleteVersionItem: function (id) {
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
          axios.delete("versions/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetVersionList();
            }
          });
          Swal.fire("Deleted!", "Version has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Version has not been deleted !", "error");
        }
      });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchVersion();
    },

    /*search Project*/
    async searchVersion() {
      await this.$router.push({
        path: "version-list",
        query: {
          // version: this.version,
          project: this.projectID ? this.projectID : this.$route.query.project,
          version_name: this.version_name,
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

/* version card */
.card {
  transition: box-shadow 0.2s ease-in-out, transform 0.35s ease-in-out;
}
.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  /* box-shadow: 0 11px 11px 0 rgba(0, 0, 0, 0.06); */
  transform: translateY(-3px);
}
.activeCard {
  border: 1px solid #eaeaea;
  background-color: #e6f7f4;
  margin-bottom: 20px;
  border-left: 2px solid #69c5a5;
  border-radius: 0px;
}
.detailContaier {
  margin: 10px 20px 5px 20px;
}
/* .fa-ellipsis-h:before {
  content: "\f141";
  font-size: 20px;
  color: #69c5a5;
} */
.overviewMarign {
  margin-bottom: 22px;
}
.progressMargin {
  margin-top: 13px;
}
.version_ID {
  font-size: 14px !important;
  font-style: italic;
}
.currentColor {
  font-size: 15px;
}
</style>
