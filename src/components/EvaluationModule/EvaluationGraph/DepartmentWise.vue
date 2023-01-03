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
              <div>Department Wise Evaluation</div>
            </div>
          </div>
        </div>
        <!-- <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="SearchDepartmentWise">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-3">
                    <div class="position-relative form-group">
                      <label>
                        Department
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        name="select"
                        id="department"
                        v-model="department"
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

                  <div class="col-md-3">
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

                  <div class="col-md-3">
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

                  <div class="col-md-3">
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
                    @submit.prevent="SearchDepartmentWise"
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
                      <i class="fa fa-search"></i>
                      &nbsp;
                      Search
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

            <div data-parent="#accordion" id="collapseOne1" class="collapse">
              <hr />
              <div class="card-body">
                <form @submit.prevent="SearchDepartmentWise">
                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-3">
                        <div class="position-relative form-group">
                          <label>
                            Department
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select"
                            id="department"
                            v-model="department"
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

                      <div class="col-md-3">
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

                      <div class="col-md-3">
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

                      <!--<div class="col-md-3">
                                        <div class="position-relative form-group">
                                            <label>Graph Type</label>
                                            <select
                                                    name="select"
                                                    id="type"
                                                    v-model="graphType"
                                                    type="choice"
                                                    class="form-control">
                                                <option value="radar">Radar</option>
                                                <option value="bar">Bar</option>
                                                <option value="line">Line</option>
                                                <option value="area">Area</option>
                                            </select>
                                        </div>
                      </div>-->

                      <div class="col-md-3">
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
                    <div class="form-row">
                      <div class="col-md-12">
                        <label></label>
                        <div class="form-group">
                          <button
                            @submit.prevent="SearchDepartmentWise"
                            class="btn btn-base float-right"
                          >
                            Search
                            <i class="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- <div class="form-group">
                      <button
                        @submit.prevent="SearchDepartmentWise"
                        class="mt-2 btn btn-base btn-lg float-right"
                      >
                        Search
                        <i class="fa fa-search"></i>
                      </button>
                    </div>-->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!--Radar Chart-->
        <div class="div" v-if="departmentWiseData && departmentWiseData.length > 0">
          <div class="card">
            <div class="row" id="image_area" v-if="all_chartOptions">
              <div class="col-md-6" v-for="(allChart, index) in all_chartOptions" :key="index">
                <template v-for="item in attendance_months" :key="item">
                  <p
                    class="evaluationMonth"
                    v-if="item.numeric === allChart.month_name"
                    v-bind:title="allChart.remarks"
                  >Month of: {{ item.name}}</p>
                </template>
                <!--{{allChart.remarks}}-->

                <!--<p class="ml-2 mt-3" data-toggle="tooltip" v-bind:title="allChart.remarks"
                                   v-for="dep_wise in departmentWiseData" :key="dep_wise">
                                    {{dep_wise.employee.first_name + ' ' + dep_wise.employee.last_name}}
                </p>-->
                <!--graph-->
                <VueApexCharts height="300" :options="allChart" :series="all_series[index]"></VueApexCharts>
              </div>
            </div>
            <!-- <div class="row" v-if="Object.keys(all_chartOptions).length === 0">
              <h5 class="text-center NoGraphResult">No Data Found !</h5>
            </div>-->
          </div>

          <!--Export PDF-->
          <!--<button class="mt-2 mr-3 btn btn-success" @click="exportPdf">Export PDF</button>-->

          <!--Export Excel-->
          <button
            type="button"
            class="btn btn-successs exportButton"
            @click="exportExcel"
          >Export Excel</button>
        </div>
        <div v-else class="alert alert-success" role="alert">No Data Found!</div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import VueApexCharts from "vue3-apexcharts";

// PDF library
// import jspdf from 'jspdf'
import "jspdf-autotable";

// Excel library
import XLSX from "xlsx";
import html2pdf from "html2pdf.js";

export default {
  name: "DepartmentWise",
  components: { Master, VueApexCharts },

  data() {
    return {
      all_years: null,
      all_departments: null,
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
      departmentWiseData: null,

      department: null,
      year_of_evaluation: null,
      month_of_evaluation: null,
      graphType: null,

      all_series: {},
      all_chartOptions: {},

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
    // this.update()
  },

  updated() {
    // after finish work, this two will be null
    this.chartOptions.xaxis.categories = [];
    this.series.data = this.series.map((item) => {
      item.data = [];
    });

    this.all_series = {};
    this.all_chartOptions = {};
  },

  methods: {
    /*Tooltip*/
    /* update: function () {
                 this.date = new Date().toString();
             },*/

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
        .get("departments/", {
        })
        .then(
          function (response) {
            this.all_departments = response.data;
          }.bind(this)
        );
    },

    // get Single Member Data
    getDepartmentWise: function () {
      var queryParam = {
        department: this.$route.query.department,
        year_of_evaluation: this.$route.query.year_of_evaluation,
        month_of_evaluation: this.$route.query.month_of_evaluation,
      };
      axios
        .get("employee-evaluation/", {
          params: queryParam,
        })
        .then((response) => {
          this.departmentWiseData = response.data;

          // Nested api Iterate in Array from API
          this.departmentWiseData.forEach((member_data) => {
            /*tooltip in Name*/
            /*this.remarks_comments = member_data.additional_comments;*/

            // Month wise Chart show
            // Set data as key value pair. // key is Data property + parameter.Month Name // value is apexchart object/array like same is designed
            this.all_series[
              member_data.month_of_evaluation + "_" + member_data.employee.id
            ] = [
              {
                name: member_data.month_of_evaluation,
                data: [],
              },
            ];

            this.all_chartOptions[
              member_data.month_of_evaluation + "_" + member_data.employee.id
            ] = {
              chart: {
                type: this.graphType,
                // type: 'radar'
              },
              title: {
                /*Employee Name into Graph*/
                text:
                  member_data.employee.first_name +
                  " " +
                  member_data.employee.last_name,
              },

              remarks: "Remarks: " + member_data.additional_comments,

              month_name: member_data.month_of_evaluation,

              xaxis: {
                categories: [],
              },
            };
            member_data.employee_information_employee_rating.forEach(
              (rating_value) => {
                this.all_chartOptions[
                  member_data.month_of_evaluation +
                    "_" +
                    member_data.employee.id
                ].xaxis.categories.push(rating_value.rating.name); //data property push into api key
                this.all_series[
                  member_data.month_of_evaluation +
                    "_" +
                    member_data.employee.id
                ][0].data.push(rating_value.rating_point.value);
              }
            );

            // console.log('all_series////', this.all_series, member_data.employee.first_name)
          });
          // Nested api Iterate in Array from API End
        });
    },

    // Search Department
    async SearchDepartmentWise() {
      await this.$router.push({
        path: "department-wise",
        query: {
          department: this.department,
          year_of_evaluation: this.year_of_evaluation,
          month_of_evaluation: this.month_of_evaluation,
        },
      });
      this.getDepartmentWise();
    },

    // Export Pdf Method as Table
    /*exportPdf() {
                let rating_point_column = ["Rating Name", "Rating Point", "Rating Value", "Evaluation Month"]
                let rating_point_name = []

                this.departmentWiseData.forEach(item => {
                    console.log('Item....', item.employee_information_employee_rating)
                    item.employee_information_employee_rating.map(element => {
                        let data = [element.rating.name, element.rating_point.value, element.rating_point.name, item.month_of_evaluation]
                        rating_point_name.push(data)
                    })
                })

                var doc = new jspdf('p', 'pt');
                doc.autoTable(rating_point_column, rating_point_name)
                doc.save('table.pdf');
            },*/

    // Export Pdf Method as image
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

      this.departmentWiseData.forEach((item) => {
        console.log("Item....", item.employee_information_employee_rating);
        item.employee_information_employee_rating.map((element) => {
          // console.log('ELEMENT....', element.rating)
          rating_point.push({
            Rating_Point_Name: element.rating.name,
            Rating_Point_Value: element.rating_point.name,
            Evaluation_Month: item.month_of_evaluation,
          });
        });
      });

      console.log("rating_point///", rating_point);
      const data = XLSX.utils.json_to_sheet(rating_point);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data);
      XLSX.writeFile(wb, "demo.xlsx");
    },
  },
};
</script>

<style scoped>
#chart {
  max-width: 600px;
  margin: 35px auto;
}

/* cutomization  canvas */
.apexcharts-canvas {
  position: relative;
  user-select: none;
  padding: 10px;
}

#image_area {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  padding: 10px;
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