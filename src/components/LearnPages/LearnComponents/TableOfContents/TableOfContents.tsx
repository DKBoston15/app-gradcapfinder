import React from 'react';

export default function TableOfContents({ info }) {
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: smooth,
    });
  };

  return (
    <div>
      TableOfContents
      <div onClick={() => scrollToSection(info)}>Test 1</div>
    </div>
  );
}
