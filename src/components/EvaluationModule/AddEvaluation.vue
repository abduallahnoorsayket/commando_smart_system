<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i
                  class="fas fa-calculator icon-gradient bg-tempting-azure"
                ></i>
              </div>
              <div>{{ $store.getters.GET_ADD +' '+$store.getters.GET_EVALUATION}}</div>
            </div>
          </div>
        </div>
        <div class="main-card card" v-if="form_data">
          <div class="card-body">
            <div
              v-if="error_data && error_data.non_field_errors"
              class="alert alert-danger alert-dismissible fade show text-center"
              role="alert"
            >
              The Evaluation of this Employee for this month of this year is
              already added. Plese select a different month.
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <p>
              <strong class="app-sidebar__heading">
                {{ $store.getters.GET_EMPLOYEE +' '+$store.getters.GET_INFORMATION}}
              </strong>
            </p>
            <hr />
            <form @submit.prevent="submitEvaluationForm" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_DEPARTMENT}}
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
                          <option value selected> {{$store.getters.GET_SELECT+" "+$store.getters.GET_DEPARTMENT}}</option>
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
                  </div>
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_EMPLOYEE}}
                        <span class="asterisk">*</span>
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="emp"
                          v-model="employee"
                          class="form-control"
                          :class="{
                            'is-invalid': error_data && error_data.employee,
                          }"
                          
                        >
                          <option v-if="all_employees &&  all_employees.length == 0 && isEmployeeFound" value selected>
                            {{$store.getters.GET_NO+" "+$store.getters.GET_EMPLOYEE+' '+$store.getters.GET_FOUND}}
                          </option>
                          <option v-else value selected>{{$store.getters.GET_SELECT+" "+$store.getters.GET_EMPLOYEE}}</option>
                          <option
                            v-for="employee in all_employees"
                            :key="employee.id"
                            :value="employee.id"
                            selected
                          >
                            {{ employee.first_name }}
                          </option>
                        </select>
                        <div
                          :class="{
                            'invalid-feedback':
                              error_data && error_data.employee,
                          }"
                          v-if="error_data && error_data.employee"
                        >
                          {{ error_data.employee[0] }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{$store.getters.GET_CURRENT+" "+$store.getters.GET_DATE}}
                      </label>
                      <input
                        name="Start-date"
                        id="Current"
                        type="text"
                        v-model="today"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                          {{$store.getters.GET_MONTH+" "+$store.getters.GET_OF + " "+$store.getters.GET_EVALUATION}}
                        <span class="asterisk">*</span>
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="month"
                          v-model="month_of_evaluation"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              error_data && error_data.month_of_evaluation,
                          }"
                         >
                          <option value selected>{{$store.getters.GET_SELECT+" "+$store.getters.GET_MONTH}}</option>
                          <option
                            v-for="item in attendance_months"
                            :key="item.id"
                            :value="item.numeric"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                        <div
                          :class="{
                            'invalid-feedback':
                              error_data && error_data.month_of_evaluation,
                          }"
                          v-if="error_data && error_data.month_of_evaluation"
                        >
                          {{ error_data.month_of_evaluation[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                          {{$store.getters.GET_YEAR+" "+$store.getters.GET_OF + " "+$store.getters.GET_EVALUATION}}
                        <span class="asterisk">*</span>
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="year"
                          v-model="year_of_evaluation"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              error_data && error_data.year_of_evaluation,
                          }"
                         >
                          <option value selected>
                            {{$store.getters.GET_SELECT+" "+$store.getters.GET_YEAR}}
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
                        <div
                          :class="{
                            'invalid-feedback':
                              error_data && error_data.year_of_evaluation,
                          }"
                          v-if="error_data && error_data.year_of_evaluation"
                        >
                          {{ error_data.year_of_evaluation[0] }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                         {{$store.getters.GET_FILLED+" "+$store.getters.GET_BY}}
                      </label>
                      <input
                        id="filled"
                        type="text"
                        v-model="form_data.user.first_name"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="position-relative form-group mt-4">
                      <div>
                        <label>
                          <strong class="app-sidebar__heading"
                            >{{$store.getters.GET_EMPLOYEE+" "+$store.getters.GET_RATINGS}}</strong
                          >
                        </label>
                        <div
                          v-if="error_data && error_data.evaluation_evaluation_rating"
                          class="alert alert-danger alert-dismissible fade show text-center"
                          role="alert"
                        >
                            {{$store.getters.GET_Required_fields_message}}
                          <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <hr style="margin-bottom: 3px" />
                      </div>
                      <div class="table-responsive">
                        <table class="table table-hover table-striped">
                          <thead>
                            <tr>
                              <th scope="col" style="width: 25%"></th>
                              <th
                                scope="col"
                                v-for="(point, index) in all_rating_points"
                                :key="index"
                                style="width: 15%"
                              >
                                {{ point.name }}({{ point.value }})
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="all_ratings && all_rating_points">
                            <template
                              v-for="(rating, index) in all_ratings"
                              :key="index"
                            >
                              <tr v-if="rating.status === true">
                                <td>
                                  {{ rating.name }}
                                  <span class="asterisk">*</span>
                                </td>
                                <td
                                  v-for="(point, index) in all_rating_points"
                                  :key="index"
                                >
                                <!-- <input
                                  type="radio"
                                  :id="rating.id + '_' + point.id"
                                  :name="rating.name"
                                  v-model="is_current"
                                  value="1"
                                  class="form-control"
                                  @change="ratingPoint(rating.id, point.id)"
                                /> -->


                                  <label class="form-check-radio">
                                    <input
                                      type="radio"
                                      :name="rating.name"
                                      :id="rating.id + '_' + point.id"
                                      :value="1"
                                      @change="ratingPoint(rating.id, point.id)"
                                      
                                    />
                                    
                                    <span class="checkmark"></span>
                                  </label>
                                </td>
                              </tr>
                            </template>
                          </tbody>
                          <tbody v-else>
                            <tr style="height: 100px">
                              <td colspan="8" class="text-center align-middle">
                                <h4>
                                  {{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}
                                </h4>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="position-relative form-group mt-4">
                      <div>
                        <label>
                          <strong class="app-sidebar__heading"
                            > {{ $store.getters.GET_ADDITIONAL+' '+$store.getters.GET_COMMENTS }}
                            </strong
                          >
                        </label>
                        <hr />
                      </div>
                      <textarea
                        name="Additional Comments"
                        id="Comments"
                        type="text"
                        class="form-control"
                        v-model="additional_comments"
                        rows="4"
                        cols="50"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-group">
                    <button
                      @submit.prevent="submitEvaluationForm"
                      class="btn btn-successs btn-lg float-right"
                    >
                      {{ $store.getters.GET_SUBMIT}}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import permissions from "../../authorization/permissions";

export default {
  name: "AddEvaluation",
  components: { Master },

  data() {
    return {
      isEmployeeFound:false,
      month_of_evaluation: null,
      year_of_evaluation: null,
      ratingData: {},
      finalratingData: [],
      // form_data: {
      //   first_name: null,
      // },
      form_data :null,
      user: null,
      today: null,
      department: null,
      employee: null,
      all_departments: null,
      all_employees: null,
      all_years: null,
      all_rating_points: null,
      all_ratings: null,
      additional_comments: null,
      error_data: {
        employee: null,
        month_of_evaluation: null,
        year_of_evaluation: null,
        additional_comments: null,
        evaluation_evaluation_rating: null,
      },
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
    };
  },
  created() {
    this.initialLoad();
    console.log("created");
  },
  updated() {
    this.initialLoad();
  },

  methods: {
    ratingPoint(ratingid, pointid) {
      this.ratingData[ratingid] = pointid;
    },
    initialLoad: function () {
      this.loadDepartment();
      this.loadYear();
      this.loadRatingPoints();
      this.loadRatings();
      this.getToday();
      this.loadUser();
    },
    loadRatings: function () {
      axios
        .get("rating-short-list/", {
        })
        .then((response) => {
          this.all_ratings = response.data.filter(function(element) {
              return element.status == true;
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadRatingPoints: function () {
      axios
        .get("rating-point-short-list/", {
        })
        .then((response) => {
          this.all_rating_points = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadUser: function () {
      // let user_id = localStorage.getItem("id");
      axios
        .get("/profiles/me/",{
        })
        .then((response) => {
          this.form_data = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getToday() {
      let resultdate = new Date();
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
      this.today = resultdate;
    },
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
    getEmployee: function () {
      let currntUserID = localStorage.getItem("id");
      axios
        .get("users-short-list/", {
          params: {
            department: this.department,
          },
        })
        .then(
          function (response) {
            this.all_employees = response.data.filter(function(user) {
              return user.id != currntUserID;
          });
          }.bind(this)
        );
        this.isEmployeeFound = true;
    },
    PrcessRatingdata() {
      this.finalratingData = [];
      for (const [key, value] of Object.entries(this.ratingData)) {
        this.finalratingData.push({ rating: key, rating_point: value });
      }
    },
    async submitEvaluationForm() {
      let user_id = localStorage.getItem("id");
      await this.PrcessRatingdata();
      axios
        .post("evaluation/", {
          employee: this.employee,
          month_of_evaluation: this.month_of_evaluation,
          year_of_evaluation: this.year_of_evaluation,
          additional_comments: this.additional_comments,
          evaluation_evaluation_rating: this.finalratingData.length == this.all_ratings.length ? this.finalratingData : null,
          filled_by: user_id,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text:  this.$store.getters.GET_ADDED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            this.$router.push("add-evaluation");
            this.$router.go();
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.error_data = error.response.data;
          console.log("527--++", this.error_data);
        });
    },

    // end of submit
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
  },
  // end of method
};
</script>

<style scoped>
.app-sidebar__heading {
  color: #69c5a5;
  text-transform: capitalize;
}

hr {
  height: 1px;
  background-color: #dcdcdc;
  border: none;
  margin-bottom: 20px;
  margin-top: 0px;
}
.table th .table td {
  vertical-align: top !important;
  border-collapse: collapse !important;
  text-align: center;
}
.table td {
  font-weight: bold !important;
}
.table th {
  background: #ffffff !important;
}
.form-check-input {
  position: none;
  margin-top: -0.3rem;
  margin-left: -0.9rem;
}
/* custom Radio button */
.form-check-radio {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 16px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.form-check-radio input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.form-check-radio:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.form-check-radio input:checked ~ .checkmark {
  background-color: #69c5a5;
  border: none;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.form-check-radio input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.form-check-radio .checkmark:after {
  top: 5.48px;
  left: 5.48px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
  /* background: #69c5a5; */
}
/*  custom radio end */


/* new custom radio */


</style>
