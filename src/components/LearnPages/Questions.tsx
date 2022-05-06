import React, { useRef } from 'react';
import TableOfContents from './LearnComponents/TableOfContents/TableOfContents';

export default function Questions() {
  const info2 = useRef(null);
  const scrollToSection = (elementRef) => {
    console.log(elementRef);
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {/* <TableOfContents info={info} /> */}
      <button onClick={() => scrollToSection(info2)}>Test 1</button>
      <div style={{ marginTop: '175rem' }}>More info</div>
      <div ref={info2} style={{ marginTop: '175rem' }}>
        More info2
      </div>
    </div>
  );
}
