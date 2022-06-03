import React from 'react';
import { CustomDialog } from './styles';

export default function NotificationDialog({ display, setDisplay, itemId, title }: any) {
  const items = {
    '0': (
      <div>
        Quester is the best way to create, learn, and manage projects on your research journey.
        <br />
        <br />
        You've been selected as one of a handful of beta testers for your knowledge and expertise.
        You know better than anyone what you and other researchers need to manage their projects! We
        hope what we have built so far becomes a vital part of your process, and if you find
        anything missing, we want to know about it.
        <br />
        <br />
        You have the opportunity to shape Quester and what features and additions we add over the
        coming months and years. As mentioned above, this is a Beta, and you may run across bugs or
        other issues while using Quester. There is a feedback button located in the bottom right of
        your screen and we encourage you to use it whether for new ideas or a bug you ran across.
        <br />
        <br />
        As we always recommend, but especially during a beta, make sure you store your vital project
        information in multiple places to make sure you never lose it. <br />
        <br />
        Thank you from the team at Quester!
      </div>
    ),
  };

  return (
    <CustomDialog
      header={title}
      visible={display}
      style={{ width: '50vw', fontSize: '1.2rem', lineHeight: '1.6rem' }}
      onHide={() => setDisplay(false)}>
      {items[itemId]}
    </CustomDialog>
  );
}
