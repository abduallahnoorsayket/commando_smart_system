<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-marker icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_CREATE +' '+$store.getters.GET_LEAVE+ ' '+ $store.getters.GET_REQUEST}}
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-12">
            <div class="main-card card">
              <div class="card-body">
                <form @submit.prevent="submitAddLeave" autocomplete="off">
                  <div class="form-group">
                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label>
                            {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_SUBJECT}}
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            id="department_name"
                            v-model="leave_subject"
                            type="text"
                            class="form-control"
                            :class="{
                              'is-invalid':
                                leave_req_error &&
                                leave_req_error.leave_subject,
                            }"
                          />

                          <!--error handling-->
                          <div
                            :class="{
                              'invalid-feedback':
                                leave_req_error &&
                                leave_req_error.leave_subject,
                            }"
                            v-if="
                              leave_req_error && leave_req_error.leave_subject
                            "
                          >
                            {{ leave_req_error.leave_subject[0] }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="col-md-12">
                        <div class="position-relative form-group">
                          <label
                            >
                            {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_DESCRIPTION}}
                            <span class="asterisk"
                              >*</span
                            ></label
                          >
                          <br />
                          <ckeditor
                            class="ck-content"
                            :editor="editor"
                            v-model="leave_description"
                            :config="editorConfig"
                          ></ckeditor>
                            <div
                      v-if="leave_req_error && leave_req_error.leave_description"
                      class="alert alert-danger alert-dismissible fade show text-left mt-1"
                      role="alert"
                    >
                      {{ leave_req_error.leave_description[0] }}
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
                      </div>
                    </div>

                    <!--Employee Name & Approved by & Select Leave Status-->
                    <!--<div class="form-row">
                                            <div class="col-md-4">
                                                <div class="position-relative form-group">
                                                    <label>Employee Name
                                                        <span class="asterisk">*</span>
                                                    </label>
                                                    <select
                                                            name="select"
                                                            id="employee_name"
                                                            v-model="employee_name"
                                                            class="form-control"
                                                            :class="{ 'is-invalid': leave_req_error && leave_req_error.employee_name }">
                                                        <option value="false" disabled selected>Select User name
                                                        </option>
                                                        <option v-for="employee in all_employee_name" :key="employee.id"
                                                                :value="employee.id">
                                                            {{ employee.username }}
                                                        </option>

                                                        &lt;!&ndash;error handling&ndash;&gt;
                                                        <div :class="{ 'invalid-feedback': leave_req_error && leave_req_error.employee_name }"
                                                             v-if="leave_req_error && leave_req_error.employee_name">
                                                            {{ leave_req_error.employee_name[0] }}
                                                        </div>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="col-md-4">
                                                <label>Approved by
                                                    <span class="asterisk">*</span>
                                                </label>
                                                <select
                                                        name="select"
                                                        id="approved_by"
                                                        v-model="approved_by"
                                                        class="form-control"
                                                        :class="{ 'is-invalid': leave_req_error && leave_req_error.approved_by }">
                                                    <option value="false" disabled selected>Approved by</option>
                                                    <option v-for="employee in all_employee_name" :key="employee.id"
                                                            :value="employee.id">
                                                        {{ employee.username }}
                                                    </option>

                                                    &lt;!&ndash;error handling&ndash;&gt;
                                                    <div :class="{ 'invalid-feedback': leave_req_error && leave_req_error.approved_by }"
                                                         v-if="leave_req_error && leave_req_error.approved_by">
                                                        {{ leave_req_error.approved_by[0] }}
                                                    </div>
                                                </select>
                                            </div>

                                            <div class="col-md-4">
                                                <label>Select Leave Status </label>
                                                <select
                                                        name="select"
                                                        id="leave-status"
                                                        v-model="select_leave_status"
                                                        type="boolean"
                                                        class="form-control"
                                                        :class="{ 'is-invalid': add_leave_error && add_leave_error.select_leave_status }">
                                                    <option>Approve</option>
                                                    <option>Pending</option>
                                                    <option>Decline</option>
                                                    <span>{{ select_leave_status }}</span>

                                                    &lt;!&ndash;error handling&ndash;&gt;
                                                    <div :class="{ 'invalid-feedback': add_leave_error && add_leave_error.select_leave_status }"
                                                         v-if="add_leave_error && add_leave_error.select_leave_status">
                                                        {{ add_leave_error.select_leave_status[0] }}
                                                    </div>
                                                </select>
                                            </div>
                    </div>-->

                    <div class="form-row">
                      <div class="col-md-4">
                        <div class="position-relative form-group">
                          <label>
                               {{ $store.getters.GET_START +' '+$store.getters.GET_DATE}}
                            <span class="asterisk">*</span>
                          </label>
                          <input
                            name="Start-date"
                            id="Start-date"
                            v-model="application_start_date"
                            type="date"
                            class="form-control"
                            :class="{
                              'is-invalid':
                                leave_req_error &&
                                leave_req_error.application_start_date,
                            }"
                          />

                          <!--error handling-->
                          <div
                            :class="{
                              'invalid-feedback':
                                leave_req_error &&
                                leave_req_error.application_start_date,
                            }"
                            v-if="
                              leave_req_error &&
                              leave_req_error.application_start_date
                            "
                          >
                            {{ leave_req_error.application_start_date[0] }}
                          </div>
                        </div>
                      </div>

                      <div class="col-md-4">
                        <label>
                           {{ $store.getters.GET_END +' '+$store.getters.GET_DATE}}
                          <span class="asterisk">*</span>
                        </label>
                        <input
                          name="End-date"
                          id="End-date"
                          v-model="application_end_date"
                          type="date"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              leave_req_error &&
                              leave_req_error.application_end_date,
                          }"
                        />

                        <!--error handling-->
                        <div
                          :class="{
                            'invalid-feedback':
                              leave_req_error &&
                              leave_req_error.application_end_date,
                          }"
                          v-if="
                            leave_req_error &&
                            leave_req_error.application_end_date
                          "
                        >
                          {{ leave_req_error.application_end_date[0] }}
                        </div>
                      </div>

                      <div class="col-md-4">
                        <label>
                           {{ $store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}
                          <span class="asterisk">*</span>
                        </label>
                        <select
                          name="select"
                          v-model="leave_type"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              leave_req_error && leave_req_error.leave_type,
                          }"
                        >
                          <option value="false"  selected>
                            {{$store.getters.GET_SELECT  +' '+$store.getters.GET_LEAVE +' '+$store.getters.GET_TYPE}}
                          </option>
                          <option
                            v-for="leavetype in all_leave_types"
                            :key="leavetype.id"
                            :value="leavetype.id"
                          >
                            {{ leavetype.leave_type }}
                          </option>                         
                        </select>
                         <!--error handling-->
                          <div
                            :class="{
                              'invalid-feedback':
                                leave_req_error && leave_req_error.leave_type,
                            }"
                            v-if="leave_req_error && leave_req_error.leave_type"
                          >
                            {{ leave_req_error.leave_type[0] }}
                          </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <button
                        @submit.prevent="submitAddLeave"
                        class="mt-2 btn btn-successs btn-lg float-right"
                      >
                        {{ $store.getters.GET_SUBMIT}}
                      </button>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "AddLeaveRequest",
  components: {
    Master,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      // currntUserBranchID: null,
      editor: ClassicEditor,

      leave_subject: null,
      leave_description: null,
      application_start_date: null,
      application_end_date: null,
      leave_type: null,
      username: null,
      select_leave_status: null,
      approved_by: null,
      employee_name: null,

      all_leave_types: null,
      all_employee_name: null,

      leave_req_error: {
        leave_subject: null,
        leave_description: null,
        application_start_date: null,
        application_end_date: null,
        leave_type: null,
        username: null,
      },
    };
  },
  created() {
    // this.currntUserBranchID = localStorage.getItem("branch_id");
    // console.log("357", this.currntUserBranchID);
    this.loadLeaveTypes();
    // this.loadEmployeeName();
  },
  methods: {
    // short list leave type

    loadLeaveTypes() {
      const currntUserBranchID = localStorage.getItem("branch_id");
      axios
        .get("leave-type-short-list/", {
          params: {
            branch: currntUserBranchID,
          },
        })
        .then((response) => {
          this.all_leave_types = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // loadLeaveTypes() {
    //   const currntUserBranchID = localStorage.getItem("branch_id");
    //   const token = localStorage.getItem("token");
    //   axios
    //     .get("leave-types/", {
    //       headers: {
    //         Authorization: `token ${token}`,
    //       },
    //       params: {
    //         branch: currntUserBranchID,
    //       },
    //     })
    //     .then((response) => {
    //       this.all_leave_types = response.data.results;
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // },

    loadEmployeeName() {
      axios
        .get("users/", {
        })
        .then((response) => {
          this.all_employee_name = response.data.results;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    async submitAddLeave() {
      let currntUserID = localStorage.getItem("id");
      const response = await axios
        .post("leaves/", {
          leave_subject: this.leave_subject,
          leave_description: this.leave_description,
          application_start_date: this.application_start_date,
          application_end_date: this.application_end_date,
          leave_type: this.leave_type,
          employee_name: currntUserID,
          // select_leave_status: this.select_leave_status,
          // approved_by: this.approved_by,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text: this.$store.getters.GET_CREATED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            // this.$router.push("all-leaves");
            this.$router.push("my-leaves");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.leave_req_error = error.response.data;
          console.log("--++", error.response);
        });
      console.log(response);
    },
  },
};
</script>

<style scoped>
/* .ck-editor {
  color: var(--color);
  color: yellow;
}
.ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
.ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
  background: green !important;
}

.ck.ck-editor__main > .ck-editor__editable:not(.ck-focused) {
  border-color: red !important;
}
.ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
  box-shadow: none !important;
  border: green !important
  ;
} */
/* ck editor styles */
/*
 * CKEditor 5 (v27.0.0) content styles.
 * Generated on Wed, 24 Mar 2021 08:00:59 GMT.
 * For more information, check out https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/content-styles.html
 */

:root {
  --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);
  --ck-color-mention-text: hsl(341, 100%, 30%);
  --ck-highlight-marker-blue: hsl(201, 97%, 72%);
  --ck-highlight-marker-green: hsl(120, 93%, 68%);
  --ck-highlight-marker-pink: hsl(345, 96%, 73%);
  --ck-highlight-marker-yellow: hsl(60, 97%, 73%);
  --ck-highlight-pen-green: hsl(112, 100%, 27%);
  --ck-highlight-pen-red: hsl(0, 85%, 49%);
  --ck-image-style-spacing: 1.5em;
  --ck-todo-list-checkmark-size: 16px;
}

/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-tiny {
  font-size: 0.7em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-small {
  font-size: 0.85em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-big {
  font-size: 1.4em;
}
/* ckeditor5-font/theme/fontsize.css */
.ck-content .text-huge {
  font-size: 1.8em;
}
/* ckeditor5-code-block/theme/codeblock.css */
.ck-content pre {
  padding: 1em;
  color: hsl(0, 0%, 20.8%);
  background: hsla(0, 0%, 78%, 0.3);
  border: 1px solid hsl(0, 0%, 77%);
  border-radius: 2px;
  text-align: left;
  direction: ltr;
  tab-size: 4;
  white-space: pre-wrap;
  font-style: normal;
  min-width: 200px;
}
/* ckeditor5-code-block/theme/codeblock.css */
.ck-content pre code {
  background: unset;
  padding: 0;
  border-radius: 0;
}
/* ckeditor5-horizontal-line/theme/horizontalline.css */
.ck-content hr {
  margin: 15px 0;
  height: 4px;
  background: hsl(0, 0%, 87%);
  border: 0;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-yellow {
  background-color: var(--ck-highlight-marker-yellow);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-green {
  background-color: var(--ck-highlight-marker-green);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-pink {
  background-color: var(--ck-highlight-marker-pink);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .marker-blue {
  background-color: var(--ck-highlight-marker-blue);
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .pen-red {
  color: var(--ck-highlight-pen-red);
  background-color: transparent;
}
/* ckeditor5-highlight/theme/highlight.css */
.ck-content .pen-green {
  color: var(--ck-highlight-pen-green);
  background-color: transparent;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-side {
  float: right;
  margin-left: var(--ck-image-style-spacing);
  max-width: 50%;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-left {
  float: left;
  margin-right: var(--ck-image-style-spacing);
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-center {
  margin-left: auto;
  margin-right: auto;
}
/* ckeditor5-image/theme/imagestyle.css */
.ck-content .image-style-align-right {
  float: right;
  margin-left: var(--ck-image-style-spacing);
}
/* ckeditor5-image/theme/imagecaption.css */
.ck-content .image > figcaption {
  display: table-caption;
  caption-side: bottom;
  word-break: break-word;
  color: hsl(0, 0%, 20%);
  background-color: hsl(0, 0%, 97%);
  padding: 0.6em;
  font-size: 0.75em;
  outline-offset: -1px;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image {
  display: table;
  clear: both;
  text-align: center;
  margin: 1em auto;
}
/* ckeditor5-image/theme/image.css */
.ck-content .image img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  min-width: 50px;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized {
  max-width: 100%;
  display: block;
  box-sizing: border-box;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized img {
  width: 100%;
}
/* ckeditor5-image/theme/imageresize.css */
.ck-content .image.image_resized > figcaption {
  display: block;
}
/* ckeditor5-language/theme/language.css */
.ck-content span[lang] {
  font-style: italic;
}
/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content blockquote {
  overflow: hidden;
  padding-right: 1.5em;
  padding-left: 1.5em;
  margin-left: 0;
  margin-right: 0;
  font-style: italic;
  border-left: solid 5px hsl(0, 0%, 80%);
}
/* ckeditor5-block-quote/theme/blockquote.css */
.ck-content[dir="rtl"] blockquote {
  border-left: 0;
  border-right: solid 5px hsl(0, 0%, 80%);
}
/* ckeditor5-basic-styles/theme/code.css */
.ck-content code {
  background-color: hsla(0, 0%, 78%, 0.3);
  padding: 0.15em;
  border-radius: 2px;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table {
  margin: 1em auto;
  display: table;
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  height: 100%;
  border: 1px double hsl(0, 0%, 70%);
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table td,
.ck-content .table table th {
  min-width: 2em;
  padding: 0.4em;
  border: 1px solid hsl(0, 0%, 75%);
}
/* ckeditor5-table/theme/table.css */
.ck-content .table table th {
  font-weight: bold;
  background: hsla(0, 0%, 0%, 5%);
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="rtl"] .table th {
  text-align: right;
}
/* ckeditor5-table/theme/table.css */
.ck-content[dir="ltr"] .table th {
  text-align: left;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break {
  position: relative;
  clear: both;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break::after {
  content: "";
  position: absolute;
  border-bottom: 2px dashed hsl(0, 0%, 77%);
  width: 100%;
}
/* ckeditor5-page-break/theme/pagebreak.css */
.ck-content .page-break__label {
  position: relative;
  z-index: 1;
  padding: 0.3em 0.6em;
  display: block;
  text-transform: uppercase;
  border: 1px solid hsl(0, 0%, 77%);
  border-radius: 2px;
  font-family: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;
  font-size: 0.75em;
  font-weight: bold;
  color: hsl(0, 0%, 20%);
  background: hsl(0, 0%, 100%);
  box-shadow: 2px 2px 1px hsla(0, 0%, 0%, 0.15);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* ckeditor5-media-embed/theme/mediaembed.css */
.ck-content .media {
  clear: both;
  margin: 1em 0;
  display: block;
  min-width: 15em;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list {
  list-style: none;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list li {
  margin-bottom: 5px;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list li .todo-list {
  margin-top: 5px;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input {
  -webkit-appearance: none;
  display: inline-block;
  position: relative;
  width: var(--ck-todo-list-checkmark-size);
  height: var(--ck-todo-list-checkmark-size);
  vertical-align: middle;
  border: 0;
  left: -25px;
  margin-right: -15px;
  right: 0;
  margin-left: 0;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input::before {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  border: 1px solid hsl(0, 0%, 20%);
  border-radius: 2px;
  transition: 250ms ease-in-out box-shadow, 250ms ease-in-out background,
    250ms ease-in-out border;
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input::after {
  display: block;
  position: absolute;
  box-sizing: content-box;
  pointer-events: none;
  content: "";
  left: calc(var(--ck-todo-list-checkmark-size) / 3);
  top: calc(var(--ck-todo-list-checkmark-size) / 5.3);
  width: calc(var(--ck-todo-list-checkmark-size) / 5.3);
  height: calc(var(--ck-todo-list-checkmark-size) / 2.6);
  border-style: solid;
  border-color: transparent;
  border-width: 0 calc(var(--ck-todo-list-checkmark-size) / 8)
    calc(var(--ck-todo-list-checkmark-size) / 8) 0;
  transform: rotate(45deg);
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input[checked]::before {
  background: hsl(126, 64%, 41%);
  border-color: hsl(126, 64%, 41%);
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label > input[checked]::after {
  border-color: hsl(0, 0%, 100%);
}
/* ckeditor5-list/theme/todolist.css */
.ck-content .todo-list .todo-list__label .todo-list__label__description {
  vertical-align: middle;
}
/* ckeditor5-html-embed/theme/htmlembed.css */
.ck-content .raw-html-embed {
  margin: 1em auto;
  min-width: 15em;
  font-style: normal;
}
/* ckeditor5-mention/theme/mention.css */
.ck-content .mention {
  background: var(--ck-color-mention-background);
  color: var(--ck-color-mention-text);
}
@media print {
  /* ckeditor5-page-break/theme/pagebreak.css */
  .ck-content .page-break {
    padding: 0;
  }
  /* ckeditor5-page-break/theme/pagebreak.css */
  .ck-content .page-break::after {
    display: none;
  }
}
</style>
