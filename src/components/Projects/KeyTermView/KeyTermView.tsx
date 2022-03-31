import { useProjectStore } from '@app/stores/projectStore';
import { useJournalStore } from '@app/stores/journalStore';
import { useEffect, useState } from 'react';
import { Tag } from 'primereact/tag';
import {
  KeyTermContainer,
  KeyTermName,
  Header,
  NameContainer,
  TagContainer,
  ActionContainer,
  InputLabel,
  AutoContainer,
  Icon,
} from './styles';
import AddButton from '../AddButton/AddButton';
import NewKeyTermForm from '../KeyTerms/AddKeyTermForm/NewKeyTermForm';
import { supabase } from '@app/supabase/index';
import { AutoComplete } from 'primereact/autocomplete';
import { useKeyTermStore } from '@app/stores/keytermStore';

const filterByReference = (arr1: any, arr2: any) => {
  let res = [];
  res = arr1.filter((el: any) => {
    return !arr2.find((element: any) => {
      return element.id === el.id;
    });
  });
  return res;
};

export default function JournalView(props: any) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [localKeyTerms, setLocalKeyTerms] = useState([]);
  const [fullKeyTerms, setFullKeyTerms] = useState([]);
  const [filteredKeyTerms, setFilteredKeyTerms] = useState([]);
  const [selectedKeyTerm, setSelectedKeyTerm] = useState();

  const selectedProject = useProjectStore((state: any) => state.selectedProject);
  const getConnectedKeyTerms = useKeyTermStore((state: any) => state.getConnectedKeyTerms);
  const getKeyTerms = useKeyTermStore((state: any) => state.getKeyTerms);
  const addKeyTermConnection = useKeyTermStore((state: any) => state.addKeyTermConnection);
  const removeKeyTermConnection = useKeyTermStore((state: any) => state.removeKeyTermConnection);

  const handleRealtimeUpdate = async (payload: any) => {
    if (payload.eventType === 'INSERT') {
      const connectedJournals = await getConnectedKeyTerms(selectedProject, props.connectedId);
      setLocalKeyTerms(
        connectedJournals.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)),
      );
      setupFilteredList(connectedJournals);
    }
  };

  useEffect(() => {
    const realtimeProfileUpdates = supabase
      .from('key_terms')
      .on('*', (payload) => {
        handleRealtimeUpdate(payload);
      })
      .subscribe();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const connectedKeyTerms = await getConnectedKeyTerms(selectedProject, props.connectedId);
      const allKeyTerms = await getKeyTerms(selectedProject);
      setLocalKeyTerms(
        connectedKeyTerms.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)),
      );
      setFullKeyTerms(
        filterByReference(allKeyTerms, connectedKeyTerms).sort((a: any, b: any) =>
          a.primary > b.primary ? -1 : 1,
        ),
      );
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    if (localKeyTerms.length >= 7) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [localKeyTerms]);

  const setupFilteredList = (listToBeRemoved: any) => {
    setFullKeyTerms(
      filterByReference(fullKeyTerms, listToBeRemoved).sort((a: any, b: any) =>
        a.primary > b.primary ? -1 : 1,
      ),
    );
  };

  const handleSelection = (e: any) => {
    const setConnectedKeyTerm = async () => {
      const newKeyTerm = await addKeyTermConnection(e.id, props.connectedId);
      setSelectedKeyTerm(undefined);
      const newConnectedKeyTerms = [...localKeyTerms];
      // @ts-ignore
      newConnectedKeyTerms.push(newKeyTerm[0]);
      setLocalKeyTerms(
        newConnectedKeyTerms.sort((a: any, b: any) => (a.primary > b.primary ? -1 : 1)),
      );
      setupFilteredList(newConnectedKeyTerms);
    };
    if (e && props.connectedId) {
      setConnectedKeyTerm();
    }
  };

  const removeKeyTerm = async (id: any) => {
    await removeKeyTermConnection(id, props.connectedId);
    const newKeyTermList = localKeyTerms.filter(function (e: any) {
      return e.id != id;
    });
    setLocalKeyTerms(newKeyTermList);

    const allKeyTerms = await getKeyTerms(selectedProject);
    setFullKeyTerms(
      filterByReference(allKeyTerms, newKeyTermList).sort((a: any, b: any) =>
        a.primary > b.primary ? -1 : 1,
      ),
    );
  };

  const searchKeyTerm = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredKeyTerms;
      if (!event.query.trim().length) {
        _filteredKeyTerms = [...fullKeyTerms];
      } else {
        _filteredKeyTerms = fullKeyTerms.filter((fullKeyTerm: any) => {
          return fullKeyTerm.title.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredKeyTerms(_filteredKeyTerms);
    }, 250);
  };

  return (
    <div>
      {!loading && (
        <>
          <Header>
            <AutoContainer>
              <InputLabel>Add Key Term</InputLabel>
              <AutoComplete
                tooltip="3-7 Key Terms Max"
                tooltipOptions={{ disabled: !disabled }}
                disabled={disabled}
                dropdown
                value={selectedKeyTerm}
                suggestions={filteredKeyTerms}
                completeMethod={searchKeyTerm}
                field="title"
                onChange={(e) => setSelectedKeyTerm(e.value)}
                onSelect={(e) => handleSelection(e.value)}
              />
            </AutoContainer>
            <AddButton
              tooltipName="Key Terms"
              header="+ New Key Term"
              buttonLabel="New Key Term"
              disabled={disabled}>
              {/* @ts-ignore */}
              <NewKeyTermForm connectedEntity={props.connectedId} />
            </AddButton>
          </Header>
          <ul>
            {localKeyTerms.map((item: any) => (
              <KeyTermContainer key={item.id}>
                <NameContainer>
                  <KeyTermName>{item.title}</KeyTermName>
                </NameContainer>

                <TagContainer>{item.primary && <Tag value="Primary"></Tag>}</TagContainer>

                <ActionContainer>
                  <Icon className="pi pi-trash" onClick={() => removeKeyTerm(item.id)}></Icon>
                </ActionContainer>
              </KeyTermContainer>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
