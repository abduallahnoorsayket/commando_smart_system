<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_EVALUATION +' '+$store.getters.GET_GRAPH}}
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="SearchSingleMember">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        Department
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        name="select"
                        id="department"
                        v-model="department"
                        @change="getEmployee()"
                        class="form-control"
                        required
                      >
                        <option value selected>Select Department</option>
                        <option
                          v-for="dprtmnt in all_departments"
                          :key="dprtmnt.id"
                          :value="dprtmnt.id"
                        >{{ dprtmnt.department_name }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        Employee
                        <span class="asterisk">*</span>
                      </label>

                      <select
                        name="select"
                        id="Employee"
                        v-model="employee"
                        class="form-control"
                        required
                      >
                        <option value selected>Select Employee</option>
                        <option
                          v-for="employee in all_employees"
                          :key="employee.id"
                          :value="employee.id"
                          selected
                        >
                          {{ employee.first_name + ' ' + employee.last_name
                          + ' (' + employee.user_profile.employee_id + ')'}}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <label>Branch</label>
                    <div class="form-group">
                      <select name="select" id="branch" v-model="branch" class="form-control">
                        <option value selected>Select Branch</option>
                        <option
                          v-for="brnch in all_branchs"
                          :key="brnch.id"
                          :value="brnch.id"
                        >{{ brnch.branch_name }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>Year</label>
                      <select
                        name="select"
                        id="Year"
                        v-model="year_of_evaluation"
                        class="form-control"
                      >
                        <option value selected>Select Year</option>
                        <option
                          v-for="year in all_years"
                          :key="year.index"
                          :value="year.attendance_datetime__year"
                          selected
                        >{{ year.attendance_datetime__year }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>Month</label>

                      <select
                        name="select"
                        id="Month"
                        v-model="month_of_evaluation"
                        class="form-control"
                      >
                        <option value selected>Select Month</option>
                        <option
                          v-for="item in attendance_months"
                          :key="item.id"
                          :value="item.numeric"
                        >{{ item.name }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>Graph Type</label>
                      <select
                        name="select"
                        id="type"
                        v-model="graphType"
                        type="choice"
                        class="form-control"
                      >
                        <option value selected>Select Graph</option>
                        <option value="radar">Radar</option>
                        <option value="bar">Bar</option>
                        <option value="line">Line</option>
                        <option value="area">Area</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    @submit.prevent="SearchSingleMember"
                    class="mt-2 btn btn-base btn-lg float-right"
                  >
                    Search
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>-->

        <!-- accrodion  serch form-->
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
                      <i  class="fa fa-search"></i>
                      &nbsp;  {{ $store.getters.GET_SEARCH}}
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

            <div data-parent="#accordion" id="collapseOne1" class="collapse show">
              <hr />
              <div class="card-body">
                <form @submit.prevent="SearchSingleMember">
                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                            {{ $store.getters.GET_DEPARTMENT}}
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            id="department"
                            v-model="department"
                            @change="getEmployee()"
                            class="form-control"
                            required
                          >
                            <option value selected>
                              {{$store.getters.GET_SELECT+" "+$store.getters.GET_DEPARTMENT}}
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

                      <!--Employee-->
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                           {{ $store.getters.GET_EMPLOYEE}}
                            <!-- <span class="asterisk">*</span> -->
                          </label>

                          <select
                            name="select"
                            id="Employee"
                            v-model="employee"
                            class="form-control"
                          >
                            <option value selected>
                              {{$store.getters.GET_SELECT+" "+$store.getters.GET_EMPLOYEE}}
                            </option>
                            <option
                              v-for="employee in all_employees"
                              :key="employee.id"
                              :value="employee.id"
                              selected
                            >
                              {{
                                employee.first_name +
                                " " +
                                employee.last_name +
                                " (" +
                                employee.user_profile.employee_id +
                                ")"
                              }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <label>
                           {{ $store.getters.GET_BRANCH}}
                        </label>
                        <div class="form-group">
                          <select
                            name="select"
                            id="branch"
                            v-model="branch"
                            class="form-control"
                          >
                            <option value selected>
                              {{$store.getters.GET_SELECT+" "+$store.getters.GET_BRANCH}}
                            </option>
                            <option
                              v-for="brnch in all_branchs"
                              :key="brnch.id"
                              :value="brnch.id"
                            >
                              {{ brnch.branch_name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                            {{$store.getters.GET_YEAR}}
                          </label>
                          <select
                            name="select"
                            id="Year"
                            v-model="year_of_evaluation"
                            class="form-control"
                          >
                            <option value selected> {{$store.getters.GET_SELECT+" "+$store.getters.GET_YEAR}}</option>
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

                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>{{$store.getters.GET_MONTH}}
                          </label>

                          <select
                            name="select"
                            id="Month"
                            v-model="month_of_evaluation"
                            class="form-control"
                          >
                            <option value selected>
                              {{$store.getters.GET_SELECT+" "+$store.getters.GET_MONTH}}
                            </option>
                            <option
                              v-for="item in attendance_months"
                              :key="item.id"
                              :value="item.numeric"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                              {{$store.getters.GET_GRAPH+" "+$store.getters.GET_TYPE}}
                          </label>
                          <select
                            name="select"
                            id="type"
                            v-model="graphType"
                            type="choice"
                            class="form-control"
                          >
                            <option value selected>
                              {{$store.getters.GET_SELECT+" "+$store.getters.GET_GRAPH}}
                            </option>
                            <option value="radar">Radar</option>
                            <option value="bar">Bar</option>
                            <option value="line">Line</option>
                            <option value="area">Area</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>{{$store.getters.GET_EVALUATION}}</label>
                          <select
                            v-model="evaluationType"
                            type="choice"
                            class="form-control"
                          >
                            <option value selected>{{$store.getters.GET_SELECT+" "+$store.getters.GET_EVALUATION}}</option>
                            <option value="average">{{$store.getters.GET_AVERAGE}}</option>
                            <option value="individual">{{$store.getters.GET_INDIVIDUAL}}</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-8 mt-3">
                        <label></label>
                        <div class="form-group">
                          <button
                            @submit.prevent="SearchSingleMember"
                            class="btn btn-base float-right"
                          >
                             {{ $store.getters.GET_SEARCH}}
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!--Nested api Iterate in Array Start-->
        <!--<div v-for="singleMember in singleMemberData" :key="singleMember">
                    <p>hello: {{ singleMember.employee_information_employee_rating}}</p> <br>

                    <span v-for="singleMember in singleMember.employee_information_employee_rating" :key="singleMember">
                        <span>Name: {{ singleMember.rating.name }}</span> <br>
                        <span>Value: {{ singleMember.rating_point.value }}</span> <br>
                    </span>
        </div>-->
        <!--Nested api Iterate in Array Start-->

        <!--Radar Chart-->
        <!--<div v-if="singleMemberData != null">
                    <div class="text-center card">
                        <h5 class="mb-3">Data of {{ singleMemberData[0].employee.first_name + ' ' +
                            singleMemberData[0].employee.last_name}}
                        </h5>
                    </div>
        </div>-->

        <!--Graph HTML DOM-->
        <div class="div" v-if="graphArrayData && graphArrayData.length > 0">
          <div class="card">
            <div class="row"  id="image_area">
              <div
                class="col-md-6"
                v-for="(allChart, index) in graphArrayData"
                :key="index"
              >
                <!-- <template>
                
                </template> -->
                  <p class="evaluationMonth"
                  >
                    <!-- Year-Month: {{ allChart.series[0].name}} -->
                    <span class="badge badge-success">{{ allChart.series[0].name}}</span>
                    <span class="float-right mr-2" v-if="evaluationType ==='individual' && allChart.series[0].filled_by">by_ {{ allChart.series[0].filled_by[0]}} </span>
                   <!-- remarks : {{allChart.remarks}} -->
                  </p>
                <!--{{allChart.remarks}}-->

                <!--<p class="ml-2 mt-3" data-toggle="tooltip" v-bind:title="allChart.remarks"
                                   v-for="dep_wise in departmentWiseData" :key="dep_wise">
                                    {{dep_wise.employee.first_name + ' ' + dep_wise.employee.last_name}}
                </p>-->
                <!--graph-->
                <VueApexCharts
                  height="300"
                  :options="allChart.options"
                  :series="allChart.series"
                ></VueApexCharts>
              </div>
            </div>
            <!-- <div class="row" v-if="Object.keys(all_chartOptions).length === 0">
              <h5 class="text-center NoGraphResult">No Data Found !</h5>
            </div>-->
          </div>

          <!--Export Excel-->
          <button
            type="button"
            class="btn btn-successs exportButton"
            @click="exportExcel"
          >
            {{ $store.getters.GET_EXPORT}} Excel
          </button>
        </div>
         <div v-if="graphArrayData.length == 0 && isGraphDataFound == false " class="alert alert-success" role="alert">
          {{ $store.getters.GET_TO_SEE}} <strong>{{ $store.getters.GET_EVALUATION+' '+$store.getters.GET_DATA}} </strong> {{ $store.getters.GET_PLEASE_PERFORM_A_SEARCH}}
          </div>
        <div v-if="graphArrayData.length == 0 && isGraphDataFound" class="alert alert-success" role="alert">
            {{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}
        </div>
      </div>

      <!--Export PDF Table Start-->
      <!-- <h5 style="color: #0ba360">Export PDF Table</h5>
             <table class="table table-striped">
                 <thead>
                 <tr>
                     <th scope="col">Rating Name</th>
                     <th scope="col">Rating Valu</th>
                 </tr>
                 </thead>
                 <tbody>
                 <tr v-for="singleMember in singleMemberData" :key="singleMember">
                     <template v-for="singleMember in singleMember.employee_information_employee_rating"
                               :key="singleMember">
                         <td>{{ singleMember.rating.name }}</td>
                         <br>
                         <td> {{ singleMember.rating_point.value }}</td>
                     </template>
                 </tr>
                 </tbody>
      </table>-->
      <!--<button class="mt-2 btn btn-success" @click="exportPdf">Export PDF</button>-->

      <!--</div>-->
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

// PDF library
import jspdf from "jspdf";
import "jspdf-autotable";
import html2pdf from "html2pdf.js";

import html2canvas from "html2canvas";

// Excel library
import XLSX from "xlsx";

export default {
  name: "SingleMember",
  components: { Master, VueApexCharts },

  data() {
    return {
      isGraphDataFound: false,
      all_years: null,
      all_departments: null,
      all_employees: null,
      all_branchs: null,
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
      // { name: "January", numeric: 1 },
        // { name: "February", numeric: 2 },
        // { name: "March", numeric: 3 },
        // { name: "April", numeric: 4 },
        // { name: "May", numeric: 5 },
        // { name: "June", numeric: 6 },
        // { name: "July", numeric: 7 },
        // { name: "August", numeric: 8 },
        // { name: "September", numeric: 9 },
        // { name: "October", numeric: 10 },
        // { name: "November", numeric: 11 },
        // { name: "December", numeric: 12 },

      singleMemberData: null,

      department: null,
      employee: null,
      year_of_evaluation: null,
      month_of_evaluation: null,
      branch: null,

      graphType: null,

      all_series: {},
      all_chartOptions: {},
      // new data props
      evaluation_data: null,
      processed_rating_data:null,
       graphArrayData:[] ,
       evaluationType:null,
      /* Start Radar Chart */
      series: [
        {
          name: "Series 1",
          data: [],
        },
      ],

      chartOptions: {
        chart: {
          // height: 550,
          type: "radar",
        },
        title: {
          // text: 'Radar Chart'
        },
        xaxis: {
          categories: [],
        },
      },
      /* End Radar Chart */
    };
  },

  created() {
    this.loadYear();
    this.loadDepartment();
    this.loadBranch();
  },

  updated() {
    // after finish work, this two will be null
    // this.chartOptions.xaxis.categories = [];
    // this.series.data = this.series.map((item) => {
    //   item.data = [];
    // });

    // this.all_series = {};
    this.all_chartOptions = {};
    this.graphArrayData = [];
    this.isGraphDataFound = false;
  },

  methods: {
    // Load Year List
    loadYear() {
      axios
        .get("years/", {
        })
        .then((response) => {
          this.all_years = response.data.data.years;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // Load Department List
    loadDepartment: function () {
      axios
        .get("department-short-list/", {
        })
        .then(
          function (response) {
            this.all_departments = response.data;
          }.bind(this)
        );
    },

    // Load User List
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

    // Load Branches
    loadBranch() {
      axios
        .get("branch-short-list/", {
        })
        .then((response) => {
          this.all_branchs = response.data;
          // this.all_branchs = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    
    avg_rating_calculation(detail,unique_key){
    let data={}
    let rating_avg = 0
    for (const property in detail) {
     rating_avg= (detail[property].rating_value + this.all_chartOptions[unique_key].detail[property].     
     rating_value);
     data[property] = {"rating_name":detail[property].rating_name , "rating_value":rating_avg }
    }
    return data;
    },
    // average evaluation
    avarage_evaluation() {
      if (this.evaluation_data) {
        let counter = 0
        let unique_key = null
        this.evaluation_data.forEach((element) => {
           unique_key = element.year_of_evaluation+ "_"+element.month_of_evaluation+"_"+element.employee.id;
          if ( Object.prototype.hasOwnProperty.call(this.all_chartOptions, unique_key)) 
          {
             counter = this.all_chartOptions[unique_key].counter + 1
              let detail = this.rating_detail_processor(element.evaluation_evaluation_rating)
              let avg_calculated_rating  =  this.avg_rating_calculation(detail,unique_key);
             this.all_chartOptions[unique_key] = {
              "counter":counter,
              "detail":avg_calculated_rating,
              "employee_full_name": element.employee.first_name+ " "+element.employee.last_name,
              // "remarks":element.additional_comments
            }
          }
          else{
            this.all_chartOptions[unique_key] = {
              "counter":1,
              "detail":  this.rating_detail_processor(element.evaluation_evaluation_rating),
              "employee_full_name": element.employee.first_name+ " "+element.employee.last_name,
              // "remarks":element.additional_comments
            }
          }
          // console.log("663",this.all_chartOptions[unique_key].detail);
        });
      }
      // console.log("666",this.all_chartOptions);
      this.generateChart(this.all_chartOptions);
    },
     rating_detail_processor(employee_rating_data){
      let data={}
      employee_rating_data.forEach((item)=>{
      data[item.rating.id] = {"rating_name":item.rating.name , "rating_value":item.rating_point.value }
    })
    return data;
    },
    generateChart(formatted_data){
     for (const props in formatted_data) {
       let categories = []
       let rating_new_values = []
       let filled_By_Name = []
     for (const rating_id in formatted_data[props].detail ){
         categories.push (formatted_data[props].detail[rating_id].rating_name) 
         rating_new_values.push ((formatted_data[props].detail[rating_id].rating_value/formatted_data[props].counter).toFixed(2)) 
     }
     filled_By_Name.push(formatted_data[props].filled_by_full_name)
    //  console.log("699",filled_By_Name)
     this.graphArrayData.push({
      options: {
        chart: {
          type: this.graphType,
        },
       title: {
        text: !this.employee ? formatted_data[props].employee_full_name: '',
        // text:  formatted_data[props].filled_by_full_name
        },
        // remarks: "Remarks: " + member_data.additional_comments,
        // remarks: "Remarks: " + formatted_data[props].remarks,
        xaxis: {
          categories: categories
        }
      },
      series: [{
        name: this.get_graph_title(props),
        data: rating_new_values,
        filled_by: filled_By_Name
      }]
    })      
    }
    },
    get_graph_title(data){
    let [Eyear,Emonth] = data.split('_');
    // let [Eyear,Emonth,Euser] = data.split('_');
    //  let newEmonth =this.attendance_months.filter(m =>m.numeric == Emonth )[0].name
    // let evaluated_by = this.all_employees.filter(user =>user.id == Euser )[0].first_name;
    // return Eyear+"-"+this.attendance_months.filter(m =>m.numeric == Emonth )[0].name+ ",  Evaluated-by: "+evaluated_by;
    return Eyear+"-"+this.attendance_months.filter(m =>m.numeric == Emonth )[0].name;
    },
    // individual evaluation
    individual_evaluation(){
        if (this.evaluation_data) {
        let unique_key = null
        this.evaluation_data.forEach((element) => {
           unique_key = element.year_of_evaluation+ "_"+element.month_of_evaluation+"_"+element.filled_by.id;
            this.all_chartOptions[unique_key] = {
              "counter":1,
              "detail":  this.rating_detail_processor(element.evaluation_evaluation_rating),
              "employee_full_name": element.employee.first_name+ " "+element.employee.last_name,
              "filled_by_full_name": element.filled_by.first_name+ " "+element.filled_by.last_name,
              // "remarks":element.additional_comments
            }
          // console.log("663",this.all_chartOptions[unique_key].detail);
        });
      }
      // console.log("666",this.all_chartOptions);
      this.generateChart(this.all_chartOptions);
    },
    // get Single Member Data
    getSingleMemberGraph: function () {
      var queryParam = {
        department: this.$route.query.department,
        employee: this.$route.query.employee,
        branch: this.$route.query.branch,
        year_of_evaluation: this.$route.query.year_of_evaluation,
        month_of_evaluation: this.$route.query.month_of_evaluation,
      };
      axios
        .get("evaluation/", {
          params: queryParam,
        })
        .then((response) => {
          this.evaluation_data = response.data;
          if (this.evaluationType == "individual"){
            this.individual_evaluation();
          }
          else{
            this.avarage_evaluation();
          }
          
          // previous code 
          // this.singleMemberData = response.data;
          // console.log("433", this.singleMemberData);
          // // Nested api Iterate in Array from API
          // this.singleMemberData.forEach((member_data) => {
          //   // Month wise Chart show
          //   // Set data as key value pair. // key is Data property + parameter.Month Name // value is apexchart object/array like same is designed
          //   this.all_series[member_data.month_of_evaluation] = [
          //     {
          //       name: member_data.month_of_evaluation,
          //       data: [],
          //     },
          //   ];

          //   this.all_chartOptions[member_data.month_of_evaluation] = {
          //     chart: {
          //       type: this.graphType,
          //       // type: 'radar'
          //     },
          //     title: {
          //       // text: 'Radar Chart'
          //       text:
          //         member_data.employee.first_name +
          //         " " +
          //         member_data.employee.last_name,
          //     },

          //     remarks: "Remarks: " + member_data.additional_comments,

          //     month_name: member_data.month_of_evaluation,

          //     xaxis: {
          //       categories: [],
          //     },
          //   };
          //   member_data.employee_information_employee_rating.forEach(
          //     (rating_value) => {
          //       this.all_chartOptions[
          //         member_data.month_of_evaluation
          //       ].xaxis.categories.push(rating_value.rating.name); //data property push into api key
          //       this.all_series[member_data.month_of_evaluation][0].data.push(
          //         rating_value.rating_point.value
          //       );
          //     }
          //   );
          // });
          // // // Nested api Iterate in Array from API End
        });
        this.isGraphDataFound = true;
    },

    // Search User
    async SearchSingleMember() {
      this.graphArrayData = [];
      this.all_chartOptions = {},
      await this.$router.push({
        path: "evaluation-graph",
        query: {
          department: this.department,
          employee: this.employee,
          branch: this.branch,
          year_of_evaluation: this.year_of_evaluation,
          month_of_evaluation: this.month_of_evaluation,
        },
      });
      this.getSingleMemberGraph();
    },

    // Export Pdf Method
    exportPdfs() {
      /*let rating_point_column = ["Rating Name", "Rating Point", "Rating Value", "Evaluation Month"]
                let rating_point_name = []

                this.singleMemberData.forEach(item => {
                    console.log('Item....', item.employee_information_employee_rating)
                    item.employee_information_employee_rating.map(element => {
                        let data = [element.rating.name, element.rating_point.value, element.rating_point.name, item.month_of_evaluation]
                        rating_point_name.push(data)
                    })
                })


                // var doc = new jspdf('p', 'pt');
                var doc = new jspdf('PNG', 0, 0);
                doc.autoTable(rating_point_column, rating_point_name)
                doc.save('table.pdf');*/

      const doc = new jspdf();
      doc.text(document.getElementById("content").innerHTML, 10, 10);
      doc.save("a4.pdf"); // will save the file in the current working directory
    },

    exportPdfss() {
      // console.log('content//', this.$refs.content)
      // const doc = new jspdf();
      /** WITH CSS */
      // var canvasElement = document.createElement('canvas');
      // var h1 = document.createElement('h1')
      // h1.innerHTML = 'Hello H1'
      html2canvas(document.getElementById("content"), {
        dpi: 300, // Set to 300 DPI
        scale: 3, // Adjusts your resolution
        onrendered: function (canvas) {
          var img = canvas.toDataURL("image/jpeg", 1);
          var doc = new jspdf("L", "px", [200, 100]);
          doc.addImage(img, "JPEG", 0, 0, 200, 100);
          doc.save("sample-file.pdf");
        },
      });
    },

    exportPdf() {
      html2pdf(document.getElementById("image_area"), {
        margin: 1,
        filename: "document.pdf",
        image: { type: "jpeg", quality: 1.5 },
        // image: { type: 'png', quality: 1.50, width:133, height:100 },
        html2canvas: { dpi: 192, letterRendering: true },
        // html2canvas:  { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
      });
    },

    // Export Excel Method
    exportExcel() {
      let rating_point = [];

      this.evaluation_data.forEach((item) => {
        // console.log("Item....", item.employee_information_employee_rating);
        item.evaluation_evaluation_rating.map((element) => {
          // console.log('ELEMENT....', element.rating)
          rating_point.push({
            Rating_Point_Name: element.rating.name,
            Rating_Point_Value: element.rating_point.name,
            Evaluation_Month: item.month_of_evaluation,
          });
        });
      });
      const data = XLSX.utils.json_to_sheet(rating_point);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data);
      XLSX.writeFile(wb, "demo.xlsx");
    },
  },
};
</script>

<style scoped>
#image_area {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  padding: 10px;
  /*margin-top: 60px;*/
}
/* cutomization  canvas */
.apexcharts-canvas {
  position: relative;
  user-select: none;
  padding: 10px;
}
.NoGraphResult {
  margin: 0px 0px 18px 40px;
}
/* for search form  */
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
