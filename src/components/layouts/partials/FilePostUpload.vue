<template>
  <div class="row mt-1" v-if="hasPermission('add_file')">
    <FileShareWith
      v-if="isFileShareVisible"
      @send-selected-users="ReceivedUsers"
    />
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="submitAddFile" autocomplete="off">
            <div class="form-group">
              <div class="form-row">
                <div class="col-md-12">
                  <!-- single file upload -->
                  <!-- <div class="position-relative form-group">
                        <div class="row">
                          <div class="col-md">
                            <label>
                              Upload Document
                              <span class="asterisk">*</span>
                            </label>
                            <div class="custom-file mb-3">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="customFile"
                                name="filename"
                                ref="file"
                                @change="handleImage()"
                              />
                              <label class="custom-file-label" for="customFile"
                                >Choose file</label
                              >
                            </div>
                          </div>
                          <div class="col-md">
                            <label>
                              Document Name
                              <span class="asterisk">*</span>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              autocomplete="off"
                              v-model="file_name"
                            />
                          </div>
                          <div class="col-md-1"></div>
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
                      </div> -->
                  <!-- multiple file upload -->
                  <div class="position-relative form-group">
                    <template v-for="(file, k) in files_related" :key="k">
                      <div class="row">
                        <div class="col-md">
                          <div class="row">
                            <div class="col-md">
                              <label>
                                Upload File
                                <!-- <span class="asterisk">*</span> -->
                              </label>
                              <span class="text-muted">
                                (Upload your file below 20MB)
                              </span>
                              <div class="custom-file mb-2">
                                <input
                                  type="file"
                                  class="custom-file-input"
                                  id="customFile"
                                  name="filename"
                                  ref="file"
                                  @change="handleImage($event, k)"
                                />
                                <!--  :class="{
                                    'is-invalid': file_error && file_error.file,
                                  }" -->
                                <label
                                  class="custom-file-label"
                                  for="customFile"
                                  >Choose file</label
                                >
                                <!-- <div
                                  :class="{
                                    'invalid-feedback':
                                      file_error && file_error.file,
                                  }"
                                  v-if="file_error && file_error.file"
                                >
                                  {{ file_error && file_error.file[0] }}
                                </div> -->
                              </div>
                            </div>
                            <div class="col-md-1 mt-4 mr-3">
                              <!-- <i class="fas fa-file-text projectFile"></i> -->
                              <div class="text-center">
                                <img
                                  v-if="files_related[k].file"
                                  :src="files_related[k].file"
                                  id="imageID"
                                  height="32"
                                  width="32"
                                  class="ThumbFile"
                                />
                                <img
                                  v-else
                                  class="NoFile"
                                  src="../../../assets/images/Nofile01.jpg"
                                  alt
                                  width="36"
                                  height="36"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md">
                          <label
                            >File Name
                            <!-- <span class="asterisk">*</span> -->
                          </label>
                          <input
                            class="form-control"
                            type="text"
                            autocomplete="off"
                            v-model="files_related[k].name"
                          />
                        </div>
                        <div class="col-md-2 col-lg-2 mt-4">
                          <!-- v-if="files_related.length > 0" -->
                          <button
                            class="btn btn-sm mt-1"
                            style="color: firebrick; font-size: 20px"
                          >
                            <i
                              class="fas fa-share-alt-square"
                              @click="OpenFileShareModal(k)"
                            ></i>
                          </button>
                          <!-- <i
                              class="fas fa-share-alt-square"
                              @click="deleteRow(k)"
                            ></i> -->
                          <!-- v-if="files_related.length > 0" -->
                          <button
                            v-if="hasPermission('delete_file')"
                            class="btn btn-sm btn-del remove mt-1"
                            style="color: firebrick; font-size: 20px"
                          >
                            <i
                              class="fas fa-trash-alt"
                              @click="deleteRow(k)"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </template>
                    <div class="row" v-if="file_error && file_error.file">
                      <div class="col-md-5">
                        <div
                          class="alert alert-danger alert-dismissible fade show"
                          role="alert"
                        >
                          Upload your file below 20MB!
                          <!-- <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button> -->
                        </div>
                      </div>
                      <div class="col-md"></div>
                    </div>
                  </div>
                </div>
                <button type="button" class="btn btn-base" @click="addNewRow">
                  <i class="fas fa-plus-circle"></i>
                  ADD NEW
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import FileShareWith from "../../FileModule/FileStore/FileShareWith.vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "FilePostUpload",
  components: { FileShareWith },
  data() {
    return {
      filelist: null,
      files_related: [],
      file_shared_users: null,
      file_error: {
        file: null,
      },
    };
  },
  created() {
    this.addNewRow();
  },
  computed: {
    isFileShareVisible() {
      return this.$store.state.file.isFileShareVisible;
    },
  },

  methods: {
    OpenFileShareModal(index) {
      this.$store.commit("file/TOGGLE_FILE_SHARE_MODAL", {
        index_number: index,
      });
    },
    // file uploader Post
    handleImage(e, index) {
      this.file_error.file = null;
      const currentUserID = localStorage.getItem("id");
      // console.log("event", e.target.files[0].name, index);
      // this.file.file_name = this.filelist[0].name;
      // let files = e.target.files || e.dataTransfer.files;
      // if (!files.length) return;
      if (e.target.files && e.target.files.length > 0) {
        var bodyFormData = new FormData();
        bodyFormData.append("name", e.target.files[0].name);
        bodyFormData.append("file", e.target.files[0]);
        bodyFormData.append("creat_by", currentUserID);
        bodyFormData.append(
          "extension",
          e.target.files[0].type.replace(/(.*)\//g, "")
        );
        axios
          .post("file/", bodyFormData)
          .then((response) => {
            // Swal.fire({
            //   icon: "success",
            //   text: "Successfully uploaded",
            // }).then((result) => {
            //   // this.GetFilesList();
            //   // this.loadExtension();
            //   // this.$emit("load-file");
            //   console.log(result);
            // });
            this.files_related[index].id = response.data.id;
            this.files_related[index].file = response.data.file;
            this.files_related[index].name = response.data.name;
            this.files_related[index].extension = response.data.extension;
            // this.files_related[index].with_others = response.data.with_others;
            this.$emit("send-files-related", this.files_related);
            // for (let i = 0; i < this.files_related.length; i++) {
            //   if (
            //     this.files_related[i].id == null ||
            //     this.files_related[i].name == null ||
            //     this.files_related[i].file == null ||
            //     this.files_related[i].extension == null
            //   ) {
            //     this.files_related.splice(i, 1);
            //     this.$emit("send-files-related", this.files_related);
            //   } else {
            //     this.$emit("send-files-related", this.files_related);
            //   }
            // }
            console.log(response);
          })
          .catch((error) => {
            console.log("--++279--", error.response);
            this.file_error = error.response.data;
            // this.$emit("send-fileError", this.file_error);
            console.log("--++", error.response);
          });
      }
    },
    ReceivedUsers(value) {
      this.file_shared_users = value;
      this.files_related[this.$store.state.file.file_share_index].with_others =
        this.file_shared_users;
      // for (let i = 0; i < this.files_related.length; i++) {
      //   if (
      //     this.files_related[i].id == null &&
      //     this.files_related[i].name == null &&
      //     this.files_related[i].file == null &&
      //     this.files_related[i].extension == null
      //   ) {
      //     this.files_related.splice(i, 1);
      //     this.$emit("send-files-related", this.files_related);
      //   }
      // }
      this.$emit("send-files-related", this.files_related);
      this.$emit("load-file");
    },
    // new row adding
    addNewRow() {
      // this.file_error.file = null;
      this.files_related.push({
        id: null,
        name: null,
        file: null,
        extension: null,
        with_others: [],
      });
    },
    // Remove Row
    deleteRow(index) {
      if (index == 0) {
        Swal.fire({
          icon: "error",
          title: this.$store.getters.GET_SORRY,
          text: "You can not delete it !",
        });
        if (this.files_related[index].id) {
          axios
            .delete("file/" + this.files_related[index].id + "/")
            .then((response) => {
              if (response.status === 204) {
                console.log("279");
                // this.$refs.file.files[index].name = null;
                this.files_related[index].id = null;
                this.files_related[index].name = null;
                this.files_related[index].file = null;
                this.files_related[index].extension = null;
                this.files_related[index].with_others = [];
                this.files_related.splice(index, 1);
                // this.addNewRow();
              }
            });
          if (index == 0 && this.files_related.length == 1) {
            this.addNewRow();
          }
        }
        // this.addNewRow();
      }
      if (index > 0) {
        this.DeleteFileItem(this.files_related[index].id, index);
        // this.files_related.splice(index, 1);
      }
    },
    DeleteFileItem: function (id, index) {
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
          if (id) {
            axios.delete("file/" + id + "/").then((response) => {
              if (response.status === 204) {
                // this.GetFilesList();
                // this.loadExtension();
              }
            });
          }
          Swal.fire(
            this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              " ...",
            "success"
          );
          if (index > 0) {
            this.files_related.splice(index, 1);
          }
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
      // this.files_related.splice(index, 1);
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
  /* border-left: 1px solid #eaeaea; */
  border: none;
}
.fa-file-text:before {
  content: "\f15c";
  padding: 10px 6px 10px 0px;
  color: #9575cd;
  font-size: 28px;
}
.projectFile {
  margin-top: 10px;
}
.fa-share-alt-square:before {
  content: "\f1e1";
  color: #69c5a5;
  font-size: 28px;
}
.fa-trash-alt:before {
  font-size: 24px;
}
.NoFile {
  margin-top: 5px;
  /* margin-right: 5px; */
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 0.25rem 0.4rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
.ThumbFile {
  margin-top: 8px;
}
</style>
