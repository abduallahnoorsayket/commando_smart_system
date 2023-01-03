<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-plus-square icon-gradient bg-tempting-azure"></i>
              </div>
              <div>Add New Project</div>
              <router-link :to="{ path: '/project-list' }" v-if="hasPermission('view_project')">
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-list"></span> Project List
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <form @submit.prevent="submitProjectForm" autocomplete="off">
                  <div class="form-group">
                    <!--Project Name-->
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label>
                            Project Name
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            id="project_name"
                            v-model="project_name"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': error_data && error_data.project_name }"
                          />

                          <!--error handling-->
                          <div
                            :class="{ 'invalid-feedback': error_data && error_data.project_name }"
                            v-if="error_data && error_data.project_name"
                          >{{ error_data.project_name[0] }}</div>
                        </div>
                      </div>
                    </div>
                    <!--Project ID-->
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label>
                            Project ID
                            <span class="asterisk">*</span>
                          </label>
                          <span class="text-muted">(Please fill up carefully. You can not edit this filed later.)</span>
                          <input
                            id="project_name"
                            v-model="project_id"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': error_data && error_data.project_id }"
                          />

                          <!--error handling-->
                          <div
                            :class="{ 'invalid-feedback': error_data && error_data.project_id }"
                            v-if="error_data && error_data.project_id"
                          >{{ error_data.project_id[0] }}</div>
                        </div>
                      </div>
                    </div>

                    <!--Description-->
                    <div class="form-row">
                      <div class="col-md-10">
                        <div class="position-relative form-group">
                          <label>
                            Description
                            <!-- <span class="asterisk">*</span> -->
                          </label>
                          <br />
                          <ckeditor :editor="editor" v-model="description" :config="editorConfig"></ckeditor>
                          <div
                            v-if="error_data && error_data.description"
                            class="alert alert-danger alert-dismissible fade show text-left mt-1"
                            role="alert"
                          >
                            {{ error_data.description[0] }}
                            <button
                              type="button"
                              class="close"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="position-relative form-group">
                          <div class="instruction">
                            <h6 class="ml-4 baseColorFont">
                              <b>Instructions:</b>
                            </h6>
                            <ul class>
                              <li>Please write project detail information here.</li>
                              <li>Add project duration.</li>
                              <li>Add project starting date and ending date.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!--Project URL-->
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label>
                            Project URL
                            <!-- <span class="asterisk">*</span> -->
                          </label>
                          <input
                            v-model="project_url"
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': error_data && error_data.project_url }"
                          />

                          <!--error handling-->
                          <div
                            :class="{ 'invalid-feedback': error_data && error_data.project_url }"
                            v-if="error_data && error_data.project_url"
                          >{{ error_data.project_url[0] }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Expected start date
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            v-model="expected_start_date"
                            :class="{
                          'is-invalid':
                            error_data && error_data.expected_start_date, }"
                          />
                          <div
                            :class="{
                          'invalid-feedback':
                            error_data && error_data.expected_start_date,
                        }"
                            v-if="
                          error_data && error_data.expected_start_date
                        "
                          >{{ error_data.expected_start_date[0] }}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Start date
                            <!-- <span class="asterisk">*</span> -->
                          </label>
                          <input type="date" class="form-control" v-model="start_date" />
                          <!-- <div
                          :class="{ 'invalid-feedback': error_data && error_data.user_profile.joining_date }"
                          v-if="error_data && error_data.user_profile.joining_date"
                          >{{ error_data.user_profile.joining_date[0] }}</div>-->
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Expected end date
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            v-model="expected_end_date"
                            :class="{
                          'is-invalid':
                            error_data && error_data.expected_end_date, }"
                          />
                          <div
                            :class="{
                          'invalid-feedback':
                            error_data && error_data.expected_end_date,
                        }"
                            v-if="
                          error_data && error_data.expected_end_date
                        "
                          >{{ error_data.expected_end_date[0] }}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            End date
                            <!-- <span class="asterisk">*</span> -->
                          </label>
                          <input type="date" class="form-control" v-model="end_date" />
                          <!-- <div
                          :class="{ 'invalid-feedback': error_data && error_data.user_profile.joining_date }"
                          v-if="error_data && error_data.user_profile.joining_date"
                          >{{ error_data.user_profile.joining_date[0] }}</div>-->
                        </div>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Expected handover date
                            <!-- <span class="asterisk">*</span> -->
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            v-model="expected_handover_date"
                            :class="{
                          'is-invalid':
                            error_data && error_data.expected_handover_date, }"
                          />
                          <div
                            :class="{
                          'invalid-feedback':
                            error_data && error_data.expected_handover_date,
                        }"
                            v-if="
                          error_data && error_data.expected_handover_date
                        "
                          >{{ error_data.expected_handover_date[0] }}</div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>Handover date</label>
                          <input type="date" class="form-control" v-model="handover_date" />
                          <!-- <div
                          :class="{ 'invalid-feedback': error_data && error_data.user_profile.joining_date }"
                          v-if="error_data && error_data.user_profile.joining_date"
                          >{{ error_data.user_profile.joining_date[0] }}</div>-->
                        </div>
                      </div>
                    </div>

                    <!--Branch & Client-->
                    <div class="form-row mt-3">
                      <!--Branch-->
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Branch
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select[]"
                            v-model="branch"
                            class="form-control"
                            :class="{ 'is-invalid': error_data && error_data.branch }"
                          >
                            <option value="false" disabled selected>Select Branch</option>
                            <option
                              v-for="branches in all_branch"
                              :key="branches.id"
                              :value="branches.id"
                            >{{ branches.branch_name }}</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': error_data && error_data.branch }"
                            v-if="error_data && error_data.branch"
                          >{{ error_data.branch[0] }}</div>
                        </div>
                      </div>

                      <!--Client-->
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            Client
                            <span class="asterisk">*</span>
                          </label>
                          <select
                            name="select[]"
                            v-model="client"
                            class="form-control"
                            :class="{ 'is-invalid': error_data && error_data.client }"
                          >
                            <option value="false" disabled selected>Select Client</option>
                            <option
                              v-for="client in all_clients"
                              :key="client.id"
                              :value="client.id"
                            >{{ client.client_name }}</option>
                          </select>
                          <div
                            :class="{ 'invalid-feedback': error_data && error_data.client }"
                            v-if="error_data && error_data.client"
                          >{{ error_data.client[0] }}</div>
                        </div>
                      </div>
                    </div>

                    <!-- Team Members -->
                    <div class="form-row mt-4">
                      <div class="col-md-6 permissions">
                        <label>
                          Team Members
                          <span class="asterisk">*</span>
                        </label>
                        <br />
                        <div class="p-listbox p-component">
                          <div class="p-listbox-header">
                            <div class="p-listbox-filter-container">
                              <input
                                type="text"
                                class="p-listbox-filter p-inputtext p-component"
                                v-model="searchMember"
                                placeholder="Filter"
                              />
                              <span class="p-listbox-filter-icon pi pi-search"></span>
                            </div>
                          </div>
                          <div class="p-listbox-list-wrapper">
                            <div
                              role="listbox"
                              aria-multiselectable="multiple"
                              class="p-listbox-list"
                              v-if="all_users"
                            >
                              <div class="p-listbox-item" v-for="user in resultUser" :key="user.id">
                                <label class="form-check-label" style="font-weight: 300;">
                                  <input
                                    type="checkbox"
                                    :id="user.id"
                                    :value="user.id"
                                    v-model="members"
                                  />
                                  <span class="checkmark"></span>
                                  {{ user.first_name + ' ' + user.last_name}}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <label>
                          Status
                          <span class="asterisk">*</span>
                        </label>
                        <select
                          name="select"
                          id="type"
                          v-model="status"
                          type="choice"
                          class="form-control"
                          :class="{ 'is-invalid': error_data && error_data.status }"
                        >
                          <option value="PN">Pending</option>
                          <option value="RN">Running</option>
                          <option value="CM">Completed</option>
                          <option value="HO">Handover</option>
                          <option value="PP">Postponed</option>
                        </select>
                        <div
                          :class="{ 'invalid-feedback': error_data && error_data.status }"
                          v-if="error_data && error_data.status"
                        >{{ error_data.status[0] }}</div>
                      </div>
                    </div>

                    <div class="form-group mt-2">
                      <button
                        @submit.prevent="submitProjectForm"
                        class="mt-2 btn btn-successs btn-lg float-right"
                      >Create Project</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Swal from "sweetalert2";
import permissions from "../../../authorization/permissions";

export default {
  name: "AddNewProject",
  components: {
    Master,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      content_id: null,
      project_name: null,
      project_id: null,
      description: null,
      project_url: null,
      branch: null,
      client: null,
      members: [],
      expected_start_date: null,
      start_date: null,
      expected_end_date: null,
      end_date: null,
      expected_handover_date: null,
      handover_date: null,
      status: null,
      created_datetime: null,
      all_branch: null,
      all_clients: null,
      all_users: null,
      all_content: null,
      searchMember: null,
      form_data: {
        first_name: null,
      },
      files_related: [],
      // for CKEditor
      editor: ClassicEditor,

      error_data: {
        project_name: null,
        description: null,
        project_url: null,
        branch: null,
        client: null,
        status: null,
        created_datetime: null,
        files: null,
      },
    };
  },

  created() {
    this.initialLoad();
  },

  methods: {
    initialLoad: function () {
      this.loadBranch();
      this.loadClients();
      this.loadPermission();
      this.loadUser();
    },
    // Load branch into dropdown
    loadBranch() {
      axios
        .get("branches/", {
        })
        .then((response) => {
          this.all_branch = response.data;
          // this.pushReuseForm()
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // Load Clients into dropdown
    loadClients() {
      axios
        .get("clients-list/", {
        })
        .then((response) => {
          this.all_clients = response.data;
          // this.pushReuseForm()
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /*load User*/
    loadPermission() {
      axios
        .get("users/", {
        })
        .then((response) => {
          this.all_users = response.data.results;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /*load  User*/
    loadUser: function () {
      let user_id = localStorage.getItem("id");
      axios
        .get("users/" + user_id + "/", {
        })
        .then((response) => {
          this.form_data = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /*Submit Project Form*/
    submitProjectForm() {
      var data = {
        project_name: this.project_name,
        project_id: this.project_id,
        description: this.description,
        project_url: this.project_url,
        branch: this.branch,
        client: this.client,
        members: this.members,
        status: this.status,
        expected_start_date: this.expected_start_date,
        start_date: this.start_date,
        expected_end_date: this.expected_end_date,
        end_date: this.end_date,
        expected_handover_date: this.expected_handover_date,
        handover_date: this.handover_date,
      };
      axios
        .post("projects/", {
          ...data,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully create a Project..",
          }).then((result) => {
            this.$router.push("project-list");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.error_data = error.response.data;
          console.log("--++", error.response, this.error_data);
        });
      // console.log(response);
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },

  computed: {
    resultUser() {
      if (this.searchMember) {
        return this.all_users.filter((item) => {
          return this.searchMember
            .toLowerCase()
            .split(" ")
            .every((v) => item.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.all_users;
      }
    },
  },
};
</script>

<style scoped>
.instruction {
  margin-top: 15%;
}
.form-group input {
  box-shadow: none !important;
}
</style>
