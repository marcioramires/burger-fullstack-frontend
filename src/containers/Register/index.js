import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { Link, useHistory } from 'react-router-dom'

import { api } from '../../services/api'

import { Button } from '../../components'
import {
  Container,
  ContainerItems,
  Label,
  LabelUpload,
  Input,
  SignInLink,
  ErrorMessage
} from './styles'

export function Register() {
  const [fileName, setFileName] = useState()
  const history = useHistory()

  const schema = Yup.object().shape({
    name: Yup.string('O seu nome é obrigatório').required(),
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 dígitos'),
    confirmPassword: Yup.string().required('A senha é obrigatória').oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    try {
      const clientDataForm = new FormData()

      clientDataForm.append('name', clientData.name)
      clientDataForm.append('address', clientData.address)
      clientDataForm.append('phone', clientData.phone)
      clientDataForm.append('email', clientData.email)
      clientDataForm.append('birthday', clientData.birthday)
      clientDataForm.append('login', clientData.login)
      clientDataForm.append('password', clientData.password)
      clientDataForm.append('file', clientData.file[0])

      const { status } = await api.post('users', clientDataForm)

      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso. Faça seu login!')
        setTimeout(() => { history.push('/') }, 3000)
      } else if (status === 409) {
        toast.error('E-mail já cadastrado! Faça login para continuar')
        setTimeout(() => { history.push('/') }, 3000)
      } else {
        throw new Error()
      }

    } catch (err) {
      toast.error('Fala no sistema! Tente novamente')
    }
  }

  return (
    <Container>
      <ContainerItems>
        <h1>
          Cadastre-se
        </h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome</Label>
          <Input type="name" {...register('name')} error={errors.name?.message} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.address?.message}>Endereço</Label>
          <Input type="name" {...register('address')} error={errors.address?.message} />
          <ErrorMessage>{errors.address?.message}</ErrorMessage>

          <Label error={errors.phone?.message}>Telefone</Label>
          <Input type="name" {...register('phone')} error={errors.phone?.message} />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email</Label>
          <Input type="email" {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.birthday?.message}>Data de Nascimento</Label>
          <Input type="email" {...register('birthday')} error={errors.birthday?.message} />
          <ErrorMessage>{errors.birthday?.message}</ErrorMessage>

          <Label error={errors.login?.message}>Usuário para Login</Label>
          <Input type="email" {...register('login')} error={errors.login?.message} />
          <ErrorMessage>{errors.login?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input type="password" {...register('password')} error={errors.password?.message} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <LabelUpload error={errors.file?.message}>
            {fileName || 'Faça o upload da sua foto'}
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register('file')}
              onChange={
                value => {
                  setFileName(value.target.files[0]?.name)
                }}
            />
          </LabelUpload>
          <ErrorMessage>{errors.file?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: "25px", marginBottom: "25px" }}>Cadastrar</Button>
        </form>
        <SignInLink>
          Já possui conta? <Link to="/login" style={{ color: 'white' }}>Faça o login aqui!</Link>
        </SignInLink>
      </ContainerItems>
    </Container >
  );
}
