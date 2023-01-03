<template>
  <teleport to="body">
    <div v-if="isModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Add Work Priority</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitWorkPriorityForm">
              <label>
                Work Priority Name
                <span class="asterisk">*</span>
              </label>
              <input v-model="name" type="text" class="form-control" />
            </form>
          </div>
          <div class="modal-footer">
            <button @click="submitWorkPriorityForm()" class="mt-2 btn btn-base float-right">Submit</button>
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
  name: "AddWorkPriorityModal",
  data() {
    return {
      name: null,
    };
  },
  created() {
    // this.employee = this.$props.employee_id.employee;
    // this.isModalVisible = this.$props.employee_id.isModalVisible;
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.WorkPriorityAddModalVisible;
    },
  },
  methods: {
    CloseModal() {
      this.$store.commit("projectRelated/toggleWorkPriorityAddModal");
    },

    async submitWorkPriorityForm() {
      axios
        .post("work-priorities/", {
          name: this.name,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully Added a Work Priority ..",
          }).then((result) => {
            // this.$router.push("work-type");
            this.CloseModal();
            this.$emit("load-workPriority");
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
  },
};
</script>
<style  scoped>
.modal-dialog {
  max-width: 500px;
}
</style>