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

export default function Authors() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const types = useRef(null);
  const foundational = useRef(null);
  const research = useRef(null);
  const review = useRef(null);
  const theoretical = useRef(null);

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
          name: 'Foundational',
          ref: foundational,
        },
        {
          name: 'Research',
          ref: research,
        },
        {
          name: 'Review',
          ref: review,
        },
        {
          name: 'Theoretical',
          ref: theoretical,
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
        <SubHeader ref={types} style={{ marginTop: '2rem' }}>
          Types
        </SubHeader>
        <ItemHeader ref={foundational}>Foundational</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={research}>Research</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={review}>Review</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={theoretical}>Theoretical</ItemHeader>
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
