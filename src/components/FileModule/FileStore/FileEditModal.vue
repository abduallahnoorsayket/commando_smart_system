<template>
  <teleport to="body">
    <div v-if="isFileEditModalVisible && form_data" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Edit File</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitUpdateFile" autocomplete="off">
              <div class="form-row mt-0">
                <div class="col-md-12">
                  <div class="position-relative form-group">
                    <!-- single file upload -->
                    <div class="form-row mt-0">
                      <div class="col-md-6">
                        <label>
                          Upload File
                          <!-- <span class="asterisk">*</span> -->
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
                          <!-- <input type="hidden" v-model="upload_files" id="prevFile" /> -->
                          <!-- <img
                            class="mt-2 ml-2"
                            v-if="upload_files"
                            :src="upload_files"
                            height="30"
                            width="30"
                            alt
                          /> -->
                          <label class="custom-file-label" for="customFile"
                            >Choose file</label
                          >
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label>
                          File Name
                          <!-- <span class="asterisk">*</span> -->
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          autocomplete="off"
                          v-model="file_name"
                        />
                      </div>
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
                    <div class="form-row mt-0">
                      <div class="col-md-12">
                        <label>
                          Share With others
                          <!-- <span class="asterisk">*</span> -->
                        </label>
                        <div class="p-listbox p-component">
                          <div class="p-listbox-header">
                            <div class="p-listbox-filter-container">
                              <input
                                type="text"
                                class="p-listbox-filter p-inputtext p-component"
                                v-model="UserSearch"
                                placeholder="Filter"
                              />
                              <span
                                class="p-listbox-filter-icon pi pi-search"
                              ></span>
                            </div>
                          </div>
                          <div class="p-listbox-list-wrapper">
                            <div
                              role="listbox"
                              aria-multiselectable="multiple"
                              class="p-listbox-list"
                            >
                              <div
                                class="p-listbox-item"
                                v-for="user in filterUsers"
                                :key="user.id"
                              >
                                <label
                                  class="form-check-label"
                                  style="font-weight: 300"
                                >
                                  <input
                                    type="checkbox"
                                    name="groups[]"
                                    :id="user.id"
                                    :value="user.id"
                                    v-model="with_others"
                                    class="form-check-input"
                                  />
                                  <span class="checkmark"></span>
                                  {{ user.first_name + " " + user.last_name }}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              @click="submitUpdateFile()"
              class="mt-2 btn btn-base float-right"
            >
              Submit
            </button>
            <button
              class="mt-2 float-right ml-2 btn btn-successs"
              @click="CloseModal()"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "FileEditModal ",

  data() {
    return {
      filelist: null,
      UserSearch: null,
      with_others: [],
      users: null,
      form_data: null,
      Content_Type: null,
      Object_Id: null,
      upload_files: null,
      new_upload_files: null,
      file_name: null,
      File_Id: null,
      File_error: null,
      file_physical_name: null,
    };
  },
  created() {
    this.File_Id = this.$store.state.file.file_id;
    this.getFileDetail();
    this.loadUsers();
  },
  computed: {
    isFileEditModalVisible() {
      return this.$store.state.file.FileEditModalVisible;
    },
    filterUsers() {
      if (this.UserSearch) {
        return this.users.filter((item) => {
          return this.UserSearch.toLowerCase()
            .split(" ")
            .every((v) => item.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.users;
      }
    },
  },

  methods: {
    CloseModal() {
      this.$store.commit("file/TOGGLE_FILE_EDIT_MODAL", { file_id: null });
    },

    /*for file upload*/
    handleImage() {
      this.filelist = [...this.$refs.file.files];
      this.new_upload_files = this.$refs.file.files[0];
      this.file_physical_name = this.$refs.file.files[0].name;
      // console.log("227", this.$refs.file, this.upload_files);
    },
    // getIssueList
    getFileDetail() {
      axios.get("file/" + this.File_Id + "/").then(
        (response) => {
          this.form_data = response.data;
          this.file_name = response.data.name;
          this.upload_files = response.data.file;
          this.with_others = response.data.with_others.map((y) => y.id);
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    submitUpdateFile() {
      var bodyFormData = new FormData();
      bodyFormData.append(
        "name",
        this.file_name ? this.file_name : this.file_physical_name
      );
      if (this.new_upload_files != null) {
        bodyFormData.append("file", this.new_upload_files);
      }
      if (this.with_others && this.with_others.length > 0) {
        for (let i = 0; i < this.with_others.length; i++) {
          bodyFormData.append("with_others", this.with_others[i]);
        }
      }

      axios
        .put("file/" + this.File_Id + "/", bodyFormData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "Successfully edited",
          }).then((result) => {
            this.CloseModal();
            this.$emit("load-file");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.File_error = error.response.data;
          console.log("--++", error.response);
        });
    },
    // load users
    loadUsers: function () {
      // this.loading = true;
      var queryParam = {};
      axios
        .get("users-short-list/", {
          params: queryParam,
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      // .finally(() => {
      //   this.loading = false;
      // });
    },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 640px;
}
/* scroll in modal */
.card-body {
  /* max-height: 40vh; */
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
