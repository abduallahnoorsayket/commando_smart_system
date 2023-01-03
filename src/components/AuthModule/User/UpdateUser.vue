<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-edit icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                {{ $store.getters.GET_UPDATE + " " + $store.getters.GET_USER }}
              </div>
            </div>
          </div>
        </div>
        <div class="main-card card">
          <div class="card-body">
            <form
              @submit.prevent="editUser"
              v-if="form_data"
              autocomplete="off"
            >
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
                        v-model="form_data.first_name"
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
                        v-model="form_data.last_name"
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
                        v-model="form_data.username"
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
                  <!-- <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label>Password
                        <span class="asterisk">*</span>
                      </label>
                      <input name="password" id="password" v-model="form_data.password" type="password" class="form-control" />
                    </div>
                  </div>-->

                  <!--Phone-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_PHONE }}
                      </label>
                      <input
                        v-model="form_data.user_profile.phone"
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
                        v-model="form_data.user_profile.designation"
                        class="form-control"
                        required
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

                      <!-- :class="{ 'is-invalid': error_data && error_data.user_profile.designation }"
                      <div
                        :class="{ 'invalid-feedback': error_data && error_data.user_profile.designation }"
                        v-if="error_data && error_data.user_profile.designation"
                      >{{ error_data.user_profile.designation[0] }}</div>-->
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
                                <input
                                  type="checkbox"
                                  v-model="form_data.is_superuser"
                                />
                                <span class="checkmark ml-2"></span>
                                <label class="ml-3">
                                  {{
                                    form_data.is_superuser == true
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
                                <input
                                  type="checkbox"
                                  v-model="form_data.is_active"
                                />
                                <span class="checkmark ml-2"></span>
                                <label class="ml-3">
                                  {{
                                    form_data.is_active == true
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
                        v-model="form_data.is_superuser"
                        type="boolean"
                        class="form-control"
                        :class="{ 'is-invalid': error_data && error_data.is_superuser }"
                      >
                        <option value="true">{{ $store.getters.GET_YES}}</option>
                        <option value="false">{{ $store.getters.GET_NO}}</option>
                      </select>
                      <div
                        :class="{ 'invalid-feedback': error_data && error_data.is_superuser }"
                        v-if="error_data && error_data.is_superuser"
                      >{{ error_data.is_superuser[0] }}</div>
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
                        v-model="form_data.user_profile.department"
                        class="form-control"
                        required
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
                          <span
                            v-if="
                              form_data.user_profile &&
                              form_data.user_profile.department
                            "
                          >
                            {{ dprtmnt.department_name }}</span
                          >
                        </option>
                      </select>

                      <!-- :class="{ 'is-invalid': error_data && error_data.user_profile.department }"
                      <div
                        :class="{ 'invalid-feedback': error_data && error_data.user_profile.department }"
                        v-if="error_data && error_data.user_profile.department"
                      >{{ error_data.user_profile.department[0] }}</div>-->
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
                        v-model="form_data.user_profile.branch"
                        class="form-control"
                        required
                      >
                        <option value="false" disabled selected>
                          {{
                            $store.getters.GET_SELECT +
                            " " +
                            $store.getters.GET_BRANCH
                          }}
                        </option>
                        <option
                          v-for="brnch in all_branches"
                          :key="brnch.id"
                          :value="brnch.id"
                        >
                          {{ brnch.branch_name }}
                        </option>
                      </select>

                      <!-- :class="{ 'is-invalid': error_data && error_data.user_profile.branch }"
                      <div
                        :class="{ 'invalid-feedback': error_data && error_data.user_profile.branch }"
                        v-if="error_data && error_data.user_profile.branch"
                      >{{ error_data.user_profile.branch[0] }}</div>-->
                    </div>
                  </div>

                  <!--Location-->
                  <div class="col-md-4">
                    <div class="position-relative form-group">
                      <label>
                        {{ $store.getters.GET_ADDRESS }}
                      </label>
                      <input
                        v-model="form_data.user_profile.location"
                        type="text"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <!--Group-->
                  <!-- <div class="col-md-6 group">
                    <label>Groups</label>
                    <div class="p-listbox p-component">
                      <div class="p-listbox-header">
                        <div class="p-listbox-filter-container">
                          <input
                            type="text"
                            class="p-listbox-filter p-inputtext p-component"
                            v-model="GroupSearch"
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
                          v-if="all_groups"
                        >
                          <div class="p-listbox-item" v-for="grp in filterGroups" :key="grp.id">
                            <label class="form-check-label" style="font-weight: 300;">
                              <input
                                type="checkbox"
                                name="groups[]"
                                :id="grp.id"
                                :value="grp.id"
                                v-model="form_data.groups"
                                class="form-check-input"
                              />
                              <span class="checkmark"></span>
                              {{ grp.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                  <!-- permissions -->
                  <!-- <div class="col-md-6 update-permission">
                    <label>Permissions</label>
                    <br />
                    <div class="p-listbox p-component">
                      <div class="p-listbox-header">
                        <div class="p-listbox-filter-container">
                          <input
                            type="text"
                            class="p-listbox-filter p-inputtext p-component"
                            v-model="searchQuery"
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
                          v-if="all_permission"
                        >
                          <div class="p-listbox-item" v-for="prmsn in resultQuery" :key="prmsn.id">
                            <label class="form-check-label" style="font-weight: 300;">
                              <input
                                type="checkbox"
                                name="user_permissions"
                                :id="prmsn.id"
                                :value="prmsn.id"
                                v-model="form_data.user_permissions"
                                class="form-check-input"
                              />
                              <span class="checkmark"></span>
                              {{ prmsn.name.slice(3) }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> -->
                </div>

                <div class="form-row mt-3">
                  <div class="col-md-6">
                    <label for="exampleAddress" class>
                      {{ $store.getters.GET_EDUCATION }}
                    </label>
                    <span class="text-muted"
                      >({{ $store.getters.GET_LAST_COMPLETED_DEGREE }})</span
                    >
                    <input
                      v-model="form_data.user_profile.education"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-6 joining-Margin">
                    <label>
                      {{ $store.getters.GET_JOINING_DATE }}
                      <span class="asterisk">*</span>
                    </label>
                    <input
                      v-model="form_data.user_profile.joining_date"
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
                      v-if="error_data && error_data.user_profile.joining_date"
                    >
                      {{ error_data.user_profile.joining_date[0] }}
                    </div>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-8">
                    <div class="position-relative form-group mt-3">
                      <div>
                        <label>
                          {{ $store.getters.GET_SKILL }}
                        </label>
                        <span class="text-muted"
                          >({{
                            $store.getters
                              .GET_EX_PYTHON_JAVA_PLEASE_PRESS_ENTER_AFTER_TYPING_EACH_SKILL
                          }})</span
                        >
                      </div>

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
                      <!--                                                    :class="{ 'is-invalid': form_data && form_data.user_profile.skills }"/>-->

                      <div
                        class="tag"
                        v-for="(skill, index) in form_data.user_profile.skills"
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
                        <!-- {{ error_data && error_data.user_profile.skills[1][0] }} -->
                        {{
                          $store.getters
                            .GET_ENSURE_EACH_SKILL_HAS_NO_MORE_THAN_20_CHARACTERS
                        }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="position-relative form-group mt-3">
                      <label class="ml-2">
                        Gender
                        <!-- <span class="asterisk">*</span> -->
                      </label>
                      <p class="mt-2 ml-2">
                        <span class="mr-3">
                          <input
                            type="radio"
                            id="test1"
                            name="radio-group"
                            v-model="form_data.user_profile.gender"
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
                          v-model="form_data.user_profile.gender"
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

                <!-- {{user_permissions}}-->

                <div class="position-relative form-group mt-3 mb-4">
                  <label>
                    {{ $store.getters.GET_SHORT_BIO }}
                  </label>
                  <span class="text-muted"
                    >({{ $store.getters.GET_MAX_200_CHARACTERS }})</span
                  >
                  <textarea
                    name="address2"
                    v-model="form_data.user_profile.short_bio"
                    type="text"
                    class="form-control mb-2"
                    rows="4"
                    cols="50"
                    maxlength="201"
                  ></textarea>

                  <div
                    v-if="
                      form_data.user_profile.short_bio &&
                      form_data.user_profile.short_bio.length > 200
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
                    {{ $store.getters.GET_GROUPS_AND_PERMISSIONS }}</strong
                  >
                </p>
                <hr />
                <div class="form-group row mt-3">
                  <label class="col-md-12 col-lg-2 col-form-label">
                    {{ $store.getters.GET_GROUPS }}</label
                  >
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
                                v-model="form_data.groups"
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
                  <label class="col-md-12 col-lg-2 col-form-label">{{
                    $store.getters.GET_PERMISSIONS
                  }}</label>
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
                                        v-model="form_data.user_permissions"
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
                  <strong class="app-sidebar__heading">{{
                    $store.getters.GET_SOCIAL_LINKS
                  }}</strong>
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
                          placeholder="Enter GitHub URL"
                          v-model="form_data.user_profile.github"
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
                          v-model="form_data.user_profile.linkedin"
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
                          v-model="form_data.user_profile.facebook"
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
                          v-model="form_data.user_profile.personal_website"
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
                    @submit.prevent="editUser"
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

export default {
  name: "UpdateUser",
  components: { Master },
  data() {
    return {
      form_data: null,
      all_groups: null,
      all_permission: null,
      all_departments: null,
      all_branches: null,
      all_designations: null,
      permissions: null,

      error_data: {
        user_profile: {
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
        // is_superuser: null,
      },

      searchQuery: null,
      GroupSearch: null,

      tagValue: "",
    };
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
          this.form_data.user_permissions.push(element.id);
        });
      } else {
        this.permissions[module_index]["models"][model_index][
          "permissions"
        ].forEach((element) => {
          // this.selectedPermissions.push(element.id);
          let index = this.form_data.user_permissions.indexOf(element.id);
          if (index !== -1) {
            // console.log(this.selectedPermissions.splice(index));
            this.form_data.user_permissions.splice(index, 1);
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

    editUser() {
      axios
        .put("users/" + this.$route.params.id + "/", {
          // ...this.form_data
          username: this.form_data.username,
          // email: this.form_data.email,
          // password: this.form_data.password,
          first_name: this.form_data.first_name,
          last_name: this.form_data.last_name,
          is_superuser: this.form_data.is_superuser,
          is_active: this.form_data.is_active,
          groups: this.form_data.groups,
          user_permissions: this.form_data.user_permissions,
          user_profile: {
            designation: this.form_data.user_profile.designation,
            gender: this.form_data.user_profile.gender,
            joining_date: this.form_data.user_profile.joining_date
              ? this.form_data.user_profile.joining_date
              : "",
            branch: this.form_data.user_profile.branch,
            department: this.form_data.user_profile.department,
            short_bio: this.form_data.user_profile.short_bio,
            education: this.form_data.user_profile.education,
            location: this.form_data.user_profile.location,
            phone: this.form_data.user_profile.phone,
            // skills: this.form_data.user_profile.skills ? this.form_data.user_profile.skills.split(',') : []
            skills: this.form_data.user_profile.skills,

            github: this.form_data.user_profile.github,
            linkedin: this.form_data.user_profile.linkedin,
            facebook: this.form_data.user_profile.facebook,
            personal_website: this.form_data.user_profile.personal_website,
          },
        })
        .then((response) => {
          this.all_groups = response.data;
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:
              this.$store.getters.GET_UPDATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              " ...",
          }).then((response) => {
            this.$router.push({ name: "UserList" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          if (error.response.data && error.response.data.user_profile) {
            this.error_data.user_profile = error.response.data.user_profile;
            this.base_error = error.response.data;
          } else if (error.response.data.user_profile) {
            this.error_data.user_profile = error.response.data.user_profile;
          } else {
            // this.error_data.user_profile = null;
            this.base_error = error.response.data;
          }
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
          this.all_branches = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getUserData: function () {
      axios.get(`users/${this.$route.params.id}/`).then(
        (response) => {
          this.form_data = response.data;
          // this.form_data.user_profile.skills = this.form_data.user_profile.skills
          this.form_data.user_permissions = this.form_data.user_permissions.map(
            (x) => x.id
          );
          this.form_data.groups = this.form_data.groups.map((y) => y.id);
          if (
            this.form_data &&
            this.form_data.user_profile &&
            this.form_data.user_profile.department
          ) {
            this.form_data.user_profile.department =
              this.form_data.user_profile.department.id;
          }
          if (
            this.form_data &&
            this.form_data.user_profile &&
            this.form_data.user_profile.branch
          ) {
            this.form_data.user_profile.branch =
              this.form_data.user_profile.branch.id;
          }
          if (
            this.form_data &&
            this.form_data.user_profile &&
            this.form_data.user_profile.designation
          ) {
            this.form_data.user_profile.designation =
              this.form_data.user_profile.designation.id;
          }
        },
        (response) => {
          console.log(response);
        }
      );
    },

    //Skills input tag function start
    addTag() {
      if (!this.tagValue == "")
        this.form_data.user_profile.skills.push(this.tagValue);

      this.tagValue = "";
    },

    removeTag(index) {
      this.form_data.user_profile.skills.splice(index, 1);
    },
    //Skills input tag function end
  },
  created() {
    this.loadGroup();
    this.loadPermission();
    this.loadDepartment();
    this.getUserData();
    this.loadBranch();
    this.loadDesignation();
  },
};
</script>

<style scoped>
.text-muted {
  color: #6c757d !important;
  margin-left: 5px;
  font-size: 85%;
}

/* no group message */
.noGropMessage {
  margin: 5px 25px;
  color: #69c5a5;
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
/* ===========================Responsive Styles===================== */
@media only screen and (min-width: 0px) and (max-width: 751px) {
  .joining-Margin {
    margin-top: 15px !important;
  }
}
</style>
