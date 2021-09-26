import { collatedTasks } from "../constants";

export const collatedTasksExist: any = (selectedProject: any) =>
  collatedTasks.find((task: any) => task.key === selectedProject);
