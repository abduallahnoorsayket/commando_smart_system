<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Edit File</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitUpdateFile" autocomplete="off" v-if="form_data">
              <div class="form-group">
                <div class="form-row mt-2">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <!-- single file upload -->
                      <div class="row mt-4">
                        <div class="col-md-5">
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
                            <!-- <input type="hidden" v-model="upload_files" id="prevFile" /> -->
                            <img
                              class="mt-2 ml-2"
                              v-if="upload_files"
                              :src="upload_files"
                              height="30"
                              width="30"
                              alt
                            />
                            <label class="custom-file-label" for="customFile">Choose file</label>
                          </div>
                        </div>
                        <div class="col-md-5">
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
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="submitUpdateFile()" class="mt-2 btn btn-base float-right">Submit</button>
            <button class="mt-2 float-right ml-2 btn btn-successs" @click="CloseModal()">Close</button>
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
  name: "EditFileModal ",

  data() {
    return {
      form_data: {},
      Content_Type: null,
      Object_Id: null,
      upload_files: null,
      new_upload_files: null,
      file_name: null,
      File_Id: null,
    };
  },
  created() {
    // this.Object_Id = this.$store.state.projectRelated.ObjectId;
    // this.Content_Type = this.$store.state.projectRelated.ContentType;
    this.File_Id = this.$store.state.projectRelated.FileId;
    // console.log("ObjectId", this.$store.state.projectRelated.ObjectId);
    // console.log("ContentType", this.$store.state.projectRelated.ContentType);
    // console.log("FileId", this.$store.state.projectRelated.FileId);
    this.getFileDetail();
  },
  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.FileEditModalVisible;
    },
  },

  methods: {
    CloseModal() {
      console.log("113");
      this.$store.commit("projectRelated/closeFileEditModal");
    },

    /*for file upload*/
    handleImage() {
      this.new_upload_files = this.$refs.file.files[0];
      console.log("227", this.$refs.file, this.upload_files);
    },
    // getIssueList
    getFileDetail() {
      axios.get("files/" + this.File_Id + "/").then(
        (response) => {
          // this.form_data = response.data;
          this.file_name = response.data.file_name;
          this.upload_files = response.data.upload_files;
          this.Content_Type = response.data.content_type.id;
          this.Object_Id = response.data.object_id;

          console.log("----128---", this.upload_files);
          console.log("----129---", this.Content_Type, this.Object_Id);
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    submitUpdateFile() {
      console.log("136");
      var bodyFormData = new FormData();
      bodyFormData.append("file_name", this.file_name);
      if (this.new_upload_files != null) {
        bodyFormData.append("upload_files", this.new_upload_files);
      }

      bodyFormData.append("object_id", this.Object_Id);
      bodyFormData.append("content_type", this.Content_Type);
      axios
        .put("files/" + this.File_Id + "/", bodyFormData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully updated File ..",
          }).then((result) => {
            this.CloseModal();
            this.$emit("load-file");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.AddAttendance_error = error.response.data;
          console.log("--++", error.response);
        });
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
  max-height: 40vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>