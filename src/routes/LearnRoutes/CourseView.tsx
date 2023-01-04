import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Header } from './RouteStyles/learnview.styles';
import Course from './Course';

export default function CourseView() {
  const location = useLocation();

  const HeaderText = () => {
    switch (location.pathname) {
      case '/knowledge_base/courses/apa':
        return <div>APA Style (7th ed.)</div>;
    }
  };

  const CoursePage = () => {
    switch (location.pathname) {
      case '/knowledge_base/courses/apa':
        return <Course course={'APA'} courseTitle={'APA Style (7th ed.)'} />;
    }
  };

  return (
    <Container>
      <Header>{HeaderText()}</Header>
      {CoursePage()}
    </Container>
  );
}
