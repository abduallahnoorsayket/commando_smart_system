<template>
  <div class="row" id="comments">
    <div class="col-md">
      <EditCommentListComment
        @edit-comment="CommentEdited"
        v-if="isEditModalVisible"
      />
      <EditCommentReply
        @edit-comment="CommentLoad"
        v-if="isReplyModalVisible"
      />
      <div class="main-card">
        <div class="detailContaier">
          <form
            @submit.prevent="PostComment"
            v-if="hasPermission('add_comment')"
          >
            <fieldset>
              <div class="media">
                <a class="pull-left" href="#">
                  <img
                    class="media-object rounded-circle"
                    v-if="Current_user_image"
                    :src="Current_user_image"
                    alt
                  />
                  <img
                    v-else
                    class="media-object rounded-circle"
                    src="https://bootdey.com/img/Content/avatar/avatar1.png"
                    alt
                  />
                </a>
                <div class="media-body">
                  <textarea
                    class="form-control"
                    id="message"
                    placeholder="Your comment"
                    v-model="comment_body"
                    :class="{
                      'is-invalid':
                        comment_error_data && comment_error_data.comment_body,
                    }"
                    rows="3"
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
                    class="btn btn-base pull-right"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </fieldset>
          </form>

          <!-- <h6>
              <strong
                v-if="comment_Information &&comment_Information.length >0"
              >{{comment_Information.length}} Comments</strong>
              <strong v-else>0 Comments</strong>
            </h6> -->
          <!-- New comment list -->
          <div class="commentContainer" v-if="hasPermission('view_comment')">
            <div class="row">
              <div class="col-lg-12 right">
                <div class="box shadow-sm rounded bg-white mb-3">
                  <div class="box-title border-bottom p-3">
                    <!-- <h6 class="m-0">Comments (04)</h6> -->
                    <h6 class="m-0">
                      <strong v-if="all_comments && all_comments.length > 0">
                        Comments ({{ all_comments.length }})</strong
                      >
                      <strong v-else>Comments (0)</strong>
                    </h6>
                  </div>
                  <div class="box-body p-0">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="mt-0" id="axiosForm">
                          <div class="loader" v-if="loading"></div>
                          <div v-if="objectId && contentType && all_comments">
                            <CommentEach
                              v-for="comment in all_comments"
                              :key="comment.id"
                              @load-comment="CommentLoad"
                              :object_id="objectId"
                              :content_type="contentType"
                              :comment_object="comment"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <ul class="pagination">
                  <li class="page-item">
                    <a href="#"
                      >Showing {{ pagination.showing }} of
                      {{ pagination.count }}</a
                    >
                  </li>
                  <li
                    :class="{ disabled: !pagination.previous }"
                    class="page-item"
                  >
                    <a href="#!" v-on:click="setPage(pagination.previous)"
                      >Previous</a
                    >
                  </li>

                  <li :class="{ disabled: !pagination.next }" class="page-item">
                    <a href="#!" v-on:click="setPage(pagination.next)">Next</a>
                  </li>
                </ul>
              </div>
              <div class="col-md-6"></div>
              <div class="col-md-2"></div>
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
import EditCommentListComment from "../../CommentModule/CommentStore/EditCommentListComment.vue";
import CommentEach from "../../CommentModule/CommentStore/CommentEach.vue";
import EditCommentReply from "../../CommentModule/CommentStore/EditCommentReply.vue";
import permissions from "../../../authorization/permissions";

export default {
  name: "CommentPost",
  props: ["object_id", "content_type_id"],
  components: { EditCommentListComment, CommentEach, EditCommentReply },
  data() {
    return {
      loading: false,
      comment_Information: null,
      objectId: null,
      contentType: null,
      comment_body: null,
      is_commentvisible: false,
      is_actionBttonVisible: false,
      Current_user_image: null,
      comment_list_render: true,
      currentUserID: null,
      comment_error_data: null,
      all_comments: null,
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },
  created() {
    this.currentUserID = localStorage.getItem("id");
    this.objectId = this.$props.object_id;
    this.contentType = this.$props.content_type_id;
    this.initialLoad();
    // .forEach((element) => {
    //   if (element.created_by.id == currentUserID) {
    //     this.is_actionBttonVisible == true;
    //   }
    // });

    // this.comment_Information.forEach((element) => {
    //   if (element.created_by.id == currentUserID) {
    //     this.is_actionBttonVisible == true;
    //   }
    // });
    // this.comment_visible =
    //   this.$store.state.projectRelated.CommentSectionVisible;

    // this.objectId = this.$store.state.projectRelated.CommentObjectId;
    // this.content_Type = this.$store.state.projectRelated.CommentContentType;
  },
  updated() {
    // this.initialLoad();
  },
  computed: {
    isEditModalVisible() {
      return this.$store.state.comment.CommentEditModalVisible;
    },
    isReplyModalVisible() {
      return this.$store.state.comment.ReplyEditModalVisible;
    },
  },
  methods: {
    initialLoad: function () {
      this.loadComment();
      this.fetchAuthenticatedUser();
    },
    fetchAuthenticatedUser() {
      axios.get("/profiles/me/", {}).then((response) => {
        this.Current_user_image = response.data.image;
        console.log(response.data);
      });
    },
    CommentEdited() {
      this.CommentLoad();
    },
    PostComment() {
      const currentUserID = localStorage.getItem("id");

      axios
        .post("comment-module/", {
          comment_body: this.comment_body,
          object_id: this.objectId,
          content_type: this.contentType,
          created_by: currentUserID,
          parent_comment: null,
          // || this.TaskObejectID   || this.TaskcontenType
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "Successfully posted",
          }).then((result) => {
            this.comment_body = null;
            //  this.$emit("load-comment");
            this.CommentLoad();
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.comment_error_data = error.response.data;
          console.log("--++", error.response);
        });
      // console.log(response);
    },
    deleteComment: function (id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("comments/" + id + "/").then((response) => {
            if (response.status === 204) {
              this.$emit("load-comment");
            }
          });
          Swal.fire(
            this.$store.getters.GET_DELETED,
            this.$store.getters.GET_DELETED +
              " " +
              this.$store.getters.GET_SUCCESSFULLY +
              " ...",
            "success"
          );
        } else {
          Swal.fire(
            this.$store.getters.GET_CANCELLED,
            this.$store.getters.GET_NOT +
              " " +
              this.$store.getters.GET_DELETED +
              " ...",
            "error"
          );
        }
      });
    },
    async CommentLoad() {
      await this.loadComment();
    },
    setPage(page) {
      this.pagination.page = page;
      this.CommentLoad();
    },
    loadComment() {
      this.loading = true;
      this.all_comments = null;
      var queryParam = {
        content_type: this.contentType,
        object_id: this.objectId,
        page: this.pagination.page,
      };
      axios
        .get("comment-module/", {
          params: queryParam,
        })
        .then((response) => {
          this.all_comments = response.data.results;
          this.pagination.count = response.data.count;
          this.pagination.next = response.data.next;
          this.pagination.previous = response.data.previous;
          this.pagination.showing = response.data.results.length;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
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

/* #comments form textarea {
  height: 100px;
} */

#comments .media {
  /* border-top: 1px dashed #dddddd; */
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
/* comment list section CSS */
body {
  margin-top: 20px;
  /* background-color: #f0f2f5; */
}
.dropdown-list-image {
  position: relative;
  height: 2.5rem;
  width: 2.5rem;
}
.dropdown-list-image img {
  height: 2.5rem;
  width: 2.5rem;
}
.btn-light {
  color: #2cdd9b;
  background-color: #e5f7f0;
  border-color: #d8f7eb;
}
.small {
  font-size: 80%;
  font-weight: 600;
  color: #aaaaaa;
}
h6,
.h6 {
  font-size: 1rem;
  font-weight: 600;
}
.fa-eye-slash:before {
  color: #69c5a5;
}
/* custom CSS */
/* .commentBody {
  margin-left: 15px;
} */
.CommentCard {
  border: 1px solid #eaeaea;
  background-color: #fff;
  margin-bottom: 15px;
  /* border-left: 2px solid #69c5a5; */
  border-radius: 0px;
  margin-top: 15px;
  margin-right: 15px;
  margin-left: 15px;
  padding-bottom: 10px;
  padding: 0px 10px 10px 10px;
}
hr {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.shadow-sm {
  box-shadow: none !important;
}
.detailContaier {
  margin: 10px;
}
/* for loader  */
#axiosForm {
  /* Components Root Element ID */
  position: relative;
}
.loader {
  /* Loader Div Class */
  position: absolute;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #eceaea;
  /* background-color:red; */
  background-image: url("../../../assets/gifs/sp01.gif");
  background-size: 100px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10000000;
  opacity: 0.4;
  filter: alpha(opacity=40);
  /* font-size: 50px; */
}
</style>
