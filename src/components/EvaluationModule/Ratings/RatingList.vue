<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="pe-7s-star icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                    {{ $store.getters.GET_RATING +' '+$store.getters.GET_LIST }}
              </div>
              <router-link :to="{ path: '/create-rating' }" v-if="hasPermission('add_rating')">
                <a class="float" style="position: absolute; right: 0">
                  <button type="button" class="btn btn-successs" style="font-size: 15px">
                    <span class="fas fa-plus-square"></span>   {{ $store.getters.GET_ADD_NEW }}
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">{{ $store.getters.GET_SL}}</th>
                      <th scope="col">{{ $store.getters.GET_RATING +' '+$store.getters.GET_NAME}}</th>
                      <th scope="col"> {{ $store.getters.GET_RATING +' '+$store.getters.GET_STATUS}}</th>
                      <th scope="col"> {{ $store.getters.GET_ACTION}}</th>
                    </tr>
                  </thead>
                  <tbody v-if="all_ratings && all_ratings.length > 0">
                    <tr v-for="(rating, index) in all_ratings" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ rating.name }}</td>
                      <td v-if="rating.status === true">
                        <span class="badge badge-success">{{ $store.getters.GET_ON}}</span>
                      </td>
                      <td v-else>
                        <span class="badge badge-danger">{{ $store.getters.GET_OFF}}</span>
                      </td>
                      <td class="td_action">
                        <router-link
                          class="item"
                          :to="{name: 'EditRating', params: { id: rating.id },}"
                          v-if="hasPermission('change_rating')"
                        >
                          <i class="fas fa-edit"></i>
                        </router-link>
                        <i
                          class="fas fa-trash-alt"
                          @click="deleteRating(rating.id) in all_ratings"
                          v-if="hasPermission('delete_rating')"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                  <!-- If no results -->
                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="8" class="text-center align-middle">
                          <h4>  {{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}</h4>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </div>
            </div>
          </div>
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
import permissions from "../../../authorization/permissions";

export default {
  name: "RatingList",
  components: { Master },
  data() {
    return {
      all_ratings: null,
    };
  },
  created() {
    this.GetRatingList();
  },
  methods: {
    GetRatingList: function () {
      axios
        .get("ratings/", {
        })
        .then((response) => {
          this.all_ratings = response.data;
        });
    },

    deleteRating: function (id) {
      Swal.fire({
       title:  this.$store.getters.GET_ARE_YOU_SURE,
        text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("ratings/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetRatingList();
            }
          });
          Swal.fire( this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
            "success");
        } else {
          Swal.fire( this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +' '+this.$store.getters.GET_DELETED +" ...",
            "error");
        }
      });
    },
    hasModulePermission(...module_name) {
      return permissions.hasModulePermission(...module_name);
      // return permissions.hasModulePermission.apply(...module_name)
    },

    hasModelPermission(model_name) {
      return permissions.hasModelPermission(model_name);
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
</style>