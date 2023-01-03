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
              <div>{{ $store.getters.GET_UPDATE +' '+$store.getters.GET_BRANCH}}</div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <div
              v-if="branch_error_data && branch_error_data.detail"
              class="alert alert-danger alert-dismissible fade show text-center"
              role="alert"
            >
              {{ $store.getters.GET_YOU_DO_NOT_HAVE_PERMISSION_TO_DO_THIS_ACTION}}
              <button
                type="button"
                class="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <!-- <form v-on:submit.prevent="submitUserForm">-->
            <form @submit.prevent="EditBranch" autocomplete="off">
              <div class="form-group">
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
                        :class="{'is-invalid':branch_error_data && branch_error_data.branch_name}"
                      />

                      <div
                        :class="{'invalid-feedback':branch_error_data && branch_error_data.branch_name}"
                        v-if="branch_error_data && branch_error_data.branch_name"
                      >
                        {{
                        branch_error_data.branch_name[0] }}
                      </div>
                    </div>
                  </div>

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

                <!--Address & Branch Timezone-->
                <div class="form-row">
                  <!--Branch Timezone-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label style="font-weight: bold">
                          {{ $store.getters.GET_BRANCH+' '+$store.getters.GET_TIMEZONE}}
                        <span style="color: red">*</span>
                      </label>
                      <select name="select[]" v-model="branch_timezone" class="form-control">
                        <option value="false" disabled selected>{{ $store.getters.GET_SELECT+' '+$store.getters.GET_TIMEZONE}}</option>
                        <option
                          v-for="timezone in timezones"
                          :key="timezone"
                          :value="timezone"
                        >{{ timezone }}</option>
                      </select>
                    </div>
                  </div>

                  <!--Address-->
                  <div class="col-md-6">
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
                      :class="{'is-invalid':branch_error_data && branch_error_data.branch_address}"
                    />

                    <div
                      :class="{'invalid-feedback':branch_error_data && branch_error_data.branch_address}"
                      v-if="branch_error_data && branch_error_data.branch_address"
                    >
                      {{
                      branch_error_data.branch_address[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    @submit.prevent="EditBranch"
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

/*Multiselect*/
import Multiselect from "@vueform/multiselect";

export default {
  name: "UpdateBranch",
  components: { Master, Multiselect },
  data() {
    return {
      branch_name: null,
      branch_address: null,
      branch_timezone: null,
      branch_weekly_holiday: [],

      timezones: null,
      error_data: null,
      branch_error_data: {
        branch_name: null,
        branch_address: null,
      },
    };
  },
  methods: {
    getBranchData: function () {
      axios.get(`branches/${this.$route.params.id}/`).then(
        (response) => {
          this.branch_name = response.data.branch_name;
          this.branch_address = response.data.branch_address;
          this.branch_timezone = response.data.branch_timezone;
          this.branch_weekly_holiday = response.data.branch_weekly_holiday;
        },
        (response) => {
          console.log("----", response);
        }
      );
      // .catch(function (error) {
      //     if (error.response) {
      //       console.log("188======", error.response.data);
      //       console.log(error.response.status);
      //       console.log(error.response.headers);
      //     }
      // });
    },

    EditBranch() {
      axios
        .put("branches/" + this.$route.params.id + "/", {
          branch_name: this.branch_name,
          branch_address: this.branch_address,
          branch_timezone: this.branch_timezone,
          // branch_weekly_holiday: this.branch_weekly_holiday.length ? this.branch_weekly_holiday.split(" , ") : [],
          branch_weekly_holiday: this.branch_weekly_holiday,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: this.$store.getters.GET_UPDATED +' '+this.$store.getters.GET_SUCCESSFULLY  +" ...",
          }).then((response) => {
            this.$router.push({ name: "BranchList" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          this.branch_error_data = error.response.data;
        });
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
    this.getBranchData();
    this.loadTimezone();
  },
};
</script>

<!--<style scoped></style>-->
<style src="@vueform/multiselect/themes/default.css"></style>