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
              <div> {{ $store.getters.GET_MY +' '+$store.getters.GET_EVALUATION}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="SearchMyEvaluation">
              <div class="form-group">
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
                    @submit.prevent="SearchMyEvaluation"
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
                      {{ $store.getters.GET_SEARCH}}
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
                <form @submit.prevent="SearchMyEvaluation">
                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>{{$store.getters.GET_YEAR}} <span class="asterisk">*</span></label>
                          <select
                            name="select"
                            id="Year"
                            v-model="year_of_evaluation"
                            class="form-control"
                            required
                          >
                            <option value selected>{{$store.getters.GET_SELECT+" "+$store.getters.GET_YEAR}}</option>
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
                          <label>{{$store.getters.GET_MONTH}}</label>
                          <select
                            name="select"
                            id="Month"
                            v-model="month_of_evaluation"
                            class="form-control"
                          >
                            <option value selected>{{$store.getters.GET_SELECT+" "+$store.getters.GET_MONTH}}</option>
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
                          <label>{{$store.getters.GET_GRAPH+" "+$store.getters.GET_TYPE}}</label>
                          <select
                            name="select"
                            id="type"
                            v-model="graphType"
                            type="choice"
                            class="form-control"
                          >
                            <option value selected>{{$store.getters.GET_SELECT+" "+$store.getters.GET_GRAPH}}
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
                      <div class="col-md-12">
                        <label></label>
                        <div class="form-group">
                          <button
                            @submit.prevent="SearchMyEvaluation"
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

        <!--Radar Chart-->
        <div class="div" v-if="graphArrayData && graphArrayData.length >0 ">
          <div class="card">
            <div class="text-center myName capitalizeNames">
              <h5
                v-if="evaluation_data && evaluation_data[0].employee.first_name && evaluation_data[0].employee.last_name"
              >
                {{ $store.getters.GET_DATA+' '+$store.getters.GET_OF }} {{ evaluation_data[0].employee.first_name + ' ' +
                evaluation_data[0].employee.last_name}}
              </h5>
              <hr />
            </div>
            <div class="row"  id="image_area">
              <div class="col-md-6" v-for="(allChart, index) in graphArrayData" :key="index">
                <p class="evaluationMonth"
                  >
                    <span class="badge badge-success">{{ allChart.series[0].name}}</span>
                   <!-- remarks : {{allChart.remarks}} -->
                  </p>

                <!--<p class="ml-2 mt-3" data-toggle="tooltip" v-bind:title="allChart.remarks"
                                   v-for="dep_wise in departmentWiseData" :key="dep_wise">
                                    {{dep_wise.employee.first_name + ' ' + dep_wise.employee.last_name}}
                </p>-->
                <!--graph-->
                <VueApexCharts  height="300" :options="allChart.options" :series="allChart.series"></VueApexCharts>
              </div>
            </div>
            <!-- <div class="row" v-if="Object.keys(all_chartOptions).length === 0">
              <h5 class="text-center NoGraphResult">No Data Found !</h5>
            </div> -->
          </div>

          <!--Export PDF-->
          <!--<button class="mt-2 mr-3 btn btn-success" @click="exportPdf">Export PDF</button>-->

          <!--Export Excel-->
          <button
            type="button"
            class="btn btn-successs exportButton"
            @click="exportExcel"
          >{{ $store.getters.GET_EXPORT}} Excel</button>
        </div>
         <div v-if="graphArrayData.length == 0 && isGraphDataFound == false " class="alert alert-success" role="alert">
         {{ $store.getters.GET_TO_SEE}} <strong>{{ $store.getters.GET_EVALUATION+' '+$store.getters.GET_DATA}} </strong> {{ $store.getters.GET_PLEASE_PERFORM_A_SEARCH}}
          </div>
        <div v-if="graphArrayData.length == 0 && isGraphDataFound" class="alert alert-success" role="alert">
          {{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}
        </div>
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
  name: "MyEvaluation",
  components: { Master, VueApexCharts },

  data() {
    return {
      isGraphDataFound:false,
      all_years: null,
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
      myEvaluationData: null,
      // myEvaluationData: {
      //   employee: null,
      // },

      year_of_evaluation: null,
      month_of_evaluation: null,
      graphType: null,

      all_series: {},
      all_chartOptions: {},
      // new data props
      evaluation_data: null,
      processed_rating_data:null,
       graphArrayData:[] ,

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
  },

  updated() {
    // after finish work, myEvaluationData will be null
    // this.myEvaluationData = null;
    // this.all_series = {};
    // this.all_chartOptions = {};
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
              "detail":avg_calculated_rating
              // "remarks":element.additional_comments
            }
          }
          else{
            this.all_chartOptions[unique_key] = {
              "counter":1,
              "detail":  this.rating_detail_processor(element.evaluation_evaluation_rating)
              // "remarks":element.additional_comments
            }
          }
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
     for (const rating_id in formatted_data[props].detail ){
         categories.push (formatted_data[props].detail[rating_id].rating_name) 
         rating_new_values.push ((formatted_data[props].detail[rating_id].rating_value/formatted_data[props].counter).toFixed(2)) 
     }
     
     this.graphArrayData.push({
      options: {
        chart: {
          type: this.graphType,
        },
      //  title: {
      //   text: formatted_data[props].employee_full_name
      //   },
        // remarks: "Remarks: " + member_data.additional_comments,
        // remarks: "Remarks: " + formatted_data[props].remarks,
        xaxis: {
          categories: categories
        }
      },
      series: [{
        name: this.get_graph_title(props),
        data: rating_new_values
      }]
    })      
    
    }
   
    },
    get_graph_title(data){
    let [Eyear,Emonth] = data.split('_');
    //  let newEmonth =this.attendance_months.filter(m =>m.numeric == Emonth )[0].name
    return Eyear+"-"+this.attendance_months.filter(m =>m.numeric == Emonth )[0].name;
    
    },
    // get Single Member Data
    getMyEvaluation: function () {
      var queryParam = {
        employee: this.$route.query.employee,
        year_of_evaluation: this.$route.query.year_of_evaluation,
        month_of_evaluation: this.$route.query.month_of_evaluation,
      };
      axios
        .get("my-evaluation/", {
          params: queryParam,
        })
        .then((response) => {
          this.evaluation_data = response.data;
          this.avarage_evaluation();

          // Nested api Iterate in Array from API
          //  this.myEvaluationData = response.data;
          // this.myEvaluationData.forEach((member_data) => {
          //   this.all_series[member_data.month_of_evaluation] = [
          //     {
          //       name: member_data.month_of_evaluation,
          //       data: [],
          //     },
          //   ];

          //   this.all_chartOptions[member_data.month_of_evaluation] = {
          //     chart: {
          //       type: this.graphType,
          //     },
          //     title: {
          //       // text: 'Radar Chart'
          //       // text:
          //       //   member_data.employee.first_name +
          //       //   " " +
          //       //   member_data.employee.last_name,
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
          // Nested api Iterate in Array from API End
        });
        this.isGraphDataFound = true;
    },

    // Search Department
    async SearchMyEvaluation() {
      let user_id = localStorage.getItem("id");
      this.graphArrayData = [];
      this.all_chartOptions = {},
      await this.$router.push({
        path: "my-evaluation",
        query: {
          year_of_evaluation: this.year_of_evaluation,
          month_of_evaluation: this.month_of_evaluation,
          employee: user_id,
        },
      });
      this.getMyEvaluation();
    },

    // Export Pdf as Table
    /*exportPdf() {
                let rating_point_column = ["Rating Name", "Rating Point", "Rating Value", "Evaluation Month"]
                let rating_point_name = []

                this.myEvaluationData.forEach(item => {
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

    // Export Pdf as Image
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
        console.log("Item....", item.evaluation_evaluation_rating);
        item.evaluation_evaluation_rating.map((element) => {
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
.myName {
  margin-top: 20px;
  color: #69c5a5;
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