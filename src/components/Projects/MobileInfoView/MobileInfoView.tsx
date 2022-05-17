import { useProfileStore } from '@app/stores/profileStore';
import React, { useState } from 'react';
import {
  FeedbackContainer,
  FeedbackPopup,
  IntroText,
  DescriptionText,
  CustomButton,
  CustomTextarea,
  CustomSidebar,
  Header,
  Container,
} from './styles';

export default function MobileInfoView(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FeedbackContainer>
        <p
          onClick={() => {
            setOpen(!open);
          }}>
          Details
        </p>
      </FeedbackContainer>
      <CustomSidebar visible={open} onHide={() => setOpen(false)} position="right">
        <Container>
          <Header>
            <span>{props.header}</span>
            {props.saving && (
              <i
                className="pi pi-spin pi-spinner"
                style={{
                  fontSize: '1em',
                  marginLeft: '0.5em',
                  position: 'absolute',
                }}></i>
            )}
          </Header>
          {props.children}
        </Container>
      </CustomSidebar>
    </>
  );
}
