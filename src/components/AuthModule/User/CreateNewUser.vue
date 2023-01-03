<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-user-plus icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{
                  $store.getters.GET_CREATE +
                  " " +
                  $store.getters.GET_NEW +
                  " " +
                  $store.getters.GET_USER
                }}
              </div>
            </div>
          </div>
        </div>

        <div class="main-card card">
          <div class="card-body">
            <!-- <form v-on:submit.prevent="submitUserForm">-->
            <form @submit.prevent="submitUserForm" autocomplete="off">
              <div class="form-group">
                <div class="form-row">
                  <!--First Name-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_FIRST_NAME }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="first_name"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.first_name,
                        }"
                      />

                      <div
                        :class="{
                          'invalid-feedback':
                            base_error && base_error.first_name,
                        }"
                        v-if="base_error && base_error.first_name"
                      >
                        {{ base_error.first_name[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Last Name-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_LAST_NAME }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="last_name"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.last_name,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            base_error && base_error.last_name,
                        }"
                        v-if="base_error && base_error.last_name"
                      >
                        {{ base_error.last_name[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Email-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_EMAIL }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="username"
                        type="email"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.username,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback': base_error && base_error.username,
                        }"
                        v-if="base_error && base_error.username"
                      >
                        {{ base_error.username[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Password-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_PASSWORD }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="password"
                        type="password"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.password,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback': base_error && base_error.password,
                        }"
                        v-if="base_error && base_error.password"
                      >
                        {{ base_error.password[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Phone-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label> {{ $store.getters.GET_PHONE }}</label>
                      <input
                        v-model="user_profile.phone"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_data && error_data.user_profile.phone,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user_profile.phone,
                        }"
                        v-if="error_data && error_data.user_profile.phone"
                      >
                        {{ error_data.user_profile.phone[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Designation-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_DESIGNATION }}
                        <span class="asterisk">*</span>
                      </label>

                      <select
                        name="select"
                        v-model="user_profile.designation"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_data && error_data.user_profile.designation,
                        }"
                      >
                        <option value="false" disabled selected>
                          {{
                            $store.getters.GET_SELECT +
                            " " +
                            $store.getters.GET_DESIGNATION
                          }}
                        </option>
                        <option
                          v-for="designation in all_designations"
                          :key="designation.id"
                          :value="designation.id"
                        >
                          {{ designation.designation_name }}
                        </option>
                      </select>
                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user_profile.designation,
                        }"
                        v-if="error_data && error_data.user_profile.designation"
                      >
                        {{ error_data.user_profile.designation[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Super User & active-->
                  <div class="col-md-4">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            {{ $store.getters.GET_SUPER_USER }}
                            <span class="asterisk"> *</span>
                          </label>
                          <div
                            class="position-relative form-group form-row mt-2"
                          >
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
                              </label>
                            </div>
                            <!-- <div class="col-md-6"><label class="form-check-label" style="font-weight: 600;">
                            <input type="checkbox" v-model="hasParentTask" />
                            <span class="checkmark"></span>
                            <label class="ml-2">No</label>
                          </label></div> -->
                          </div>
                          <!-- <select
                        v-model="is_superuser"
                        type="boolean"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.is_superuser,
                        }"
                      >
                        <option value="true"> {{ $store.getters.GET_YES}}</option>
                        <option value="false">{{ $store.getters.GET_NO}}</option>
                      </select>
                      <div
                        :class="{
                          'invalid-feedback':
                            base_error && base_error.is_superuser,
                        }"
                        v-if="base_error && base_error.is_superuser"
                      >
                        {{ base_error.is_superuser[0] }}
                      </div> -->
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="position-relative form-group">
                          <label>
                            {{ $store.getters.GET_ACTIVE }}
                            <span class="asterisk"> *</span>
                          </label>
                          <div
                            class="position-relative form-group form-row mt-2"
                          >
                            <div class="col-md-12">
                              <label
                                class="form-check-label"
                                style="font-weight: 600"
                              >
                                <input type="checkbox" v-model="is_active" />
                                <span class="checkmark ml-2"></span>
                                <label class="ml-3">
                                  {{
                                    is_active == true
                                      ? $store.getters.GET_YES
                                      : $store.getters.GET_NO
                                  }}</label
                                >
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_SUPER_USER}}
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        v-model="is_superuser"
                        type="boolean"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.is_superuser,
                        }"
                      >
                        <option value="true"> {{ $store.getters.GET_YES}}</option>
                        <option value="false">{{ $store.getters.GET_NO}}</option>
                      </select>
                      <div
                        :class="{
                          'invalid-feedback':
                            base_error && base_error.is_superuser,
                        }"
                        v-if="base_error && base_error.is_superuser"
                      >
                        {{ base_error.is_superuser[0] }}
                      </div>
                    </div> -->
                  </div>

                  <!--Department-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_DEPARTMENT }}
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        v-model="user_profile.department"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_data && error_data.user_profile.department,
                        }"
                      >
                        <option value="false" disabled selected>
                          {{
                            $store.getters.GET_SELECT +
                            " " +
                            $store.getters.GET_DEPARTMENT
                          }}
                        </option>
                        <option
                          v-for="dprtmnt in all_departments"
                          :key="dprtmnt.id"
                          :value="dprtmnt.id"
                        >
                          {{ dprtmnt.department_name }}
                        </option>
                      </select>
                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user_profile.department,
                        }"
                        v-if="error_data && error_data.user_profile.department"
                      >
                        {{ error_data.user_profile.department[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Branch-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_BRANCH }}
                        <span class="asterisk">*</span>
                      </label>
                      <select
                        v-model="user_profile.branch"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_data && error_data.user_profile.branch,
                        }"
                      >
                        <option value="false" disabled selected>
                          {{
                            $store.getters.GET_SELECT +
                            " " +
                            $store.getters.GET_BRANCH
                          }}
                        </option>
                        <option
                          v-for="brnch in all_branchs"
                          :key="brnch.id"
                          :value="brnch.id"
                        >
                          {{ brnch.branch_name }}
                        </option>
                      </select>

                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user_profile.branch,
                        }"
                        v-if="error_data && error_data.user_profile.branch"
                      >
                        {{ error_data.user_profile.branch[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- {{Branch & Address}}-->
                <div class="form-row mt-2">
                  <!--Address-->
                  <div class="col-md-4">
                    <div class="position-relative form-group mt-3">
                      <label>
                        {{ $store.getters.GET_ADDRESS }}
                      </label>
                      <input
                        v-model="user_profile.location"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.location,
                        }"
                      />

                      <div
                        :class="{
                          'invalid-feedback': base_error && base_error.location,
                        }"
                        v-if="base_error && base_error.location"
                      >
                        {{ base_error.location[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Education-->
                  <div class="col-md-4">
                    <div class="position-relative form-group mt-3">
                      <label>{{ $store.getters.GET_EDUCATION }}</label>
                      <span class="text-muted">
                        ({{ $store.getters.GET_LAST_COMPLETED_DEGREE }})
                      </span>
                      <input
                        v-model="user_profile.education"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': base_error && base_error.education,
                        }"
                      />

                      <div
                        :class="{
                          'invalid-feedback':
                            base_error && base_error.education,
                        }"
                        v-if="base_error && base_error.education"
                      >
                        {{ base_error.education[0] }}
                      </div>
                    </div>
                  </div>

                  <!--Joining Date-->
                  <div class="col-md-4">
                    <div class="position-relative form-group mt-3">
                      <label>
                        {{ $store.getters.GET_JOINING_DATE }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="user_profile.joining_date"
                        type="date"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_data && error_data.user_profile.joining_date,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user_profile.joining_date,
                        }"
                        v-if="
                          error_data && error_data.user_profile.joining_date
                        "
                      >
                        {{ error_data.user_profile.joining_date[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <!--Skill-->
                <div class="form-row">
                  <div class="col-md-8">
                    <div class="position-relative form-group mt-1">
                      <label>{{ $store.getters.GET_SKILL }}</label>
                      <span class="text-muted">
                        ({{
                          $store.getters
                            .GET_EX_PYTHON_JAVA_PLEASE_PRESS_ENTER_AFTER_TYPING_EACH_SKILL
                        }})
                      </span>

                      <input
                        name="skill"
                        id="skill"
                        v-model="tagValue"
                        v-on:keydown.enter.prevent="addTag"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_data && error_data.user_profile.skills,
                        }"
                      />

                      <div
                        class="tag"
                        v-for="(skill, index) in user_profile.skills"
                        :key="'tag' + index"
                      >
                        <span>{{ skill }}</span>
                        <span @click="removeTag(index)">
                          <i class="fas fa-times-circle"></i>
                        </span>
                      </div>

                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user_profile.skills,
                        }"
                        v-if="error_data && error_data.user_profile.skills"
                      >
                        <!-- {{ error_data && error_data.user_profile.skills[0][0] }} -->
                        <!-- Ensure each skill has no more than 20 characters. -->
                        {{
                          $store.getters
                            .GET_ENSURE_EACH_SKILL_HAS_NO_MORE_THAN_20_CHARACTERS
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label class="ml-2">
                        Gender
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <p class="mt-3 ml-2">
                        <span class="mr-3">
                          <input
                            type="radio"
                            id="test1"
                            name="radio-group"
                            v-model="user_profile.gender"
                            value="ML"
                            class="form-control"
                          />
                          <!-- :class="{'is-invalid':sprint_error && sprint_error.is_current}"
                            <span
                            :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                            v-if="sprint_error && sprint_error.is_current"
                          >{{sprint_error.is_current[0] }}</span>-->
                          <label for="test1">Male</label>
                        </span>
                        <input
                          type="radio"
                          id="test2"
                          name="radio-group"
                          v-model="user_profile.gender"
                          value="FL"
                          class="form-control"
                        />
                        <!--:class="{'is-invalid':sprint_error && sprint_error.is_current}"
                           <span
                          :class="{'invalid-feedback':sprint_error && sprint_error.is_current}"
                          v-if="sprint_error && sprint_error.is_current"
                        >{{sprint_error.is_current[0] }}</span>-->
                        <label for="test2">Female</label>
                      </p>
                      <!-- <div
                        v-if="sprint_error && sprint_error.is_current"
                        class="alert alert-danger alert-dismissible fade show text-left mt-1"
                        role="alert"
                      >
                        Please select an option.
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
                  </div>
                </div>

                <!--Short Bio-->
                <div class="position-relative form-group mt-3 mb-4">
                  <div>
                    <label>
                      {{ $store.getters.GET_SHORT_BIO }}
                    </label>
                    <span class="text-muted">
                      ({{ $store.getters.GET_MAX_200_CHARACTERS }})
                    </span>
                  </div>
                  <textarea
                    v-model="user_profile.short_bio"
                    type="text"
                    class="form-control mb-2"
                    rows="4"
                    cols="50"
                    :class="{
                      'is-invalid': base_error && base_error.short_bio,
                    }"
                    maxlength="201"
                  ></textarea>

                  <div
                    v-if="
                      user_profile.short_bio &&
                      user_profile.short_bio.length > 200
                    "
                    class="alert alert-danger alert-dismissible fade show text-center"
                    role="alert"
                  >
                    {{
                      $store.getters
                        .GET_MAX_CHARACTER_EXCEEDS_FOR_SHORT_BIO_PLEASE_REMOVE_ONE_CHARACTER
                    }}
                  </div>
                </div>
                <!-- New design -->
                <p>
                  <strong class="app-sidebar__heading">
                    {{ $store.getters.GET_GROUPS_AND_PERMISSIONS }}
                  </strong>
                </p>
                <hr />
                <div class="form-group row mt-3">
                  <label class="col-md-12 col-lg-2 col-form-label">
                    {{ $store.getters.GET_GROUPS }}
                  </label>
                  <div class="col-md-12 col-lg-10">
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
                          v-if="all_groups"
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
                </div>
                <!--  new permission ui -->
                <div class="form-group row mt-4">
                  <label class="col-md-12 col-lg-2 col-form-label"
                    >{{ $store.getters.GET_PERMISSIONS }}
                  </label>
                  <div class="col-md-12 col-lg-10">
                    <div class="p-listbox p-component">
                      <!-- <div class="p-listbox-header">
                      <div class="p-listbox-filter-container">
                        <input
                          type="text"
                          class="p-listbox-filter p-inputtext p-component"
                          v-model="searchQuery"
                          placeholder="Filter"
                        />
                        <span class="p-listbox-filter-icon pi pi-search"></span>
                      </div>
                    </div> -->
                      <div class="p-listbox-list-wrapper">
                        <div
                          role="listbox"
                          aria-multiselectable="multiple"
                          class="p-listbox-list permission-custom-height"
                        >
                          <div
                            class="module-permission-section"
                            v-for="(module_obj, perm_index) in permissions"
                            :key="perm_index"
                          >
                            <div class="main-card lastActivityCard">
                              <h5 class="listTitle">{{ module_obj.module }}</h5>
                            </div>
                            <div class="row module">
                              <div class="col-md-12">
                                <div class="p-listbox-item">
                                  <label class="form-check-label">
                                    <input
                                      type="checkbox"
                                      class="form-check-input"
                                      @click="ModuleClick($event, perm_index)"
                                      :id="'module_' + perm_index"
                                    />
                                    <span class="checkmark"></span>
                                    {{ module_obj.module }}
                                  </label>
                                </div>
                              </div>
                            </div>
                            <template
                              v-for="(model, m_index) in module_obj.models"
                              :key="m_index"
                            >
                              <div class="row submodule">
                                <div class="col-md-12">
                                  <div class="p-listbox-item">
                                    <label
                                      class="form-check-label"
                                      style="font-weight: 300"
                                    >
                                      <input
                                        type="checkbox"
                                        class="form-check-input"
                                        @click="
                                          ModelClick(
                                            $event,
                                            perm_index,
                                            m_index
                                          )
                                        "
                                        :id="
                                          'module_' +
                                          perm_index +
                                          '_model_' +
                                          m_index
                                        "
                                      />
                                      <!--v-model="isCheckAll" @click="checkAll(model.permissions)" -->
                                      <span class="checkmark"></span>
                                      {{ model.name }}
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div class="row permission_name">
                                <div
                                  class="col-sm-6 col-md-6 col-xl-3"
                                  v-for="(
                                    permission, model_index
                                  ) in model.permissions"
                                  :key="model_index"
                                >
                                  <div class="p-listbox-item">
                                    <label
                                      class="form-check-label"
                                      style="font-weight: 300"
                                    >
                                      <input
                                        type="checkbox"
                                        class="form-check-input"
                                        :value="permission.id"
                                        v-model="user_permissions"
                                      />
                                      <!-- @change="updateCheckall()" -->
                                      <span class="checkmark"></span>
                                      {{ permission.name.slice(3) }}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!--Social Links-->
                <p>
                  <strong class="app-sidebar__heading">
                    {{ $store.getters.GET_SOCIAL_LINKS }}
                  </strong>
                </p>
                <hr />
                <div class="form-row">
                  <div class="col-md-12">
                    <div class="position-relative form-group mt-1">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <img
                              src="../social_images/github.png"
                              alt
                              width="20"
                              height="20"
                            />
                          </span>
                        </div>
                        <input
                          placeholder="Enter Github URL"
                          v-model="user_profile.github"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              error_data && error_data.user_profile.github,
                          }"
                        />

                        <div
                          :class="{
                            'invalid-feedback':
                              error_data && error_data.user_profile.github,
                          }"
                          v-if="error_data && error_data.user_profile.github"
                        >
                          {{ error_data.user_profile.github[0] }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="position-relative form-group mt-1">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <img
                              src="../social_images/linkedin.png"
                              alt
                              width="20"
                              height="20"
                            />
                          </span>
                        </div>
                        <input
                          placeholder="Enter Linked In URL"
                          v-model="user_profile.linkedin"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              error_data && error_data.user_profile.linkedin,
                          }"
                        />

                        <div
                          :class="{
                            'invalid-feedback':
                              error_data && error_data.user_profile.linkedin,
                          }"
                          v-if="error_data && error_data.user_profile.linkedin"
                        >
                          {{ error_data.user_profile.linkedin[0] }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="position-relative form-group mt-1">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <img
                              src="../social_images/facebook.png"
                              alt
                              width="20"
                              height="20"
                            />
                          </span>
                        </div>
                        <input
                          placeholder="Enter Facebook URL"
                          v-model="user_profile.facebook"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              error_data && error_data.user_profile.facebook,
                          }"
                        />
                        <div
                          :class="{
                            'invalid-feedback':
                              error_data && error_data.user_profile.facebook,
                          }"
                          v-if="error_data && error_data.user_profile.facebook"
                        >
                          {{ error_data.user_profile.facebook[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="position-relative form-group mt-1">
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1">
                            <img
                              src="../social_images/global.png"
                              alt
                              width="20"
                              height="20"
                            />
                          </span>
                        </div>
                        <input
                          placeholder="Enter Personal Website URL"
                          v-model="user_profile.personal_website"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              error_data &&
                              error_data.user_profile.personal_website,
                          }"
                        />
                        <div
                          :class="{
                            'invalid-feedback':
                              error_data &&
                              error_data.user_profile.personal_website,
                          }"
                          v-if="
                            error_data &&
                            error_data.user_profile.personal_website
                          "
                        >
                          {{ error_data.user_profile.personal_website[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <button
                    @submit.prevent="submitUserForm"
                    class="mt-2 btn btn-successs btn-lg float-right"
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
import axios from "axios";
import Swal from "sweetalert2";
import voiceType from "../../VoiceModule/store/voiceType";
// import "";

export default {
  name: "CreateNewUser",
  components: { Master },
  data() {
    return {
      characterAlert: null,
      username: null,
      email: null,
      password: null,
      first_name: null,
      last_name: null,
      is_active: true,
      is_superuser: false,
      groups: [],
      user_permissions: [],
      user_profile: {
        gender: null,
        designation: null,
        joining_date: null,
        department: null,
        branch: null,
        short_bio: null,
        education: null,
        location: null,
        phone: null,
        skills: [],
        github: null,
        linkedin: null,
        facebook: null,
        personal_website: null,
      },
      // selectedPermissions: [],
      permissions: null,
      all_groups: null,
      all_permission: null,
      all_departments: null,
      all_branchs: null,
      all_designations: null,

      tagValue: "",

      searchQuery: null,
      GroupSearch: null,

      // error_data: null,
      error_data: {
        user_profile: {
          designation: null,
          department: null,
          branch: null,
          joining_date: null,
          github: null,
          linkedin: null,
          facebook: null,
          personal_website: null,
          skills: null,
          phone: null,
        },
      },
      base_error: {
        first_name: null,
        last_name: null,
        username: null,
        password: null,
        is_superuser: null,
        education: null,
        location: null,
      },
      // voice data
      voice_type_details: {},
      voiceSet_error_data: null,
    };
  },

  methods: {
    ModuleClick(e, module_index) {
      // console.log(this.permissions[module_index]['models']);
      this.permissions[module_index]["models"].forEach((element, key) => {
        // console.log(e, module_index, key);
        document.getElementById(
          "module_" + module_index + "_model_" + key
        ).checked = e.target.checked;
        this.ModelClick(e, module_index, key);
      });
    },
    ModelClick(e, module_index, model_index) {
      if (e.target.checked) {
        //push id in permissions object
        this.permissions[module_index]["models"][model_index][
          "permissions"
        ].forEach((element) => {
          this.user_permissions.push(element.id);
        });
      } else {
        this.permissions[module_index]["models"][model_index][
          "permissions"
        ].forEach((element) => {
          // this.selectedPermissions.push(element.id);
          let index = this.user_permissions.indexOf(element.id);
          if (index !== -1) {
            // console.log(this.selectedPermissions.splice(index));
            this.user_permissions.splice(index, 1);
          }
        });
      }
    },
    loadDesignation() {
      axios
        .get("designation/", {})
        .then((response) => {
          this.all_designations = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadGroup() {
      axios
        .get("groups/", {})
        .then((response) => {
          this.all_groups = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadPermission() {
      axios
        .get("custom-permissions/", {})
        .then((response) => {
          this.permissions = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadDepartment() {
      axios
        .get("departments/", {})
        .then((response) => {
          this.all_departments = response.data;
          this.all_departments = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadBranch() {
      axios
        .get("branches/", {})
        .then((response) => {
          this.all_branchs = response.data;
          this.all_branchs = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    //Skills input tag function start
    addTag() {
      if (!this.tagValue == "") this.user_profile.skills.push(this.tagValue);

      this.tagValue = "";
    },
    removeTag(index) {
      this.user_profile.skills.splice(index, 1);
    },
    //Skills input tag function end

    submitUserForm() {
      axios
        .post("users/", {
          username: this.username,
          password: this.password,
          first_name: this.first_name,
          last_name: this.last_name,
          is_superuser: this.is_superuser,
          is_active: this.is_active,
          groups: this.groups,
          user_permissions: this.user_permissions,
          user_profile: {
            gender: this.user_profile.gender,
            designation: this.user_profile.designation,
            joining_date: this.user_profile.joining_date,
            branch: this.user_profile.branch,
            department: this.user_profile.department,
            short_bio: this.user_profile.short_bio,
            education: this.user_profile.education,
            location: this.user_profile.location,
            phone: this.user_profile.phone,
            // skills: this.user_profile.skills ? this.user_profile.skills.split(",") : [],
            skills: this.user_profile.skills,

            github: this.user_profile.github,
            linkedin: this.user_profile.linkedin,
            facebook: this.user_profile.facebook,
            personal_website: this.user_profile.personal_website,
          },
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:
              this.$store.getters.GET_CREATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              " ...",
          }).then((result) => {
            this.$router.push("user-list");
            console.log(result);
          });
          console.log(response);
          // api call for voice set up start
          // for gender female
          axios
            .post("voice-config/", {
              accent:
                response.data.user_profile.gender == "FL"
                  ? 3
                  : response.data.user_profile.gender == "ML"
                  ? 2
                  : 0,
              voice_mode: "FO",
              volume: 1,
              speed: 1,
              // pitch: 1.8,
              is_male:
                response.data.user_profile.gender == "FL"
                  ? true
                  : response.data.user_profile.gender == "ML"
                  ? false
                  : true,
              is_on: true,
              user: response.data.id,
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              this.voiceSet_error_data = error.response.data;
            });
          // if (response.data.user_profile.gender == "FL") {
          //   localStorage.setItem("pitch", 1.8);
          // } else if (response.data.user_profile.gender == "ML") {
          //   localStorage.setItem("pitch", 1.2);
          // } else {
          //   localStorage.setItem("pitch", 1.8);
          // }
          console.log(response);
          // voice set up end
        })
        .catch((error) => {
          // this.error_data = error.response.data;
          if (error.response.data && error.response.data.user_profile) {
            this.error_data.user_profile = error.response.data.user_profile;
            this.base_error = error.response.data;
          } else if (error.response.data.user_profile) {
            this.error_data.user_profile = error.response.data.user_profile;
          } else {
            this.error_data.user_profile = {};
            this.base_error = error.response.data;
          }

          console.log("--++", error.response);
        });
    },
    // voice type set
    setVoiceTypeObject() {
      for (var property in voiceType) {
        this.voice_type_details[property] = voiceType[property];
      }
    },
  },
  created() {
    this.loadGroup();
    this.loadPermission();
    this.loadDepartment();
    this.loadBranch();
    this.loadDesignation();
    this.setVoiceTypeObject();
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.all_permission.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.all_permission;
      }
    },

    filterGroups() {
      if (this.GroupSearch) {
        return this.all_groups.filter((item) => {
          return this.GroupSearch.toLowerCase()
            .split(" ")
            .every((v) => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.all_groups;
      }
    },
  },
};
</script>

<style scoped>
.text-muted {
  color: #6c757d !important;
  margin-left: 5px;
  font-size: 85%;
}
/* social links */
.app-sidebar__heading {
  color: #69c5a5;
  text-transform: capitalize;
}

hr {
  height: 1px;
  background-color: #dcdcdc;
  border: none;
  /* margin-bottom: 20px; */
  margin-top: 0px;
}

/*  new permission UI */
/*  */
.permission-custom-height {
  height: 485px;
}
.lastActivityCard {
  /* background: #e6f7f4; */
  background: #d8f3e5;
  padding: 1px;
  border-left: 2px solid #69c5a5;
  border-radius: 1px;
  margin: 0px 0px 15px 0px;
}
.listTitle {
  margin-left: 10px;
  margin-top: 10px;
}
.submodule {
  margin-left: 40px;
}
.permission_name {
  margin-left: 100px;
}
.module-permission-section {
  margin: 15px 0px 30px 0px;
}
.module {
  margin: 20px 0px 10px 10px;
}
/* ==================Responsive style================== */
</style>
