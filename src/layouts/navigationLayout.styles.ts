import styled from "styled-components";
import { motion } from "framer-motion"

export const MainContainer = styled.div`
   width: 100%;
`

export const ContentContainer = styled(motion.div)`
  width: 100%;
`

export const Container = styled.div`
    height: 100%;
    display: flex;
`

export const SidebarContainer = styled.div`
position: fixed;
    padding: 3rem 1rem 0rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100vh;
`

export const Icon = styled.i`
  font-size: 1.4rem;
  padding: 2rem 0;
  cursor: pointer;
  color: white;
  &:hover {
    transform: scale(1.05);
    translate3d: (0px, 0px, 0px);
  }
`

export const Button = styled.div`
  text-align: left;
  border: none;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 2rem;
  color: white;
`

  export const OnboardingContainer = styled.div`
  display: flex;
  @media (max-width: 1470px) {
    display: none;
  }
`

export const KBarList = styled.div`
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        background: #dcdde1;
    }
`

export const KBarItem = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 18;
`
export const SidebarMain = styled.div.attrs((props) => ({
  style: {
  marginLeft: props.navVisible ? '0' : '-240px',
  visibility: props.navVisible ? 'visible' : 'hidden'
  },
}))`
width: 240px;
background: #1E1F21;
display: flex;
flex: 0 0 auto;
flex-direction: column;
transition: margin-left 250ms ease-out,transform 250ms ease-out;
`