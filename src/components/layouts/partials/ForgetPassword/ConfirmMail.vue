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
        <div class="col-md-8 col-lg-6 col-xl-5">
          <!-- <div class="text-center pb-1">
            <a href="index.html">
              <span
                ><img src="assets/images/logo.png" alt="" height="18"
              /></span>
            </a>
            <h5 class="font-14 text-muted mt-3">
              Bootstrap 4 Responsive Admin Dashboard
            </h5>
          </div> -->
          <div class="card mt-4">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <h5 class="text-uppercase">Success !</h5>
              </div>

              <div class="text-center p-2">
                <div>
                  <i class="mdi mdi-email-open display-4 text-success"></i>
                </div>
                <p class="mt-3 mb-0">
                  An email has been sent to  the <b>mail address</b> you have provided.
                  <!-- <b>youremail@domain.com</b>. -->
                   Please
                  check for an email from company and click on the included link
                  to reset your password.
                </p>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->

          <div class="row mt-4">
            <div class="col-12 text-center">
              <p>
                Back to
                <!-- <a href="pages-login.html" class="text-primary ml-1"
              ><b>Log in</b></a
            > -->
                <router-link :to="{ path: '/' }">
                  <a class="base-color">
                    <b>Log in</b>
                  </a>
                </router-link>
              </p>
            </div>
            <!-- end col -->
          </div>
          <!-- end row -->
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmMail",
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
