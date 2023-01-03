<template>
  <div
    class="
      app-container app-theme-white
      body-tabs-shadow
      fixed-sidebar fixed-header
    "
    id="axiosForm"
  >
    <div class="container" >
      <!-- loader div -->
   <div class="loader" v-if="loading"></div>
      <div class="text-center pb-1"></div>
      <div class="row justify-content-center mt-2">
        <div class="col-sm-6 col-md-6 m-2">
          <div
            v-if="success_message"
            class="alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <strong>Hello !!</strong> {{ success_message }}.
            <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="card card-default">
            <div class="card-header">Reset Password</div>
            <div class="card-body">
              <span class="text-muted font-13"
                >Enter your email address and we'll send you an email with
                instructions to reset your password.
              </span>
              <form
                class="mt-4"
                autocomplete="off"
                @submit.prevent="requestResetPassword"
                method="post"
              >
                <fieldset :disabled="loading">
                  <div class="form-group">
                    <label>E-mail <span class="asterisk">*</span></label>
                    <input
                      type="email"
                      class="form-control"
                      v-model="username"
                      required
                      :class="{
                        'is-invalid': error_data && error_data.username,
                      }"
                    />
                    <div
                      :class="{
                        'invalid-feedback': error_data && error_data.username,
                      }"
                      v-if="error_data && error_data.username"
                    >
                      {{ error_data && error_data.username[0] }}
                    </div>
                  </div>
                  <div
                    v-if="error_data && error_data.length > 0"
                    class="alert alert-danger alert-dismissible fade show"
                    role="alert"
                  >
                    Invalid email address.
                    <button
                      type="button"
                      class="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <button type="submit" class="btn btn-successs">
                    Send Password Reset Link
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-3">
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
</template>

<script>
import axios from "axios";
// import Swal from "sweetalert2";

export default {
  name: "ForgotPassword",
  data() {
    return {
      loading: false,
      username: null,
      success_message: null,
      has_error: false,
      error_data: {
        username: null,
      },
    };
  },
  methods: {
    requestResetPassword() {
      (this.loading = true),
        axios
          .post("forgot-password-request/", {
            username: this.username,
          })
          .then((response) => {
            this.reset();
            this.success_message = response.data.success;
            console.log("--++", response);
          })
          .catch((error) => {
            this.error_data = error.response.data;
          })
          .finally(() => {
            this.loading = false;
          });
    },
    reset() {
      this.username = null;
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
/* for loader  */
#axiosForm{  /* Components Root Element ID */
    position: relative;
}
.loader{  /* Loader Div Class */
    position: absolute;
    top:0px;
    right:0px;
    width:100%;
    height:100%;
    background-color:#eceaea;
    background-image: url('../../../../assets/gifs/Rounded blocks.gif');
    background-size: 100px;
    background-repeat:no-repeat;
    background-position:center;
    z-index:10000000;
    opacity: 0.4;
    filter: alpha(opacity=40);
}
</style>
