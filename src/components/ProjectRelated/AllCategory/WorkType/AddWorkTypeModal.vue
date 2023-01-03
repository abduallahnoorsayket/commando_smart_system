<template>
  <teleport to="body">
    <div v-if="isModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Add Work Type</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitWorkTypeForm" autocomplete="off">
              <label>
                Work Type Name
                <span class="asterisk">*</span>
              </label>
              <input v-model="name" type="text" class="form-control" />
            </form>
          </div>

          <div class="modal-footer">
            <button @click="submitWorkTypeForm()" class="mt-2 btn btn-base float-right">Submit</button>
            <button class="mt-2 float-right ml-2 btn btn-successs" @click="CloseModal()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "AddWorkTypeModal",

  data() {
    return {
      name: null,
    };
  },
  created() {
    // this.employee = this.$props.employee_id.employee;
  },

  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.WorkTypeAddModalVisible;
    },
  },

  methods: {
    CloseModal() {
      this.$store.commit("projectRelated/toggleWorkTypeAddModal");
    },

    async submitWorkTypeForm() {
      axios
        .post("work-types/", {
          name: this.name,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully Added a Work Type.",
          }).then((result) => {
            this.CloseModal();
            this.$emit("load-workType");
            // this.$router.push({ name: "WorkType" });
            // this.$router.go();
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.AddAttendance_error = error.response.data;
          console.log("--++", error.response);
        });
      // console.log(response);
    },

    // // Permissions
    // /*for Module(app)*/
    // hasModulePermission(...module_name) {
    //     return permissions.hasModulePermission(...module_name)
    //     // return permissions.hasModulePermission.apply(...module_name)
    // },
    //
    // /*for Model*/
    // hasModelPermission(model_name) {
    //     return permissions.hasModelPermission(model_name)
    // },
    //
    // /*for code_name*/
    // hasPermission(permission_name) {
    //     return permissions.hasPermission(permission_name)
    // },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 500px;
}
</style>