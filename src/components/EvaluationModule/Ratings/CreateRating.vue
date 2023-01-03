<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="pe-7s-star icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                 {{ $store.getters.GET_CREATE +' '+$store.getters.GET_RATING}}
              </div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="submitRatingForm" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                         {{ $store.getters.GET_RATING +' '+$store.getters.GET_NAME}}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="name"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            department_error_data && department_error_data.name,}"
                      />
                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            department_error_data && department_error_data.name,
                        }"
                        v-if="
                          department_error_data && department_error_data.name"
                      >{{ department_error_data.name[0] }}</div>
                    </div>
                  </div>

                  <div class="col-md-6 position-relative form-group">
                    <label>
                        {{ $store.getters.GET_RATING +' '+$store.getters.GET_STATUS}}
                      <span class="asterisk">*</span>
                    </label>
                    <select
                      name="select"
                      v-model="status"
                      type="choice"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          department_error_data && department_error_data.status,}"
                    >
                      <option value selected disabled>
                         {{ $store.getters.GET_SELECT +' '+$store.getters.GET_STATUS}}
                      </option>
                      <option value="true">
                         {{ $store.getters.GET_ON}}
                      </option>
                      <option value="false"> {{ $store.getters.GET_OFF}}</option>
                    </select>
                    <div
                      :class="{'invalid-feedback':department_error_data && department_error_data.status,
                      }"
                      v-if="
                        department_error_data && department_error_data.status "
                    >{{ department_error_data.status[0] }}</div>
                    <!--error handling-->
                  </div>
                </div>

                <div class="form-group">
                  <button
                    @submit.prevent="submitRatingForm"
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
// import "../../layouts/authheader";

export default {
  name: "CreateRating",
  components: { Master },
  data() {
    return {
      name: null,
      status: null,
      department_error_data: {
        name: null,
        status: null,
      },
    };
  },
  methods: {
    async submitRatingForm() {
      const response = await axios
        .post("ratings/", {
          name: this.name,
          status: this.status,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: this.$store.getters.GET_CREATED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            this.$router.push("rating-list");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.department_error_data = error.response.data;
          console.log("--++", error.response);
        });
      console.log(response);
    },
  },
};
</script>

<style scoped>
</style>