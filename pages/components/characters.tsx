import React, { useState } from 'react';
import axios from 'axios';
import Image from "next/image";
import Link from 'next/link';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Card, List, Radio, Skeleton, Input, Breadcrumb } from 'antd';



export default class CharacterList extends React.Component {
  state = {
    characters: ([] as any[]),
    locationResidents: ([] as any[]),
    charactersFilt: ([] as any[]),
    value: 1,
    loading: true,
  }

  componentDidMount() {
    const self = this;
    let LocationId = (new URLSearchParams(window.location.search)).get("id")
    if(LocationId == null ) { LocationId = "1" };
    axios.get(`https://rickandmortyapi.com/api/location/` + LocationId)
      .then(res => {
        const locationResidents = res.data.residents;
        axios.all(locationResidents.map(l => axios.get(l)))
        .then(axios.spread(function (...result) {
            const characters = result;
            const charactersFilt = characters;
            self.setState({ charactersFilt });
            self.setState({ characters });
            self.setState({ loading: false });
        }));
      })
  }
 NameChange = (e) => {
    const charactersFilt = this.state.characters;
    this.setState({charactersFilt: this.state.characters.filter(item => item.data.name.toLowerCase() == e.target.value.toLowerCase() )})
  };
  onChange = (e) => {
    const charactersFilt = this.state.characters;
    this.setState({charactersFilt: this.state.characters.filter(item => item.data.status == e.target.value )})
  } 
  render() {
    const { loading } = this.state;
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
          </Breadcrumb>
        <div className='homeSearch'>
          <h2>You can search for the character you want to find quickly below.</h2>
          <Input placeholder="Please enter a character" allowClear onKeyUp={this.NameChange} />
          <h3>Filter by Status</h3>
          <Radio.Group className="radioFilt" onChange={this.onChange}>
              <Radio value="Dead"><span className="dot"></span> Dead</Radio>
              <Radio value="Alive"><span className="dot"></span> Alive</Radio>
              <Radio value="unknown"><span className="dot"></span> Unknown</Radio>
          </Radio.Group>
        </div>
                <List grid={{
                    gutter: 10, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4
                }}
                pagination={{
                    pageSize: 12,
                }}
                dataSource={this.state.charactersFilt}

                renderItem={(character) => (
                    <List.Item key={character.data.id}>
                        <Card className='characterCard'>
                            <Skeleton loading={loading} active title={false} paragraph={{ rows: 2 }} ></Skeleton>
                            <Link href={`/profile/?id=${character.data.id}`}>
                            <img src={character.data.image} alt={character.data.name}   />
                            </Link>
                                <h3>{character.data.name}</h3>
                                <p><span className={character.data.status}></span> {character.data.status} - {character.data.species}</p>
                            
                        </Card>
                    </List.Item>
                    )
                }
                />
        </div>
    )
  }
}