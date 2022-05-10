import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';
import {
  Container,
  Page,
  SubHeader,
  ItemHeader,
  Paragraph,
  CustomDivider,
} from './LearnComponents/learn.styles';
import Video from './LearnComponents/Video/Video';

const video = {
  id: 1,
  name: 'Identifying Questions',
  thumbnail: 'https://img.youtube.com/vi/aRV2WnD5sxY/mqdefault.jpg',
  date: '10/24/2019',
  time: '47:51',
  url: 'https://youtu.be/aRV2WnD5sxY?t=1160',
};

export default function Questions() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const types = useRef(null);
  const comparative = useRef(null);
  const descriptive = useRef(null);
  const exploratory = useRef(null);
  const explanatory = useRef(null);
  const interpretative = useRef(null);
  const predictive = useRef(null);
  const relationship = useRef(null);

  const toc = [
    {
      name: 'Definition',
      ref: definition,
    },
    {
      name: 'Purpose',
      ref: purpose,
    },
    {
      name: 'Types',
      ref: types,
      sections: [
        {
          name: 'Comparative',
          ref: comparative,
        },
        {
          name: 'Descriptive',
          ref: descriptive,
        },
        {
          name: 'Exploratory',
          ref: exploratory,
        },
        {
          name: 'Explanatory',
          ref: explanatory,
        },
        {
          name: 'Interpretative',
          ref: interpretative,
        },
        {
          name: 'Predictive',
          ref: predictive,
        },
        {
          name: 'Relationship',
          ref: relationship,
        },
      ],
    },
  ];

  return (
    <Container>
      <Page>
        <SubHeader ref={definition}>Definition</SubHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <CustomDivider />
        <Video video={video} />
        <SubHeader ref={types} style={{ marginTop: '2rem' }}>
          Types
        </SubHeader>
        <ItemHeader ref={comparative}>Comparative</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={descriptive}>Descriptive</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={exploratory}>Exploratory</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={explanatory}>Explanatory</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={interpretative}>Interpretative</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={predictive}>Predictive</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={relationship}>Relationship</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
