<template>
  <teleport to="body">
    <div v-if="AddModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Add New File</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitAddFile" autocomplete="off">
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
            <button @click="submitAddFile()" class="mt-2 btn btn-base float-right">Submit</button>
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
import $ from "jquery";
export default {
  name: "AddFileModal",

  data() {
    return {
      Content_Type: null,
      Object_Id: null,
      upload_files: null,
      file_name: null,
    };
  },
  created() {
    this.Object_Id = this.$store.state.projectRelated.ObjectId;
    this.Content_Type = this.$store.state.projectRelated.ContentType;
    console.log("ObjectId", this.$store.state.projectRelated.ObjectId);
    console.log("ContentType", this.$store.state.projectRelated.ContentType);
  },
  computed: {
    AddModalVisible() {
      return this.$store.state.projectRelated.FileAddModalVisible;
    },
  },

  methods: {
    CloseModal() {
      this.$store.commit(
        "projectRelated/toggleFileAddModal",
        {
          content_Type: null,
          object_id: null,
        }
        // this.employee
      );
    },
    ResetModal() {
      this.upload_files = null;
      this.file_name = null;
    },
    /*for file upload*/
    handleImage() {
      this.upload_files = this.$refs.file.files[0];
      console.log("227", this.$refs.file, this.upload_files);
    },

    submitAddFile() {
      var bodyFormData = new FormData();
      bodyFormData.append("file_name", this.file_name);
      bodyFormData.append("upload_files", this.upload_files);
      bodyFormData.append("object_id", this.Object_Id);
      bodyFormData.append("content_type", this.Content_Type);

      axios
        .post("files/", bodyFormData)
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully Added File..",
          }).then((result) => {
            this.ResetModal();
            this.$emit("load-file");
            // this.CloseModal();
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
$(document).ready(function () {
  $(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });
});
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