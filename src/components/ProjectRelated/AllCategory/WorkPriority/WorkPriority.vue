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
              <div>All Work Priority</div>
              <a
                v-if="hasPermission('add_workpriority')"
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
                  Add Work Priority
                </button>
              </a>
            </div>
          </div>
        </div>
        <!-- :demo_message="{
                    message: message,
        }"-->

        <!--AddWorkTypeModal Component Calling-->
        <!-- <div class="div" id="modals">
          Modal BY Props////
           @close-update="CloseUpdateModal"
          v-if="isUpdateVisible"
          :employee_update="{
                    update_attendance_id: update_attendance_id,
                    isUpdateVisible: isUpdateVisible,
                  }"
          
        </div>-->
        <AddWorkPriorityModal @load-workPriority="WorkPriorityLoad" v-if="isModalVisible" />

        <!--UpdateWorkTypeModal Component Calling-->
        <UpdateWorkPriorityModal @load-workPriority="WorkPriorityLoad" v-if="isEditModalVisible" />

        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Work Priority</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(priority, SL) in work_priority" :key="priority.id">
                      <td>{{SL+1}}</td>
                      <td>{{priority.name}}</td>
                      <td class="td_action">
                        <i
                          v-if="hasPermission('change_workpriority')"
                          class="fas fa-edit"
                          @click="OpenUpdateModal(priority.id)"
                        ></i>

                        <i
                          v-if="hasPermission('delete_workpriority')"
                          class="fas fa-trash-alt"
                          @click="deleteWorkPriorityItem(priority.id) in work_priority"
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
import AddWorkPriorityModal from "./AddWorkPriorityModal";
import UpdateWorkPriorityModal from "./UpdateWorkPriorityModal";
import permissions from "../../../../authorization/permissions";

export default {
  name: "WorkPriority",
  components: {
    Master,
    AddWorkPriorityModal,
    UpdateWorkPriorityModal,
  },
  data() {
    return {
      work_priority: null,
      update_attendance_id: null,
    };
  },
  async created() {
    await this.getWorkPriorityList();
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.WorkPriorityAddModalVisible;
    },
    isEditModalVisible() {
      return this.$store.state.projectRelated.WorkPriorityEditModalVisible;
    },
  },
  methods: {
    async WorkPriorityLoad() {
      // this.subtask_response_ID = null;
      await this.getWorkPriorityList();
    },
    getWorkPriorityList: function () {
      axios.get("work-priorities/").then((response) => {
        this.work_priority = response.data;
        console.log(this.work_priority);
        console.log(response.status);
      });
    },

    deleteWorkPriorityItem: function (id) {
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
          axios.delete("work-priorities/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.getWorkPriorityList();
            }
            Swal.fire(
              "Deleted!",
              "Your Work Priority has been deleted!!",
              "success"
            );
          });
          // Swal.fire("Deleted!", "Your group has been deleted!!", "success");
          Swal.fire(
            "Cancelled",
            "Your Work Priority has not been deleted !",
            "error"
          );
        } else {
          // Swal.fire("Cancelled", "Your group has not been deleted !", "error");
        }
      });
    },

    OpenModal() {
      console.log("148");
      this.$store.commit("projectRelated/toggleWorkPriorityAddModal");
      console.log(
        "150",
        this.$store.state.projectRelated.WorkPriorityAddModalVisible
      );
    },

    OpenUpdateModal(id) {
      this.$store.commit("projectRelated/toggleWorkPriorityEditModal", id);
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