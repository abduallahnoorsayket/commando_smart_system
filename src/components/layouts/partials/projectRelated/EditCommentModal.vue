<template>
  <teleport to="body">
    <div v-if="EditModalVisible" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="card-header">
            <p class="float-left capitalizeNames">Edit Comment</p>
          </div>
          <div class="card-body">
            <form @submit.prevent="UpdateComment" v-if="comments_data">
              <fieldset>
                <!-- Media -->
                <div class="media">
                  <a class="pull-left mr-3" href="#">
                    <img
                      class="rounded-circle"
                      v-if="comments_data.created_by.user_profile.image"
                      :src="comments_data.created_by.user_profile.image"
                      height="50"
                      width="50"
                      alt
                    />
                    <img
                      v-else
                      class="media-object rounded-circle"
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt
                      height="50"
                      width="50"
                    />
                  </a>
                  <div class="media-body">
                    <textarea
                      class="form-control"
                      id="message"
                      placeholder="Your message"
                      v-model="comments_data.comment_body"
                      :class="{ 'is-invalid': Comment_error && Comment_error.comment_body }"
                      rows="5"
                    ></textarea>
                    
                    <div
                      :class="{ 'invalid-feedback': Comment_error && Comment_error.comment_body }"
                      v-if="Comment_error && Comment_error.comment_body"
                    >{{ Comment_error.comment_body[0] }}</div>
                    <!-- <button
                      @submit.prevent="PostComment"
                      class="btn btn-base pull-right"
                    >Post Comment</button>-->
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
          <div class="modal-footer">
            <button @click="UpdateComment()" class="mt-2 btn btn-base float-right">Submit</button>
            <button class="mt-2 float-right ml-2 btn btn-successs" @click="CloseModal()">Close</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "EditCommentModal",

  data() {
    return {
      form_data: {},
      Content_Type: null,
      Object_Id: null,
      upload_files: null,
      new_upload_files: null,
      file_name: null,
      File_Id: null,
      Comment_Id: null,
      comments_data: null,
      Comment_error: {
        comment_body: null,
      },
    };
  },
  created() {
    this.Comment_Id = this.$store.state.projectRelated.CommentId;
    console.log("Comment_Id", this.Comment_Id);
    this.Content_Type = this.$store.state.projectRelated.CommentContentType;
    this.Object_Id = this.$store.state.projectRelated.CommentObjectId;
    console.log("105=====", this.Content_Type, this.Object_Id);
    this.getCommentDetail();
  },
  computed: {
    EditModalVisible() {
      return this.$store.state.projectRelated.CommentEditModalVisible;
    },
  },

  methods: {
    CloseModal() {
      console.log("113");
      this.$store.commit("projectRelated/toggleCommentEditModal", {
        content_Type: null,
        object_id: null,
        comment_id: null,
      });
    },

    // getCommentDetail
    getCommentDetail() {
      axios.get("comments/" + this.Comment_Id + "/").then(
        (response) => {
          this.comments_data = response.data;
          console.log("----134---", this.comments_data);
        },
        (response) => {
          console.log("----", response);
        }
      );
    },
    UpdateComment() {
      axios
        .put("comments/" + this.Comment_Id + "/", {
          comment_body: this.comments_data.comment_body,
          content_type: this.Content_Type,
          object_id: this.Object_Id,
          created_by: this.comments_data.created_by.id,
          created_datetime: this.comments_data.created_datetime,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: "You have successfully updated Comment ..",
          }).then((result) => {
            this.CloseModal();
            this.$emit("edit-comment");
            console.log(result);
          });
          console.log(response);
        })
        .catch((error) => {
          this.Comment_error = error.response.data;
          console.log("--++", error.response);
        });
    },
  },
};
</script>
<style scoped>
.modal-dialog {
  max-width: 740px;
}
/* scroll in modal */
.card-body {
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}
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
</style>