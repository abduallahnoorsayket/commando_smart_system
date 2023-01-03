<template>
  <teleport to="body">
    <div v-if="UpdateModalVisible && form_data" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">
              {{
                $store.getters.GET_UPDATE +
                " " +
                $store.getters.GET_ATTENDANCE +
                " " +
                $store.getters.GET_INFORMATION
              }}
            </p>
          </div>

          <div class="card-body">
            <form @submit.prevent="submitEditAttendance" autocomplete="off">
              <div class="form-group">
                <div class="form-row"></div>
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11">
                        {{ $store.getters.GET_LOGIN }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="finalLogIn"
                        type="time"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error &&
                            AddAttendance_error.login_time,
                        }"
                      />

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
                      v-model="finalBreakIn"
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
                      <label for="exampleEmail11">
                        {{ $store.getters.GET_BREAKOUT }}
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <input
                        v-model="finalBreakOut"
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
                      v-model="finalLogOut"
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
                      <label for="exampleEmail11">{{
                        $store.getters.GET_REMARKS
                      }}</label>
                      <input
                        v-model="form_data.remarks"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error && AddAttendance_error.remarks,
                        }"
                      />

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
                        v-model="form_data.cost"
                        type="number"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            AddAttendance_error && AddAttendance_error.cost,
                        }"
                      />

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
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              @click="submitEditAttendance()"
              class="mt-2 btn btn-base float-right"
            >
              {{ $store.getters.GET_SUBMIT }}
            </button>
            <button
              class="mt-2 float-right ml-2 btn btn-successs"
              @click="CloseUpdateModal()"
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
  name: "UpdateAttendanceModal",
  data() {
    return {
      attendance_ID: null,
      finalAttendanceDateTime: null,
      finalLogIn: null,
      finalBreakIn: null,
      finalBreakOut: null,
      finalLogOut: null,
      modalOpen: false,
      isModalVisible: false,
      isUpdateVisible: false,
      form_data: null,
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
    this.attendance_ID = this.$store.state.attendance.attendanceId;
    this.getAttendanceData();
  },

  computed: {
    UpdateModalVisible() {
      return this.$store.state.attendance.isUpdateModalVisible;
    },
  },
  methods: {
    CloseUpdateModal() {
      this.$store.commit("attendance/toggleUpdateModal");
    },
    getAttendanceData: function () {
      axios.get("attendance-records/" + this.attendance_ID + "/").then(
        (response) => {
          this.form_data = response.data;
          this.form_data.employee = this.form_data.employee.id;
          // let responseAttendanceDateTime = response.data.attendance_datetime;
          this.finalAttendanceDateTime = response.data.attendance_datetime;
          // this.finalAttendanceDateTime = response.data.attendance_datetime.slice(
          //   0,- 9);
          let responseLogin = response.data.login_time;
          let responseBreakin = response.data.breakin_time;
          let responseBreakout = response.data.breakout_time;
          let responseLogout = response.data.logout_time;
          console.log("310", this.finalAttendanceDateTime);
          // attendance_datetime
          // let attendanceDate = responseAttendanceDateTime.slice(
          //   0,
          //   responseAttendanceDateTime.length - 9
          // );

          // if (responseAttendanceDateTime.includes("PM")) {
          //   let hoursbreakin = responseAttendanceDateTime.slice(
          //     11,
          //     responseAttendanceDateTime.length - 6
          //   );
          //   let newBreakTime =
          //     parseInt(hoursbreakin) < 12
          //       ? parseInt(hoursbreakin) + 12
          //       : parseInt(hoursbreakin);

          //   let minutesbreakin = responseAttendanceDateTime.slice(
          //     13,
          //     responseAttendanceDateTime.length - 3
          //   );
          //   let attendanceTime = newBreakTime.toString().concat(minutesbreakin);
          //   this.finalAttendanceDateTime = attendanceDate.concat(
          //     "T",
          //     attendanceTime
          //   );
          // } else if (responseAttendanceDateTime.includes("AM")) {
          //   let hoursbreakin = responseAttendanceDateTime.slice(
          //     11,
          //     responseAttendanceDateTime.length - 6
          //   );
          //   let newBreakTime =
          //     parseInt(hoursbreakin) >= 12 ? "00" : hoursbreakin;

          //   let minutesbreakin = responseAttendanceDateTime.slice(
          //     13,
          //     responseAttendanceDateTime.length - 3
          //   );
          //   let attendanceTime = newBreakTime.toString().concat(minutesbreakin);
          //   this.finalAttendanceDateTime = attendanceDate.concat(
          //     "T",
          //     attendanceTime
          //   );
          // }

          // login
          if (responseLogin.includes("PM")) {
            let hoursbreakin = responseLogin.slice(0, responseLogin.length - 6);
            let newBreakTime =
              parseInt(hoursbreakin) < 12
                ? parseInt(hoursbreakin) + 12
                : parseInt(hoursbreakin);

            let minutesbreakin = responseLogin.slice(
              2,
              responseLogin.length - 3
            );
            this.finalLogIn = newBreakTime.toString().concat(minutesbreakin);
          } else if (responseLogin.includes("AM")) {
            let hoursbreakin = responseLogin.slice(0, responseLogin.length - 6);
            let newBreakTime =
              parseInt(hoursbreakin) >= 12 ? "00" : hoursbreakin;

            let minutesbreakin = responseLogin.slice(
              2,
              responseLogin.length - 3
            );
            this.finalLogIn = newBreakTime.toString().concat(minutesbreakin);
          }

          // break In
          if (responseBreakin.includes("PM")) {
            let hoursbreakin = responseBreakin.slice(
              0,
              responseBreakin.length - 6
            );
            let newBreakTime =
              parseInt(hoursbreakin) < 12
                ? parseInt(hoursbreakin) + 12
                : parseInt(hoursbreakin);

            let minutesbreakin = responseBreakin.slice(
              2,
              responseBreakin.length - 3
            );
            this.finalBreakIn = newBreakTime.toString().concat(minutesbreakin);
          } else if (responseBreakin.includes("AM")) {
            let hoursbreakin = responseBreakin.slice(
              0,
              responseBreakin.length - 6
            );
            let newBreakTime =
              parseInt(hoursbreakin) >= 12 ? "00" : hoursbreakin;

            let minutesbreakin = responseBreakin.slice(
              2,
              responseBreakin.length - 3
            );
            this.finalBreakIn = newBreakTime.toString().concat(minutesbreakin);
          }

          // break Out
          if (responseBreakout.includes("PM")) {
            let hoursbreakin = responseBreakout.slice(
              0,
              responseBreakout.length - 6
            );
            let newBreakTime =
              parseInt(hoursbreakin) < 12
                ? parseInt(hoursbreakin) + 12
                : parseInt(hoursbreakin);

            let minutesbreakin = responseBreakout.slice(
              2,
              responseBreakout.length - 3
            );
            this.finalBreakOut = newBreakTime.toString().concat(minutesbreakin);
          } else if (responseBreakout.includes("AM")) {
            let hoursbreakin = responseBreakout.slice(
              0,
              responseBreakout.length - 6
            );
            let newBreakTime =
              parseInt(hoursbreakin) >= 12 ? "00" : hoursbreakin;

            let minutesbreakin = responseBreakout.slice(
              2,
              responseBreakout.length - 3
            );
            this.finalBreakOut = newBreakTime.toString().concat(minutesbreakin);
          }

          // Log Out
          if (responseLogout.includes("PM")) {
            let hoursbreakin = responseLogout.slice(
              0,
              responseLogout.length - 6
            );
            let newBreakTime =
              parseInt(hoursbreakin) < 12
                ? parseInt(hoursbreakin) + 12
                : parseInt(hoursbreakin);

            let minutesbreakin = responseLogout.slice(
              2,
              responseLogout.length - 3
            );
            this.finalLogOut = newBreakTime.toString().concat(minutesbreakin);
          } else if (responseLogout.includes("AM")) {
            let hoursbreakin = responseLogout.slice(
              0,
              responseLogout.length - 6
            );
            let newBreakTime =
              parseInt(hoursbreakin) >= 12 ? "00" : hoursbreakin;

            let minutesbreakin = responseLogout.slice(
              2,
              responseLogout.length - 3
            );
            this.finalLogOut = newBreakTime.toString().concat(minutesbreakin);
          }
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    submitEditAttendance() {
      axios
        .put("attendance-records/" + this.attendance_ID + "/", {
          attendance_datetime: this.finalAttendanceDateTime,
          employee: this.form_data.employee,
          login_time: this.finalLogIn == "" ? null : this.finalLogIn,
          breakin_time: this.finalBreakIn == "" ? null : this.finalBreakIn,
          breakout_time: this.finalBreakOut == "" ? null : this.finalBreakOut,
          logout_time: this.finalLogOut == "" ? null : this.finalLogOut,
          remarks: this.form_data.remarks,
          cost: this.form_data.cost ? this.form_data.cost : null,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text:
              this.$store.getters.GET_UPDATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              "...",
          }).then((response) => {
            this.CloseUpdateModal();
            console.log(response);
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
.modal-dialog {
  max-width: 500px;
}
</style>
