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
                {{ $store.getters.GET_USER +' '+$store.getters.GET_DETAILS }}
              </div>
            </div>
          </div>
        </div>
        <div class="container" v-if="user">
          <div class="main-body">
            <div class="row gutters-sm">
              <div class="col-md-4">
                <div class="card" style="padding-bottom: 14px">
                  <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                      <img
                        v-if="user.user_profile.image"
                        :src="user.user_profile.image"
                        alt="user image"
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
                          v-if="user.first_name && user.last_name"
                        >{{ user.first_name + " " + user.last_name }}</h4>
                        <h5
                          v-if="user.user_profile && user.user_profile.designation && user.user_profile.designation.designation_name"
                          class="text-secondary mb-4 mt-3 capitalizeNames"
                        >{{user.user_profile.designation.designation_name}}</h5>
                        <!-- <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p> -->
                        <router-link :to="{ name: 'UpdateUser', params: { id: user.id }   }">
                          <button
                            v-if="hasPermission('change_user')"
                            type="button"
                            class="btn btn-successs btn-sm pr-5 pl-5"
                          >
                          {{ $store.getters.GET_EDIT +' '+$store.getters.GET_USER }}</button>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card mt-3">
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
                        <!-- <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-globe mr-2 icon-inline"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path
                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                          />
                        </svg>-->
                        {{ $store.getters.GET_EMPLOYEE_ID }}
                      </h6>
                      <span
                        v-if="user.user_profile && user.user_profile.employee_id"
                        class="text-secondary"
                      >{{ user.user_profile.employee_id }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">
                        {{ $store.getters.GET_JOINING_DATE}}
                      </h6>
                      <span
                        v-if="user.user_profile && user.user_profile.joining_date"
                        class="text-secondary"
                      >{{ user.user_profile.joining_date }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">
                        {{ $store.getters.GET_DEPARTMENT}}
                      </h6>
                      <span
                        v-if="user.user_profile && user.user_profile.department && user.user_profile.department.department_name"
                        class="text-secondary"
                      >{{ user.user_profile.department.department_name }}</span>
                    </li>
                    <li
                      class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                    >
                      <h6 class="mb-0">
                        {{ $store.getters.GET_BRANCH}}
                      </h6>
                      <span
                        v-if="user.user_profile && user.user_profile.branch && user.user_profile.branch.branch_name"
                        class="text-secondary"
                      >{{ user.user_profile.branch.branch_name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-8">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info"></i>
                      {{ $store.getters.GET_PERSONAL_INFORMATION}}
                    </h5>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">   {{ $store.getters.GET_EMAIL}}</h6>
                      </div>
                      <div v-if="user.username" class="col-sm-9 text-secondary">{{ user.username }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0"> {{ $store.getters.GET_EDUCATION}}</h6>
                      </div>
                      <div
                        v-if="user.user_profile.education"
                        class="col-sm-9 text-secondary"
                      >{{ user.user_profile.education }}</div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0"> {{ $store.getters.GET_PHONE}}</h6>
                      </div>
                      <div
                        v-if="user.user_profile.phone"
                        class="col-sm-9 text-secondary"
                      >{{ user.user_profile.phone }}</div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0"> {{ $store.getters.GET_ADDRESS}}</h6>
                      </div>
                      <div
                        v-if="user.user_profile.location"
                        class="col-sm-9 text-secondary"
                      >{{ user.user_profile.location }}</div>
                    </div>
                  </div>
                </div>
                <!-- Social links -->
                <div class="row gutters-sm">
                  <div class="col-sm-12 mb-3">
                    <div class="card h-100">
                      <div class="card-body">
                        <h5 class="d-flex align-items-center mb-3">
                          <i class="material-icons text-info"></i> {{ $store.getters.GET_SOCIAL_LINKS}}
                        </h5>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0"> {{ $store.getters.GET_GITHUB}}</h6>
                          </div>
                          <div v-if="user.user_profile.github" class="col-sm-9 text-secondary">
                            <a :href="user.user_profile.github">{{ user.user_profile.github }}</a>
                          </div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0"> {{ $store.getters.GET_LINKED_IN}}</h6>
                          </div>
                          <div v-if="user.user_profile.linkedin" class="col-sm-9 text-secondary">
                            <a :href="user.user_profile.linkedin">{{ user.user_profile.linkedin }}</a>
                          </div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0"> {{ $store.getters.GET_FACEBOOK}}</h6>
                          </div>
                          <div v-if="user.user_profile.facebook" class="col-sm-9 text-secondary">
                            <a :href="user.user_profile.facebook ">{{ user.user_profile.facebook }}</a>
                          </div>
                        </div>
                        <hr />

                        <div class="row">
                          <div class="col-sm-3">
                            <h6 class="mb-0"> {{ $store.getters.GET_PERSONAL_WEBSITE}}</h6>
                          </div>
                          <div
                            v-if="user.user_profile.personal_website"
                            class="col-sm-9 text-secondary"
                          >
                            <a
                              :href=" user.user_profile.personal_website"
                            >{{ user.user_profile.personal_website }}</a>
                          </div>
                        </div>
                        <!-- 
                        <h6 class="mb-0">Skills</h6>
                        <span v-if="user.skills">{{ user.short_bio }}</span>
                        <hr />
                        <h6 class="mb-0">Short Bio</h6>
                        <p class v-if="user.short_bio">{{ user.short_bio }}</p>-->
                      </div>
                    </div>
                    <!-- <div class="card">
                      <ul class="list-group list-group-flush">
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                        >
                          <h5 class="mb-0">Social Links</h5>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                        >
                          <h6 class="mb-0">GitHub</h6>
                          <span
                            v-if="user.user_profile.github"
                            class="text-secondary"
                          >{{ user.user_profile.github }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                        >
                          <h6 class="mb-0">Linked In</h6>
                          <span
                            v-if="user.user_profile.linkedin"
                            class="text-secondary"
                          >{{ user.user_profile.linkedin }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                        >
                          <h6 class="mb-0">FaceBook</h6>
                          <span
                            v-if="user.user_profile.facebook"
                            class="text-secondary"
                          >{{ user.user_profile.facebook }}</span>
                        </li>
                        <li
                          class="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                        >
                          <h6 class="mb-0">Personal Website</h6>
                          <span
                            v-if="user.user_profile.personal_website"
                            class="text-secondary"
                          >{{ user.user_profile.personal_website }}</span>
                        </li>
                      </ul>
                    </div>-->
                  </div>
                </div>
              </div>
            </div>
            <!-- Skils & bio-->
            <div class="row gutters-sm">
              <div class="col-sm-12 mb-3">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info"></i>
                      {{ $store.getters.GET_SKILLS_AND_SHORTBIO}}
                    </h5>
                    <hr />
                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_SKILLS}}
                        </h6>
                      </div>
                      <div v-if="user.user_profile.skills" class="col-sm-10 text-secondary">
                        <template v-for="(skill,index) in userSkills" :key="index">
                          <span class="badge badge-success mr-1">{{skill}}</span>
                        </template>
                      </div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col-sm-2">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_SHORT_BIO}}
                        </h6>
                      </div>
                      <div
                        v-if="user.user_profile.short_bio"
                        class="col-sm-10 text-secondary"
                      >{{ user.user_profile.short_bio }}</div>
                    </div>
                    <!-- 
                        <h6 class="mb-0">Skills</h6>
                        <span v-if="user.skills">{{ user.short_bio }}</span>
                        <hr />
                        <h6 class="mb-0">Short Bio</h6>
                    <p class v-if="user.short_bio">{{ user.short_bio }}</p>-->
                  </div>
                </div>
              </div>
            </div>
            <!-- groups & permissions -->
            <div class="row gutters-sm">
              <div class="col-md-12">
                <div class="card mb-3">
                  <div class="card-body">
                    <h5 class="d-flex align-items-center mb-3">
                      <i class="material-icons text-info"></i>
                      {{ $store.getters.GET_GROUPS_AND_PERMISSIONS}}
                    </h5>
                    <hr />
                    <div class="row">
                      <div class="col-sm-6 col-md-2">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_USER+ " "+$store.getters.GET_GROUP }}
                        </h6>
                      </div>
                      <div v-if="user.groups" class="col-sm-10 text-secondary">{{ userGroups }}</div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-6 col-md-2">
                        <h6 class="mb-0">
                          {{ $store.getters.GET_USER+ " "+$store.getters.GET_PERMISSION }}
                        </h6>
                      </div>
                      <div
                        v-if="user.user_permissions"
                        class="col-sm-10 text-secondary capitalizeNames"
                      >
                      <!-- {{ userPermissions }} -->
                      <div class="row">
                      <div class="col-sm-12 col-md-6 col-lg-4 col-xl-4" v-for="prmsn in userPermissions" :key="prmsn.id">
                        <li class="text-secondary">{{ prmsn.name.slice(3)}}</li>
                      </div>
                    </div>
                      </div>
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
import permissions from "../../../authorization/permissions";

export default {
  name: "UserDetails",
  components: { Master },
  data() {
    return {
      user: null,
      userSkills: null,
      userGroups: null,
      userPermissions: null,
    };
  },

  created() {
    this.getUserdata();
  },
  methods: {
    getUserdata() {
      axios.get(`users/${this.$route.params.id}/`, {}).then((response) => {
        this.user = response.data;
        this.userSkills = response.data.user_profile.skills;
        this.userGroups = response.data.groups
          .map((element) => element.name)
          .join(", ");
        this.userPermissions = response.data.user_permissions;
          // .map((element) => element.name.slice(3))
          // .join(", ");
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
/* new profile card  by bootstrap4 */

.main-body {
  padding: 15px;
}
.card {
  margin-bottom: 0px !important;
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
