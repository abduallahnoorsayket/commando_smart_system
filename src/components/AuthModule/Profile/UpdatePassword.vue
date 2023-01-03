<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-user-plus icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_UPDATE +' '+$store.getters.GET_PROFILE +' '+$store.getters.GET_PASSWORD }}
                <div class="page-title-subheading"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-card card">
          <h5 class="card-title ml-4">{{ $store.getters.GET_UPDATE +' '+$store.getters.GET_PASSWORD }}</h5>

          <div class="card-body">
            <form @submit.prevent="submitUserForm" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <!--old-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class>
                        {{ $store.getters.GET_OLD +' '+$store.getters.GET_PASSWORD }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        id="old_password"
                        v-model="old_password"
                        type="password"
                        class="form-control"
                        :class="{
                          'is-invalid': error_data && error_data.old_password,
                        }"
                        autocomplete="off"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.old_password,
                        }"
                        v-if="error_data && error_data.old_password"
                      >{{ error_data.old_password[0] }}</div>
                    </div>
                  </div>

                  <!--new-->
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class>
                         {{ $store.getters.GET_NEW +' '+$store.getters.GET_PASSWORD }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        id="new_password"
                        v-model="new_password"
                        type="password"
                        class="form-control"
                        :class="{
                          'is-invalid': error_data && error_data.new_password,
                        }"
                        autocomplete="off"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.new_password,
                        }"
                        v-if="error_data && error_data.new_password"
                      >{{ error_data.new_password[0] }}</div>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button class="mt-2 btn btn-successs btn-lg float-right">{{ $store.getters.GET_SUBMIT}}</button>
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
  name: "UpdatePassword",
  components: { Master },
  data() {
    return {
      old_password: null,
      new_password: null,
      error_data: {
        old_password: null,
        new_password: null,
      },
    };
  },
  methods: {
    submitUserForm() {
      axios
        .put("update-password/", {
          old_password: this.old_password,
          new_password: this.new_password,
        })
        .then((response) => {
          if (response.status === 204) {
            Swal.fire(
            this.$store.getters.GET_CHANGED,
            this.$store.getters.GET_UPDATED +' '+this.$store.getters.GET_SUCCESSFULLY +"...",
            "success"
            );
            this.$router.push("/user-profile");
          }
        })
        .catch((error) => {
          this.error_data = error.response.data;
        });
    },
    // end of submit
  },
  //   end of methodss
};
</script>

<style scoped>
</style>