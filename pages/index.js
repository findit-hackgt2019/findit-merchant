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
import {isMobile} from 'react-device-detect';
import { getOrder } from "../src/actions/mongo";

const QrReader = dynamic(() => import('react-qr-reader'), { ssr: false });

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: {
        items: []
      },
      modal: false,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  componentDidMount() {
    this.renderContent();
  }

  renderContent = () => {
    if (isMobile) {
        alert("This tool is not supported on mobile!")
    }
  }

  handleScan = async (id) => {
    if (id != null && this.state.modal === false) {
      const data = await getOrder(id);

      if (data != null && data.items != null) {
        this.setState({
          result: data,
          modal: !this.state.modal,
        });
      }
    }
  };

  handleError = (err) => {
    console.error(err)
  };

  render() {
    const { result } = this.state;

    return (
      <div style={{ backgroundColor: '#2a2a2e', height: '100vh' }} >
        <Jumbotron className="header" style={{ backgroundColor: '#6934ff' }}>
          <div style={{display:"flex", alignItems:"center"}}>
            <img src="/static/icon.png" style={{height:"15vh"}}/>
            <div style={{ marginLeft:32 }}>
              <h1 className="display-5" style={{ fontWeight: '600', fontSize: '54px', color: '#fff' }}>FindIt Scanner</h1>
              <p className="subhead" style={{ fontWeight: '600', fontSize: '28px' }} >Ask Customers to Scan their Order QR Below!</p>
            </div>
          </div>
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
          <ModalHeader style={{ backgroundColor: '#6934ff', color: '#fff' }} toggle={ this.toggle}><p className="subhead" style={{ margin: '0 auto', fontWeight: '600', fontSize: '28px' }}>Their Order</p></ModalHeader>
          <ModalBody style= {{ padding: '20px', backgroundColor: '#1e1d1c' }}>
            {result.items.map(item =>
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
