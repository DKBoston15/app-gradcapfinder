import { useProfileStore } from '@app/stores/profileStore';
import React, { useState } from 'react';
import { supabase } from '@app/supabase/index';
import {
  FeedbackContainer,
  FeedbackPopup,
  IntroText,
  DescriptionText,
  CustomButton,
  CustomTextarea,
} from './styles';

export default function Feedback() {
  const user = supabase.auth.user();

  const [feedback, setFeedback] = useState('');
  const [open, setOpen] = useState(false);
  const profile = useProfileStore((state: any) => state.profile);

  const submitFeedback = async () => {
    if (feedback) {
      const { data, error } = await supabase
        .from('feedback')
        .insert([{ feedback, user_id: user?.id }]);
    }
    setFeedback('');
    setOpen(false);
  };

  return (
    <>
      <FeedbackContainer>
        <p
          onClick={() => {
            setOpen(!open);
          }}>
          Feedback
        </p>
      </FeedbackContainer>
      {open && (
        <FeedbackPopup>
          <i className="pi pi-info-circle" style={{ fontSize: '3em', color: '#2381fe' }}></i>
          <IntroText>Hi {profile.first_name || 'Quester'} 👋</IntroText>
          <DescriptionText>
            Help us make the platform better for you by sharing positive or negative feedback with
            us as you have it!
          </DescriptionText>
          <CustomTextarea
            rows={5}
            cols={25}
            autoResize
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <CustomButton onClick={() => submitFeedback()}>Submit</CustomButton>
        </FeedbackPopup>
      )}
    </>
  );
}
