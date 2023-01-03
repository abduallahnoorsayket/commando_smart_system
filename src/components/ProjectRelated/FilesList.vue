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
                <form action @submit.prevent="searchFile">
                  <div class="form-row">
                    <!--Project Name-->
                    <!-- <div class="col-md-6">
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
                            v-for="project in projects"
                            :key="project.id"
                            :value="project.project_name"
                          >{{ project.project_name }}</option>
                        </select>
                      </div>
                    </div>-->

                    <!--file name-->
                    <div class="col-md-12">
                      <label>File Name</label>
                      <div class="form-group">
                        <input v-model="file_name" type="text" class="form-control" />
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
                          @submit.prevent="searchFile"
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

        <!-- file card -->
        <div class="row" v-if="all_files && all_files.length >0">
          <div class="col-md-3" v-for="(file,index) in all_files" :key="index">
            <div class="fileContainer">
              <div class="main-card card image">
                <div class="detailContaier">
                  <div class="row mt-5">
                    <div class="col-md-12">
                      <div class="text-center">
                        <!-- <i
                          class="fas fa-file-text"
                          :class="[ file.content_type.model == 'project'  ? 'projectFile' || file.content_type.model == 'version' ? 'versionFile'  || file.content_type.model == 'sprint' ? 'sprintFile' : null]"
                        ></i>-->
                        <i
                          v-if="file.content_type.model == 'project'"
                          class="fas fa-file-text projectFile"
                        ></i>
                        <i
                          v-if="file.content_type.model == 'version'"
                          class="fas fa-file-text versionFile"
                        ></i>
                        <i
                          v-if="file.content_type.model == 'sprint'"
                          class="fas fa-file-text sprintFile"
                        ></i>
                        <i
                          v-if="file.content_type.model == 'issue'"
                          class="fas fa-file-text taskFile"
                        ></i>
                        <i
                          v-if="file.content_type.model == 'subissue'"
                          class="fas fa-file-text subtaskFile"
                        ></i>

                        <div
                          class="fileName overviewMarign"
                          v-if="file.file_name"
                        >{{file.file_name}}</div>
                        <!-- <span class="text-muted">120.50 kb</span> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="middle">
                <!-- title="Project/Issue name: Tech Forum Management" -->
                <div class="row">
                  <div class="col-md-12">
                    <div class="text">
                      <!-- <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded at:</label>
                        <br />22-04-2021
                      </span>
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded by:</label>
                        <br />Abdullah sayket
                      </span>-->
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">File type:</label>
                        <br />
                        <span v-if="file.content_type.model == 'project' ">Project</span>
                        <span v-if="file.content_type.model == 'version' ">Version</span>
                        <span v-if="file.content_type.model == 'sprint' ">Sprint</span>
                        <span v-if="file.content_type.model == 'issue' ">Task</span>
                        <span v-if="file.content_type.model == 'subissue' ">SubTask</span>
                      </span>
                      <div class="row mt-5">
                        <div class="col-md-12">
                          <span class="float-right" v-if="file.upload_files">
                            <a :href="file.upload_files">
                              <i class="fas fa-download" title="Download"></i>
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3">
            <div class="fileContainer">
              <div class="main-card card image">
                <div class="detailContaier">
                  <div class="row mt-5">
                    <div class="col-md-12">
                      <div class="text-center">
                        <i class="fas fa-file-text"></i>
                        <div
                          class="fileName overviewMarign"
                          title="Project/Issue name: Tech Forum Management"
                        >Sprint Requirement</div>
                        <span class="text-muted">120.50 kb</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="middle" title="Project/Issue name: Tech Forum Management">
                <div class="row">
                  <div class="col-md-12">
                    <div class="text">
                      <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded at:</label>
                        <br />22-04-2021
                      </span>
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded by:</label>
                        <br />Abdullah sayket
                      </span>
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">File type:</label>
                        <br />Sprint
                      </span>
                      <div class="row">
                        <div class="col-md-12">
                          <span class="float-right">
                            <i class="fas fa-download" title="Download"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="fileContainer">
              <div class="main-card card image">
                <div class="detailContaier">
                  <div class="row mt-5">
                    <div class="col-md-12">
                      <div class="text-center">
                        <i class="fas fa-file-image-o"></i>
                        <div
                          class="fileName overviewMarign"
                          title="Project/Issue name: Tech Forum Management"
                        >DB Design</div>
                        <span class="text-muted">120.50 kb</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="middle" title="Project/Issue name: Tech Forum Management">
                <div class="row">
                  <div class="col-md-12">
                    <div class="text">
                      <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded at:</label>
                        <br />22-04-2021
                      </span>
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded by:</label>
                        <br />Abdullah sayket
                      </span>
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">File type:</label>
                        <br />Version
                      </span>
                      <div class="row">
                        <div class="col-md-12">
                          <span class="float-right">
                            <i class="fas fa-download" title="Download"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="fileContainer">
              <div class="main-card card image">
                <div class="detailContaier">
                  <div class="row mt-5">
                    <div class="col-md-12">
                      <div class="text-center">
                        <i class="fas fa-file-text"></i>
                        <div
                          class="fileName overviewMarign"
                          title="Project/Issue name: Tech Forum Management"
                        >System Requirement</div>
                        <span class="text-muted">120.50 kb</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="middle" title="Project/Issue name: Tech Forum Management">
                <div class="row">
                  <div class="col-md-12">
                    <div class="text">
                      <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded at:</label>
                        <br />22-04-2021
                      </span>
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">Uploaded by:</label>
                        <br />Abdullah sayket
                      </span>
                      <br />
                      <span class="fileInfo">
                        <label class="labelRightMargin">File type:</label>
                        <br />Task
                      </span>
                      <div class="row">
                        <div class="col-md-12">
                          <span class="float-right">
                            <i class="fas fa-download" title="Download"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
          <!-- previous card -->
          <!-- <div class="col-md">
            <div class="main-card card">
              <div class="detailContaier">
                <div class="row mt-4">
                  <div class="col-md-12">
                    <div class="text-center">
                      <i class="fas fa-file-text"></i>
                      <div
                        class="fileName overviewMarign"
                        title="Project/Issue name: Tech Forum Management"
                      >New Requirements</div>
                      <span class="text-muted">500.50 kb</span>
                    </div>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labelRightMargin">Uploaded at:</label>
                    14-04-2021
                    <br />
                    <label class="labelRightMargin">Uploaded by:</label>Mostaq Mahmud
                    <br />
                    <label class="labelRightMargin">File type:</label>
                    Task
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <span class="float-right">
                      <i class="fas fa-download" title="Download"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="main-card card">
              <div class="detailContaier">
                <div class="row mt-4">
                  <div class="col-md-12">
                    <div class="text-center">
                      <i class="fas fa-file-pdf-o"></i>
                      <div
                        class="fileName overviewMarign"
                        title="Project/Issue name: Tech Forum Management"
                      >Requirement File</div>
                      <span class="text-muted">120.50 kb</span>
                    </div>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labelRightMargin">Uploaded at:</label>
                    22-04-2021
                    <br />
                    <label class="labelRightMargin">Uploaded by:</label>Abdullah sayket
                    <br />
                    <label class="labelRightMargin">File type:</label>
                    Project
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <span class="float-right">
                      <i class="fas fa-download" title="Download"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md">
            <div class="main-card card">
              <div class="detailContaier">
                <div class="row mt-4">
                  <div class="col-md-12">
                    <div class="text-center">
                      <i class="fas fa-file-image-o"></i>
                      <div
                        class="fileName overviewMarign"
                        title="Project/Issue name: Tech Forum Management"
                      >ER diagram photo</div>
                      <span class="text-muted">900.50 kb</span>
                    </div>
                  </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-12">
                    <label class="labelRightMargin">Uploaded at:</label>
                    22-04-2021
                    <br />
                    <label class="labelRightMargin">Uploaded by:</label>Maruf rahman
                    <br />
                    <label class="labelRightMargin">File type:</label>
                    Project
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <span class="float-right">
                      <i class="fas fa-download" title="Download"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>-->
        </div>
        <div v-else class="alert alert-success" role="alert">No Data Found!</div>
        <!-- previous  file list  -->
        <!-- <div class="row mt-4" v-if="all_files">
          <div class="col-12">
            <div class="main-card card">
              <h6 class="ml-4">Project Files</h6>
              <div class="card-body mt-4">
                <div class="table-responsive">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Project / Issue</th>
                        <th scope="col">File name</th>
                        <th scope="col">Uploaded at</th>
                        <th scope="col">Uploaded by</th>
                        <th scope="col">Type</th>
                        <th scope="col" width="80px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(file, index) in all_files" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{form_data.project_name}}</td>
                        <td>{{file.file_name}}</td>
                        <td>{{form_data.created_datetime}}</td>
                        <td>{{form_data.created_by.first_name}} {{ form_data.created_by.last_name }}</td>
                        <td v-if="file.content_type.model == 'project'">
                          <span>Project</span>
                        </td>
                        <td v-else>
                          <span>Issue</span>
                        </td>
                        <td class="td_action">
                          <a :href="file.upload_files" class="btn btn-success">Download</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>-->

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
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Master from "../layouts/Master";
import projectNavbar from "../layouts/partials/projectRelated/projectNavbar.vue";
import ProjectName from "../layouts/partials/projectRelated/ProjectName.vue";
import permissions from "../../authorization/permissions";
export default {
  name: "FilesList",
  components: { Master, projectNavbar, ProjectName },
  data() {
    return {
      form_data: null,
      file_name: '',
      all_files: null,
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
    this.projectID = this.$route.query.project_id;
    this.initialload();
    console.log("created");
  },
  updated() {
    this.projectID = this.$route.query.project_id;
    this.initialload();
    console.log("updated");
  },
  methods: {
    initialload() {
      this.GetFilesList();
    },
    GetFilesList: function () {
      // this.$router.push({
      //   path: "files-list",
      //   query: {
      //     file_name: this.file_name ? this.file_name : "null",
      //     project_id: this.projectID,
      //     // page: this.pagination.page,
      //   },
      // });
      var queryParam = {
        file_name: this.file_name,
        project_id: this.projectID,
        page: this.$route.query.page,
      };
      axios
        .get("files/", {
          params: queryParam,
        })
        .then((response) => {
          // this.form_data = response.data.results;
          this.all_files = response.data.results;
          console.log("203===========", this.all_files);
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
        });
    },
    setPage(page) {
      this.pagination.page = page;
      this.searchFile();
    },
    searchFile() {
      this.$router.push({
        path: "files-list",
        query: {
          file_name: this.file_name,
          project_id: this.projectID,
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
.card {
  margin-bottom: 20px;
  border-left: 1px solid #eaeaea;
  border-radius: 5px;
  transition: box-shadow 0.2s ease-in-out, transform 0.35s ease-in-out;
  width: 220px;
}
.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transform: translateY(-5px);
}
/*  */
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
/* for file card */
.detailContaier {
  margin: 10px 16px 5px 16px;
}
.fa-file-pdf-o:before {
  content: "\f1c1";
  font-size: 64px;
  color: #ef5350;
  padding: 0px !important;
}
.fileName {
  font-size: 16px;
}

.overviewMarign {
  margin-top: 10px;
  margin-bottom: 0px !important;
}
.fa-download:before {
  content: "\f019";
  font-size: 18px;
  color: #bababa;
  cursor: pointer;
  margin-right: 20px;
}
.fa-file-text:before {
  content: "\f15c";
  font-size: 64px;
  /* color: #9575cd; */
  padding: 0px !important;
}
.projectFile {
  color: #69c5a5;
}
.versionFile {
  color: #ef5350;
}
.sprintFile {
  color: #9575cd;
}
.taskFile {
  color: #479ef4;
}
.subtaskFile {
  color: #ed972c;
}
.fa-file-photo-o:before,
.fa-file-picture-o:before,
.fa-file-image-o:before {
  content: "\f1c5";
  font-size: 64px;
  color: #69c5a5;
  padding: 0px !important;
}
/*  for overlay fileinfo */
.fileContainer {
  position: relative;
  width: 100%;
}

.image {
  display: block;
  width: 100%;
  height: 210px;
  /* width: 220px; */
}

.middle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  /* width: 220px; */
  opacity: 0;
  transition: 0.5s ease;
  background-color: #e6f7f4;
  box-shadow: 0 11px 11px 0 rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}

/* .container:hover .image {
  opacity: 1;
} */

.fileContainer:hover .middle {
  opacity: 1;
}

.text {
  /* color: white; */
  font-size: 14px;
  position: relative;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  /* width: 165px; */
  /* text-align: center; */
  margin: 15px 15px;
}
/* overlay end */
.labelRightMargin {
  margin-right: 5px;
  margin-bottom: 2px;
}
.fileInfo {
  margin-bottom: 3px;
}
</style>