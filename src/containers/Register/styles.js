import styled from 'styled-components'

import Background from '../../assets/background.svg'

export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: url('${Background}');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContainerItems = styled.div`
    background: #373737;
    box-shadow: 0px 4px 15px rgba(74, 144, 226, 0.24);
    border-radius: 0 10px 10px 0;
    height: max-content;
    padding: 25px 75px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        color: #FFFFFF;
        margin-top: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
    }
`

export const Label = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #FFFFFF;
    margin-top: ${props => (props.error ? '0px' : '20px')};
    margin-bottom: 5px;
`

export const LabelUpload = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px dashed #ffffff;
    border-radius: 5px;
    padding: 10px;
    margin: 20px 0;
    color: #ffffff;

    input {
        opacity: 0;
        width: 1px;
        border: ${props => props.error ? '2px solid #CC1717;' : 'none'};
    }
`

export const Input = styled.input`
    width: 391.42px;
    height: 38.32px;
    background: #FFFFFF;
    box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
    border-radius: 5px;
    border: ${props => props.error ? '2px solid #CC1717;' : 'none'};
    padding-left: 10px;
`

export const SignInLink = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;

    a {
        cursor: pointer;
        text-decoration: underline;
    }
`

export const ErrorMessage = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: #cc1717;
    margin-top: 2px;
`