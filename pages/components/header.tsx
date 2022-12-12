import React from 'react';
import Image from 'next/image'
import { Row, Col } from 'antd';
import Link from 'next/link'

export default class CharacterList extends React.Component {

  render() {
    return (
        <header>
            <Row>
                <Col xs={2} sm={4} md={9}>
                </Col>
                <Col xs={20} sm={16} md={6} >
                <Link href="/"><Image src="/logo.png" alt="Rick And Morty Logo" width={220} height={85} /></Link>
                </Col>
                <Col xs={2} sm={4} md={9}>
                </Col>
            </Row>
            <div className='headerMenu'>
              <ul>
                <li><Link href="/"> Locations</Link></li>
                <li><Link href="/characters"> Characters</Link></li>
              </ul>
            </div>
        </header>
    )
  }
}
