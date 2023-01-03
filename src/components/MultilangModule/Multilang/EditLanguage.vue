<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner" v-if="form_data">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <!--                                <i class="fas fa-user-plus icon-gradient bg-tempting-azure"></i>-->
                <i class="fas fa-edit icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{
                  $store.getters.GET_UPDATE + " " + $store.getters.GET_LANGUAGE
                }}
                <router-link
                  :to="{ path: '/all-languages' }"
                  v-if="hasPermission('view_language')"
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
                        $store.getters.GET_LANGUAGES
                      }}
                    </button>
                  </a>
                </router-link>
                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                </div>-->
              </div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <!-- previous form -->
            <form @submit.prevent="submitLanguageEditForm" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <!--Department Name-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{
                          $store.getters.GET_LANGUAGE +
                          " " +
                          $store.getters.GET_NAME
                        }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="form_data.name"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            language_error_data && language_error_data.name,
                        }"
                      />

                      <!--error handling-->
                      <div
                        :class="{
                          'invalid-feedback':
                            language_error_data && language_error_data.name,
                        }"
                        v-if="language_error_data && language_error_data.name"
                      >
                        {{ language_error_data.name[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Department Code-->
                  <div class="col-md-4 position-relative form-group">
                    <label>
                      {{
                        $store.getters.GET_LANGUAGE +
                        " " +
                        $store.getters.GET_CODE
                      }}
                      <span class="asterisk">*</span>
                    </label>
                    <select
                      name="select"
                      id="month"
                      v-model="form_data.code"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          language_error_data && language_error_data.code,
                      }"
                    >
                      <option value disabled>
                        {{
                          $store.getters.GET_SELECT +
                          " " +
                          $store.getters.GET_LANGUAGE +
                          " " +
                          $store.getters.GET_CODE
                        }}
                      </option>
                      <option
                        v-for="lang in language_with_code"
                        :key="lang.id"
                        :value="lang.code"
                      >
                        <!-- {{ lang.name }} ({{ lang.code }}) -->
                        {{ lang.code }} - {{ lang.name }}
                      </option>
                    </select>
                    <!-- <input
                      v-model="form_data.code"
                      type="text"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          language_error_data && language_error_data.code,
                      }"
                    /> -->
                    <!--error handling-->
                    <div
                      :class="{
                        'invalid-feedback':
                          language_error_data && language_error_data.code,
                      }"
                      v-if="language_error_data && language_error_data.code"
                    >
                      {{ language_error_data.code[0] }}
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{
                          $store.getters.GET_LANGUAGE +
                          " " +
                          $store.getters.GET_STATUS
                        }}
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <select
                        name="select"
                        id="leave-status"
                        v-model="form_data.status"
                        type="boolean"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            language_error_data && language_error_data.status,
                        }"
                      >
                        <option value selected disabled>
                          {{
                            $store.getters.GET_SELECT +
                            " " +
                            $store.getters.GET_STATUS
                          }}
                        </option>
                        <option value="true">
                          {{ $store.getters.GET_YES }}
                        </option>
                        <option value="false">
                          {{ $store.getters.GET_NO }}
                        </option>
                        <!-- <span>leave_status: {{ leave_status }}</span> -->

                        <!--error handling-->
                        <div
                          :class="{
                            'invalid-feedback':
                              language_error_data && language_error_data.status,
                          }"
                          v-if="
                            language_error_data && language_error_data.status
                          "
                        >
                          {{ language_error_data.status[0] }}
                        </div>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group row mt-5">
                <div class="col-md-12 col-lg-12">
                  <div class="p-listbox p-component">
                    <div class="p-listbox-header">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="p-listbox-filter-container">
                            <input
                              type="text"
                              class="p-listbox-filter p-inputtext p-component"
                              v-model="searchKey"
                              placeholder="Filter by key. Ex. LOGIN, LOGOUT"
                            />
                            <span
                              class="p-listbox-filter-icon pi pi-search"
                            ></span>
                          </div>
                        </div>
                        <!-- <div class="col-md-6">
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
                        </div> -->
                      </div>
                    </div>
                    <div class="p-listbox-list-wrapper">
                      <div
                        role="listbox"
                        aria-multiselectable="multiple"
                        class="p-listbox-list permission-custom-height"
                      >
                        <form
                          @submit.prevent="submitGroupForm"
                          autocomplete="off"
                        >
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group row mt-3">
                                <template v-if="resultKey">
                                  <template
                                    v-for="(value, key) in resultKey"
                                    :key="key"
                                  >
                                    <label
                                      class="col-md-12 col-lg-2 col-form-label mt-3"
                                      >{{ key }}</label
                                    >
                                    <div class="col-md-12 col-lg-4 mt-3">
                                      <input
                                        type="text"
                                        class="form-control"
                                        v-model="lang_response_details[key]"
                                      />
                                    </div>
                                  </template>
                                </template>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <button
                  @submit.prevent="submitLanguageEditForm"
                  class="mt-2 btn btn-successs btn-lg float-right"
                >
                  {{ $store.getters.GET_SUBMIT }}
                </button>
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
import axios from "axios";
import Swal from "sweetalert2";
import LangJson from "../../MultilangModule/lang.json";
import permissions from "../../../authorization/permissions";

export default {
  name: "EditLanguage",
  components: { Master },
  data() {
    return {
      form_data: null,
      department_name: null,
      department_code: null,
      lang_response_details: null,
      lang_details: LangJson,
      searchKey: null,
      language_error_data: {
        name: null,
        code: null,
        status: null,
      },
      language_with_code: [
        { name: "Arabic", code: "ar" },
        { name: "Armenian", code: "am" },
        { name: "Azerbaijani", code: "az" },
        { name: "Belarusian", code: "be" },
        { name: "Bengali", code: "bn" },
        { name: "Bulgarian", code: "bg" },
        { name: "Chinese", code: "zh" },
        { name: "Catalan", code: "ca" },
        { name: "Czech", code: "cs" },
        { name: "English", code: "en" },
        { name: "Estonian", code: "et" },
        { name: "French", code: "fr" },
        { name: "German", code: "de" },
        { name: "Greek", code: "el" },
        { name: "Hausa", code: "ha" },
        { name: "Hindi", code: "hi" },
        { name: "Hungarian", code: "hu" },
        { name: "Italian", code: "it" },
        { name: "Japanese", code: "ja" },
        { name: "Javanese", code: "jv" },
        { name: "Khmer", code: "km" },
        { name: "Korean", code: "ko" },
        { name: "Latvian", code: "lv" },
        { name: "Malay", code: "ms" },
        { name: "Marathi", code: "mr" },
        { name: "Persian", code: "fa" },
        { name: "Polish", code: "pl" },
        { name: "Portuguese", code: "pt" },
        { name: "Romanian", code: "ro" },
        { name: "Russian", code: "ru" },
        { name: "Spanish", code: "es" },
        { name: "Swahili", code: "sw" },
        { name: "Tamil", code: "ta" },
        { name: "Telugu", code: "te" },
        { name: "Thai", code: "th" },
        { name: "Turkish", code: "tr" },
        { name: "Uzbek", code: "uz" },
        { name: "Vietnamese", code: "vi" },
        // { name: "Not Found", code: "NF" },
      ],
    };
  },
  created() {
    this.initialLoad();
  },
  computed: {
    resultKey() {
      if (this.searchKey !== null && this.searchKey.length > 0) {
        var search_key = [];
        search_key.push(this.searchKey);
        const asArray = Object.entries(this.lang_details);
        const filteredArr = asArray.filter(function ([key]) {
          console.log("264=====", search_key);
          return search_key.every((v) => key.includes(v));
        });
        console.log("274", filteredArr, this.searchKey);
        const filtered_by_key = Object.fromEntries(filteredArr);
        return filtered_by_key;
      } else {
        return this.lang_details;
      }
    },
  },
  methods: {
    initialLoad: function () {
      this.getLanguageData();
    },
    getLanguageData: function () {
      axios.get(`language/${this.$route.params.id}/`).then(
        (response) => {
          this.form_data = response.data;
          this.lang_response_details = response.data.details;
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    async submitLanguageEditForm() {
      const response = await axios
        .put("language/" + this.$route.params.id + "/", {
          name: this.form_data.name,
          code: this.form_data.code,
          status: this.form_data.status,
          details: this.lang_response_details,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes..."
            text:
              this.$store.getters.GET_UPDATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              "...",
          }).then((result) => {
            this.$router.push({ name: "AllLanguages" });
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.language_error_data = error.response.data;
        });
      console.log(response);
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
.p-listbox .p-listbox-list {
  /* padding: 0.5rem 0; */
  height: 385px;
  padding: 0.2rem 1.5rem;
}
.col-form-label {
  font-size: 14px;
}
</style>
