<template v-if="COMMENT_OBJECT">
  <div class="CommentCard">
    <div class="float-right p-3 d-flex align-items-center">
      <div class="btn-group dropleft">
        <a
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          class="p-0 btn"
        >
          <i
            id="addIcon"
            class="nav-link-icon fas fa-ellipsis-h mr-2 float-right"
          ></i>
        </a>
        <div
          tabindex="-1"
          role="menu"
          aria-hidden="true"
          class="dropdown-menu dropdown-menu-right"
        >
          <span v-if="COMMENT_OBJECT.created_by.id == currentUserID">
            <span v-if="hasPermission('change_comment')">
              <a class="dropdown-item" @click="OpenEditModal(COMMENT_OBJECT.id)"
                >Edit</a
              >
            </span>
            <span v-if="hasPermission('delete_comment')">
              <a
                class="dropdown-item"
                href="#"
                @click="deleteCommentItem(COMMENT_OBJECT.id)"
                >Delete</a
              >
            </span>
          </span>
          <span v-if="hasPermission('add_comment')">
            <a class="dropdown-item" @click="OpenReply(COMMENT_OBJECT.id)"
              >Reply</a
            ></span
          >
        </div>
      </div>
    </div>
    <div class="p-3 d-flex align-items-center osahan-post-header">
      <div class="dropdown-list-image mr-3">
        <img
          class="rounded-circle"
          v-if="
            COMMENT_OBJECT.created_by &&
            COMMENT_OBJECT.created_by.user_profile &&
            COMMENT_OBJECT.created_by.user_profile.image
          "
          :src="COMMENT_OBJECT.created_by.user_profile.image"
          alt
        />
        <img
          v-else
          class="rounded-circle"
          src="https://bootdey.com/img/Content/avatar/avatar1.png"
          alt=""
        />
      </div>
      <div class="font-weight-bold mr-3">
        <div
          class="text-truncate"
          v-if="
            COMMENT_OBJECT.created_by &&
            COMMENT_OBJECT.created_by.first_name &&
            COMMENT_OBJECT.created_by.last_name
          "
        >
          {{
            COMMENT_OBJECT.created_by.first_name +
            " " +
            COMMENT_OBJECT.created_by.last_name
          }}
        </div>
        <div class="small" v-if="COMMENT_OBJECT.created_datetime">
          {{ COMMENT_OBJECT.created_datetime }}
        </div>
      </div>
    </div>
    <span
      class="commentBody pl-3 d-flex align-items-center osahan-post-header"
      v-if="COMMENT_OBJECT.comment_body"
      >{{ COMMENT_OBJECT.comment_body }}
    </span>
    <!-- comment reactions -->
    <CommentReaction
      :coment_ractions="COMMENT_OBJECT.reactions"
      :comment_ID="COMMENT_OBJECT.id"
    />
    <!-- reply load -->
    <div
      class="row"
      v-if="COMMENT_OBJECT.replies && COMMENT_OBJECT.replies.length > 0"
    >
      <div class="col-md-12">
        <div class="replyContainer pl-5 ml-3">
          <!-- <div class="float-left">
                                <span
                                  ><i class="fas fa-arrow-right"></i> 2
                                  reply</span
                                >
                              </div> -->
          <div id="accordion">
            <div class="Replycard">
              <div class="card-reply" id="headingOne">
                <h5 class="mb-0">
                  <button
                    class="btn"
                    data-toggle="collapse"
                    :data-target="'#_' + COMMENT_OBJECT.id"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <div class="float-left">
                      <span
                        ><i class="fas fa-arrow-right"></i>
                        {{ COMMENT_OBJECT.replies_count }} reply</span
                      >
                    </div>
                  </button>
                </h5>
              </div>

              <div
                :id="'_' + COMMENT_OBJECT.id"
                class="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div v-if="COMMENT_OBJECT.replies">
                  <CommentReply
                    v-for="(reply, index) in COMMENT_OBJECT.replies"
                    :key="index"
                    @load-comment="CommentLoad"
                    :reply_object="reply"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- comment reply Post -->
    <div
      class="row"
      v-if="
        isReplyOpen &&
        comment_id_for_reply == COMMENT_OBJECT.id &&
        hasPermission('add_comment')
      "
    >
      <div class="col-md-12">
        <form @submit.prevent="PostReply">
          <div class="replyContainer pl-5 ml-3">
            <div
              class="pr-3 pl-3 pt-1 pb-1 d-flex align-items-center osahan-post-header"
            >
              <div class="dropdown-list-image mr-3">
                <img
                  class="rounded-circle"
                  v-if="Current_user_image"
                  :src="Current_user_image"
                  alt
                />
                <img
                  v-else
                  class="rounded-circle"
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  alt
                />
              </div>
              <div class="replyBody">
                <textarea
                  class="form-control"
                  id="message"
                  placeholder="Your Comment"
                  v-model="reply_body"
                  rows="1"
                  :class="{
                    'is-invalid':
                      comment_error_data && comment_error_data.comment_body,
                  }"
                ></textarea>
                <button
                  @submit.prevent="PostReply"
                  class="btn btn-successs pull-right ml-3"
                >
                  Reply
                </button>
              </div>
            </div>
            <div
              :class="{
                'invalid-feedback':
                  comment_error_data && comment_error_data.comment_body,
              }"
              v-if="comment_error_data && comment_error_data.comment_body"
            >
              {{ comment_error_data.comment_body[0] }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import CommentReply from "../CommentStore/CommentReply.vue";
import permissions from "../../..//authorization/permissions";
import CommentReaction from "./CommentReaction.vue";

export default {
  name: "CommentEach",
  components: {
    CommentReply,
    CommentReaction,
  },
  props: ["object_id", "content_type", "comment_object"],
  data() {
    return {
      COMMENT_OBJECT: null,
      // old
      comment_id_for_reply: null,
      reply_body: null,
      Current_user_image: null,
      comment_ID: null,
      is_reacted: false,
      isReplyOpen: false,
      allComments: [],
      currentUserID: null,
      object_Id: null,
      content_Type: null,
      comment_error_data: null,
      // all_reactions: {
      //   like: {
      //     icon: "fas fa-thumbs-up",
      //     count: 0,
      //     reaction_users: [],
      //     comment_ID: null,
      //     is_liked: false,
      //   },
      //   love: {
      //     icon: "fas fa-heart",
      //     count: 0,
      //     reaction_users: [],
      //     comment_ID: null,
      //     is_loved: false,
      //   },
      // },
    };
  },
  created() {
    this.currentUserID = localStorage.getItem("id");
    if (this.$props.comment_object) {
      this.COMMENT_OBJECT = this.$props.comment_object;
    }
    this.object_Id = this.$props.object_id;
    this.content_Type = this.$props.content_type;
    this.initialLoad();
  },
  updated() {
    // this.all_reactions.like.count = 0;
  },
  computed: {},
  methods: {
    initialLoad() {
      // this.GroupReaction();
      this.fetchAuthenticatedUser();
    },
    // LoadAfterraction(){
    // this.COMMENT_OBJECT ==null
    // },
    CommentLoad() {
      this.$emit("load-comment");
    },
    OpenEditModal(id) {
      this.$store.commit("comment/TOGGLE_COMMENT_EDIT_MODAL", {
        content_Type: this.content_Type,
        object_id: this.object_Id,
        comment_id: id,
      });
    },
    OpenReply(comment_id) {
      this.isReplyOpen = !this.isReplyOpen;
      this.comment_id_for_reply = comment_id;
    },
    deleteCommentItem: function (id) {
      Swal.fire({
        title: this.$store.getters.GET_ARE_YOU_SURE,
        text: this.$store.getters.GET_ALERT_MESSAGE_BEFORE_DELETE,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: this.$store.getters.GET_YES_DELETE_IT,
      }).then((response) => {
        if (response.isConfirmed) {
          axios.delete("comment-module/" + id + "/").then((response) => {
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
    PostReply() {
      const currentUserID = localStorage.getItem("id");
      axios
        .post("comment-module/", {
          comment_body: this.reply_body,
          object_id: this.object_Id,
          content_type: this.content_Type,
          created_by: currentUserID,
          parent_comment: this.COMMENT_OBJECT.id,
        })
        .then((response) => {
          // Swal.fire({
          //   icon: "success",
          //   text: "Successfully replied",
          // })
          console.log(response);
        })
        .then((result) => {
          this.reply_body = null;
          this.$emit("load-comment");
          console.log(result);
        })

        .catch((error) => {
          this.comment_error_data = error.response.data;
          console.log("--++", error.response);
        });
    },
    fetchAuthenticatedUser() {
      axios.get("/profiles/me/", {}).then((response) => {
        this.Current_user_image = response.data.image;
      });
    },
    // ResetReaction() {
    //   for (const property in this.all_reactions) {
    //     if (
    //       Object.prototype.hasOwnProperty.call(this.all_reactions, property)
    //     ) {
    //       this.all_reactions[property].count = 0;
    //       this.all_reactions[property].reaction_users = {};
    //       this.all_reactions[property].comment_ID = null;
    //       this.all_reactions[property].is_liked = false;
    //     }
    //   }
    // },
    // async GroupReaction() {
    //   this.allComments.forEach((element, index) => {
    //     if (element.reactions) {
    //       this.allComments[index]["grp_reaction"] = {};
    //       element.reactions.forEach((item) => {
    //         this.all_reactions[item.emo_type].count++;
    //         this.all_reactions[item.emo_type].reaction_users.push(
    //           item.reaction_user
    //         );
    //         this.all_reactions[item.emo_type].comment_ID = element.id;
    //         this.all_reactions.like.reaction_users.find((element) => {
    //           if (element.id == this.currentUserID) {
    //             this.all_reactions.like.is_liked = true;
    //             console.log("407");
    //           }
    //         });
    //         this.allComments[index]["grp_reaction"] = this.all_reactions;
    //         this.ResetReaction();
    //       });
    //     }
    //   });
    // },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
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
.fa-ellipsis-h:before {
  content: "\f141";
  font-size: 20px;
  color: #bababa;
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
.small {
  font-size: 80%;
  font-weight: 600;
  color: #aaaaaa;
}
.fa-thumbs-up:before {
  content: "\f164";
  color: #50aaf4;
  cursor: pointer;
  padding: 10px 10px 10px 0px;
}
.fa-heart:before {
  content: "\f004";
  color: #e34728;
  cursor: pointer;
  padding: 10px 10px 10px 0px;
}
.replyBody {
  display: contents !important;
}
.invalid-feedback {
  display: block;
  margin-left: 70px;
}
</style>
