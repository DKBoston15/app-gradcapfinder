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
  Table,
  TableHead,
  TableRow,
  TableData,
  TableHeader,
  TableBody,
} from './LearnComponents/learn.styles';
import { Button } from 'primereact/button';

export default function Figures() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const examples = useRef(null);
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
          Figures support elements of professionalism by developing proper presentation of images.
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={purpose}>Purpose</SubHeader>
        <Paragraph>
          Figures provide foundational sets of beliefs and understandings about the use of images in
          areas of professionalism. This allows researchers to generate, test, and extend theories
          and practices associated with the use of those images and particular arenas of
          professionalism. To recognize the figures that influence your professionalism, you will
          need to answer a few philosophical questions. For example, responses to ontological (e.g.,
          what is the nature of an image?), epistemological (e.g., what can researchers know about
          an image?), and methodological (e.g., how do researchers gain knowledge about an image)
          questions will help you to generate your own foundational sets of beliefs and
          understandings of the value of images. In turn, they inform your identification of
          products you wish to generate, test, and/or extend through your work as a professional
          researcher.
        </Paragraph>
        <CustomDivider />
        <Paragraph>
          <div>
            <FigureIdentifier>Figure 14. </FigureIdentifier>
            <FigureName>
              A conceptual framework for defining figures in terms of an image
            </FigureName>
          </div>
          <img src="/figures_banner.png" width="100%" height="100%" style={{ maxWidth: '800px' }} />
        </Paragraph>
        <CustomDivider />
        <SubHeader ref={examples} style={{ marginTop: '2rem' }}>
          Types and Examples
        </SubHeader>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Figure</TableHeader>
              <TableHeader>
                <a href="https://plato.stanford.edu/entries/logic-ontology/#Ont" target="_blank">
                  Ontology
                </a>
              </TableHeader>
              <TableHeader>
                <a href="https://plato.stanford.edu/entries/epistemology/" target="_blank">
                  Epistemology
                </a>
              </TableHeader>
              <TableHeader>
                <a href="https://plato.stanford.edu/entries/scientific-method/" target="_blank">
                  Methodology
                </a>
              </TableHeader>
              <TableHeader>Product</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableData>
                <p>Data plot</p>
              </TableData>
              <TableData>Images capture relationships between data.</TableData>
              <TableData>
                Researchers can know what data represent. Researchers consume knowledge from images.
              </TableData>
              <TableData>R2, line of best fit</TableData>
              <TableData>Interpretation</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Picture</p>
              </TableData>
              <TableData>Images exist as representation of reality.</TableData>
              <TableData>
                Researchers can approximate the purpose and meaning of the image. Researchers are
                distinct from the image.
              </TableData>
              <TableData>Observation, extrapolation</TableData>
              <TableData>Anecdotal</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Map</p>
              </TableData>
              <TableData>Images exist as an elevated perspective.</TableData>
              <TableData>
                Researchers can know the relationship between elements within the image. Researchers
                interpret the relationship between elements.
              </TableData>
              <TableData>Interpretation, manipulation</TableData>
              <TableData>Application</TableData>
            </TableRow>
            <TableRow>
              <TableData>
                <p>Schematic</p>
              </TableData>
              <TableData>Images exist as graphic symbols within a system.</TableData>
              <TableData>
                Researchers can know the function and role of elements within a system. Researchers
                are distinct from the schematic and system.
              </TableData>
              <TableData>Manipulation</TableData>
              <TableData>Application</TableData>
            </TableRow>
          </TableBody>
        </Table>
        <CustomDivider />
        <SubHeader ref={links}>Links</SubHeader>
        <Paragraph>
          The following links provide entry into understanding the term we refer to as, “Figures”.
          These links do not provide exhaustive information, rather, they provide an opportunity to
          begin studying academic constructivism through lenses we consider broadly authoritative.
        </Paragraph>
        <ButtonContainer>
          <Button
            label="Google Scholar"
            onClick={() => {
              window.open(
                'https://scholar.google.com/citations?hl=en&view_op=search_authors&mauthors=label%3Adata_visualization&btnG=',
              );
            }}
            className="p-button-primary p-button-sm"
          />
          <CustomButton
            label="Stanford Encyclopedia of Philosophy"
            onClick={() => {
              window.open('https://plato.stanford.edu/search/search?query=data+visualization');
            }}
            className="p-button-primary p-button-sm"
          />
        </ButtonContainer>
      </Page>
      <TableOfContents toc={toc} />
    </Container>
  );
}
