import React from 'react'

import { Container, ItemContainer, ListLink } from './styles'
import listLinks from './menu-list'
import { useUser } from '../../hooks/UserContext'
import paths from '../../constants/paths'

export function SideMenuAdmin({ path }) {
    const { logout } = useUser()

    return (
        <Container>
            <hr></hr>
            {listLinks.map(item => (
                <ItemContainer key={item.id} isActive={path === item.link}>
                    <img src={item.icon} className="icon" />
                    <ListLink to={item.link}>{item.label}</ListLink>
                </ItemContainer>
            ))}
            <hr></hr>
            <ItemContainer style={{ position: 'fixed', bottom: '30px' }}>
                <ListLink to={paths.Login} onClick={logout}>Sair</ListLink>
            </ItemContainer>
        </Container>
    )
}