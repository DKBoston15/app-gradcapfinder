import { collatedTasks } from "../constants";

export const camelCase = (str: string) => {
  //@ts-ignore
  return str.replace(/\S*/g, function (word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getTitle = (projects: any, projectId: any) =>
  // @ts-ignore
  projects.find((project) => project.projectId === projectId);

export const getCollatedTitle = (projects: any, key: any) =>
  // @ts-ignore
  projects.find((project) => project.key === key);

// @ts-ignore
export const collatedTasksExist = (selectedProject) =>
  collatedTasks.find((task) => task.key === selectedProject);

export const generatePushId = (() => {
  const PUSH_CHARS =
    "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

  const lastRandChars: any = [];

  return function () {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join("");

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();
