import styled from "styled-components";

export const Image = styled.img`
  width: 4rem;
  border-radius: 50%;
`;

export const FileUploadIcon = styled.i`
  font-size: 24px;
  cursor: pointer;
`;

export const FileUploadIconSmall = styled(FileUploadIcon)`
  font-size: 18px;
  cursor: pointer;
`;

export const AvatarContainer = styled.div`
  cursor: pointer;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: end;
  padding-bottom: 4rem;
`;
