<template>
  <div class="mt-2"></div>
  <teleport to="body">
    <div v-if="isFileShareVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Share with other peoples</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendUserToParent" autocomplete="off">
              <div class="form-row mt-0">
                <div class="col-md-12">
                  <div class="p-listbox p-component">
                    <div class="p-listbox-header">
                      <div class="p-listbox-filter-container">
                        <input
                          type="text"
                          class="p-listbox-filter p-inputtext p-component"
                          v-model="UserSearch"
                          placeholder="Filter"
                        />
                        <span class="p-listbox-filter-icon pi pi-search"></span>
                      </div>
                    </div>
                    <div class="p-listbox-list-wrapper">
                      <div
                        role="listbox"
                        aria-multiselectable="multiple"
                        class="p-listbox-list"
                      >
                        <div
                          class="p-listbox-item"
                          v-for="user in filterUsers"
                          :key="user.id"
                        >
                          <label
                            class="form-check-label"
                            style="font-weight: 300"
                          >
                            <input
                              type="checkbox"
                              name="groups[]"
                              :id="user.id"
                              :value="user.id"
                              v-model="with_others"
                              class="form-check-input"
                            />
                            <span class="checkmark"></span>
                            {{ user.first_name + " " + user.last_name }}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              @click="sendUserToParent()"
              class="mt-2 btn btn-base float-right"
            >
              <!-- {{ $store.getters.GET_SUBMIT }} -->
              Done
            </button>
            <button
              class="mt-2 float-right ml-2 btn btn-successs"
              @click="CloseModal()"
            >
              {{ $store.getters.GET_CLOSE }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
// import Swal from "sweetalert2";

export default {
  name: "FileShareWith",
  //   props: ["attendance_date"],
  data() {
    return {
      UserSearch: null,
      with_others: [],
      users: null,
    };
  },
  created() {
    this.loadUsers();
  },
  computed: {
    isFileShareVisible() {
      return this.$store.state.file.isFileShareVisible;
    },
    filterUsers() {
      if (this.UserSearch) {
        return this.users.filter((item) => {
          return this.UserSearch.toLowerCase()
            .split(" ")
            .every((v) => item.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.users;
      }
    },
  },

  methods: {
    CloseModal() {
      this.$store.commit("file/TOGGLE_FILE_SHARE_MODAL", {
        index_number: null,
      });
    },
    // load users
    loadUsers: function () {
      // this.loading = true;
      var queryParam = {};
      axios
        .get("users-short-list/", {
          params: queryParam,
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      // .finally(() => {
      //   this.loading = false;
      // });
    },
    sendUserToParent() {
      this.$emit("send-selected-users", this.with_others);
      this.CloseModal();
    },
  },
};
</script>
<style scoped>
/* teleport modal */
.modal-dialog {
  max-width: 500px;
}
</style>
