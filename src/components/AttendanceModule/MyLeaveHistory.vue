<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-history icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{
                  $store.getters.GET_MY +
                  " " +
                  $store.getters.GET_LEAVE +
                  " " +
                  $store.getters.GET_HISTORY
                }}
                <router-link
                  :to="{ path: '/add-leaves-request' }"
                  v-if="hasPermission('add_leave')"
                >
                  <a class="float" style="position: absolute; right: 0">
                    <button
                      type="button"
                      class="btn btn-successs"
                      style="font-size: 15px"
                    >
                      <span class="fas fa-plus-square"></span> {{ $store.getters.GET_ADD_NEW }}
                    </button>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="leave_history">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">{{ $store.getters.GET_SL }}</th>
                        <th scope="col">{{ $store.getters.GET_LEAVE+' '+$store.getters.GET_TYPE  }}</th>
                        <th scope="col">{{ $store.getters.GET_TOTAL }}</th>
                        <th scope="col">{{ $store.getters.GET_TOTAL+' '+$store.getters.GET_TAKEN}}</th>
                        <th scope="col">{{ $store.getters.GET_AVAILABLE }}</th>
                      </tr>
                    </thead>
                    <tbody v-if="leave_history.length > 0">
                      <tr
                        v-for="(l_history, SL) in leave_history"
                        :key="l_history.id"
                      >
                        <td>{{ SL + 1 }}</td>
                        <td>{{ l_history.leave_type }}</td>
                        <td v-if="l_history.duration">
                          {{ l_history.duration }} {{ $store.getters.GET_DAYS }}
                        </td>
                        <td v-else>0 {{ $store.getters.GET_DAYS }}</td>
                        <td v-if="l_history.employee_leave_count">
                          {{ l_history.employee_leave_count }} {{ $store.getters.GET_DAYS }}
                        </td>
                        <td v-else>0 {{ $store.getters.GET_DAYS }}</td>
                        <!-- v-if="
                            l_history.duration >= l_history.employee_leave_count
                          " -->
                        <td>
                          {{
                            l_history.duration - l_history.employee_leave_count
                          }}
                          {{ $store.getters.GET_DAYS }}
                        </td>
                      </tr>
                    </tbody>
                    <!--  if No result  -->
                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="8" class="text-center align-middle">
                          <h4>
                            {{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}
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

        <div class="main-card lastActivityCard">
          <h5 class="listTitle">
             {{
                  $store.getters.GET_MY +
                  " " +
                  $store.getters.GET_LEAVE +
                  " " +
                  $store.getters.GET_LIST
                }}
          </h5>
        </div>
        <!-- v-if="all_leaves" -->
        <div class="row mt-4" v-if="my_leaves">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <!-- <LeaveDetailModal v-if="isLeaveDetailModalVisible" /> -->
                <!--Data Table-->
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">{{ $store.getters.GET_SL}}</th>
                        <th scope="col">{{ $store.getters.GET_LEAVE +' '+$store.getters.GET_SUBJECT}}</th>
                        <!-- <th scope="col">Employee Name</th> -->
                        <th scope="col">{{ $store.getters.GET_DATE}}</th>
                        <th scope="col">{{ $store.getters.GET_TOTAL +' '+$store.getters.GET_DAYS}}</th>
                        <th scope="col">{{ $store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}</th>
                        <th scope="col">{{ $store.getters.GET_STATUS}}</th>
                        <th scope="col">{{ $store.getters.GET_BRANCH}}</th>
                        <th scope="col">{{ $store.getters.GET_ACTION}}</th>
                      </tr>
                    </thead>
                    <tbody v-if="my_leaves.length > 0">
                      <tr v-for="(leave, SL) in my_leaves" :key="leave.id">
                        <td>{{ SL + 1 }}</td>
                        <td>{{ leave.leave_subject }}</td>
                        <!-- <td>
                          <span
                            v-if="leave.employee_name"
                          >{{ leave.employee_name.first_name + " " + leave.employee_name.last_name }}</span>
                        </td> -->
                        <td
                          v-if="
                            leave.approved_start_date && leave.approved_end_date
                          "
                        >
                          {{
                            leave.approved_start_date +
                            " to " +
                            leave.approved_end_date
                          }}
                        </td>

                        <td v-else>
                          {{
                            leave.application_start_date +
                            " to " +
                            leave.application_end_date
                          }}
                        </td>
                        <td v-if="leave.approve_day_count">
                          {{ leave.approve_day_count }}
                        </td>
                        <td v-else>{{ leave.apply_day_count }}</td>

                        <td>
                          <span
                            v-if="
                              leave.leave_type && leave.leave_type.leave_type
                            "
                            >{{ leave.leave_type.leave_type }}</span
                          >
                        </td>
                        <td v-if="leave.select_leave_status == 'Approve'">
                          <span class="badge badge-success">{{ $store.getters.GET_APPROVED}}</span>
                        </td>
                        <td v-if="leave.select_leave_status == 'Pending'">
                          <span class="badge badge-warning">{{ $store.getters.GET_PENDING}}</span>
                        </td>
                        <td v-if="leave.select_leave_status == 'Decline'">
                          <span class="badge badge-danger">{{ $store.getters.GET_DECLINE}}</span>
                        </td>
                        <td>
                          <span
                            v-if="leave.leave_type && leave.leave_type.branch"
                            >{{ leave.leave_type.branch.branch_name }}</span
                          >
                        </td>
                        <td class="td_action">
                          <router-link
                            class="item"
                            :to="{
                              name: 'MyLeaveDetails',
                              params: { id: leave.id },
                            }"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>

                          <!-- <router-link
                            class="item"
                            :to="{ name: 'UpdateLeaveReq', params: { id: leave.id } }"
                            v-if="hasPermission('change_leave')"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>

                          <i
                            class="fas fa-trash-alt"
                            @click="deleteAllLeavesItem(leave.id) in all_leaves"
                            v-if="hasPermission('delete_leave')"
                          ></i> -->
                        </td>
                      </tr>
                    </tbody>

                    <!-- If no results -->
                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="8" class="text-center align-middle">
                          <h4> {{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}</h4>
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
                  >{{ $store.getters.GET_SHOWING}} {{ pagination.showing }} {{ $store.getters.GET_OF}} {{ pagination.count }}</a
                >
              </li>
              <li :class="{ disabled: !pagination.previous }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.previous)"
                  >{{ $store.getters.GET_PREVIOUS}}</a
                >
              </li>

              <li :class="{ disabled: !pagination.next }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.next)">{{ $store.getters.GET_NEXT}}</a>
              </li>
            </ul>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import permissions from "../../authorization/permissions";

export default {
  name: "MyLeaveHistory",
  components: { Master },
  data() {
    return {
      leave_history: null,
      // my leave list
      my_leaves: null,
      // for filter
      leave_subject: null,
      application_start_date: null,
      application_end_date: null,
      select_leave_status: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },
  async created() {
    // await this.GetLeaveHistoryList();
    await this.initialLoad();
  },
  updated() {
    this.initialLoad();
  },
  methods: {
    initialLoad: function () {
      this.GetMyLeavesList();
      this.GetLeaveHistoryList();
      // this.loadBranch();
      // this.getEmployeeName();
    },
    GetLeaveHistoryList: function () {
      axios.get("leave-history/").then((response) => {
        this.leave_history = response.data;
      });
    },
    loadBranch: function () {
      axios.get("branch-short-list/", {}).then(
        function (response) {
          this.all_branches = response.data;
        }.bind(this)
      );
    },

    getEmployeeName: function () {
      axios
        .get("users-short-list/", {
          params: {
            branch: this.branch /*branch link with user by params*/,
          },
        })
        .then(
          function (response) {
            this.all_employees = response.data;
          }.bind(this)
        );
    },

    getLeaveType: function () {
      axios
        .get("leave-type-short-list/", {
          params: {
            branch: this.branch,
          },
        })
        .then(
          function (response) {
            this.all_leaveTypes = response.data;
          }.bind(this)
        );
    },

    GetMyLeavesList: function () {
      var queryParam = {
        // branch: this.$route.query.branch,
        leave_subject: this.$route.query.leave_subject,
        // employee_name: this.$route.query.employee_name,
        application_start_date: this.$route.query.application_start_date,
        // application_end_date: this.$route.query.application_end_date,
        // leave_type: this.$route.query.leave_type,
        select_leave_status: this.$route.query.select_leave_status,
        page: this.$route.query.page,
      };

      axios
        .get("my-leave-list/", {
          params: queryParam,
        })
        .then((response) => {
          this.my_leaves = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
        });
    },

    deleteAllLeavesItem: function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("leaves/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetMyLeavesList();
            }
          });
          Swal.fire("Deleted!", "leave has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "leave has not been deleted !", "error");
        }
      });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchLeave();
    },
    async searchLeave() {
      await this.$router.push({
        path: "all-leaves",
        query: {
          leave_subject: this.leave_subject,
          // employee_name: this.employee_name,
          application_start_date: this.application_start_date,
          // application_end_date: this.application_end_date,
          // leave_type: this.leave_type,
          select_leave_status: this.select_leave_status,
          // branch: this.branch,
          page: this.pagination.page,
        },
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
.table td {
  padding: 0.55rem 0.5rem !important;
  vertical-align: middle;
  border-top: 1px solid #e9ecef;
}
/* my leave -list */
h5,
.h5 {
  margin-bottom: 0px !important;
}
.lastActivityCard {
  background: #e6f7f4;
  padding: 10px;
  border-left: 2px solid #69c5a5;
}
</style>
