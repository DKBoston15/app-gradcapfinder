import React from "react";
import { format, addDays } from "date-fns";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from "react-icons/fa";
export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }: any) =>
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(format(new Date(), "MM/dd/yyyy"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate(format(new Date(), "MM/dd/yyyy"));
              }
            }}
            data-testid="task-date-today"
            tabIndex={0}
            aria-label="Select today as the task date"
            role="button"
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              //   @ts-ignore
              setTaskDate(addDays(format(new Date(), "MM/dd/yyyy"), 1));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                //   @ts-ignore
                setTaskDate(addDays(format(new Date(), "MM/dd/yyyy"), 1));
              }
            }}
            data-testid="task-date-tomorrow"
            role="button"
            tabIndex={0}
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              //   @ts-ignore
              setTaskDate(addDays(format(new Date(), "MM/dd/yyyy"), 7));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                //   @ts-ignore
                setTaskDate(addDays(format(new Date(), "MM/dd/yyyy"), 7));
              }
            }}
            data-testid="task-date-next-week"
            aria-label="Select next week as the task date"
            tabIndex={0}
            role="button"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
      </ul>
    </div>
  );
