import { useLiteratureStore } from '@app/stores/literatureStore';
import React, { useState, useEffect } from 'react';
import { ReferenceTitle, ReferenceContainer, DOICheckbox, JournalName, Volume } from './styles';

export default function Reference({ selectedLiterature }: any) {
  const [doi, setDoi] = useState(false);
  const [authors, setAuthors] = useState(['']);
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [volume, setVolume] = useState('');
  const [issue, setIssue] = useState('');
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [link, setLink] = useState('');

  const { literature } = useLiteratureStore((state) => ({
    literature: state.literature,
  }));

  useEffect(() => {
    const selectedItem = literature.filter((literature) => literature.id == selectedLiterature);
    if (selectedItem) {
      setAuthors(selectedItem[0].authors);
      setYear(selectedItem[0].year);
      setTitle(selectedItem[0].title);
      setJournal(selectedItem[0].journal);
      setVolume(selectedItem[0].volume);
      setIssue(selectedItem[0].issue);
      setStartPage(selectedItem[0].start_page);
      setEndPage(selectedItem[0].end_page);
      setLink(selectedItem[0].link);
    }
  }, [selectedLiterature, literature]);

  return (
    <div>
      <ReferenceTitle>Reference</ReferenceTitle>
      <ReferenceContainer>
        {authors && (
          <>
            {/* @ts-ignore */}
            {authors.length > 2 && (
              <>
                {/* @ts-ignore */}
                {authors?.slice(0, -1).join('. ')}. {'& '}
                {/* @ts-ignore */}
                {authors[authors.length - 1]}
                {'.'}
              </>
            )}
            {/* @ts-ignore */}
            {authors.length === 1 && <>{authors[0]}.</>}
            {/* @ts-ignore */}
            {authors.length === 2 && (
              <>
                {/* @ts-ignore */}
                {authors[0]}., {'&'} {authors[1]}.
              </>
            )}{' '}
          </>
        )}
        ({year}). {title}. <JournalName>{journal},</JournalName> <Volume>{volume} </Volume>
        <span>{issue ? `(${issue})` : ``}</span>, {startPage}–{endPage}. {doi && link}
      </ReferenceContainer>
      <DOICheckbox>
        <input
          checked={doi || false}
          onChange={() => {
            //@ts-ignore
            setDoi(!doi);
          }}
          type="checkbox"
        />
        <span>Include DOI</span>
      </DOICheckbox>
    </div>
  );
}
