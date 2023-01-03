<template>
  <!-- table  start  -->
  <div class="box">
    <div class="boxContent">
      <div class="box-header with-border ui-sortable-handle" style="cursor: move;">
        <h3 class="box-title mb-2 mt-2">
          {{ $store.getters.GET_EMPLOYEES+' '+$store.getters.GET_ATTENDANCE+' '+ $store.getters.GET_TIME_FOR_TODAY}}
        </h3>
        <div class="attendance-indecator">
          <!-- <span class="att-indecator">
          <span class="color-box gray"></span>
          Weekly Holiday
          </span>-->
          <!-- <span class="att-indecator">
          <span class="color-box red"></span>Other Holiday
        </span>
        <span class="att-indecator">
          <span class="color-box yellow"></span>Absence Employees
          </span>-->
        </div>
        <!-- <small>
        **To add/update remarks and cost please
        <strong>double click</strong> on the following column box.
        </small>-->
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <div class="table-responsive">
 <table id="empTables" class="emp-att-table table table-bordered table-hover report-table">
          <thead>
            <tr class="bg-green-light">
              <th scope="col">{{ $store.getters.GET_SL }}</th>
              <th scope="col">{{ $store.getters.GET_EMPLOYEE }}</th>
              <th scope="col">{{ $store.getters.GET_EMAIL }}</th>
              <th scope="col">{{ $store.getters.GET_DEPARTMENT }}</th>
              <th scope="col">{{ $store.getters.GET_LOGIN }}</th>
              <th scope="col">{{ $store.getters.GET_BREAKIN }}</th>
              <th scope="col">{{ $store.getters.GET_BREAKOUT }}</th>
              <th scope="col">{{ $store.getters.GET_LOGOUT }}</th>
              <th scope="col">{{ $store.getters.GET_BREAK_TIME }}</th>
              <th scope="col">{{ $store.getters.GET_WORKING_HOUR }}</th>
              <th scope="col">{{ $store.getters.GET_REMARKS }}</th>
              <th scope="col">{{ $store.getters.GET_COST }}</th>
            </tr>
          </thead>
          <tbody v-if="AttdanceList && AttdanceList.length > 0">
            <template v-for="(Attdance, index) in AttdanceList" :key="index">
              <tr  :class="[ Attdance.private_holiday && Attdance.private_holiday.length >0 ? 'holiday' : null]">
              <td>{{ index + 1 }}</td>
              <td>
                <span v-if="Attdance && Attdance.first_name && Attdance.last_name">{{ Attdance.first_name+' '+Attdance.last_name }}</span>
              </td>
              <td>
                <span v-if="Attdance && Attdance.username">{{ Attdance.username }}</span>
              </td>
              <td >
                <span v-if="Attdance && Attdance.user_profile &&  Attdance.user_profile.department">
                   {{
                Attdance.user_profile.department
                .department_name
                }}
                </span>
              </td>
               <template v-if="Attdance.private_holiday">
                <td colspan="8" class="text-center">
                  <span  v-for="(leave ,index) in Attdance.private_holiday" :key="index">
                    <span v-if="leave && leave.leave_type && leave.leave_type.leave_type">
                      <strong>{{ leave.leave_type.leave_type }}</strong>
                    </span>
                  </span>
              </td>
              </template>
              <template v-else>
                <td> 
                <span v-if="Attdance && Attdance.attendance &&  Attdance.attendance.login_time">{{ Attdance.attendance.login_time }} </span></td>
              <td> <span v-if="Attdance && Attdance.attendance &&  Attdance.attendance.breakin_time"> {{ Attdance.attendance.breakin_time }} </span></td>
              <td>
                <span v-if="Attdance && Attdance.attendance &&  Attdance.attendance.breakout_time">{{ Attdance.attendance.breakout_time }}</span>
              </td>
              <td>
                <span v-if="Attdance && Attdance.attendance &&  Attdance.attendance.logout_time">{{ Attdance.attendance.logout_time }}</span>
              </td>
              <td >
                <template v-if="Attdance && Attdance.attendance && Attdance.attendance.total_breaktime">
                  <span v-if="Attdance.attendance.total_breaktime == 'time is empty'">-:-</span>
                <span v-else-if="Attdance.attendance.total_breaktime == 'time format not correct'">-:-</span>
                <span v-else>{{ Attdance.attendance.total_breaktime }}</span>
                </template>
              </td>
              <td >
               <template v-if="Attdance && Attdance.attendance && Attdance.attendance.total_working">
                  <span v-if="Attdance.attendance.total_working == 'time is empty'">-:-</span>
                <span v-else-if="Attdance.attendance.total_working == 'time format not correct'">-:-</span>
                <span v-else>{{ Attdance.attendance.total_working }}</span>
               </template>
              </td>
              <td>
                <span v-if="Attdance && Attdance.attendance &&  Attdance.attendance.remarks">{{ Attdance.attendance.remarks }}</span>
              </td>
              <td>
                <span v-if="Attdance && Attdance.attendance &&  Attdance.attendance.cost">{{ Attdance.attendance.cost }}</span>
              </td>
              </template>
             
            </tr>
            
             </template>
            
          </tbody>
          <tbody v-else>
            <tr style="height: 100px;">
                        <td colspan="12" class="text-center align-middle">
                          <h4>{{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}</h4>
                        </td>
                      </tr>
          </tbody>
        </table>
        </div>
       
      </div>
      <!-- /.box-body -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AttendanceEntry",
  data() {
    return {
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
      all_years: null,
      activeMonth: null,

      attendance_months: [
        { name: "January", numeric: 1 },
        { name: "February", numeric: 2 },
        { name: "March", numeric: 3 },
        { name: "April", numeric: 4 },
        { name: "May", numeric: 5 },
        { name: "June", numeric: 6 },
        { name: "July", numeric: 7 },
        { name: "August", numeric: 8 },
        { name: "September", numeric: 9 },
        { name: "October", numeric: 10 },
        { name: "November", numeric: 11 },
        { name: "December", numeric: 12 },
      ],
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },

      organised_data: {},
      error_data:null,
    };
  },

  created() {
    this.initialLoad();
    console.log("created");
  },
  updated() {
    console.log("updated");
  },

  methods: {
    initialLoad: function () {
      this.getAttendanceList();
    },
    getAttendanceList: function () {
      axios.get("todays-employee-attendance-record/").then((response) => {
        this.AttdanceList = response.data;
      }).catch(function (error) {
          // this.error_data = error.response.data
          console.log(error)
        });
    },
  },
  // end of Methods
};
</script>
<style scoped>
.card {
  border: 1px solid #eaeaea;
  background-color: #fff;
}
.box {
  position: relative;
  border-radius: 0px;
  background: #ffffff;
  /* border-top: 3px solid #d2d6de; */
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
  margin-top: 20px;
  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  border-left: 2px solid #69c5a5;
}
.box-header.with-border {
  border-bottom: 1px solid #f4f4f4;
}
.box-header {
  color: #444;
  display: block;
  padding: 10px;
  position: relative;
}
.box-header::before,
.box-body::before,
.box-footer::before,
.box-header::after,
.box-body::after,
.box-footer::after {
  content: " ";
  display: table;
}
::after,
::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.box-header > .fa,
.box-header > .glyphicon,
.box-header > .ion,
.box-header .box-title {
  display: inline-block;
  font-size: 18px;
  margin: 0;
  line-height: 1;
}
.attendance-indecator {
  margin-top: 10px;
}
span.att-indecator {
  margin-right: 15px;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
}
span.att-indecator span {
  width: 15px;
  height: 15px;
  display: inline-block;
  background: #b0b2b3;
  margin-right: 5px;
}
span.att-indecator {
  margin-right: 15px;
  display: inline-block;
}
span.att-indecator span.color-box.red {
  background: #eea59c;
}
span.att-indecator span {
  width: 15px;
  height: 15px;
  display: inline-block;
  background: #b0b2b3;
  margin-right: 5px;
}
span.att-indecator span {
  width: 15px;
  height: 15px;
  display: inline-block;
  background: #b0b2b3;
  margin-right: 5px;
}
.box-header::after,
.box-body::after,
.box-footer::after {
  clear: both;
}
.box-header::before,
.box-body::before,
.box-footer::before,
.box-header::after,
.box-body::after,
.box-footer::after {
  content: " ";
  display: table;
}

.box-body {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 10px;
}
.box-header::before,
.box-body::before,
.box-footer::before,
.box-header::after,
.box-body::after,
.box-footer::after {
  content: " ";
  display: table;
}
.box-body > .table {
  margin-bottom: 0;
}
table.report-table {
  font-size: 13px;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
tr.bg-green-light {
  background: #cdf1d8;
}
.table > thead > tr > th {
  vertical-align: middle !important;
  padding: 0.45rem;
  vertical-align: top;
  border-top: 1px solid #e9ecef;
  /* background: #69c5a5;
  color: white; */
}
.boxContent {
  margin: 10px 5px;
}
.holiday {
  background: #d3d3d3;
}
</style>
