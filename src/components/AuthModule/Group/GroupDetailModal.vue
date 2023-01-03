<template>
  <teleport to="body">
    <div v-if="isModalVisible && group" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">{{ $store.getters.GET_VIEW +' '+$store.getters.GET_GROUP+' '+$store.getters.GET_INFO}}
            </p>
          </div>
          <div class="card-body" :class="[ group.permissions.length >0 ? 'height' : null]">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="form-row">
                    <div class="col-md-12">
                      <div class="position-relative form-group">
                        <div
                          class="position-relative form-check"
                          style="margin-left: -20px"
                          v-if="group.name"
                        >
                          <p>
                            <b class="mr-0">{{ $store.getters.GET_GROUP +' '+$store.getters.GET_NAME}}:</b>
                            {{ group.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="permissions">
                    <label>
                      <b>{{ $store.getters.GET_GROUP +' '+$store.getters.GET_PERMISSIONS}}:
                      </b>
                    </label>
                    <div class="row">
                      <div class="col-sm-6" v-for="prmsn in group.permissions" :key="prmsn.id">
                        <li>{{ prmsn.name.slice(3)}}</li>
                      </div>
                    </div>
                    <!-- <div
                      class="position-relative form-check"
                      v-for="prmsn in group.permissions"
                      :key="prmsn.id"
                    >
                      <li>{{ prmsn.name.slice(3)}}</li>
                    </div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="float-right ml-2 btn btn-base" @click="CloseModal()"> {{ $store.getters.GET_CLOSE}}</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>

  <!-- previous gorup detail -->
</template>

<script>
// import Master from "../../layouts/Master";
import axios from "axios";

export default {
  name: "GroupDetailModal",
  components: {},

  data() {
    return {
      group: null,
      group_Id: null,
    };
  },

  created() {
    this.group_Id = this.$store.state.auth.groupId;
    this.getGroupList();
  },
  computed: {
    isModalVisible() {
      return this.$store.state.auth.isModalVisible;
    },
  },
  methods: {
    CloseModal() {
      this.$store.commit("auth/toggleModal");
    },
    getGroupList() {
      axios.get("groups/" + this.group_Id + "/").then((response) => {
        this.group = response.data;
        console.log("####", this.group);
      });
    },
  },
};
</script>


<style scoped>
.row {
  text-align: left;
  font-family: Arimo, sans-serif !important;
}
.form-check {
  position: relative;
  display: block;
  padding-left: 1.25rem;
  text-transform: capitalize;
}
.modal-dialog {
  max-width: 540px;
}

/* scroll in modal */
.card-body {
  height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
}
.height{
height: 55vh;
}
</style>