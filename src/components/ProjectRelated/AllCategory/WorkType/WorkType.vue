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
              <div>ALL Work Type</div>

              <a
                class="float"
                style="position: absolute; right: 0"
                v-if="hasPermission('add_worktype')"
              >
                <button
                  @click="OpenModal()"
                  type="button"
                  class="btn btn-successs"
                  style="font-size: 15px"
                >
                  <span class="fas fa-plus-square"></span>
                  Add Work Type
                </button>
              </a>
            </div>
          </div>
        </div>

        <!--AddWorkTypeModal Component Calling-->
        <AddWorkTypeModal @load-workType="WorkTypeLoad" v-if="isModalVisible" />

        <!--UpdateWorkTypeModal Component Calling-->
        <UpdateWorkTypeModal @load-workType="WorkTypeLoad" v-if="isEditModalVisible" />

        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <div class="table-responsie">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">SL</th>
                        <th scope="col">Work Type Name</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(work, SL) in work_type" :key="work.id">
                        <td>{{SL+1}}</td>
                        <td>{{work.name}}</td>
                        <td class="td_action">
                          <i
                            v-if="hasPermission('change_worktype')"
                            class="fas fa-edit"
                            @click="OpenEditModal(work.id)"
                          ></i>

                          <i
                            v-if="hasPermission('delete_worktype')"
                            class="fas fa-trash-alt"
                            @click="deleteWorkTypeItem(work.id) in work_type"
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
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
import AddWorkTypeModal from "./AddWorkTypeModal";
import UpdateWorkTypeModal from "./UpdateWorkTypeModal";
import permissions from "../../../../authorization/permissions";

export default {
  name: "WorkType",
  components: { Master, AddWorkTypeModal, UpdateWorkTypeModal },
  data() {
    return {
      work_type: null,
      update_attendance_id: null,
      isUpdateVisible: false,
    };
  },
  async created() {
    await this.getWorkTypeList();
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.WorkTypeAddModalVisible;
    },
    isEditModalVisible() {
      return this.$store.state.projectRelated.WorkTypeEditModalVisible;
    },
  },
  methods: {
    async WorkTypeLoad() {
      // this.subtask_response_ID = null;
      await this.getWorkTypeList();
    },
    getWorkTypeList: function () {
      axios.get("work-types/").then((response) => {
        this.work_type = response.data;
        console.log(this.work_type);
        console.log(response.status);
      });
    },

    deleteWorkTypeItem: function (id) {
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
          axios.delete("work-types/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.getWorkTypeList();
            }
            Swal.fire(
              "Deleted!",
              "Your work type has been deleted!!",
              "success"
            );
          });
          // Swal.fire("Deleted!", "Your group has been deleted!!", "success");
          Swal.fire(
            "Cancelled",
            "Your work type has not been deleted !",
            "error"
          );
        } else {
          // Swal.fire("Cancelled", "Your group has not been deleted !", "error");
        }
      });
    },

    OpenModal() {
      this.$store.commit("projectRelated/toggleWorkTypeAddModal");
    },

    OpenEditModal(id) {
      this.$store.commit("projectRelated/toggleWorkTypeEditModal", id);
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