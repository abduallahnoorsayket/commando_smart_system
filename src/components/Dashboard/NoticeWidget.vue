<template>
  <div class="row">
    <!-- <div class="col-md-2"></div> -->
    <div class="col-md-12">
      <div class="main-card card">
        <div class="card-body" >
          <div class="table-responsive" >
            <h5 class="d-flex align-items-center mb-3">{{ $store.getters.GET_LATEST_NOTICES }}</h5>
            <table class="table table-hover" >
              <thead>
                <tr>
                  <th scope="col">{{ $store.getters.GET_SL }}</th>
                  <th scope="col">{{ $store.getters.GET_FROM }}</th>
                  <th scope="col">{{ $store.getters.GET_NOTICE+' '+  $store.getters.GET_SUBJECT}}</th>
                  <th scope="col">{{ $store.getters.GET_CREATED_DATE+' '+$store.getters.GET_AND+' '+$store.getters.GET_TIME }}</th>
                  <th scope="col">{{ $store.getters.GET_ACTION }}</th>
                  <!-- width="80px" -->
                </tr>
              </thead>

              <tbody v-if="latest_notices && latest_notices.length > 0 && hasPermission('view_notice')" >
                <tr v-for="(notice, SL) in latest_notices" :key="notice.id" >
                  <td>{{ SL + 1 }}</td>
                  <td >
                   <span v-if="notice.created_by.first_name && notice.created_by.last_name">
                      <span :title="notice.created_by.first_name+' '+notice.created_by.last_name">
                      <img  v-if="notice.created_by && notice.created_by.user_profile && notice.created_by.user_profile.image" width="40" class="rounded-circle" :src="notice.created_by.user_profile.image"  alt="">
                    <img v-else  width="40" class="rounded-circle" src="https://as2.ftcdn.net/jpg/00/65/77/27/500_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" alt="No image">
                    </span>
                   </span>
                   <!-- <span  v-if="notice.created_by && notice.created_by.first_name && notice.created_by.last_name">{{notice.created_by.first_name+' '+notice.created_by.last_name}} </span> -->
                  </td>
                  <td>{{ notice.notice_title }}</td>
                  <td>{{ notice.created_at }}</td>
                  <td class="td_action">
                    <router-link
                     v-if="hasPermission('view_notice')"
                              class="item"
                              :to="{
                                name: 'NoticeDetails',
                                params: { id: notice.id },
                              }"
                            >
                     <button type="button" class="btn btn-successs actionButton">
                      {{ $store.getters.GET_DETAILS }}
                    </button>
                   </router-link>
                  </td>
                </tr>
              </tbody>
              <!-- If no results -->
              <tbody v-else>
                <tr style="height: 230px">
                  <td colspan="8" class="text-center align-middle">
                    <h4>{{ $store.getters.GET_NO+' '+$store.getters.GET_NOTICE+' '+$store.getters.GET_AVAILABLE +' '+$store.getters.GET_EXCLAMATION_MARK }}</h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-md-2"></div> -->
  </div>
</template>

<script>
// import Master from "../../layouts/Master";
import axios from "axios";
// import Swal from "sweetalert2";
import permissions from "../../authorization/permissions";
// import Modal from "../Modal.vue";

export default {
  name: "NoticeWidget",
  //   components: { Master },
  data() {
    return {
      latest_notices:null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },

  created() {
    this.initialLoad();
    console.log("created");
  },
  updated() {
    // this.initialLoad();
    console.log("updated");
  },

  methods: {
    initialLoad: function () {
      this.GetLatestNotices();
      // this.resetOptions();
    },

   
    GetLatestNotices: function () {
      var queryParam = {
        // branch: this.$route.query.branch,
        // type: this.$route.query.type,
        // purpose: this.$route.query.purpose,
        // page: this.$route.query.page,
      };
      axios
        .get("notices/?latest_notice=true", {
          params: queryParam,
        })
        .then((response) => {
          this.latest_notices = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
          console.log(response.status);
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
/* .card{
  border-left: 4px solid #69c5a5;
} */
hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.fa-eye:before {
  content: "\f06e";
  color: #69c5a5 ;
  cursor: pointer;
  padding: 10 px 10 px 10 px 0 px;
}

.btn-successs:hover {
  color: white;
}
.fa-eye:hover{
  content: "\f06e";
  color: white !important;
}
</style>
