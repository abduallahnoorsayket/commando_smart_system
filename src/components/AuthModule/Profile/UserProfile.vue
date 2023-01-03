<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-user icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_MY +' '+$store.getters.GET_PROFILE }}
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-if="user">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-12 col-lg-12 col-xl-4">
                <div class="card" style="padding-bottom: 20px">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img
                        v-if="user.image"
                        :src="user.image"
                        alt
                        class="rounded-circle"
                        height="150"
                        width="150"
                      />
                      <img
                        v-else
                        width="150"
                        height="150"
                        class="rounded-circle"
                        src="https://as2.ftcdn.net/jpg/00/65/77/27/500_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
                        alt
                      />
                      <div class="mt-3">
                        <h4
                          v-if="user.user && user.user.first_name && user.user.last_name"
                        >{{ user.user.first_name + " " + user.user.last_name }}</h4>
                        <h5
                          v-if="user.designation && user.designation.designation_name"
                          class="text-secondary mb-4 mt-3"
                        >{{user.designation.designation_name}}</h5>
                        <!-- <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> -->
                        <router-link :to="{ name: 'UpdateProfile', params: { id: user.id }   }">
                          <button type="button" class="btn btn-base btn-sm mr-2">
                            {{ $store.getters.GET_EDIT +' '+$store.getters.GET_PROFILE }}
                          </button>
                        </router-link>

                        <router-link :to="{ name: 'UpdatePassword' }">
                          <button type="button" class="btn btn-successs btn-sm">
                            {{ $store.getters.GET_CHANGE +' '+$store.getters.GET_PASSWORD }}
                          </button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card mt-3">
                  <!-- <h6 class="d-flex align-items-center mb-3">
                    <i class="material-icons text-info mr-2"></i>Company Info
                  </h6>-->

                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h5 class="mb-0">
                        {{ $store.getters.GET_COMPANY_INFORMATION }}
                      </h5>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">
                        {{ $store.getters.GET_EMPLOYEE_ID }}
                      </h6>
                      <span v-if="user.employee_id" class="text-secondary">{{ user.employee_id }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">
                        {{ $store.getters.GET_JOINING_DATE}}
                      </h6>
                      <span v-if="user.joining_date" class="text-secondary">{{ user.joining_date }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">{{ $store.getters.GET_DEPARTMENT}}</h6>
                      <span v-if="user.department && user.department.department_name" class="text-secondary">{{ user.department.department_name }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">{{ $store.getters.GET_BRANCH}}</h6>
                      <span v-if="user.branch && user.branch.branch_name" class="text-secondary">{{ user.branch.branch_name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-12 col-lg-12 col-xl-8">
                <div class="card">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info"></i>{{ $store.getters.GET_PERSONAL_INFORMATION}}
                    </h5>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">{{ $store.getters.GET_EMAIL}}</h6>
                      </div>
                      <div
                        v-if="user.user && user.user.username"
                        class="col-sm-9 text-secondary"
                      >{{ user.user.username }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">{{ $store.getters.GET_EDUCATION}}</h6>
                      </div>
                      <div
                        v-if="user.education"
                        class="col-sm-9 text-secondary"
                      >{{ user.education }}</div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">{{ $store.getters.GET_PHONE}}</h6>
                      </div>
                      <div v-if="user.phone" class="col-sm-9 text-secondary">{{ user.phone }}</div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">{{ $store.getters.GET_ADDRESS}}</h6>
                      </div>
                      <div v-if="user.location" class="col-sm-9 text-secondary">{{ user.location }}</div>
                    </div>
                  </div>
                </div>
                <div class="row gutters-sm">
                  <div class="col-sm-12 mb-1">
                    <div class="card h-100">
                      <div class="card-body">
                        <h5 class="d-flex align-items-center mb-3">
                          <i class="material-icons text-info"></i>{{ $store.getters.GET_SOCIAL_LINKS}}
                        </h5>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">{{ $store.getters.GET_GITHUB}}</h6>
                          </div>
                          <div v-if="user.github" class="col-sm-9 text-secondary">
                            <a :href="user.github">{{ user.github }}</a>
                          </div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">{{ $store.getters.GET_LINKED_IN}}</h6>
                          </div>
                          <div v-if="user.linkedin" class="col-sm-9 text-secondary">
                            <a :href="user.linkedin">{{ user.linkedin }}</a>
                          </div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0">{{ $store.getters.GET_FACEBOOK}}</h6>
                          </div>
                          <div v-if="user.facebook" class="col-sm-9 text-secondary">
                            <a :href="user.facebook">{{ user.facebook }}</a>
                          </div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0"> {{ $store.getters.GET_PERSONAL_WEBSITE}}</h6>
                          </div>
                          <div v-if="user.personal_website" class="col-sm-9 text-secondary">
                            <a :href="user.personal_website">{{ user.personal_website }}</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row gutters-sm">
              <div class="col-md-12 col-lg-12 col-xl-12 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info"></i>{{ $store.getters.GET_SKILLS_AND_SHORTBIO}}
                    </h5>
                    <hr />
                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">{{ $store.getters.GET_SKILLS}}</h6>
                      </div>
                      <div v-if="user.skills" class="col-sm-10 text-secondary">
                        <template v-for="(skill,index) in mySkills" :key="index">
                          <span class="badge badge-success mr-1">{{skill}}</span>
                        </template>
                      </div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">{{ $store.getters.GET_SHORT_BIO}}</h6>
                      </div>
                      <div
                        v-if="user.short_bio"
                        class="col-sm-10 text-secondary"
                      >{{ user.short_bio }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>


<script>
import axios from "axios";
import Master from "../../layouts/Master";

export default {
  name: "UserProfile",
  components: { Master },
  data() {
    return {
      user: null,
      mySkills: null,
      userGroups: null,
    };
  },

  created() {
    this.fetchAuthenticatedUser();
    // const token = localStorage.getItem("token");

    // if (token) {
    //   this.fetchAuthenticatedUser(token);
    // }
  },
  //   end of creted
  methods: {
    fetchAuthenticatedUser() {
      axios.get("/profiles/me/").then((response) => {
        this.user = response.data;
        this.userGroups = response.data.user.groups
          .map((element) => element.name)
          .join(", ");
        this.mySkills = response.data.skills;
      });
    },
  },
};
</script>

<style scoped>
/* new profile card  by bootstrap4 */
body {
  margin-top: 20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}
.main-body {
  padding: 15px;
}
/* .card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
} */

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