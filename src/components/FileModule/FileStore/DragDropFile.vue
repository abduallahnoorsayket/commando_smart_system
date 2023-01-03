<template>
  <div class="row" v-if="hasPermission('add_file')">
    <div class="col-md-2"></div>
    <div
      class="col-md-8 text-center"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <div class="cardDrag">
        <div class="card-body">
          <div class="row">
            <!-- <div class="col-md-2"></div> -->
            <div class="col-md-12 text-center DropSection">
              <h6 class="mb-0">Select files or drop files here</h6>
              <span class="text-muted"> (Upload your file below 20MB) </span>
              <div class="bg-gray-100 text-center mt-2">
                <!-- <input
                  type="file"
                  multiple
                  name="fields[assetsFieldHandle][]"
                  id="assetsFieldHandle"
                  class="w-px h-px opacity-0 overflow-hidden absolute ml-5"
                  @change="onChange"
                  ref="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                /> -->
                <div class="form-group">
                  <div class="form-row">
                    <div class="col-md"></div>
                    <div class="col-md-2">
                      <input
                        type="file"
                        class="text-center"
                        @change="onChange"
                        ref="file"
                        multiple
                      />
                    </div>
                    <div class="col-md"></div>
                  </div>
                </div>
                <!-- accept=".pdf,.jpg,.jpeg,.png" -->
                <!-- <label for="files">Select file</label> -->
                <!-- <ul class="mt-4" v-if="this.filelist.length" v-cloak>
                  <li
                    class="text-sm p-1"
                    v-for="(file, index) in filelist"
                    :key="index"
                  >
                    ${ file.name }<button
                      class="ml-2"
                      type="button"
                      @click="remove(filelist.indexOf(file))"
                      title="Remove file"
                    >
                      remove
                    </button>
                  </li>
                </ul> -->
              </div>
              <!-- error -->
              <div class="row" v-if="file_error && file_error.file">
                <div class="col-md-2"></div>
                <div class="col-md-8">
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
                <div class="col-md-2"></div>
              </div>
              <progress
                id="progress-bar"
                max="100"
                value="0"
                class="CustomProgress"
              ></progress>
              <br />
              <span class="text-muted">
                Uploaded <span v-if="fileCount"> {{ fileCount }} </span>
                <span v-else>0</span> out of
                <span v-if="TotalFiles"> {{ TotalFiles }}</span>
                <span v-else>0</span></span
              >
              <!-- <div class="progress mb-1" style="height: 10px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  aria-valuenow="80"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  data-original-title="project.project_progress"
                  style=""
                ></div>
              </div> -->
              <!-- <progress id="progress-bar" max="100" value="80"></progress> -->
              <!-- upload message -->
              <!-- <div class="row" v-if="is_uploaded">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                  <div
                    id="alertSuccess"
                    class="alert alert-success alert-dismissible fade show"
                    role="alert"
                  >
                    Successfully uploaded!
                  </div>
                </div>
                <div class="col-md-2"></div>
              </div> -->
            </div>
            <!-- <div class="col-md-2"></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2"></div>
  </div>
</template>

<script>
import axios from "axios";
// import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";

export default {
  name: "DragDropFile",
  props: ["Obeject_ID", "Content_type"],
  data() {
    return {
      is_uploaded: false,
      filelist: null,
      objectId: null,
      contentType: null,
      files_related: [],
      file_error: {
        file: null,
      },
      uploadProgress: [],
      progressBar: {
        value: null,
      },
      TotalFiles: null,
      fileCount: null,
    };
  },
  created() {
    this.objectId = this.$props.Obeject_ID;
    this.contentType = this.$props.Content_type;
    // this.autoHideAlert();
  },
  methods: {
    onChange(e) {
      // this.is_uploaded = false;
      this.file_error.file = null;
      const currentUserID = localStorage.getItem("id");
      this.filelist = [...this.$refs.file.files];
      // console.log("641==", this.filelist[0].type.replace(/(.*)\//g, ""));
      // console.log("641 Ext", this.filelist[0].name.split(".").pop());
      //  console.log("event",this.filelist)
      this.initializeProgress(this.filelist.length);
      for (let i = 0; i < this.filelist.length; i++) {
        var bodyFormData = new FormData();
        bodyFormData.append("name", this.filelist[i].name);
        bodyFormData.append("file", this.filelist[i]);
        bodyFormData.append("creat_by", currentUserID);
        bodyFormData.append(
          "extension",
          this.filelist[i].type.replace(/(.*)\//g, "")
        );
        axios
          .post("file/", bodyFormData)
          .then((response) => {
            // if (this.filelist[0]) {
            //   Swal.fire({
            //     icon: "success",
            //     text: "Successfully uploaded",
            //   });
            // }
            console.log(response);
            // file obejct assign
            if (this.objectId != null && this.contentType != null) {
              this.files_related.push({
                id: response.data.id,
                name: response.data.name,
                file: response.data.file,
                extension: response.data.extension,
                with_others: response.data.with_others,
              });
              this.$store.dispatch("file/file_obeject_assign", {
                id: this.objectId,
                content_type: this.contentType,
                files_related_info: this.files_related,
              });
            }
            // if (response.status == 201) {
            //   this.is_uploaded = true;
            // }
            this.$emit("load-file");
            this.$emit("load-extension");
            this.updateProgress(i, (e.loaded * 100.0) / e.total || 100);
            console.log("event", e);
          })
          .catch((error) => {
            this.file_error = error.response.data;
            console.log("--++", error.response);
          });
      }

      // this.autoHideAlert();
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains("bg-green-300")) {
        event.currentTarget.classList.remove("bg-gray-100");
        event.currentTarget.classList.add("bg-green-300");
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add("bg-gray-100");
      event.currentTarget.classList.remove("bg-green-300");
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      // event.currentTarget.classList.add("bg-gray-100");
      // event.currentTarget.classList.remove("bg-green-300");
    },
    // autoHideAlert() {
    //   console.log("228");
    //   const timeout = document.getElementById("alertSuccess");
    //   console.log("231", timeout);
    //   setTimeout(hideElement, 1000); //milliseconds until timeout//
    //   function hideElement() {
    //     console.log("233", timeout);
    //     // timeout.style.display = "none";
    //   }
    // },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
    // for progress bar
    initializeProgress(numFiles) {
      this.TotalFiles = numFiles;
      this.progressBar = document.getElementById("progress-bar");
      this.progressBar.value = 0;
      this.uploadProgress = [];

      for (let i = numFiles; i > 0; i--) {
        this.uploadProgress.push(0);
      }
    },
    updateProgress(fileNumber, percent) {
      this.fileCount = this.uploadProgress.length;
      this.uploadProgress[fileNumber] = percent;
      let total =
        this.uploadProgress.reduce((tot, curr) => tot + curr, 0) /
        this.uploadProgress.length;
      this.progressBar.value = total;
    },
  },
};
</script>

<style scoped>
input[type="file"] {
  color: rgba(0, 0, 0, 0);
  width: 100px;
}
.cardDrag {
  /* border: 1px solid #eaeaea; */
  border: 2px dashed #ccc;
  background-color: #fff;
  margin-bottom: 20px;
  /* margin-top: 20px; */
  /* border-left: 2px solid #69c5a5; */
  border-radius: 0px;
}
.ChooseFileButton {
  padding-left: 160px;
}
.DropSection {
  /* padding: 50px 40px; */
  padding-top: 50px;
  padding-bottom: 30px;
}
input:focus {
  border: none !important;
  box-shadow: none !important;
}
/* custom  file progress */
progress[value] {
  /* Reset the default appearance */
  -webkit-appearance: none;
  appearance: none;
  width: 250px;
  height: 8px;
}
progress[value]::-webkit-progress-bar {
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
}
progress[value]::-webkit-progress-value {
  background-color: #69c5a5;
  border-radius: 10px;
  background-size: 35px 20px, 100% 100%, 100% 100%;
}
/* for firefox progress*/
/* progress[value] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  width: 250px;
  height: 8px;
}
progress[value]::-moz-progress-bar {
  background-color: #eee;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
} */
/* progress[value]::-moz-progress-value {
  background-color: #69c5a5;
  border-radius: 10px;
  background-size: 35px 20px, 100% 100%, 100% 100%;
} */
</style>
