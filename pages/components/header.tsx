import React from 'react';
import Image from 'next/image'
import { Row, Col } from 'antd';

export default class CharacterList extends React.Component {

  render() {
    return (
        <header>
            <Row>
                <Col xs={2} sm={4} md={9}>
                </Col>
                <Col xs={20} sm={16} md={6} align="center">
                  <a href="/"><Image src="/logo.png" alt="Rick And Morty Logo" width={220} height={85} /></a>
                </Col>
                <Col xs={2} sm={4} md={9}>
                </Col>
            </Row>
            <div className='headerMenu'>
              <ul>
                <li><a href="/"> Locations</a></li>
                <li><a href="/characters"> Characters</a></li>
              </ul>
            </div>
        </header>
    )
  }
}
