<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <!-- <i class="fas fa-user-friends icon-gradient bg-tempting-azure"></i> -->
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>Client List</div>
              <router-link :to="{ path: '/add-client' }" v-if="hasPermission('add_client')">
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-plus-square"></span> Add Client
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="main-card card" v-if="all_clients">
              <div class="row SechContent">
                <div class="col-md-12">
                  <div class="searchContainer">
                    <div class="float-right">
                      <form action @submit.prevent="searchClient">
                        <button type="submit" class="btn btn-base float-right">
                          <i class="fa fa-search"></i>&nbsp;
                        </button>
                        <div class="float-right">
                          <input
                            class="form-control form-control-sm"
                            type="text"
                            placeholder="Seach by name"
                            v-model="searchName"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <ViewClientModal v-if="isModalVisible" />
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody v-if="all_clients && all_clients.length >0">
                    <tr v-for="(client, index) in all_clients" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ client.client_name }}</td>
                      <td class="td_action">
                        <i
                          v-if="hasPermission('view_client')"
                          class="fas fa-eye"
                          @click="OpenModal(client.id)"
                        ></i>
                        <router-link
                          class="item"
                          :to="{name: 'UpdateClient', params: { id: client.id },}"
                          v-if="hasPermission('change_client')"
                        >
                          <i class="fas fa-edit"></i>
                        </router-link>
                        <i
                          v-if="hasPermission('delete_client')"
                          class="fas fa-trash-alt"
                          @click="deleteClient(client.id) in all_clients"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                    <!-- If no results -->
                      <tbody v-else>
                        <tr style="height: 100px;">
                          <td colspan="4" class="text-center align-middle">
                            <h4>No data found !!</h4>
                          </td>
                        </tr>
                      </tbody>
                </table>
              </div>
            </div>
            <div v-else class="alert alert-success" role="alert">No Data Found!</div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <ul class="pagination" v-if="pagination.count">
              <li class="page-item">
                <a href="#">Showing {{ pagination.showing }} of {{ pagination.count }}</a>
              </li>
              <li :class="{ disabled: !pagination.previous }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.previous)">Previous</a>
              </li>

              <li :class="{ disabled: !pagination.next }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.next)">Next</a>
              </li>
            </ul>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import axios from "axios";
import Swal from "sweetalert2";
// import "../../layouts/authheader";
import ViewClientModal from "./ViewClientModal";
import permissions from "../../../authorization/permissions";

export default {
  name: "ClientList",
  components: { Master, ViewClientModal },
  data() {
    return {
      isUpdateVisible: false,
      update_attendance_id: null,
      searchName: null,
      all_clients: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },
  created() {
    this.initialload();
    console.log("created");
  },
  updated() {
    this.initialload();
    console.log("updated");
  },
  computed: {
    isModalVisible() {
      return this.$store.state.projectRelated.ClientModalVisible;
    },
  },
  methods: {
    OpenModal(id) {
      this.$store.commit("projectRelated/toggleClientModal", id);
    },
    initialload() {
      this.GetClientList();
    },
    setPage(page) {
      this.pagination.page = page;
      this.searchClient();
    },
    GetClientList: function () {
      var queryParam = {
        client_name: this.$route.query.client_name,
        page: this.$route.query.page,
      };
      axios
        .get("clients/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_clients = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
        });
    },

    deleteClient: function (id) {
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
          axios.delete("clients/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetClientList();
            }
          });
          Swal.fire("Deleted!", "Client has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "Client has not been deleted !", "error");
        }
      });
    },
    searchClient() {
      this.$router.push({
        path: "client-list",
        query: {
          client_name: this.searchName,
          page: this.pagination.page,
        },
      });
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
.searchContainer {
  margin: 5px 25px;
}
.btn-base {
  color: white;
  margin-left: 10px;
  margin-top: 2px;
}

.SechContent {
  font-family: "Nunito", sans-serif !important;
  color: #2c3e50;
  margin-bottom: -15px;
  margin-top: 5px;
}
</style>