<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>{{ $store.getters.GET_DEPARTMENT +' '+$store.getters.GET_LIST}}
                <router-link
                :to="{path: '/create-department'}"
                v-if="hasPermission('add_department')"
              >
                <a class="largeButton" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-plus-square"></span>  {{ $store.getters.GET_ADD_NEW}}
                  </button>
                </a>
                <a class="smallButton" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-plus-square"></span>  {{ $store.getters.GET_ADD}}
                  </button>
                </a>
              </router-link>
              </div>

              
            </div>
          </div>
        </div>
        <div class="row" v-if="departments">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead class="tableHeader">
                      <tr>
                        <th scope="col"> {{ $store.getters.GET_SL}}</th>
                        <th scope="col"> {{ $store.getters.GET_DEPARTMENT +' '+$store.getters.GET_NAME}}</th>
                        <th scope="col"> {{ $store.getters.GET_DEPARTMENT +' '+$store.getters.GET_CODE}}</th>
                        <th scope="col"> {{ $store.getters.GET_ACTION}}</th>
                      </tr>
                    </thead>
                    <tbody v-if="departments.length > 0">
                      <tr
                        class="tableRow"
                        v-for="(department, SL) in departments"
                        :key="department"
                      >
                        <td>{{SL+1}}</td>
                        <td>{{department.department_name}}</td>
                        <td>{{department.department_code}}</td>

                        <td class="td_action">
                          <router-link
                            class="item"
                            :to="{ name: 'UpdateDepartment', params: { id: department.id } }"
                            v-if="hasPermission('change_department')"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>

                          <i
                            class="fas fa-trash-alt"
                            @click="deleteDepartmentItem(department.id) in departments"
                            v-if="hasPermission('delete_department')"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                    <!--  if No result  -->
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
  name: "DepartmentList",
  components: { Master },
  data() {
    return {
      departments: null,
    };
  },
  async created() {
    await this.GetDepartmentList();
  },
  methods: {
    GetDepartmentList: function () {
      axios.get("departments/").then((response) => {
        this.departments = response.data;
      });
    },

    deleteDepartmentItem: function (id) {
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
          axios.delete("departments/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetDepartmentList();
            }
          });
          Swal.fire(
            this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
            "success"
          );
        } else {
          Swal.fire(
             this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +' '+this.$store.getters.GET_DELETED +" ...",
            "error"
          );
        }
      });
    },

    hasModulePermission(...module_name) {
      return permissions.hasModulePermission(...module_name);
      // return permissions.hasModulePermission.apply(...module_name)
    },

    hasModelPermission(model_name) {
      return permissions.hasModelPermission(model_name);
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>

</style>