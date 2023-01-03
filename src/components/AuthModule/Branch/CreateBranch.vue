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
              <div>{{ $store.getters.GET_CREATE +' '+$store.getters.GET_BRANCH}}
              </div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="submitBranchForm" autocomplete="off">
              <div class="form-group">
                <!--Branch Name & Weekly Holidays-->
                <div class="form-row">
                  <!--Branch Name-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label style="font-weight: bold">
                        {{ $store.getters.GET_BRANCH +' '+$store.getters.GET_NAME}}
                        <span style="color: red">*</span>
                      </label>
                      <input
                        v-model="branch_name"
                        type="text"
                        class="form-control"
                        :class="{ 'is-invalid': branch_error_data && branch_error_data.branch_name }"
                      />

                      <div
                        :class="{ 'invalid-feedback': branch_error_data && branch_error_data.branch_name }"
                        v-if="branch_error_data && branch_error_data.branch_name"
                      >{{ branch_error_data.branch_name[0] }}</div>
                    </div>
                  </div>

                  <!--Weekly Holidays-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label style="font-weight: bold">{{ $store.getters.GET_WEEKLY_HOLIDAYS}}</label>

                      <Multiselect
                        v-model="branch_weekly_holiday"
                        mode="multiple"
                        :options="{
                            Friday: 'Friday',
                            Saturday: 'Saturday',
                            Sunday: 'Sunday',
                            Monday: 'Monday',
                             Tuesday: 'Tuesday',
                             Wednesday: 'Wednesday',
                             Thursday: 'Thursday',
                        }"
                      />
                    </div>
                  </div>
                </div>

                <!--Branch Address & Branch Timezone-->
                <div class="form-row">
                  <!--Branch Timezone-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label style="font-weight: bold">
                         {{ $store.getters.GET_BRANCH+' '+$store.getters.GET_TIMEZONE}}
                        <span style="color: red">*</span>
                      </label>
                      <select
                        name="select[]"
                        v-model="branch_timezone"
                        class="form-control"
                        :class="{ 'is-invalid': branch_error_data && branch_error_data.branch_timezone }"
                      >
                        <option value="false" disabled selected>
                            {{ $store.getters.GET_SELECT+' '+$store.getters.GET_TIMEZONE}}
                        </option>
                        <option
                          v-for="timezone in timezones"
                          :key="timezone"
                          :value="timezone"
                        >{{ timezone }}</option>
                      </select>

                      <div
                        :class="{ 'invalid-feedback': branch_error_data && branch_error_data.branch_timezone }"
                        v-if="branch_error_data && branch_error_data.branch_timezone"
                      >{{ branch_error_data.branch_timezone[0] }}</div>
                    </div>
                  </div>

                  <!--Branch Address-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label style="font-weight: bold">
                         {{ $store.getters.GET_BRANCH+' '+$store.getters.GET_ADDRESS}}
                        <span style="color: red">*</span>
                      </label>

                      <textarea
                        v-model="branch_address"
                        type="text"
                        class="form-control"
                        rows="1"
                        cols="50"
                        :class="{ 'is-invalid': branch_error_data && branch_error_data.branch_address }"
                      />

                      <div
                        :class="{ 'invalid-feedback': branch_error_data && branch_error_data.branch_address }"
                        v-if="branch_error_data && branch_error_data.branch_address"
                      >{{ branch_error_data.branch_address[0] }}</div>
                    </div>
                  </div>
                </div>

                <!--Timezone Dropdown with Search-->
                <!-- <input class="form-control" list="europe-countries" placeholder="Select timezone" v-model="branch_timezone">
                                 <datalist id="europe-countries">
                                     <option v-for="timezone in timezones" :key="timezone" :value="timezone"> {{timezone}} </option>
                </datalist>-->
                <!--Timezone Dropdown with Search-->

                <div class="form-group">
                  <button
                    @submit.prevent="submitBranchForm"
                    class="mt-2 btn btn-successs btn-lg float-right"
                  >{{ $store.getters.GET_SUBMIT}}</button>
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
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";

import Multiselect from "@vueform/multiselect";

export default {
  name: "CreateBranch",
  components: { Master, Multiselect },
  data() {
    return {
      branch_name: null,
      branch_address: null,
      branch_timezone: null,
      branch_weekly_holiday: [],

      timezones: null,

      branch_error_data: {
        branch_name: null,
        branch_address: null,
        branch_timezone: null,
      },
    };
  },
  methods: {
    async submitBranchForm() {
      const response = await axios
        .post("branches/", {
          branch_name: this.branch_name,
          branch_address: this.branch_address,
          branch_timezone: this.branch_timezone,
          // branch_weekly_holiday: this.branch_weekly_holiday.length ? this.branch_weekly_holiday.split(" , ") : [],
          branch_weekly_holiday: this.branch_weekly_holiday,
        })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: "success",
              // title: "Yes...",
               text: this.$store.getters.GET_CREATED +' '+this.$store.getters.GET_SUCCESSFULLY  +" ...",
            });
            this.$router.push("branch-list");
          }
        })
        .catch((error) => {
          this.branch_error_data = error.response.data;
        });
      console.log(response);
    },

    loadTimezone() {
      axios
        .get("timezones/", {
        })
        .then((response) => {
          this.timezones = response.data;
          // this.pushReuseForm()
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {
    this.loadTimezone();
  },
};
</script>



<style src="@vueform/multiselect/themes/default.css">
</style>

