<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-list-alt icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_HOLIDAY + " " + $store.getters.GET_LIST }}
              </div>
              <router-link
                :to="{ path: '/create-holiday' }"
                v-if="hasPermission('add_holiday')"
              >
                <a class="float" style="position: absolute; right: 0">
                  <button
                    type="button"
                    class="btn btn-successs"
                    style="font-size: 15px"
                  >
                    <span class="fas fa-plus-square"></span>
                    {{ $store.getters.GET_ADD_NEW }}
                  </button>
                </a>
              </router-link>
            </div>
          </div>
        </div>

        <div class="row" v-if="holidays">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">{{ $store.getters.GET_SL }}</th>
                        <th scope="col">
                          {{ $store.getters.GET_PURPOSE }}
                        </th>
                        <th scope="col">
                          {{
                            $store.getters.GET_HOLIDAY +
                            " " +
                            $store.getters.GET_TYPE
                          }}
                        </th>
                        <th scope="col">
                          {{ $store.getters.GET_ACTION }}
                        </th>
                      </tr>
                    </thead>
                    <tbody v-if="holidays.length > 0">
                      <tr v-for="(holiday, SL) in holidays" :key="holiday.id">
                        <td>{{ SL + 1 }}</td>
                        <td>{{ holiday.purpose }}</td>
                        <td v-if="holiday.type == 'PUB'">
                          <span class="badge badge-success">{{ $store.getters.GET_PUBLIC }}</span>
                        </td>
                        <td v-if="holiday.type == 'PRI'">
                          <span class="badge badge-info">{{ $store.getters.GET_PRIVATE }}</span>
                        </td>
                        <td v-if="holiday.type == 'OTH'">
                          <span class="badge badge-secondary">{{ $store.getters.GET_OTHERS }}</span>
                        </td>

                        <td class="td_action">
                          <router-link
                            class="item"
                            :to="{
                              name: 'UpdateHoliday',
                              params: { id: holiday.id },
                            }"
                            v-if="hasPermission('change_holiday')"
                          >
                            <i class="fas fa-edit"></i>
                          </router-link>

                          <i
                            class="fas fa-trash-alt"
                            @click="deleteHolidayItem(holiday.id) in holidays"
                            v-if="hasPermission('delete_holiday')"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                    <!--  if No result  -->
                    <tbody v-else>
                      <tr style="height: 100px">
                        <td colspan="8" class="text-center align-middle">
                          <h4>{{ $store.getters.GET_NO_DATA_FOUND+' '+$store.getters.GET_EXCLAMATION_MARK }}</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="row">
          <div class="col-md-4">
            <ul class="pagination" v-if="pagination.count">
              <li class="page-item">
                <a href="#"
                  >{{ $store.getters.GET_SHOWING}} {{ pagination.showing }}  {{ $store.getters.GET_OF}} {{ pagination.count }}</a
                >
              </li>
              <li :class="{ disabled: !pagination.previous }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.previous)"
                  >{{ $store.getters.GET_PREVIOUS}}</a
                >
              </li>

              <li :class="{ disabled: !pagination.next }" class="page-item">
                <a href="#!" v-on:click="setPage(pagination.next)"> {{ $store.getters.GET_NEXT}}</a>
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
import permissions from "../../../authorization/permissions";

export default {
  name: "HolidayList",
  components: { Master },
  data() {
    return {
      holidays: null,

      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },
  methods: {
    GetHolidaysList: function () {
      var queryParam = {
        page: this.$route.query.page,
      };
      axios
        .get("holidays/", {
          params: queryParam,
        })
        .then((response) => {
          this.holidays = response.data.results;

          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;

          console.log(this.holidays);
          console.log(response.status);
        });
    },

    deleteHolidayItem: function (id) {
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
          axios.delete("holidays/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.GetHolidaysList();
            }
          });
          Swal.fire( this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
            "success");
        } else {
          Swal.fire(
             this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +' '+this.$store.getters.GET_DELETED +" ...",
            "error"
          );
        }
      });
    },

    setPage(page) {
      this.pagination.page = page;
      this.searchHoliday();
    },
    async searchHoliday() {
      await this.$router.push({
        path: "holiday-list",
        query: {
          page: this.pagination.page,
        },
      });

      this.GetHolidaysList();
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },

  created() {
    this.GetHolidaysList();
  },
};
</script>

<style scoped>
/* .card{
  border-left: 4px solid #69c5a5;
} */
</style>
