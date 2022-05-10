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

export default function Paradigms() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const types = useRef(null);
  const qualitative = useRef(null);
  const quantitative = useRef(null);
  const mixedMethods = useRef(null);
  const constructivist = useRef(null);
  const positivism = useRef(null);
  const pragmatism = useRef(null);

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
          name: 'Qualitative',
          ref: qualitative,
          sections: [
            {
              name: 'Constructivist',
              ref: constructivist,
            },
          ],
        },
        {
          name: 'Quantitative',
          ref: quantitative,
          sections: [
            {
              name: 'Positivism',
              ref: positivism,
            },
          ],
        },
        {
          name: 'Mixed Methods',
          ref: mixedMethods,
          sections: [
            {
              name: 'Pragmatism',
              ref: pragmatism,
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
        <ItemHeader ref={qualitative}>Qualitative</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={constructivist}>Constructivist</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
        </NestedSection>
        <ItemHeader ref={quantitative}>Quantitative</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={positivism}>Positivism</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
        </NestedSection>
        <ItemHeader ref={mixedMethods}>Mixed Methods</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={pragmatism}>Pragmatism</ItemHeader>
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
