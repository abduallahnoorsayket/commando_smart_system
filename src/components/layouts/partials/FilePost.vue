<template>
  <!-- file card -->
  <!-- <FilePostUpload
    @send-files-related="ReceivedFilesRelated"
    @load-file="FileLoad"
  /> -->
  <DragDropFile
    v-if="objectId && contentType"
    @load-file="FileLoad"
    :Obeject_ID="objectId"
    :Content_type="contentType"
  />
  <FileEditModal v-if="isFileEditModalVisible" @load-file="FileLoad" />
  <hr class="mb-2" />

  <div class="ObejectFiles" v-if="hasPermission('view_file')">
    <div class="row mt-3" v-if="all_files && all_files.length > 0">
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
                      <span v-if="file.name && file.name.length > 11">..</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-success mt-3" role="alert">
      No Data Found!
    </div>
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

<script>
import axios from "axios";
import Swal from "sweetalert2";
// import FilePostUpload from "../../layouts/partials/FilePostUpload.vue";
import FileEditModal from "../../FileModule/FileStore/FileEditModal.vue";
// import Master from "../../layouts/Master.vue";
import DragDropFile from "../../FileModule/FileStore/DragDropFile.vue";
import permissions from "../../../authorization/permissions";
export default {
  name: "FilePost",
  props: ["object_id", "content_type_id"],
  components: {
    // FilePostUpload,
    FileEditModal,
    DragDropFile,
  },
  data() {
    return {
      files_related_info: null,
      objectId: null,
      contentType: null,
      file_name: "",
      all_files: null,
      projectID: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
      files_related: [],
    };
  },
  created() {
    this.objectId = this.$props.object_id;
    this.contentType = this.$props.content_type_id;
    this.initialload();
    // this.projectID = this.$route.query.project_id;
    // console.log("created");
  },
  updated() {
    // this.initialload();
    // console.log("updated");
  },
  computed: {
    isFileEditModalVisible() {
      return this.$store.state.file.FileEditModalVisible;
    },
  },
  methods: {
    initialload() {
      this.GetFilesList();
    },
    OpenFileEditModal(id) {
      this.$store.commit("file/TOGGLE_FILE_EDIT_MODAL", { file_id: id });
    },
    async FileLoad() {
      await this.GetFilesList();
    },
    ReceivedFilesRelated(value) {
      this.files_related_info = value;
      // file object assign
      this.fileobject_assign();
      // file object assign end
    },
    fileobject_assign() {
      this.$store.dispatch("file/file_obeject_assign", {
        id: this.objectId,
        content_type: this.contentType,
        files_related_info: this.files_related_info,
      });
    },
    GetFilesList: function () {
      var queryParam = {
        // name: this.$route.query.name,
        // extension: this.$route.query.extension,
        object_id: this.objectId,
        content_type: this.contentType,
        page: this.pagination.page,
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
      this.FileLoad();
    },
    // searchFile() {
    //   this.$router.push({
    //     path: "files-list",
    //     query: {
    //       file_name: this.file_name,
    //       project_id: this.projectID,
    //       page: this.pagination.page,
    //     },
    //   });
    // },
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
              // this.loadExtension();
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
  /* height: 180px; */
  /* width: 180px; */
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
.lockIcon {
  margin-right: 5px;
}
.fa-file-text:before {
  content: "\f15c";
  padding: 10px 6px 10px 0px;
  color: #9575cd;
}
.fa-file:before {
  content: "\f15b";
  font-size: 64px;
  color: #bababa;
  padding: 0px !important;
}
.dropdown-menu {
  min-width: 8rem !important;
}
</style>
