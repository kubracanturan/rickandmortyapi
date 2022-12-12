import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import OtherCharacterList from '../components/othercharacters';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Row, Col, Breadcrumb } from 'antd';

export default class CharacterList extends React.Component {
  state = {
    characters: ([] as any),
    profile: ([] as any),
  }
  componentDidMount() {
    let characterId = (new URLSearchParams(window.location.search)).get("id")
    
    axios.get(`https://rickandmortyapi.com/api/character/` + characterId)
      .then(res => {
        const profile = res.data;
        this.setState({ profile });
    }).catch(error => {
      return error;
    });
    
  }

  render() {
    return (
        <div className='container'>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/characters">
              <UserOutlined />
              <span>Characters</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.profile.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="ProfileCard">
            <Row gutter={[16, 22]}>
              <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <img src={this.state.profile.image} alt={this.state.profile.name}   />
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 12}}>
                <h2>{this.state.profile.name}</h2>
                <p className={this.state.profile.status}><span></span> {this.state.profile.status}</p>
                <p>{this.state.profile.species}</p>
                <p>{this.state.profile.gender}</p>
              </Col>
            </Row>
          </div>
          <div>
          <OtherCharacterList/>
          </div>
        </div>
    )
  }
}