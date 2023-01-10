import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center; 

    form {
        background-color: #565656;
        border-radius: 10px;
        padding: 30px;
    }
`

export const Label = styled.p`
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 3px;
`

export const Input = styled.input`
    height: 40px;
    background-color: #ffffff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border: none;
    margin-bottom: 25px;
    width:100%;
    min-width: 280px;
`

export const LabelUpload = styled.label`
    cursor: pointer;
    display: flex;
    align-items: center;
    border: 1px dashed #ffffff;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 25px;
    text-align: center;
    color: #b6b6b6;

    input {
        opacity: 0;
        width: 1px;
    }
`