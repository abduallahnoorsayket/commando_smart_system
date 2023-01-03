<template v-if="attendance_ID">
  <i
    class="fas fa-trash-alt"
    style="color: 3f6ad8; padding: 8px"
    @click="DeleteAttendance()"
  ></i>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "AttendanceDelete",
  props: ["attendance_id"],
  data() {
    return {
      attendance_ID: null,
    };
  },
  created() {
    this.attendance_ID = this.$props.attendance_id;
  },
  methods: {
    DeleteAttendance: function () {
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
          axios
            .delete("attendance-records/" + this.attendance_ID + "/")
            .then((response) => {
              if (response.status === 204) {
                // this.searchUser();
                this.$emit("load-attendance");
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
  },
};
</script>

<style></style>
