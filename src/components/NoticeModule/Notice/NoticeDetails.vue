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
                {{
                  $store.getters.GET_NOTICE + " " + $store.getters.GET_DETAILS
                }}
                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                </div>-->
                <router-link :to="{ path: '/all-notices' }">
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
        <div
          class="containerNotice"
          v-if="noticeDetails && noticeDetails != null"
        >
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-12">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info"></i>
                      {{
                        $store.getters.GET_NOTICE +
                        " " +
                        $store.getters.GET_DETAILS +
                        " " +
                        $store.getters.GET_INFORMATION
                      }}
                    </h5>
                    <hr />
                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">
                          {{
                            $store.getters.GET_NOTICE +
                            " " +
                            $store.getters.GET_SUBJECT
                          }}
                        </h6>
                      </div>
                      <div
                        v-if="noticeDetails.notice_title"
                        class="col-sm-10 text-secondary"
                      >
                        {{ noticeDetails.notice_title }}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">
                          {{
                            $store.getters.GET_NOTICE +
                            " " +
                            $store.getters.GET_DESCRIPTION
                          }}
                        </h6>
                      </div>
                      <div
                        v-if="noticeDetails.notice_body"
                        class="col-sm-10 text-secondary"
                      >
                        <!-- <div class="row">
                        <div class="col-md-4">
                           <img
                          class="media-object"
                          src="https://bootdey.com/img/Content/avatar/avatar1.png"
                          alt
                          height="200"
                          width="200"
                        />

                        </div>
                        <div class="col-md-8">
                          <span v-html="leaves.leave_description"></span>
                        </div>
                      </div> -->

                        <span v-html="noticeDetails.notice_body"></span>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">{{ $store.getters.GET_FROM }}</h6>
                      </div>
                      <div
                        v-if="
                          noticeDetails.created_by &&
                          noticeDetails.created_by.first_name &&
                          noticeDetails.created_by.last_name
                        "
                        class="col-sm-10 text-secondary"
                      >
                        {{
                          noticeDetails.created_by.first_name +
                          " " +
                          noticeDetails.created_by.last_name
                        }}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">
                          {{
                            $store.getters.GET_TO +
                            " " +
                            $store.getters.GET_WHOM
                          }}
                        </h6>
                      </div>
                      <div
                        v-if="to_whom.length == 0"
                        class="col-sm-10 text-secondary"
                      >
                        <span class="badge badge-info">
                          {{
                            $store.getters.GET_ALL +
                            " " +
                            $store.getters.GET_USERS
                          }}</span
                        >
                      </div>
                      <div v-else-if="to_whom" class="col-sm-10 text-secondary">
                        <template v-for="(whom, index) in to_whom" :key="index">
                          <span class="badge badge-success mr-1">{{
                            whom.name
                          }}</span>
                        </template>
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">
                          {{
                            $store.getters.GET_CREATED_DATE +
                            " " +
                            $store.getters.GET_AND +
                            " " +
                            $store.getters.GET_TIME
                          }}
                        </h6>
                      </div>
                      <div
                        v-if="noticeDetails.created_at"
                        class="col-sm-4 text-secondary"
                      >
                        {{ noticeDetails.created_at }}
                      </div>
                      <div class="col-sm-2">
                        <h6 class="mb-0">Updated Date & Time</h6>
                      </div>
                      <div
                        v-if="noticeDetails.updated_at"
                        class="col-sm-4 text-secondary"
                      >
                        {{ noticeDetails.updated_at }}
                      </div>
                    </div>

                    <div class="row mt-5">
                      <div class="col-md-12">
                        <router-link
                          v-if="hasPermission('change_notice')"
                          class="item"
                          :to="{
                            name: 'EditNotice',
                            params: { id: noticeDetails.id },
                          }"
                        >
                          <button
                            type="submit"
                            class="btn btn-base float-right"
                          >
                            <i class="fas fa-edit"></i>
                            {{
                              $store.getters.GET_EDIT +
                              " " +
                              $store.getters.GET_NOTICE
                            }}
                          </button>
                        </router-link>

                        <!-- <router-link :to="{ name: 'UpdateProfile', params: { id: user.id }   }">
                          <button type="button" class="btn btn-base btn-sm mr-2">Approve leave</button>
                        </router-link>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="row">
            <div class="col-md-12">
              <notice-comment @load-comment="CommentLoad" v-if="notice_response_id" :noticeID ="notice_response_id" :comment_info="commentInfo"/>
            </div>
          </div> -->
          <div class="row">
            <div class="col-sm-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-12">
                      <div>
                        <ul class="nav nav-tabs" role="tablist">
                          <li class="nav-item">
                            <a
                              class="nav-link active"
                              id="home-tab"
                              data-toggle="tab"
                              href="#home"
                              role="tab"
                              aria-controls="home"
                              aria-selected="false"
                            >
                              <span class="d-block d-sm-none"
                                ><i class="fa fa-home"></i
                              ></span>
                              <span class="d-none d-sm-block">Comments</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              id="profile-tab"
                              data-toggle="tab"
                              href="#profile"
                              role="tab"
                              aria-controls="profile"
                              aria-selected="false"
                            >
                              <span class="d-block d-sm-none"
                                ><i class="fa fa-user"></i
                              ></span>
                              <span class="d-none d-sm-block">Files</span>
                            </a>
                          </li>
                        </ul>

                        <div class="tab-content p-3 border border-top-0">
                          <div
                            class="tab-pane active"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            <CommentPost
                              v-if="
                                notice_response_id && notice_content_type_id
                              "
                              :content_type_id="notice_content_type_id"
                              :object_id="notice_response_id"
                            />
                          </div>
                          <div
                            class="tab-pane"
                            id="profile"
                            role="tabpanel"
                            aria-labelledby="profile-tab"
                          >
                            <!-- <FileUploader
                          v-if="project_id"
                          :content_type_id="content_type_id"
                          :object_id="object_id"
                        /> -->
                            <FilePost
                              v-if="
                                notice_response_id && notice_content_type_id
                              "
                              :content_type_id="notice_content_type_id"
                              :object_id="notice_response_id"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- end col -->
                  </div>
                  <!-- end row -->
                </div>
              </div>
            </div>
            <!-- end col -->
          </div>
        </div>

        <!-- <div v-else class="alert alert-success" role="alert">
          This notice has been deleted!
        </div> -->
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import CommentPost from "../../layouts/partials/CommentPost.vue";
import FilePost from "../../layouts/partials/FilePost.vue";
import axios from "axios";
// import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";
// import NoticeComment from "../Notice/NoticeComment.vue";

export default {
  name: "NoticeDetails",
  components: {
    Master,
    CommentPost,
    FilePost,
    // NoticeComment
  },
  data() {
    return {
      all_content: null,
      notice_content_type_id: null,
      noticeDetails: null,
      notice_response_id: null,
      commentInfo: [],
      to_whom: null,
      leave_error_data: null,
      noDetailsFound: null,
    };
  },

  created() {
    this.initialLoad();
  },
  updated() {
    this.initialLoad();
  },
  // watch: {
  //   $route(to, from) {
  //     console.log("to", to);
  //     console.log("from", from);
  //     this.getNoticeDetails();
  //   },
  // },
  methods: {
    initialLoad: function () {
      this.getNoticeDetails();
      this.loadContentType();
      // this.notice_id = this.$route.params.id;
    },
    // async CommentLoad() {
    //   this.notice_response_id = null;
    //   await this.getNoticeDetails();
    // },
    /*load Content types*/
    loadContentType() {
      axios
        .get("content-types/", {})
        .then((response) => {
          this.all_content = response.data;
          this.all_content.map((element) => {
            if (element.model === "notice") {
              this.notice_content_type_id = element.id;
            }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getNoticeDetails() {
      axios
        .get(`notices/${this.$route.params.id}/`, {})
        .then((response) => {
          this.noticeDetails = response.data;
          // this.noDetailsFound = response.data.detail;
          this.notice_response_id = response.data.id;
          this.commentInfo = response.data.comments;
          this.to_whom = response.data.to_whom;
          // this.to_whom = response.data.to_whom
          //   .map((element) => element.name)
          //   .join(" ");
        })
        .catch(function (error) {
          if (error.response.status == 404) {
            window.location.href = "/error-page";
            // window.location.replace("/error-page");
            // window.open("", "_parent", "");
            // window.close();
            // window.open("/error-page");
            // window.open("", "_parent", "");
            // this.newWindow("NoticeDetails.vue", "NoticeDetails");
          }
        });
    },
    // newWindow(fileName, windowName) {
    //   // msgWindow = window.open(fileName, windowName);
    //    window.open(fileName, windowName);
    // },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
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
/* custom navbar  */
.nav-tabs {
  background: white;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
}
.nav-tabs .nav-link:hover {
  color: #69c5a5 !important;
}
.nav-item .nav-link {
  color: #69c5a5 !important;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: white !important;
  background-color: #69c5a5 !important;
}
.nav-tabs .nav-link,
.nav-tabs .nav-link {
  border-color: #e9ecef #e9ecef #dee2e6;
}
</style>
