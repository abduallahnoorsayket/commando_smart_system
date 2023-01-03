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
              <div>Project List</div>

              <router-link :to="{ path: '/add-new-project' }" v-if="hasPermission('add_project')">
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-plus-square"></span> Add New Project
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
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
                <form action @submit.prevent="searchProject">
                  <div class="form-row">
                    <!--Project Name-->
                    <div class="col-md-3" v-if="hasPermission('view_project')">
                      <label>Project Name</label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="project_name"
                          v-model="project_name"
                          class="form-control"
                        >
                          <option value>select project</option>
                          <option
                            v-for="project in all_projects"
                            :key="project.id"
                            :value="project.project_name"
                          >{{ project.project_name }}</option>
                        </select>
                      </div>
                    </div>

                    <!--Branch-->
                    <div class="col-md-3" v-if="hasPermission('view_branch')">
                      <label>Branch</label>
                      <div class="form-group">
                        <select name="select" id="branch" v-model="branch" class="form-control">
                          <option value>select branch</option>
                          <option
                            v-for="brnch in all_branches"
                            :key="brnch.id"
                            :value="brnch.id"
                          >{{ brnch.branch_name }}</option>
                        </select>
                      </div>
                    </div>

                    <!--Client-->
                    <div class="col-md-3" v-if="hasPermission('view_client')">
                      <label>Client</label>
                      <select name="select" id="client" v-model="client" class="form-control">
                        <option value>select client</option>
                        <option
                          v-for="client in all_clients"
                          :key="client.id"
                          :value="client.id"
                        >{{ client.client_name }}</option>
                      </select>
                    </div>

                    <!--Status-->
                    <div class="col-md-3">
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

        <div v-if="projects && projects.length >0">
          <!-- project card start -->
          <div class="content">
            <div class="row">
              <div class="col-xl-4" v-for="(project,index) in projects" :key="index">
                <div class="card-box project-box">
                  <span v-if="project.status == 'PN' ">
                    <span class="badge badge-pill badge-info">Pending</span>
                  </span>
                  <span v-if="project.status == 'RN' ">
                    <span class="badge badge-pill badge-primary">Running</span>
                  </span>
                  <span v-if="project.status == 'CM' ">
                    <span class="badge badge-pill badge-success">Completed</span>
                  </span>
                  <span v-if="project.status == 'PP' ">
                    <span class="badge badge-pill badge-danger">Postpoend</span>
                  </span>
                  <span v-if="project.status == 'HO' ">
                    <span class="badge badge-pill badge-secondary">Handovered</span>
                  </span>

                  <div class="float-right">
                    <div class="btn-group dropleft">
                      <a
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="p-0 btn"
                      >
                        <i id="addIcon" class="nav-link-icon fas fa-ellipsis-h"></i>
                      </a>
                      <div
                        tabindex="-1"
                        role="menu"
                        aria-hidden="true"
                        class="dropdown-menu dropdown-menu-right"
                      >
                        <router-link
                          v-if="hasPermission('view_project')"
                          class="dropdown-item"
                          :to="{ name: 'ProjectDetails', query: { project_id: project.id } , }"
                        >View</router-link>
                        <router-link
                          v-if="hasPermission('change_project')"
                          class="dropdown-item"
                          :to="{ name: 'UpdateNewProject',query: { project_id: project.id }  }"
                        >Edit</router-link>
                        <a
                          v-if="hasPermission('delete_project')"
                          class="dropdown-item"
                          @click="deleteProjectItem(project.id) in projects"
                        >Delete</a>
                        <router-link
                          v-if="hasPermission('view_version')"
                          class="dropdown-item"
                          :to="{name: 'VersionList' ,query: { project_id:  project.id} }"
                        >Versions</router-link>
                        <router-link
                          v-if="hasPermission('view_sprint')"
                          class="dropdown-item"
                          :to="{name: 'SprintList',query: { project_id:  project.id}}"
                        >Sprints</router-link>
                      </div>
                    </div>
                  </div>

                  <h4 class="mt-4 mb-3 projectTitle" v-if="project.project_name">
                    {{project.project_name}}
                    <span
                      v-if="project.project_id"
                      class="text-muted project_ID"
                    >({{project.project_id}})</span>
                  </h4>

                  <div class="row">
                    <div class="col-md-6">
                      <div v-if="project.current_version == null">
                        <p
                          class="text-muted italicFont projectInfos"
                          title="Current Version"
                        >----:----</p>
                      </div>
                      <div
                        v-else-if="project.current_version && project.current_version.version_name"
                      >
                        <p
                          class="text-muted italicFont projectInfos CurrentFonts"
                          title="Current Version"
                        >
                          {{project.current_version.version_name}}
                          <!-- <template v-if="index <1">
                            <span v-if="version && version.version_name">{{version.version_name}}</span>
                          </template>-->
                        </p>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div v-if="project.current_version == null">
                        <p
                          class="text-muted italicFont projectInfos"
                          title="Current Sprint"
                        >----:----</p>
                      </div>
                      <div
                        v-else-if="project.current_version && project.current_version.current_sprint == null"
                      >
                        <p
                          class="text-muted italicFont projectInfos"
                          title="Current Sprint"
                        >----:----</p>
                      </div>
                      <div
                        v-else-if="project.current_version && project.current_version.current_sprint"
                      >
                        <p
                          class="text-muted italicFont projectInfos CurrentFonts"
                          title="Current Version"
                        >{{project.current_version.current_sprint.sprint_name}}</p>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-0">
                    <div class="col-md-4">
                      <p class="text-muted projectInfos" title="Versions">
                        <i class="fas fa-code-fork"></i>

                        <router-link
                          :to="{ path: '/version-list',query: {project_id: project.id}}"
                          v-if="hasPermission('view_version')"
                          class="text-muted newLink"
                        >
                          <span v-if="project.total_version ==0">0</span>
                          <span v-else-if="project.total_version">{{project.total_version}}</span>
                        </router-link>
                      </p>
                    </div>
                    <div class="col-md-4">
                      <p class="text-muted projectInfos" title="Sprints">
                        <i class="fas fa-history"></i>

                        <router-link
                          :to="{ path: '/sprint-list',query: {project_id: project.id}}"
                          v-if="hasPermission('view_sprint')"
                          class="text-muted newLink"
                        >
                          <span v-if="project.total_sprint ==0">0</span>
                          <span v-else-if="project.total_sprint">{{project.total_sprint}}</span>
                        </router-link>
                      </p>
                    </div>
                    <div class="col-md-4">
                      <p class="text-muted projectInfos" title="Tasks">
                        <i class="fas fa-tasks"></i>

                        <router-link
                          :to="{ path: '/task-list',query: {project_id: project.id}}"
                          v-if="hasPermission('view_issue')"
                          class="text-muted newLink"
                        >
                          <span v-if="project.total_task ==0">0</span>
                          <span v-else-if="project.total_task">{{project.total_task}}</span>
                        </router-link>
                      </p>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-4">
                      <p class="text-muted projectInfos" title="Subtasks">
                        <i class="fas fa-check-square"></i>

                        <router-link
                          :to="{ path: '/sub-task-list',query: {project_id: project.id}}"
                          v-if="hasPermission('view_subissue')"
                          class="text-muted newLink"
                        >
                          <span v-if="project.total_sub_task ==0">0</span>
                          <span v-else-if="project.total_sub_task">{{project.total_sub_task}}</span>
                        </router-link>
                      </p>
                    </div>

                    <!-- <div class="col-md-4">
                      <p class="text-muted projectInfos" title="Files">
                        <i class="fas fa-files-o"></i>5
                      </p>
                    </div>-->
                    <div class="col-md-4"></div>
                  </div>

                  <!-- <div class="project-members mb-2" v-if="project.members">
                    <template v-for="(member,index) in project.members" :key="index">
                      <a :title="member.first_name+' '+member.last_name">
                        <p
                          hidden
                          v-if="member.first_name && member.last_name"
                        >{{member.first_name+" "+member.last_name }}</p>
                        <img
                          v-if="member.user_profile.image"
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
                    </template>
                  </div>-->

                  <!-- testing -->
                  <div class="project-members mb-2" v-if="project.members">
                    <template v-for="(member,index) in project.members" :key="index">
                      <template v-if="index <=4">
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
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            class="rounded-circle thumb-sm"
                            alt="friend"
                          />
                        </a>
                      </template>
                    </template>
                    <template v-if="project.members && project.members.length >5">
                      <div class="btn-group dropright">
                        <span
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          class="rounded-circle MemberCount"
                        >+</span>
                        <template
                          tabindex="-1"
                          role="menu"
                          aria-hidden="true"
                          class="dropdown-menu dropdown-menu-right"
                        >
                          <template v-if="project.members">
                            <span
                              class="dropdown-item"
                              v-for="(member,index) in project.members"
                              :key="index"
                            >
                              <img
                                v-if="member.user_profile && member.user_profile.image"
                                :src="member.user_profile.image"
                                class="rounded-circle thumb-sm marginRight"
                                alt="friend"
                              />

                              <img
                                v-else
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                class="rounded-circle thumb-sm marginRight"
                                alt="friend"
                              />
                              {{member.first_name+" "+member.last_name }}
                              <!-- <template v-if="index >1">
                             
                              </template>-->
                            </span>
                          </template>
                        </template>
                      </div>
                    </template>
                  </div>

                  <label class="progresStatus">Progress :</label>
                  <label class="float-right progresStatus">
                    <span v-if="project.project_progress ==null" class="text-custom">0.00%</span>
                    <span v-else class="text-custom">{{project.project_progress}}%</span>
                  </label>
                  <div class="progress mb-1" style="height: 10px;">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      :data-original-title="project.project_progress"
                      :style="{'width': `${project.project_progress ? project.project_progress : 0}%`}"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Pagination Start-->
          <div class="row">
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
// import Swal from "sweetalert2";

export default {
  name: "ProjectList",
  components: { Master },
  data() {
    return {
      queryString: {},
      projects: null,
      project_name: null,
      all_projects: null,
      all_clients: null,
      all_branches: null,
      branch: null,
      client: null,
      status: null,

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
    this.initialLoad();
    // this.processQueryString();
  },

  updated() {
    this.initialLoad();
  },

  methods: {
    initialLoad: function () {
      this.GetProjectList();
      this.loadBranch();
      this.loadClient();
      this.loadProject();
    },
    // processQueryString() {
    //   this.projectID = this.$route.query.project_id;
    //   this.versionID = this.$route.query.version_id;
    //   this.sprintID = this.$route.query.sprint_id;
    //   if (this.projectID) {
    //     this.queryString["project_id"] = this.projectID;
    //   }
    //   if (this.versionID) {
    //     this.queryString["version_id"] = this.versionID;
    //   }
    //   if (this.sprintID) {
    //     this.queryString["sprint_id"] = this.sprintID;
    //   }
    // },
    /*Get Project List*/
    GetProjectList: function () {
      var queryParam = {
        project_name: this.$route.query.project_name,
        branch: this.$route.query.branch,
        client: this.$route.query.client,
        status: this.$route.query.status,

        page: this.$route.query.page,
      };
      axios
        .get("projects/", {
          params: queryParam,
        })
        .then((response) => {
          this.projects = response.data.results;

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;

          console.log(response.status);
        });
    },

    /*Delete Project*/
    deleteProjectItem: function (id) {
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
          axios.delete("projects/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetProjectList();
            }
          });
          Swal.fire("Deleted!", "Your Project has been deleted!!", "success");
        } else {
          Swal.fire(
            "Cancelled",
            "Your Project has not been deleted !",
            "error"
          );
        }
      });
    },
    loadProject: function () {
      var queryParam = {
        // project_name: this.$route.query.project_name,
        // branch: this.$route.query.branch,
        // client: this.$route.query.client,
        // status: this.$route.query.status,
        // page: this.$route.query.page,
      };
      axios
        .get("project-short-list/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_projects = response.data;

          // this.pagination.count = response.data.count;
          // this.pagination.next = response.data.next;
          // this.pagination.previous = response.data.previous;
          // this.pagination.showing = response.data.results.length;

          console.log(response.status);
        });
    },
    /*Load Branch*/
    loadBranch: function () {
      axios
        .get("branch-short-list/", {
        })
        .then(
          function (response) {
            this.all_branches = response.data;
          }.bind(this)
        );
    },
    /*Load Client*/
    loadClient: function () {
      axios
        .get("client-short-list/", {
        })
        .then(
          function (response) {
            this.all_clients = response.data;
          }.bind(this)
        );
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchProject();
    },

    /*search Project*/
    async searchProject() {
      await this.$router.push({
        path: "project-list",
        query: {
          project_name: this.project_name,
          branch: this.branch,
          client: this.client,
          status: this.status,

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
hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
/* new card styles */

.card-box {
  padding: 20px;
  border-radius: 3px;
  margin-bottom: 30px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  transition: box-shadow 0.2s ease-in-out, transform 0.35s ease-in-out;
  /* width: 300px; */
}
.card-box:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  /* box-shadow: 0 11px 11px 0 rgba(0, 0, 0, 0.06); */
  /* transform: translateY(-5px); */
}

.project-box {
  position: relative;
}

.project-box .badge {
  /* position: absolute; */
  right: 20px;
}

.project-box h4 {
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  width: 100%;
  overflow: hidden;
}

.project-box ul li {
  padding-right: 30px;
}

.project-box .project-members a {
  margin: 0 0 10px -12px;
  display: inline-block;
  border: 3px solid #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.06),
    0 1px 0 0 rgba(0, 0, 0, 0.02);
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.06), 0 1px 0 0 rgba(0, 0, 0, 0.02);
}

.project-box .project-members a:first-of-type {
  margin-left: 0;
}

/* status badge */

.MemberCount {
  background: #c4c4c4;
  color: white;
  padding: 6px 12px;
  margin: 0 0 0px -12px;
  cursor: pointer;
}
h3,
.h3 {
  font-size: 1.5rem;
}
.fa-history:before {
  content: "\f1da";
  cursor: pointer;
  color: #9c27b0;
}

.projectTitle {
  color: #000000 !important;
  font-size: 20px;
  font-family: "Montserrat";
}
.projectInfos {
  font-family: "Montserrat";
  font-weight: normal;
}
.progresStatus {
  font-weight: normal;
  font-family: "Montserrat";
}
/* .fas fa-edit:hover {
  color: white;
} */
.fa-code-fork:before {
  content: "\f126";
  color: #df3e45;
  padding: 10px 10px 10px 0px;
}
.fa-history:before {
  content: "\f1da";
  cursor: pointer;
  padding: 10px 10px 10px 0px;
  color: #9c27b0;
}
.fa-tasks:before {
  content: "\f0ae";
  color: #2196f3;
  padding: 10px 10px 10px 0px;
}
.fa-check-square:before {
  content: "\f14a";
  color: #ff9800;
  padding: 10px 10px 10px 0px;
}
.fa-copy:before,
.fa-files-o:before {
  content: "\f0c5";
  color: #69c5a5;
  padding: 10px 10px 10px 0px;
}
.CurrentFonts {
  font-weight: 600;
}

.project_ID {
  font-size: 14px !important;
  font-style: italic;
}
.text-muted {
    color: #6c757d !important;
    margin-left: 5px;
    font-size: 100% !important;
}
</style>
