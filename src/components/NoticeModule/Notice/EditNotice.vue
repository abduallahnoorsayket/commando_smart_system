<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" v-if="form_data">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-edit icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{
                  $store.getters.GET_UPDATE + " " + $store.getters.GET_NOTICE
                }}
                <router-link
                  :to="{ path: '/all-notices' }"
                  v-if="hasPermission('view_notice')"
                >
                  <a class="float" style="position: absolute; right: 0">
                    <button
                      type="button"
                      class="btn btn-successs"
                      style="font-size: 15px"
                    >
                      <span class="fas fa-list"></span>
                      {{
                        $store.getters.GET_ALL +
                        " " +
                        $store.getters.GET_NOTICES
                      }}
                    </button>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="main-card card">
          <div class="card-body">
            <form @submit.prevent="submitEditNotice">
              <div class="form-group">
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group">
                      <label>
                        {{
                          $store.getters.GET_NOTICE +
                          " " +
                          $store.getters.GET_SUBJECT
                        }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="form_data.notice_title"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            notice_error_data && notice_error_data.notice_title,
                        }"
                      />
                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            notice_error_data && notice_error_data.notice_title,
                        }"
                        v-if="
                          notice_error_data && notice_error_data.notice_title
                        "
                      >
                        {{ notice_error_data.notice_title[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 position-relative form-group">
                    <label>
                      {{
                        $store.getters.GET_NOTICE +
                        " " +
                        $store.getters.GET_DESCRIPTION
                      }}
                      <!-- <span class="asterisk">*</span> -->
                    </label>
                    <ckeditor
                      :editor="editor"
                      placeholder="Details"
                      v-model="form_data.notice_body"
                      rows="5"
                      :config="editorConfig"
                    ></ckeditor>
                    <div
                      v-if="notice_error_data && notice_error_data.notice_body"
                      class="alert alert-danger alert-dismissible fade show text-left mt-1"
                      role="alert"
                    >
                      {{ notice_error_data.notice_body[0] }}
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <!--error handling-->
                  </div>
                  <div class="col-md-12 mt-2 mb-2">
                    <!--To whom-->
                    <div class="permissions">
                      <label
                        >{{
                          $store.getters.GET_TO + " " + $store.getters.GET_WHOM
                        }}
                        <span class="asterisk">*</span>
                      </label>
                      <br />
                      <div class="custom-control custom-checkbox mb-2">
                        <input
                          @click="IsUserCkecked"
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                          v-model="hasAllUserChecked"
                        />
                        <label
                          class="custom-control-label"
                          for="customCheck1"
                          style="font-weight: 300"
                        >
                          {{
                            $store.getters.GET_ALL +
                            " " +
                            $store.getters.GET_USERS
                          }}</label
                        >
                      </div>

                      <div
                        class="p-listbox p-component"
                        :class="[
                          hasAllUserChecked == true ? 'disabledSection' : null,
                        ]"
                      >
                        <div class="p-listbox-header">
                          <div class="p-listbox-filter-container">
                            <input
                              type="text"
                              class="p-listbox-filter p-inputtext p-component"
                              v-model="searchQuery"
                              placeholder="Filter"
                            />
                            <span
                              class="p-listbox-filter-icon pi pi-search"
                            ></span>
                          </div>
                        </div>
                        <div class="p-listbox-list-wrapper">
                          <!-- v-if="project_members" -->
                          <div
                            role="listbox"
                            aria-multiselectable="multiple"
                            class="p-listbox-list"
                          >
                            <div
                              class="p-listbox-item"
                              v-for="group in resultQuery"
                              :key="group.id"
                            >
                              <label
                                class="form-check-label"
                                style="font-weight: 300"
                              >
                                <!-- v-if="hasGroupChecked" -->
                                <input
                                  type="checkbox"
                                  :id="group"
                                  :value="group.id"
                                  v-model="form_data.to_whom"
                                  checked
                                />
                                <span class="checkmark"></span>
                                {{ group.name }}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div
                        v-if="notice_error_data && notice_error_data.to_whom"
                        class="
                          alert alert-danger alert-dismissible
                          fade
                          show
                          text-left
                          mt-1
                        "
                        role="alert"
                      >
                        Please select atleast one item.
                        <button
                          type="button"
                          class="close"
                          data-dismiss="alert"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div> -->
                    </div>
                    <div
                      v-if="
                        hasAllUserChecked == false &&
                        form_data.to_whom.length == 0
                      "
                      class="alert alert-danger alert-dismissible fade show text-center mt-3"
                      role="alert"
                    >
                      {{ $store.getters.GET_Required_fields_message }}
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <FilePostUpload
                      @send-files-related="ReceivedFilesRelated"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <button
                    @submit.prevent="submitEditNotice"
                    class="mt-2 btn btn-successs btn-lg float-right"
                    :disabled="is_disable"
                  >
                    {{ $store.getters.GET_SUBMIT }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import FilePostUpload from "../../layouts/partials/FilePostUpload.vue";
import axios from "axios";
import Swal from "sweetalert2";
// import "../../../authheader";
import permissions from "../../../authorization/permissions";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "EditNotice",
  components: { Master, ckeditor: CKEditor.component, FilePostUpload },
  data() {
    return {
      files_related_info: null,
      hasAllUserChecked: false,
      editor: ClassicEditor,
      form_data: null,
      all_groups: null,
      searchQuery: null,
      notice_error_data: {
        notice_title: null,
        notice_body: null,
        //  to_whom:null,
        //   form_data:{
        //     notice_title : null,
        //   notice_body: null,
        // },
      },
    };
  },
  created() {
    this.initialLoad();
  },
  methods: {
    initialLoad: function () {
      this.getNoticeData();
      this.loadGroup();
    },
    IsUserCkecked() {
      this.form_data.to_whom = [];
    },
    loadGroup() {
      axios
        .get("groups/")
        .then((response) => {
          this.all_groups = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getNoticeData: function () {
      axios.get(`notices/${this.$route.params.id}/`).then(
        (response) => {
          this.form_data = response.data;
          this.form_data.to_whom = this.form_data.to_whom.map((z) => z.id);
          if (this.form_data.to_whom.length == 0) {
            this.hasAllUserChecked = true;
          }
          // if (this.hasAllUserChecked == true) {
          //    this.form_data.to_whom == null;
          // }
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    ReceivedFilesRelated(value) {
      this.files_related_info = value;
    },

    async submitEditNotice() {
      if (
        this.hasAllUserChecked == false &&
        this.form_data.to_whom.length == 0
      ) {
        // alert("Hello! I am an alert box!!");
        return;
      } else {
        const currentUserID = localStorage.getItem("id");
        const response = await axios
          .put("notices/" + this.$route.params.id + "/", {
            notice_title: this.form_data.notice_title,
            notice_body: this.form_data.notice_body,
            created_by: currentUserID,
            to_whom:
              this.form_data.to_whom.length > 0 &&
              this.hasAllUserChecked == false
                ? this.form_data.to_whom
                : [],
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              text:
                this.$store.getters.GET_UPDATED +
                " " +
                this.$store.getters.GET_SUCCESSFULLY +
                "...",
            }).then((result) => {
              this.$router.push({ name: "AllNotices" });
              console.log(result);
            });
            console.log(response);
            // file object assign start
            if (this.files_related_info != null) {
              this.$store.dispatch("file/file_obeject_assign", {
                id: response.data.id,
                content_type: response.data.content_type,
                files_related_info: this.files_related_info,
              });
            }
            // file object assign end
          })
          .catch((error) => {
            this.notice_error_data = error.response.data;
            console.log(error.response);
          });
        console.log(response);
      }
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.all_groups.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.all_groups;
      }
    },
    is_disable() {
      if (
        this.hasAllUserChecked == false &&
        this.form_data.to_whom.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    // hasGroupChecked() {
    //   if (this.hasAllUserChecked == true) {
    //     return this.form_data.to_whom == null;
    //   }
    // },
  },
};
</script>
<style>
.ck-editor__editable {
  min-height: 380px;
}
.disabledSection {
  pointer-events: none;
  opacity: 0.4;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #69c5a5;
}
.custom-control-label::before {
  transition: none;
}
.custom-control-label::after {
  border: #69c5a5 !important;
  transition: none !important;
}
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #69c5a5;
}
</style>
