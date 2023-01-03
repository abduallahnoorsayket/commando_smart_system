<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i
                  class="fas fa-procedures icon-gradient bg-tempting-azure"
                ></i>
              </div>
              <div>
                {{ $store.getters.GET_ALL +' '+$store.getters.GET_LEAVES}}
              </div>
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
        <!-- accordion search -->
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
                      &nbsp; {{ $store.getters.GET_SEARCH}}
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
                <form action @submit.prevent="searchLeave">
                  <div class="form-row">
                    <div class="col-md-4">
                      <label>
                        {{ $store.getters.GET_BRANCH}}
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="branch"
                          v-model="branch"
                          class="form-control"
                          @change="
                            getEmployeeName();
                            getLeaveType();
                          "
                        >
                          <option value>
                             {{$store.getters.GET_SELECT+" "+$store.getters.GET_BRANCH}}
                          </option>
                          <option
                            v-for="brnch in all_branches"
                            :key="brnch.id"
                            :value="brnch.id"
                          >
                            {{ brnch.branch_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label>
                         {{ $store.getters.GET_EMPLOYEE +' '+$store.getters.GET_NAME}}
                      </label>
                      <div class="form-group">
                        <select
                          name="select"
                          v-model="employee_name"
                          class="form-control"
                        >
                          <option value selected>
                            {{$store.getters.GET_SELECT+" "+$store.getters.GET_EMPLOYEE}}
                          </option>
                          <option
                            v-for="employee in all_employees"
                            :key="employee.id"
                            :value="employee.id"
                          >
                            {{ employee.first_name + " " + employee.last_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label>
                         {{ $store.getters.GET_APPLICATION +' '+$store.getters.GET_START+ ' '+ $store.getters.GET_DATE}}
                      </label>
                      <input
                        name="address"
                        id="sdate"
                        v-model="application_start_date"
                        placeholder=" start date"
                        type="date"
                        class="form-control"
                      />
                    </div>
                    <div class="col-md-4">
                      <label>
                        {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_SUBJECT}}
                      </label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          name
                          id
                          v-model="leave_subject"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label for="exampleEmail11" class>  {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}</label>
                      <select
                        name="select"
                        id="type"
                        v-model="leave_type"
                        class="form-control"
                      >
                        <option value>
                           {{$store.getters.GET_SELECT  +' '+$store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}
                        </option>
                        <option
                          v-for="leavetype in all_leaveTypes"
                          :key="leavetype.id"
                          :value="leavetype.id"
                        >
                          {{ leavetype.leave_type }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <label for="exampleEmail11" class
                        >
                        {{ $store.getters.GET_SELECT +' '+$store.getters.GET_LEAVE+ ' '+ $store.getters.GET_STATUS}}</label
                      >

                      <select
                        name="select"
                        id="type"
                        v-model="select_leave_status"
                        type="choice"
                        class="form-control"
                      >
                        <option value>{{ $store.getters.GET_SELECT +' '+$store.getters.GET_LEAVE+ ' '+ $store.getters.GET_STATUS}}</option>
                        <option value="Pending">{{ $store.getters.GET_PENDING}}</option>
                        <option value="Approve">{{ $store.getters.GET_APPROVED}}</option>
                        <option value="Decline">{{ $store.getters.GET_DECLINE}}</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-8">
                      <!-- <div
                        v-if="blankSearch"
                        class="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        Please select a field for search.
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div> -->
                    </div>
                    <div class="col-md-4">
                      <label></label>
                      <div class="form-group">
                        <button type="submit" class="btn btn-base float-right" :disabled="blankSearch">
                             {{ $store.getters.GET_SEARCH}}
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
        <!--All Leave Types-->

        <div class="row mt-4" v-if="all_leaves">
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
                        <th scope="col"> {{ $store.getters.GET_EMPLOYEE +' '+$store.getters.GET_NAME}}</th>
                        <th scope="col">{{ $store.getters.GET_DATE}}</th>
                        <th scope="col">{{ $store.getters.GET_TOTAL +' '+$store.getters.GET_DAYS}}</th>
                        <th scope="col"> {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}</th>
                        <th scope="col">{{ $store.getters.GET_STATUS}}</th>
                        <th scope="col">{{ $store.getters.GET_BRANCH}}</th>
                        <th scope="col">{{ $store.getters.GET_ACTION}}</th>
                      </tr>
                    </thead>
                    <tbody v-if="all_leaves.length > 0">
                      <tr v-for="(leave, SL) in all_leaves" :key="leave.id">
                        <td>{{ SL + 1 }}</td>
                        <td>{{ leave.leave_subject }}</td>
                        <td>
                          <span v-if="leave.employee_name">{{
                            leave.employee_name.first_name +
                            " " +
                            leave.employee_name.last_name
                          }}</span>
                        </td>
                        <!-- if approved date exits -->
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
                          <span v-if="leave && leave.leave_type && leave.leave_type.leave_type">{{
                            leave.leave_type.leave_type
                          }}</span>
                        </td>
                        <!-- <td>{{ leave.select_leave_status }}</td> -->

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
                          <span v-if="leave.leave_type && leave.leave_type.branch">{{
                            leave.leave_type.branch.branch_name
                          }}</span>
                        </td>
                        <td class="td_action">
                          <!-- <i
                            class="fas fa-eye"
                            style="color: black; padding: 10px 10px 10px 0px"
                            @click="OpenModal(leave.id)"
                          ></i>-->
                          <router-link
                            class="item"
                            :to="{
                              name: 'AllLeavesDetails',
                              params: { id: leave.id },
                            }"
                            v-if="hasPermission('view_leave')"
                          >
                            <i class="fas fa-eye"></i>
                          </router-link>

                          <router-link
                            class="item"
                            :to="{
                              name: 'UpdateLeaveReq',
                              params: { id: leave.id },
                            }"
                            v-if="hasPermission('change_leave')"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>

                          <i
                            class="fas fa-trash-alt"
                            @click="deleteAllLeavesItem(leave.id) in all_leaves"
                            v-if="hasPermission('delete_leave')"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                    <!-- If no results -->
                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="9" class="text-center align-middle">
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
                  > {{ $store.getters.GET_SHOWING}} {{ pagination.showing }} {{ $store.getters.GET_OF}} {{ pagination.count }}</a
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
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";
// import LeaveDetailModal from "./LeaveDetailModal";

export default {
  name: "AllLeaves",
  components: {
    Master,
    // ,LeaveDetailModal
  },
  data() {
    return {
      users: null,
      all_leaves: null,
      leave_subject: null,
      employee_name: null,
      leave_type: null,
      all_leaveTypes: null,
      select_leave_status: null,
      application_start_date: null,
      application_end_date: null,
      all_departments: null,
      all_branches: null,
      all_users: null,
      all_employees: null,
      branch: null,
      department: null,
      isSearchField: false,
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
  },
  updated() {
    this.initialLoad();
  },
  // computed: {
  //   isLeaveDetailModalVisible() {
  //     return this.$store.state.attendance.isLeaveDetailModalVisible;
  //   },
  // },
  computed: {
    blankSearch(){
      if (
        (this.leave_subject == null || this.leave_subject == ""  )&&
        (this.employee_name == null || this.employee_name == "" ) &&
       ( this.application_start_date == null || this.application_start_date == "" ) &&
        (this.leave_type == null || this.leave_type == ""  ) &&
       ( this.select_leave_status == null || this.select_leave_status == "" ) &&
       ( this.branch == null || this.branch == "" )
      ) {
      return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {
    // OpenModal(id) {
    //   this.$store.commit("attendance/toggleLeaveDetailModal", id);
    // },
    initialLoad: function () {
      this.GetAllLeavesList();
      this.loadBranch();
      // this.getEmployeeName();
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

    GetAllLeavesList: function () {
      var queryParam = {
        branch: this.$route.query.branch,
        leave_subject: this.$route.query.leave_subject,
        employee_name: this.$route.query.employee_name,
        application_start_date: this.$route.query.application_start_date,
        application_end_date: this.$route.query.application_end_date,
        leave_type: this.$route.query.leave_type,
        select_leave_status: this.$route.query.select_leave_status,
        page: this.$route.query.page,
      };

      axios
        .get("leaves/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_leaves = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
          console.log(response.status);
        });
    },

    deleteAllLeavesItem: function (id) {
      Swal.fire({
       title:  this.$store.getters.GET_ARE_YOU_SURE,
        text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("leaves/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetAllLeavesList();
            }
          });
          Swal.fire(   this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
            "success");
        } else {
          Swal.fire(this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +' '+this.$store.getters.GET_DELETED +" ...",
            "error");
        }
      });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchLeave();
    },
    async searchLeave() {
      // if (
      //   this.leave_subject == null &&
      //   this.employee_name == null &&
      //   this.application_start_date == null &&
      //   this.leave_type == null &&
      //   this.select_leave_status == null &&
      //   this.branch == null
      // ) {
      //   console.log("jello");
      //   this.isSearchField = true;
      // }

      await this.$router.push({
        path: "all-leaves",
        query: {
          leave_subject: this.leave_subject,
          employee_name: this.employee_name,
          application_start_date: this.application_start_date,
          application_end_date: this.application_end_date,
          leave_type: this.leave_type,
          select_leave_status: this.select_leave_status,
          branch: this.branch,
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
hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
