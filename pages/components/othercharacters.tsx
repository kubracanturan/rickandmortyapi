import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import { Card, List } from 'antd';
import Link from 'next/link'



export default class OtherCharacterList extends React.Component {
  state = {
    characters: ([] as any[]),
  }

  componentDidMount() {
    axios.get(`https://rickandmortyapi.com/api/character`)
      .then(res => {
        const characters = res.data.results.slice(0, 6);
        this.setState({ characters });
        console.log(characters)
    })
  }
  render() {
    return (
      <div className='OtherContainer container'>
        <h2>Other Characters</h2>
                <List grid={{
                    gutter: 10, xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 3
                }}
                dataSource={this.state.characters}

                renderItem={(character) => (
                    <List.Item key={character.id}>
                        <Card className='characterCard'>
                            <Link href={`/profile/?id=${character.id}`}>
                            <img src={character.image} alt={character.name}  />
                            </Link>
                                <h3>{character.name}</h3>
                                <p><span className={character.status}></span> {character.status} - {character.species}</p>
                            
                        </Card>
                    </List.Item>
                    )
                }
                />
        </div>
    )
  }
}