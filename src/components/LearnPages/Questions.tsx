import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';

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
    <div>
      <TableOfContents toc={toc} />
      <div ref={definition} style={{ marginTop: '175rem' }}>
        Definition
      </div>
      <div ref={purpose} style={{ marginTop: '175rem' }}>
        Purpose
      </div>
      <div ref={types} style={{ marginTop: '175rem' }}>
        Types
      </div>

      <div ref={comparative} style={{ marginTop: '40rem' }}>
        Comparative
      </div>
      <div ref={descriptive} style={{ marginTop: '40rem' }}>
        Descriptive
      </div>
      <div ref={exploratory} style={{ marginTop: '40rem' }}>
        Exploratory
      </div>
      <div ref={explanatory} style={{ marginTop: '40rem' }}>
        Explanatory
      </div>
      <div ref={interpretative} style={{ marginTop: '40rem' }}>
        Interpretative
      </div>
      <div ref={predictive} style={{ marginTop: '40rem' }}>
        Predictive
      </div>
      <div ref={relationship} style={{ marginTop: '40rem' }}>
        Relationship
      </div>
    </div>
  );
}
