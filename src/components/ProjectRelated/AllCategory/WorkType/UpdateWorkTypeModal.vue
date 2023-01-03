<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Update Work Type</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateWorkType" autocomplete="off">
              <div class="form-group">
                <label>
                  Work Type Name
                  <span class="asterisk">*</span>
                </label>
                <input v-model="name" type="text" class="form-control" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="updateWorkType()" class="mt-2 btn btn-base float-right">Submit</button>
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
      update_workType_id: null,

      name: null,
    };
  },

  created() {
    this.update_workType_id = this.$store.state.projectRelated.WorkTypeId;
    this.getWorkTypeData();
  },
  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.WorkTypeEditModalVisible;
    },
  },
  methods: {
    CloseModal() {
      this.$store.commit("projectRelated/toggleWorkTypeEditModal",null);
    },

    /* get work type data */
    getWorkTypeData: function () {
      axios.get("work-types/" + this.update_workType_id + "/").then(
        (response) => {
          this.name = response.data.name;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },

    /* update Work Type */
    updateWorkType() {
      axios
        .put("work-types/" + this.update_workType_id + "/", {
          name: this.name,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully Edited Work Type.",
          }).then((response) => {
            this.CloseModal();
            this.$emit("load-workType");
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