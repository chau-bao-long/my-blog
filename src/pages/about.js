import React from 'react';
import styled from 'styled-components';
import { Button, Switch } from 'antd';

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <Container>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="danger">Danger</Button>
    <Switch defaultChecked />
  </Container>
);
