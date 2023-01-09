import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";

import api from '../../../services/api'
import { ButtonStyles } from "../styles";
import { Container, Input, Label } from './styles'

function NewProduct() {
    const { register, handleSubmit } = useForm()
    const onSubmit = data => console.log(data)

    useEffect(() => {
        async function loadProducts() {
            const { data } = await api.get('products')

        }

        loadProducts()
    }, [])



    return (
        <Container>
            <form noValidate>
                <Label>Nome</Label>
                <Input type="text" {...register('name')} />
                <Label>Preço</Label>
                <Input type="number" {...register('price')} />
                <Label>Upload da image</Label>
                <Input type="file" accept="image/png, image/jpeg, image/svg" />
                <ReactSelect />
                <ButtonStyles>Adicionar Produto</ButtonStyles>
            </form>
        </Container>
    )
}

export default NewProduct
