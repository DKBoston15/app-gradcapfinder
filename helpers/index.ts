import { collatedTasks } from "../constants";

export const collatedTasksExist: any = (selectedProject: any) =>
  collatedTasksExist.find((task: any) => task.key === selectedProject);
