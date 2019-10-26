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
      <div>
        <Jumbotron>
          <h1 className="display-5">Scanning Unit</h1>
          <p className="lead">Ask customers to scan their order QR's below</p>
          <p className="lead"> </p>
        </Jumbotron>
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

        </div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={ this.toggle}>Application</ModalHeader>
          <ModalBody>
            {result.map(item=>
                <div>
                  <ListGroup>
                    <ListGroupItem>
                      <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
                      <ListGroupItemText>
                        Price: {item.price} Number: {item.quantity}
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
