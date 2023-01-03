<template v-if="reply">
  <div class="cardReplyBody">
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
          <span v-if="reply.created_by.id == currentUserID">
            <span v-if="hasPermission('change_comment')">
              <a class="dropdown-item" @click="OpenEditModal(reply.id)">Edit</a>
            </span>
            <span v-if="hasPermission('delete_comment')">
              <a
                class="dropdown-item"
                href="#"
                @click="deleteReplyItem(reply.id)"
                >Delete</a
              >
            </span>
          </span>
        </div>
      </div>
    </div>
    <div class="p-3 d-flex align-items-center osahan-post-header">
      <div class="dropdown-list-image mr-3">
        <img
          class="rounded-circle"
          v-if="
            reply.created_by &&
            reply.created_by.user_profile &&
            reply.created_by.user_profile.image
          "
          :src="
            reply.created_by &&
            reply.created_by.user_profile &&
            reply.created_by.user_profile.image
          "
          alt=""
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
            reply.created_by &&
            reply.created_by.first_name &&
            reply.created_by.last_name
          "
        >
          {{ reply.created_by.first_name + " " + reply.created_by.last_name }}
        </div>
        <div class="small" v-if="reply.created_datetime">
          {{ reply.created_datetime }}
        </div>
      </div>
    </div>
    <span
      class="commentBody pl-3 d-flex align-items-center osahan-post-header"
      v-if="reply.comment_body"
    >
      {{ reply.comment_body }}
    </span>
    <div class="row">
      <div class="col-md-12">
        <!-- <div class="float-right mr-3">
          <i class="fas fa-thumbs-up"></i>
          <i class="fas fa-heart"></i>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import permissions from "../../../authorization/permissions";

export default {
  name: "CommentReply",
  props: ["reply_object"],
  data() {
    return {
      comment_reply_list: null,
      currentUserID: null,
      reply: null,
    };
  },
  created() {
    this.currentUserID = localStorage.getItem("id");
    if (this.$props.reply_object) {
      this.reply = this.$props.reply_object;
    }
    // this.object_Id = this.$props.object_id;
    // this.content_Type = this.$props.content_type;
    // this.initialLoad();
  },
  methods: {
    OpenEditModal(id) {
      this.$store.commit("comment/TOGGLE_REPLY_EDIT_MODAL", {
        content_Type: this.content_Type,
        object_id: this.object_Id,
        comment_id: id,
      });
    },
    deleteReplyItem: function (id) {
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
    /*for code_name*/
    hasPermission(permission_name) {
      return permissions.hasPermission(permission_name);
    },
  },
};
</script>

<style scoped>
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
</style>
