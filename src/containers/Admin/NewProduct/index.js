import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import { useUser } from "../../../hooks/UserContext";

import { api } from '../../../services/api'
import { ButtonStyles } from "../styles";
import { Container, Input, Label, LabelUpload } from './styles'

function NewProduct() {
    const [fileName, setFileName] = useState()
    const [categories, setCategories] = useState()
    const { register, handleSubmit, control } = useForm()
    const { push } = useHistory()
    const { logout } = useUser()
    const onSubmit = data => console.log(data)

    useEffect(() => {

        async function loadCategories() {
            try {
                const { data } = await api.get('categories')

                setCategories(data)
            }
            catch (error) {
                if (error.response.data.error === 'Token is invalid') {
                    toast.error('Tempo de conexão expirado, faça login novamente!', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        logout()
                        push('/')
                    }, 1500)
                }
            }
        }

        loadCategories()
    }, [])



    return (
        <Container>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Label>Nome</Label>
                <Input type="text" {...register('name')} />
                <Label>Preço</Label>
                <Input type="number" {...register('price')} />
                <LabelUpload>
                    {fileName || 'Carregue a imagem do produto.'}
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/svg"
                        {...register('file')}
                        onChange={value => { setFileName(value.target.files[0]?.name) }}
                    />
                </LabelUpload>
                <Controller
                    name="category_id"
                    control={control}
                    render={({ field }) => {
                        return (
                            <ReactSelect
                                {...field}
                                options={categories}
                                getOptionLabel={cat => cat.name}
                                getOptionValue={cat => cat.id}
                                placeholder="Categorias"
                            />
                        )
                    }}
                >
                </Controller>
                <ButtonStyles>Adicionar Produto</ButtonStyles>
            </form>
        </Container>
    )
}

export default NewProduct
