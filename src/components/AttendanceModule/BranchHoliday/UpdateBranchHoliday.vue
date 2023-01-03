<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-edit icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                   {{ $store.getters.GET_UPDATE +' '+$store.getters.GET_BRANCH + ' '+$store.getters.GET_HOLIDAY}}
              </div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="EditHoliday" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_BRANCH}}
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        v-model="branch"
                        class="form-control"
                        :class="{ 'is-invalid': create_holiday_error && create_holiday_error.branch }"
                      >
                        <option value="false" disabled selected> {{ $store.getters.GET_SELECT +' '+$store.getters.GET_BRANCH}}</option>
                        <option
                          v-for="branches in all_branches"
                          :key="branches.id"
                          :value="branches.id"
                        >{{ branches.branch_name }}</option>
                      </select>
                      <div
                        :class="{ 'invalid-feedback': create_holiday_error && create_holiday_error.branch }"
                        v-if="create_holiday_error && create_holiday_error.branch"
                      >{{ create_holiday_error.branch[0] }}</div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                          {{ $store.getters.GET_HOLIDAY}}
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        v-model="holiday"
                        class="form-control"
                        :class="{ 'is-invalid': create_holiday_error && create_holiday_error.holiday }"
                      >
                        <option value="false" disabled selected> {{ $store.getters.GET_SELECT +' '+$store.getters.GET_HOLIDAY}}</option>
                        <option
                          v-for="holiday in all_holidays"
                          :key="holiday.id"
                          :value="holiday.id"
                        >{{ holiday.purpose }}</option>
                      </select>
                      <div
                        :class="{ 'invalid-feedback': create_holiday_error && create_holiday_error.holiday }"
                        v-if="create_holiday_error && create_holiday_error.holiday"
                      >{{ create_holiday_error.holiday[0] }}</div>
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                         {{ $store.getters.GET_START +' '+$store.getters.GET_DATE}}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        type="date"
                        v-model="start_date"
                        class="form-control"
                        :class="{ 'is-invalid': create_holiday_error && create_holiday_error.start_date }"
                      />

                      <div
                        :class="{ 'invalid-feedback': create_holiday_error && create_holiday_error.start_date }"
                        v-if="create_holiday_error && create_holiday_error.start_date"
                      >{{ create_holiday_error.start_date[0] }}</div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <label> {{ $store.getters.GET_END +' '+$store.getters.GET_DATE}} <span class="asterisk">*</span></label>
                    <input
                      v-model="end_date"
                      type="date"
                      class="form-control"
                      :class="{ 'is-invalid': create_holiday_error && create_holiday_error.end_date }"
                    />
                    <div
                      :class="{ 'invalid-feedback': create_holiday_error && create_holiday_error.end_date }"
                      v-if="create_holiday_error && create_holiday_error.end_date"
                    >{{ create_holiday_error.end_date[0] }}</div>
                  </div>
                </div>
                <div class="form-row mt-2">
                      <div class="col-md-12">
                          <div
                        v-if=" create_holiday_error && create_holiday_error.non_field_errors"
                        class="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        <!-- {{create_holiday_error && create_holiday_error.non_field_errors[0]}} -->
                        Holiday for this branch already exits. Please select a different one.
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      </div>
                    </div>
              </div>

              <div class="form-group">
                <button
                  @submit.prevent="EditHoliday"
                  class="mt-2 btn btn-successs btn-lg float-right"
                >{{ $store.getters.GET_SUBMIT}}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "UpdateBranchHoliday",
  components: { Master },
  data() {
    return {
      all_branches: null,
      all_holidays: null,

      branch: null,
      holiday: null,
      start_date: null,
      end_date: null,

      create_holiday_error: {
        branch: null,
        holiday: null,
        start_date: null,
        end_date: null,
      },
    };
  },

  methods: {
    getHolidayData: function () {
      axios.get(`branch-holidays/${this.$route.params.id}/`).then(
        (response) => {
          this.branch = response.data.branch.id;
          this.holiday = response.data.holiday.id;
          this.start_date = response.data.start_date;
          this.end_date = response.data.end_date;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    loadBranchName() {
      axios
        .get("branch-short-list/", {
        })
        .then((response) => {
          this.all_branches = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadHoliday() {
      axios
        .get("holiday-short-list/", {
        })
        .then((response) => {
          this.all_holidays = response.data;
          // this.pushReuseForm()
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    EditHoliday() {
      axios
        .put("branch-holidays/" + this.$route.params.id + "/", {
          branch: this.branch,
          holiday: this.holiday,
          start_date: this.start_date,
          end_date: this.end_date,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: this.$store.getters.GET_UPDATED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((response) => {
            // this.$router.push("branch-holiday");
            this.$router.push({ name: "BranchHolidayList" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          this.create_holiday_error = error.response.data;
          console.log("--++", error.response);
        });
    },

    // Remove Data Field Row
    removeReuseForm(index) {
      this.holiday_branch_holiday.splice(index, 1);
    },
  },

  created() {
    this.getHolidayData();
    this.loadBranchName();
    this.loadHoliday();
  },
};
</script>

<style scoped>
</style>
