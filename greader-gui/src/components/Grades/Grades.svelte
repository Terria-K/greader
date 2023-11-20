<script>
  import { activities } from "../../composables/activityStore";
  import GradeComponent from "./GradeComponent.svelte";

</script>
<div class="grades">
  <div class="component-lists">
    <GradeComponent subject="Computer Programming" activities={$activities}/>
    <GradeComponent subject="Platform Technology" activities={
      [{ id: "", name: "Quiz 1", score: 94.4 }, { id:"", name: "Activity 1", score: 89.4 }, { id:"", name: "Quiz 2", score: 89.4 },
      { id:"", name: "Activity 2", score: 90.0},
      { id:"", name: "Activity 2", score: 90.0},
      { id:"", name: "Activity 2", score: 90.0},
      { id:"", name: "Activity 2", score: 90.0},
      { id:"", name: "Activity 2", score: 90.0},
      { id:"", name: "Activity 2", score: 90.0},
    ]
    }/>
    <GradeComponent subject="Introduction to Computing" activities={
      [{ id: "", name: "Quiz 1", score: 94.4 }, { id:"", name: "Activity 1", score: 89.4 }, { id:"", name: "Quiz 2", score: 89.4 },
      { id:"", name: "Activity 2", score: 98.0},
      { id:"", name: "Exam", score: 90.0},
    ]
    }/>
  </div>

</div>

<style>
.grades {
  padding: 66px 16px;
  display: flex;
  justify-content: center;
}

.component-lists {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>