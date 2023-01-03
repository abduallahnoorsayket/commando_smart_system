<template>
  <teleport to="body">
    <div v-if="isModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">View Client Info</p>
          </div>
          <div class="card-body" v-if="form_data">
            <div class="row">
              <div class="col-md-12">
                <p class="mb-4">
                  <i class="fa fa-user"></i>
                  <strong>Client Name:</strong>
                  {{form_data.client_name}}
                </p>
                <p v-if="form_data.client_details">
                  <i class="fa fa-info-circle"></i>
                  <strong>Client Details:</strong>
                  <br />
                  <span v-html="form_data.client_details"></span>
                </p>
                <p v-else>
                  <br />
                  <span>No details found !</span>
                </p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="float-right ml-2 btn btn-base" @click="CloseModal()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
export default {
  name: "ViewClientModal",
  data() {
    return {
      client_Id: null,
      form_data: null,
    };
  },
  created() {
    this.client_Id = this.$store.state.projectRelated.clientId;
    this.getClientData();
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.ClientModalVisible;
    },
  },
  methods: {
    CloseModal() {
      this.$store.commit("projectRelated/toggleClientModal");
    },
    getClientData: function () {
      axios.get("clients/" + this.client_Id + "/").then(
        (response) => {
          this.form_data = response.data;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 540px;
}
.card-body {
  overflow-y: auto;
  overflow-x: hidden;
}
.fa-info-circle:before {
  content: "\f05a";
  color: #69c5a5;
  /* margin: 5px 5px 0px 0px; */
}
</style>