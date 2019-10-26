import React, { Component } from 'react';
import Head from 'next/head';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from 'reactstrap';
import dynamic from 'next/dynamic';
import '../src/styles/app.css';
import 'bootstrap/dist/css/bootstrap.css';


const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      modal: false,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleScan = (data) => {
    if (data != null && this.state.modal == false) {
      this.setState({
        result: JSON.parse(data),
        modal: !this.state.modal,
      });
    }
  };

  handleError = (err) => {
    console.error(err)
  };

  render() {
    const { items, result } = this.state;

    return (
      <div style={{ backgroundColor: '#f9f9f9', height: '100vh' }} >
        <Jumbotron className="header" style={{ backgroundColor: '#54b948' }}>
          <h1 className="display-5" style={{ fontWeight: '600', fontSize: '54px', color: '#fff' }} >Scanning Unit</h1>
          <p className="subhead" style={{ fontWeight: '600', fontSize: '28px' }} >Ask Customers to Scan their Order QR Below</p>
        </Jumbotron>
        <Head>
          <title>FindIt</title>
          <link rel='icon' href='/favicon.ico'/>
        </Head>

        <div className='content flexColumn flexCenter' style={{ height: '65vh' }}>
          <QrReader
            className='qrReader'
            style= {{ width: '50vh' }}
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
          />

        </div>
        <Modal isOpen={this.state.modal} >
          <ModalHeader style={{ backgroundColor: '#54b948', color: '#fff' }} toggle={ this.toggle}><p className="subhead" style={{ margin: '0 auto', fontWeight: '600', fontSize: '28px' }}>Their Order</p></ModalHeader>
          <ModalBody style= {{ padding: '20px', backgroundColor: '#1e1d1c' }}>
            {result.map(item=>
                <div>
                  <ListGroup>
                    <ListGroupItem style={{ margin: '15px' }}>
                      <ListGroupItemHeading style={{ fontWeight: '600', fontSize: '32px', textTransform: 'capitalize' }}>{item.name}</ListGroupItemHeading>
                      <ListGroupItemText className='listItem'>
                        Price: ${item.price}
                      </ListGroupItemText>
                      <ListGroupItemText className='listItem'>
                        Quantity: {item.quantity}
                      </ListGroupItemText>
                    </ListGroupItem>
                  </ListGroup>
                </div>
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Home;
