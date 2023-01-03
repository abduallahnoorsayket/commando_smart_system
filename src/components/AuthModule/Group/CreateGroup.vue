<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="axiosForm">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i
                  class="fas fa-plus-square icon-gradient bg-tempting-azure"
                ></i>
              </div>
              {{ $store.getters.GET_CREATE + " " + $store.getters.GET_GROUP }}
            </div>
          </div>
        </div>
        <div class="loader" v-if="loading"></div>
        <div class="main-card card" v-if="permissions">
          <div class="card-body">
            <form @submit.prevent="submitGroupForm" autocomplete="off">
              <div class="form-group row mt-3">
                <label class="col-md-12 col-lg-2 col-form-label"
                  >{{
                    $store.getters.GET_GROUP + " " + $store.getters.GET_NAME
                  }}
                  <span class="asterisk">*</span></label
                >
                <div class="col-md-12 col-lg-10">
                  <input
                    type="text"
                    class="form-control"
                    v-model="name"
                    :class="{
                      'is-invalid': group_error_data && group_error_data.name,
                    }"
                  />
                  <div
                    :class="{
                      'invalid-feedback':
                        group_error_data && group_error_data.name,
                    }"
                    v-if="group_error_data && group_error_data.name"
                  >
                    {{ group_error_data.name[0] }}
                  </div>
                </div>
              </div>
              <!--  new permission ui -->
              <div class="form-group row mt-4">
                <label class="col-md-12 col-lg-2 col-form-label">{{
                  $store.getters.GET_PERMISSIONS
                }}</label>
                <div class="col-md-12 col-lg-10">
                  <div class="p-listbox p-component">
                    <!-- <div class="p-listbox-header">
                      <div class="p-listbox-filter-container">
                        <input
                          type="text"
                          class="p-listbox-filter p-inputtext p-component"
                          v-model="searchQuery"
                          placeholder="Filter"
                        />
                        <span class="p-listbox-filter-icon pi pi-search"></span>
                      </div>
                    </div> -->
                    <div class="p-listbox-list-wrapper">
                      <div
                        role="listbox"
                        aria-multiselectable="multiple"
                        class="p-listbox-list permission-custom-height"
                      >
                        <div
                          class="module-permission-section"
                          v-for="(module_obj, perm_index) in permissions"
                          :key="perm_index"
                        >
                          <div class="main-card lastActivityCard">
                            <h5 class="listTitle">{{ module_obj.module }}</h5>
                          </div>
                          <div class="row module">
                            <div class="col-md-12">
                              <div class="p-listbox-item">
                                <label class="form-check-label">
                                  <input
                                    type="checkbox"
                                    class="form-check-input"
                                    @click="ModuleClick($event, perm_index)"
                                    :id="'module_' + perm_index"
                                  />
                                  <span class="checkmark"></span>
                                  {{ module_obj.module }}
                                </label>
                              </div>
                            </div>
                          </div>
                          <template
                            v-for="(model, m_index) in module_obj.models"
                            :key="m_index"
                          >
                            <div class="row submodule">
                              <div class="col-md-12">
                                <div class="p-listbox-item">
                                  <label
                                    class="form-check-label"
                                    style="font-weight: 600"
                                  >
                                    <input
                                      type="checkbox"
                                      class="form-check-input"
                                      @click="
                                        ModelClick($event, perm_index, m_index)
                                      "
                                      :id="
                                        'module_' +
                                        perm_index +
                                        '_model_' +
                                        m_index
                                      "
                                    />
                                    <span class="checkmark"></span>
                                    {{ model.name }}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="row permission_name">
                              <div
                                class="col-sm-6 col-md-6 col-xl-3"
                                v-for="(
                                  permission, model_index
                                ) in model.permissions"
                                :key="model_index"
                              >
                                <div class="p-listbox-item">
                                  <label
                                    class="form-check-label"
                                    style="font-weight: 300"
                                  >
                                    <input
                                      type="checkbox"
                                      class="form-check-input"
                                      :value="permission.id"
                                      v-model="selectedPermissions"
                                    />
                                    <span class="checkmark"></span>
                                    {{ permission.name.slice(3) }}
                                  </label>
                                </div>
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <button
                  @submit.prevent="submitGroupForm"
                  class="mt-2 btn btn-successs btn-lg float-right"
                >
                  {{ $store.getters.GET_SUBMIT }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CreateGroup",
  components: { Master },
  data() {
    return {
      loading: false,
      name: null,
      selectedPermissions: [],
      permissions: null,
      all_permission: null,
      searchQuery: null,
      // new props
      // module_list:[],
      // model_list:[],

      group_error_data: {
        name: null,
      },
    };
  },

  methods: {
    // checkAll(modelPermissions, modelName) {
    //   this.model_permissions = [];
    //   this.model_permissions = modelPermissions;
    //   let filter_permission = modelPermissions.map((element) => {
    //     return element.id;
    //   });
    //   console.log("201", filter_permission);
    //   if (modelName) {
    //     this.is_submodule_checked = !this.is_submodule_checked;
    //   }
    //   if (this.is_submodule_checked) {
    //     for (var key in this.model_permissions) {
    //       this.permissions.push(this.model_permissions[key].id);
    //     }
    //   }
    //   this.is_submodule_checked = false;
    // },
    // updateCheckall() {
    //   if (this.permissions.length == this.model_permissions.length) {
    //     this.isCheckAll = true;
    //   } else {
    //     this.isCheckAll = false;
    //   }
    // },

    // for API call
    //  new function for gorup wise check / uncheck
    ModuleClick(e, module_index) {
      // console.log(this.permissions[module_index]['models']);
      this.permissions[module_index]["models"].forEach((element, key) => {
        // console.log(e, module_index, key);
        document.getElementById(
          "module_" + module_index + "_model_" + key
        ).checked = e.target.checked;
        this.ModelClick(e, module_index, key);
      });
    },
    ModelClick(e, module_index, model_index) {
      if (e.target.checked) {
        //push id in permissions object
        this.permissions[module_index]["models"][model_index][
          "permissions"
        ].forEach((element) => {
          this.selectedPermissions.push(element.id);
        });
      } else {
        this.permissions[module_index]["models"][model_index][
          "permissions"
        ].forEach((element) => {
          // this.selectedPermissions.push(element.id);
          let index = this.selectedPermissions.indexOf(element.id);
          if (index !== -1) {
            // console.log(this.selectedPermissions.splice(index));
            this.selectedPermissions.splice(index, 1);
          }
        });
      }
    },
    async submitGroupForm() {
      const response = await axios
        .post("groups/", {
          name: this.name,
          permissions: this.selectedPermissions,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:
              this.$store.getters.GET_CREATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              "...",
          }).then((result) => {
            this.$router.push("group-list");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.group_error_data = error.response.data;
        });
      console.log(response);
    },

    loadPermission() {
      this.loading = true;
      axios
        .get("custom-permissions/", {})
        .then((response) => {
          this.permissions = response.data;
          // this.module_list = response.data.map((element) => {
          //   return element.module;
          // });
          //  this.model_list = response.data.map((element) => {
          //   return element.models;
          // });
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          // this.loading = true;
        });
    },
  },

  created() {
    this.loadPermission();
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.all_permission.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.all_permission;
      }
    },
  },
};
</script>

<style scoped>
/*  new permission UI */
.p-listbox .p-listbox-list {
  /* padding: 0.5rem 0; */
  /* height: 485px; */
  height: auto !important;
  padding: 0.2rem 1.5rem;
}
.lastActivityCard {
  /* background: #e6f7f4; */
  background: #d8f3e5;
  padding: 1px;
  border-left: 2px solid #69c5a5;
  border-radius: 1px;
  margin: 0px 0px 15px 0px;
}
.listTitle {
  margin-left: 10px;
  margin-top: 10px;
}
.submodule {
  margin-left: 40px;
}
.permission_name {
  margin-left: 100px;
}
.module-permission-section {
  margin: 15px 0px 30px 0px;
}
.module {
  margin: 20px 0px 10px 10px;
}
.is_checked {
  color: red;
}
</style>
