<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Update Work Priority</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateWorkPriority">
              <div class="form-group">
                <label>
                  Work Priority Name
                  <span class="asterisk">*</span>
                </label>
                <input
                  placeholder="Priority Name"
                  id="work_type_name"
                  v-model="name"
                  type="text"
                  class="form-control"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="updateWorkPriority()" class="mt-2 btn btn-base float-right">Submit</button>
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
  name: "UpdateWorkPriorityModal",
  data() {
    return {
      update_workPriority_id: null,
      name: null,
    };
  },
  created() {
    this.update_workPriority_id =
      this.$store.state.projectRelated.WorkPriorityId;
    this.getWorkPriorityData();
  },
  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.WorkPriorityEditModalVisible;
    },
  },

  methods: {
    /*Close Modal Method*/
    CloseModal() {
      this.$store.commit("projectRelated/toggleWorkPriorityEditModal", null);
    },

    /* get work Priority data */
    getWorkPriorityData: function () {
      axios.get("work-priorities/" + this.update_workPriority_id + "/").then(
        (response) => {
          this.name = response.data.name;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    /* update Work Priority */
    updateWorkPriority() {
      axios
        .put("work-priorities/" + this.update_workPriority_id + "/", {
          name: this.name,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully Edit Work Priority ..",
          }).then((response) => {
            this.CloseModal();
            this.$emit("load-workPriority");
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
<style scoped >
.modal-dialog {
  max-width: 500px;
}
</style>