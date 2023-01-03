<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Edit Version</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitEditVersion" autocomplete="off">
              <div class="form-group">
                <!-- <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label class="labelRightMargin">Project:</label>
                      <i class="baseColorFont font-weight-bold">HRM-Nippon</i>
                    </div>
                  </div>
                </div>-->
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label class="exampleEmail11">
                        Version Name
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="version_name"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            version_error && version_error.version_name, }"
                      />
                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            version_error && version_error.version_name,
                        }"
                        v-if="
                          version_error && version_error.version_name
                        "
                      >{{ version_error.version_name[0] }}</div>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class>Description</label>
                      <ckeditor
                        :editor="editor"
                        v-model="description"
                        rows="3"
                        :config="editorConfig"
                      ></ckeditor>
                      <div
                        :class="{
                          'invalid-feedback':
                            AddAttendance_error &&
                            AddAttendance_error.breakout_time,
                        }"
                        v-if="
                          AddAttendance_error &&
                          AddAttendance_error.breakout_time "
                      >{{ AddAttendance_error.breakout_time[0] }}</div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Expected start date
                        <span class="asterisk">*</span>
                      </label>
                      <input type="date" class="form-control" v-model="expected_start_date" 
                       :class="{
                          'is-invalid':
                            version_error && version_error.expected_start_date }"/>
                      <div
                        :class="{
                          'invalid-feedback':
                            version_error && version_error.expected_start_date,
                        }"
                        v-if="
                          version_error && version_error.expected_start_date
                        "
                      >{{ version_error.expected_start_date[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Start date
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <input type="date" class="form-control" v-model="start_date" />
                      <!-- <div
                          :class="{ 'invalid-feedback': error_data && error_data.user_profile.joining_date }"
                          v-if="error_data && error_data.user_profile.joining_date"
                      >{{ error_data.user_profile.joining_date[0] }}</div>-->
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Expected end date
                        <span class="asterisk">*</span>
                      </label>
                      <input type="date" class="form-control" v-model="expected_end_date"  
                      :class="{
                          'is-invalid':
                            version_error && version_error.expected_end_date, }" />
                      <div
                        :class="{
                          'invalid-feedback':
                            version_error && version_error.expected_end_date,
                        }"
                        v-if="
                          version_error && version_error.expected_end_date
                        "
                      >{{ version_error.expected_end_date[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        End date
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <input type="date" class="form-control" v-model="end_date" />
                      <!-- <div
                          :class="{ 'invalid-feedback': error_data && error_data.user_profile.joining_date }"
                          v-if="error_data && error_data.user_profile.joining_date"
                      >{{ error_data.user_profile.joining_date[0] }}</div>-->
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Expected handover date
                        <span class="asterisk">*</span>
                      </label>
                      <input type="date" class="form-control" v-model="expected_handover_date"  :class="{
                          'is-invalid':
                            version_error && version_error.expected_handover_date, }"/>
                      <div
                        :class="{
                          'invalid-feedback':
                            version_error && version_error.expected_handover_date,
                        }"
                        v-if="
                          version_error && version_error.expected_handover_date
                        "
                      >{{ version_error.expected_handover_date[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>Handover date</label>
                      <input type="date" class="form-control" v-model="handover_date" />
                      <!-- <div
                          :class="{ 'invalid-feedback': error_data && error_data.user_profile.joining_date }"
                          v-if="error_data && error_data.user_profile.joining_date"
                      >{{ error_data.user_profile.joining_date[0] }}</div>-->
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-6">
                    <label>Status</label>
                    <select name="select" v-model="status" type="choice" class="form-control">
                      <option value="PN">Pending</option>
                      <option value="RN">Running</option>
                      <option value="PP">Postponed</option>
                      <option value="CM">Completed</option>
                      <option value="HO">Handovered</option>
                    </select>
                    <div
                      :class="{ 'invalid-feedback': error_add_holiday && error_add_holiday.type }"
                      v-if="error_add_holiday && error_add_holiday.type"
                    >{{ error_add_holiday.type[0] }}</div>
                  </div>
                  <div class="col-md-6 position-relative form-group">
                    <label>
                      Current
                      <span class="asterisk">*</span>
                    </label>
                    <p class="mt-2 ml-2">
                      <span class="mr-3">
                        <input
                          type="radio"
                          id="test1"
                          name="radio-group"
                          v-model="is_current"
                          value="1"
                          class="form-control"
                          :checked="is_current == true"
                        />
                        <!-- :class="{'is-invalid':sprint_error && sprint_error.is_current}"
                            <span
                            :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                            v-if="sprint_error && sprint_error.is_current"
                        >{{sprint_error.is_current[0] }}</span>-->
                        <label for="test1">Yes</label>
                      </span>
                      <input
                        type="radio"
                        id="test2"
                        name="radio-group"
                        v-model="is_current"
                        value="0"
                        class="form-control"
                        :checked="is_current == false"
                      />
                      <!--:class="{'is-invalid':sprint_error && sprint_error.is_current}"
                           <span
                          :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                          v-if="sprint_error && sprint_error.is_current"
                      >{{sprint_error.is_current[0] }}</span>--> 
                      <label for="test2">No</label>
                    </p>
                    <div
                      v-if="version_error &&  version_error.is_current"
                      class="alert alert-danger alert-dismissible fade show text-left mt-1"
                      role="alert"
                    >
                      Please select an option.
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <!-- custom radio -->

                    <!-- <div class="form-check form-check-inline">
                      <label class="form-check-radio" style="font-weight: 300;">
                        <input type="radio" name="CurrentYes" id="inlineRadio1" value="1" />
                        <span class="checkmark" for="inlineRadio1"></span>
                        <span class="isCurrent">Yes</span>
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <label class="form-check-radio" style="font-weight: 300;">
                        <input type="radio" name="CurrentYes" id="inlineRadio2" value="2" />
                        <span class="checkmark ml-1" for="inlineRadio2"></span>
                        <span class="isCurrentNo">No</span>
                      </label>
                    </div>-->

                    <!-- checkbox previous  -->
                    <!-- <label class="form-check-label" style="font-weight: 300;">
                      <input type="checkbox" v-model="permissions" class="form-check-input" />
                      <span class="checkmark"></span>
                      <span class="isCurrent">Yes</span>
                    </label>
                    <label class="form-check-label" style="font-weight: 300;">
                      <input type="checkbox" v-model="permissions" class="form-check-input" />
                      <span class="checkmark isCurrentNoChecbox"></span>
                      <span class="isCurrentNo">No</span>
                    </label>-->
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="submitEditVersion()" class="mt-2 btn btn-base float-right">Submit</button>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "EditVersionModal",
  components: { ckeditor: CKEditor.component },
  data() {
    return {
      version_name: null,
      is_current: null,
      description: null,
      expected_start_date: null,
      start_date: null,
      expected_end_date: null,
      end_date: null,
      expected_handover_date: null,
      handover_date: null,
      status: null,
      version_id: null,
      //
      editor: ClassicEditor,

      version_error: {
        version_name: null,
        is_current: null,
      },
    };
  },

  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.VersionEditModalVisible;
    },
  },
  created() {
    this.version_id = this.$store.state.projectRelated.versionId;
    this.initialLoad();
  },

  methods: {
    CloseModal() {
      this.$store.commit(
        "projectRelated/toggleVersionEditModal"
        // this.employee
      );
    },
    initialLoad: function () {
      this.getVersionDetails();
    },
    // getSprintDetails
    getVersionDetails() {
      axios.get("versions/" + this.version_id + "/").then(
        // axios.get("sprints/1/").then(
        (response) => {
          // this.sprint_details = response.data;
          this.version_name = response.data.version_name;
          this.description = response.data.description;
          this.is_current = response.data.is_current;
          this.start_date = response.data.start_date;
          this.end_date = response.data.end_date;
          this.expected_start_date = response.data.expected_start_date;
          this.expected_end_date = response.data.expected_end_date;
          this.expected_handover_date = response.data.expected_handover_date;
          this.handover_date = response.data.handover_date;
          this.status = response.data.status;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    submitEditVersion() {
      axios
        .put("versions/" + this.version_id + "/", {
          version_name: this.version_name,
          is_current: this.is_current,
          description: this.description,
          expected_start_date: this.expected_start_date,
          start_date: this.start_date,
          expected_end_date: this.expected_end_date,
          end_date: this.end_date,
          expected_handover_date: this.expected_handover_date,
          handover_date: this.handover_date,
          status: this.status,
          // project: this.projectID,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully edited version..",
          }).then((result) => {
            this.CloseModal();
            this.$emit("load-version");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.version_error = error.response.data;
          console.log("--++", error.response);
        });
    },
  },
};
</script>
<style scoped>
.isCurrent {
  /* margin: 12px 0px 0px 20px;
  top: 10;
  position: absolute; */
  /*  */
  margin: 22px 0px 0px -60px;
  top: 10;
  position: absolute;
  font-size: 14px;
}
.isCurrentNo {
  /* margin: 35px 0px 0px 100px;
  top: 0;
  position: absolute; */
  /*  */
  margin: 22px 0px 0px -5px;
  top: 0;
  position: absolute;
  font-size: 14px;
}
.isCurrentNoChecbox {
  margin: 38px 0px 0px 90px;
  top: 0;
  position: absolute;
}
/* .ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border-color: var(--ck-color-base-border);
  min-height: 200px;
} */
.ck-editor__editable_inline {
  min-height: 200px !important;
}
/* scroll in modal */
.card-body {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}
/* custom Radio button */
.form-check-radio {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.form-check-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 50%;
  margin-top: 22px;
  margin-left: -50px;
}

/* On mouse-over, add a grey background color */
.form-check-radio:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.form-check-radio input:checked ~ .checkmark {
  background-color: #69c5a5;
  border: none;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.form-check-radio input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.form-check-radio .checkmark:after {
  top: 5.1px;
  left: 5.1px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
/*  custom radio end */
</style>