import React, { Component } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import '../src/styles/app.css';

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: 'No result',
      items: [1, 2, 3]
    };
  }

  handleScan = (data) => {
    if (data != null) {
      this.setState({
        result: data
      });
    }
  };

  handleError = (err) => {
    console.error(err)
  };

  render() {
    const { items, result } = this.state;

    return (
      <div>
        <Head>
          <title>FindIt</title>
          <link rel='icon' href='/favicon.ico'/>
        </Head>

        <div className='content flexColumn flexCenter'>
          <QrReader
            className='widthSmall'
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
          />
          <p>{this.state.result}</p>
          <div className='content flexColumn flexCenter'>
            {items.map((item) => (
              <div>{item}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
