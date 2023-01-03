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
              <div>{{ $store.getters.GET_UPDATE +' '+$store.getters.GET_DEPARTMENT}}</div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="EditDepartment" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_DEPARTMENT +' '+$store.getters.GET_NAME}}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="department_name"
                        type="text"
                        class="form-control"
                        :class="{'is-invalid':department_error_data && department_error_data.department_name}"
                      />

                      <!--error handling-->
                      <div
                        :class="{'invalid-feedback':department_error_data && department_error_data.department_name}"
                        v-if="department_error_data && department_error_data.department_name"
                      >{{department_error_data.department_name[0] }}</div>
                    </div>
                  </div>

                  <div class="col-md-6 position-relative form-group">
                    <label>
                        {{ $store.getters.GET_DEPARTMENT +' '+$store.getters.GET_CODE}}
                      <span class="asterisk">*</span>
                    </label>
                    <input
                      v-model="department_code"
                      type="text"
                      class="form-control"
                       :class="{'is-invalid':department_error_data && department_error_data.department_code}"
                    />
                    <!--error handling-->
                      <div
                        :class="{'invalid-feedback':department_error_data && department_error_data.department_code}"
                        v-if="department_error_data && department_error_data.department_code"
                      >{{department_error_data.department_code[0] }}</div>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    @submit.prevent="EditDepartment"
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

export default {
  name: "UpdateDepartment",
  components: { Master },
  data() {
    return {
      department_name: null,
      department_code: null,

      department_error_data: {
        department_name: null,
        department_code: null,
      },
    };
  },
  methods: {
    getDepartmentData: function () {
      axios.get(`departments/${this.$route.params.id}/`).then(
        (response) => {
          this.department_name = response.data.department_name;
          this.department_code = response.data.department_code;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    EditDepartment() {
      axios
        .put("departments/" + this.$route.params.id + "/", {
          department_name: this.department_name,
          department_code: this.department_code,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
          text: this.$store.getters.GET_UPDATED +' '+this.$store.getters.GET_SUCCESSFULLY  +" ...",
          }).then((response) => {
            this.$router.push({ name: "DepartmentList" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          this.department_error_data = error.response.data;
        });
    },
  },
  created() {
    this.getDepartmentData();
  },
};
</script>

<style scoped>
</style>