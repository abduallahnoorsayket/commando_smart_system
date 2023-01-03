<template>
  <Master>
    <template v-slot:content>
      <div class="app-main__inner">
        <EditCommentListComment
          @edit-comment="CommentEdited"
          v-if="isEditModalVisible"
        />
        <div class="app-page-title">
          <div class="page-title-wrapper">
            <div class="page-title-heading">
              <div class="page-title-icon">
                <i class="fas fa-comments icon-gradient bg-tempting-azure"></i>
              </div>
              <div>
                All Comments
                <!-- <div class="page-title-subheading">Admin can create new user from this form.
                </div>-->
                
                <router-link :to="{ path: '/all-notices' }">
                  <a class="float" style="position: absolute; right: 0">
                    <i
                      class="fas fa-arrow-alt-circle-left"
                      style="color: #69c5a5; font-size: 33px; width: 50px"
                      title="Back to previous page"
                    ></i>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div id="accordion" class="acordinContainer">
          <div class="searchFormCard">
            <div
              class="row cursorPointer"
              data-toggle="collapse"
              data-target="#collapseOne1"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div class="col-md-10">
                <div class="float-left headerContaier">
                  <div class="div">
                    <h5>
                      <i class="fa fa-search"></i>
                      &nbsp; {{ $store.getters.GET_SEARCH }}
                      <!-- <span class="text-muted" style="font-size:12px;">(Click for open)</span> -->
                    </h5>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <div class="float-right"></div>
              </div>
              <div class="col-md-1"></div>
            </div>

            <div data-parent="#accordion" id="collapseOne1" class="collapse">
              <hr />
              <div class="card-body">
                <form action @submit.prevent="searchUser" autocomplete="off">
                  <div class="form-row">
                    <div class="col-md-4">
                      <label>Created by</label>
                      <div class="form-group">
                        <input
                          class="form-control"
                          type="email"
                          v-model="username"
                        />
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label> Content Type </label>
                      <div class="form-group">
                        <select v-model="groups" class="form-control">
                          <option value="" selected>
                            {{
                              $store.getters.GET_SELECT +
                              " " +
                              $store.getters.GET_GROUP
                            }}
                          </option>
                          <option
                            v-for="grp in all_groups"
                            :key="grp.id"
                            :value="grp.id"
                            selected
                          >
                            {{ grp.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label> Object ID </label>
                      <div class="form-group">
                        <select v-model="department" class="form-control">
                          <option value="" selected>
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
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-8"></div>
                    <div class="col-md-4 mt-2">
                      <label></label>

                      <div class="form-group">
                        <button
                          type="submit"
                          class="btn btn-base float-right"
                          :disabled="blankSearch"
                        >
                          {{ $store.getters.GET_SEARCH }}
                          <i class="fa fa-search"></i>&nbsp;
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div class="commentContainer">
          <div class="row">
            <div class="col-lg-12 right">
              <div class="box shadow-sm rounded bg-white mb-3">
                <div class="box-title border-bottom p-3">
                  <h6 class="m-0">Comments (04)</h6>
                </div>
                <div class="box-body p-0">
                  <div class="row">
                    <div class="col-md-12">
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
                              <a
                                class="dropdown-item"
                                @click="OpenEditModal(version.id)"
                                >View</a
                              >
                              <a class="dropdown-item" @click="OpenEditModal()"
                                >Edit</a
                              >
                              <a
                                class="dropdown-item"
                                href="#"
                                @click="
                                  deleteVersionItem(version.id) in versions
                                "
                                >Delete</a
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="p-3 d-flex align-items-center osahan-post-header"
                        >
                          <div class="dropdown-list-image mr-3">
                            <img
                              class="rounded-circle"
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              alt=""
                            />
                          </div>
                          <div class="font-weight-bold mr-3">
                            <div class="text-truncate">Zahida hsasan</div>
                            <div class="small">2022-01-28 11:23:49</div>
                          </div>
                        </div>
                        <span
                          class="commentBody pl-3 d-flex align-items-center osahan-post-header"
                          >Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </span>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="float-right mr-3">
                              <i class="fas fa-thumbs-up"></i>
                              <i class="fas fa-heart"></i>
                            </div>
                          </div>
                        </div>
                      </div>
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
                              <a
                                class="dropdown-item"
                                @click="OpenEditModal(version.id)"
                                >View</a
                              >
                              <a class="dropdown-item" @click="OpenEditModal()"
                                >Edit</a
                              >
                              <a
                                class="dropdown-item"
                                href="#"
                                @click="
                                  deleteVersionItem(version.id) in versions
                                "
                                >Delete</a
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="p-3 d-flex align-items-center osahan-post-header"
                        >
                          <div class="dropdown-list-image mr-3">
                            <img
                              class="rounded-circle"
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt=""
                            />
                          </div>
                          <div class="font-weight-bold mr-3">
                            <div class="text-truncate">Salam hasan</div>
                            <div class="small">2022-01-28 11:23:49</div>
                          </div>
                        </div>
                        <span
                          class="commentBody pl-3 d-flex align-items-center osahan-post-header"
                          >Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </span>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="float-right mr-3">
                              <i class="fas fa-thumbs-up"></i>
                              <i class="fas fa-heart"></i>
                            </div>
                          </div>
                        </div>
                        <div class="row">
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
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                      >
                                        <div class="float-left">
                                          <span
                                            ><i class="fas fa-arrow-right"></i>
                                            2 reply</span
                                          >
                                        </div>
                                      </button>
                                    </h5>
                                  </div>

                                  <div
                                    id="collapseOne"
                                    class="collapse"
                                    aria-labelledby="headingOne"
                                    data-parent="#accordion"
                                  >
                                    <div class="cardReplyBody">
                                      <div
                                        class="float-right p-3 d-flex align-items-center"
                                      >
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
                                            <a
                                              class="dropdown-item"
                                              @click="OpenEditModal(version.id)"
                                              >View</a
                                            >
                                            <a
                                              class="dropdown-item"
                                              @click="OpenEditModal()"
                                              >Edit</a
                                            >
                                            <a
                                              class="dropdown-item"
                                              href="#"
                                              @click="
                                                deleteVersionItem(version.id) in
                                                  versions
                                              "
                                              >Delete</a
                                            >
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="p-3 d-flex align-items-center osahan-post-header"
                                      >
                                        <div class="dropdown-list-image mr-3">
                                          <img
                                            class="rounded-circle"
                                            src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                            alt=""
                                          />
                                        </div>
                                        <div class="font-weight-bold mr-3">
                                          <div class="text-truncate">
                                            Zahida hsasan
                                          </div>
                                          <div class="small">
                                            2022-01-28 11:23:49
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        class="commentBody pl-3 d-flex align-items-center osahan-post-header"
                                        >Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s,
                                      </span>
                                      <div class="row">
                                        <div class="col-md-12">
                                          <div class="float-right mr-3">
                                            <i class="fas fa-thumbs-up"></i>
                                            <i class="fas fa-heart"></i>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="cardReplyBody">
                                      <div
                                        class="float-right p-3 d-flex align-items-center"
                                      >
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
                                            <a
                                              class="dropdown-item"
                                              @click="OpenEditModal(version.id)"
                                              >View</a
                                            >
                                            <a
                                              class="dropdown-item"
                                              @click="OpenEditModal(version.id)"
                                              >Edit</a
                                            >
                                            <a
                                              class="dropdown-item"
                                              href="#"
                                              @click="
                                                deleteVersionItem(version.id) in
                                                  versions
                                              "
                                              >Delete</a
                                            >
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        class="p-3 d-flex align-items-center osahan-post-header"
                                      >
                                        <div class="dropdown-list-image mr-3">
                                          <img
                                            class="rounded-circle"
                                            src="https://previews.123rf.com/images/gmast3r/gmast3r1503/gmast3r150300010/37887487-businessman-profile-icon-male-portrait-flat.jpg"
                                            alt=""
                                          />
                                        </div>
                                        <div class="font-weight-bold mr-3">
                                          <div class="text-truncate">
                                            Abdullah sayket
                                          </div>
                                          <div class="small">
                                            2022-01-28 11:23:49
                                          </div>
                                        </div>
                                      </div>
                                      <span
                                        class="commentBody pl-3 d-flex align-items-center osahan-post-header"
                                        >Lorem Ipsum is simply dummy text of the
                                        printing and typesetting industry. Lorem
                                        Ipsum has been the industry's standard
                                        dummy text ever since the 1500s,
                                      </span>
                                      <div class="row">
                                        <div class="col-md-12">
                                          <div class="float-right mr-3">
                                            <i class="fas fa-thumbs-up"></i>
                                            <i class="fas fa-heart"></i>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <!-- <div class="card">
                                  <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                      <button
                                        class="btn btn-link collapsed"
                                        data-toggle="collapse"
                                        data-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                      >
                                        Collapsible Group Item #2
                                      </button>
                                    </h5>
                                  </div>
                                  <div
                                    id="collapseTwo"
                                    class="collapse"
                                    aria-labelledby="headingTwo"
                                    data-parent="#accordion"
                                  >
                                    <div class="card-body">
                                      Anim pariatur cliche reprehenderit, enim
                                      eiusmod high life accusamus terry
                                      richardson ad squid. 3 wolf moon officia
                                      aute, non cupidatat skateboard dolor
                                      brunch. Food truck quinoa nesciunt laborum
                                      eiusmod. Brunch 3 wolf moon tempor, sunt
                                      aliqua put a bird on it squid
                                      single-origin coffee nulla assumenda
                                      shoreditch et. Nihil anim keffiyeh
                                      helvetica, craft beer labore wes anderson
                                      cred nesciunt sapiente ea proident. Ad
                                      vegan excepteur butcher vice lomo.
                                      Leggings occaecat craft beer
                                      farm-to-table, raw denim aesthetic synth
                                      nesciunt you probably haven't heard of
                                      them accusamus labore sustainable VHS.
                                    </div>
                                  </div>
                                </div> -->
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                              <a
                                class="dropdown-item"
                                @click="OpenEditModal(version.id)"
                                >View</a
                              >
                              <a
                                class="dropdown-item"
                                @click="OpenEditModal(version.id)"
                                >Edit</a
                              >
                              <a
                                class="dropdown-item"
                                href="#"
                                @click="
                                  deleteVersionItem(version.id) in versions
                                "
                                >Delete</a
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="p-3 d-flex align-items-center osahan-post-header"
                        >
                          <div class="dropdown-list-image mr-3">
                            <img
                              class="rounded-circle"
                              src="https://bootdey.com/img/Content/avatar/avatar3.png"
                              alt=""
                            />
                          </div>
                          <div class="font-weight-bold mr-3">
                            <div class="text-truncate">Zahid hsasan</div>
                            <div class="small">2022-01-28 11:23:49</div>
                          </div>
                        </div>
                        <span
                          class="commentBody pl-3 d-flex align-items-center osahan-post-header"
                          >Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </span>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="float-right mr-3">
                              <i class="fas fa-thumbs-up"></i>
                              <i class="fas fa-heart"></i>
                            </div>
                          </div>
                        </div>
                      </div>
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
                              <a
                                class="dropdown-item"
                                @click="OpenEditModal(version.id)"
                                >View</a
                              >
                              <a
                                class="dropdown-item"
                                @click="OpenEditModal(version.id)"
                                >Edit</a
                              >
                              <a
                                class="dropdown-item"
                                href="#"
                                @click="
                                  deleteVersionItem(version.id) in versions
                                "
                                >Delete</a
                              >
                            </div>
                          </div>
                        </div>
                        <div
                          class="p-3 d-flex align-items-center osahan-post-header"
                        >
                          <div class="dropdown-list-image mr-3">
                            <img
                              class="rounded-circle"
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                              alt=""
                            />
                          </div>
                          <div class="font-weight-bold mr-3">
                            <div class="text-truncate">Salam hasan</div>
                            <div class="small">2022-01-28 11:23:49</div>
                          </div>
                        </div>
                        <span
                          class="commentBody pl-3 d-flex align-items-center osahan-post-header"
                          >Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                        </span>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="float-right mr-3">
                              <i class="fas fa-thumbs-up"></i>
                              <i class="fas fa-heart"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="row">
                    <div class="col-md-12">
                      <div
                        class="
                          p-3
                          d-flex
                          align-items-center
                          border-bottom
                          osahan-post-header
                        "
                      >
                        <div class="dropdown-list-image mr-3">
                          <img
                            class="rounded-circle"
                              src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                          />
                        </div>
                        <div class="font-weight-bold mr-3">
                          <div class="text-truncate">
                            Maruf added New Comment on Sprint 01.....
                          </div>
                          <div class="small">15 mins ago</div>
                        </div>
                        <span class="iconContainer ml-auto mr-4">
                          <i class="fas fa-eye-slash"></i>
                        </span>
                        <span class="mb-0">
                          <div class="btn-group">
                            <button
                              type="button"
                              class="btn btn-light btn-sm rounded"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i class="mdi mdi-dots-vertical"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                              <button class="dropdown-item" type="button">
                                <i class="mdi mdi-check mr-2"></i> Mark as
                                seen
                              </button>
                            </div>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div> -->
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
    </template>
  </Master>
</template>

<script>
import Master from "../../layouts/Master";
import EditCommentListComment from "./EditCommentListComment.vue";
export default {
  name: "CommentList",
  components: { Master, EditCommentListComment },
  data() {
    return {
      pagination: {
        count: null,
        next: null,
        previous: null,
        showing: 0,
        page: null,
      },
    };
  },
  computed: {
    isEditModalVisible() {
      return this.$store.state.projectRelated.CommentEditModalVisible;
    },
  },
  methods: {
    OpenEditModal() {
      this.$store.commit("projectRelated/toggleCommentEditModal", {
        content_Type: 1,
        object_id: 1,
        comment_id: 1,
      });
    },
  },
};
</script>

<style scoped>
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
</style>
