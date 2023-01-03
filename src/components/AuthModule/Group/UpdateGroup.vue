<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="axiosForm">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-edit icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_UPDATE + " " + $store.getters.GET_GROUP }}
                <!-- <div class="page-title-subheading">Admin can update group from this form.
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="loader" v-if="loading"></div>
        <div class="main-card card" v-if="form_data">
          <div class="card-body">
            <form @submit.prevent="EditGroup" autocomplete="off">
              <!-- <div class="form-group row">
                <label class="col-md-2 col-form-label">
                  Group Name
                  <span class="asterisk">*</span>
                </label>
                <div class="col-md-10">
                  <input
                    type="text"
                    class="form-control"
                    v-model="form_data.name"
                    :class="{'is-invalid':group_error_data && group_error_data.name}"
                  />
                  <div
                    :class="{'invalid-feedback':group_error_data && group_error_data.name}"
                    v-if="group_error_data && group_error_data.name"
                  >{{group_error_data.name[0] }}</div>
                </div>
              </div> -->

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
                    v-model="form_data.name"
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
                                    style="font-weight: 300"
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
                                    <!--v-model="isCheckAll" @click="checkAll(model.permissions)" -->
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
                                      v-model="form_data.permissions"
                                    />
                                    <!-- @change="updateCheckall()" -->
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
                  @submit.prevent="EditGroup"
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
  name: "UpdateGroup",
  components: { Master },
  data() {
    return {
      loading: false,
      name: null,
      form_data: null,
      all_permission: null,
      selectedPermissions: [],
      permissions: null,
      searchQuery: null,

      group_error_data: {
        name: null,
      },
    };
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

  methods: {
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
          this.form_data.permissions.push(element.id);
        });
      } else {
        this.permissions[module_index]["models"][model_index][
          "permissions"
        ].forEach((element) => {
          // this.selectedPermissions.push(element.id);
          let index = this.form_data.permissions.indexOf(element.id);
          if (index !== -1) {
            // console.log(this.selectedPermissions.splice(index));
            this.form_data.permissions.splice(index, 1);
          }
        });
      }
    },

    loadPermission() {
      this.loading = true;
      axios
        .get("custom-permissions/", {})
        .then((response) => {
          this.permissions = response.data;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getGroupData: function () {
      axios.get(`groups/${this.$route.params.id}/`).then(
        (response) => {
          this.form_data = response.data;
          this.form_data.permissions = this.form_data.permissions.map(
            (z) => z.id
          );
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    EditGroup() {
      axios
        .put("groups/" + this.$route.params.id + "/", {
          name: this.form_data.name,
          permissions: this.form_data.permissions,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:
              this.$store.getters.GET_UPDATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              "...",
          }).then((response) => {
            this.$router.push({ name: "GroupList" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          this.group_error_data = error.response.data;
        });
    },
  },

  created() {
    this.loadPermission();
    this.getGroupData();
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
</style>
