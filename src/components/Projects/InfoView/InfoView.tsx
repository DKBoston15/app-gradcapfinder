import React, { useState } from 'react';
import ArticleInfo from '../Articles/ArticleInfo/ArticleInfo';
import { Container, Header } from './styles';

export default function InfoView(props: any) {
  return (
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
  );
}
