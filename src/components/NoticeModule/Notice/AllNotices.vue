<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="axiosForm">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <!-- <Modal /> -->
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_ALL + " " + $store.getters.GET_NOTICES }}
                <router-link
                  :to="{ path: '/add-new-notice' }"
                  v-if="hasPermission('add_notice')"
                >
                  <a class="float" style="position: absolute; right: 0">
                    <button
                      type="button"
                      class="btn btn-successs"
                      style="font-size: 15px"
                    >
                      <span class="fas fa-plus-square"></span>
                      {{ $store.getters.GET_ADD_NEW }}
                    </button>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div id="accordion" class="acordinContainer">
          <div class="searchFormCard">
            <div
              class="row cursorPointer"
              data-toggle="collapse"
              data-target="#collapseOne1"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div class="col-md-10">
                <div class="float-left headerContaier">
                  <div class="div">
                    <h5>
                      <i class="fa fa-search"></i>
                      &nbsp; {{ $store.getters.GET_SEARCH }}
                      <!-- <span class="text-muted" style="font-size:12px;">(Click for open)</span> -->
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="float-right"></div>
              </div>
              <div class="col-md-1"></div>
            </div>

            <div
              data-parent="#accordion"
              id="collapseOne1"
              aria-labelledby="headingOne"
              class="collapse"
            >
              <hr />
              <div class="card-body">
                <form action @submit.prevent="searchNotice" autocomplete="off">
                  <div class="form-row">
                    <div class="col-md-12">
                      <label>
                        {{
                          $store.getters.GET_NOTICE +
                          " " +
                          $store.getters.GET_SUBJECT
                        }}</label
                      >
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          v-model="notice_title"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-8"></div>
                    <div class="col-md-4">
                      <label></label>
                      <br />
                      <br />

                      <div class="form-group">
                        <button type="submit" class="btn btn-base float-right">
                          {{ $store.getters.GET_SEARCH }}
                          <i class="fa fa-search"></i>&nbsp;
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="loader" v-if="loading"></div>
          <div class="row" v-if="all_notices">
            <div class="col-12">
              <div class="main-card card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">{{ $store.getters.GET_SL }}</th>
                          <th scope="col">{{ $store.getters.GET_SUBJECT }}</th>
                          <th scope="col" width="220px">
                            {{
                              $store.getters.GET_TO +
                              " " +
                              $store.getters.GET_WHOM
                            }}
                          </th>
                          <th scope="col">
                            {{
                              $store.getters.GET_CREATED_DATE +
                              " " +
                              $store.getters.GET_AND +
                              " " +
                              $store.getters.GET_TIME
                            }}
                          </th>
                          <th scope="col" width="120px">
                            {{ $store.getters.GET_ACTION }}
                          </th>
                          <!-- width="80px" -->
                        </tr>
                      </thead>

                      <tbody v-if="all_notices.length > 0">
                        <tr
                          v-for="(notice, SL) in all_notices"
                          :key="notice.id"
                        >
                          <td>{{ SL + 1 }}</td>
                          <td>{{ notice.notice_title }}</td>
                          <td>
                            <span
                              v-if="notice.to_whom.length == 0"
                              class="badge badge-info"
                            >
                              {{
                                $store.getters.GET_ALL +
                                " " +
                                $store.getters.GET_USERS
                              }}
                            </span>
                            <span v-else>
                              <template
                                v-for="(whom, index) in notice.to_whom"
                                :key="index"
                              >
                                <span
                                  v-if="
                                    notice.to_whom && notice.to_whom.length > 1
                                  "
                                >
                                  <span class="badge badge-success mr-1">{{
                                    whom.name
                                  }}</span>
                                  <!-- <span>| </span> -->
                                  <!-- <span v-if="index <= notice.to_whom.length">, </span>
                                <span v-else> </span> -->
                                </span>
                                <span v-else class="badge badge-success">
                                  {{ whom.name }}
                                </span>
                              </template>
                            </span>
                            <!-- {{to_whom}} -->
                            <!-- <template v-for="(whom,id) in notice"  :key="id">
                              {{whom}} 
                            </template>  -->
                          </td>
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
                              <i class="fas fa-eye"></i>
                            </router-link>

                            <router-link
                              v-if="hasPermission('change_notice')"
                              class="item"
                              :to="{
                                name: 'EditNotice',
                                params: { id: notice.id },
                              }"
                            >
                              <i class="fas fa-edit"></i>
                            </router-link>
                            <i
                              v-if="hasPermission('delete_notice')"
                              class="fas fa-trash-alt"
                              @click="
                                deleteNoticeItem(notice.id) in all_notices
                              "
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                      <!-- If no results -->
                      <tbody v-else>
                        <tr style="height: 100px">
                          <td colspan="8" class="text-center align-middle">
                            <h4>
                              {{
                                $store.getters.GET_NO_DATA_FOUND +
                                " " +
                                $store.getters.GET_EXCLAMATION_MARK
                              }}
                            </h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div class="row">
            <div class="col-md-4">
              <ul class="pagination" v-if="pagination.count">
                <li class="page-item">
                  <a href="#"
                    >{{ $store.getters.GET_SHOWING }} {{ pagination.showing }}
                    {{ $store.getters.GET_OF }} {{ pagination.count }}</a
                  >
                </li>
                <li
                  :class="{ disabled: !pagination.previous }"
                  class="page-item"
                >
                  <a href="#!" v-on:click="setPage(pagination.previous)">{{
                    $store.getters.GET_PREVIOUS
                  }}</a>
                </li>

                <li :class="{ disabled: !pagination.next }" class="page-item">
                  <a href="#!" v-on:click="setPage(pagination.next)">
                    {{ $store.getters.GET_NEXT }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-2"></div>
          </div>
        </div>
        <!-- <div v-else>
          No Records !!
        </div>-->
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";
// import Modal from "../Modal.vue";

export default {
  name: "AllNotices",
  components: { Master },
  data() {
    return {
      //   modalOpen: false,
      loading: false,
      notice_title: null,
      all_notices: null,
      to_whom: null,
      branch: null,
      purpose: null,
      type: null,
      all_branchs: null,
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
    // this.pagination.count = this.response.count;
    // this.pagination.next = this.response.next;
    // this.pagination.previous = this.response.previous;
    // this.pagination.showing = this.response.results.length;
  },
  updated() {
    this.initialLoad();
    console.log("updated");
  },

  methods: {
    initialLoad: function () {
      this.GetNoticeList();
      // this.loadBranch();
      // this.loadPupose();
    },

    loadBranch() {
      axios
        .get("branch-short-list/", {})
        .then((response) => {
          this.all_branchs = response.data;
          // this.all_branchs = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadPupose() {
      axios
        .get("branch-holiday-short-list/", {})
        .then((response) => {
          this.all_purposes = response.data.map((element) => {
            return element.holiday.purpose;
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    GetNoticeList: function () {
      this.loading = true;
      var queryParam = {
        notice_title: this.$route.query.notice_title,
        page: this.$route.query.page,
      };
      axios
        .get("notices/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_notices = response.data.results;
          this.to_whom = response.data.results.map((element) =>
            element.to_whom.map((item) => item.name).join(", ")
          );
          // this.to_whom =  response.data.results.to_whom
          // .map((element) => element.name)
          // .join(", ");
          // console.log("511",this.to_whom);
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

    deleteNoticeItem: function (id) {
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
          axios.delete("notices/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetNoticeList();
            }
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
      this.searchNotice();
    },

    searchNotice() {
      this.$router.push({
        path: "all-notices",
        query: {
          notice_title: this.notice_title,
          page: this.pagination.page,
        },
      });

      // this.loadUsers();
      // this.$router.push("/user-list");
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
.table td {
  white-space: normal !important;
}
/* .card{
  border-left: 4px solid #69c5a5;
} */
hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
