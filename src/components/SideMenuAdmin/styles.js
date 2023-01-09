import styled from 'styled-components'

import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: #3c3c3c;
  box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.15);
  width: 300px;
  top: 0;
  left: 0;

  hr {
    margin: 50px 15px;
  }
`

export const ItemContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: ${props => props.isActive ? '#565656' : 'none'};
  border-radius: 2px;
  margin: 10px;
  padding-left: 20px;

  .icon {
    color: #FFFFFF;
  }
`

export const ListLink = styled(Link)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  font-weight: 19px;
  text-decoration: none;
  color: #FFFFFF;
  margin-left: 10px;
`
