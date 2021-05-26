import React from "react";
import web3 from '../components/web3';
import smartActivities from '../contracts/SmartActivities';
import { Form, Button } from "semantic-ui-react";
import Header from '../components/Header';

class Anadirusuario extends React.Component {

  state = {
    buttonEnabled: true
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({buttonEnabled: false});
    const accounts = await web3.eth.getAccounts();

    await smartActivities.methods.addUser(this.state.userToAddAddress).send({
      from: accounts[0]
    });
    this.setState({buttonEnabled: true});
  };

  renderButton() {
    if(this.state.buttonEnabled) {
      return <Button primary>Añadir usuario</Button>;
    } else {
      return <Button disabled>Procesando...</Button>;
    }
  }

  render() {
    return (
      <div>
      <Header specialCase=""/>
      <div id='centro'>
        <h3>Añadir usuario</h3>
        <p>  Únicamente permitido para el admin.</p>
        <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Dirección cuenta en ethereum: </label>
          <input onChange={(event) =>
              this.setState({ userToAddAddress: event.target.value })
            }/>
        </Form.Field>
          {this.renderButton()}
        </Form>
      </div>
      </div>
    );
  }
}
export default Anadirusuario;
