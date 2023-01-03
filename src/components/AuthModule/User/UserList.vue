<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="axiosForm">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-users icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                <!-- User List -->
                {{ $store.getters.GET_USER + " " + $store.getters.GET_LIST }}
                <router-link
                  :to="{ path: '/create-new-user' }"
                  v-if="hasPermission('add_user')"
                >
                  <a class="largeButton" style="position: absolute; right: 0">
                    <button
                      type="button"
                      class="btn btn-successs"
                      style="font-size: 15px"
                    >
                      <span class="fas fa-plus-square"></span>
                      {{ $store.getters.GET_ADD_NEW }}
                    </button>
                  </a>
                  <a class="smallButton" style="position: absolute; right: 0">
                    <button
                      type="button"
                      class="btn btn-successs"
                      style="font-size: 15px"
                    >
                      <span class="fas fa-plus-square"></span>
                      {{ $store.getters.GET_ADD }}
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

            <div data-parent="#accordion" id="collapseOne1" class="collapse">
              <hr />
              <div class="card-body">
                <form action @submit.prevent="searchUser" autocomplete="off">
                  <div class="form-row">
                    <div class="col-md-4">
                      <label>
                        {{ $store.getters.GET_FIRST_NAME }}
                      </label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          v-model="first_name"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>
                        {{ $store.getters.GET_LAST_NAME }}
                      </label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          v-model="last_name"
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label>{{ $store.getters.GET_EMAIL }}</label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="email"
                          v-model="username"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-4">
                      <label>
                        {{ $store.getters.GET_GROUP }}
                      </label>
                      <div class="form-group">
                        <select v-model="groups" class="form-control">
                          <option value="" selected>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_GROUP
                            }}
                          </option>
                          <option
                            v-for="grp in all_groups"
                            :key="grp.id"
                            :value="grp.id"
                            selected
                          >
                            {{ grp.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label>
                        {{ $store.getters.GET_DEPARTMENT }}
                      </label>
                      <div class="form-group">
                        <select v-model="department" class="form-control">
                          <option value="" selected>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_DEPARTMENT
                            }}
                          </option>
                          <option
                            v-for="dprtmnt in all_departments"
                            :key="dprtmnt.id"
                            :value="dprtmnt.id"
                          >
                            {{ dprtmnt.department_name }}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label>{{ $store.getters.GET_BRANCH }}</label>
                      <div class="form-group">
                        <select v-model="branch" class="form-control">
                          <option value="" selected>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_BRANCH
                            }}
                          </option>
                          <option
                            v-for="branch in all_branchs"
                            :key="branch.id"
                            :value="branch.id"
                          >
                            {{ branch.branch_name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-8">
                      <label>
                        {{ $store.getters.GET_SKILL }}
                      </label>
                      <span class="text-muted">
                        ({{ $store.getters.GET_EX_PYTHON_JAVA }})
                      </span>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="text"
                          name
                          id
                          v-model="skills"
                        />
                      </div>
                    </div>
                    <div class="col-md-4 mt-2">
                      <label></label>

                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-base float-right"
                          :disabled="blankSearch"
                        >
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

        <!-- <div v-if="users"> -->
        <div class="loader" v-if="loading"></div>
        <div v-if="users && users.length > 0">
          <div class="card" v-for="user in users" :key="user.id">
            <div class="cardContent">
              <div class="row mt-1" style="line-height: 1">
                <div class="col-sm-12 col-md-12 col-xl-2">
                  <img
                    v-if="user.user_profile && user.user_profile.image"
                    :src="user.user_profile.image"
                    class="rounded-circle"
                    height="45"
                    width="45"
                    alt="user  image"
                  />
                  <img
                    v-else
                    width="45"
                    height="45"
                    class="rounded-circle"
                    src="https://as2.ftcdn.net/jpg/00/65/77/27/500_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                    alt
                  />
                  <!-- <span class="logged-in">●</span> -->
                  <!-- <span class="dot"></span> -->
                  <!-- <div class="ring-container">
                    <div class="ringring"></div>
                    <div class="circle"></div>
                  </div> -->
                  <p class="userName" v-if="user.first_name && user.last_name">
                    <!-- <span class="dot"></span> -->
                    <span
                      class="currentColor"
                      v-if="user.is_active == true"
                      title="Active"
                    >
                      <i class="fas fa-check-circle"></i>
                    </span>
                    <span
                      class="currentColor"
                      v-else-if="user.is_active == false"
                      title="Inactive"
                    >
                      <!-- <i class="fas fa-window-close"></i> -->
                      <i class="fas fa-times-circle"></i>
                    </span>
                    {{ user.first_name + " " + user.last_name }}
                  </p>
                </div>

                <div class="vll"></div>

                <div class="col-sm-12 col-md-12 col-xl-9">
                  <div class="row mt-2 userInfo">
                    <div class="col-sm-6 col-md" v-if="user.username">
                      <label> {{ $store.getters.GET_EMAIL }}: </label>
                      <br />
                      {{ user.username }}
                    </div>
                    <div class="vl"></div>
                    <div class="col-sm-6 col-md">
                      <label> {{ $store.getters.GET_EMPLOYEE_ID }}: </label>
                      <br />
                      <span
                        v-if="
                          user.user_profile && user.user_profile.employee_id
                        "
                        >{{ user.user_profile.employee_id }}</span
                      >
                    </div>
                    <div class="vl"></div>
                    <div class="col-sm-6 col-md">
                      <label> {{ $store.getters.GET_JOINING_DATE }}: </label>
                      <br />
                      <span
                        v-if="
                          user.user_profile && user.user_profile.joining_date
                        "
                        >{{ user.user_profile.joining_date }}</span
                      >
                    </div>
                    <div class="vl"></div>
                    <div class="col-sm-6 col-md">
                      <label> {{ $store.getters.GET_DEPARTMENT }}: </label>
                      <br />
                      <span
                        v-if="user.user_profile && user.user_profile.department"
                        >{{
                          user.user_profile.department.department_name
                        }}</span
                      >
                    </div>
                    <div class="vl"></div>
                    <div class="col-sm-6 col-md">
                      <label> {{ $store.getters.GET_BRANCH }}: </label>
                      <br />
                      <span
                        v-if="user.user_profile && user.user_profile.branch"
                        >{{ user.user_profile.branch.branch_name }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md col-xl mt-3">
                  <div class="action-container">
                    <div class="btn-group dropright">
                      <a
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        class="p-0 btn"
                      >
                        <i
                          id="addIcon"
                          class="nav-link-icon fa fa-cog"
                          style="font: 45px"
                        ></i>
                      </a>
                      <div
                        tabindex="-1"
                        role="menu"
                        aria-hidden="true"
                        class="dropdown-menu dropdown-menu-right"
                      >
                        <router-link
                          class="dropdown-item"
                          :to="{
                            name: 'UserDetails',
                            params: { id: user.id },
                          }"
                          v-if="hasPermission('view_user')"
                        >
                          {{ $store.getters.GET_VIEW }}
                          <!-- <div class="float-right">
                                <i class="fas fa-edit" style="color: #72e3da;"></i>
                              </div>-->
                        </router-link>

                        <router-link
                          class="dropdown-item"
                          :to="{
                            name: 'UpdateUser',
                            params: { id: user.id },
                          }"
                          v-if="hasPermission('change_user')"
                        >
                          {{ $store.getters.GET_EDIT }}
                        </router-link>
                        <a
                          class="dropdown-item"
                          href="#"
                          @click="deleteData(user.id) in users"
                          v-if="hasPermission('delete_user')"
                          >{{ $store.getters.GET_DELETE }}</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <ul class="pagination" v-if="pagination.count">
                <li class="page-item">
                  <a href="#">
                    {{ $store.getters.GET_SHOWING }} {{ pagination.showing }}
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
                    {{ $store.getters.GET_NEXT }}
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-2"></div>
          </div>
        </div>
        <div v-else-if="!loading" class="alert alert-success" role="alert">
          {{
            $store.getters.GET_NO_DATA_FOUND +
            " " +
            $store.getters.GET_EXCLAMATION_MARK
          }}
        </div>
        <!-- <div v-else>
          <div class="card">
            <h4 class="text-center align-middle">No data found !!</h4>
          </div>
        </div>-->
      </div>
    </template>
  </Master>
</template>

<script>
import axios from "axios";
import Master from "../../layouts/Master";
import Swal from "sweetalert2";
// import "../../layouts/authheader";
import permissions from "../../../authorization/permissions";
// import "../../../assets/scripts/main";
// import Pagination from "./Pagination";

export default {
  name: "UserList",
  components: { Master },
  data() {
    return {
      loading: false,
      first_name: null,
      last_name: null,
      full_name: null,
      username: null,
      department: null,
      branch: null,
      groups: null,
      skills: null,

      all_departments: null,
      all_branchs: null,
      all_groups: null,
      users: null,
      LoginTranslatedData: null,

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
    blankSearch() {
      if (
        (this.first_name == null || this.first_name == "") &&
        (this.last_name == null || this.last_name == "") &&
        (this.username == null || this.username == "") &&
        (this.department == null || this.department == "") &&
        (this.groups == null || this.groups == "") &&
        (this.skills == null || this.skills == "") &&
        (this.branch == null || this.branch == "")
      ) {
        return true;
      } else {
        return false;
      }
    },
    // User_list(){
    // this.GetLanguageFromStore('USER_LIST');
    // }
  },

  methods: {
    initialLoad: function () {
      this.loadUsers();
      this.loadDepartment();
      this.loadGroup();
      this.resetOptions();
      this.loadBranch();

      // this.GetLanguageFromStore('LOGIN');
      // this.GetLanguageFromStore('LOGOUT');
      // this.GetLanguageFromStore('BREAKIN');
      // this.GetLanguageFromStore('BREAKOUT');
    },
    GetLanguageFromStore(lang_data) {
      console.log("453", lang_data);
      return "userlist";
      // this.$store
      //   .dispatch("get_lang_details", { langData: lang_data });
      //   // .resolve("Success")
      //   // .then(
      //   //   function (value) {
      //   //     console.log(value); // "Success"
      //   //   },
      //   //   function (value) {
      //   //     // not called
      //   //   }
      //   // );

      // return this.$store.dispatch("get_lang_details", { langData: lang_data });
    },

    resetOptions: function () {},

    loadUsers: function () {
      this.loading = true;
      var queryParam = {
        first_name: this.$route.query.first_name,
        last_name: this.$route.query.last_name,
        username: this.$route.query.username,
        page: this.$route.query.page,
        department: this.$route.query.department
          ? this.$route.query.department
          : null,
        branch: this.$route.query.branch ? this.$route.query.branch : null,
        groups: this.$route.query.groups ? this.$route.query.groups : null,
        skills: this.$route.query.skills,
        // ? this.$route.query.skills
        // : null,
        // skills: this.$route.query.skills
        //   ? "{" + this.$route.query.skills + "}"
        //   : null,
      };
      axios
        .get("users/", {
          params: queryParam,
        })
        .then((response) => {
          this.users = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    loadDepartment() {
      axios
        .get("department-short-list/", {})
        .then((response) => {
          this.all_departments = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadGroup() {
      axios
        .get("group-short-list/", {})
        .then((response) => {
          this.all_groups = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadBranch() {
      axios
        .get("branch-short-list/", {})
        .then((response) => {
          this.all_branchs = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteData: function (id) {
      const currentUser = localStorage.getItem("id");
      if (id == currentUser) {
        Swal.fire({
          icon: "error",
          title: this.$store.getters.GET_SORRY,
          text: this.$store.getters.GET_YOU_CAN_NOT_DELETE_YOURSELF,
        });
      } else {
        Swal.fire({
          title: this.$store.getters.GET_ARE_YOU_SURE,
          text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete("users/" + id + "/").then((response) => {
              if (response.status == 204) {
                this.loadUsers();
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
      }
    },
    setPage(page) {
      this.pagination.page = page;
      this.searchUser();
    },
    searchUser() {
      this.$router.push({
        path: "user-list",
        query: {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          department: this.department,
          groups: this.groups,
          skills: this.skills,
          page: this.pagination.page,
          branch: this.branch,
        },
      });
    },

    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
  // end of Methods
};
</script>
<style scoped>
/*@import url('https://fonts.googleapis.com/css?family=Montserrat|Roboto:300,400|Yellowtail');*/

@import url("https://fonts.googleapis.com/css?family=Varela+Round");

.row {
  text-align: center;
}
.vl {
  border: 1px solid #eeeeee;
}
.vll {
  border: 1px solid #eeeeee;
  height: 40px;
  margin-top: 5px;
}

#addIcon {
  cursor: pointer;
}

.card {
  margin-top: 18px;
  padding-top: 18px;
  margin-bottom: 30px;
  border: 1px solid #eaeaea;
  background-color: #fff;
  border-left: 2px solid #69c5a5;
}

.card-content p {
  padding-bottom: 3px;
}
/* @media (min-width: 576px) */
.col-sm {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  text-align: left;
}

/* left border card  design */
.userName {
  overflow-wrap: break-word;
  margin-top: 5px !important;
}
.card p {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.text-muted {
  color: #6c757d !important;
  margin-left: 5px;
  font-size: 85%;
}
.card {
  /* transition: box-shadow 0.3s; */
  transition: box-shadow 0.2s ease-in-out, transform 0.35s ease-in-out;
}
.card:hover {
  /* box-shadow: 0 0 11px rgba(33, 33, 33, 0.2); */
  box-shadow: 0 11px 11px 0 rgba(0, 0, 0, 0.06);
  /* transform: translateY(-5px); */
}

.fa fa-chevron-circle-down {
  margin-top: 5px;
}
.userInfo {
  vertical-align: middle;
}
.cardContent {
  margin-left: 10px;
}

.h5 {
  font-size: 1.25rem;
  /* font-weight: 700; */
  font-family: Karla, sans-serif;
  color: #495057;
}

hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
/* is_active show */
.currentColor {
  font-size: 15px;
}
.fa-check-circle:before {
  content: "\f058";
  color: #62bd19;
}
.fa-times-circle:before {
  content: "\f057";
  padding-right: 0px;
  color: #6c757ebd;
}
.dot {
  height: 10px;
  width: 10px;
  background-color: green;
  border-radius: 50%;
  display: inline-block;
}
/* ring */
/* .ring-container {
  position: relative;
}

.circle {
  width: 15px;
  height: 15px;
  background-color: #62bd19;
  border-radius: 50%;
  position: absolute;
  top: -10px;
  left: 123px;
}

.ringring {
  border: 3px solid #62bd19;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  height: 25px;
  width: 25px;
  position: absolute;
  left: 118px;
  animation: pulsate-6306f93c 1s ease-out;
  top: -15px;
  -webkit-animation: pulsate-6306f93c 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0;
}
@-webkit-keyframes pulsate {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    opacity: 0;
  }
} */
/* for loader  */

/* @media only screen and (max-width: 768px) {
  [class*="col-sm"] {
    width: 100%;
  }
  .col-sm {
    flex-basis: auto;
    flex-grow: 1;
    max-width: 100%;
    text-align: left;
}
} */
/* ================Responsive==================== */
@media only screen and (max-width: 767px) {
  .vl {
    display: none !important;
  }
  .vll {
    display: none !important;
  }
  .col-sm-6 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
@media only screen and (min-width: 560px) and (max-width: 751px) {
}
@media only screen and (min-width: 751px) and (max-width: 1200px) {
  .vll {
    display: none !important;
  }
}
@media only screen and (min-width: 1200px) {
  .col-md {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
    text-align: left;
  }
}
</style>
