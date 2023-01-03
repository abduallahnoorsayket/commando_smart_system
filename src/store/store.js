import { createStore } from "vuex";
import axios from "axios";
import LangJson from "../components/MultilangModule/lang.json";

const AuthModule = {
  namespaced: true,
  state: {
    isModalVisible: false,
    groupId: null,
    isLogoutClicked: false,
  },
  mutations: {
    toggleModal(state, id) {
      state.isModalVisible = !state.isModalVisible;
      state.groupId = id;
    },
    toggleLogout(state) {
      state.isLogoutClicked = !state.isLogoutClicked;
    },
  },
  getters: {},
  actions: {},
};

const AttendanceModule = {
  namespaced: true,
  state: {
    isModalVisible: false,
    isUpdateModalVisible: false,
    employeeId: null,
    // Attendance_Date:null,
    attendanceId: null,
    isLeaveDetailModalVisible: null,
    leaveId: null,
  },
  mutations: {
    toggleModal(state, id) {
      state.isModalVisible = !state.isModalVisible;
      state.employeeId = id;
      // state.Attendance_Date = AttendanceDate;
    },
    toggleUpdateModal(state, id) {
      state.isUpdateModalVisible = !state.isUpdateModalVisible;
      state.attendanceId = id;
    },
    toggleLeaveDetailModal(state, id) {
      state.isLeaveDetailModalVisible = !state.isLeaveDetailModalVisible;
      state.leaveId = id;
    },
  },
  getters: {},
  actions: {},
};
const EvaluationModule = {
  namespaced: true,
  state: {},
  mutations: {},
  getters: {},
  actions: {},
};
const ProjectRelatedModule = {
  namespaced: true,
  state: {
    // client
    ClientModalVisible: false,
    clientId: null,
    // activity
    ActivityModalVisible: false,
    actvityId: null,
    // version
    VersionAddModalVisible: false,
    projectId: null,
    VersionEditModalVisible: false,
    versionId: null,
    // sprint
    SprintAddModalVisible: false,
    SprintEditModalVisible: false,
    SprintId: null,
    // todo
    TodoAddModalVisible: false,
    TodoEditModalVisible: false,
    SubtaskId: null,
    // work Type
    WorkTypeAddModalVisible: false,
    WorkTypeEditModalVisible: false,
    WorkTypeId: null,
    // work Status
    WorkStatusAddModalVisible: false,
    WorkStatusEditModalVisible: false,
    WorkStatusId: null,
    // work Priority
    WorkPriorityAddModalVisible: false,
    WorkPriorityEditModalVisible: false,
    WorkPriorityId: null,
    // file
    FileAddModalVisible: false,
    FileEditModalVisible: false,
    ContentType: null,
    ObjectId: null,
    FileId: null,
    // comment
    CommentEditModalVisible: false,
    CommentSectionVisible: true,
    CommentObjectId: null,
    CommentContentType: null,
    CommentId: null,
  },
  mutations: {
    // client
    toggleClientModal(state, id) {
      state.ClientModalVisible = !state.ClientModalVisible;
      state.clientId = id;
    },
    // activity
    toggleActivityModal(state, id) {
      state.ActivityModalVisible = !state.ActivityModalVisible;
      state.actvityId = id;
    },
    // version
    toggleVersionAddModal(state) {
      state.VersionAddModalVisible = !state.VersionAddModalVisible;
      // state.clientId = id;
    },
    toggleVersionEditModal(state, id) {
      state.VersionEditModalVisible = !state.VersionEditModalVisible;
      state.versionId = id;
    },
    // sprint
    toggleSprintAddModal(state) {
      state.SprintAddModalVisible = !state.SprintAddModalVisible;
      // state.clientId = id;
    },
    toggleSprintEditModal(state, id) {
      state.SprintEditModalVisible = !state.SprintEditModalVisible;
      state.SprintId = id;
    },
    // todo /Subtask
    toggleTodoAddModal(state) {
      state.TodoAddModalVisible = !state.TodoAddModalVisible;
      // state.clientId = id;
    },
    toggleTodoEditModal(state, id) {
      state.TodoEditModalVisible = !state.TodoEditModalVisible;
      state.SubtaskId = id;
    },
    // Work Type
    toggleWorkTypeAddModal(state) {
      state.WorkTypeAddModalVisible = !state.WorkTypeAddModalVisible;
      // state.clientId = id;
    },
    toggleWorkTypeEditModal(state, id) {
      state.WorkTypeEditModalVisible = !state.WorkTypeEditModalVisible;
      state.WorkTypeId = id;
    },
    // Work Status
    toggleWorkStatusAddModal(state) {
      state.WorkStatusAddModalVisible = !state.WorkStatusAddModalVisible;
      // state.clientId = id;
    },
    toggleWorkStatusEditModal(state, id) {
      state.WorkStatusEditModalVisible = !state.WorkStatusEditModalVisible;
      state.WorkStatusId = id;
    },
    // Work Priority
    toggleWorkPriorityAddModal(state) {
      state.WorkPriorityAddModalVisible = !state.WorkPriorityAddModalVisible;
      // state.clientId = id;
    },
    toggleWorkPriorityEditModal(state, id) {
      state.WorkPriorityEditModalVisible = !state.WorkPriorityEditModalVisible;
      state.WorkPriorityId = id;
    },
    // file
    toggleFileAddModal(state, payload) {
      state.FileAddModalVisible = !state.FileAddModalVisible;
      state.ObjectId = payload.object_id;
      state.ContentType = payload.content_Type;
      // state.FileId = payload.file_id;
    },
    toggleFileEditModal(state, payload) {
      state.FileEditModalVisible = !state.FileEditModalVisible;
      state.ObjectId = payload.object_id;
      state.ContentType = payload.content_Type;
      state.FileId = payload.file_id;
    },
    closeFileEditModal(state) {
      state.FileEditModalVisible = !state.FileEditModalVisible;
    },
    // comment
    toggleCommentEditModal(state, payload) {
      state.CommentEditModalVisible = !state.CommentEditModalVisible;
      state.CommentObjectId = payload.object_id;
      state.CommentContentType = payload.content_Type;
      state.CommentId = payload.comment_id;
    },
    toggleCommentSection(state) {
      // state.CommentSectionVisible = !state.CommentSectionVisible;
      state.CommentSectionVisible = false;
    },
    toggleComment(state) {
      state.CommentSectionVisible = true;
    },
    // id_typeForComment(state, payload) {
    //   state.CommentObjectId = payload.object_id;
    //   state.CommentContentType = payload.content_Type;
    // },
  },
  getters: {},
  actions: {},
};
const NoticeModule = {
  namespaced: true,
  state: {
    CurrentUserId: null,
    NoticeId: null,
    NoticeCommentId: null,
    NoticeCommentEditModalVisible: false,
  },
  mutations: {
    // Notice comment
    toggleNoticeCommentEditModal(state, payload) {
      state.NoticeCommentEditModalVisible =
        !state.NoticeCommentEditModalVisible;
      state.CurrentUserId = payload.created_by;
      state.NoticeId = payload.notice_id;
      state.NoticeCommentId = payload.notice_comment_id;
    },
  },
  getters: {},
  actions: {},
};
const CommentModule = {
  namespaced: true,
  state: {
    // comment
    CommentEditModalVisible: false,
    CommentObjectId: null,
    CommentContentType: null,
    CommentId: null,
    // REPLY
    ReplyEditModalVisible: false,
    ReplyObjectId: null,
    ReplyContentType: null,
    ReplyId: null,
  },
  mutations: {
    // comment
    TOGGLE_COMMENT_EDIT_MODAL(state, payload) {
      state.CommentEditModalVisible = !state.CommentEditModalVisible;
      state.CommentObjectId = payload.object_id;
      state.CommentContentType = payload.content_Type;
      state.CommentId = payload.comment_id;
    },
    // REPLY
    TOGGLE_REPLY_EDIT_MODAL(state, payload) {
      state.ReplyEditModalVisible = !state.ReplyEditModalVisible;
      state.ReplyObjectId = payload.object_id;
      state.ReplyContentType = payload.content_Type;
      state.ReplyId = payload.comment_id;
    },
  },
  getters: {},
  actions: {},
};
const NotoificationModule = {
  namespaced: true,
  state: {
    total_unseen_updated: null,
  },
  mutations: {
    SET_TOTAL_UNSEEN(state, total_response_unseen) {
      // state.total_unseen_updated = !state.total_unseen_updated;
      state.total_unseen_updated = total_response_unseen;
    },
  },
  getters: {},
  actions: {
    getTotalUnseen({ commit }) {
      console.log("275");
      axios.get("notification/").then((response) => {
        commit("SET_TOTAL_UNSEEN", response.data.total_unseen);
      });
    },
  },
};
const FileModule = {
  namespaced: true,
  state: {
    isFileShareVisible: false,
    FileEditModalVisible: false,
    file_id: null,
    file_share_index: null,
    TestState: null,
  },
  mutations: {
    TOGGLE_FILE_SHARE_MODAL(state, payload) {
      state.isFileShareVisible = !state.isFileShareVisible;
      state.file_share_index = payload.index_number;
      // state.groupId = id;
    },
    TOGGLE_FILE_EDIT_MODAL(state, payload) {
      state.FileEditModalVisible = !state.FileEditModalVisible;
      state.file_id = payload.file_id;
      // state.groupId = id;
    },
    FILE_OBJECT_ASSIGN(state) {
      // state.total_unseen_updated = !state.total_unseen_updated;
      state.TestState = null;
    },
  },
  getters: {},
  actions: {
    file_obeject_assign({ commit }, payload) {
      console.log("275 in file store");
      axios
        .post("file_object_assign/", {
          object_id: payload.id,
          content_type: payload.content_type,
          files: payload.files_related_info,
        })
        .then((response) => {
          console.log(response);
          commit("FILE_OBJECT_ASSIGN");
        })
        .catch((error) => {
          // this.language_error_data = error.response.data;
          console.log(error.response);
        });
    },
  },
};
// Create a new store instance.
const store = createStore({
  strict: true,
  modules: {
    auth: AuthModule,
    attendance: AttendanceModule,
    evaluation: EvaluationModule,
    projectRelated: ProjectRelatedModule,
    notice: NoticeModule,
    comment: CommentModule,
    notification: NotoificationModule,
    file: FileModule,
  },
  state: {
    is_active: false,
    lang_details_data: null,
  },
  mutations: {
    collapseSideBar(state) {
      state.is_active = !state.is_active;
    },
    SET_LANG_DETAILS(state, payload) {
      state.lang_details_data = payload.lang_details;
      // console.log("246 in Store", LangJson["LOGIN"].default);
    },
    RESET_LANG_DETAILS(state) {
      state.lang_details_data = null;
      // console.log("246 in Store", LangJson["LOGIN"].default);
    },
    GET_LANG_DETAILS(state, payload) {
      if (state.lang_details_data[payload.langData]) {
        // console.log("253 true", state.lang_details_data[payload.langData]);
        return state.lang_details_data[payload.langData];
      }
      console.log("256 false", LangJson[payload.langData].default);
      return LangJson[payload.langData].default;
    },
  },
  actions: {
    set_lang_details({ commit }, payload) {
      commit("SET_LANG_DETAILS", payload);
    },
    get_lang_details({ commit }, payload) {
      commit("GET_LANG_DETAILS", payload);
    },
    reset_lang_details({ commit }) {
      commit("RESET_LANG_DETAILS");
    },
  },
  getters: {
    // navbar
    GET_PROFILE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PROFILE"]
      ) {
        return state.lang_details_data["PROFILE"];
      } else {
        return LangJson["PROFILE"].default;
      }
    },
    // dashboard
    GET_LOGIN(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LOGIN"]
      ) {
        return state.lang_details_data["LOGIN"];
      } else {
        return LangJson["LOGIN"].default;
      }
    },

    GET_LOGOUT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LOGOUT"]
      ) {
        return state.lang_details_data["LOGOUT"];
      } else {
        return LangJson["LOGOUT"].default;
      }
    },
    GET_BREAKIN(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["BREAKIN"]
      ) {
        return state.lang_details_data["BREAKIN"];
      } else {
        return LangJson["BREAKIN"].default;
      }
    },
    GET_BREAKOUT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["BREAKOUT"]
      ) {
        return state.lang_details_data["BREAKOUT"];
      } else {
        return LangJson["BREAKOUT"].default;
      }
    },
    GET_DASHBOARD(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DASHBOARD"]
      ) {
        return state.lang_details_data["DASHBOARD"];
      } else {
        return LangJson["DASHBOARD"].default;
      }
    },
    GET_LATEST_NOTICES(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LATEST_NOTICES"]
      ) {
        return state.lang_details_data["LATEST_NOTICES"];
      } else {
        return LangJson["LATEST_NOTICES"].default;
      }
    },

    GET_DETAILS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DETAILS"]
      ) {
        return state.lang_details_data["DETAILS"];
      } else {
        return LangJson["DETAILS"].default;
      }
    },
    GET_EMPLOYEE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EMPLOYEE"]
      ) {
        return state.lang_details_data["EMPLOYEE"];
      } else {
        return LangJson["EMPLOYEE"].default;
      }
    },
    GET_EMPLOYEES(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EMPLOYEES"]
      ) {
        return state.lang_details_data["EMPLOYEES"];
      } else {
        return LangJson["EMPLOYEES"].default;
      }
    },
    GET_EMAIL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EMAIL"]
      ) {
        return state.lang_details_data["EMAIL"];
      } else {
        return LangJson["EMAIL"].default;
      }
    },
    GET_DEPARTMENT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DEPARTMENT"]
      ) {
        return state.lang_details_data["DEPARTMENT"];
      } else {
        return LangJson["DEPARTMENT"].default;
      }
    },
    GET_BREAK_TIME(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["BREAK_TIME"]
      ) {
        return state.lang_details_data["BREAK_TIME"];
      } else {
        return LangJson["BREAK_TIME"].default;
      }
    },
    GET_WORKING_HOUR(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["WORKING_HOUR"]
      ) {
        return state.lang_details_data["WORKING_HOUR"];
      } else {
        return LangJson["WORKING_HOUR"].default;
      }
    },
    GET_REMARKS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["REMARKS"]
      ) {
        return state.lang_details_data["REMARKS"];
      } else {
        return LangJson["REMARKS"].default;
      }
    },
    GET_COST(state) {
      if (state && state.lang_details_data && state.lang_details_data["COST"]) {
        return state.lang_details_data["COST"];
      } else {
        return LangJson["COST"].default;
      }
    },
    GET_SL(state) {
      if (state && state.lang_details_data && state.lang_details_data["SL"]) {
        return state.lang_details_data["SL"];
      } else {
        return LangJson["SL"].default;
      }
    },
    GET_DATE(state) {
      if (state && state.lang_details_data && state.lang_details_data["DATE"]) {
        return state.lang_details_data["DATE"];
      } else {
        return LangJson["DATE"].default;
      }
    },
    GET_DAY(state) {
      if (state && state.lang_details_data && state.lang_details_data["DAY"]) {
        return state.lang_details_data["DAY"];
      } else {
        return LangJson["DAY"].default;
      }
    },
    GET_TOTAL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["TOTAL"]
      ) {
        return state.lang_details_data["TOTAL"];
      } else {
        return LangJson["TOTAL"].default;
      }
    },
    GET_HOURS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["HOURS"]
      ) {
        return state.lang_details_data["HOURS"];
      } else {
        return LangJson["HOURS"].default;
      }
    },
    GET_COSTS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["COSTS"]
      ) {
        return state.lang_details_data["COSTS"];
      } else {
        return LangJson["COSTS"].default;
      }
    },
    // GET_WEEKLY_HOLIDAY(state) {
    //   if (state && state.lang_details_data && state.lang_details_data["WEEKLY_HOLIDAY"]) {
    //     return state.lang_details_data["WEEKLY_HOLIDAY"];
    //   } else {
    //     return LangJson["WEEKLY_HOLIDAY"].default;
    //   }
    // },
    GET_FROM(state) {
      if (state && state.lang_details_data && state.lang_details_data["FROM"]) {
        return state.lang_details_data["FROM"];
      } else {
        return LangJson["FROM"].default;
      }
    },
    GET_NOTICE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["NOTICE"]
      ) {
        return state.lang_details_data["NOTICE"];
      } else {
        return LangJson["NOTICE"].default;
      }
    },
    GET_SUBJECT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SUBJECT"]
      ) {
        return state.lang_details_data["SUBJECT"];
      } else {
        return LangJson["SUBJECT"].default;
      }
    },
    GET_ACTION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ACTION"]
      ) {
        return state.lang_details_data["ACTION"];
      } else {
        return LangJson["ACTION"].default;
      }
    },
    GET_CREATED_DATE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CREATED_DATE"]
      ) {
        return state.lang_details_data["CREATED_DATE"];
      } else {
        return LangJson["CREATED_DATE"].default;
      }
    },
    GET_AND(state) {
      if (state && state.lang_details_data && state.lang_details_data["&"]) {
        return state.lang_details_data["&"];
      } else {
        return LangJson["&"].default;
      }
    },
    GET_TIME(state) {
      if (state && state.lang_details_data && state.lang_details_data["TIME"]) {
        return state.lang_details_data["TIME"];
      } else {
        return LangJson["TIME"].default;
      }
    },
    GET_NO_DATA_FOUND(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["NO_DATA_FOUND"]
      ) {
        return state.lang_details_data["NO_DATA_FOUND"];
      } else {
        return LangJson["NO_DATA_FOUND"].default;
      }
    },

    GET_EXCLAMATION_MARK(state) {
      if (state && state.lang_details_data && state.lang_details_data["!"]) {
        return state.lang_details_data["!"];
      } else {
        return LangJson["!"].default;
      }
    },
    GET_ATTENDANCE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ATTENDANCE"]
      ) {
        return state.lang_details_data["ATTENDANCE"];
      } else {
        return LangJson["ATTENDANCE"].default;
      }
    },
    GET_TIME_FOR_TODAY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["TIME_FOR_TODAY"]
      ) {
        return state.lang_details_data["TIME_FOR_TODAY"];
      } else {
        return LangJson["TIME_FOR_TODAY"].default;
      }
    },
    GET_TIME_FOR_THIS_MONTH(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["TIME_FOR_THIS_MONTH"]
      ) {
        return state.lang_details_data["TIME_FOR_THIS_MONTH"];
      } else {
        return LangJson["TIME_FOR_THIS_MONTH"].default;
      }
    },
    GET_WEEKLY_HOLIDAY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["WEEKLY_HOLIDAY"]
      ) {
        return state.lang_details_data["WEEKLY_HOLIDAY"];
      } else {
        return LangJson["WEEKLY_HOLIDAY"].default;
      }
    },

    // user list
    GET_USERS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["USERS"]
      ) {
        return state.lang_details_data["USERS"];
      } else {
        return LangJson["USERS"].default;
      }
    },
    GET_ADD_NEW(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ADD_NEW"]
      ) {
        return state.lang_details_data["ADD_NEW"];
      } else {
        return LangJson["ADD_NEW"].default;
      }
    },
    GET_SEARCH(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SEARCH"]
      ) {
        return state.lang_details_data["SEARCH"];
      } else {
        return LangJson["SEARCH"].default;
      }
    },
    GET_EDIT(state) {
      if (state && state.lang_details_data && state.lang_details_data["EDIT"]) {
        return state.lang_details_data["EDIT"];
      } else {
        return LangJson["EDIT"].default;
      }
    },
    GET_DELETE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DELETE"]
      ) {
        return state.lang_details_data["DELETE"];
      } else {
        return LangJson["DELETE"].default;
      }
    },
    GET_SHOWING(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SHOWING"]
      ) {
        return state.lang_details_data["SHOWING"];
      } else {
        return LangJson["SHOWING"].default;
      }
    },
    GET_OF(state) {
      if (state && state.lang_details_data && state.lang_details_data["OF"]) {
        return state.lang_details_data["OF"];
      } else {
        return LangJson["OF"].default;
      }
    },
    GET_PREVIOUS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PREVIOUS"]
      ) {
        return state.lang_details_data["PREVIOUS"];
      } else {
        return LangJson["PREVIOUS"].default;
      }
    },
    GET_NEXT(state) {
      if (state && state.lang_details_data && state.lang_details_data["NEXT"]) {
        return state.lang_details_data["NEXT"];
      } else {
        return LangJson["NEXT"].default;
      }
    },

    // designation
    GET_CREATE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CREATE"]
      ) {
        return state.lang_details_data["CREATE"];
      } else {
        return LangJson["CREATE"].default;
      }
    },
    GET_DESIGNATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DESIGNATION"]
      ) {
        return state.lang_details_data["DESIGNATION"];
      } else {
        return LangJson["DESIGNATION"].default;
      }
    },
    GET_NAME(state) {
      if (state && state.lang_details_data && state.lang_details_data["NAME"]) {
        return state.lang_details_data["NAME"];
      } else {
        return LangJson["NAME"].default;
      }
    },
    GET_SUBMIT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SUBMIT"]
      ) {
        return state.lang_details_data["SUBMIT"];
      } else {
        return LangJson["SUBMIT"].default;
      }
    },
    GET_UPDATE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["UPDATE"]
      ) {
        return state.lang_details_data["UPDATE"];
      } else {
        return LangJson["UPDATE"].default;
      }
    },
    GET_LIST(state) {
      if (state && state.lang_details_data && state.lang_details_data["LIST"]) {
        return state.lang_details_data["LIST"];
      } else {
        return LangJson["LIST"].default;
      }
    },
    GET_ADD(state) {
      if (state && state.lang_details_data && state.lang_details_data["ADD"]) {
        return state.lang_details_data["ADD"];
      } else {
        return LangJson["ADD"].default;
      }
    },
    // branch
    GET_BRANCH(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["BRANCH"]
      ) {
        return state.lang_details_data["BRANCH"];
      } else {
        return LangJson["BRANCH"].default;
      }
    },
    GET_WEEKLY_HOLIDAYS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["WEEKLY_HOLIDAYS"]
      ) {
        return state.lang_details_data["WEEKLY_HOLIDAYS"];
      } else {
        return LangJson["WEEKLY_HOLIDAYS"].default;
      }
    },
    GET_TIMEZONE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["TIMEZONE"]
      ) {
        return state.lang_details_data["TIMEZONE"];
      } else {
        return LangJson["TIMEZONE"].default;
      }
    },
    GET_ADDRESS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ADDRESS"]
      ) {
        return state.lang_details_data["ADDRESS"];
      } else {
        return LangJson["ADDRESS"].default;
      }
    },
    GET_SELECT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SELECT"]
      ) {
        return state.lang_details_data["SELECT"];
      } else {
        return LangJson["SELECT"].default;
      }
    },
    GET_YOU_DO_NOT_HAVE_PERMISSION_TO_DO_THIS_ACTION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["YOU_DO_NOT_HAVE_PERMISSION_TO_DO_THIS_ACTION"]
      ) {
        return state.lang_details_data[
          "YOU_DO_NOT_HAVE_PERMISSION_TO_DO_THIS_ACTION"
        ];
      } else {
        return LangJson["YOU_DO_NOT_HAVE_PERMISSION_TO_DO_THIS_ACTION"].default;
      }
    },

    // department
    GET_CODE(state) {
      if (state && state.lang_details_data && state.lang_details_data["CODE"]) {
        return state.lang_details_data["CODE"];
      } else {
        return LangJson["CODE"].default;
      }
    },
    // group
    GET_GROUP(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["GROUP"]
      ) {
        return state.lang_details_data["GROUP"];
      } else {
        return LangJson["GROUP"].default;
      }
    },
    GET_PERMISSIONS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PERMISSIONS"]
      ) {
        return state.lang_details_data["PERMISSIONS"];
      } else {
        return LangJson["PERMISSIONS"].default;
      }
    },
    GET_VIEW(state) {
      if (state && state.lang_details_data && state.lang_details_data["VIEW"]) {
        return state.lang_details_data["VIEW"];
      } else {
        return LangJson["VIEW"].default;
      }
    },
    GET_INFO(state) {
      if (state && state.lang_details_data && state.lang_details_data["INFO"]) {
        return state.lang_details_data["INFO"];
      } else {
        return LangJson["INFO"].default;
      }
    },
    // GET_COLON_SIGN(state) {
    //   if (state && state.lang_details_data && state.lang_details_data[":"]) {
    //     return state.lang_details_data[":"];
    //   } else {
    //     return LangJson[":"].default;
    //   }
    // },
    GET_CLOSE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CLOSE"]
      ) {
        return state.lang_details_data["CLOSE"];
      } else {
        return LangJson["CLOSE"].default;
      }
    },
    GET_NEW(state) {
      if (state && state.lang_details_data && state.lang_details_data["NEW"]) {
        return state.lang_details_data["NEW"];
      } else {
        return LangJson["NEW"].default;
      }
    },

    // user
    GET_USER(state) {
      if (state && state.lang_details_data && state.lang_details_data["USER"]) {
        return state.lang_details_data["USER"];
      } else {
        return LangJson["USER"].default;
      }
    },
    GET_ACTIVE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ACTIVE"]
      ) {
        return state.lang_details_data["ACTIVE"];
      } else {
        return LangJson["ACTIVE"].default;
      }
    },
    GET_FIRST_NAME(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["FIRST_NAME"]
      ) {
        return state.lang_details_data["FIRST_NAME"];
      } else {
        return LangJson["FIRST_NAME"].default;
      }
    },
    GET_LAST_NAME(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LAST_NAME"]
      ) {
        return state.lang_details_data["LAST_NAME"];
      } else {
        return LangJson["LAST_NAME"].default;
      }
    },
    GET_PASSWORD(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PASSWORD"]
      ) {
        return state.lang_details_data["PASSWORD"];
      } else {
        return LangJson["PASSWORD"].default;
      }
    },
    GET_PHONE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PHONE"]
      ) {
        return state.lang_details_data["PHONE"];
      } else {
        return LangJson["PHONE"].default;
      }
    },
    GET_SUPER_USER(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SUPER_USER"]
      ) {
        return state.lang_details_data["SUPER_USER"];
      } else {
        return LangJson["SUPER_USER"].default;
      }
    },
    GET_EDUCATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EDUCATION"]
      ) {
        return state.lang_details_data["EDUCATION"];
      } else {
        return LangJson["EDUCATION"].default;
      }
    },
    GET_JOINING_DATE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["JOINING_DATE"]
      ) {
        return state.lang_details_data["JOINING_DATE"];
      } else {
        return LangJson["JOINING_DATE"].default;
      }
    },
    GET_SKILL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SKILL"]
      ) {
        return state.lang_details_data["SKILL"];
      } else {
        return LangJson["SKILL"].default;
      }
    },
    GET_SHORT_BIO(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SHORT_BIO"]
      ) {
        return state.lang_details_data["SHORT_BIO"];
      } else {
        return LangJson["SHORT_BIO"].default;
      }
    },
    GET_ENTER_URL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ENTER_URL"]
      ) {
        return state.lang_details_data["ENTER_URL"];
      } else {
        return LangJson["ENTER_URL"].default;
      }
    },
    GET_LAST_COMPLETED_DEGREE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LAST_COMPLETED_DEGREE"]
      ) {
        return state.lang_details_data["LAST_COMPLETED_DEGREE"];
      } else {
        return LangJson["LAST_COMPLETED_DEGREE"].default;
      }
    },
    GET_EX_PYTHON_JAVA_PLEASE_PRESS_ENTER_AFTER_TYPING_EACH_SKILL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data[
          "EX_PYTHON_JAVA_PLEASE_PRESS_ENTER_AFTER_TYPING_EACH_SKILL"
        ]
      ) {
        return state.lang_details_data[
          "EX_PYTHON_JAVA_PLEASE_PRESS_ENTER_AFTER_TYPING_EACH_SKILL"
        ];
      } else {
        return LangJson[
          "EX_PYTHON_JAVA_PLEASE_PRESS_ENTER_AFTER_TYPING_EACH_SKILL"
        ].default;
      }
    },
    GET_MAX_200_CHARACTERS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["MAX_200_CHARACTERS"]
      ) {
        return state.lang_details_data["MAX_200_CHARACTERS"];
      } else {
        return LangJson["MAX_200_CHARACTERS"].default;
      }
    },
    GET_EX_PYTHON_JAVA(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EX_PYTHON_JAVA"]
      ) {
        return state.lang_details_data["EX_PYTHON_JAVA"];
      } else {
        return LangJson["EX_PYTHON_JAVA"].default;
      }
    },
    GET_EMPLOYEE_ID(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EMPLOYEE_ID"]
      ) {
        return state.lang_details_data["EMPLOYEE_ID"];
      } else {
        return LangJson["EMPLOYEE_ID"].default;
      }
    },
    GET_GITHUB(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["GITHUB"]
      ) {
        return state.lang_details_data["GITHUB"];
      } else {
        return LangJson["GITHUB"].default;
      }
    },
    GET_LINKED_IN(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LINKED_IN"]
      ) {
        return state.lang_details_data["LINKED_IN"];
      } else {
        return LangJson["LINKED_IN"].default;
      }
    },
    GET_FACEBOOK(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["FACEBOOK"]
      ) {
        return state.lang_details_data["FACEBOOK"];
      } else {
        return LangJson["FACEBOOK"].default;
      }
    },
    GET_PERSONAL_WEBSITE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PERSONAL_WEBSITE"]
      ) {
        return state.lang_details_data["PERSONAL_WEBSITE"];
      } else {
        return LangJson["PERSONAL_WEBSITE"].default;
      }
    },
    GET_GROUPS_AND_PERMISSIONS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["GROUPS_&_PERMISSIONS"]
      ) {
        return state.lang_details_data["GROUPS_&_PERMISSIONS"];
      } else {
        return LangJson["GROUPS_&_PERMISSIONS"].default;
      }
    },
    GET_SOCIAL_LINKS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SOCIAL_LINKS"]
      ) {
        return state.lang_details_data["SOCIAL_LINKS"];
      } else {
        return LangJson["SOCIAL_LINKS"].default;
      }
    },
    GET_GROUPS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["GROUPS"]
      ) {
        return state.lang_details_data["GROUPS"];
      } else {
        return LangJson["GROUPS"].default;
      }
    },
    GET_YES(state) {
      if (state && state.lang_details_data && state.lang_details_data["YES"]) {
        return state.lang_details_data["YES"];
      } else {
        return LangJson["YES"].default;
      }
    },
    GET_NO(state) {
      if (state && state.lang_details_data && state.lang_details_data["NO"]) {
        return state.lang_details_data["NO"];
      } else {
        return LangJson["NO"].default;
      }
    },
    GET_ENSURE_EACH_SKILL_HAS_NO_MORE_THAN_20_CHARACTERS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data[
          "ENSURE_EACH_SKILL_HAS_NO_MORE_THAN_20_CHARACTERS"
        ]
      ) {
        return state.lang_details_data[
          "ENSURE_EACH_SKILL_HAS_NO_MORE_THAN_20_CHARACTERS"
        ];
      } else {
        return LangJson["ENSURE_EACH_SKILL_HAS_NO_MORE_THAN_20_CHARACTERS"]
          .default;
      }
    },
    GET_MAX_CHARACTER_EXCEEDS_FOR_SHORT_BIO_PLEASE_REMOVE_ONE_CHARACTER(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data[
          "MAX_CHARACTER_EXCEEDS_FOR_SHORT_BIO_PLEASE_REMOVE_ONE_CHARACTER"
        ]
      ) {
        return state.lang_details_data[
          "MAX_CHARACTER_EXCEEDS_FOR_SHORT_BIO_PLEASE_REMOVE_ONE_CHARACTER"
        ];
      } else {
        return LangJson[
          "MAX_CHARACTER_EXCEEDS_FOR_SHORT_BIO_PLEASE_REMOVE_ONE_CHARACTER"
        ].default;
      }
    },

    // USER DETAILS
    GET_COMPANY_INFORMATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["COMPANY_INFORMATION"]
      ) {
        return state.lang_details_data["COMPANY_INFORMATION"];
      } else {
        return LangJson["COMPANY_INFORMATION"].default;
      }
    },
    GET_PERSONAL_INFORMATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PERSONAL_INFORMATION"]
      ) {
        return state.lang_details_data["PERSONAL_INFORMATION"];
      } else {
        return LangJson["PERSONAL_INFORMATION"].default;
      }
    },
    GET_SKILLS_AND_SHORTBIO(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SKILLS_&_SHORTBIO"]
      ) {
        return state.lang_details_data["SKILLS_&_SHORTBIO"];
      } else {
        return LangJson["SKILLS_&_SHORTBIO"].default;
      }
    },
    GET_PERMISSION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PERMISSION"]
      ) {
        return state.lang_details_data["PERMISSION"];
      } else {
        return LangJson["PERMISSION"].default;
      }
    },
    GET_SKILLS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SKILLS"]
      ) {
        return state.lang_details_data["SKILLS"];
      } else {
        return LangJson["SKILLS"].default;
      }
    },
    // PROFILE
    GET_MY(state) {
      if (state && state.lang_details_data && state.lang_details_data["MY"]) {
        return state.lang_details_data["MY"];
      } else {
        return LangJson["MY"].default;
      }
    },
    GET_CHANGE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CHANGE"]
      ) {
        return state.lang_details_data["CHANGE"];
      } else {
        return LangJson["CHANGE"].default;
      }
    },
    GET_IMAGE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["IMAGE"]
      ) {
        return state.lang_details_data["IMAGE"];
      } else {
        return LangJson["IMAGE"].default;
      }
    },
    GET_CHOOSE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CHOOSE"]
      ) {
        return state.lang_details_data["CHOOSE"];
      } else {
        return LangJson["CHOOSE"].default;
      }
    },
    // UPDATE PASS WORD
    GET_OLD(state) {
      if (state && state.lang_details_data && state.lang_details_data["OLD"]) {
        return state.lang_details_data["OLD"];
      } else {
        return LangJson["OLD"].default;
      }
    },
    // ALL ATTENDANCE RECORDS
    GET_ALL(state) {
      if (state && state.lang_details_data && state.lang_details_data["ALL"]) {
        return state.lang_details_data["ALL"];
      } else {
        return LangJson["ALL"].default;
      }
    },
    GET_RECORDS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["RECORDS"]
      ) {
        return state.lang_details_data["RECORDS"];
      } else {
        return LangJson["RECORDS"].default;
      }
    },
    GET_YEAR(state) {
      if (state && state.lang_details_data && state.lang_details_data["YEAR"]) {
        return state.lang_details_data["YEAR"];
      } else {
        return LangJson["YEAR"].default;
      }
    },
    GET_MONTH(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["MONTH"]
      ) {
        return state.lang_details_data["MONTH"];
      } else {
        return LangJson["MONTH"].default;
      }
    },
    // MONTH NAMES
    GET_TO_SEE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["TO_SEE"]
      ) {
        return state.lang_details_data["TO_SEE"];
      } else {
        return LangJson["TO_SEE"].default;
      }
    },
    GET_PLEASE_PERFORM_A_SEARCH(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PLEASE_PERFORM_A_SEARCH"]
      ) {
        return state.lang_details_data["PLEASE_PERFORM_A_SEARCH"];
      } else {
        return LangJson["PLEASE_PERFORM_A_SEARCH"].default;
      }
    },
    GET_JANUARY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["JANUARY"]
      ) {
        return state.lang_details_data["JANUARY"];
      } else {
        return LangJson["JANUARY"].default;
      }
    },
    GET_FEBRUARY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["FEBRUARY"]
      ) {
        return state.lang_details_data["FEBRUARY"];
      } else {
        return LangJson["FEBRUARY"].default;
      }
    },
    GET_MARCH(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["MARCH"]
      ) {
        return state.lang_details_data["MARCH"];
      } else {
        return LangJson["MARCH"].default;
      }
    },
    GET_APRIL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["APRIL"]
      ) {
        return state.lang_details_data["APRIL"];
      } else {
        return LangJson["APRIL"].default;
      }
    },
    GET_MAY(state) {
      if (state && state.lang_details_data && state.lang_details_data["MAY"]) {
        return state.lang_details_data["MAY"];
      } else {
        return LangJson["MAY"].default;
      }
    },
    GET_JUNE(state) {
      if (state && state.lang_details_data && state.lang_details_data["JUNE"]) {
        return state.lang_details_data["JUNE"];
      } else {
        return LangJson["JUNE"].default;
      }
    },
    GET_JULY(state) {
      if (state && state.lang_details_data && state.lang_details_data["JULY"]) {
        return state.lang_details_data["JULY"];
      } else {
        return LangJson["JULY"].default;
      }
    },
    GET_AUGUST(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["AUGUST"]
      ) {
        return state.lang_details_data["AUGUST"];
      } else {
        return LangJson["AUGUST"].default;
      }
    },
    GET_SEPTEMBER(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SEPTEMBER"]
      ) {
        return state.lang_details_data["SEPTEMBER"];
      } else {
        return LangJson["SEPTEMBER"].default;
      }
    },
    GET_OCTOBER(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["OCTOBER"]
      ) {
        return state.lang_details_data["OCTOBER"];
      } else {
        return LangJson["OCTOBER"].default;
      }
    },
    GET_NOVEMBER(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["NOVEMBER"]
      ) {
        return state.lang_details_data["NOVEMBER"];
      } else {
        return LangJson["NOVEMBER"].default;
      }
    },
    GET_DECEMBER(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DECEMBER"]
      ) {
        return state.lang_details_data["DECEMBER"];
      } else {
        return LangJson["DECEMBER"].default;
      }
    },

    // HOLIDAY
    GET_HOLIDAY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["HOLIDAY"]
      ) {
        return state.lang_details_data["HOLIDAY"];
      } else {
        return LangJson["HOLIDAY"].default;
      }
    },
    GET_PURPOSE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PURPOSE"]
      ) {
        return state.lang_details_data["PURPOSE"];
      } else {
        return LangJson["PURPOSE"].default;
      }
    },
    GET_TYPE(state) {
      if (state && state.lang_details_data && state.lang_details_data["TYPE"]) {
        return state.lang_details_data["TYPE"];
      } else {
        return LangJson["TYPE"].default;
      }
    },
    GET_PRIVATE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PRIVATE"]
      ) {
        return state.lang_details_data["PRIVATE"];
      } else {
        return LangJson["PRIVATE"].default;
      }
    },
    GET_PUBLIC(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PUBLIC"]
      ) {
        return state.lang_details_data["PUBLIC"];
      } else {
        return LangJson["PUBLIC"].default;
      }
    },
    GET_OTHERS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["OTHERS"]
      ) {
        return state.lang_details_data["OTHERS"];
      } else {
        return LangJson["OTHERS"].default;
      }
    },

    // BRANCH HOLIDAY
    GET_START(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["START"]
      ) {
        return state.lang_details_data["START"];
      } else {
        return LangJson["START"].default;
      }
    },
    GET_END(state) {
      if (state && state.lang_details_data && state.lang_details_data["END"]) {
        return state.lang_details_data["END"];
      } else {
        return LangJson["END"].default;
      }
    },
    GET_DAYS(state) {
      if (state && state.lang_details_data && state.lang_details_data["DAYS"]) {
        return state.lang_details_data["DAYS"];
      } else {
        return LangJson["DAYS"].default;
      }
    },
    // ADD ATTENDANCE
    GET_INFORMATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["INFORMATION"]
      ) {
        return state.lang_details_data["INFORMATION"];
      } else {
        return LangJson["INFORMATION"].default;
      }
    },
    // CREATE LEAVE TYPE
    GET_STATUS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["STATUS"]
      ) {
        return state.lang_details_data["STATUS"];
      } else {
        return LangJson["STATUS"].default;
      }
    },
    GET_LEAVE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LEAVE"]
      ) {
        return state.lang_details_data["LEAVE"];
      } else {
        return LangJson["LEAVE"].default;
      }
    },
    GET_DURATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DURATION"]
      ) {
        return state.lang_details_data["DURATION"];
      } else {
        return LangJson["DURATION"].default;
      }
    },
    GET_PAYABLE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PAYABLE"]
      ) {
        return state.lang_details_data["PAYABLE"];
      } else {
        return LangJson["PAYABLE"].default;
      }
    },
    GET_WAGES(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["WAGES"]
      ) {
        return state.lang_details_data["WAGES"];
      } else {
        return LangJson["WAGES"].default;
      }
    },
    GET_PAID(state) {
      if (state && state.lang_details_data && state.lang_details_data["PAID"]) {
        return state.lang_details_data["PAID"];
      } else {
        return LangJson["PAID"].default;
      }
    },
    GET_UNPAID(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["UNPAID"]
      ) {
        return state.lang_details_data["UNPAID"];
      } else {
        return LangJson["UNPAID"].default;
      }
    },
    // ADD LEAVE
    GET_DESCRIPTION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DESCRIPTION"]
      ) {
        return state.lang_details_data["DESCRIPTION"];
      } else {
        return LangJson["DESCRIPTION"].default;
      }
    },
    GET_REQUEST(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["REQUEST"]
      ) {
        return state.lang_details_data["REQUEST"];
      } else {
        return LangJson["REQUEST"].default;
      }
    },
    // UPDATE LEAVE
    GET_APPLICATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["APPLICATION"]
      ) {
        return state.lang_details_data["APPLICATION"];
      } else {
        return LangJson["APPLICATION"].default;
      }
    },
    GET_APPROVED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["APPROVED"]
      ) {
        return state.lang_details_data["APPROVED"];
      } else {
        return LangJson["APPROVED"].default;
      }
    },
    GET_APPLY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["APPLY"]
      ) {
        return state.lang_details_data["APPLY"];
      } else {
        return LangJson["APPLY"].default;
      }
    },
    GET_PENDING(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["PENDING"]
      ) {
        return state.lang_details_data["PENDING"];
      } else {
        return LangJson["PENDING"].default;
      }
    },
    GET_DECLINE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DECLINE"]
      ) {
        return state.lang_details_data["DECLINE"];
      } else {
        return LangJson["DECLINE"].default;
      }
    },
    GET_BY(state) {
      if (state && state.lang_details_data && state.lang_details_data["BY"]) {
        return state.lang_details_data["BY"];
      } else {
        return LangJson["BY"].default;
      }
    },
    //  All leaves
    GET_LEAVES(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LEAVES"]
      ) {
        return state.lang_details_data["LEAVES"];
      } else {
        return LangJson["LEAVES"].default;
      }
    },
    // leave details
    GET_APPOVE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["APPROVE"]
      ) {
        return state.lang_details_data["APPROVE"];
      } else {
        return LangJson["APPROVE"].default;
      }
    },
    // MY LEAVE HISTORY
    GET_HISTORY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["HISTORY"]
      ) {
        return state.lang_details_data["HISTORY"];
      } else {
        return LangJson["HISTORY"].default;
      }
    },
    GET_TAKEN(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["TAKEN"]
      ) {
        return state.lang_details_data["TAKEN"];
      } else {
        return LangJson["TAKEN"].default;
      }
    },
    GET_AVAILABLE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["AVAILABLE"]
      ) {
        return state.lang_details_data["AVAILABLE"];
      } else {
        return LangJson["AVAILABLE"].default;
      }
    },
    // CREATE RATING
    GET_RATING(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["RATING"]
      ) {
        return state.lang_details_data["RATING"];
      } else {
        return LangJson["RATING"].default;
      }
    },
    GET_ON(state) {
      if (state && state.lang_details_data && state.lang_details_data["ON"]) {
        return state.lang_details_data["ON"];
      } else {
        return LangJson["ON"].default;
      }
    },
    GET_OFF(state) {
      if (state && state.lang_details_data && state.lang_details_data["OFF"]) {
        return state.lang_details_data["OFF"];
      } else {
        return LangJson["OFF"].default;
      }
    },
    // RATING POINT
    GET_POINT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["POINT"]
      ) {
        return state.lang_details_data["POINT"];
      } else {
        return LangJson["POINT"].default;
      }
    },
    GET_VALUE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["VALUE"]
      ) {
        return state.lang_details_data["VALUE"];
      } else {
        return LangJson["VALUE"].default;
      }
    },
    // EVALUATION
    GET_GRAPH(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["GRAPH"]
      ) {
        return state.lang_details_data["GRAPH"];
      } else {
        return LangJson["GRAPH"].default;
      }
    },
    GET_EVALUATION(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EVALUATION"]
      ) {
        return state.lang_details_data["EVALUATION"];
      } else {
        return LangJson["EVALUATION"].default;
      }
    },
    // GET_EVALUATION(state) {
    //   if (state && state.lang_details_data && state.lang_details_data["EVALUATION"]) {
    //     return state.lang_details_data["EVALUATION"];
    //   } else {
    //     return LangJson["EVALUATION"].default;
    //   }
    // },
    GET_FILLED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["FILLED"]
      ) {
        return state.lang_details_data["FILLED"];
      } else {
        return LangJson["FILLED"].default;
      }
    },
    GET_RATINGS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["RATINGS"]
      ) {
        return state.lang_details_data["RATINGS"];
      } else {
        return LangJson["RATINGS"].default;
      }
    },
    GET_ADDITIONAL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ADDITIONAL"]
      ) {
        return state.lang_details_data["ADDITIONAL"];
      } else {
        return LangJson["ADDITIONAL"].default;
      }
    },
    GET_COMMENTS(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["COMMENTS"]
      ) {
        return state.lang_details_data["COMMENTS"];
      } else {
        return LangJson["COMMENTS"].default;
      }
    },

    GET_EXPORT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["EXPORT"]
      ) {
        return state.lang_details_data["EXPORT"];
      } else {
        return LangJson["EXPORT"].default;
      }
    },
    GET_CURRENT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CURRENT"]
      ) {
        return state.lang_details_data["CURRENT"];
      } else {
        return LangJson["CURRENT"].default;
      }
    },
    GET_Required_fields_message(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["Required_fields_message"]
      ) {
        return state.lang_details_data["Required_fields_message"];
      } else {
        return LangJson["Required_fields_message"].default;
      }
    },
    GET_AVERAGE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["AVERAGE"]
      ) {
        return state.lang_details_data["AVERAGE"];
      } else {
        return LangJson["AVERAGE"].default;
      }
    },
    GET_INDIVIDUAL(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["INDIVIDUAL"]
      ) {
        return state.lang_details_data["INDIVIDUAL"];
      } else {
        return LangJson["INDIVIDUAL"].default;
      }
    },
    GET_DATA(state) {
      if (state && state.lang_details_data && state.lang_details_data["DATA"]) {
        return state.lang_details_data["DATA"];
      } else {
        return LangJson["DATA"].default;
      }
    },
    GET_FOUND(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["FOUND"]
      ) {
        return state.lang_details_data["FOUND"];
      } else {
        return LangJson["FOUND"].default;
      }
    },

    // side bar
    GET_BASE(state) {
      if (state && state.lang_details_data && state.lang_details_data["BASE"]) {
        return state.lang_details_data["BASE"];
      } else {
        return LangJson["BASE"].default;
      }
    },
    GET_RECORD(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["RECORD"]
      ) {
        return state.lang_details_data["RECORD"];
      } else {
        return LangJson["RECORD"].default;
      }
    },
    GET_MULTILANG(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["MULTILANG"]
      ) {
        return state.lang_details_data["MULTILANG"];
      } else {
        return LangJson["MULTILANG"].default;
      }
    },
    GET_LANGUAGE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LANGUAGE"]
      ) {
        return state.lang_details_data["LANGUAGE"];
      } else {
        return LangJson["LANGUAGE"].default;
      }
    },

    // Add new notice
    GET_NOTICES(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["NOTICES"]
      ) {
        return state.lang_details_data["NOTICES"];
      } else {
        return LangJson["NOTICES"].default;
      }
    },
    GET_TITLE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["TITLE"]
      ) {
        return state.lang_details_data["TITLE"];
      } else {
        return LangJson["TITLE"].default;
      }
    },
    GET_WHOM(state) {
      if (state && state.lang_details_data && state.lang_details_data["WHOM"]) {
        return state.lang_details_data["WHOM"];
      } else {
        return LangJson["WHOM"].default;
      }
    },
    GET_TO(state) {
      if (state && state.lang_details_data && state.lang_details_data["TO"]) {
        return state.lang_details_data["TO"];
      } else {
        return LangJson["TO"].default;
      }
    },
    // NOTICE DETAILS COMMENT
    GET_COMMENT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["COMMENT"]
      ) {
        return state.lang_details_data["COMMENT"];
      } else {
        return LangJson["COMMENT"].default;
      }
    },
    GET_POST(state) {
      if (state && state.lang_details_data && state.lang_details_data["POST"]) {
        return state.lang_details_data["POST"];
      } else {
        return LangJson["POST"].default;
      }
    },
    //  ADD NEW LANGUAGE
    GET_LANGUAGES(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["LANGUAGES"]
      ) {
        return state.lang_details_data["LANGUAGES"];
      } else {
        return LangJson["LANGUAGES"].default;
      }
    },
    // All languages
    GET_UPDATED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["UPDATED"]
      ) {
        return state.lang_details_data["UPDATED"];
      } else {
        return LangJson["UPDATED"].default;
      }
    },
    // SWAL MESSAGE CREATE USER
    GET_SUCCESSFULLY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SUCCESSFULLY"]
      ) {
        return state.lang_details_data["SUCCESSFULLY"];
      } else {
        return LangJson["SUCCESSFULLY"].default;
      }
    },
    GET_CANCELLED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CANCELLED"]
      ) {
        return state.lang_details_data["CANCELLED"];
      } else {
        return LangJson["CANCELLED"].default;
      }
    },
    GET_NOT(state) {
      if (state && state.lang_details_data && state.lang_details_data["NOT"]) {
        return state.lang_details_data["NOT"];
      } else {
        return LangJson["NOT"].default;
      }
    },
    GET_ARE_YOU_SURE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ARE_YOU_SURE_?"]
      ) {
        return state.lang_details_data["ARE_YOU_SURE_?"];
      } else {
        return LangJson["ARE_YOU_SURE_?"].default;
      }
    },
    GET_YES_DELETE_IT(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["YES_DELETE_IT_!"]
      ) {
        return state.lang_details_data["YES_DELETE_IT_!"];
      } else {
        return LangJson["YES_DELETE_IT_!"].default;
      }
    },
    GET_ALERT_MESSAGE_BEFORE_DELETE(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ALERT_MESSAGE_BEFORE_DELETE"]
      ) {
        return state.lang_details_data["ALERT_MESSAGE_BEFORE_DELETE"];
      } else {
        return LangJson["ALERT_MESSAGE_BEFORE_DELETE"].default;
      }
    },
    // swal meeeage
    GET_CREATED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CREATED"]
      ) {
        return state.lang_details_data["CREATED"];
      } else {
        return LangJson["CREATED"].default;
      }
    },
    GET_DELETED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["DELETED"]
      ) {
        return state.lang_details_data["DELETED"];
      } else {
        return LangJson["DELETED"].default;
      }
    },
    GET_SORRY(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["SORRY"]
      ) {
        return state.lang_details_data["SORRY"];
      } else {
        return LangJson["SORRY"].default;
      }
    },
    GET_YOU_CAN_NOT_DELETE_YOURSELF(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["YOU_CAN_NOT_DELETE_YOURSELF_!"]
      ) {
        return state.lang_details_data["YOU_CAN_NOT_DELETE_YOURSELF_!"];
      } else {
        return LangJson["YOU_CAN_NOT_DELETE_YOURSELF_!"].default;
      }
    },
    GET_CHANGED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["CHANGED"]
      ) {
        return state.lang_details_data["CHANGED"];
      } else {
        return LangJson["CHANGED"].default;
      }
    },
    GET_ADDED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["ADDED"]
      ) {
        return state.lang_details_data["ADDED"];
      } else {
        return LangJson["ADDED"].default;
      }
    },
    GET_POSTED(state) {
      if (
        state &&
        state.lang_details_data &&
        state.lang_details_data["POSTED"]
      ) {
        return state.lang_details_data["POSTED"];
      } else {
        return LangJson["POSTED"].default;
      }
    },
    // Attendance entry
    GET_H(state) {
      if (state && state.lang_details_data && state.lang_details_data["H"]) {
        return state.lang_details_data["H"];
      } else {
        return LangJson["H"].default;
      }
    },
  },
});

export default store;
