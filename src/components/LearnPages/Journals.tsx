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

export default function Journals() {
  const definition = useRef(null);
  const purpose = useRef(null);
  const types = useRef(null);
  const associationLinked = useRef(null);
  const online = useRef(null);
  const open = useRef(null);
  const peer = useRef(null);
  const practitionary = useRef(null);
  const predatory = useRef(null);
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
          name: 'Association-linked',
          ref: associationLinked,
        },
        {
          name: 'Online',
          ref: online,
        },
        {
          name: 'Open',
          ref: open,
        },
        {
          name: 'Peer',
          ref: peer,
        },
        {
          name: 'Practitionary',
          ref: practitionary,
        },
        {
          name: 'Predatory',
          ref: predatory,
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
        <ItemHeader ref={associationLinked}>Association-linked</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={online}>Online</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={open}>Open</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={peer}>Peer</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={practitionary}>Practitionary</ItemHeader>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Consectetur adipiscing elit pellentesque habitant morbi.
          Nibh ipsum consequat nisl vel pretium lectus quam id leo. Mauris rhoncus aenean vel elit
          scelerisque mauris pellentesque pulvinar. Vel risus commodo viverra maecenas accumsan
          lacus vel facilisis.
        </Paragraph>
        <ItemHeader ref={predatory}>Predatory</ItemHeader>
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
