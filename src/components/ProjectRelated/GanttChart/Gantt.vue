<template>
  <div ref="gantt"></div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
// import "../VueGantt/data";
// import "./data.json"
export default {
  name: "gantt",
  props: {
    maintasks: {
      type: Object,
      default() {
        return { data: [], links: [] };
      },
    },
  },
  // props: ["maintasks"],
  components: {},
  data() {
    return {
      data: {
        tasks: [
          { id: 1, text: "Project #1", start_date: "01-04-2020", duration: 4 },
          { id: 4, text: "Project #2", start_date: "01-04-2020", duration: 4 },
          {
            id: 2,
            text: "Task #1",
            start_date: "02-04-2020",
            duration: 8,
            parent: 1,
          },
          {
            id: 3,
            text: "Task #2",
            start_date: "11-04-2020",
            duration: 8,
            parent: 1,
          },
        ],
        links: [{ id: 1, source: 1, target: 4, type: 2 }],
        // response_demo: [
        //   {
        //     id: 1,
        //     text: "Designation CRUD",
        //     start_date: "2021-05-05",
        //     end_date: "2021-05-07",
        //   },
        // ],
      },
    };
  },
  created() {
    // console.log("44", this.$route.query.task_id);
    // console.log("101", this.$props.maintasks.data.length);
    // console.log("103", this.$props.links);
    this.loadGanttChart();
    // this.$props.maintasks = [];
  },
  updated() {
    // this.loadGanttChart();
  },
  methods: {
    loadGanttChart() {
      gantt.config.date_format = "%Y-%m-%d";
      gantt.config.columns = [
        {
          name: "text",
          label: "Title",
          tree: true,
          width: 200,
          resize: true,
          align: "left",
        },
        { name: "duration", label: "Duration", width: "70", align: "center" },
      ];
      gantt.init(this.$refs.gantt);
      gantt.parse(this.$props.maintasks);
      // gantt.parse(this.data);
    },
  },

  mounted: function () {
    this.loadGanttChart();
  },
};
</script>

<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
/* new css for progress */
.gantt_task_content {
  background: red !important;
}
</style>