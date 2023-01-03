// {
//   "tasks";[
//       {"id":"1", "text":"Project #2", "start_date":"01-04-2020", "duration":18,
//           "progress":0.4, "open": true},
//       {"id":"2", "text":"Task #1", "start_date":"02-04-2020", "duration":8,
//           "progress":0.6, "parent":"1"},
//       {"id":"3", "text":"Task #2", "start_date":"11-04-2020", "duration":8,
//           "progress":0.6, "parent":"1"}
//   ],
//   "links";[
//       {"id":"1", "source":"1", "target":"2", "type":"1"},
//       {"id":"2", "source":"2", "target":"3", "type":"0"},
//       {"id":"3", "source":"3", "target":"4", "type":"0"},
//       {"id":"4", "source":"2", "target":"5", "type":"2"}
//   ]
// }




const scales = [
  { unit: "month", step: 1, format: "MMMM yyy" },
  { unit: "day", step: 1, format: "d" },
];

const columns = [
  { name: "text", label: "Task name", width: "100%" },
  { name: "start", label: "Start time", align: "center" },
  { name: "duration", label: "Duration", width: "70px", align: "center" },
  { name: "add-task", label: "", width: "50px", align: "center" },
];

const tasks = [
  {
    id: 1,
    open: true,
    start_date: "2020-11-06",
    duration: 8,
    text: "React Gantt Widget",
    progress: 60,
    type: "project",
  },
  {
    id: 2,
    parent: 1,
    start_date: "2020-11-06",
    duration: 4,
    text: "Lib-Gantt",
    progress: 80,
  },
  {
    id: 3,
    parent: 1,
    start_date: "2020-11-08",
    duration: 4,
    text: "UI Layer",
    progress: 30,
  },
  {
    id: 4,
    start_date: "2020-11-07",
    duration: 8,
    text: "Documentation",
    progress: 10,
    type: "project",
  },
  {
    id: 5,
    parent: 4,
    start_date: "2020-11-07",
    duration: 1,
    text: "Overview",
    progress: 30,
  },
  {
    id: 6,
    parent: 4,
    start_date: "2020-11-07",
    duration: 8,
    text: "API reference",
    progress: 0,
  },
];

const links = [
  { source: 2, target: 3, type: 0 },
  { source: 1, target: 4, type: 1 },
  { source: 5, target: 6, type: 2 },
];

export { scales, columns, tasks, links };
