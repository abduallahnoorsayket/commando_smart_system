<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i
                  class="fas fa-plus-square icon-gradient bg-tempting-azure"
                ></i>
              </div>
              <div>
                {{
                  $store.getters.GET_CREATE + " " + $store.getters.GET_HOLIDAY
                }}
              </div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <!-- <form v-on:submit.prevent="submitUserForm">-->
            <form @submit.prevent="submitHolidayForm" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_PURPOSE }}
                        <span style="color: red">*</span>
                      </label>
                      <input
                        id="department_name"
                        v-model="purpose"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_add_holiday && error_add_holiday.purpose,
                        }"
                      />

                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            error_add_holiday && error_add_holiday.purpose,
                        }"
                        v-if="error_add_holiday && error_add_holiday.purpose"
                      >
                        {{ error_add_holiday.purpose[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 position-relative form-group">
                    <label>
                      {{
                        $store.getters.GET_HOLIDAY +
                        " " +
                        $store.getters.GET_TYPE
                      }}
                      <span style="color: red">*</span>
                    </label>
                    <select
                      name="select"
                      id="type"
                      v-model="type"
                      type="choice"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          error_add_holiday && error_add_holiday.type,
                      }"
                    >
                      <option value="PRI">
                        {{ $store.getters.GET_PRIVATE }}
                      </option>
                      <option value="PUB">
                        {{ $store.getters.GET_PUBLIC }}
                      </option>
                      <option value="OTH">
                        {{ $store.getters.GET_OTHERS }}
                      </option>
                    </select>
                    <div
                      :class="{
                        'invalid-feedback':
                          error_add_holiday && error_add_holiday.type,
                      }"
                      v-if="error_add_holiday && error_add_holiday.type"
                    >
                      {{ error_add_holiday.type[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    @submit.prevent="submitHolidayForm"
                    class="mt-2 btn btn-successs btn-lg float-right"
                  >
                    {{ $store.getters.GET_SUBMIT}}
                  </button>
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

export default {
  name: "CreateHoliday",
  components: { Master },
  data() {
    return {
      purpose: null,
      type: null,

      error_add_holiday: {
        purpose: null,
        type: null,
      },
    };
  },
  methods: {
    async submitHolidayForm() {
      const response = await axios
        .post("holidays/", {
          purpose: this.purpose,
          type: this.type,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: this.$store.getters.GET_CREATED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            this.$router.push("holiday-list");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.error_add_holiday = error.response.data;
          console.log("--++", error.response);
        });
      console.log(response);
    },
  },
};
</script>

<style scoped></style>
