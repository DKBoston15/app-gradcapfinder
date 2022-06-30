import React, { useEffect, useState } from 'react';
import { GridItem, FigureContainer, NoDataContainer, SubFigureContainer } from './styles';
import useTaskStore from '@app/stores/tasksv2Store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGeneralStore } from '@app/stores/generalStore';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Tasks Completed Over Time',
    },
  },
};

export default function CompletedTasksFigure() {
  const [noData, setNoData] = useState(false);
  const todos = useTaskStore((state: any) => state.todos);
  const [data, setData] = useState();
  const navVisible = useGeneralStore((state: any) => state.navVisible);

  useEffect(() => {
    const completedTodos = todos.filter(
      (todo) => todo.completed_at != null && todo.completed_at != undefined,
    );
    if (completedTodos.length > 0) {
      const count = completedTodos.map((todo) => {
        return todo.completed_at.slice(0, 10);
      });
      const sortedCount = count.sort();
      const occurrences = {};
      for (var i = 0, j = sortedCount.length; i < j; i++) {
        occurrences[sortedCount[i]] = (occurrences[sortedCount[i]] || 0) + 1;
      }
      const labels = Object.keys(occurrences);
      const dataSet = Object.values(occurrences);
      setData({
        labels,
        datasets: [
          {
            label: 'Tasks Completed Over Time',
            data: dataSet,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    } else {
      setNoData(true);
    }
  }, [todos, navVisible]);

  return (
    <GridItem className="taskCompletion" navVisible={navVisible}>
      <FigureContainer navVisible={navVisible}>
        {!noData && data && (
          <SubFigureContainer navVisible={navVisible}>
            <Line options={options} data={data} />
          </SubFigureContainer>
        )}
        {noData && (
          <NoDataContainer>Check back after you've completed a few tasks!</NoDataContainer>
        )}
      </FigureContainer>
    </GridItem>
  );
}
