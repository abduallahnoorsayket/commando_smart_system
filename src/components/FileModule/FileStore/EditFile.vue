<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <!--                                <i class="fas fa-user-plus icon-gradient bg-tempting-azure"></i>-->
               <i class="fas fa-edit icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                Edit File
                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                </div>-->
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="card">
                <div class="card-body">
              <form @submit.prevent="submitAddFile" autocomplete="off">
                <div class="form-group">
                  <div class="form-row">
                    <div class="col-md-12">
                       <!-- single file upload -->
                      <!-- <div class="position-relative form-group">
                        <div class="row">
                          <div class="col-md">
                            <label>
                              Upload Document
                              <span class="asterisk">*</span>
                            </label>
                            <div class="custom-file mb-3">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="customFile"
                                name="filename"
                                ref="file"
                                @change="handleImage()"
                              />
                              <label class="custom-file-label" for="customFile"
                                >Choose file</label
                              >
                            </div>
                          </div>
                          <div class="col-md">
                            <label>
                              Document Name
                              <span class="asterisk">*</span>
                            </label>
                            <input
                              class="form-control"
                              type="text"
                              autocomplete="off"
                              v-model="file_name"
                            />
                          </div>
                          <div class="col-md-1"></div>
                        </div>
                        <div
                          v-if="error_data && error_data.non_field_errors"
                          class="col-md-6 alert alert-danger alert-dismissible fade show text-center"
                          role="alert"
                        >
                          These fields may not be blank
                          <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div> -->
                     <!-- multiple file upload -->
                        <div class="position-relative form-group">
                           <template v-for="(file, k) in files_related" :key="k">
                          <div class="row">
                            <div class="col-md">
                              <label> Upload File   <span class="asterisk">*</span></label>
                               <div class="custom-file mb-2">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="customFile"
                                name="filename"
                                ref="file"
                                @change="handleImage($event, k)"
                                multiple
                              />
                              <label class="custom-file-label" for="customFile"
                                >Choose file</label
                              >
                            </div>
                            </div>

                            <div class="col-md">
                              <label>File Name   <span class="asterisk">*</span></label>
                              <input
                                class="form-control"
                                type="text"
                                autocomplete="off"
                                v-model="file.file_name"
                              />
                            </div>
                            <div class="col-md-1 mt-4">
                              <button
                                class="btn btn-sm btn-del remove mt-1"
                                style="color: firebrick; font-size: 20px"
                              >
                                <i
                                  class="fas fa-trash-alt"
                                  @click="deleteRow(k)"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </template>
                        </div>
                          <button
                        type="button"
                        class="btn btn-base"
                        @click="addNewRow"
                      >
                        <i class="fas fa-plus-circle"></i>
                        ADD NEW
                      </button>
                    </div>
                  </div>
                  <div class="form-row mt-3">
                    <div class="col-md">
                      <label>
                        With others
                        <span class="asterisk">*</span>
                      </label>
                      <div class="p-listbox p-component">
                        <div class="p-listbox-header">
                          <div class="p-listbox-filter-container">
                            <input
                              type="text"
                              class="p-listbox-filter p-inputtext p-component"
                              v-model="GroupSearch"
                              placeholder="Filter"
                            />
                            <span
                              class="p-listbox-filter-icon pi pi-search"
                            ></span>
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
                              v-for="grp in filterGroups"
                              :key="grp.id"
                            >
                              <label
                                class="form-check-label"
                                style="font-weight: 300"
                              >
                                <input
                                  type="checkbox"
                                  name="groups[]"
                                  :id="grp.id"
                                  :value="grp.id"
                                  v-model="groups"
                                  class="form-check-input"
                                />
                                <span class="checkmark"></span>
                                {{ grp.name }}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-1"></div>
                  </div>
                  <div class="form-row mt-3">
                    <div class="col-md">
                      <label>
                        Only Me
                        <span class="asterisk"> *</span>
                      </label>
                      <div class="position-relative form-group form-row mt-2">
                        <div class="col-md-12">
                          <label
                            class="form-check-label"
                            style="font-weight: 600"
                          >
                            <input type="checkbox" v-model="is_superuser" />
                            <span class="checkmark ml-2"></span>
                            <label class="ml-3">
                              {{
                                is_superuser == true
                                  ? $store.getters.GET_YES
                                  : $store.getters.GET_NO
                              }}</label
                            >
                            <button
                              @click="submitAddFile()"
                              class="btn btn-successs float-right"
                            >
                              Submit
                            </button>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-1"></div>
                  </div>
                </div>
              </form>
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

export default {
  name: "EditFile",
  components: { Master },
  data() {
    return {
      department_name: null,
      department_code: null,

      department_error_data: {
        department_name: null,
        department_code: null,
      },
      files_related: [],
      filterGroups: [
        {
          id: 14,
          name: "Abdulla sayket",
        },
        {
          id: 16,
          name: "Makasudur maruf",
        },
        {
          id: 4,
          name: "Salam hasan",
        },
        {
          id: 13,
          name: "kalam hasan",
        },
        {
          id: 5,
          name: "Jamal hsasan",
        },
        {
          id: 6,
          name: "Sammee islam",
        },
      ],
    };
  },
created() {
    this.addNewRow();
  },
  methods: {
     // new row adding
    addNewRow() {
      // this.files_related.push(this.file_obj);
      this.files_related.push({
        file_name: "",
        upload_files: "",
        content_type: this.content_id,
      });
    },
    // Remove Row
    deleteRow(index) {
       if (index == 0) {
        Swal.fire({
          icon: "error",
          title: this.$store.getters.GET_SORRY,
          text: "You can not delete it !",
        });
      }
      if (index > 0) {
        this.files_related.splice(index, 1);
      }
    },
    async submitDepartmentForm() {
      const response = await axios
        .post("departments/", {
          department_name: this.department_name,
          department_code: this.department_code,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes..."
            text:
              this.$store.getters.GET_CREATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              " ...",
          }).then((result) => {
            this.$router.push("department-list");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.department_error_data = error.response.data;
        });
      console.log(response);
    },
  },
};
</script>

<style scoped></style>
