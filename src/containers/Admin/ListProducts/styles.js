import styled from 'styled-components'

export const Container = styled.div`
    button{
        width: 30px;
        height: 30px;
        border: none;
        background: none;
        cursor: pointer;

        &:hover{
            opacity: 0.7;
        }   

        &:active{
            opacity:0.3;
        }
    }
`
