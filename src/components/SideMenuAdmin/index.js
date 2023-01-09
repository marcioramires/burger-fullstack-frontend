import React from 'react'

import { Container, ItemContainer, ListLink } from './styles'
import listLinks from './menu-list'
import { useUser } from '../../hooks/UserContext'

export function SideMenuAdmin() {
    const { logout } = useUser()

    return (
        <Container>
            <hr></hr>
            {listLinks.map(item => (
                <ItemContainer key={item.id} isActive={true}>
                    <img src={item.icon} className="icon" />
                    <ListLink to={item.link}>{item.label}</ListLink>
                </ItemContainer>
            ))}
            <hr></hr>
            <ItemContainer style={{ position: 'absolute', bottom: '30px' }}>
                <ListLink to="/login" onClick={logout}>Sair</ListLink>
            </ItemContainer>
        </Container>
    )
}