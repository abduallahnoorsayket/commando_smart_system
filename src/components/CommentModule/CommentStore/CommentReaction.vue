<template>
  <div class="row">
    <div class="col-md-12">
      <div
        class="float-right mr-3"
        v-if="
          hasPermission('add_reactions') &&
          hasPermission('change_reactions') &&
          hasPermission('delete_reactions') &&
          hasPermission('view_reactions')
        "
      >
        <!-- like -->
        <span
          class="mr-0 reactionHolder mr-2"
          v-if="
            all_reactions.like.is_liked &&
            all_reactions.like.comment_ID == CommentID
          "
        >
          <span class="reactionContainer">
            <i
              class="disableReaction"
              :class="all_reactions.like.icon"
              @click.prevent="PostReaction('like', CommentID)"
              type="button"
            ></i>
            <span v-if="all_reactions.like && all_reactions.like.count > 0">
              <div class="btn-group dropleft">
                <span
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="rounded-circle MemberCount"
                  v-if="all_reactions.like.comment_ID == CommentID"
                  title="View reaction users"
                  >{{ all_reactions.like.count }}</span
                >

                <template
                  tabindex="-1"
                  role="menu"
                  aria-hidden="true"
                  class="dropdown-menu dropdown-menu-right"
                >
                  <template
                    v-if="
                      all_reactions.like && all_reactions.like.reaction_users
                    "
                  >
                    <span
                      class="dropdown-item"
                      v-for="(user, index) in all_reactions.like.reaction_users"
                      :key="index"
                    >
                      <img
                        v-if="user.user_profile && user.user_profile.image"
                        :src="user.user_profile.image"
                        class="rounded-circle thumb-sm marginRight"
                        alt="friend"
                      />

                      <img
                        v-else
                        src="https://image.flaticon.com/icons/png/512/3135/3135715.png"
                        class="rounded-circle thumb-sm marginRight"
                        alt=""
                      />
                      {{ user.first_name + " " + user.last_name }}
                    </span>
                  </template>
                </template>
              </div>
            </span>
            <span class="MemberCount" v-else title="No reactions">0</span>
          </span>
        </span>
        <span v-else class="mr-0 reactionHolder mr-2">
          <span class="reactionContainer">
            <i
              :class="all_reactions.like.icon"
              type="button"
              @click.prevent="PostReaction('like', CommentID)"
            ></i>
            <span v-if="all_reactions.like && all_reactions.like.count > 0">
              <div class="btn-group dropleft">
                <span
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="rounded-circle MemberCount"
                  v-if="all_reactions.like.comment_ID == CommentID"
                  title="View reaction users"
                  >{{ all_reactions.like.count }}</span
                >

                <template
                  tabindex="-1"
                  role="menu"
                  aria-hidden="true"
                  class="dropdown-menu dropdown-menu-right"
                >
                  <template
                    v-if="
                      all_reactions.like && all_reactions.like.reaction_users
                    "
                  >
                    <span
                      class="dropdown-item"
                      v-for="(user, index) in all_reactions.like.reaction_users"
                      :key="index"
                    >
                      <img
                        v-if="user.user_profile && user.user_profile.image"
                        :src="user.user_profile.image"
                        class="rounded-circle thumb-sm marginRight"
                        alt="friend"
                      />

                      <img
                        v-else
                        src="https://image.flaticon.com/icons/png/512/3135/3135715.png"
                        class="rounded-circle thumb-sm marginRight"
                        alt=""
                      />
                      {{ user.first_name + " " + user.last_name }}
                    </span>
                  </template>
                </template>
              </div>
            </span>
            <span class="MemberCount" v-else title="No reactions">0</span>
          </span>
        </span>
        <!-- <span class="mr-2" v-if="all_reactions.like.comment_ID == CommentID"
          >({{ all_reactions.like.count }})</span
        > -->

        <!-- love -->
        <span
          class="mr-0 reactionHolder"
          v-if="
            all_reactions.love.is_loved &&
            all_reactions.love.comment_ID == CommentID
          "
        >
          <span class="reactionContainer">
            <i
              class="disableReaction"
              :class="all_reactions.love.icon"
              @click.prevent="PostReaction('love', CommentID)"
              type="button"
            ></i>
            <span v-if="all_reactions.love && all_reactions.love.count > 0">
              <div class="btn-group dropleft">
                <span
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="rounded-circle MemberCount"
                  v-if="all_reactions.love.comment_ID == CommentID"
                  title="View reaction users"
                  >{{ all_reactions.love.count }}</span
                >

                <template
                  tabindex="-1"
                  role="menu"
                  aria-hidden="true"
                  class="dropdown-menu dropdown-menu-right"
                >
                  <template
                    v-if="
                      all_reactions.love && all_reactions.love.reaction_users
                    "
                  >
                    <span
                      class="dropdown-item"
                      v-for="(user, index) in all_reactions.love.reaction_users"
                      :key="index"
                    >
                      <img
                        v-if="user.user_profile && user.user_profile.image"
                        :src="user.user_profile.image"
                        class="rounded-circle thumb-sm marginRight"
                        alt="friend"
                      />

                      <img
                        v-else
                        src="https://image.flaticon.com/icons/png/512/3135/3135715.png"
                        class="rounded-circle thumb-sm marginRight"
                        alt=""
                      />
                      {{ user.first_name + " " + user.last_name }}
                    </span>
                  </template>
                </template>
              </div>
            </span>
            <span class="MemberCount" v-else title="No reactions">0</span>
          </span>
        </span>

        <span class="mr-0 reactionHolder" v-else>
          <span class="reactionContainer">
            <i
              :class="all_reactions.love.icon"
              type="button"
              @click.prevent="PostReaction('love', CommentID)"
            ></i>
            <span v-if="all_reactions.love && all_reactions.love.count > 0">
              <div class="btn-group dropleft">
                <span
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="rounded-circle MemberCount"
                  v-if="all_reactions.love.comment_ID == CommentID"
                  title="View reaction users"
                  >{{ all_reactions.love.count }}</span
                >

                <template
                  tabindex="-1"
                  role="menu"
                  aria-hidden="true"
                  class="dropdown-menu dropdown-menu-right"
                >
                  <template
                    v-if="
                      all_reactions.love && all_reactions.love.reaction_users
                    "
                  >
                    <span
                      class="dropdown-item"
                      v-for="(user, index) in all_reactions.love.reaction_users"
                      :key="index"
                    >
                      <img
                        v-if="user.user_profile && user.user_profile.image"
                        :src="user.user_profile.image"
                        class="rounded-circle thumb-sm marginRight"
                        alt="friend"
                      />

                      <img
                        v-else
                        src="https://image.flaticon.com/icons/png/512/3135/3135715.png"
                        class="rounded-circle thumb-sm marginRight"
                        alt=""
                      />
                      {{ user.first_name + " " + user.last_name }}
                    </span>
                  </template>
                </template>
              </div>
            </span>
            <span class="MemberCount" v-else title="No reactions">0</span>
          </span>
        </span>
        <!-- <span class="mr-2" v-if="all_reactions.love.comment_ID == CommentID"
          >({{ all_reactions.love.count }})</span
        > -->
      </div>
    </div>
  </div>
</template>

<script>
// import Swal from "sweetalert2";
import axios from "axios";
import permissions from "../../..//authorization/permissions";

export default {
  name: "CommentReaction",
  props: ["coment_ractions", "comment_ID"],
  data() {
    return {
      is_reacted: false,
      CommentID: null,
      currentUserID: null,
      commentReactions: [],
      all_reactions: {
        like: {
          icon: "fas fa-thumbs-up",
          count: 0,
          reaction_users: [],
          comment_ID: null,
          is_liked: false,
        },
        love: {
          icon: "fas fa-heart",
          count: 0,
          reaction_users: [],
          comment_ID: null,
          is_loved: false,
        },
      },
    };
  },
  created() {
    this.currentUserID = localStorage.getItem("id");
    if (this.$props.coment_ractions) {
      this.commentReactions = this.$props.coment_ractions;
    }
    this.CommentID = this.$props.comment_ID;
    // this.object_Id = this.$props.object_id;
    // this.content_Type = this.$props.content_type;
    this.initialLoad();
  },
  updated() {},
  computed: {},
  methods: {
    initialLoad() {
      this.GroupReaction();
    },
    GroupReaction() {
      this.commentReactions.forEach((item) => {
        this.all_reactions[item.emo_type].count++;
        this.all_reactions[item.emo_type].reaction_users.push(
          item.reaction_user
        );
        this.all_reactions[item.emo_type].comment_ID = item.comment;
        this.all_reactions.like.reaction_users.find((element) => {
          if (element.id == this.currentUserID) {
            this.all_reactions.like.is_liked = true;
          }
        });
        this.all_reactions.love.reaction_users.find((element) => {
          if (element.id == this.currentUserID) {
            this.all_reactions.love.is_loved = true;
          }
        });
      });
    },
    LoadCommentdetails(comment_id) {
      axios.get("comment-module/" + comment_id + "/").then((response) => {
        this.commentReactions = response.data.reactions;
        this.ResetReaction();
        this.GroupReaction();
      });
    },
    ResetReaction() {
      for (const property in this.all_reactions) {
        if (
          Object.prototype.hasOwnProperty.call(this.all_reactions, property)
        ) {
          this.all_reactions[property].count = 0;
          this.all_reactions[property].reaction_users = [];
          this.all_reactions[property].comment_ID = null;
          this.all_reactions[property].is_liked = false;
          this.all_reactions[property].is_loved = false;
        }
      }
    },
    async PostReaction(reaction_name, comment_id) {
      //   this.comment_ID = comment_id;
      // this.DeleteReaction(reaction_name);
      axios
        .post("comment-reactions/", {
          comment: comment_id,
          reaction_user: this.currentUserID,
          emo_type: reaction_name,
        })
        .then((response) => {
          console.log(response);
        })
        .then((result) => {
          console.log(result);
          // this.$emit("load-comment");
          this.LoadCommentdetails(comment_id);
        })
        .catch((error) => {
          console.log("--++", error.response);
        });
      // this.is_reacted = true;
      // console.log(response);
    },
    // DeleteReaction(emo_type) {
    //   Swal.fire({
    //     icon: "error",
    //     title: this.$store.getters.GET_SORRY,
    //     text: "delete reation !",
    //   });
    //   if (emo_type == "like") {
    //     this.all_reactions.like.is_liked = false;
    //   } else if (emo_type == "love") {
    //     this.all_reactions.love.is_loved = false;
    //   }
    //   this.is_reacted = !this.is_reacted;
    // },
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
.disableReaction {
  opacity: 0.5;
}
.MemberCount {
  /* background: #c4c4c4;
  color: white;
  padding: 6px 12px;
  margin: 0 0 0px -12px; */
  cursor: pointer;
}
.dropdown-menu-right {
  /* padding: 0.44rem 1.5rem !important; */
  padding: 0.3rem 0.1rem !important;
}
.thumb-sm {
  height: 26px;
  width: 26px;
}
.reactionContainer {
  /* background: #bababa9e;
  border-radius: 15px;
  padding: 3px 3px; */
  margin: 2px 3px;
  font-weight: bold;
}
.reactionHolder {
  background: #bababa38;
  border-radius: 10px;
  padding: 2px 3px;
  border: 1px solid #bababa36;
}
</style>
