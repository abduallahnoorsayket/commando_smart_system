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
              <div>
                  {{ $store.getters.GET_DESIGNATION +' '+$store.getters.GET_LIST}}
                <router-link
                :to="{path: '/create-designation'}"
                v-if="hasPermission('add_designation')"
              >
                <a class="largeButton" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-plus-square"></span> {{ $store.getters.GET_ADD_NEW}}
                  </button>
                </a>
                 <a class="smallButton" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-plus-square"></span> {{ $store.getters.GET_ADD}}
                  </button>
                </a>
              </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="designations">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead class="tableHeader">
                      <tr>
                        <th scope="col">{{ $store.getters.GET_SL}}</th>
                        <th scope="col">{{ $store.getters.GET_DESIGNATION +' '+$store.getters.GET_NAME}}</th>
                        <th scope="col">{{ $store.getters.GET_ACTION}}</th>
                      </tr>
                    </thead>
                    <tbody v-if="designations.length > 0">
                      <tr
                        class="tableRow"
                        v-for="(designation, SL) in designations"
                        :key="designation"
                      >
                        <td>{{SL+1}}</td>
                        <td>{{designation.designation_name}}</td>

                        <td class="td_action">
                          <router-link
                            class="item"
                            :to="{ name: 'UpdateDesignation', params: { id: designation.id } }"
                            v-if="hasPermission('change_designation')"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>

                          <i
                            class="fas fa-trash-alt"
                            @click="deleteDesignationItem(designation.id) in designations"
                            v-if="hasPermission('delete_designation')"
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
  name: "DesignationList",
  components: { Master },
  data() {
    return {
      designations: null,
    };
  },
  async created() {
    await this.GetDesignationList();
  },
  methods: {
    GetDesignationList: function () {
      axios.get("designation/").then((response) => {
        this.designations = response.data;
      });
    },

    deleteDesignationItem: function (id) {
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
          axios.delete("designation/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetDesignationList();
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