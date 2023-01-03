<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-eye icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                  {{ $store.getters.GET_LANGUAGE +' '+$store.getters.GET_DETAILS}}
                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                </div>-->
                <router-link :to="{ path: '/all-languages' }"
                 v-if="hasPermission('view_language')">
                  <a class="float" style="position: absolute; right: 0">
                    <i
                      class="fas fa-arrow-alt-circle-left"
                      style="color: #69c5a5; font-size: 33px; width: 50px"
                      title="Back to previous page"
                    ></i>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-12">
                <div class="card mb-3">
                  <div class="card-body" v-if="langDetails">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                            {{ $store.getters.GET_LANGUAGE +' '+$store.getters.GET_NAME}}
                        </h6>
                      </div>
                      <div class="col-sm-3 text-secondary">
                        {{ langDetails.name }}
                      </div>
                      <!-- <div class="col-sm-2">
                        <h6 class="mb-0">Language Code</h6>
                      </div>
                      <div
                        class="col-sm-2 text-secondary"
                      >
                        
                      </div> -->
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                           {{ $store.getters.GET_LANGUAGE +' '+$store.getters.GET_STATUS}}
                        </h6>
                      </div>
                      <div class="col-sm-3 text-secondary">
                        <span
                          v-if="langDetails.status == true"
                          class="badge badge-success"
                        >
                          {{ $store.getters.GET_YES}}</span
                        >
                        <span
                          v-else-if="langDetails.status == false"
                          class="badge badge-danger"
                        >
                          {{ $store.getters.GET_NO}}</span
                        >
                      </div>
                    </div>
                    <hr />
                    <!-- -->
                    <!-- details section  card-->
                    <div class="detail-container">
                      <div class="row">
                        <template
                          v-for="(value, key) in lang_details"
                          :key="key"
                        >
                          <div class="col-sm-3">
                            <h6 class="mb-0">{{ key }}</h6>
                          </div>
                          <div class="col-sm-3 text-secondary" v-if="langDetails && langDetails.details">
                            <!-- <span v-if="lang_response_details[key].default">{{
                              lang_response_details[key].default
                            }}</span> -->
                            <span v-if="lang_response_details[key]">{{
                              lang_response_details[key]
                            }}</span>
                            <span v-else> NA</span>
                          </div>
                           <!-- <div class="col-sm-3 text-secondary" v-if="langDetails && langDetails.details && ">
                            <span v-if="lang_response_details[key].default">{{
                              lang_response_details[key].default
                            }}</span>
                            <span v-else-if="lang_response_details[key]">{{
                              lang_response_details[key]
                            }}</span>
                            <span v-else> NA</span>
                          </div> -->

                        </template>
                      </div>
                    </div>
                    <hr />
                    <div class="row mt-4">
                      <div class="col-md-12">
                        <router-link
                          v-if="hasPermission('change_language')"
                          class="item"
                          :to="{
                            name: 'EditLanguage',
                            params: { id: langDetails.id },
                          }"
                        >
                          <button
                            type="submit"
                            class="btn btn-base float-right"
                          >
                            <i class="fas fa-edit"></i>
                            {{ $store.getters.GET_EDIT +' '+$store.getters.GET_LANGUAGE}}
                          </button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
// import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";
import LangJson from "../../MultilangModule/lang.json";

export default {
  name: "langDetails",
  components: { Master },
  data() {
    return {
      langDetails: null,
      lang_response_details: null,
      notice_response_id: null,
      commentInfo: [],
      to_whom: null,
      leave_error_data: null,
      lang_details: LangJson,
    };
  },

  created() {
    this.initialLoad();
  },
  updated() {
    this.initialLoad();
  },
  methods: {
    initialLoad: function () {
      this.getLangDetails();
    },

    getLangDetails() {
      axios.get(`language/${this.$route.params.id}/`, {}).then((response) => {
        this.langDetails = response.data;
        this.lang_response_details = response.data.details;
        // this.notice_response_id = response.data.id;
        // this.commentInfo = response.data.comments;
        // this.to_whom = response.data.to_whom
        //   .map((element) => element.name)
        //   .join(", ");
      });
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
/* .card {
  margin-bottom: 0px !important;
}

.main-body {
  padding: 15px 0px;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*="col-"] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}
h6 {
  font-size: 13px;
}
h5 {
  color: #69c5a5;
  font-size: 1.1rem;
}
h4 {
  font-size: 1.35rem;
  text-transform: capitalize;
} */
.fa-edit:before {
  content: "\f044";
  color: white;
  cursor: pointer;
  padding: 10px 5px 10px 5px !important;
}
.p-listbox .p-listbox-list {
  /* padding: 0.5rem 0; */
  height: 385px;
  padding: 0.2rem 1.5rem;
}
/*  details card page */
.card {
  margin-bottom: 0px !important;
}

.main-body {
  padding: 15px 0px;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*="col-"] {
  padding-right: 8px;
  padding-left: 8px;
}
.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}
.h-100 {
  height: 100% !important;
}
.shadow-none {
  box-shadow: none !important;
}
h6 {
  font-size: 13px;
}
h5 {
  color: #69c5a5;
  font-size: 1.1rem;
}
h4 {
  font-size: 1.35rem;
  text-transform: capitalize;
}
.fa-edit:before {
  content: "\f044";
  color: white;
  cursor: pointer;
  padding: 10px 5px 10px 5px !important;
}
.detail-container {
  height: 500px;
  overflow-y: scroll;
  overflow-x: auto;
}
</style>
