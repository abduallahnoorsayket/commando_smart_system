<template v-if="comment_Information">
  <div class="row" id="comments">
    <div class="col-md">
      <EditCommentModal @edit-comment="CommentEdited" v-if="isEditModalVisible" />
      <div class="main-card card">
        <div class="detailContaier">
          <h6 class="pull-left baseColorFont mb-4">Comment</h6>
          <form @submit.prevent="PostComment" v-if="hasPermission('add_comment')">
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
                    required
                    :class="{ 'is-invalid': comment_error_data && comment_error_data.comment_body }"
                  ></textarea>
                  <div
                    :class="{ 'invalid-feedback': comment_error_data && comment_error_data.comment_body }"
                    v-if="comment_error_data && comment_error_data.comment_body"
                  >{{ comment_error_data.comment_body[0] }}</div>
                  <button @submit.prevent="PostComment" class="btn btn-base pull-right">Post Comment</button>
                </div>
              </div>
            </fieldset>
          </form>

          <template v-if="hasPermission('view_comment')">
            <h6>
              <strong
                v-if="comment_Information &&comment_Information.length >0"
              >{{comment_Information.length}} Comments</strong>
              <strong v-else>0 Comments</strong>
            </h6>

            <!-- COMMENT 1 - START -->
            <div class="media" v-for="(comment,index) in comment_Information" :key="index">
              <a class="pull-left" href="#">
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
                      v-if="comment.created_by.first_name && comment.created_by.last_name"
                    >{{ comment.created_by.first_name +' '+ comment.created_by.last_name}}</h6>
                    <span class="pull-right commentDateMargin">
                      <i class="fa fa-calendar"></i>
                      {{ comment.created_datetime }}
                    </span>
                  </div>

                  <p>{{comment.comment_body}}</p>
                  <div class="commentAction" v-if="comment.created_by.id ==currentUserID">
                    <span class="pull-right" v-if="hasPermission('delete_comment')">
                      <i class="fas fa-trash-alt" @click="deleteComment(comment.id)"></i>
                    </span>
                    <span class="pull-right" v-if="hasPermission('change_comment')">
                      <i class="fas fa-edit" @click="OpenEditModal(comment.id)"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- COMMENT 1 - END -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import EditCommentModal from "./EditCommentModal.vue";
import permissions from "../../../../authorization/permissions";

export default {
  name: "Comments",
  props: ["comment_info", "ObejectID", "contenType"],
  components: { EditCommentModal },
  data() {
    return {
      comment_Information: null,
      objectId: null,
      content_Type: null,
      comment_body: null,
      is_commentvisible: false,
      is_actionBttonVisible: false,
      Current_user_image: null,
      comment_list_render: true,
      currentUserID: null,
      comment_error_data: null,
    };
  },
  created() {
    this.currentUserID = localStorage.getItem("id");
    this.comment_Information = this.$props.comment_info;
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
    this.objectId = this.$props.ObejectID;
    this.content_Type = this.$props.contenType;
    // this.comment_visible =
    //   this.$store.state.projectRelated.CommentSectionVisible;

    this.fetchAuthenticatedUser();
    // this.objectId = this.$store.state.projectRelated.CommentObjectId;
    // this.content_Type = this.$store.state.projectRelated.CommentContentType;

    console.log(
      "168 id & type comment lenght",
      this.objectId,
      this.content_Type
      // this.comment_Information.length
    );
    // console.log("169 id & type", this.TaskobjectId, this.Taskcontent_Type);
  },
  computed: {
    isEditModalVisible() {
      return this.$store.state.projectRelated.CommentEditModalVisible;
    },
  },
  methods: {
    OpenEditModal(id) {
      this.$store.commit("projectRelated/toggleCommentEditModal", {
        content_Type: this.content_Type,
        object_id: this.objectId,
        comment_id: id,
      });
    },
    fetchAuthenticatedUser() {
      axios
        .get("/profiles/me/", {
        })
        .then((response) => {
          this.Current_user_image = response.data.image;
          console.log(response.data);
        });
    },
    CommentEdited() {
      this.$emit("load-comment");
    },
    PostComment() {
      const currentUserID = localStorage.getItem("id");

      axios
        .post("comments/", {
          comment_body: this.comment_body,
          object_id: this.objectId,
          content_type: this.content_Type,
          created_by: currentUserID,
          // || this.TaskObejectID   || this.TaskcontenType
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully post a comment.",
          }).then((result) => {
            this.comment_body = null;
            this.$emit("load-comment");
            // this.$router.go();
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
          Swal.fire("Deleted!", " comment has been deleted!!", "success");
        } else {
          Swal.fire("Cancelled", "comment has not been deleted !", "error");
        }
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