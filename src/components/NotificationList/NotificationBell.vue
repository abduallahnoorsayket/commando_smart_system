<template>
  <div class="btn-group">
    <a
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      class="p-0 btn"
      @click="latestNotificationList()"
    >
      <i class="pe-7s-bell mr-3 mt-1 opacity-8"></i>
      <span
        class="badge badge-danger rounded-circle noti-icon-badge UnseenCount"
        v-if="totol_unseen_count"
        >{{ totol_unseen_count }}</span
      >
      <span
        class="badge badge-danger rounded-circle noti-icon-badge UnseenCount"
        v-else
        >0</span
      >
    </a>
    <div
      tabindex="-1"
      role="menu"
      aria-hidden="true"
      class="dropdown-menu dropdown-menu-right notification-menu"
    >
      <div class="notification-heading">
        <h5 class="menu-title notification-title">Notifications</h5>
        <h5 class="menu-title pull-right">
          <router-link class="ViewALLcolor" :to="{ name: 'NotificationList' }"
            >View all<i class="glyphicon glyphicon-circle-arrow-right"></i
          ></router-link>
        </h5>
      </div>
      <div class="notifications-wrapper">
        <a class="content" href="#" v-if="computedObj">
          <div
            class="notification-item"
            v-for="(notification, k) in computedObj"
            :key="k"
          >
            <div class="row rowMargin">
              <div class="col-md-2 mr-0">
                <div
                  class="notify-icon"
                  :title="
                    notification.created_by.first_name +
                    ' ' +
                    notification.created_by.last_name
                  "
                >
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
              </div>
              <div class="col-md">
                <div class="row">
                  <div class="col-md-12">
                    <div
                      class="float-left NotifationBodyMargin"
                      @click="notificationDetails(notification)"
                      :class="{ unseen: notification && notification.is_seen }"
                    >
                      <h4
                        class="item-title"
                        v-if="notification.message"
                        :title="notification.message"
                      >
                        {{ notification.message.slice(0, 28) }}...
                        <!-- {{ notification.message }}... -->
                      </h4>
                      <p class="item-info" v-if="notification.calculated_time">
                        {{
                          notification.calculated_time.split(":")[0] -
                          6 +
                          ":" +
                          notification.calculated_time
                            .split(":")[1]
                            .split(".")[0]
                        }}
                        hrs ago
                      </p>
                    </div>
                    <div
                      class="float-right MarkIcon"
                      v-if="!notification.is_seen"
                      @click="markAsSeen(notification)"
                    >
                      <span class="iconContainer" title="Mark as seen">
                        <i
                          class="fas fa-eye-slash"
                          v-if="!notification.is_seen"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
        <!-- <a class="content" href="#">
          <div class="notification-item">
            <div class="row rowMargin">
              <div class="col-md-2 mr-1">
                <div class="notify-icon">
                  <img
                    class="rounded-circle"
                    src="https://previews.123rf.com/images/gmast3r/gmast3r1503/gmast3r150300010/37887487-businessman-profile-icon-male-portrait-flat.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="col-md">
                <div class="row">
                  <div class="col-md-12">
                    <div class="float-left">
                      <h4 class="item-title">New user resgistered.</h4>
                      <p class="item-info">30 mins ago</p>
                    </div>

                    <div class="float-right mt-0" @click="markAsSeen()">
                      <span class="iconContainer" title="Mark as seen">
                        <i class="fas fa-eye-slash"></i>
                      </span>
                    </div>
                    <span class="float-right mt-0">
                      <button
                        type="button"
                        class="markAsSeenButton btn btn-successs btn-sm"
                      >
                        Mark as seen
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a> -->
      </div>
      <!-- <div class="notification-footer">
                      <h4 class="menu-title">
                        View all<i
                          class="glyphicon glyphicon-circle-arrow-right"
                        ></i>
                      </h4>
                    </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NAVIGATE from "./Navigation";
export default {
  name: "NotificationBell",
  props: {},
  components: {},
  data() {
    return {
      notification_list: [],
      total_unseen: null,
    };
  },

  computed: {
    computedObj() {
      return this.notification_list;
      // return this.limit
      //   ? this.notification_list.slice(0, this.limit)
      //   : this.notification_list;
    },
    totol_unseen_count() {
      if (this.$store.state.notification.total_unseen_updated) {
        return this.$store.state.notification.total_unseen_updated;
      } else {
        return this.total_unseen;
      }
    },
  },

  created() {
    this.getNotificationList();
  },
  updated() {
    // if (this.$store.state.notification.total_unseen_updated) {
    //   console.log("170");
    //   this.latestNotificationList();
    // }
  },
  watch: {
    $route(to, from) {
      console.log("to", to);
      console.log("from", from);
      this.getNotificationList();
    },
  },
  methods: {
    getNotificationList: function () {
      axios
        .get("notification/")
        .then((response) => {
          this.notification_list = response.data.results;
          this.total_unseen = response.data.total_unseen;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    notificationDetails: function (notification) {
      if (notification.is_seen) {
        this.goToNotificationPage(notification);
      } else {
        this.markAsSeen(notification);
        this.goToNotificationPage(notification);
      }
    },
    markAsSeen: function (notification) {
      axios
        .patch(`notification/${notification.id}/`, {
          is_seen: true,
        })
        .then(() => {
          // this.goToNotificationPage(notification);
          this.latestNotificationList();
          this.$store.dispatch("notification/getTotalUnseen");
        })
        .catch(function (error) {
          console.log(error);
        });
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
    latestNotificationList: function () {
      this.getNotificationList();
    },
  },
  // end of method
};
</script>

<style scoped>
/* for Notification Menu */
/* CSS used here will be applied after bootstrap.css */

/* .dropdown {
  display: inline-block;
  margin-left: 20px;
  padding: 10px;
} */

.glyphicon-bell {
  font-size: 1.5rem;
}

.notifications {
  min-width: 420px;
}

.notifications-wrapper {
  overflow: auto;
  max-height: 250px;
}

.menu-title {
  color: #ff7788;
  font-size: 14px;
  display: inline-block;
}

.glyphicon-circle-arrow-right {
  margin-left: 10px;
}

.notification-heading,
.notification-footer {
  padding: 6px 15px;
}

.dropdown-menu.divider {
  margin: 5px 0;
}

.item-title {
  font-size: 14px;
  /* color: #000; */
}

.notifications a.content {
  text-decoration: none;
  background: #ccc;
}

.notification-item {
  padding: 5px 10px 10px 10px;
  margin: 5px 5px -5px 5px;
  /* background: #ccc; */
  border-radius: 4px;
}

.pe-7s-bell:before {
  content: "";
  font-size: 18px;
  color: white;
  font-weight: bold;
}
.notification-title {
  font-size: 16px;
  color: #495057;
  font-weight: 600;
  font-family: Karla, sans-serif;
}
.item-info {
  font-size: 11px;
  color: #6a6363;
  margin-bottom: 0px;
}
.notify-icon {
  float: left;
  height: 36px;
  width: 36px;
  font-size: 18px;
  line-height: 36px;
  text-align: center;
  /* margin-top: 4px; */
  margin-right: 10px;
  border-radius: 50%;
}
.notification-menu {
  min-width: 18rem;
  left: -10px;
  padding-top: 15px;
}
a:hover {
  color: #69c5a5;
  text-decoration: none;
}
.notification-item:hover {
  background: #bababa1f;
}
.notify-icon img {
  height: 2rem;
  width: 2rem;
}

.fa-eye-slash:before {
  color: #69c5a5;
}
.markAsSeenButton {
  opacity: 0;
}
.notification-item:hover .markAsSeenButton {
  opacity: 1;
  font-size: 10px !important;
  margin-top: -20px !important;
  padding: 2px 8px !important;
}
.rowMargin {
  margin-bottom: 0px !important;
}
.form-control {
  background: white;
}
.UnseenCount {
  display: inline-block;
  background-color: #e96154;
  border-radius: 50%;
  border: 2px solid #57c5a5;
  position: absolute;
  top: -8px;
  right: 6px;
}
.ViewALLcolor {
  color: #e96154 !important;
}
/* .unseen {
  color: #16181b;
  text-decoration: none;
  border-bottom: 1px solid white;
  opacity: .62;
} */
.dropdown-menu {
  position: absolute;
  will-change: transform;
  top: 0px;
  /* left: -40px !important; */
  transform: translate3d(-256px, 28px, 0px);
  /* right: 50px; */
}
.notification-menu {
  min-width: 20rem;
  /* left: -10px; */
  padding-top: 15px;
}
/* custom Scroll bar */
.scrollbar {
  margin-left: 30px;
  float: left;
  height: 300px;
  width: 65px;
  background: #f5f5f5;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.force-overflow {
  min-height: 450px;
}
/*  */
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  background-color: #f5f5f5;
  border-radius: 10px;
  opacity: 0.4;
  /* background: rgb(158, 165, 171); */
}

::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* background-color: #000000; */
  /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); */
  background-color: #bababab8 !important;
}
/* .MarkIcon {
  margin-top: -21px;
} */
.NotifationBodyMargin {
  margin-right: 3px;
}
.pe-7s-bell:before {
  /* content: ""; */
  font-size: 20px;
  color: white;
  font-weight: bold;
}
</style>
