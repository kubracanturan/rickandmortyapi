import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, List, Skeleton, Input } from 'antd';

export default class LocationList extends React.Component {
  state = {
    locations: ([] as any[]),
    loading: true,
  }

  componentDidMount() {
    axios.get(`https://rickandmortyapi.com/api/location`)
      .then(res => {
        const locations = res.data.results;
        this.setState({ locations });
        this.setState({ loading: false });
      })
  }
  NameChange = (e) => {
    axios.get(`https://rickandmortyapi.com/api/location?name=` + e.target.value)
    .then(res => {
      const locations = res.data.results;
      this.setState({ locations });
    }).catch(error => {
      return error;
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className='container'>
        <div className='homeSearch'>
          <h2>You can search for the location you want to find quickly below.</h2>
          <Input placeholder="Please enter a location" allowClear onKeyUp={this.NameChange} />
        </div>
        <List 
        grid={{
          gutter: 10, xs: 1, sm: 2, md: 2, lg: 4, xl: 4, xxl: 4
      }}
      itemLayout="vertical" size="large"  pagination={{
            pageSize: 8,
          }}
          dataSource={this.state.locations}

          renderItem={(location) => (

                <List.Item key={location.id}>
                    <Card className='LocationCard'>
                    <Skeleton loading={loading} active title={false} paragraph={{ rows: 2 }} ></Skeleton>
                      <a href={`/characters/?id=${location.id}`}>
                        <h3>{location.name}</h3>
                        <p>Type: <span>{location.type}</span></p>
                        <p>Dimension: <span>{location.dimension}</span></p>
                        <p>Resident Count: <span>{location.residents.length}</span></p>
                      </a>
                    </Card>
                </List.Item>
            )
        }
        />
      </div>
    )
  }
}