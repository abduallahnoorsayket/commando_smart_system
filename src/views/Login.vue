<template>
  <div class="form-login-body" cz-shortcut-listen="true">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-12 mx-auto login-desk">
          <div class="row">
            <div class="col-md-7 detail-box">
              <!-- <img class="logo" src="../assets/images/LogInImages/CPL3.png" height="45" width="45" alt />
              <img class="logo" src="../assets/images/LogInImages/ADMIN.png" alt />-->
              <div class="detailsh">
                <img
                  class="help"
                  src="../assets/images/LogInImages/help.png"
                  alt
                />
                <h3>CPL Evaluation Portal</h3>
                <p>
                  To keep connected with us please login with your email address
                  and password
                </p>
              </div>
            </div>

            <div class="col-md-5 loginform">
              <div class="form-header">
                <h3>CPL Evaluation Portal</h3>
              </div>
              <div class="form-contaier">
                <h4>Welcome Back</h4>

                <p>Signin to your Account</p>
                <div class="login-det">
                  <form @submit.prevent="handleSubmit" autocomplete="off">
                    <div class="form-row">
                      <label for>Email</label>
                      <div class="input-group mb-2 mt-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <i class="fa fa-envelope"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter Email"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          v-model="username"
                        />
                      </div>
                    </div>

                    <p
                      class="errorMesssage"
                      v-if="logInError && logInError.username"
                    >
                      This field may not be blank
                    </p>

                    <p
                      class="errorMesssage"
                      v-if="logInError && logInError.non_field_errors"
                    >
                      Provided credentials not correct
                    </p>
                    <div class="form-row">
                      <label for>Password</label>
                      <div class="input-group mb-2 mt-2">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <i class="fas fa-lock"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          class="form-control"
                          placeholder="Enter Password"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          v-model="password"
                        />

                        <!-- <p
                          class="errorMesssage"
                          v-if="logInError && logInError.password"
                        >This field may not be blank</p>
                        <p
                          class="errorMesssage"
                          v-if="logInError && logInError.non_field_errors"
                        >Provided credentials not correct</p>-->
                      </div>
                    </div>
                    <p
                      class="errorMesssage"
                      v-if="logInError && logInError.password"
                    >
                      This field may not be blank
                    </p>

                    <p
                      class="errorMesssage"
                      v-if="logInError && logInError.non_field_errors"
                    >
                      Provided credentials not correct
                    </p>

                    <p class="forget">
                      <!-- <a href="https://www.smarteyeapps.com/demo/login-form-design/">Forget Password?</a> -->
                      <router-link :to="{ path: '/reset-password' }">
                        Forget Password?
                      </router-link>
                    </p>

                    <button
                      @submit.prevent="handleSubmit"
                      class="btn btn-sm btn-danger"
                    >
                      <i v-if="loading" class="fa fa-refresh fa-spin mr-2"></i>
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import * as Swal from "sweetalert2";
// for encryption
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";

ls.config.encrypt = false; // default is false
ls.config.secret = "secret-word"; // global secret

// update encrypter to use AES encryption
ls.config.encrypter = (data, secret) =>
  AES.encrypt(JSON.stringify(data), secret).toString();

// update decrypter to decrypt AES-encrypted data
ls.config.decrypter = (data, secret) => {
  try {
    return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
  } catch (e) {
    // incorrect/missing secret, return the encrypted data instead
    return data;
  }
};

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      username: "",
      password: "",
      logInError: null,
      token_expiry_status: null,
    };
  },
  created() {
    // const token = localStorage.getItem("token");
    // axios
    //   .get("/profiles/me/", {
    //     headers: {
    //       Authorization: `token ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("176", res.status);
    //     this.token_expiry_status = res.status;
    //   });
    // console.log("179", this.token_expiry_status);
    // // .catch((error) => {
    // //   console.log(error);
    // // });
    // if (token && this.token_expiry_status == 200) {
    //   // this.$router.push("dashboard");
    //   window.location.href = "/dashboard";
    // }
    
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      axios
        .post("login/", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);

          localStorage.setItem("id", response.data.id);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("first_name", response.data.first_name);
          localStorage.setItem("last_name", response.data.last_name);
          localStorage.setItem("active_status", response.data.active_status);
          if (response.data.user_profile == null) {
            alert("Not enough information for login !!");
          }
          // user profile start
          localStorage.setItem(
            "user_profile",
            JSON.stringify(response.data.user_profile)
          );
          // if(response.data && response.data.user_profile && response.data.user_profile.branch == null){
          //  alert("User has no branch !")
          // }
          localStorage.setItem(
            "branch_id",
            response.data.user_profile.branch.id
          );
          // if(response.data && response.data.user_profile && response.data.user_profile.department==null){
          //  alert("User has no deparment !")
          // }
          localStorage.setItem(
            "department_id",
            response.data.user_profile.department.id
          );

          // localStorage.setItem(
          //   "branch_id",
          //   JSON.stringify(response.data.user_profile.branch.id)
          // );
          localStorage.setItem(
            "branch_weekly_holiday",
            JSON.stringify(
              response.data.user_profile.branch.branch_weekly_holiday
            )
          );

          // user profile end
          // localStorage.setItem(
          //   "superuser_status",
          //   response.data.superuser_status
          // );
          // for encryption  of superuser status
          ls.set("encrypted_text", response.data.superuser_status, {
            encrypt: true,
          });
          if (
            response.data.superuser_status == true &&
            response.data.first_name == "" &&
            response.data.last_name == ""
          ) {
            alert("Not enough information for login !!");
          }
          localStorage.setItem("groups", JSON.stringify(response.data.groups));
          localStorage.setItem(
            "user_permissions",
            JSON.stringify(response.data.user_permissions)
          );
          localStorage.setItem("token", response.data.token);
          // localStorage.setItem("image", response.data.image);

          // this.$router.push("/dashboard");
          window.location.href = "/dashboard";
          // voicec config data start
          // if(){}
          localStorage.setItem(
            "voice_config",
            JSON.stringify(response.data.voice_config)
          );
          if (!response.data.voice_config == false) {
            localStorage.setItem("accent", response.data.voice_config.accent);
            localStorage.setItem(
              "voice_mode",
              response.data.voice_config.voice_mode
            );
            localStorage.setItem("volume", response.data.voice_config.volume);
            localStorage.setItem("speed", response.data.voice_config.speed);
            localStorage.setItem("is_male", response.data.voice_config.is_male);
            localStorage.setItem("is_on", response.data.voice_config.is_on);
          }
        })
        .catch((error) => {
          // Swal.fire({
          //   icon: "error",
          //   text: "Provided credentials are not correct",
          // }); // swal
          this.logInError = error.response.data;
          console.log("172", this.logInError);
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        }); // catch
    },
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700);
@import url(https://fonts.googleapis.com/css?family=Arimo:300,400,400italic,700,700italic);
/* ===================================== Basic CSS ==================================== */
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
}

img {
  max-width: 100%;
}

a {
  text-decoration: none;
  outline: none;
  color: #444;
}

a:hover {
  color: #444;
}

ul {
  margin-bottom: 0;
  padding-left: 0;
}

a:hover,
a:focus,
input,
textarea {
  text-decoration: none;
  outline: none;
}

.center {
  text-align: center;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.cp {
  cursor: pointer;
}

html,
body {
  height: 100%;
}

p {
  margin-bottom: 0px;
  width: 100%;
}

.no-padding {
  padding: 0px;
}

.no-margin {
  margin: 0px;
}

.hid {
  display: none;
}

.top-mar {
  margin-top: 15px;
}

.h-100 {
  height: 100%;
}

::placeholder {
  color: #747f8a !important;
  font-size: 13px;
  opacity: 0.5 !important;
}

.container-fluid {
  padding: 0px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Open Sans", sans-serif;
  color: #545454;
}

strong {
  font-family: "Open Sans", sans-serif;
}

body {
  background-color: #f1f1f145 !important;
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  color: #6a6a6a;
  overflow-x: hidden;
}

.session-title {
  padding: 30px;
  margin: 0px;
  margin-bottom: 20px;
}
.session-title h2 {
  width: 100%;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
}
.session-title p {
  max-width: 850px;
  text-align: center;
  float: none;
  margin: auto;
  font-size: 0.83rem;
  margin-top: 15px;
}
.session-title span {
  float: right;
  font-style: italic;
}

.inner-title {
  padding: 20px;
  padding-left: 0px;
  margin: 0px;
  margin-bottom: 10px;
  padding-bottom: 0px;
  border-bottom: 1px solid #ccccccc4;
  display: block;
  padding-right: 0px;
}
.inner-title h2 {
  width: 100%;
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid #863dd9;
  padding-bottom: 10px;
  margin-bottom: 0px;
  width: 300px;
}
.inner-title p {
  width: 100%;
  text-align: center;
}
.inner-title .btn {
  float: right;
  margin-top: -38px;
  font-weight: 600;
  font-size: 0.8rem;
}

.page-nav {
  background-size: 100%;
  padding: 68px;
  text-align: center;
  background-color: #eaeaea;
}
.page-nav ul {
  float: none;
  margin: auto;
}
@media screen and (max-width: 992px) {
  .page-nav {
    background-size: auto;
  }
}
@media screen and (max-width: 767px) {
  .page-nav {
    padding-top: 100px;
  }
}
@media screen and (max-width: 356px) {
  .page-nav {
    padding-top: 200px;
  }
}
.page-nav h2 {
  font-size: 28px;
  width: 100%;
  font-weight: 700;
  color: #444;
}
@media screen and (max-width: 600px) {
  .page-nav h2 {
    font-size: 26px;
  }
}
.page-nav ul li {
  float: left;
  margin-right: 10px;
  margin-top: 10px;
  font-size: 16px;
  font-size: 0.93rem;
  font-weight: 600;
  color: #444;
}
.page-nav ul li i {
  width: 30px;
  text-align: center;
  color: #444;
}
.page-nav ul li a {
  color: #444;
  font-size: 0.93rem;
  font-weight: 600;
}

.btn-success {
  background-color: #51be78;
  border-color: #51be78;
}
.btn-success:hover {
  background-color: #51be78 !important;
  border-color: #51be78 !important;
}
.btn-success:active {
  background-color: #51be78 !important;
  border-color: #51be78 !important;
}
.btn-success:focus {
  background-color: #51be78 !important;
  border-color: #51be78 !important;
  box-shadow: none !important;
}

.btn-primary {
  background-color: #01b3a7;
  border-color: #01b3a7;
}
.btn-primary:hover {
  background-color: #01b3a7 !important;
  border-color: #01b3a7 !important;
}
.btn-primary:active {
  background-color: #01b3a7 !important;
  border-color: #01b3a7 !important;
}
.btn-primary:focus {
  background-color: #01b3a7 !important;
  border-color: #01b3a7 !important;
  box-shadow: none !important;
}

.btn {
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}

.form-control:focus {
  box-shadow: none !important;
  border: 0px;
  border: none !important;
}

.btn-light {
  background-color: #fff;
  color: #3f3f3f;
}

.collapse.show {
  display: block !important;
}

.form-control:focus {
  box-shadow: none;
  border: 0px;
}

.form-control {
  background-color: #f8f8f8;
  /* margin-bottom: 20px; */
}
.form-control:focus {
  background-color: #fff;
  border-color: #ccc;
}

.container {
  max-width: 1170px;
}
@media screen and (max-width: 575px) {
  .container {
    padding: 10px 15px;
  }
}

/* ===================================== Login Page Design CSS ==================================== */
.form-login-body {
  /* background-image: url(../images/bg.jpg); */
  background-size: cover;
}
/* @media screen and (max-width: 991px) {
  .form-login-body {
    padding-left: 30px;
    padding-right: 30px;
  }
}
@media screen and (max-width: 480px) {
  .form-login-body {
    padding-left: 15px;
    padding-right: 15px;
  }
} */
.form-login-body .login-desk {
  position: relative;
}
.form-login-body .login-desk .detail-box {
  background-color: #fff;
  padding: 20px;
  height: 100vh;
  position: relative;
}
.form-login-body .login-desk .detail-box .logo {
  width: 130px;
}
.form-login-body .login-desk .detail-box .help {
  /* width: 450px; */
  margin-top: 20px;
  margin-bottom: 10px;
}
.form-login-body .login-desk .detail-box .detailsh {
  text-align: center;
  position: absolute;
  top: 40%;
  transform: translateY(-40%);
  position: absolute;
  right: 130px;
}
.form-login-body .login-desk .detail-box .detailsh h3 {
  /* font-size: 1.2rem; */
  margin-bottom: 15px;
}
/* .form-login-body .login-desk .detail-box .detailsh p {
  font-size: 0.8rem;
} */
.form-login-body .login-desk .loginform {
  background-color: #69c5a5;
  text-align: center;
  color: #fff;
  padding: 50px;
  position: relative;
}
.form-login-body .login-desk .loginform a {
  color: #fff;
}
.form-login-body .login-desk .loginform h4 {
  color: #fff;
  font-size: 1.3rem;
}
.form-login-body .login-desk .loginform p {
  font-size: 0.8rem;
  /* margin-bottom: 50px; */
}
.form-login-body .login-desk .loginform .login-det .form-row {
  margin-top: 20px;
}
.form-login-body .login-desk .loginform .login-det .form-row label {
  font-size: 0.85rem;
}

.form-login-body .login-desk .loginform .login-det .input-group .form-control {
  background-color: #4d9a7df2;
  color: #fff;
  border-left: 0px;
  border: 0px;
  padding-left: 6px;
}
.form-login-body
  .login-desk
  .loginform
  .login-det
  .input-group
  .form-control:focus {
  border: 0px;
}
.form-login-body .login-desk .loginform .login-det .btn-danger {
  width: 100%;
  border-radius: 0px;
  background-color: #fa607e;
  /* background-color: #e695f4cc ; */
  border-radius: 50px;
  margin-top: 40px;
}
.form-login-body .login-desk .loginform .forget {
  text-align: right;
}
.form-login-body .login-desk .loginform .social-link ul {
  float: right;
  margin-top: 30px;
}
.form-login-body .login-desk .loginform .social-link ul li {
  float: left;
  padding: 15px;
  font-size: 0.9rem;
}

::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #fff !important;
}

::-moz-placeholder {
  /* Firefox 19+ */
  color: #fff !important;
}

:-ms-input-placeholder {
  /* IE 10+ */
  color: #fff !important;
}

:-moz-placeholder {
  /* Firefox 18- */
  color: #fff !important;
}
/* new CSS from template ***********/
.btn-group-sm > .btn,
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-contaier {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.errorMesssage {
  color: white;
  /* margin-left: -35px; */
  text-align: left;
}
.form-login-body
  .login-desk
  .loginform
  .login-det
  .input-group
  .input-group-prepend
  .input-group-text {
  background-color: #4d9a7df2;
  color: #ffffffcf;
  border-right: 0px;
  border: 0px;
  height: 38px;
  padding-right: 12px;
  padding-left: 15px;
}
.form-header h3 {
  color: white;
  text-transform: capitalize;
  margin-top: 35px;
  text-align: center;
}
.fa-refresh:before {
  content: "\f021";
  font-size: 14px;
}
/* Add a right margin to each icon */
/* .fa fa-refresh fa-spin {
    margin-left: -12px;
    margin-right: 8px;
  } */
/* .form-login-body .login-desk .loginform h4 */
/* ===================================== Responsive Style CSS ==================================== */
/* @media screen and (min-width: 0px) and (max-width: 736px) {
  .loginform {
    height: 740px;
  }
  .detailsh {
    right: 0px !important;
  }
  .detail-box {
    display: none;
  }
} */
/* for small screen */
@media only screen and (max-width: 767px) {
  .loginform {
    height: 100vh;
  }
  .detailsh {
    /* margin-left: 100px; */
    right: 0px !important;
  }
  .detail-box {
    display: none;
  }
  .form-contaier {
    position: absolute;
    top: 50%;
    left: 50%;
    /* transform: translateY(-50%); */
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}
@media only screen and (max-height: 570px) {
  .form-header {
    display: none;
  }
  /* .form-contaier{
  -ms-transform: translate(-50%, -20%);
    transform: translate(-50%, -20%);
} */
}
@media only screen and (min-width: 767px) {
  div.form-header {
    display: none;
  }
}
/* for Medium  screen */
@media only screen and (min-width: 768px) and (max-width: 991px) {
  .form-login-body .login-desk .detail-box .detailsh {
    text-align: center;
    top: 40%;
    transform: translateY(-40%);
    position: absolute;
    right: 0px;
    margin: 15px;
  }
  .form-contaier {
    position: absolute;
    top: 50%;
    left: 50%;
    /* transform: translateY(-50%); */
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
}

/*  previus responsive works */
/* @media only screen and (min-width: 0px) and (max-width: 736px) {
} */
@media screen and (max-width: 991px) {
  .we-are-making .text-part {
    text-align: center;
  }

  .we-are-making .text-part .count .count-sing {
    margin-bottom: 20px;
  }

  .headwe-nav .container {
    padding: 10px;
  }

  header .headwe-nav .nav-div .navbar-nav .nav-item .nav-link {
    padding: 10px;
    border-right: 0px;
  }
}

/*# sourceMappingURL=style.css.map */
</style>
