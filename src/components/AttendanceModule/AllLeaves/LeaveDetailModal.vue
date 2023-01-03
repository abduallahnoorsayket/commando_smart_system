<template>
  <teleport to="body">
    <div v-if="isLeaveDetailModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Leave Details Modal</p>
          </div>
          <h1>hello o</h1>

          <div class="card-body" v-if="leaves">
            <div class="row">
              <div class="col-md-6" v-if="leaves.employee_name">
                <b>
                  {{"Name: " + leaves.employee_name.first_name + " " +
                  leaves.employee_name.last_name }}
                </b>
                <br />
                <br />
                <p>
                  <strong>Leave Type:</strong>
                  {{leaves.leave_type.leave_type }}
                </p>
                <p v-if="leaves.approve_day_count != 1">
                  <strong>Total day:</strong>
                  {{leaves.approve_day_count}}
                </p>
                <p v-else>
                  <strong>Total day:</strong>
                  {{leaves.apply_day_count}}
                </p>
                <p>
                  <strong>Leave Duration Type:</strong>
                  {{
                  leaves.leave_type.duration_type}}
                </p>
                <p>
                  <strong>Leave Payable Wages:</strong>
                  {{
                  leaves.leave_type.payable_wages}}
                </p>
                <p v-if="leaves.approved_start_date">
                  <strong>Start Date:</strong>
                  {{ leaves.approved_start_date }}
                </p>
                <p v-else>
                  <strong>Start Date:</strong>
                  {{leaves.application_start_date }}
                </p>
                <p v-if="leaves.approved_end_date">
                  <strong>End Date:</strong>
                  {{leaves.approved_end_date}}
                </p>
                <p v-else>
                  <strong>End Date:</strong>
                  {{leaves.application_end_date}}
                </p>
              </div>
              <div class="col-md-6">
                <p>
                  <strong>Leave Status:</strong>
                  {{leaves.leave_type.leave_status}}
                </p>
                <p>
                  <strong>Leave Description:</strong>
                  <span v-html="leaves.leave_description"></span>
                </p>
              </div>
            </div>
            <!--  -->
            <!-- <div class="row">
              <h1></h1>
              <div class="col-md-12">
                <div class="form-group">
                  <div class="form-row">
                    <div class="col-md-6">
                      <div class="position-relative form-group">
                        <div
                          class="position-relative form-check"
                          style="margin-left: -20px"
                          v-if="leaves.employee_name"
                        >
                          <p>
                            <b class="mr-2">Employe Name:</b>
                            {{ leaves.employee_name.first_name + " " +
                            leaves.employee_name.last_name }}
                          </p>

                          <p>
                            <strong>Leave Type:</strong>
                            {{leaves.leave_type.leave_type }}
                          </p>
                          <p v-if="leaves.approve_day_count != 1">
                            <strong>Total day:</strong>
                            {{leaves.approve_day_count}}
                          </p>
                          <p v-else>
                            <strong>Total day:</strong>
                            {{leaves.apply_day_count}}
                          </p>
                          <p>
                            <strong>Leave Duration Type:</strong>
                            {{
                            leaves.leave_type.duration_type}}
                          </p>
                          <p>
                            <strong>Leave Payable Wages:</strong>
                            {{
                            leaves.leave_type.payable_wages}}
                          </p>
                          <p v-if="leaves.approved_start_date">
                            <strong>Start Date:</strong>
                            {{ leaves.approved_start_date }}
                          </p>
                          <p v-else>
                            <strong>Start Date:</strong>
                            {{leaves.application_start_date }}
                          </p>
                          <p v-if="leaves.approved_end_date">
                            <strong>End Date:</strong>
                            {{leaves.approved_end_date}}
                          </p>
                          <p v-else>
                            <strong>End Date:</strong>
                            {{leaves.application_end_date}}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="position-relative form-group">
                        <div class="position-relative form-check">
                          <p>
                            <strong>Leave Status:</strong>
                            {{leaves.leave_type.leave_status}}
                          </p>
                          <p>
                            <strong>Leave Description:</strong>
                            <span v-html="leaves.leave_description"></span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
            <!--  previous component -->
            <!-- <div class="row">
              <div class="col-md-6" v-if="leaves.employee_name">
                <b>
                  {{"Name: " + leaves.employee_name.first_name + " " +
                  leaves.employee_name.last_name }}
                </b>
                <br />
                <br />
                <p>
                  <strong>Leave Type:</strong>
                  {{leaves.leave_type.leave_type }}
                </p>
                <p v-if="leaves.approve_day_count != 1">
                  <strong>Total day:</strong>
                  {{leaves.approve_day_count}}
                </p>
                <p v-else>
                  <strong>Total day:</strong>
                  {{leaves.apply_day_count}}
                </p>
                <p>
                  <strong>Leave Duration Type:</strong>
                  {{
                  leaves.leave_type.duration_type}}
                </p>
                <p>
                  <strong>Leave Payable Wages:</strong>
                  {{
                  leaves.leave_type.payable_wages}}
                </p>
                <p v-if="leaves.approved_start_date">
                  <strong>Start Date:</strong>
                  {{ leaves.approved_start_date }}
                </p>
                <p v-else>
                  <strong>Start Date:</strong>
                  {{leaves.application_start_date }}
                </p>
                <p v-if="leaves.approved_end_date">
                  <strong>End Date:</strong>
                  {{leaves.approved_end_date}}
                </p>
                <p v-else>
                  <strong>End Date:</strong>
                  {{leaves.application_end_date}}
                </p>
              </div>
              <div class="col-md-6">
                <p>
                  <strong>Leave Status:</strong>
                  {{leaves.leave_type.leave_status}}
                </p>
                <p>
                  <strong>Leave Description:</strong>
                  <span v-html="leaves.leave_description"></span>
                </p>
              </div>
            </div>-->
          </div>
          <div class="modal-footer">
            <button class="float-right ml-2 btn btn-base" @click="CloseModal()">Close button</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";

export default {
  name: "LeaveDetailModal",
  data() {
    return {
      group: null,
      leave_Id: null,
    };
  },
  created() {
    this.leave_Id = this.$store.state.attendance.leaveId;
    console.log("172///", this.leave_Id);
    this.getLeaveInfo();
  },
  computed: {
    isLeaveDetailModalVisible() {
      return this.$store.state.attendance.isLeaveDetailModalVisible;
    },
  },
  methods: {
    CloseModal() {
      this.$store.commit("attendance/toggleLeaveDetailModal");
    },
    getLeaveInfo() {
      axios.get("leaves/" + this.leave_Id + "/").then((response) => {
        this.leaves = response.data;
        console.log("####1333", this.leaves);
      });
    },
  },
};
</script>

<style scoped>
</style>
