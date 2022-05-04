import {
  MainContainer,
  ImageContainer,
  InviteContainer,
  Title,
  Details,
  DetailsContainer,
  DetailsSubtitle,
} from '../styles/invited.styles';

export default function Invited() {
  return (
    <MainContainer>
      <InviteContainer>
        <Title>Quester</Title>
        <DetailsContainer>
          <Details>Log in</Details>
          <DetailsSubtitle>Welcome back! Please enter your details!</DetailsSubtitle>
        </DetailsContainer>
      </InviteContainer>
      <ImageContainer>
        <img src="/awaiting_invite.svg" width="95%" height="70%" />
      </ImageContainer>
    </MainContainer>
  );
}
