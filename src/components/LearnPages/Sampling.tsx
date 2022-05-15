import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';
import {
  Container,
  Page,
  SubHeader,
  ItemHeader,
  Paragraph,
  CustomDivider,
  NestedSection,
} from './LearnComponents/learn.styles';

export default function Sampling() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const types = useRef(null);
  const probability = useRef(null);
  const simple = useRef(null);
  const cluster = useRef(null);
  const stratified = useRef(null);
  const nonProbability = useRef(null);
  const convenience = useRef(null);
  const purposive = useRef(null);
  const snowBall = useRef(null);

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
          name: 'Probability',
          ref: probability,
          sections: [
            {
              name: 'Simple',
              ref: simple,
            },
            {
              name: 'Cluster',
              ref: cluster,
            },
            {
              name: 'Stratified',
              ref: stratified,
            },
          ],
        },
        {
          name: 'Non-Probability',
          ref: nonProbability,
          sections: [
            {
              name: 'Convenience',
              ref: convenience,
            },
            {
              name: 'Purposive',
              ref: purposive,
            },
            {
              name: 'Snow Ball',
              ref: snowBall,
            },
          ],
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
        <ItemHeader ref={probability}>Probability</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={simple}>Simple</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
          <ItemHeader ref={cluster}>Cluster</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
          <ItemHeader ref={stratified}>Stratified</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
        </NestedSection>
        <ItemHeader ref={nonProbability}>Non-Probability</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={convenience}>Convenience</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
        </NestedSection>
        <ItemHeader ref={purposive}>Purposive</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={snowBall}>Snow Ball</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
        </NestedSection>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}