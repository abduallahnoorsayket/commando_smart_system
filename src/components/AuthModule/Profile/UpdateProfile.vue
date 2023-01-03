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
                  $store.getters.GET_UPDATE + " " + $store.getters.GET_PROFILE
                }}
                <div class="page-title-subheading"></div>
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
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="First">
                        {{ $store.getters.GET_FIRST_NAME }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="form_data.user.first_name"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid':
                            error_data && error_data.user.first_name,
                        }"
                      />

                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user.first_name,
                        }"
                        v-if="error_data && error_data.user.first_name"
                      >
                        {{ error_data.user.first_name[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="Last">
                        {{ $store.getters.GET_LAST_NAME }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        v-model="form_data.user.last_name"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': error_data && error_data.user.last_name,
                        }"
                      />

                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user.last_name,
                        }"
                        v-if="error_data && error_data.user.last_name"
                      >
                        {{ error_data.user.last_name[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="exampleEmail11" class>
                        {{ $store.getters.GET_EMAIL }}
                        <span class="asterisk">*</span>
                      </label>
                      <input
                        name="email"
                        id="email"
                        v-model="form_data.user.username"
                        type="email"
                        class="form-control"
                        :class="{
                          'is-invalid': error_data && error_data.user.username,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            error_data && error_data.user.username,
                        }"
                        v-if="error_data && error_data.user.username"
                      >
                        {{ error_data.user.username[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="examplePassword11" class>{{
                        $store.getters.GET_PHONE
                      }}</label>
                      <input
                        name="phone"
                        id="phone"
                        v-model="form_data.phone"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': social_error && social_error.phone,
                        }"
                      />
                      <div
                        :class="{
                          'invalid-feedback':
                            social_error && social_error.phone,
                        }"
                        v-if="social_error && social_error.phone"
                      >
                        {{ social_error.phone[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="vl mr-lg-5"></div>
                </div>

                <div class="form-row">
                  <div class="col-md-6">
                    <label for="exampleAddress" class>{{
                      $store.getters.GET_ADDRESS
                    }}</label>
                    <input
                      name="address"
                      id="location"
                      v-model="form_data.location"
                      type="text"
                      class="form-control"
                    />
                  </div>

                  <div class="col-md-6">
                    <label for="exampleAddress" class>{{
                      $store.getters.GET_EDUCATION
                    }}</label>
                    <span class="text-muted">
                      ({{ $store.getters.GET_LAST_COMPLETED_DEGREE }})</span
                    >
                    <input
                      name="address"
                      id="education"
                      v-model="form_data.education"
                      type="text"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-8">
                    <div class="position-relative form-group mt-3">
                      <label for="exampleAddress" class>{{
                        $store.getters.GET_SKILL
                      }}</label>
                      <span class="text-muted">
                        ({{
                          $store.getters
                            .GET_EX_PYTHON_JAVA_PLEASE_PRESS_ENTER_AFTER_TYPING_EACH_SKILL
                        }})</span
                      >
                      <input
                        v-model="tagValue"
                        v-on:keydown.enter.prevent="addTag"
                        type="text"
                        class="form-control"
                        :class="{
                          'is-invalid': social_error && social_error.skills,
                        }"
                      />
                      <div class="tag-container">
                        <div
                          class="tag"
                          v-for="(skill, index) in form_data.skills"
                          :key="'tag' + index"
                        >
                          <span>{{ skill }}</span>
                          <span @click="removeTag(index)">
                            <i class="fas fa-times-circle"></i>
                          </span>
                        </div>
                      </div>
                      <div
                        :class="{
                          'invalid-feedback':
                            social_error && social_error.skills,
                        }"
                        v-if="social_error && social_error.skills"
                      >
                        <!-- {{ social_error && social_error.skills[0][0] }} -->
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
                            v-model="form_data.gender"
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
                          v-model="form_data.gender"
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

                <div class="position-relative form-group mt-2 mb-4">
                  <label for="exampleAddress2" class>{{
                    $store.getters.GET_SHORT_BIO
                  }}</label>
                  <span class="text-muted"
                    >({{ $store.getters.GET_MAX_200_CHARACTERS }})</span
                  >
                  <textarea
                    name="address2"
                    id="short_bio"
                    v-model="form_data.short_bio"
                    type="text"
                    class="form-control mb-2"
                    rows="4"
                    cols="50"
                    maxlength="201"
                  ></textarea>
                  <div
                    v-if="
                      form_data.short_bio && form_data.short_bio.length > 200
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

                <!--Social Links-->
                <p>
                  <strong class="app-sidebar__heading">
                    {{ $store.getters.GET_SOCIAL_LINKS }}</strong
                  >
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
                          v-model="form_data.github"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid': social_error && social_error.github,
                          }"
                        />

                        <div
                          :class="{
                            'invalid-feedback':
                              social_error && social_error.github,
                          }"
                          v-if="social_error && social_error.github"
                        >
                          {{ social_error.github[0] }}
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
                          v-model="form_data.linkedin"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid': social_error && social_error.linkedin,
                          }"
                        />

                        <div
                          :class="{
                            'invalid-feedback':
                              social_error && social_error.linkedin,
                          }"
                          v-if="social_error && social_error.linkedin"
                        >
                          {{ social_error.linkedin[0] }}
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
                          v-model="form_data.facebook"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid': social_error && social_error.facebook,
                          }"
                        />
                        <div
                          :class="{
                            'invalid-feedback':
                              social_error && social_error.facebook,
                          }"
                          v-if="social_error && social_error.facebook"
                        >
                          {{ social_error.facebook[0] }}
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
                          v-model="form_data.personal_website"
                          type="text"
                          class="form-control"
                          :class="{
                            'is-invalid':
                              social_error && social_error.personal_website,
                          }"
                        />
                        <div
                          :class="{
                            'invalid-feedback':
                              social_error && social_error.personal_website,
                          }"
                          v-if="social_error && social_error.personal_website"
                        >
                          {{ social_error.personal_website[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row mt-2">
                  <div class="col-md-6">
                    <div class="position-relative form-group">
                      <label for="img">
                        {{
                          $store.getters.GET_SELECT +
                          " " +
                          $store.getters.GET_IMAGE
                        }}
                      </label>
                      <!-- <input type="file" accept="image/*" @change="handleImage" id="file" /> -->
                      <!-- <label class="btn btn-default">
                        Browse
                        <input type="file" hidden />
                      </label>-->

                      <div class="custom-file mb-3">
                        <input
                          type="file"
                          accept="image/*"
                          class="custom-file-input"
                          id="file"
                          name="filename"
                          @change="handleImage"
                        />
                        <label class="custom-file-label" for="customFile">
                          {{
                            $store.getters.GET_CHOOSE +
                            " " +
                            $store.getters.GET_IMAGE
                          }}</label
                        >
                        <!-- <div
                        :class="{
                          'invalid-feedback': social_error && social_error.image
                        }"
                        v-if="social_error && social_error.image"
                      >hello</div> -->
                      </div>
                      <!-- new cutom -->
                    </div>
                  </div>
                </div>

                <div id="hello">
                  <img
                    v-if="form_data.image"
                    :src="form_data.image"
                    id="imageID"
                    height="200"
                    width="200"
                  />

                  <img
                    v-else
                    src
                    id="imageID"
                    height="200"
                    width="200"
                    alt="No image found"
                  />

                  <input type="hidden" value id="newImage" />
                  <!-- <img
                    v-else
                    :src="form_data.newImage"
                    id="imageID"
                    height="200"
                    wi
                    dth="200"
                  />-->
                </div>
                <div class="form-row mt-1">
                  <div class="col-md-6">
                    <div
                      v-if="social_error && social_error.image"
                      class="alert alert-danger alert-dismissible fade show"
                      role="alert"
                    >
                      {{ social_error.image[0] }}
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
                <div class="form-group">
                  <button class="mt-2 btn btn-successs btn-lg float-right">
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
// import { render } from "vue";
import Swal from "sweetalert2";
import $ from "jquery";
// import func from "../../../../vue-temp/vue-editor-bridge";

export default {
  name: "UpdateProfile",
  components: { Master },
  data() {
    return {
      form_data: null,
      image: "",
      newImage: "",
      tagValue: "",
      error_data: {
        user: {
          username: null,
          first_name: null,
          last_name: null,
        },
      },
      social_error: {
        github: null,
        linkedin: null,
        facebook: null,
        personal_website: null,
        skills: null,
        phone: null,
        image: null,
      },
      // dummyImage:"https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg"
    };
  },
  methods: {
    editUser() {
      var data = {
        user: {
          username: this.form_data.user.username,
          // email: this.form_data.email,

          first_name: this.form_data.user.first_name,
          last_name: this.form_data.user.last_name,
        },
        phone: this.form_data.phone,
        gender: this.form_data.gender,
        short_bio: this.form_data.short_bio,
        education: this.form_data.education,
        location: this.form_data.location,
        skills: this.form_data.skills,
        github: this.form_data.github,
        linkedin: this.form_data.linkedin,
        facebook: this.form_data.facebook,
        personal_website: this.form_data.personal_website,
      };
      if (document.getElementById("newImage").value) {
        data["image"] = document.getElementById("newImage").value;
      }
      axios
        .put("profiles/me/", {
          // multiple data send
          ...data,
        })

        .then((response) => {
          Swal.fire({
            icon: "success",
            // title: "Yes...",
            text:
              this.$store.getters.GET_UPDATED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              "...",
          }).then((response) => {
            this.$router.push({ name: "UserProfile" });
            console.log(response);
          });
          console.log(response);
        })
        .catch((error) => {
          if (error.response.data.user) {
            this.error_data.user = error.response.data.user;
          } else {
            this.social_error = error.response.data;
          }
          console.log("370", this.error_data);
        });
    },
    // end of edit

    getUserData: function () {
      axios.get("profiles/me/").then(
        (response) => {
          this.form_data = response.data;
          // this.form_data.skills = this.form_data.skills.join();
          // this.form_data.image = response.data.form_data.image ? response.data.form_data.image : this.dummyImage;
          console.log(response.data);
        },
        (response) => {
          console.log(response);
        }
      );
    },

    handleImage() {
      var files = document.getElementById("file").files;
      if (files.length > 0) {
        // getBase64(files[0]);
        this.getBase64(files[0]);
      }
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
        document.getElementById("imageID").src = reader.result;
        document.getElementById("newImage").value = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },

    //Skills input tag function start
    addTag() {
      if (!this.tagValue == "") this.form_data.skills.push(this.tagValue);

      this.tagValue = "";
    },

    removeTag(index) {
      this.form_data.skills.splice(index, 1);
    },
    //Skills input tag function end
  },

  created() {
    this.getUserData();
  },
};
// custom file upload
$(document).ready(function () {
  $(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });
});
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
</style>
