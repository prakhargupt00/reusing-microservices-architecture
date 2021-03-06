import React, { Component, Fragment } from 'react'
import { Form, Col, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import config from 'react-global-configuration'
import Header from './Header'


class RegisterService extends Component {

  state = {
    title: '',
    description: '',
    params: '',
    url: '',
    batchSize: '',
    getRoute: '',
    postRoute: '',
  }

  handleChange = event => {
    event.preventDefault()
    const {id, value} = event.target
    this.setState({
        [id]: value      
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const route = config.get('host_url') + config.get('routes.addRequested')
    var data = {...this.state}
    data.params = data.params.split(/\s*,\s*/)
    
    axios.post(route, {data: data}) 
    .then(res => {
      if(res.data === '0') {
        alert('Request has been added')
      } else {
        alert('Error in addition!')
      }
    })
    .catch(error => {
        console.log(error)
        alert('Error in sending the request!!!')
    })
  }

  render () {
    return (
      <Fragment>
        <Header />
        <Container> 
          <h3> Request for a new Microservice </h3>  
          <br />       
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="title">
                <Form.Label> Title </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name of the microservice"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="description">
                <Form.Label> Description </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="params">
                <Form.Label> Parameters </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="comma(,) separated"
                  value={this.state.params}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="batchSize">
                <Form.Label> Batch Size </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="(1 if no batching supported)"
                  value={this.state.batchSize}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="url">
                <Form.Label> URL </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Site URL"
                  value={this.state.url}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="getRoute">
                <Form.Label> Get Route </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Get Route"
                  value={this.state.getRoute}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="postRoute">
                <Form.Label> Post Route </Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Post Route"
                  value={this.state.postRoute}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form.Row>

            <Button 
              variant='outline-primary' 
              size='md' 
              name='submit' 
              onClick={this.handleSubmit}
              > 
              Submit 
            </Button>
          </Form>
        </Container>
      </Fragment>
    )
  }
}

export default RegisterService
