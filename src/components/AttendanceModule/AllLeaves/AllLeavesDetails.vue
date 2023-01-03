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
                 {{$store.getters.GET_LEAVE+ ' '+ $store.getters.GET_DETAILS}}
                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                </div>-->
              </div>

              <router-link :to="{path: '/all-leaves'}">
                <a class="float" style="position: absolute; right: 0">
                  <i
                    class="fas fa-arrow-alt-circle-left"
                    style="color: #69c5a5; font-size: 33px; width:50px"
                    title="Back to previous page"
                  ></i>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="container" v-if="leaves">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-12">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info"></i>
                        {{$store.getters.GET_LEAVE+ ' '+ $store.getters.GET_DETAILS+' '+ $store.getters.GET_INFORMATION}}
                    </h5>

                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                           {{ $store.getters.GET_EMPLOYEE +' '+$store.getters.GET_NAME}}
                        </h6>
                      </div>
                      <div v-if="leaves.employee_name" class="col-sm-9 text-secondary">
                        {{ leaves.employee_name.first_name + " " +
                        leaves.employee_name.last_name }}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                            {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_SUBJECT}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.leave_subject"
                        class="col-sm-9 text-secondary"
                      >{{leaves.leave_subject }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                             {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_DESCRIPTION}}
                        </h6>
                      </div>
                      <div v-if="leaves.leave_description" class="col-sm-9 text-secondary">
                        <span v-html="leaves.leave_description"></span>
                      </div>
                    </div>

                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                           {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.leave_type && leaves.leave_type.leave_type"
                        class="col-sm-9 text-secondary"
                      >{{leaves.leave_type.leave_type }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_TOTAL +' '+$store.getters.GET_DAYS}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.approve_day_count"
                        class="col-sm-9 text-secondary"
                      >{{ leaves.approve_day_count }}</div>
                      <div v-else class="col-sm-9 text-secondary">{{ leaves.apply_day_count }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_DURATION}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.leave_type && leaves.leave_type.duration_type"
                        class="col-sm-9 text-secondary"
                      >{{ leaves.leave_type.duration_type }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_PAYABLE +' '+$store.getters.GET_WAGES}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.leave_type && leaves.leave_type.payable_wages"
                        class="col-sm-9 text-secondary"
                      >{{ leaves.leave_type.payable_wages }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                             {{ $store.getters.GET_APPLICATION +' '+$store.getters.GET_START+ ' '+ $store.getters.GET_DATE}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.application_start_date"
                        class="col-sm-3 text-secondary"
                      >{{ leaves.application_start_date }}</div>
                      <div class="col-sm-3">
                        <h6 class="mb-0"> 
                            {{ $store.getters.GET_APPROVED +' '+$store.getters.GET_START+ ' '+ $store.getters.GET_DATE}}
                        </h6>
                      </div>
                       <div
                        v-if="leaves.approved_start_date"
                        class="col-sm-3 text-secondary"
                      >{{ leaves.approved_start_date }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_APPLICATION +' '+$store.getters.GET_END+ ' '+ $store.getters.GET_DATE}}
                        </h6>
                      </div>
                      <div v-if="leaves.application_end_date" class="col-sm-3 text-secondary">{{ leaves.application_end_date }}</div>
                      <div class="col-sm-3">
                        <h6 class="mb-0"> 
                          {{ $store.getters.GET_APPROVED +' '+$store.getters.GET_END+ ' '+ $store.getters.GET_DATE}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.approved_end_date"
                        class="col-sm-3 text-secondary"
                      >{{ leaves.approved_end_date }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">
                            {{ $store.getters.GET_LEAVE+ ' '+ $store.getters.GET_STATUS}}
                        </h6>
                      </div>
                      <div
                        v-if="leaves.leave_type && leaves.leave_type.leave_status"
                        class="col-sm-9 text-secondary"
                      >{{ leaves.leave_type.leave_status }}</div>
                    </div>

                    <div class="row mt-3">
                      <div class="col-md-12">
                        <div v-if="leaves.select_leave_status !=='Approve'">
                          <button
                            v-if="hasPermission('change_leave')"
                            @click="approveLeave(leaves.id)"
                            type="button"
                            class="btn btn-successs ml-3 float-right"
                          >
                           {{ $store.getters.GET_APPOVE+ ' '+ $store.getters.GET_LEAVE}}
                          </button>
                        </div>

                        <router-link
                          class="item"
                          :to="{ name: 'UpdateLeaveReq', params: { id: leaves.id } }"
                          v-if="hasPermission('change_leave')"
                        >
                          <button type="submit" class="btn btn-base float-right">
                             {{ $store.getters.GET_EDIT+ ' '+ $store.getters.GET_LEAVE}}
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
        </div>
        <!-- previous page -->
        <!-- <div class="main-card card">
          <div class="card-body">
            <div class="form-group" v-if="leaves">
              <div class="form-row">
                <div class="position-relative form-group">
                  <div class="position-relative form-check">
                    <div class="row">
                      <div class="col-md-3" v-if="leaves.employee_name">
                        <b>
                          {{"Name: " + leaves.employee_name.first_name + " " +
                          leaves.employee_name.last_name }}
                        </b>
                        <br />
                        <br />
                        <p>
                          <strong>Leave Type:</strong>
                          {{leaves.leave_type.leave_type }}
                        </p>
                        <p v-if="leaves.approve_day_count != 1">
                          <strong>Total day:</strong>
                          {{leaves.approve_day_count}}
                        </p>
                        <p v-else>
                          <strong>Total day:</strong>
                          {{leaves.apply_day_count}}
                        </p>
                        <p>
                          <strong>Leave Duration Type:</strong>
                          {{
                          leaves.leave_type.duration_type}}
                        </p>
                        <p>
                          <strong>Leave Payable Wages:</strong>
                          {{
                          leaves.leave_type.payable_wages}}
                        </p>
                        <p v-if="leaves.approved_start_date">
                          <strong>Start Date:</strong>
                          {{ leaves.approved_start_date }}
                        </p>
                        <p v-else>
                          <strong>Start Date:</strong>
                          {{leaves.application_start_date }}
                        </p>
                        <p v-if="leaves.approved_end_date">
                          <strong>End Date:</strong>
                          {{leaves.approved_end_date}}
                        </p>
                        <p v-else>
                          <strong>End Date:</strong>
                          {{leaves.application_end_date}}
                        </p>
                      </div>
                      <div class="col-md-9">
                        <p>
                          <strong>Leave Status:</strong>
                          {{leaves.leave_type.leave_status}}
                        </p>
                        <p>
                          <strong>Leave Description:</strong>
                          <span v-html="leaves.leave_description"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="col-md-12">
                  <router-link
                    class="item"
                    :to="{ name: 'UpdateLeaveReq', params: { id: leaves.id } }"
                    v-if="hasPermission('change_leave')"
                  >
                    <button type="submit" class="btn btn-base float-right">Edit leave</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
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

export default {
  name: "AllLeavesDetails",
  components: { Master },
  data() {
    return {
      leaves: null,
      leave_error_data: null,
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
      this.getLeaveDetails();
    },
    approveLeave(id) {
      const response = axios
        .post("leave-approve/", {
          id: id,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: this.$store.getters.GET_APPROVED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            this.$router.push({ name: "AllLeaves" });
            console.log(result);
          });
          console.log(response);
          // if (response.status === 202) {
          //   Swal.fire({
          //     icon: "success",
          //     text: "You have approved a leave request..",
          //   });
          //   this.$router.push("all-leaves");
          // }
        })
        .catch((error) => {
          this.leave_error_data = error.response.data;
          console.log("--++", error.response);
        });
      console.log(response);
    },
    getLeaveDetails() {
      axios.get(`leaves/${this.$route.params.id}/`, {}).then((response) => {
        this.leaves = response.data;
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
.card {
  margin-bottom: 0px !important;
}

.main-body {
  padding: 15px;
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
</style>