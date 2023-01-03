<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-marker icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                 {{ $store.getters.GET_UPDATE +' '+$store.getters.GET_LEAVE+ ' '+ $store.getters.GET_REQUEST}}
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <form @submit.prevent="submitEditLeave" v-if="form_data" autocomplete="off">
                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label>
                               {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_SUBJECT}}
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            id="leave_subject"
                            v-model="form_data.leave_subject"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': update_leave_error && update_leave_error.leave_subject }"
                          />
                          <div
                            :class="{ 'invalid-feedback': update_leave_error && update_leave_error.leave_subject }"
                            v-if="update_leave_error && update_leave_error.leave_subject"
                          >{{ update_leave_error.leave_subject[0] }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                               {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}
                            <span class="asterisk">*</span>
                          </label>

                          <select
                            name="select"
                            id="department"
                            v-model="form_data.leave_type"
                            class="form-control"
                            :class="{ 'is-invalid': update_leave_error && update_leave_error.leave_type }"
                          >
                           <option value="false"  selected>
                             {{$store.getters.GET_SELECT  +' '+$store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}
                          </option>
                            <option
                              v-for="leavetype in all_leaveTypes"
                              :key="leavetype.id"
                              :value="leavetype.id"
                            >{{ leavetype.leave_type }}</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': update_leave_error && update_leave_error.leave_type }"
                            v-if="update_leave_error && update_leave_error.leave_type"
                          >{{ update_leave_error.leave_type[0] }}</div>
                        </div>
                      </div>

                      <div class="col-md-6" v-if="form_data.employee_name">
                        <label>
                             {{ $store.getters.GET_EMPLOYEE +' '+$store.getters.GET_NAME}}
                        </label>
                        <input
                          v-model="form_data.employee_name.username"
                          type="text"
                          class="form-control"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                               {{ $store.getters.GET_APPLICATION +' '+$store.getters.GET_START+ ' '+ $store.getters.GET_DATE}}
                          </label>
                          <input
                            v-model="form_data.application_start_date"
                            type="date"
                            class="form-control"
                            :class="{ 'is-invalid': update_leave_error && update_leave_error.application_start_date }"
                            disabled
                          />
                          <div
                            :class="{ 'invalid-feedback': update_leave_error && update_leave_error.application_start_date }"
                            v-if="update_leave_error && update_leave_error.application_start_date"
                          >{{ update_leave_error.application_start_date[0] }}</div>
                        </div>
                      </div>

                      <div class="col-md-4 position-relative form-group">
                        <label>
                            {{ $store.getters.GET_APPLICATION +' '+$store.getters.GET_END+ ' '+ $store.getters.GET_DATE}}
                        </label>
                        <input
                          v-model="form_data.application_end_date"
                          type="date"
                          class="form-control"
                          :class="{ 'is-invalid': update_leave_error && update_leave_error.application_end_date }"
                          disabled
                        />
                        <div
                          :class="{ 'invalid-feedback': update_leave_error && update_leave_error.application_end_date }"
                          v-if="update_leave_error && update_leave_error.application_end_date"
                        >{{ update_leave_error.application_end_date[0] }}</div>
                      </div>

                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label for="exampleEmail11" class>
                            {{ $store.getters.GET_APPLY +' '+$store.getters.GET_DAY}}
                          </label>
                          <input
                            v-model="form_data.apply_day_count"
                            type="text"
                            class="form-control"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                             {{ $store.getters.GET_APPROVED +' '+$store.getters.GET_START+ ' '+ $store.getters.GET_DATE}}
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            v-model="form_data.approved_start_date"
                            type="date"
                            class="form-control"
                            :class="{ 'is-invalid': update_leave_error && update_leave_error.approved_start_date }"
                          />
                          <div
                            :class="{ 'invalid-feedback': update_leave_error && update_leave_error.approved_start_date }"
                            v-if="update_leave_error && update_leave_error.approved_start_date"
                          >{{ update_leave_error.approved_start_date[0] }}</div>
                        </div>
                      </div>

                      <div class="col-md-4 position-relative form-group">
                        <label>
                             {{ $store.getters.GET_APPROVED +' '+$store.getters.GET_END+ ' '+ $store.getters.GET_DATE}}
                          <!-- <span class="asterisk">*</span> 
                          v-if="form_data.approved_end_date"-->
                        </label>
                        <input
                          v-model="setApprovedEndDate"
                          type="date"
                          class="form-control"
                          :class="{ 'is-invalid': update_leave_error && update_leave_error.approved_end_date }"
                        />
                        <!-- <input
                          v-else
                          v-model="setApplicationEndDate"
                          type="date"
                          class="form-control"
                          :class="{ 'is-invalid': update_leave_error && update_leave_error.approved_end_date }"
                        /> -->
                        <div
                          :class="{ 'invalid-feedback': update_leave_error && update_leave_error.approved_end_date }"
                          v-if="update_leave_error && update_leave_error.approved_end_date"
                        >{{ update_leave_error.approved_end_date[0] }}</div>
                      </div>
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                             {{ $store.getters.GET_APPROVED +' '+$store.getters.GET_DAY}}
                          </label>
                          <input
                            v-if="form_data.approve_day_count"
                            v-model="form_data.approve_day_count"
                            type="text"
                            class="form-control"
                            disabled
                          />
                          <input
                            v-else
                            v-model="form_data.apply_day_count"
                            type="text"
                            class="form-control"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label for="exampleEmail11" class>
                               {{ $store.getters.GET_SELECT +' '+$store.getters.GET_LEAVE+ ' '+ $store.getters.GET_STATUS}}
                          </label>
                          <select
                            v-model="form_data.select_leave_status"
                            type="choice"
                            class="form-control"
                          >
                            <option value="Pending"> {{ $store.getters.GET_PENDING}}</option>
                            <option value="Approve">{{ $store.getters.GET_APPROVED}}</option>
                            <option value="Decline">{{ $store.getters.GET_DECLINE}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                              {{ $store.getters.GET_APPROVED +' '+$store.getters.GET_BY}}
                          </label>
                          <br />
                          <input v-model="approvedBy" type="text" class="form-control" disabled />
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label for="leaveDesc" class>
                              {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_DESCRIPTION}}
                             <span class="asterisk">*</span></label>
                          <br />
                          <ckeditor
                            :editor="editor"
                            v-model="form_data.leave_description"
                            :config="editorConfig"
                          ></ckeditor>
                           <div
                      v-if="update_leave_error && update_leave_error.leave_description"
                      class="alert alert-danger alert-dismissible fade show text-left mt-1"
                      role="alert"
                    >
                      {{ update_leave_error.leave_description[0] }}
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

                    <div class="form-group">
                      <button
                        @submit.prevent="submitEditLeave"
                        class="mt-2 btn btn-successs btn-lg float-right"
                      >{{ $store.getters.GET_SUBMIT}}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "UpdateLeaveReq",
  components: {
    Master,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      setApplicationEndDate: null,
      setApprovedEndDate:null,
      editor: ClassicEditor,
      approvedBy: null,
      form_data: null,
      all_leaveTypes: null,
      update_leave_error: {
        leave_subject: null,
        leave_type: null,
        // select_leave_status: null,
        leave_description: null,
        application_start_date: null,
        // application_end_date: null,
        approved_start_date: null,
        approved_end_date: null,
      },
    };
  },
  created() {
    this.getLeaveData();
    this.loadLeave();
    this.approvedBy = localStorage.getItem("username");
  },
  methods: {
    // short list leave type

    loadLeave() {
      const currntUserBranchID = localStorage.getItem("branch_id");
      axios
        .get("leave-type-short-list/", {
          params: {
            branch: currntUserBranchID,
          },
        })
        .then((response) => {
          this.all_leaveTypes = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // loadLeave: function () {
    //   const currntUserBranchID = localStorage.getItem("branch_id");
    //   axios
    //     .get("leave-types/", {
    //       params: {
    //         branch: currntUserBranchID,
    //       },
    //     })
    //     .then((response) => {
    //       this.all_leaveTypes = response.data.results;
    //     });
    // },

    getLeaveData: function () {
      axios.get(`leaves/${this.$route.params.id}/`).then(
        (response) => {
          this.form_data = response.data;
          this.form_data.leave_type = this.form_data.leave_type.id;
          this.setApplicationEndDate = this.form_data.application_end_date;
          this.setApprovedEndDate = this.form_data.approved_end_date;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    submitEditLeave() {
      axios
        .put("leaves/" + this.$route.params.id + "/", {
          leave_subject: this.form_data.leave_subject,
          leave_description: this.form_data.leave_description,
          leave_type: this.form_data.leave_type,
          select_leave_status: this.form_data.select_leave_status,
          application_start_date: this.form_data.application_start_date,
          application_end_date: this.form_data.application_end_date,
          approved_start_date: this.form_data.approved_start_date,
          // approved_end_date: this.form_data.approved_end_date
          //   ? this.form_data.approved_end_date
          //   : this.setApplicationEndDate,
          approved_end_date: this.setApprovedEndDate,  
          apply_day_count: this.form_data.apply_day_count,
          approve_day_count: this.approve_day_count,
        })

        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: this.$store.getters.GET_UPDATED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((response) => {
            this.$router.push({ name: "AllLeaves" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          this.update_leave_error = error.response.data;
          console.log(" updated error", error.response);
        });
    },
  },
};
</script>

<style scoped>
</style>
