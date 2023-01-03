<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Edit Sprint</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitEditSprint" autocomplete="off" v-if="sprint_details">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label class="labelRightMargin">Project:</label>
                      <i class="baseColorFont font-weight-bold" v-if="project_name">{{project_name}}</i>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <!-- <div class="position-relative form-group">
                      <label class="labelRightMargin">Version:</label>
                      <i class="baseColorFont font-weight-bold">v1.0.01</i>
                    </div>-->
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Sprint Name
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="sprint_name"
                        :class="{'is-invalid':sprint_error && sprint_error.sprint_name}"
                      />
                      <!--error handling-->
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.sprint_name}"
                        v-if="sprint_error && sprint_error.sprint_name"
                      >{{sprint_error.sprint_name[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Version
                        <span class="asterisk">*</span>
                      </label>
                      <select name="select" v-model="version" class="form-control"  :class="{'is-invalid':sprint_error && sprint_error.version}">
                        <option value="false" disabled selected>Select version</option>
                        <option
                          v-for="(version,index) in all_versions"
                          :key="index"
                          :value="version.id"
                        >{{version.version_name}}</option>
                      </select>
                      <div
                        :class="{
                          'invalid-feedback':
                            sprint_error && sprint_error.version,
                        }"
                        v-if="sprint_error && sprint_error.version"
                      >
                        {{ sprint_error && sprint_error.version[0] }}
                      </div>
                      <!-- :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                             <div
                            :class="{ 'invalid-feedback': task_error_data && task_error_data.sprint }"
                            v-if="task_error_data && task_error_data.sprint"
                      >{{ task_error_data.sprint[0] }}</div>-->
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <!-- <div class="position-relative form-group">
                      <label class="labelRightMargin">Version:</label>
                      <i class="baseColorFont font-weight-bold">v1.0.01</i>
                    </div>-->
                    <label>
                      Status
                      <!-- <span class="asterisk">*</span> -->
                    </label>
                    <select
                      name="select"
                      v-model="status"
                      type="choice"
                      class="form-control"
                      :class="{ 'is-invalid': task_error_data && task_error_data.sprint }"
                    >
                      <option disabled selected>Select Status</option>
                      <option value="PN">Pending</option>
                      <option value="RN">Running</option>
                      <option value="CM">Completed</option>
                      <option value="HO">Handovered</option>
                    </select>
                    <div
                      :class="{ 'invalid-feedback': task_error_data && task_error_data.privacy_status }"
                      v-if="task_error_data && task_error_data.privacy_status"
                    >{{ task_error_data.privacy_status[0] }}</div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Total Hours
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="total_hour"
                        :class="{'is-invalid':sprint_error && sprint_error.total_hour}"
                      />
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.total_hour}"
                        v-if="sprint_error && sprint_error.total_hour"
                      >{{sprint_error.total_hour[0] }}</div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Expected Start date
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        name="joining-date"
                        id="date"
                        type="date"
                        class="form-control"
                        v-model="expected_start_date"
                        :class="{'is-invalid':sprint_error && sprint_error.expected_start_date}"
                      />
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.expected_start_date}"
                        v-if="sprint_error && sprint_error.expected_start_date"
                      >{{sprint_error.expected_start_date[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Start date
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <input
                        name="joining-date"
                        id="date"
                        type="date"
                        class="form-control"
                        v-model="start_date"
                        :class="{'is-invalid':sprint_error && sprint_error.start_date}"
                      />
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.start_date}"
                        v-if="sprint_error && sprint_error.start_date"
                      >{{sprint_error.start_date[0] }}</div>
                      <!-- <div
                        :class="{'invalid-feedback':group_error_data && group_error_data.name}"
                        v-if="group_error_data && group_error_data.name"
                      >{{group_error_data.name[0] }}</div>-->
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
                      <input
                        name="joining-date"
                        id="date"
                        type="date"
                        class="form-control"
                        v-model="expected_end_date"
                        :class="{'is-invalid':sprint_error && sprint_error.expected_end_date}"
                      />
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.expected_end_date}"
                        v-if="sprint_error && sprint_error.expected_end_date"
                      >{{sprint_error.expected_end_date[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        End date
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <input
                        name="joining-date"
                        id="date"
                        type="date"
                        class="form-control"
                        v-model="end_date"
                        :class="{'is-invalid':sprint_error && sprint_error.end_date}"
                      />
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.end_date}"
                        v-if="sprint_error && sprint_error.end_date"
                      >{{sprint_error.end_date[0] }}</div>
                      <!-- <div
                        :class="{'invalid-feedback':group_error_data && group_error_data.name}"
                        v-if="group_error_data && group_error_data.name"
                      >{{group_error_data.name[0] }}</div>-->
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Expected Handover date
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        name="joining-date"
                        id="date"
                        type="date"
                        class="form-control"
                        v-model="expected_handover_date"
                        :class="{'is-invalid':sprint_error && sprint_error.expected_handover_date}"
                      />
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.expected_handover_date}"
                        v-if="sprint_error && sprint_error.expected_handover_date"
                      >{{sprint_error.expected_handover_date[0] }}</div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        Handover date
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <input
                        name="joining-date"
                        id="date"
                        type="date"
                        class="form-control"
                        v-model="handover_date"
                        :class="{'is-invalid':sprint_error && sprint_error.handover_date}"
                      />
                      <div
                        :class="{'invalid-feedback':sprint_error && sprint_error.handover_date}"
                        v-if="sprint_error && sprint_error.handover_date"
                      >{{sprint_error.handover_date[0] }}</div>
                      <!-- <div
                        :class="{'invalid-feedback':group_error_data && group_error_data.name}"
                        v-if="group_error_data && group_error_data.name"
                      >{{group_error_data.name[0] }}</div>-->
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
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

                        <label for="test2">No</label>
                      </p>
                      <div
                        v-if="sprint_error &&  sprint_error.is_current"
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
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <div>
                        <label>Sprint Goal</label>
                        <span class="text-muted"></span>
                      </div>
                      <textarea
                        v-model="description"
                        type="text"
                        class="form-control"
                        rows="3"
                        cols="50"
                      ></textarea>

                      <!--  :class="{ 'is-invalid': base_error && base_error.short_bio }"
                        maxlength="201" 
                        <div
                        v-if="user_profile.short_bio && user_profile.short_bio.length > 200 "
                        class="alert alert-danger alert-dismissible fade show text-center"
                        role="alert"
                      >Max. Character Exceeds for Short Bio!! Please remove one charecter.</div>-->
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="submitEditSprint()" class="mt-2 btn btn-base float-right">Submit</button>
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
  name: "EditSprintModal",

  data() {
    return {
      sprint_details: null,
      handover_date: null,
      expected_handover_date: null,
      description: null,
      start_date: null,
      end_date: null,
      expected_end_date: null,
      expected_start_date: null,
      total_hour: null,
      is_current: null,
      status: null,
      version: null,
      sprint_name: null,
      all_versions: null,
      projectID: null,
      project_name: null,
      sprint_id: null,
      //
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
      sprint_error: {
        sprint_name: null,
        total_hour: null,
        is_current: null,
      },
    };
  },

  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.SprintEditModalVisible;
    },
  },
  created() {
    this.projectID = this.$route.query.project_id ? this.$route.query.project_id:this.$route.query.version__project;
    this.sprint_id = this.$store.state.projectRelated.SprintId;
    console.log("sprint id", this.sprint_id);
    this.initialLoad();
  },

  methods: {
    CloseModal() {
      this.$store.commit(
        "projectRelated/toggleSprintEditModal"
        // this.employee
      );
    },
    initialLoad: function () {
      this.loadVersion();
      this.getSprintDetails();
      this.getProjectDeatails();
    },
    getProjectDeatails: function () {
      axios.get("projects/" + this.projectID + "/").then(
        (response) => {
          // this.form_data = response.data;
          this.project_name = response.data.project_name;

          // this.form_data.leave_type = this.form_data.leave_type.id;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    // loadVersion
    loadVersion() {
      // const token = localStorage.getItem("token");
      var queryParam = {
        project: this.projectID,
        page: this.$route.query.page,
      };
      axios
        .get("versions/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_versions = response.data.results;
          console.log("408", this.all_versions);

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
          console.log(response.status);
        });

      // .then(
      //   function (response) {
      //     this.all_versions = response.data.results;
      //   }.bind(this)
      // )
      // .catch(function (error) {
      //   console.log(error);
      // });
    },
    // getSprintDetails
    getSprintDetails() {
      axios.get("sprints/" + this.sprint_id + "/").then(
        // axios.get("sprints/1/").then(
        (response) => {
          this.sprint_details = response.data;
          this.sprint_name = response.data.sprint_name;
          this.version = response.data.version.id;
          this.status = response.data.status;
          this.total_hour = response.data.total_hour;
          this.expected_start_date = response.data.expected_start_date;
          this.expected_end_date = response.data.expected_end_date;
          this.start_date = response.data.start_date;
          this.end_date = response.data.end_date;
          this.expected_handover_date = response.data.expected_handover_date;
          this.handover_date = response.data.handover_date;
          this.is_current = response.data.is_current;
          this.description = response.data.description;

          console.log("----sprint_details---", this.sprint_details);
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    submitEditSprint() {
      axios
        .put("sprints/" + this.sprint_id + "/", {
          // .put("sprints/1/", {
          sprint_name: this.sprint_name,
          is_current: this.is_current,
          status: this.status,
          start_date: this.start_date,
          end_date: this.end_date,
          total_hour: this.total_hour,
          expected_start_date: this.expected_start_date,
          expected_end_date: this.expected_end_date,
          expected_handover_date: this.expected_handover_date,
          handover_date: this.handover_date,
          version: this.version,
          description: this.description,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully Edited sprint.",
          }).then((result) => {
            this.CloseModal();
            this.$emit("load-sprint");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.sprint_error = error.response.data;
          console.log("--++", error.response);
        });
    },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 660px;
}
.durationCount {
  font-size: 85%;
  color: #6c757d !important;
  font-weight: 400;
}
/* scroll in modal */
.card-body {
  height: 65vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>