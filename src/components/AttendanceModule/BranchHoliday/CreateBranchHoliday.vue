<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-plus-square icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                 {{ $store.getters.GET_CREATE +' '+$store.getters.GET_BRANCH + ' '+$store.getters.GET_HOLIDAY}}
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <form @submit.prevent="submitCreateHoliday" autocomplete="off">
                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                              {{ $store.getters.GET_BRANCH}}
                            <span style="color: red">*</span>
                          </label>
                          <select
                            v-model="branch"
                            class="form-control"
                            :class="{ 'is-invalid': create_holiday_error && create_holiday_error.branch }"
                          >
                            <option value="false" disabled selected>
                              {{ $store.getters.GET_SELECT +' '+$store.getters.GET_BRANCH}}
                            </option>
                            <option
                              v-for="branches in all_branch"
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
                            <span style="color: red">*</span>
                          </label>
                          <select
                            v-model="holiday"
                            class="form-control"
                            :class="{ 'is-invalid': create_holiday_error && create_holiday_error.holiday }"
                          >
                            <option value="false" disabled selected>
                                 {{ $store.getters.GET_SELECT +' '+$store.getters.GET_HOLIDAY}}
                            </option>
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
                            <span style="color: red">*</span>
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
                        <label>
                             {{ $store.getters.GET_END +' '+$store.getters.GET_DATE}}
                           <span style="color: red">*</span></label>
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
                    <div class="form-row">
                      <div class="col-md-6 mt-1">
                      </div>
                      <div class="col-md-4"></div>
                      <div class="col-md-2">
                        <div class="form-group">
                      <button
                        @submit.prevent="submitCreateHoliday"
                        class="mt-2 btn btn-successs btn-lg float-right"
                      >{{ $store.getters.GET_SUBMIT}}</button>
                    </div>
                      </div>
                    </div>

                    
                  </div>
                </form>
              </div>
            </div>
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
  name: "CreateBranchHoliday",
  components: { Master },
  data() {
    return {
      all_branch: null,

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
    // Submit Holiday Form
    async submitCreateHoliday() {
      const response = await axios
        .post("branch-holidays/", {
          branch: this.branch,
          holiday: this.holiday,
          start_date: this.start_date,
          end_date: this.end_date,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: this.$store.getters.GET_CREATED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            this.$router.push("branch-holiday-list");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.create_holiday_error = error.response.data;
          console.log("--++", error.response);
        });
      console.log(response);
    },

    // Load branch into dropdown
    loadBranch() {
      axios
        .get("branch-short-list/", {
        })
        .then((response) => {
          this.all_branch = response.data;
          // this.pushReuseForm()
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

    // Add Data Field Row
    pushReuseForm() {
      this.holiday_branch_holiday.push({
        branch: null,
        start_date: null,
        end_date: null,
        holiday: null,
      });
    },

    // Remove Data Field Row
    removeReuseForm(index) {
      this.holiday_branch_holiday.splice(index, 1);
    },
  },

  created() {
    this.loadBranch();
    this.loadHoliday();
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>