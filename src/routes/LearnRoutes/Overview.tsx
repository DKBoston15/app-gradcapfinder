import {
  Container,
  Card,
  Header,
  SubHeader,
  CarouselContainer,
  PageHeader,
} from './RouteStyles/overview.styles';
import { Carousel } from 'primereact/carousel';
import React from 'react';
import ReactPlayer from 'react-player/youtube';

export default function Overview() {
  const videoList = {
    Identifying: {
      info: {
        name: 'Identifying',
        videoCount: 3,
        date: '10/01/2021',
        image:
          'https://res.cloudinary.com/gradcapfinder/image/upload/v1633307193/Youtube%20Thumbnails/Identifying_Live_Recorded_Sessions_Youtube_Thumbnail_cbqge3.jpg',
      },
      videos: [
        {
          id: 1,
          name: 'Identifying Questions',
          thumbnail: 'https://img.youtube.com/vi/aRV2WnD5sxY/mqdefault.jpg',
          date: '10/24/2019',
          time: '47:51',
          url: 'https://www.youtube.com/embed/aRV2WnD5sxY',
        },
        {
          id: 2,
          name: 'Identifying Your Space',
          thumbnail: 'https://img.youtube.com/vi/0EjXMAwLCPk/mqdefault.jpg',
          date: '10/30/2019',
          time: '26:58',
          url: 'https://www.youtube.com/embed/0EjXMAwLCPk',
        },
        {
          id: 3,
          name: 'Identifying Literature',
          thumbnail: 'https://img.youtube.com/vi/E9iY0uyptvI/mqdefault.jpg',
          date: '11/07/2019',
          time: '32:46',
          url: 'https://www.youtube.com/embed/E9iY0uyptvI',
        },
      ],
    },
    Selecting: {
      info: {
        name: 'Selecting',
        videoCount: 3,
        date: '10/01/2021',
        image:
          'https://res.cloudinary.com/gradcapfinder/image/upload/v1633307375/Youtube%20Thumbnails/Selecting_Live_Recorded_Sessions_Youtube_Thumbnail_hx4y9e.jpg',
      },
      videos: [
        {
          id: 1,
          name: 'Selecting Mentors & Partners',
          thumbnail: 'https://img.youtube.com/vi/ddyLFQCes3I/mqdefault.jpg',
          date: '12/8/2019',
          time: '44:15',
          url: 'https://www.youtube.com/embed/ddyLFQCes3I',
        },
        {
          id: 2,
          name: 'Selecting Research Methods',
          thumbnail: 'https://img.youtube.com/vi/oSzOae3m-mA/mqdefault.jpg',
          date: '12/8/2019',
          time: '40:12',
          url: 'https://www.youtube.com/embed/oSzOae3m-mA',
        },
        {
          id: 3,
          name: 'Selecting Journals',
          thumbnail: 'https://img.youtube.com/vi/66H9BuX2PHc/mqdefault.jpg',
          date: '01/04/2020',
          time: '34:58',
          url: 'https://www.youtube.com/embed/66H9BuX2PHc',
        },
      ],
    },
    Interpreting: {
      info: {
        name: 'Interpreting',
        videoCount: 3,
        date: '10/01/2021',
        image:
          'https://res.cloudinary.com/gradcapfinder/image/upload/v1633307378/Youtube%20Thumbnails/Interpreting_Live_Recorded_Sessions_Youtube_Thumbnail_fkypsc.jpg',
      },
      videos: [
        {
          id: 1,
          name: 'Interpreting Research Results',
          thumbnail: 'https://img.youtube.com/vi/fuQJmhpLOyE/mqdefault.jpg',
          date: '01/20/2020',
          time: '25:09',
          url: 'https://www.youtube.com/embed/fuQJmhpLOyE',
        },
        {
          id: 2,
          name: 'Interpreting University Expectations',
          thumbnail: 'https://img.youtube.com/vi/VNKPjDXyAY8/mqdefault.jpg',
          date: '01/23/2020',
          time: '22:46',
          url: 'https://www.youtube.com/embed/VNKPjDXyAY8',
        },
        {
          id: 3,
          name: 'Interpreting Academic Language',
          thumbnail: 'https://img.youtube.com/vi/5rKIFV-0Kic/mqdefault.jpg',
          date: '01/29/2020',
          time: '32:14',
          url: 'https://www.youtube.com/embed/5rKIFV-0Kic',
        },
      ],
    },
    Designing: {
      info: {
        name: 'Designing',
        videoCount: 3,
        date: '10/01/2021',
        image:
          'https://res.cloudinary.com/gradcapfinder/image/upload/v1633307382/Youtube%20Thumbnails/Designing_Live_Recorded_Sessions_Youtube_Thumbnail_yr3ioc.jpg',
      },
      videos: [
        {
          id: 1,
          name: 'Designing Tables and Figures',
          thumbnail: 'https://img.youtube.com/vi/DAuqnf4W0d0/mqdefault.jpg',
          date: '02/08/2020',
          time: '24:55',
          url: 'https://www.youtube.com/embed/DAuqnf4W0d0',
        },
        {
          id: 2,
          name: 'Designing Tables and Figures Pt. 2',
          thumbnail: 'https://img.youtube.com/vi/zS5vrnOHyXo/mqdefault.jpg',
          date: '02/14/2020',
          time: '44:09',
          url: 'https://www.youtube.com/embed/zS5vrnOHyXo',
        },
        {
          id: 3,
          name: 'Designing Work-Life Schedules',
          thumbnail: 'https://img.youtube.com/vi/5Tk9KpUUP7Y/mqdefault.jpg',
          date: '02/28/2020',
          time: '26:56',
          url: 'https://www.youtube.com/embed/5Tk9KpUUP7Y',
        },
      ],
    },
  };
  const identifyingList = [
    {
      id: 1,
      name: 'Identifying Questions',
      thumbnail: 'https://img.youtube.com/vi/aRV2WnD5sxY/mqdefault.jpg',
      date: '10/24/2019',
      time: '47:51',
      url: 'https://www.youtube.com/embed/aRV2WnD5sxY',
    },
    {
      id: 2,
      name: 'Identifying Your Space',
      thumbnail: 'https://img.youtube.com/vi/0EjXMAwLCPk/mqdefault.jpg',
      date: '10/30/2019',
      time: '26:58',
      url: 'https://www.youtube.com/embed/0EjXMAwLCPk',
    },
    {
      id: 3,
      name: 'Identifying Literature',
      thumbnail: 'https://img.youtube.com/vi/E9iY0uyptvI/mqdefault.jpg',
      date: '11/07/2019',
      time: '32:46',
      url: 'https://www.youtube.com/embed/E9iY0uyptvI',
    },
  ];
  const selectingList = [
    {
      id: 1,
      name: 'Selecting Mentors & Partners',
      thumbnail: 'https://img.youtube.com/vi/ddyLFQCes3I/mqdefault.jpg',
      date: '12/8/2019',
      time: '44:15',
      url: 'https://www.youtube.com/embed/ddyLFQCes3I',
    },
    {
      id: 2,
      name: 'Selecting Research Methods',
      thumbnail: 'https://img.youtube.com/vi/oSzOae3m-mA/mqdefault.jpg',
      date: '12/8/2019',
      time: '40:12',
      url: 'https://www.youtube.com/embed/oSzOae3m-mA',
    },
    {
      id: 3,
      name: 'Selecting Journals',
      thumbnail: 'https://img.youtube.com/vi/66H9BuX2PHc/mqdefault.jpg',
      date: '01/04/2020',
      time: '34:58',
      url: 'https://www.youtube.com/embed/66H9BuX2PHc',
    },
  ];
  const interpretingList = [
    {
      id: 1,
      name: 'Interpreting Research Results',
      thumbnail: 'https://img.youtube.com/vi/fuQJmhpLOyE/mqdefault.jpg',
      date: '01/20/2020',
      time: '25:09',
      url: 'https://www.youtube.com/embed/fuQJmhpLOyE',
    },
    {
      id: 2,
      name: 'Interpreting University Expectations',
      thumbnail: 'https://img.youtube.com/vi/VNKPjDXyAY8/mqdefault.jpg',
      date: '01/23/2020',
      time: '22:46',
      url: 'https://www.youtube.com/embed/VNKPjDXyAY8',
    },
    {
      id: 3,
      name: 'Interpreting Academic Language',
      thumbnail: 'https://img.youtube.com/vi/5rKIFV-0Kic/mqdefault.jpg',
      date: '01/29/2020',
      time: '32:14',
      url: 'https://www.youtube.com/embed/5rKIFV-0Kic',
    },
  ];
  const designingList = [
    {
      id: 1,
      name: 'Designing Tables and Figures',
      thumbnail: 'https://img.youtube.com/vi/DAuqnf4W0d0/mqdefault.jpg',
      date: '02/08/2020',
      time: '24:55',
      url: 'https://www.youtube.com/embed/DAuqnf4W0d0',
    },
    {
      id: 2,
      name: 'Designing Tables and Figures Pt. 2',
      thumbnail: 'https://img.youtube.com/vi/zS5vrnOHyXo/mqdefault.jpg',
      date: '02/14/2020',
      time: '44:09',
      url: 'https://www.youtube.com/embed/zS5vrnOHyXo',
    },
    {
      id: 3,
      name: 'Designing Work-Life Schedules',
      thumbnail: 'https://img.youtube.com/vi/5Tk9KpUUP7Y/mqdefault.jpg',
      date: '02/28/2020',
      time: '26:56',
      url: 'https://www.youtube.com/embed/5Tk9KpUUP7Y',
    },
  ];

  const videoTemplate = (video: any) => (
    <Card>
      <ReactPlayer url={video.url} width="100%" height="100%" />
    </Card>
  );

  return (
    <Container>
      <PageHeader>Overview</PageHeader>
      <CarouselContainer>
        <div className="card">
          <Carousel
            value={identifyingList}
            itemTemplate={videoTemplate}
            header={
              <>
                <Header>Identifying Series</Header>
                <SubHeader>
                  diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor
                  elit sed vulputate
                </SubHeader>
              </>
            }
            numVisible={3}
            numScroll={0}
          />
        </div>
      </CarouselContainer>
      <CarouselContainer>
        <div className="card">
          <Carousel
            value={selectingList}
            itemTemplate={videoTemplate}
            header={
              <>
                <Header>Selecting Series</Header>
                <SubHeader>
                  diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor
                  elit sed vulputate
                </SubHeader>
              </>
            }
            numVisible={3}
            numScroll={0}
          />
        </div>
      </CarouselContainer>
      <CarouselContainer>
        <div className="card">
          <Carousel
            value={interpretingList}
            itemTemplate={videoTemplate}
            header={
              <>
                <Header>Interpreting Series</Header>
                <SubHeader>
                  diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor
                  elit sed vulputate
                </SubHeader>
              </>
            }
            numVisible={3}
            numScroll={0}
          />
        </div>
      </CarouselContainer>
      <CarouselContainer>
        <div className="card">
          <Carousel
            value={designingList}
            itemTemplate={videoTemplate}
            header={
              <>
                <Header>Designing Series</Header>
                <SubHeader>
                  diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor
                  elit sed vulputate
                </SubHeader>
              </>
            }
            numVisible={3}
            numScroll={0}
          />
        </div>
      </CarouselContainer>
    </Container>
  );
}
