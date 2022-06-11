import React from 'react';
import { TOCContainer, TOCHeader, TOCSectionHeader, TOCSectionItem } from './styles';

export default function TableOfContents({ toc }) {
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <TOCContainer>
      <TOCHeader>ON THIS PAGE</TOCHeader>
      {toc.map((item) => (
        <>
          <TOCSectionHeader onClick={() => scrollToSection(item.ref)}>{item.name}</TOCSectionHeader>
          {item.sections && (
            <>
              {item.sections.map((section) => (
                <TOCSectionItem
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollToSection(section.ref);
                  }}>
                  {section.name}
                  {section.sections && (
                    <>
                      {section.sections.map((nestedSection: any) => (
                        <TOCSectionItem
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToSection(nestedSection.ref);
                          }}>
                          {nestedSection.name}
                        </TOCSectionItem>
                      ))}
                    </>
                  )}
                </TOCSectionItem>
              ))}
            </>
          )}
        </>
      ))}
    </TOCContainer>
  );
}
