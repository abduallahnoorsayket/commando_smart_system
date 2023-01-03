<template v-if="comment_Information">
  <div class="row" id="comments">
    <div class="col-md">
      <EditNoticeCommentModal @edit-comment="CommentEdited" v-if="isEditModalVisible" />
      <div class="main-card card">
        <div class="detailContaier">
          <h6 class="baseColorFont mb-4">
            {{ $store.getters.GET_COMMENT}}
          </h6>
          <!-- v-if="hasModulePermission('hrm_notice') && hasPermission('add_comment')" -->
          <form
            @submit.prevent="PostComment"
          >
            <fieldset>
              <div class="media">
                <a class="pull-left" href="#">
                  <img
                    class="rounded-circle"
                    v-if="Current_user_image"
                    :src="Current_user_image"
                    alt
                  />
                  <img
                    v-else
                    class="media-object"
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt
                  />
                </a>
                <div class="media-body">
                  <textarea
                    class="form-control"
                    id="message"
                    placeholder="Your message"
                    v-model="comment_body"
                    :class="{
                      'is-invalid':
                        comment_error_data && comment_error_data.comment_body,
                    }"
                  ></textarea>
                  <div
                    :class="{
                      'invalid-feedback':
                        comment_error_data && comment_error_data.comment_body,
                    }"
                    v-if="comment_error_data && comment_error_data.comment_body"
                  >
                    {{ comment_error_data.comment_body[0] }}
                  </div>
                  <button
                    @submit.prevent="PostComment"
                    class="btn btn-base pull-right mt-2"
                  >  {{ $store.getters.GET_POST +' '+$store.getters.GET_COMMENT}}
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
          <!-- <template  v-if="hasModulePermission('hrm_notice') && hasPermission('view_comment')">
          </template> -->
           <h6>
              <strong
                v-if="comment_Information && comment_Information.length > 0"
                >{{ comment_Information.length }}  {{ $store.getters.GET_COMMENTS}}</strong
              >
              <strong v-else>0 {{ $store.getters.GET_COMMENTS}}</strong>
            </h6>
            <div
              class="media"
              v-for="(comment, index) in comment_Information"
              :key="index"
            >
              <a class="pull-left">
                <img
                  class="media-object"
                  alt
                  v-if="comment.created_by.user_profile.image"
                  :src="comment.created_by.user_profile.image"
                />
                <img
                  v-else
                  class="media-object"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt
                />
              </a>
              <div class="media-body">
                <div class="commentList">
                  <div class="media-heading">
                    <h6
                      v-if="
                        comment.created_by.first_name &&
                        comment.created_by.last_name
                      "
                    >
                      {{
                        comment.created_by.first_name +
                        " " +
                        comment.created_by.last_name
                      }}
                    </h6>
                    <span class="pull-right commentDateMargin">
                      <i class="fa fa-calendar"></i>
                      {{ comment.created_datetime }}
                    </span>
                  </div>

                  <p>{{ comment.comment_body }}</p>
                  <div class="commentAction"  v-if="comment.created_by.id == currentUserID">
                    <!-- v-if="hasModulePermission('hrm_notice') && hasPermission('delete_comment')" -->
                    <span
                      class="pull-right"
                    >
                      <i
                        class="fas fa-trash-alt"
                        @click="deleteComment(comment.id)"
                      ></i>
                    </span>
                    <!-- v-if="hasModulePermission('hrm_notice') && hasPermission('change_comment')" -->
                    <span   
                      class="pull-right"
                    >
                      <i
                        class="fas fa-edit"
                        @click="OpenEditModal(comment.id)"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import EditNoticeCommentModal from "./EditNoticeCommentModal.vue";
// import permissions from "../../../authorization/permissions";

export default {
  name: "NoticeComment",
  props: ["noticeID", "comment_info"],
  components: { EditNoticeCommentModal },
  data() {
    return {
      comment_Information:null,
      noticeId: null,
      comment_body:null,
      // content_Type: null,
      // comment_body: null,
      // is_commentvisible: false,
      // is_actionBttonVisible: false,
      Current_user_image: null,
      // comment_list_render: true,
      currentUserID: null,
      comment_error_data: null,
    };
  },
    created() {
      this.currentUserID = localStorage.getItem("id");
      this.noticeId = this.$props.noticeID;
      this.comment_Information = this.$props.comment_info;
      this.fetchAuthenticatedUser();
    },
    computed: {
      isEditModalVisible() {
        return this.$store.state.notice.NoticeCommentEditModalVisible;
      },
    },
  methods: {
    OpenEditModal(id) {
      this.$store.commit("notice/toggleNoticeCommentEditModal", {
        created_by: this.currentUserID,
        notice_id: this.noticeId,
        notice_comment_id: id,
      });
    },
    fetchAuthenticatedUser() {
      axios.get("/profiles/me/", {}).then((response) => {
        this.Current_user_image = response.data.image;
        console.log(response.data);
      });
    },
    CommentEdited() {
      this.$emit("load-comment");
    },
    PostComment() {
      axios
        .post("comment/", {
          comment_body: this.comment_body,
          notice: this.noticeId,
          created_by: this.currentUserID,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: this.$store.getters.GET_POSTED +' '+this.$store.getters.GET_SUCCESSFULLY  +"...",
          }).then((result) => {
            this.comment_body = null;
            this.$emit("load-comment");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.comment_error_data = error.response.data;
          console.log("--++", error.response);
        });
    },
    deleteComment: function (id) {
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
          axios.delete("comment/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.$emit("load-comment");
            }
          });
          Swal.fire(  this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +' '+this.$store.getters.GET_SUCCESSFULLY +" ...",
            "success");
        } else {
          Swal.fire(  this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +' '+this.$store.getters.GET_DELETED +" ...",
            "error");
        }
      });
    },
    /*for code_name*/
    // hasModulePermission(...module_name) {
    //   return permissions.hasModulePermission(...module_name);
    // },
    // hasModelPermission(model_name) {
    //   return permissions.hasModelPermission(model_name);
    // },
    // hasPermission(permission_name) {
    //   return permissions.hasPermission(permission_name);
    // },
  },
};
</script>

<style scoped>
.content-item {
  padding: 30px 0;
  background-color: #ffffff;
}

.content-item.grey {
  background-color: #f0f0f0;
  padding: 50px 0;
  height: 100%;
}

.content-item h2 {
  font-weight: 700;
  font-size: 35px;
  line-height: 45px;
  text-transform: uppercase;
  margin: 20px 0;
}

.content-item h3 {
  font-weight: 400;
  font-size: 20px;
  color: #555555;
  margin: 10px 0 15px;
  padding: 0;
}

.content-headline {
  height: 1px;
  text-align: center;
  margin: 20px 0 70px;
}

.content-headline h2 {
  background-color: #ffffff;
  display: inline-block;
  margin: -20px auto 0;
  padding: 0 20px;
}

.grey .content-headline h2 {
  background-color: #f0f0f0;
}

.content-headline h3 {
  font-size: 14px;
  color: #aaaaaa;
  display: block;
}

/* #comments {
  box-shadow: 0 -1px 6px 1px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
} */
/* 
#comments form {
  margin-bottom: 30px;
} */

#comments .btn {
  margin-top: 7px;
}

#comments form fieldset {
  clear: both;
}

#comments form textarea {
  height: 100px;
}

#comments .media {
  border-top: 1px dashed #dddddd;
  padding: 20px 0;
  margin: 0;
}

#comments .media > .pull-left {
  margin-right: 20px;
}

#comments .media img {
  width: 60px;
  /* max-width: 100px; */
  height: 60px;
  border-radius: 50%;
}

#comments .media h4 {
  margin: 0 0 10px;
}

#comments .media h4 span {
  font-size: 14px;
  float: right;
  color: #999999;
}

#comments .media p {
  margin-bottom: 15px;
  text-align: justify;
}

#comments .media-detail {
  margin: 0;
}

#comments .media-detail li {
  color: #aaaaaa;
  font-size: 12px;
  padding-right: 10px;
  font-weight: 600;
}

#comments .media-detail a:hover {
  text-decoration: underline;
}

#comments .media-detail li:last-child {
  padding-right: 0;
}

#comments .media-detail li i {
  color: #666666;
  font-size: 15px;
  margin-right: 10px;
}
/* hover Edit & delete button */
.commentAction {
  /* position: absolute; */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  /* width: 220px; */
  opacity: 0;
  transition: 0.3s ease;
  background-color: #e6f7f4;
  box-shadow: 0 11px 11px 0 rgba(0, 0, 0, 0.06);
  border-radius: 5px;
}
.commentList:hover .commentAction {
  opacity: 1;
}
</style>
