<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-tape icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                 {{$store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE +' '+$store.getters.GET_LIST}}
              </div>

              <router-link
                :to="{ path: '/create-leave-types' }"
                v-if="hasPermission('add_leavetype')"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button
                    type="button"
                    class="btn btn-successs"
                    style="font-size: 15px"
                  >
                    <span class="fas fa-plus-square"></span> {{ $store.getters.GET_ADD_NEW}}
                  </button>
                </a>
              </router-link>
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
                <form action @submit.prevent="searchLeaveType">
                  <div class="form-row">
                    <div class="col-md-4">
                      <label>{{ $store.getters.GET_BRANCH}}</label>
                      <div class="form-group">
                        <select
                          name="select"
                          id="branch"
                          v-model="branch"
                          class="form-control"
                          @change="LoadLeaveType()"
                        >
                          <option value selected>  {{ $store.getters.GET_SELECT +' '+$store.getters.GET_BRANCH}}</option>
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
                      <label>{{$store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}</label>
                      <select
                        name="select"
                        v-model="leave_type"
                        class="form-control"
                      >
                        <option value selected>
                            {{ $store.getters.GET_SELECT +' '+$store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}
                        </option>
                        <option
                          v-for="leavetype in all_leaveTypes"
                          :key="leavetype.id"
                          :value="leavetype.leave_type"
                        >
                          {{ leavetype.leave_type }}
                        </option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <label for="exampleEmail11" class>
                           {{$store.getters.GET_LEAVE +' '+$store.getters.GET_STATUS}}
                      </label>

                      <select
                        name="select"
                        id="type"
                        v-model="leave_status"
                        type="choice"
                        class="form-control"
                      >
                        <!-- <option v-for="leavestatus in all_choices" :key="leavestatus.id" :value="leavestatus.id">
                                                                          {{ leavestatus.LeaveType_Table }}
                        </option>-->
                        <option value selected>   {{ $store.getters.GET_SELECT +' '+$store.getters.GET_LEAVE +' '+$store.getters.GET_STATUS}}</option>
                        <option value="Paid">{{$store.getters.GET_PAID}}</option>
                        <option value="Unpaid">{{$store.getters.GET_UNPAID}}</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-8"></div>
                    <div class="col-md-4">
                      <label></label>
                      <br />
                      <br />

                      <div class="form-group">
                        <button type="submit" class="btn btn-base float-right" :disabled="blankSearch">
                           {{$store.getters.GET_SEARCH}}
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
        <div class="row" v-if="leave_types">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr> 
                        <th scope="col"> {{$store.getters.GET_SL}}</th>
                        <th scope="col"> {{$store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}</th>
                        <th scope="col">{{$store.getters.GET_DURATION}}</th>
                        <th scope="col">{{$store.getters.GET_DURATION +' '+$store.getters.GET_TYPE}}</th>
                        <th scope="col">{{$store.getters.GET_STATUS}}</th>
                        <th scope="col">{{$store.getters.GET_PAYABLE +' '+$store.getters.GET_WAGES}}</th>
                        <th scope="col">  {{$store.getters.GET_BRANCH +' '+$store.getters.GET_NAME}}</th>
                        <th scope="col">  {{$store.getters.GET_ACTION}}</th>
                      </tr> 
                    </thead>
                    <tbody v-if="leave_types.length > 0">
                      <tr
                        v-for="(leave_type, SL) in leave_types"
                        :key="leave_type.id"
                      >
                        <td>{{ SL + 1 }}</td>
                        <td>{{ leave_type.leave_type }}</td>
                        <td>{{ leave_type.duration }}</td>
                        <td>{{ leave_type.duration_type }}</td>
                        <!-- <td>{{ leave_type.leave_status }}</td> -->
                        <td v-if="leave_type.leave_status == 'Paid'">
                          <span class="badge badge-warning">{{$store.getters.GET_PAID}}</span>
                        </td>
                        <td v-else-if="leave_type.leave_status == 'Unpaid'">
                          <span class="badge badge-danger">{{$store.getters.GET_UNPAID}}</span>
                        </td>
                        <!-- <td v-else>
                          <span class="badge badge-danger">{{
                            leave_type.leave_status
                          }}</span>
                        </td> -->

                        <td>{{ leave_type.payable_wages }}</td>

                        <td>
                          <span v-if="leave_type.branch && leave_type.branch.branch_name">{{
                            leave_type.branch.branch_name
                          }}</span>
                        </td>

                        <td class="td_action">
                          <router-link
                            class="item"
                            :to="{
                              name: 'UpdateLeaveTypes',
                              params: { id: leave_type.id },
                            }"
                            v-if="hasPermission('change_leavetype')"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>

                          <i
                            class="fas fa-trash-alt"
                            @click="
                              deleteLeaveTypeItem(leave_type.id) in leave_types
                            "
                            v-if="hasPermission('delete_leavetype')"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                    <!-- If no results -->
                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="8" class="text-center align-middle">
                          <h4>  {{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}</h4>
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
                  >{{ $store.getters.GET_SHOWING}} {{ pagination.showing }}  {{ $store.getters.GET_OF}} {{ pagination.count }}</a
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

export default {
  name: "LeaveTypes",
  components: { Master },
  data() {
    return {
      leave_types: null,
      searchByBranch: null,
      leave_type: null,
      leave_status: null,
      all_choices: null,
      all_branches: null,
      all_leaveTypes: null,
      branch: null,

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
  computed: {
    blankSearch(){
      if (
        (this.branch == null || this.branch == ""  )&&
        (this.leave_type == null || this.leave_type == "" ) &&
       ( this.leave_status == null || this.leave_status == "" )
      ) {
      return true;
      }
      else {
        return false;
      }
    }
  },
  methods: {
    initialLoad: function () {
      this.GetLeaveTypes();

      this.loadBranch();

      // this.loadChoices();
    },

    // loadChoices: function () {
    //   axios.get("choices/").then((response) => {
    //     this.all_choices = response.data;
    //     console.log(this.all_leaveTypes);
    //     console.log(response.status);
    //   });
    // },

    loadBranch() {
      axios
        .get("branch-short-list/", {
        })
        .then(
          function (response) {
            this.all_branches = response.data;
          }.bind(this)
        );
    },
    // leave type shortlist
    LoadLeaveType: function () {
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
    // LoadLeaveType: function () {
    //   axios
    //     .get("leave-types/", {
    //       params: {
    //         branch: this.branch,
    //       },
    //     })
    //     .then(
    //       function (response) {
    //         this.all_leaveTypes = response.data.results;
    //       }.bind(this)
    //     );
    // },
    GetLeaveTypes: function () {
      var queryParam = {
        branch: this.$route.query.branch,
        leave_type: this.$route.query.leave_type,
        leave_status: this.$route.query.leave_status,
        page: this.$route.query.page,
      };
      axios
        .get("leave-types/", {
          params: queryParam,
        })
        .then((response) => {
          this.leave_types = response.data.results;
          console.log("280-------", this.leave_types);
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
          console.log(this.leave_types);
          console.log(response.status);
        });
    },

    deleteLeaveTypeItem: function (id) {
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
          axios.delete("leave-types/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetLeaveTypes();
            }
          });
          Swal.fire( this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
            "success");
        } else {
          Swal.fire(  this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +' '+this.$store.getters.GET_DELETED +" ...",
            "error");
        }
      });
    },
    setPage(page) {
      this.pagination.page = page;
      this.searchLeaveType();
    },
    searchLeaveType() {
      console.log(this.branch);
      console.log(this.leave_status);
      this.$router.push({
        path: "leave-types",
        query: {
          branch: this.branch,
          leave_type: this.leave_type,
          leave_status: this.leave_status,

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
