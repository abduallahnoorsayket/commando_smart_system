<template>
  <Master>
    <template v-slot:content>
      <div
        class="app-main__inner"
        id="recordsModal"
        v-if="hasPermission('view_file')"
      >
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div class="div">
                Files List
                <!-- <router-link :to="{ path: '/add-new-file' }">
                  <a class="float" style="position: absolute; right: 0">
                    <button
                      type="button"
                      class="btn btn-successs"
                      style="font-size: 15px"
                    >
                      <span class="fas fa-list"></span> Add new
                    </button>
                  </a>
                </router-link> -->
              </div>
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
                      &nbsp; {{ $store.getters.GET_SEARCH }}
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
                <form action @submit.prevent="searchFile" autocomplete="off">
                  <!-- <div class="form-row">
                    <div class="col-md-4">
                      <label>Created by</label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="email"
                          v-model="username"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label> Content Type </label>
                      <div class="form-group">
                        <select v-model="groups" class="form-control">
                          <option value="" selected>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_GROUP
                            }}
                          </option>
                          <option
                            v-for="grp in all_groups"
                            :key="grp.id"
                            :value="grp.id"
                            selected
                          >
                            {{ grp.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label> Object ID </label>
                      <div class="form-group">
                        <select v-model="department" class="form-control">
                          <option value="" selected>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_DEPARTMENT
                            }}
                          </option>
                          <option
                            v-for="dprtmnt in all_departments"
                            :key="dprtmnt.id"
                            :value="dprtmnt.id"
                          >
                            {{ dprtmnt.department_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div> -->
                  <div class="form-row">
                    <div class="col-md-6">
                      <label>File Name</label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          v-model="file_name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <label> File Extension</label>
                      <div class="form-group">
                        <select v-model="file_extension" class="form-control">
                          <option value="" selected>Select extension</option>
                          <option
                            v-for="extension in all_extensions"
                            :key="extension.id"
                            :value="extension.extension"
                            selected
                          >
                            <span v-if="extension.extension !== null">{{
                              extension.extension
                            }}</span>
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-8"></div>
                    <div class="col-md-4 mt-2">
                      <label></label>

                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-base float-right"
                          :disabled="blankSearch"
                        >
                          {{ $store.getters.GET_SEARCH }}
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
        <!-- drop file zone -->
        <DragDropFile @load-file="FileLoad" @load-extension="ExtensionLoad" />
        <!--Advanced Search End-->
        <!-- file card -->
        <FileEditModal v-if="isFileEditModalVisible" @load-file="FileLoad" />
        <div class="row mt-1" v-if="all_files && all_files.length > 0">
          <div
            class="col-md-3 col-lg-3 col-xl-2"
            v-for="(file, index) in all_files"
            :key="index"
          >
            <div class="fileContainer">
              <div class="main-card card image">
                <div class="float-right pt-3 pr-1 align-items-center">
                  <div class="btn-group dropleft">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      class="p-0 btn"
                    >
                      <i
                        id="addIcon"
                        class="nav-link-icon fas fa-ellipsis-v mr-2 float-right"
                      ></i>
                    </a>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      class="dropdown-menu dropdown-menu-right"
                    >
                      <a
                        v-if="hasPermission('change_file')"
                        class="dropdown-item"
                        @click="OpenFileEditModal(file.id)"
                        >Edit</a
                      >
                      <a
                        v-if="hasPermission('view_file')"
                        class="dropdown-item"
                        :href="file.file"
                        target="_blank"
                        >View</a
                      >
                      <a
                        v-if="hasPermission('delete_file')"
                        class="dropdown-item"
                        @click="DeleteFileItem(file.id) in all_files"
                        >Delete</a
                      >
                    </div>
                  </div>
                </div>
                <div class="detailContaier">
                  <div class="row mt-5">
                    <div class="col-md-12">
                      <div class="text-center">
                        <i
                          v-if="file.extension == 'txt'"
                          class="fas fa-file-text"
                        ></i>
                        <i
                          v-else-if="file.extension == 'pdf'"
                          class="fas fa-file-pdf-o"
                        ></i>
                        <i
                          v-else-if="
                            file.extension == 'png' ||
                            file.extension == 'jpeg' ||
                            file.extension == 'jpg'
                          "
                          class="fas fa-file-image-o"
                        ></i>
                        <i v-else class="fas fa-file"></i>

                        <div
                          v-if="file.name"
                          class="fileName text-center mt-3 pb-2"
                          :title="file.name"
                        >
                          <!-- {{ file.name }} -->
                          <span v-if="file.name">
                            {{ file.name.slice(0, 11) }}</span
                          >
                          <span v-if="file.name.length > 11">..</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3 col-lg-3 col-xl-2">
            <div class="fileContainer">
              <div class="main-card card image">
                <div class="float-right pt-3 pr-1 align-items-center">
                  <div class="btn-group dropleft">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      class="p-0 btn"
                    >
                      <i
                        id="addIcon"
                        class="nav-link-icon fas fa-ellipsis-v mr-2 float-right"
                      ></i>
                    </a>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      class="dropdown-menu dropdown-menu-right"
                    >
                      <a
                        class="dropdown-item"
                        @click="OpenEditModal(version.id)"
                        >View</a
                      >
                      <a class="dropdown-item" @click="OpenFileEditModal()"
                        >Edit</a
                      >
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="deleteVersionItem(version.id) in versions"
                        >Download</a
                      >
                    </div>
                  </div>
                </div>
                <div class="detailContaier">
                  <div class="row mt-5">
                    <div class="col-md-12">
                      <div class="text-center">
                        <i class="fas fa-file-image-o"></i>
                        <div
                          class="fileName text-center mt-3 pb-2"
                          title="Project/Issue name: Tech Forum Management"
                        >
                          Sprint Specifications
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-lg-3 col-xl-2">
            <div class="fileContainer">
              <div class="main-card card image">
                <div class="float-right pt-3 pr-1 align-items-center">
                  <div class="btn-group dropleft">
                    <a
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      class="p-0 btn"
                    >
                      <i
                        id="addIcon"
                        class="nav-link-icon fas fa-ellipsis-v mr-2 float-right"
                      ></i>
                    </a>
                    <div
                      tabindex="-1"
                      role="menu"
                      aria-hidden="true"
                      class="dropdown-menu dropdown-menu-right"
                    >
                      <a
                        class="dropdown-item"
                        @click="OpenEditModal(version.id)"
                        >View</a
                      >
                      <a class="dropdown-item" @click="OpenFileEditModal()"
                        >Edit</a
                      >
                      <a
                        class="dropdown-item"
                        href="#"
                        @click="deleteVersionItem(version.id) in versions"
                        >Download</a
                      >
                    </div>
                  </div>
                </div>
                <div class="detailContaier">
                  <div class="row mt-5">
                    <div class="col-md-12">
                      <div class="text-center">
                        <i class="fas fa-file-pdf-o"></i>
                        <div
                          class="fileName text-center mt-3 pb-2"
                          title="Project/Issue name: Tech Forum Management"
                        >
                          Sprint Specifications
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

          <!-- prev card -->

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
        <div v-else class="alert alert-success" role="alert">
          No Data Found!
        </div>
        <!-- previous  file list  -->

        <!--Pagination Start-->
        <div class="row">
          <div class="col-md-4">
            <ul class="pagination">
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
import Master from "../../layouts/Master.vue";
import FileEditModal from "../FileStore/FileEditModal.vue";
import permissions from "../../../authorization/permissions";
import DragDropFile from "./DragDropFile.vue";

export default {
  name: "AllFilesList",
  components: { Master, FileEditModal, DragDropFile },
  data() {
    return {
      // filelist: null,
      form_data: null,
      file_name: "",
      file_extension: null,
      all_files: null,
      all_extensions: null,
      projectID: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
      file_error: null,
    };
  },
  created() {
    // this.projectID = this.$route.query.project_id;
    this.initialload();
    // console.log("created");
  },
  updated() {
    // this.projectID = this.$route.query.project_id;
    this.initialload();
    // console.log("updated");
  },
  computed: {
    isFileEditModalVisible() {
      return this.$store.state.file.FileEditModalVisible;
    },
    blankSearch() {
      if (
        (this.file_name == "" || this.file_name == null) &&
        (this.file_extension == "" || this.file_extension == null)
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    initialload() {
      this.GetFilesList();
      this.loadExtension();
    },
    OpenFileEditModal(id) {
      this.$store.commit("file/TOGGLE_FILE_EDIT_MODAL", { file_id: id });
    },
    async FileLoad() {
      await this.GetFilesList();
    },
    async ExtensionLoad() {
      // console.log("639----");
      await this.loadExtension();
    },
    // drag & drop start

    // drag & drop end
    // Load extension
    loadExtension() {
      axios
        .get("file_extensions/", {})
        .then((response) => {
          this.all_extensions = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GetFilesList: function () {
      var queryParam = {
        name: this.$route.query.name,
        extension: this.$route.query.extension,
        page: this.$route.query.page,
      };
      axios
        .get("file/", {
          params: queryParam,
        })
        .then((response) => {
          // this.form_data = response.data.results;
          this.all_files = response.data.results;
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
        path: "file-list",
        query: {
          name: this.file_name,
          extension: this.file_extension,
          page: this.pagination.page,
        },
      });
    },
    DeleteFileItem: function (id) {
      Swal.fire({
        title: this.$store.getters.GET_ARE_YOU_SURE,
        text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("file/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetFilesList();
              this.loadExtension();
            }
          });
          Swal.fire(
            this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              " ...",
            "success"
          );
        } else {
          Swal.fire(
            this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +
              " " +
              this.$store.getters.GET_DELETED +
              " ...",
            "error"
          );
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
  /* margin: 10px 16px 5px 16px; */
  margin: 0px !important;
  padding: 0px 5px 5px 5px;
}
.fa-file-pdf-o:before {
  content: "\f1c1";
  font-size: 64px;
  color: #ef5350;
  padding: 0px !important;
}
.fileName {
  font-size: 14px;
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
  /* height: 210px; */
  /* width: 220px; */
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
.lockIcon {
  margin-right: 5px;
}
.fa-file-text:before {
  content: "\f15c";
  padding: 10px 6px 10px 0px;
  color: #9575cd;
}
.dropContainer {
  margin: 10px 250px;
  padding: 50px 40px;
  background: white;
  border-radius: 5px;
}
/* .hidden {
  display: none;
} */
/* drag & drop css */
/* drag & drop css */
.fa-file:before {
  content: "\f15b";
  font-size: 64px;
  color: #bababa;
  padding: 0px !important;
}
/* design issue fix */
.dropdown-menu {
  min-width: 8rem !important;
}
</style>
