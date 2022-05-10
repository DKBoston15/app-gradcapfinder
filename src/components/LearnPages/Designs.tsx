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

export default function Designs() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const types = useRef(null);
  const experimental = useRef(null);
  const observational = useRef(null);
  const labTrials = useRef(null);
  const fieldTrials = useRef(null);
  const crossSectional = useRef(null);
  const caseControl = useRef(null);
  const cohort = useRef(null);

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
          name: 'Experimental',
          ref: experimental,
          sections: [
            {
              name: 'Lab Trials',
              ref: labTrials,
            },
            {
              name: 'Field Trials',
              ref: fieldTrials,
            },
          ],
        },
        {
          name: 'Observational',
          ref: observational,
          sections: [
            {
              name: 'Cross-sectional',
              ref: crossSectional,
            },
            {
              name: 'Case-control',
              ref: caseControl,
            },
            {
              name: 'Cohort',
              ref: cohort,
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
        <ItemHeader ref={experimental}>Experimental</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={labTrials}>Lab Trials</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
          <ItemHeader ref={fieldTrials}>Field Trials</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
        </NestedSection>
        <ItemHeader ref={observational}>Observational</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <NestedSection>
          <ItemHeader ref={crossSectional}>Cross-sectional</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
          <ItemHeader ref={caseControl}>Case-control</ItemHeader>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque
            habitant morbi. Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus
            aenean vel elit scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra
            maecenas accumsan lacus vel facilisis.
          </Paragraph>
          <ItemHeader ref={cohort}>Cohort</ItemHeader>
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
