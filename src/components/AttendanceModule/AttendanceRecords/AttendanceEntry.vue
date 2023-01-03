<template>
  <!-- table  start  -->
  <div class="box">
    <div class="boxContent">
      <div class="box-header with-border ui-sortable-handle" style="cursor: move;">
        <h3 class="box-title mt-2">
          {{ $store.getters.GET_ATTENDANCE+' '+$store.getters.GET_TIME_FOR_THIS_MONTH}}
        </h3>
        <div class="attendance-indecator">
          <span class="att-indecator">
            <span class="color-box gray"></span>
           {{ $store.getters.GET_WEEKLY_HOLIDAY }}
          </span>
          <!-- <span class="att-indecator">
          <span class="color-box red"></span>Other Holiday
          </span>-->
        </div>
        <!-- <small>
        **To add/update remarks and cost please
        <strong>double click</strong> on the following column box.
        </small>-->
      </div>
      <!-- /.box-header -->
      <div class="box-body">
        <div class="table-responsive p-0">
          <table
            id="empTables"
            class="table table-bordered table-hover report-table table-head-fixed"
          >
            <thead>
              <tr>
                <th scope="col">{{ $store.getters.GET_SL }}</th>
                <th scope="col">{{ $store.getters.GET_DATE }}</th>
                <th scope="col">{{ $store.getters.GET_DAY }}</th>
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
            <tbody v-if="newAttdanceList && newAttdanceList.length >0">
              <template v-for="(Attdance, index) in newAttdanceList" :key="index">
                <tr :class="{'holiday':checkHoliday(Attdance.day)}">
                  <td>{{ index + 1 }}</td>
                  <td>{{ Attdance.date }}</td>
                  <td>{{ Attdance.day }}</td>
                  <td>{{ Attdance.login_time }}</td>
                  <td>{{ Attdance.breakin_time }}</td>
                  <td>{{ Attdance.breakout_time }}</td>
                  <td>{{ Attdance.logout_time }}</td>
                  <td >
                    <span v-if="Attdance.total_breaktime == 'time is empty'"> -:-</span>
                    <span v-else-if="Attdance.total_breaktime == 'time format not correct'"> -:-</span>
                    <span  v-else>{{ Attdance.total_breaktime }}</span>
                  </td>
                  <td >
                    <span v-if="Attdance.total_working == 'time is empty'"> -:-</span>
                    <span v-else-if="Attdance.total_working == 'time format not correct'"> -:-</span>
                    <span  v-else>{{ Attdance.total_working }}</span>
                  </td>
                  <td>{{ Attdance.remarks }}</td>
                  <td>{{ Attdance.cost }}</td>
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
            <tfoot style="background: #00c0ef26;">
              <tr>
                <th colspan="2"></th>
                <th></th>
                <th></th>
                <th></th><th></th><th></th>
                <th>{{ $store.getters.GET_TOTAL+' '+$store.getters.GET_HOURS }}</th>
                <th >
                   <span v-if="sumOFHours">= {{sumOFHours.toFixed(2)}} {{ $store.getters.GET_H}}</span>
                   <span v-else>= 0.00 {{ $store.getters.GET_H}}</span>
                </th>
                <th>{{ $store.getters.GET_TOTAL+' '+$store.getters.GET_COSTS }}</th>
                <th >
                  <span v-if="sumOfCost"> = {{sumOfCost}}</span>
                  <span v-else>= 0.00</span>
                </th>
              </tr>
              <!-- <tr>
              <th colspan="6">Total Hours</th>
              <th>= 92 : 39 H</th>
              <th></th>
              <th>
                Total =
                <span id="totalCost">0</span>
              </th>
              </tr>-->
            </tfoot>
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
      sumOfCost: null,
      TotalWorkHours: null,
      sumOFHours: null,
      weeklyHoliday: null,
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
      error_data:null,

      organised_data: {},
    };
  },

  created() {
    this.initialLoad();
    this.getWeeklyholiday();
  },
  updated() {},

  methods: {
    getWeeklyholiday() {
      this.weeklyHoliday = localStorage.getItem("branch_weekly_holiday");
    },
    checkHoliday(AtendanceDay) {
      if(this.weeklyHoliday.includes(AtendanceDay)){
        return this.weeklyHoliday.includes(AtendanceDay);
      }
      
    },

    initialLoad: function () {
      this.getAttendanceList();
    },
    getAttendanceList: function () {
      axios.get("attendance-entry/").then((response) => {
        this.AttdanceList = response.data;
        response.data.forEach((element) => {
          if (
            element.total_working != "time is empty" &&
            element.total_working != null
          ) {
            let hoursWorking = parseFloat(
              parseFloat(element.total_working.replace(":", ".")).toFixed(2)
            );
            this.sumOFHours = this.sumOFHours + hoursWorking;
          }
          if (element.cost != null) {
            this.sumOfCost = this.sumOfCost + element.cost;
          }
        });
        this.AttdanceList.map((x) => {
          this.organised_data[x.date] = x;
        });
        this.generateAttendanceList();
      }).catch(function (error) {
          console.log(error)
        });
    },

    daysList(month, year) {
      this.newAttdanceList = [];
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

      return datelist;
    },
    generateAttendanceList() {
      let Today = new Date();
      let mm = Today.getMonth() + 1;
      let yyyy = Today.getFullYear();
      this.daysList(mm, yyyy);
    },
  },
  // end of Methods
};
</script>
<style scoped>
.holiday {
  background: #d3d3d3;
}
.card {
  border: 1px solid #eaeaea;
  background-color: #fff;
  margin-bottom: 20px;
}
/* for new table design */
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

.box-header:before,
.box-body:before,
.box-footer:before,
.box-header:after,
.box-body:after,
.box-footer:after {
  content: " ";
  display: table;
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
.box-header:after,
.box-body:after,
.box-footer:after {
  clear: both;
}
.box-header:before,
.box-body:before,
.box-footer:before,
.box-header:after,
.box-body:after,
.box-footer:after {
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
.box-header:before,
.box-body:before,
.box-footer:before,
.box-header:after,
.box-body:after,
.box-footer:after {
  content: " ";
  display: table;
}
.table-responsive {
  min-height: 0.01%;
  overflow-x: auto;
}
table.report-table {
  font-size: 13px;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
.box-header:after,
.box-body:after,
.box-footer:after {
  clear: both;
}

.box-header:before,
.box-body:before,
.box-footer:before,
.box-header:after,
.box-body:after,
.box-footer:after {
  content: " ";
  display: table;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  background-color: transparent;
}

.table.table-head-fixed thead tr:nth-child(1) th {
  background-color: #fff;
  border-bottom: 0;
  box-shadow: inset 0 1px 0 #dee2e6, inset 0 -1px 0 #dee2e6;
  position: -webkit-sticky;
  position: sticky;
  top: -1px;
  z-index: 10;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  background: #f7f7f7;
  /* color: #fff; */
  padding: 0.45rem;
}

.table > caption + thead > tr:first-child > td,
.table > caption + thead > tr:first-child > th,
.table > colgroup + thead > tr:first-child > td,
.table > colgroup + thead > tr:first-child > th,
.table > thead:first-child > tr:first-child > td,
.table > thead:first-child > tr:first-child > th {
  border-top: 0;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  vertical-align: middle !important;
}
.table > thead > tr > th {
  border-bottom: 2px solid #f4f4f4;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  border-top: 1px solid #f4f4f4;
}
.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
.boxContent {
  margin: 10px 5px;
}
</style>