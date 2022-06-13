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
  CustomButton,
  ButtonContainer,
  FigureIdentifier,
  FigureName,
} from './LearnComponents/learn.styles';
import { Button } from 'primereact/button';

export default function Paradigms() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const examples = useRef(null);
  const positivist = useRef(null);
  const postpositivist = useRef(null);
  const critical = useRef(null);
  const constructivist = useRef(null);
  const poststructuralist = useRef(null);
  const links = useRef(null);

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
      name: 'Examples',
      ref: examples,
      sections: [
        {
          name: 'Positivist',
          ref: positivist,
        },
        {
          name: 'Postpositivist',
          ref: postpositivist,
        },
        {
          name: 'Critical',
          ref: critical,
        },
        {
          name: 'Constructivist',
          ref: constructivist,
        },
        {
          name: 'Poststructuralist',
          ref: poststructuralist,
        },
      ],
    },
    {
      name: 'Links',
      ref: links,
    },
  ];

  return (
    <Container>
      <Page>
        <SubHeader ref={definition}>Definition</SubHeader>
        <Paragraph>
          Research paradigms represent the philosophical frameworks supporting the development of
          research products in the study of reality.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Paradigms provide foundational sets of beliefs and understandings. This allows researchers
          to generate, test, and extend theories and practices associated with research into
          reality.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <FigureIdentifier>Figure 2 .</FigureIdentifier>
          <FigureName>
            The Onion Model Used to Describe Common Elements Associated with Research
          </FigureName>
          <img src="/research_paradigm.png" width="80%" height="100%" />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Examples of Research Paradigms
        </SubHeader>
        <ItemHeader ref={positivist}>Positivist</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>Reality exists and can be captured, studied, and understood.</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers can know reality. Researchers are distinct from reality.
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Experiments, quasi-experiments, surveys</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Facts, theories, laws</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={postpositivist}>Postpositivist</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>Reality exists but cannot be fully understood.</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers can approximate reality. Researchers act as data collection instruments in
              attempting to understand reality.
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Frequencies, qualitative methods</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Generalizations, descriptions, patterns, grounded theories</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={constructivist}>Constructivist</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Reality exists in multiple states and is constructed by individuals.
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers believe that knowledge of reality is constructed. Researchers and
              participants co-construct knowledge about reality.
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Naturalistic inquiry</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Case studies, narratives, reconstructions</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={critical}>Critical</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>
              An individual’s reality exists in terms of multiple factors (e.g., class, gender, and
              race).
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers view knowledge as subjective and political. Researchers infuse values into
              their inquiry of reality.
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Transformative inquiry</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Critiques of power structures</Paragraph>
          </NestedSection>
        </NestedSection>
        <CustomDivider />
        <ItemHeader ref={poststructuralist}>Poststructuralist</ItemHeader>
        <NestedSection>
          <ItemHeader>Ontology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Order is created within the minds of individuals to give meaning to a meaningless
              reality.
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Epistemology</ItemHeader>
          <NestedSection>
            <Paragraph>
              Researchers do not believe a reality exists to know. Researchers examine false
              realities through textual representation.
            </Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Methodology</ItemHeader>
          <NestedSection>
            <Paragraph>Deconstruction, genealogy</Paragraph>
          </NestedSection>
        </NestedSection>
        <NestedSection>
          <ItemHeader>Products</ItemHeader>
          <NestedSection>
            <Paragraph>Deconstructions, genealogies, reflexive texts</Paragraph>
          </NestedSection>
        </NestedSection>
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Paradigms”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying paradigms through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Aparadigms&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Sage"
            onClick={() => {
              window.open(
                'https://methods.sagepub.com/reference/the-sage-dictionary-of-social-research-methods/n141.xml#:~:text=The%20general%20principles%20of%20the,of%20law%20to%20be%20considered',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <Button
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/entries/thomas-kuhn/');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
