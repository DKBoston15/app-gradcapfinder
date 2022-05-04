import { Container, DateContainer, SubHeader, ListItem } from './styles';
import React from 'react';

export default function ChangelogCard({ changelog }: any) {
  return (
    <Container>
      <DateContainer>
        <span>{changelog.version}</span> - {changelog.date}
      </DateContainer>
      <div>
        {changelog.additions.length > 0 && (
          <>
            <SubHeader>Additions</SubHeader>
            <ul>
              {changelog.additions.map((addition: string, index: number) => (
                <ListItem key={index}>• {addition}</ListItem>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>
        {changelog.fixes.length > 0 && (
          <>
            <SubHeader>Fixes</SubHeader>
            <ul>
              {changelog.fixes.map((fix: string, index: number) => (
                <liListItem key={index}>• {fix}</liListItem>
              ))}
            </ul>
          </>
        )}
      </div>
      <div>
        {changelog.improvements.length > 0 && (
          <>
            <SubHeader>Improvements</SubHeader>
            <ul>
              {changelog.improvements.map((improvement: string, index: number) => (
                <ListItem key={index}>• {improvement}</ListItem>
              ))}
            </ul>
          </>
        )}
      </div>
    </Container>
  );
}
