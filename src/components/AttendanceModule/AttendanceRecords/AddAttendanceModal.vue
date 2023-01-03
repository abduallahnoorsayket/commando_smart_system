<template>
  <div class="mt-2"></div>
  <teleport to="body">
    <div v-if="AddModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">
              {{
                $store.getters.GET_ADD +
                " " +
                $store.getters.GET_ATTENDANCE +
                " " +
                $store.getters.GET_INFORMATION
              }}
            </p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitAddAttendance" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <!-- <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11">
                        Attendance Datetime
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        placeholder="attendance date time"
                        id="Login"
                        v-model="attendance_datetime"
                        type="date"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error &&
                            AddAttendance_error.attendance_datetime,
                        }"
                      />

                      <div
                        :class="{
                          'invalid-feedback':AddAttendance_error && AddAttendance_error.attendance_datetime, }"
                        v-if="
                          AddAttendance_error &&
                          AddAttendance_error.attendance_datetime "
                      >{{ AddAttendance_error.attendance_datetime[0] }}</div>
                    </div>
                  </div> -->
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class>
                        {{ $store.getters.GET_LOGIN }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="login_time"
                        type="time"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error &&
                            AddAttendance_error.login_time,
                        }"
                      />
                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            AddAttendance_error &&
                            AddAttendance_error.login_time,
                        }"
                        v-if="
                          AddAttendance_error && AddAttendance_error.login_time
                        "
                      >
                        {{ AddAttendance_error.login_time[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 position-relative form-group">
                    <label>
                      {{ $store.getters.GET_BREAKIN }}
                      <!-- <span class="asterisk">*</span> -->
                    </label>
                    <input
                      v-model="breakin_time"
                      type="time"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          AddAttendance_error &&
                          AddAttendance_error.breakin_time,
                      }"
                    />
                    <div
                      :class="{
                        'invalid-feedback':
                          AddAttendance_error &&
                          AddAttendance_error.breakin_time,
                      }"
                      v-if="
                        AddAttendance_error && AddAttendance_error.breakin_time
                      "
                    >
                      {{ AddAttendance_error.breakin_time[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class>
                        {{ $store.getters.GET_BREAKOUT }}
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <input
                        v-model="breakout_time"
                        placeholder
                        type="time"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error &&
                            AddAttendance_error.breakout_time,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            AddAttendance_error &&
                            AddAttendance_error.breakout_time,
                        }"
                        v-if="
                          AddAttendance_error &&
                          AddAttendance_error.breakout_time
                        "
                      >
                        {{ AddAttendance_error.breakout_time[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 position-relative form-group">
                    <label>
                      {{ $store.getters.GET_LOGOUT }}
                      <!-- <span class="asterisk">*</span> -->
                    </label>
                    <input
                      v-model="logout_time"
                      placeholder
                      type="time"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          AddAttendance_error &&
                          AddAttendance_error.logout_time,
                      }"
                    />
                    <div
                      :class="{
                        'invalid-feedback':
                          AddAttendance_error &&
                          AddAttendance_error.logout_time,
                      }"
                      v-if="
                        AddAttendance_error && AddAttendance_error.logout_time
                      "
                    >
                      {{ AddAttendance_error.logout_time[0] }}
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class>
                        {{ $store.getters.GET_REMARKS }}
                      </label>
                      <input
                        v-model="remarks"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error && AddAttendance_error.remarks,
                        }"
                      />
                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            AddAttendance_error && AddAttendance_error.remarks,
                        }"
                        v-if="
                          AddAttendance_error && AddAttendance_error.remarks
                        "
                      >
                        {{ AddAttendance_error.remarks[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11">
                        {{ $store.getters.GET_COST }}
                      </label>
                      <input
                        v-model="cost"
                        type="number"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error && AddAttendance_error.cost,
                        }"
                      />
                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            AddAttendance_error && AddAttendance_error.cost,
                        }"
                        v-if="AddAttendance_error && AddAttendance_error.cost"
                      >
                        {{ AddAttendance_error.cost[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- <div class="form-group">
                  <div class="form-row">
                    <div class="col-md-6"></div>
                    <div class="col-md-6">
                      <button
                        class="mt-2 float-right ml-2 btn btn-successs"
                        @click="CloseModal()"
                      >Close</button>
                      <button
                        @submit.prevent="submitAddAttendance"
                        class="mt-2 btn btn-base float-right"
                      >Submit</button>
                    </div>
                  </div>
                </div>-->
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              @click="submitAddAttendance()"
              class="mt-2 btn btn-base float-right"
            >
              {{ $store.getters.GET_SUBMIT }}
            </button>
            <button
              class="mt-2 float-right ml-2 btn btn-successs"
              @click="CloseModal()"
            >
              {{ $store.getters.GET_CLOSE }}
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
  name: "AddAttendanceModal",
  props: ["attendance_date"],
  data() {
    return {
      attendance_datetime: null,
      employee: null,
      login_time: null,
      breakin_time: null,
      breakout_time: null,
      logout_time: null,
      remarks: null,
      cost: null,
      user: null,
      users: null,
      AddAttendance_error: {
        attendance_datetime: null,
        employee: null,
        login_time: null,
        breakin_time: null,
        breakout_time: null,
        logout_time: null,
        remarks: null,
        cost: null,
      },
    };
  },
  created() {
    this.employee = this.$store.state.attendance.employeeId;
    this.attendance_datetime = this.$props.attendance_date;
    // this.AttendanceDate = this.$store.state.attendance.Attendance_Date;
    console.log("280", this.attendance_datetime);
  },
  computed: {
    AddModalVisible() {
      return this.$store.state.attendance.isModalVisible;
    },
  },

  methods: {
    CloseModal() {
      this.$store.commit("attendance/toggleModal");
    },

    submitAddAttendance() {
      axios
        .post("attendance-records/", {
          attendance_datetime: this.attendance_datetime,
          employee: this.employee ? this.employee : localStorage.getItem("id"),
          login_time: this.login_time,
          breakin_time: this.breakin_time,
          breakout_time: this.breakout_time,
          logout_time: this.logout_time,
          remarks: this.remarks,
          cost: this.cost ? this.cost : null,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
             text: this.$store.getters.GET_CREATED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            this.CloseModal();
            console.log(result);
            this.$emit("load-attendance");
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
/* teleport modal */
.modal-dialog {
  max-width: 500px;
}
</style>
