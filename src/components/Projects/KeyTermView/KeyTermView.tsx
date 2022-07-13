import React, { useEffect, useState } from 'react';
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
  NavLink,
  Keyterm2Container,
  CustomAutoComplete,
  Container,
} from './styles';
import AddButton from '../AddButton/AddButton';
import NewKeyTermForm from '../KeyTerms/AddKeyTermForm/NewKeyTermForm';
import { useKeyTermStore } from '@app/stores/keytermStore';
import { useParams } from 'react-router-dom';

export default function KeyTermView(props: any) {
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [selectedKeyTerm, setSelectedKeyTerm] = useState();
  const [availableKeyTerms, setAvailableKeyTerms] = useState([]);
  const [projectKeyTerms, setProjectKeyTerms] = useState([]);
  const [filteredKeyTerms, setFilteredKeyTerms] = useState([]);

  const { projectId, id } = useParams();
  const { keyTerms, addKeyTermConnection, removeKeyTermConnection } = useKeyTermStore((state) => ({
    keyTerms: state.keyTerms,
    addKeyTermConnection: state.addKeyTermConnection,
    removeKeyTermConnection: state.removeKeyTermConnection,
  }));

  useEffect(() => {
    const projectKeyTerms = keyTerms.filter((keyTerm) => keyTerm.connected_entities.includes(id));
    setProjectKeyTerms(projectKeyTerms);
    if (projectKeyTerms.length >= 7) {
      setDisabled(true);
    }

    let availableKeyTerms = keyTerms.filter((keyTerm) => keyTerm.project_id == projectId);
    availableKeyTerms = availableKeyTerms.filter(
      (keyTerm) => !keyTerm.connected_entities.includes(id),
    );
    setAvailableKeyTerms(availableKeyTerms);
    setFilteredKeyTerms(availableKeyTerms);
    setLoading(false);
  }, [id, keyTerms]);

  const removeKeyTerm = async (id: any) => {
    await removeKeyTermConnection(id, props.connectedId);
  };

  const handleSelection = (e: any) => {
    addKeyTermConnection(e.id, props.connectedId);
    setSelectedKeyTerm('');
  };

  const searchKeyTerm = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredKeyTerms;
      if (!event.query.trim().length) {
        _filteredKeyTerms = [...availableKeyTerms];
      } else {
        _filteredKeyTerms = availableKeyTerms.filter((fullKeyTerm: any) => {
          return fullKeyTerm.name.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredKeyTerms(_filteredKeyTerms);
    }, 250);
  };

  return (
    <Container>
      {!loading && (
        <>
          <Header>
            <AutoContainer>
              <InputLabel>Add Key Term</InputLabel>
              <CustomAutoComplete
                tooltip="3-7 Key Terms Max"
                tooltipOptions={{ disabled: !disabled }}
                disabled={disabled}
                dropdown
                value={selectedKeyTerm}
                suggestions={filteredKeyTerms}
                completeMethod={searchKeyTerm}
                field="name"
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
          <Keyterm2Container>
            {projectKeyTerms.map((item: any) => (
              <KeyTermContainer key={item.id}>
                <NameContainer>
                  <KeyTermName>{item.name}</KeyTermName>
                </NameContainer>

                <TagContainer>
                  {item.primary && <Tag value="Primary" severity="warning"></Tag>}
                </TagContainer>

                <ActionContainer>
                  <NavLink to={`/projects/${projectId}/key_terms/${item.id}`}>
                    <i className="pi pi-arrow-right" />
                  </NavLink>
                  <Icon className="pi pi-trash" onClick={() => removeKeyTerm(item.id)}></Icon>
                </ActionContainer>
              </KeyTermContainer>
            ))}
          </Keyterm2Container>
        </>
      )}
    </Container>
  );
}
