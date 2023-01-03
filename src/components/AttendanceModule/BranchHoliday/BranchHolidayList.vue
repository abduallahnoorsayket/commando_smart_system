<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <!-- <Modal /> -->
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                  {{ $store.getters.GET_BRANCH +' '+$store.getters.GET_HOLIDAY+' '+$store.getters.GET_LIST }}
              </div>
              <router-link
                :to="{ path: '/create-branch-holiday' }"
                v-if="hasPermission('add_branchholiday')"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
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
                      &nbsp;{{$store.getters.GET_SEARCH}}
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
                <form action @submit.prevent="searchHoliday">
                  <div class="form-row">
                    <div class="col-md-4">
                      <label>{{ $store.getters.GET_BRANCH}}</label>
                      <div class="form-group">
                        <select name="select" id="branch" v-model="branch" class="form-control">
                          <option value selected>
                             {{ $store.getters.GET_SELECT +' '+$store.getters.GET_BRANCH}}
                          </option>
                          <option
                            v-for="brnch in all_branchs"
                            :key="brnch.id"
                            :value="brnch.id"
                          >{{ brnch.branch_name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label>{{ $store.getters.GET_PURPOSE}}</label>
                      <select name="select" id="branch" v-model="purpose" class="form-control">
                        <option value selected>
                          {{ $store.getters.GET_SELECT +' '+$store.getters.GET_PURPOSE}}
                        </option>
                        <option v-for="(purpose,index) in all_purposes" :key="index">{{ purpose}}</option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <label>{{ $store.getters.GET_TYPE}}</label>

                      <select
                        name="select"
                        id="type"
                        v-model="type"
                        type="choice"
                        class="form-control"
                      >
                        <option value selected> {{
                        $store.getters.GET_SELECT +
                        " " +
                        $store.getters.GET_TYPE
                      }}</option>
                        <option value="PUB"> {{ $store.getters.GET_PUBLIC }}</option>
                        <option value="PRI"> {{ $store.getters.GET_PRIVATE }}</option>
                        <option value="OTH">{{ $store.getters.GET_OTHERS }}</option>
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
        <div>
          <div class="row" v-if="holidays">
            <div class="col-12">
              <div class="main-card card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">{{ $store.getters.GET_SL}}</th>
                          <th scope="col">{{ $store.getters.GET_PURPOSE}}</th>
                          <th scope="col"> {{ $store.getters.GET_TYPE}}</th>
                          <th scope="col"> {{ $store.getters.GET_START +' '+$store.getters.GET_DATE}}</th>
                          <th scope="col"> {{ $store.getters.GET_END +' '+$store.getters.GET_DATE}}</th>
                          <th scope="col">  {{ $store.getters.GET_DAY}}</th>
                          <th scope="col">  {{ $store.getters.GET_BRANCH}}</th>
                          <th scope="col" width="80px"> {{ $store.getters.GET_ACTION}}</th>
                        </tr>
                      </thead>

                      <tbody v-if="holidays.length >0">
                        <tr v-for="(holiday, SL) in holidays" :key="holiday.id">
                          <td>{{ SL + 1 }}</td>
                          <td v-if="holiday.holiday && holiday.holiday.purpose">{{ holiday.holiday.purpose }}</td>
                          <!-- <td>{{ holiday.holiday.type }}</td> -->
                          <td v-if="holiday.holiday && holiday.holiday.type == 'PUB' ">
                            <span class="badge badge-success"> {{ $store.getters.GET_PUBLIC }}</span>
                          </td>
                          <td v-if="holiday.holiday && holiday.holiday.type == 'PRI' ">
                            <span class="badge badge-info"> {{ $store.getters.GET_PRIVATE }}</span>
                          </td>
                          <td v-if="holiday.holiday && holiday.holiday.type == 'OTH' ">
                            <span class="badge badge-secondary">{{ $store.getters.GET_OTHERS }}</span>
                          </td>
                          <td>{{ holiday.start_date }}</td>
                          <td>{{ holiday.end_date }}</td>
                          <td>{{ holiday.day_count }} {{ $store.getters.GET_DAYS }}</td>
                          <td v-if="holiday.branch && holiday.branch.branch_name ">{{ holiday.branch.branch_name }}</td>

                          <td class="td_action">
                            <router-link
                              class="item"
                              :to="{ name: 'UpdateBranchHoliday', params: { id: holiday.id } }"
                              v-if="hasPermission('change_branchholiday')"
                            >
                              <i class="fas fa-edit"></i>
                            </router-link>

                            <i
                              class="fas fa-trash-alt"
                              @click="deleteHolidayItem(holiday.id) in holidays"
                              v-if="hasPermission('delete_branchholiday')"
                            ></i>
                          </td>
                        </tr>
                      </tbody>
                      <!-- If no results -->
                      <tbody v-else>
                        <tr style="height: 100px;">
                          <td colspan="8" class="text-center align-middle">
                            <h4>{{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}</h4>
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
                  <a href="#">{{ $store.getters.GET_SHOWING}} {{ pagination.showing }} {{ $store.getters.GET_OF}} {{ pagination.count }}</a>
                </li>
                <li :class="{ disabled: !pagination.previous }" class="page-item">
                  <a href="#!" v-on:click="setPage(pagination.previous)">{{ $store.getters.GET_PREVIOUS}}</a>
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
  name: "BranchHolidayList",
  components: { Master },
  data() {
    return {
      //   modalOpen: false,
      all_purposes: null,
      branch: null,
      purpose: null,
      type: null,
      all_branchs: null,
      holidays: null,
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
    this.initialLoad();
    console.log("updated");
  },
   computed: {
    blankSearch(){
      if (
        (this.branch == null || this.branch == ""  )&&
        (this.purpose == null || this.purpose == "" ) &&
       ( this.type == null || this.type == "" )
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
      this.GetHolidayList();
      // this.resetOptions();
      this.loadBranch();
      this.loadPupose();
    },

    loadBranch() {
      axios
        .get("branch-short-list/", {
        })
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
        .get("branch-holiday-short-list/", {
        })
        .then((response) => {
          this.all_purposes = response.data.map((element) => {
            return element.holiday.purpose;
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    GetHolidayList: function () {
      var queryParam = {
        branch: this.$route.query.branch,
        type: this.$route.query.type,
        purpose: this.$route.query.purpose,
        page: this.$route.query.page,
      };
      axios
        .get("branch-holidays/", {
          params: queryParam,
        })
        .then((response) => {
          this.holidays = response.data.results;

          console.log("274///////", this.holidays);

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
          console.log(response.status);
        });
    },

    deleteHolidayItem: function (id) {
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
          axios.delete("branch-holidays/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetHolidayList();
            }
            // Swal.fire("Deleted!", "Holiday has been deleted!!", "success");
          });
          // Swal.fire("Cancelled", "Holiday has not been deleted !", "error");
          Swal.fire( this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
            "success");
        } else {
          Swal.fire(   this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +' '+this.$store.getters.GET_DELETED +" ...",
            "error");
        }
      });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchHoliday();
    },

    searchHoliday() {
      console.log(this.searchName);
      console.log(this.searchMail);
      this.$router.push({
        path: "branch-holiday-list",
        query: {
          branch: this.branch,
          purpose: this.purpose,
          type: this.type,

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

<style  scoped>
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
