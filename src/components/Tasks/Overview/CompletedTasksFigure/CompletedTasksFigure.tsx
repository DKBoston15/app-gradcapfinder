import React, { useEffect, useState } from 'react';
import { GridItem, FigureContainer, RangeContainer, RangeLabel, Title } from './styles';
import { ResponsiveLine } from '@nivo/line';
import { useEntryFeedStore } from '@app/stores/entryFeedStore';
import { Calendar } from 'primereact/calendar';
import { parse, isWithinInterval } from 'date-fns';

export default function CompletedTasksFigure() {
  const getTasks = useEntryFeedStore((state: any) => state.getTasks);
  const [lineData, setLineData] = useState([]);
  const [dates2, setDates2] = useState<Date | Date[] | undefined>(undefined);
  const lineFigureDataGenerator = async (completedTasks: any) => {
    const tasksData = [];
    for (let task = 0; task < completedTasks.length; task++) {
      tasksData.push({ x: completedTasks[task].completed_date, y: 1 });
    }
    const countDict = tasksData.reduce((acc, curr) => {
      const { x } = curr;
      if (acc[x]) ++acc[x];
      else acc[x] = 1;
      return acc;
    }, {});

    const result = tasksData.map((obj) => {
      obj['count'] = countDict[obj.x];
      return obj;
    });

    let newData = [...new Set(result.map((d) => d.x))].map((x) => {
      return {
        x,
        y: result.filter((d) => d.x === x).map((d) => d.count),
      };
    });

    for (let i = 0; i < newData.length; i++) {
      newData[i].y = newData[i].y[0];
    }

    newData = newData.sort((a: any, b: any) => (b.x > a.x ? -1 : 1));

    return newData;
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getTasks();
      const completedTasks = data.filter((task) => task.completed_date !== null);
      if (dates2) {
        if (dates2[1] != null) {
          const newData = [];
          for (let i = 0; i < completedTasks.length; i++) {
            const inRange = isWithinInterval(
              parse(completedTasks[i].completed_date, 'yyyy-MM-dd', new Date()),
              { start: dates2[0], end: dates2[1] },
            );
            if (inRange) {
              newData.push(completedTasks[i]);
            }
          }
          const formattedData = await lineFigureDataGenerator(newData);
          setLineData([
            {
              id: 'Task Count Over Time',
              color: 'hsl(214, 99%, 57%)',
              data: formattedData,
            },
          ]);
        }
      } else if (lineData.length === 0) {
        const formattedData = await lineFigureDataGenerator(completedTasks);
        const date1 = parse(formattedData[0].x, 'yyyy-MM-dd', new Date());
        const date2 = parse(formattedData[formattedData.length - 1].x, 'yyyy-MM-dd', new Date());
        setDates2([date1, date2]);
      }
    };
    getData();
  }, [dates2]);

  const MyResponsiveLine = ({ data }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 100 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Task Count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors="hsl(214, 99%, 57%)"
      lineWidth={2}
      pointSize={3}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );

  return (
    <GridItem>
      <RangeContainer>
        <Title>Task Completion Over Time</Title>
        <div>
          <RangeLabel htmlFor="range">Date Range</RangeLabel>
          <Calendar
            id="range"
            value={dates2}
            onChange={(e) => setDates2(e.value)}
            selectionMode="range"
            readOnlyInput
          />
        </div>
      </RangeContainer>
      <FigureContainer>
        <MyResponsiveLine data={lineData} />
      </FigureContainer>
    </GridItem>
  );
}
