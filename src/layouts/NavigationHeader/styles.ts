import styled from "styled-components";
import { motion } from "framer-motion";
import { InputText } from 'primereact/inputtext';

export const Container = styled(motion.div)`
    border-bottom: 1px solid lightgray;
    padding: 0 0.5rem;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
`

export const PageTitle = styled(motion.div)`
    align-self: center; 
    padding-left: 2rem;
    font-size: 1.3rem;
    width: 10rem;
`

export const IconItem = styled.i`
    cursor: pointer;
`

export const SectionTitle = styled.div`
    align-self: start;
    padding-top: 0.5rem;
    padding-left: 0.5rem;
`

export const SearchBar = styled.div`
    cursor: pointer;
`

export const QuickAddTask = styled.div`
    background: #2381FE;
    border-radius: 100%;
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
`

export const Profile = styled.div`
    padding-left: 1rem;
`

export const RightSide = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 1rem;
`

export const IconContainer = styled.div`
    display: flex;
    align-items: center;
`

export const LeftSide = styled(motion.div)`
    display: flex;
    height: 100%;
`

export const CustomInputText = styled(InputText)`
    height: 25px;
    width: 8rem;
`

export const NotificationBell = styled.div`
    padding-left: 1rem;
`

export const TabMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Middle = styled.div`

`