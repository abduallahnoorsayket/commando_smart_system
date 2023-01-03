<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Update Work Status</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateWorkStatus" autocomplete="off">
              <div class="form-group">
                <label>
                  Work Status Name
                  <span class="asterisk">*</span>
                </label>
                <input v-model="name" type="text" class="form-control" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="updateWorkStatus()" class="mt-2 btn btn-base float-right">Submit</button>
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
  name: "UpdateWorkTypeModal",
  data() {
    return {
      update_workStatus_id: null,
      name: null,
    };
  },
  created() {
    this.update_workStatus_id = this.$store.state.projectRelated.WorkStatusId;
    this.getWorkStatusData();
  },
  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.WorkStatusEditModalVisible;
    },
  },

  methods: {
    CloseModal() {
      this.$store.commit("projectRelated/toggleWorkStatusEditModal", null);
    },

    /* get work status data */
    getWorkStatusData: function () {
      axios.get("work-statuses/" + this.update_workStatus_id + "/").then(
        (response) => {
          this.name = response.data.name;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    /* update Work status */
    updateWorkStatus() {
      axios
        .put("work-statuses/" + this.update_workStatus_id + "/", {
          name: this.name,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully Edited Work Status.",
          }).then((response) => {
            this.CloseModal();
            this.$emit("load-workStatus");
            console.log(response);
          });

          console.log(response);
        })
        .catch((error) => {
          this.AddAttendance_error = error.response.data;
          console.log("--++", error.response);
        });
    },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 500px;
}
</style>