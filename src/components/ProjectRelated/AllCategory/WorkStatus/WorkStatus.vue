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
              <div>All Work Status</div>

              <a
                v-if="hasPermission('add_workstatus')"
                class="float"
                style="position: absolute; right: 0"
              >
                <button
                  @click="OpenModal()"
                  type="button"
                  class="btn btn-successs"
                  style="font-size: 15px"
                >
                  <span class="fas fa-plus-square"></span>
                  Add Work Status
                </button>
              </a>
            </div>
          </div>
        </div>

        <!--AddWorkStatusModal Component Define-->
        <AddWorkStatusModal @load-workStatus="WorkStatusLoad" v-if="isModalVisible" />

        <!--UpdateWorkTypeModal Component Calling-->
        <UpdateWorkStatusModal @load-workStatus="WorkStatusLoad" v-if="isEditModalVisible" />

        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Work Status Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(status, SL) in work_status" :key="status.id">
                      <td>{{SL+1}}</td>
                      <td>{{status.name}}</td>
                      <td class="td_action">
                        <i
                          v-if="hasPermission('change_workstatus')"
                          class="fas fa-edit"
                          @click="OpenEditModal(status.id)"
                        ></i>

                        <i
                          v-if="hasPermission('delete_workstatus')"
                          class="fas fa-trash-alt"
                          @click="deleteWorkStatusItem(status.id) in work_status"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import AddWorkStatusModal from "./AddWorkStatusModal";
import UpdateWorkStatusModal from "./UpdateWorkStatusModal";
import permissions from "../../../../authorization/permissions";

export default {
  name: "WorkStatus",
  components: { Master, AddWorkStatusModal, UpdateWorkStatusModal },
  data() {
    return {
      work_status: null,
      update_attendance_id: null,
    };
  },
  async created() {
    await this.getWorkStatusList();
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.WorkStatusAddModalVisible;
    },
    isEditModalVisible() {
      return this.$store.state.projectRelated.WorkStatusEditModalVisible;
    },
  },
  methods: {
    async WorkStatusLoad() {
      // this.subtask_response_ID = null;
      await this.getWorkStatusList();
    },
    getWorkStatusList: function () {
      axios.get("work-statuses/").then((response) => {
        this.work_status = response.data;
        console.log(this.work_status);
        console.log(response.status);
      });
    },

    deleteWorkStatusItem: function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("work-statuses/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.getWorkStatusList();
            }
            Swal.fire(
              "Deleted!",
              "Your work status has been deleted!!",
              "success"
            );
          });
          // Swal.fire("Deleted!", "Your group has been deleted!!", "success");
          Swal.fire(
            "Cancelled",
            "Your work status has not been deleted !",
            "error"
          );
        } else {
          // Swal.fire("Cancelled", "Your group has not been deleted !", "error");
        }
      });
    },

    OpenModal() {
      this.$store.commit("projectRelated/toggleWorkStatusAddModal");
    },

    OpenEditModal(id) {
      this.$store.commit("projectRelated/toggleWorkStatusEditModal", id);
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