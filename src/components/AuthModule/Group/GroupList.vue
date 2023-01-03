<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" id="axiosForm">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_GROUP + " " + $store.getters.GET_LIST }}
                <router-link
                  :to="{ path: '/create-group' }"
                  v-if="hasPermission('add_group')"
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
        <div class="loader" v-if="loading"></div>
        <div class="row" v-if="groups">
          <div class="col-12">
            <div class="main-card card">
              <GroupDetailModal v-if="isModalVisible" />
              <div class="card-body">
                <!-- previous table  -->
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">{{ $store.getters.GET_SL }}</th>
                        <th scope="col">
                          {{
                            $store.getters.GET_GROUP +
                            " " +
                            $store.getters.GET_NAME
                          }}
                        </th>
                        <th scope="col">{{ $store.getters.GET_ACTION }}</th>
                      </tr>
                    </thead>
                    <tbody v-if="groups.length > 0">
                      <tr v-for="(group, SL) in groups" :key="group.id">
                        <td>{{ SL + 1 }}</td>
                        <td>{{ group.name }}</td>
                        <td class="td_action">
                          <!-- <router-link
                          class="item"
                          :to="{ name: 'GroupDetails', params: { id: group.id } }"
                          v-if="hasPermission('view_group')"
                          >-->
                          <i
                            v-if="hasPermission('view_group')"
                            class="fas fa-eye"
                            @click="OpenModal(group.id)"
                          ></i>
                          <!-- </router-link> -->

                          <router-link
                            class="item"
                            :to="{
                              name: 'UpdateGroup',
                              params: { id: group.id },
                            }"
                            v-if="hasPermission('change_group')"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>
                          <i
                            class="fas fa-trash-alt"
                            @click="deleteGroupItem(group.id) in groups"
                            v-if="hasPermission('delete_group')"
                          ></i>
                        </td>
                      </tr>
                    </tbody>

                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="8" class="text-center align-middle">
                          <h4>
                            {{
                              $store.getters.GET_NO_DATA_FOUND +
                              " " +
                              $store.getters.GET_EXCLAMATION_MARK
                            }}
                          </h4>
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
import GroupDetailModal from "./GroupDetailModal";
export default {
  name: "GroupList",
  components: { Master, GroupDetailModal },
  data() {
    return {
      groups: null,
      loading: false,
    };
  },
  created() {
    this.GetUserList();
  },
  computed: {
    isModalVisible() {
      return this.$store.state.auth.isModalVisible;
    },
  },
  methods: {
    OpenModal(id) {
      this.$store.commit("auth/toggleModal", id);
      // this.$store.commit("a/setGroupID", id);
    },
    GetUserList: function () {
      this.loading = true;
      axios
        .get("groups/")
        .then((response) => {
          this.groups = response.data;
          console.log(response.status);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    deleteGroupItem: function (id) {
      Swal.fire({
        title: this.$store.getters.GET_ARE_YOU_SURE,
        text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("groups/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetUserList();
            }
            Swal.fire(
              this.$store.getters.GET_DELETED,
              this.$store.getters.GET_DELETED +
                " " +
                this.$store.getters.GET_SUCCESSFULLY +
                " ...",
              "success"
            );
          });
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
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
/* new card design Medium Aquamarine */
/*  */
</style>
