import * as React from 'react';
import Hello from "./hello";
import styled, { css } from 'styled-components'


const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

const Container = styled.div`
  text-align: center;
`
export default () => {
  return (
    <div className="app-home-page">
      <Hello compiler="TypeScript" framework="React" />
      <Container>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </Container>
      <h1>随性的记录</h1>
      <p>方便地记录照片、文字、音乐、视频，适用于iPhone、iPad和Android移动客户端及PC端，
让你随时随地的记录与分享。</p>
    </div>)
}