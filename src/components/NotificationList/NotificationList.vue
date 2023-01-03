<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="axiosForm">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-bell icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                All Notifications
                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                </div>-->
                <router-link :to="{ path: '/dashboard' }">
                  <a class="float" style="position: absolute; right: 0">
                    <i
                      class="fas fa-arrow-alt-circle-left"
                      style="color: #69c5a5; font-size: 33px; width: 50px"
                      title="Go to dashboard"
                    ></i>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="loader" v-if="loading"></div>
        <div
          class="containerNotification"
          v-if="notification_list && notification_list.length > 0"
        >
          <div class="row">
            <div class="col-lg-12 right">
              <div class="box shadow-sm rounded bg-white mb-3">
                <div class="box-title border-bottom p-3">
                  <!-- <div class="float-right">
                    <button class="btn btn-base btn-sm">All</button>
                    <button class="btn btn-base btn-sm ml-2">Unseen</button>
                  </div> -->
                  <!-- <h6 class="m-0">Notifications</h6> -->
                  <!-- Nav pills -->
                  <div class="d-flex justify-content-center py-3 py-lg-0">
                    <ul class="nav nav-pills" role="tablist">
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          data-toggle="pill"
                          @click="searchNotification((seen = null))"
                          >All</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          data-toggle="pill"
                          @click="searchNotification((seen = false))"
                          >Unseen</a
                        >
                      </li>
                      <!-- <li class="nav-item">
                        <a class="nav-link" data-toggle="pill" href="#menu2"
                          >Menu 2</a
                        >
                      </li> -->
                    </ul>
                  </div>
                </div>
                <div class="box-body p-0">
                  <div class="row">
                    <div class="col-md-12">
                      <template
                        v-for="(notification, k) in notification_list"
                        :key="k"
                      >
                        <div
                          class="p-3 d-flex align-items-center border-bottom osahan-post-header"
                        >
                          <div class="dropdown-list-image mr-3">
                            <img
                              class="rounded-circle"
                              v-if="
                                notification.created_by &&
                                notification.created_by.user_profile &&
                                notification.created_by.user_profile.image
                              "
                              :src="notification.created_by.user_profile.image"
                              alt
                            />
                            <img
                              v-else
                              class="rounded-circle"
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              alt
                            />
                          </div>
                          <div
                            class="font-weight-normal mr-3 cursor_notification"
                            @click="notificationDetails(notification)"
                            :class="{
                              unseen: notification && notification.is_seen,
                            }"
                          >
                            <div
                              class="text-truncate"
                              v-if="notification.message"
                            >
                              {{ notification.message }}
                            </div>
                            <div
                              class="small"
                              v-if="notification.calculated_time"
                            >
                              <!-- {{ notification.calculated_time }} -->
                              <!-- {{ notification.calculated_time.split(":")[0]-6+':'+notification.calculated_time.split(":")[1] }} hrs ago -->
                              {{
                                notification.calculated_time.split(":")[0] -
                                6 +
                                ":" +
                                notification.calculated_time
                                  .split(":")[1]
                                  .split(".")[0]
                              }}
                              hrs ago
                            </div>
                          </div>
                          <span class="iconContainer ml-auto mr-4">
                            <i
                              class="fas fa-eye-slash"
                              v-if="!notification.is_seen"
                            ></i>
                          </span>
                          <span class="mb-0">
                            <div class="btn-group">
                              <button
                                type="button"
                                class="btn btn-light btn-sm rounded"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <!-- <i class="mdi mdi-dots-vertical"></i> -->
                                <i class="fas fa-ellipsis-v"></i>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right">
                                <button
                                  class="dropdown-item"
                                  type="button"
                                  v-if="!notification.is_seen"
                                  @click="markAsSeen(notification)"
                                >
                                  <i class="mdi mdi-check mr-2"></i> Mark as
                                  seen
                                </button>
                                <button
                                  class="dropdown-item"
                                  type="button"
                                  v-if="notification.is_seen"
                                  @click="markAsUnSeen(notification)"
                                >
                                  <i class="mdi mdi-check mr-2"></i> Mark as
                                  Unseen
                                </button>
                                <!-- v-if="notification.is_seen" -->
                                <button
                                  class="dropdown-item"
                                  type="button"
                                  @click="
                                    deleteData(notification.id) in
                                      notification_list
                                  "
                                >
                                  <i class="mdi mdi-check mr-2"></i>Delete
                                </button>
                                <!-- <button class="dropdown-item" type="button">
                      <i class="mdi mdi-close"></i> Turn Off
                    </button> -->
                              </div>
                            </div>
                          </span>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <ul class="pagination">
                <li class="page-item">
                  <a href="#"
                    >Showing {{ pagination.showing }} of
                    {{ pagination.count }}</a
                  >
                </li>
                <li
                  :class="{ disabled: !pagination.previous }"
                  class="page-item"
                >
                  <a href="#!" v-on:click="setPage(pagination.previous)"
                    >Previous</a
                  >
                </li>

                <li :class="{ disabled: !pagination.next }" class="page-item">
                  <a href="#!" v-on:click="setPage(pagination.next)">Next</a>
                </li>
              </ul>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-2"></div>
          </div>
        </div>
        <div v-else class="alert alert-success" role="alert">
          {{
            $store.getters.GET_NO_DATA_FOUND +
            " " +
            $store.getters.GET_EXCLAMATION_MARK
          }}
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import NAVIGATE from "./Navigation";
import Master from "../layouts/Master";
export default {
  name: "NotificationList",
  components: { Master },
  data() {
    return {
      loading: false,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
      notification_list: null,
      seen: null,
    };
  },
  created() {
    this.initialLoad();
    console.log("created");
  },
  watch: {
    $route(to, from) {
      console.log("to", to);
      console.log("from", from);
      this.GetNotificationList();
    },
  },
  methods: {
    initialLoad: function () {
      this.GetNotificationList();
    },
    notificationDetails: function (notification) {
      if (notification.is_seen) {
        this.goToNotificationPage(notification);
      } else {
        this.markAsSeen(notification);
        this.goToNotificationPage(notification);
      }
    },
    goToNotificationPage: function (notification) {
      let redirect_path =
        NAVIGATE[
          notification.content_type.app_label +
            "__" +
            notification.content_type.model
        ];
      this.$router.push(`/${redirect_path}/` + notification.object_id);
      // this.$router.push(`/notice-details/` + notification.object_id);
    },
    GetNotificationList: function () {
      this.loading = true;
      var queryParam = {
        seen: this.$route.query.seen,
        page: this.$route.query.page,
      };
      axios
        .get("notification/", {
          params: queryParam,
        })
        .then((response) => {
          this.notification_list = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
          console.log(response.status);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteData: function (id) {
      Swal.fire({
        title: this.$store.getters.GET_ARE_YOU_SURE,
        text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("notification/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetNotificationList();
            }
            this.$store.dispatch("notification/getTotalUnseen");
          });
          Swal.fire(
            this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              " ...",
            "success"
          );
        } else {
          Swal.fire(
            this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +
              " " +
              this.$store.getters.GET_DELETED +
              " ...",
            "error"
          );
        }
      });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchNotification();
    },
    searchNotification() {
      this.$router.push({
        path: "notification-list",
        query: {
          // content_type: this.content,
          // message: this.message,
          // object_id: this.object_id,
          // created_by: this.created_by,
          page: this.pagination.page,
          seen: this.seen,
        },
      });
    },
    markAsSeen: function (notification) {
      axios
        .patch(`notification/${notification.id}/`, {
          is_seen: true,
        })
        .then(() => {
          this.GetNotificationList();
          // this.$store.commit("notification/TOTAL_UNSEEN_UPDATED");
          this.$store.dispatch("notification/getTotalUnseen");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    markAsUnSeen: function (notification) {
      axios
        .patch(`notification/${notification.id}/`, {
          is_seen: false,
        })
        .then(() => {
          this.GetNotificationList();
          this.$store.dispatch("notification/getTotalUnseen");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
body {
  margin-top: 20px;
  /* background-color: #f0f2f5; */
}
.dropdown-list-image {
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
}
.dropdown-list-image img {
  height: 2.5rem;
  width: 2.5rem;
}
.btn-light {
  color: #2cdd9b;
  background-color: #e5f7f0;
  border-color: #d8f7eb;
}
.small {
  font-size: 80%;
  font-weight: 600;
  color: #69c5a5;
}
h6,
.h6 {
  font-size: 1rem;
  font-weight: 600;
}
.fa-eye-slash:before {
  color: #69c5a5;
}
.fa-ellipsis-v:before {
  content: "\f142";
  font-size: 14px;
  color: #69c5a5;
}
hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* nav tab  view */
.nav-item .nav-link {
  color: #69c5a5;
}
.nav-pills .nav-link.active {
  background: #69c5a5 !important;
  color: white !important;
}
.nav-pills,
.nav-tabs {
  margin-bottom: 0rem;
  border: 1px solid #69c5a5;
  border-radius: 0.25rem;
}
.nav-item {
  margin: 0px 0px 0px 0px !important;
}
.nav-pills .nav-link {
  border-radius: 0rem;
}
.nav-pills .nav-link:hover {
  color: #69c5a5 !important;
}
.nav-pills .nav-link.active:hover {
  background: #69c5a5 !important;
  color: white !important;
}
/* .nav-pills .nav-link .active:hover {
  color: #69c5a5 !important;
} */
.cursor_notification {
  cursor: pointer;
}
.font-weight-normal {
  font-weight: 500 !important;
}
.text-truncate {
  /* overflow: hidden;
    text-overflow: ellipsis; */
  white-space: normal !important;
}
/* .unseen {
  color: #16181b;
  text-decoration: none;
  border-bottom: 1px solid white;
  opacity: 0.62;
} */
.dropdown-menu {
  min-width: 10.5rem !important;
}
</style>
