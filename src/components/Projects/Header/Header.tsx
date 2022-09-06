import { Container, OverviewContainer, ButtonContainer, IsSharedLabel, ShareLabel } from './styles';
import React, { useState, useEffect } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import AddButton from '../AddButton/AddButton';
import AddProjectDialog from '../ProjectOverviewHeader/AddProjectDialog/AddProjectDialog';
import { Tooltip } from 'primereact/tooltip';
import { supabase } from '@app/supabase';
import { BsFillGearFill } from 'react-icons/bs';
import SharingModal from '@app/components/SharingModal/SharingModal';
import { useGeneralStore } from '@app/stores/generalStore';
import { useProfileStore } from '@app/stores/profileStore';

// Get all shared users and populate chips with their emails
// Provide ability to remove users from sharing
// Allow users being shared with to remove teh sharing from the items
// Enable note sharing across both the owner and shared users of the items
// Enable the same type of sharing for people, journals, and key terms
// Enable realtime updates on notes, people, key_terms, journals, and the item itself
// Determine how to handle projects

export default function Header({ dbItems, items, title, children }) {
  const user = supabase.auth.user();
  const navigate = useNavigate();
  const [displayPrompt, setDisplayPrompt] = useState(false);
  const [displaySharingDialog, setDisplaySharingDialog] = useState(false);
  const [shared, setShared] = useState(false);
  const [sharedUserEmail, setSharedUserEmail] = useState('');
  const { isItemShared } = useGeneralStore((state) => ({
    isItemShared: state.isItemShared,
  }));
  const { getUserById } = useProfileStore((state) => ({
    getUserById: state.getUserById,
  }));

  const { id } = useParams();

  useEffect(() => {
    const handleData = async () => {
      if (user) {
        if (isItemShared(id)) {
          setShared(true);
          const currentItem = dbItems.filter((dbItem) => dbItem.id == id);
          const userData = await getUserById(currentItem[0].user_id);
          if (user.id != currentItem[0].user_id) {
            await setSharedUserEmail(userData[0].email);
          } else {
            await setSharedUserEmail(user?.email);
          }
        }
      }
    };
    handleData();
  }, [items]);

  const home = { icon: 'pi pi-home', command: () => navigate(`/dashboard`) };
  return (
    <Container>
      <AddProjectDialog setDisplayPrompt={setDisplayPrompt} displayPrompt={displayPrompt} />
      <SharingModal
        displaySharingDialog={displaySharingDialog}
        setDisplaySharingDialog={setDisplaySharingDialog}
      />
      <OverviewContainer>
        <BreadCrumb
          model={items}
          home={home}
          style={{ fontSize: '0.875rem', padding: '0.65625rem 1.09375rem' }}
        />
        {!shared && (
          <>
            {sharedUserEmail.length == 0 && (
              <div
                onClick={() => setDisplaySharingDialog(true)}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <ShareLabel>Share</ShareLabel>
                <BsFillGearFill
                  style={{ marginLeft: '0.5rem', color: 'gray', cursor: 'pointer' }}
                />
              </div>
            )}
          </>
        )}
        {shared && (
          <>
            {sharedUserEmail.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {sharedUserEmail == user?.email && (
                  <>
                    <IsSharedLabel>Shared</IsSharedLabel>
                    <BsFillGearFill
                      onClick={() => setDisplaySharingDialog(true)}
                      style={{ marginLeft: '0.5rem', color: 'gray', cursor: 'pointer' }}
                    />
                  </>
                )}
                {sharedUserEmail != user?.email && (
                  <>
                    <IsSharedLabel>Shared</IsSharedLabel>
                    <i
                      style={{ marginLeft: '0.5rem' }}
                      className="pi pi-info-circle"
                      id="sharedInfo"
                    />
                    <Tooltip
                      target="#sharedInfo"
                      content={`Shared by ${sharedUserEmail}`}
                      position="right"
                      style={{ fontSize: '12px' }}
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}
      </OverviewContainer>
      <ButtonContainer>
        <Button className="p-button-sm" onClick={() => setDisplayPrompt(true)}>
          + Add New Project
        </Button>
        <AddButton header={`+ New ${title}`} buttonLabel={`New ${title}`}>
          {children}
        </AddButton>
      </ButtonContainer>
    </Container>
  );
}
