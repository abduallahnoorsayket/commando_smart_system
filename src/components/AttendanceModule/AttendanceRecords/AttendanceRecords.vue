<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="recordsModal">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{
                  $store.getters.GET_ALL +
                  " " +
                  $store.getters.GET_ATTENDANCE +
                  " " +
                  $store.getters.GET_RECORDS
                }}
              </div>
            </div>
          </div>
        </div>
        <div id="accordion" class="acordinContainer">
          <div class="searchFormCard">
            <div
              class="row cursorPointer"
              data-toggle="collapse"
              data-target="#collapseOne1"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div class="col-md-10">
                <div class="float-left headerContaier">
                  <div class="div">
                    <h5>
                      <i class="fa fa-search"></i>
                      &nbsp; {{ $store.getters.GET_SEARCH }}
                      <!-- <span class="text-muted" style="font-size:12px;">(Click for open)</span> -->
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="float-right"></div>
              </div>
              <div class="col-md-1"></div>
            </div>

            <div
              data-parent="#accordion"
              id="collapseOne1"
              aria-labelledby="headingOne"
              class="collapse show"
            >
              <hr />
              <div class="card-body">
                <form action @submit.prevent="searchUser">
                  <div class="form-row">
                    <div class="col-md-3">
                      <label>
                        {{ $store.getters.GET_DEPARTMENT }}
                        <span class="asterisk">*</span>
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="department"
                          v-model="department"
                          @change="getEmployee()"
                          class="form-control"
                          required
                        >
                          <option value disabled>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_DEPARTMENT
                            }}
                          </option>
                          <option
                            v-for="dprtmnt in all_departments"
                            :key="dprtmnt.id"
                            :value="dprtmnt.id"
                          >
                            {{ dprtmnt.department_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <label>
                        {{ $store.getters.GET_EMPLOYEE }}
                        <span class="asterisk">*</span>
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="emp"
                          v-model="employee"
                          class="form-control"
                          required
                        >
                          <option value disabled>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_EMPLOYEE
                            }}
                          </option>
                          <option
                            v-for="employee in all_employees"
                            :key="employee.id"
                            :value="employee.id"
                            selected
                          >
                            {{ employee.first_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <label>
                        {{ $store.getters.GET_YEAR }}
                        <span class="asterisk">*</span>
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="year"
                          v-model="AttendanceYear"
                          class="form-control"
                          required
                        >
                          <option value disabled>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_YEAR
                            }}
                          </option>
                          <option
                            v-for="year in all_years"
                            :key="year.index"
                            :value="year.attendance_datetime__year"
                            selected
                          >
                            {{ year.attendance_datetime__year }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-3">
                      <label>
                        {{ $store.getters.GET_MONTH }}
                      </label>
                      <div class="form-group">
                        <div class="input-group">
                          <select
                            name="select"
                            id="month"
                            v-model="AttendanceMonth"
                            class="form-control"
                          >
                            <option value>
                              {{
                                $store.getters.GET_SELECT +
                                " " +
                                $store.getters.GET_MONTH
                              }}
                            </option>
                            <option
                              v-for="item in attendance_months"
                              :key="item.id"
                              :value="item.numeric"
                            >
                              {{ item.name }}
                            </option>
                          </select>

                          <div class="input-group-append">
                            <button
                              @click="resetMonth()"
                              type="button"
                              class="btn btn-base btn-sm"
                            >
                              <i class="fa fa-refresh" aria-hidden="true"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-12">
                      <label></label>
                      <br />
                      <div class="form-group">
                        <button type="submit" class="btn btn-base float-right">
                          {{ $store.getters.GET_SEARCH }}
                          <i class="fa fa-search"></i>&nbsp;
                        </button>
                        <!-- <button @click="resetOption()" class="btn btn-secondary float-right mr-2 resetButtuon">Reset </button> -->
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="newAttdanceList">
          <div class="col-12">
            <div class="main-card card">
              <div class="text-left ml-4">
                <h5>
                  {{
                    $store.getters.GET_ATTENDANCE +
                    " " +
                    $store.getters.GET_RECORDS
                  }}
                </h5>
                <!-- emplyoee name & department -->
                <!-- <p>
                  <Strong>Employee name:</Strong>
                  <template v-for="emp in all_employees" :key="emp.id">
                    <span v-if="emp.id == employee">
                      {{ emp.first_name }}
                    </span>
                  </template>
                </p>
                <p>
                  <Strong>Department:</Strong>
                  <template v-for="dprtmnt in all_departments" :key="dprtmnt.id">
                    <span v-if="dprtmnt.id == department">{{ dprtmnt.department_name }}</span>
                  </template>
                </p>-->

                <div class="attendance-indecator">
                  <span class="att-indecator">
                    <span class="color-box gray"></span>
                    {{ $store.getters.GET_WEEKLY_HOLIDAY }}
                  </span>
                  <!-- <span class="att-indecator">
          <span class="color-box red"></span>Other Holiday
                  </span>-->
                </div>
              </div>
              <div id="navbar-example">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs mt-3">
                  <li
                    class="nav-item"
                    v-for="(item, index) in attendance_months"
                    :key="index"
                  >
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      :class="[
                        activeMonth == item.numeric ? 'active' : nulll,
                        AttendanceMonth && activeMonth != item.numeric
                          ? 'disabled'
                          : null,
                      ]"
                      role="tab"
                      @click="
                        generateAttendanceList(item.numeric, AttendanceYear)
                      "
                      :href="'#' + item.name"
                      >{{ item.name }}</a
                    >
                  </li>
                </ul>
                <!-- Tab panes {Fade}  -->
                <AddAttendanceModal
                  @load-attendance="AttendanceLoad"
                  v-if="AddModalVisible"
                  :attendance_date="AttendanceNewDate"
                />
                <UpdateAttendanceModal
                  v-if="UpdateModalVisible"
                  @load-attendance="AttendanceLoad"
                />
                <div>
                  <div class="tab-content">
                    <div class>
                      <div class="card-body">
                        <div class="table-responsive">
                          <table class="table">
                            <thead>
                              <tr>
                                <th scope="col">{{ $store.getters.GET_SL }}</th>
                                <th scope="col">
                                  {{ $store.getters.GET_DATE }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_DAY }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_LOGIN }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_BREAKIN }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_BREAKOUT }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_LOGOUT }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_BREAK_TIME }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_WORKING_HOUR }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_REMARKS }}
                                </th>
                                <th scope="col">
                                  {{ $store.getters.GET_COST }}
                                </th>
                                <th
                                  scope="col"
                                  width="90px"
                                  v-if="hasPermission('add_attendancerecord')"
                                >
                                  {{ $store.getters.GET_ACTION }}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <template
                                v-for="(Attdance, index) in newAttdanceList"
                                :key="index"
                              >
                                <tr
                                  :class="{
                                    holiday: checkHoliday(Attdance.day),
                                  }"
                                >
                                  <td>{{ index + 1 }}</td>
                                  <td>{{ Attdance.date }}</td>
                                  <td>{{ Attdance.day }}</td>
                                  <td>{{ Attdance.login_time }}</td>
                                  <td>{{ Attdance.breakin_time }}</td>
                                  <td>{{ Attdance.breakout_time }}</td>
                                  <td>{{ Attdance.logout_time }}</td>
                                  <td>
                                    <span
                                      v-if="
                                        Attdance.total_breaktime ==
                                        'time is empty'
                                      "
                                    >
                                      -:-</span
                                    >
                                    <span
                                      v-else-if="
                                        Attdance.total_breaktime ==
                                        'time format not correct'
                                      "
                                    >
                                      -:-</span
                                    >
                                    <span v-else>{{
                                      Attdance.total_breaktime
                                    }}</span>
                                  </td>
                                  <td>
                                    <span
                                      v-if="
                                        Attdance.total_working ==
                                        'time is empty'
                                      "
                                    >
                                      -:-</span
                                    >
                                    <span
                                      v-else-if="
                                        Attdance.total_working ==
                                        'time format not correct'
                                      "
                                    >
                                      -:-</span
                                    >
                                    <span v-else>{{
                                      Attdance.total_working
                                    }}</span>
                                  </td>
                                  <td>{{ Attdance.remarks }}</td>
                                  <td>{{ Attdance.cost }}</td>

                                  <td
                                    class="td_action"
                                    v-if="
                                      Attdance.login_time ||
                                      Attdance.logout_time ||
                                      Attdance.total_working ||
                                      Attdance.total_breaktime ||
                                      Attdance.remarks ||
                                      Attdance.cost
                                    "
                                  >
                                    <span
                                      v-if="
                                        hasPermission('change_attendancerecord')
                                      "
                                    >
                                      <i
                                        class="fas fa-edit"
                                        style="
                                          color: 3f6ad8;
                                          padding: 8px 0px 8px 8px;
                                        "
                                        @click="OpenUpdateModal(Attdance.id)"
                                      ></i>
                                    </span>
                                    <span
                                      v-if="
                                        hasPermission('delete_attendancerecord')
                                      "
                                    >
                                      <!-- <i
                                        class="fas fa-trash-alt"
                                        style="color: 3f6ad8"
                                        @click="DeleteAttendance(Attdance.id)"
                                      ></i> -->
                                      <AttendanceDelete
                                        v-if="Attdance.id"
                                        @load-attendance="
                                          AttendanceLoadAfterDelete
                                        "
                                        :attendance_id="Attdance.id"
                                      />
                                    </span>
                                  </td>

                                  <td
                                    class="td_action"
                                    v-else-if="
                                      hasPermission('add_attendancerecord')
                                    "
                                  >
                                    <i
                                      class="fas fa-plus-square"
                                      style="color: #3ac47d; padding: 8px"
                                      @click="OpenModal(Attdance.date)"
                                    ></i>
                                  </td>
                                </tr>
                              </template>
                            </tbody>
                            <tfoot style="background: #00c0ef26">
                              <tr>
                                <th colspan="0"></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>
                                  {{
                                    $store.getters.GET_TOTAL +
                                    " " +
                                    $store.getters.GET_HOURS
                                  }}
                                </th>
                                <th>
                                  <span v-if="sumOFHours">
                                    = {{ sumOFHours.toFixed(2) }}
                                    {{ $store.getters.GET_H }}</span
                                  >
                                  <span v-else
                                    >= 0.00 {{ $store.getters.GET_H }}</span
                                  >
                                </th>
                                <th>
                                  {{
                                    $store.getters.GET_TOTAL +
                                    " " +
                                    $store.getters.GET_COSTS
                                  }}
                                </th>
                                <th>
                                  <span v-if="sumOfCost">
                                    = {{ sumOfCost }}</span
                                  >
                                  <span v-else>= 0.00</span>
                                </th>
                                <th></th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- table  -->
            </div>
          </div>
        </div>
        <div class="row mt-2" v-else>
          <div class="col-12 mt-2">
            <div class="alert alert-success">
              {{ $store.getters.GET_TO_SEE }}
              <strong>{{
                $store.getters.GET_ATTENDANCE + " " + $store.getters.GET_RECORDS
              }}</strong>
              {{ $store.getters.GET_PLEASE_PERFORM_A_SEARCH }}!
            </div>
            <!-- <div class="main-card card">
              <div class="text-left ml-4 mb-2">
                <h5>Attendance Records</h5>
                <br />
                
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
// import Swal from "sweetalert2";
import axios from "axios";
import permissions from "../../../authorization/permissions";
import AddAttendanceModal from "./AddAttendanceModal";
import AttendanceDelete from "./AttendanceDelete";
import UpdateAttendanceModal from "./UpdateAttendanceModal";

export default {
  name: "AttendanceRecords",

  components: {
    Master,
    AddAttendanceModal,
    UpdateAttendanceModal,
    AttendanceDelete,
  },
  data() {
    return {
      sumOfCost: null,
      sumOFHours: null,
      weeklyHoliday: null,
      update_attendance_id: null,
      isModalVisible: false,
      isUpdateVisible: false,
      department: null,
      employee: null,
      all_departments: null,
      all_employees: null,
      all_branchs: null,
      all_groups: null,
      users: null,
      AttdanceList: [],
      newAttdanceList: [],
      AttendanceYear: null,
      AttendanceMonth: null,
      AttendanceNewDate: null,
      all_years: null,
      activeMonth: null,
      attendance_months: [
        { name: this.$store.getters.GET_JANUARY, numeric: 1 },
        { name: this.$store.getters.GET_FEBRUARY, numeric: 2 },
        { name: this.$store.getters.GET_MARCH, numeric: 3 },
        { name: this.$store.getters.GET_APRIL, numeric: 4 },
        { name: this.$store.getters.GET_MAY, numeric: 5 },
        { name: this.$store.getters.GET_JUNE, numeric: 6 },
        { name: this.$store.getters.GET_JULY, numeric: 7 },
        { name: this.$store.getters.GET_AUGUST, numeric: 8 },
        { name: this.$store.getters.GET_SEPTEMBER, numeric: 9 },
        { name: this.$store.getters.GET_OCTOBER, numeric: 10 },
        { name: this.$store.getters.GET_NOVEMBER, numeric: 11 },
        { name: this.$store.getters.GET_DECEMBER, numeric: 12 },
      ],
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },

      organised_data: {},
      // sle
    };
  },

  created() {
    // if( localStorage.getItem("token") == null ){
    //   this.$router.push("/");
    // }
    this.initialLoad();
    this.getWeeklyholiday();
    this.newAttdanceList = null;
    console.log("created");
  },
  updated() {
    this.initialLoad();
    this.newAttdanceList = null;
    this.organised_data = {};
    console.log("updated");
  },
  computed: {
    AddModalVisible() {
      return this.$store.state.attendance.isModalVisible;
    },
    UpdateModalVisible() {
      return this.$store.state.attendance.isUpdateModalVisible;
    },
  },

  methods: {
    async AttendanceLoad() {
      // this.project_response_ID = null;
      await this.searchUser();
    },
    resetDepartment() {
      this.department = null;
    },
    resetEmployee() {
      this.employee = null;
    },
    resetYear() {
      this.AttendanceYear = null;
    },
    resetMonth() {
      this.AttendanceMonth = null;
      this.searchUser();
    },
    OpenModal(AttendanceDate) {
      this.AttendanceNewDate = AttendanceDate;
      this.$store.commit("attendance/toggleModal", this.employee);
      // console.log("450",this.AttendanceNewDate);
    },

    OpenUpdateModal(id) {
      this.$store.commit("attendance/toggleUpdateModal", id);
    },

    CloseUpdateModal(isUpdateVisible) {
      this.isUpdateVisible = isUpdateVisible;
    },

    getWeeklyholiday() {
      this.weeklyHoliday = localStorage.getItem("branch_weekly_holiday");
    },
    checkHoliday(AtendanceDay) {
      return this.weeklyHoliday.includes(AtendanceDay);
    },
    initialLoad: function () {
      this.loadDepartment();
      this.loadYear();
    },
    getAttendanceList: function () {
      const employeeID = localStorage.getItem("id");
      var queryParam = {
        department: this.$route.query.department,
        employee: this.$route.query.employee
          ? this.$route.query.employee
          : employeeID,
        year: this.$route.query.year,
        month: this.$route.query.month,
        page: this.$route.query.page,
      };
      axios
        .get("attendance-records/", {
          params: queryParam,
        })
        .then((response) => {
          this.AttdanceList = response.data.results;
          this.AttdanceList.map((x) => {
            this.organised_data[x.date] = x;
          });
          if (this.AttendanceMonth) {
            this.generateAttendanceList(
              this.AttendanceMonth,
              this.AttendanceYear
            );
            this.activeMonth = this.AttendanceMonth;
          } else {
            this.generateAttendanceList(
              this.attendance_months[0].numeric,
              this.AttendanceYear
            );
            this.activeMonth = this.attendance_months[0].numeric;
          }
        });
    },

    loadYear() {
      axios
        .get("years/", {})
        .then((response) => {
          this.all_years = response.data.data.years;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadDepartment: function () {
      axios.get("department-short-list/", {}).then(
        function (response) {
          this.all_departments = response.data;
        }.bind(this)
      );
    },
    getEmployee: function () {
      axios
        .get("users-short-list/", {
          params: {
            department: this.department,
          },
        })
        .then(
          function (response) {
            this.all_employees = response.data;
          }.bind(this)
        );
    },
    async AttendanceLoadAfterDelete() {
      // this.newAttdanceList = [];
      this.newAttdanceList = null;
      this.organised_data = {};
      await this.searchUser();
    },

    // DeleteAttendance: function (id) {
    //   Swal.fire({
    //     title: this.$store.getters.GET_ARE_YOU_SURE,
    //     text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
    //   }).then((response) => {
    //     if (response.isConfirmed) {
    //       axios.delete("attendance-records/" + id + "/").then((response) => {
    //         if (response.status === 204) {
    //           // this.searchUser();
    //           this.AttendanceLoadAfterDelete();
    //         }
    //         Swal.fire(
    //           this.$store.getters.GET_DELETED,
    //           this.$store.getters.GET_DELETED +
    //             " " +
    //             this.$store.getters.GET_SUCCESSFULLY +
    //             " ...",
    //           "success"
    //         );
    //       });
    //     } else {
    //       Swal.fire(
    //         this.$store.getters.GET_CANCELLED,
    //         this.$store.getters.GET_NOT +
    //           " " +
    //           this.$store.getters.GET_DELETED +
    //           " ...",
    //         "error"
    //       );
    //     }
    //   });
    // },
    setPage(page) {
      this.pagination.page = page;
      this.searchUser();
    },
    daysList(month, year) {
      this.newAttdanceList = [];
      this.sumOFHours = null;
      this.sumOfCost = null;
      let days = new Date(year, month, 0).getDate();

      let datelist = [];
      for (let i = 1; i <= days; i++) {
        datelist.push(i);
        let resultdate = new Date(`${year}-${month}-${i}`);
        let dd = resultdate.getDate();
        let mm = resultdate.getMonth() + 1;
        let yyyy = resultdate.getFullYear();
        if (dd < 10) {
          dd = "0" + dd;
        }
        if (mm < 10) {
          mm = "0" + mm;
        }
        resultdate = yyyy + "-" + mm + "-" + dd;
        if (
          Object.prototype.hasOwnProperty.call(this.organised_data, resultdate)
        ) {
          this.newAttdanceList.push(this.organised_data[resultdate]);
        } else {
          this.newAttdanceList.push({
            id: null,
            attendance_datetime: null,
            date: resultdate,
            day: new Date(resultdate).toLocaleString("en-us", {
              weekday: "long",
            }),
            month: null,
            year: null,
            login_time: null,
            logout_time: null,
            total_working: null,
            breakin_time: null,
            breakout_time: null,
            total_breaktime: null,
            remarks: null,
            cost: null,
          });
        }
      }
      this.newAttdanceList.forEach((element) => {
        if (
          element.id != null &&
          element.total_working != "time is empty" &&
          element.total_working != null
        ) {
          let hoursWorking = parseFloat(
            parseFloat(element.total_working.replace(":", ".")).toFixed(2)
          );
          this.sumOFHours = this.sumOFHours + hoursWorking;
        }
        if (element.id != null && element.cost != null) {
          this.sumOfCost = this.sumOfCost + element.cost;
        }
      });
      return datelist;
    },
    generateAttendanceList(mths, yrs) {
      this.daysList(mths, yrs);
    },
    async searchUser() {
      await this.$router.push({
        path: "all-attendance-records",
        query: {
          department: this.department,
          employee: this.employee,
          year: this.AttendanceYear,
          month: this.AttendanceMonth,
          page: this.pagination.page,
        },
      });
      this.getAttendanceList();
    },

    // Permissions

    /*for Module(app)*/
    hasModulePermission(...module_name) {
      return permissions.hasModulePermission(...module_name);
      // return permissions.hasModulePermission.apply(...module_name)
    },

    /*for Model*/
    hasModelPermission(model_name) {
      return permissions.hasModelPermission(model_name);
    },

    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
    // is_ superuser
    is_superuser() {
      return permissions.is_superuser();
    },
  },
  // end of Methods
};
</script>
<style scoped>
/*table  design
            */
.holiday {
  background: #d3d3d3;
}

.resetButton {
  margin-top: 32px;
}

.card {
  margin-top: 18px;
  padding-top: 18px;
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  background-color: #fff;
  border-left: 2px solid #69c5a5;
}

.h5 {
  font-size: 1.25rem;
  /* font-weight: 700; */
  font-family: Karla, sans-serif;
  color: #495057;
}

hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
