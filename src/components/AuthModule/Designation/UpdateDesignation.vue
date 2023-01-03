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
                 {{ $store.getters.GET_UPDATE +' '+$store.getters.GET_DESIGNATION}}
              </div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="EditDesignation" autocomplete="off">
              <div class="form-group row">
                <label class="col-md-2 col-form-label">
                   {{ $store.getters.GET_DESIGNATION +' '+$store.getters.GET_NAME}}
                  <span class="asterisk">*</span>
                </label>
                <div class="col-md-10">
                  <input
                    type="text"
                    class="form-control"
                    v-model="designation_name"
                    :class="{'is-invalid':designation_error_data && designation_error_data.designation_name}"
                  />
                  <!--error handling-->
                  <div
                    :class="{'invalid-feedback':designation_error_data && designation_error_data.designation_name}"
                    v-if="designation_error_data && designation_error_data.designation_name"
                  >{{designation_error_data.designation_name[0] }}</div>
                </div>
              </div>

              <!--  -->
              <div class="form-group">
                <div class="form-group">
                  <button
                    @submit.prevent="EditDesignation"
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
  name: "UpdateDesignation",
  components: { Master },
  data() {
    return {
      designation_name: null,
      designation_error_data: {
        designation_name: null,
      },
    };
  },
  methods: {
    getDesignationData: function () {
      axios.get(`designation/${this.$route.params.id}/`).then(
        (response) => {
          this.designation_name = response.data.designation_name;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    EditDesignation() {
      axios
        .put("designation/" + this.$route.params.id + "/", {
          designation_name: this.designation_name,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:  this.$store.getters.GET_UPDATED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
          }).then((response) => {
            this.$router.push({ name: "DesignationList" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          this.designation_error_data = error.response.data;
          console.log("--++", error.response);
        });
    },
  },
  created() {
    this.getDesignationData();
  },
};
</script>

<style scoped>
</style>