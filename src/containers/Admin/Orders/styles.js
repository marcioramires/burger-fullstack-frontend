import styled from "styled-components";
import ReactSelect from "react-select";

export const Container = styled.div`
    background-color: #efefef;
    min-height: 100vh;
    padding: 20px;
`

export const ProductImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 5px;
`

export const ReactSelectStyle = styled(ReactSelect)`
    width: 250px;

    .css-13cymwt-control {
        cursor: pointer;
    }
`

export const Menu = styled.div`
    display: flex;
    gap: 50px;
    justify-content: center;
    margin: 20px 0;
`

export const LinkMenu = styled.a`
    color: ${props => props.isActiveStatus ? '#9758a6' : '#323d5d'};
    font-weight: ${props => props.isActiveStatus ? 'bold' : 'normal'};
    border-bottom: ${props => props.isActiveStatus ? '2px solid #9758a6' : 'none'};
    padding-bottom: 5px;
    cursor: pointer;
`