import React, { useRef } from 'react';
import { Card, Name, Role, Email, IconContainer, Icon, NavLink } from './styles';
import useCopyToClipboard from '@app/hooks/useCopyToClipboard';
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';

export default function TeamCard({ person }) {
  const toast = useRef(null);
  const [value, copy] = useCopyToClipboard();
  const { projectId } = useParams();
  const showCopied = (email: string) => {
    toast.current.show({
      severity: 'success',
      summary: `${email}`,
      detail: 'Copied to Clipboard',
      life: 3000,
    });
  };

  return (
    <Card>
      <Toast ref={toast} />
      <Name>
        <div>
          {person.first_name} {person.last_name}
        </div>
        <NavLink to={`writing/people/${person.id}`}>
          <i className="pi pi-arrow-right" />
        </NavLink>
      </Name>
      <Role>{person.project_role}</Role>
      <Email>
        {person.email}
        {person.email && (
          <IconContainer>
            <Icon
              className="pi pi-copy"
              onClick={() => {
                showCopied(`${person.email}`);
                copy(`${person.email}`);
              }}
            />
            <a href={`mailto:${person.email}`}>
              <Icon className="pi pi-send" />
            </a>
          </IconContainer>
        )}
      </Email>
    </Card>
  );
}
