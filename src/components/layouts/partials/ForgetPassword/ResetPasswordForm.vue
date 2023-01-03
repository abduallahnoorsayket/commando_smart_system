<template>
  <div
    class="
      app-container app-theme-white
      body-tabs-shadow
      fixed-sidebar fixed-header
    "
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-6 col-md-6 m-2">
          <div class="card card-default">
            <div class="card-header">New Password</div>
            <div class="card-body">
              <span class="text-muted font-13"
                >Enter your new password & confirm your new password with the
                form below.
              </span>
              <form
                class="mt-4"
                autocomplete="off"
                @submit.prevent="resetPassword"
                method="post"
              >
                <div class="form-group">
                  <label> New Password <span class="asterisk">*</span></label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="new_password"
                    :class="{
                      'is-invalid': error_data && error_data.new_password,
                    }"
                  />
                  <div
                    :class="{
                      'invalid-feedback': error_data && error_data.new_password,
                    }"
                    v-if="error_data && error_data.new_password"
                  >
                    {{ error_data.new_password[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label
                    >Confirm Password <span class="asterisk">*</span></label
                  >
                  <input
                    type="password"
                    class="form-control"
                    v-model="confirm_password"
                    :class="{
                      'is-invalid': error_data && error_data.confirm_password,
                    }"
                  />
                  <div
                    :class="{
                      'invalid-feedback':
                        error_data && error_data.confirm_password,
                    }"
                    v-if="error_data && error_data.confirm_password"
                  >
                    {{ error_data.confirm_password[0] }}
                  </div>
                </div>
                <div v-if="error_data && error_data.password"
                  class="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  {{ error_data.password[0]}}
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <button type="submit" class="btn btn-successs">Update</button>
              </form>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12 text-center">
              <p>
                Back to
                <router-link :to="{ path: '/' }">
                  <a class="base-color">
                    <b>Log in</b>
                  </a>
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "ResetPasswordForm",
  data() {
    return {
      new_password: null,
      confirm_password: null,
      uuid: null,
      // previous data
      error_data: {
        new_password: null,
        confirm_password: null,
        uuid: null,
      },
    };
  },
  created() {
    this.uuid = this.$route.params.uuid;
  },
  methods: {
    resetPassword() {
      axios
        .post("forgot-password-update/", {
          new_password: this.new_password,
          confirm_password: this.confirm_password,
          uuid: this.uuid,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully reset your passsword..",
          }).then((result) => {
            this.$router.push("/");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.error_data = error.response.data;
          console.log("--++", error.response);
        });
    },
  },
};
</script>
<style scoped>
.container {
  padding: 170px 0px;
}
.card-header {
  display: flex;
  align-items: center;
  border-bottom-width: 1px;
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0.625rem;
  height: 3.5rem;
  background: #69c5a5e0;
  color: white;
  justify-content: space-between;
  text-transform: capitalize;
}
.card {
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 5px;
  border-left: none;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 10%);
}
</style>
