import styled from "styled-components";
import { Button } from "../../components";

export const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    min-height: 100vh;
    width: 100%;
    background-color: #efefef;   
`

export const ContainerItems = styled.div`
    padding: 20px;
    width: 100%;
`

export const ButtonStyles = styled(Button)`
    width: 100%;
    margin-top: 25px;
`