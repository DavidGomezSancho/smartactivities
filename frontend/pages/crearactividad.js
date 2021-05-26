import React from "react";
import web3 from '../components/web3';
import smartActivities from '../contracts/SmartActivities';
import { Form, Button } from "semantic-ui-react";
import Header from '../components/Header';

class CrearActividad extends React.Component {

  state = {
    buttonEnabled: true
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({buttonEnabled: false});
    const accounts = await web3.eth.getAccounts();

    await smartActivities.methods.addActivity(this.state.activityTitle, this.state.activityResume,
        this.state.activityDescription,
        this.state.activityOwnersName,
        Date.parse(this.state.activityStarDate)/1000,
        Date.parse(this.state.activityEndDate)/1000,
        Date.parse(this.state.activityStarAllowedDate)/1000,
        Date.parse(this.state.activityEndAllowedDate)/1000).send({
      from: accounts[0]
    });
    this.setState({buttonEnabled: true});
  };

  renderButton() {
    if(this.state.buttonEnabled) {
      return <Button primary>Crear Actividad</Button>;
    } else {
      return <Button disabled>Procesando...</Button>;
    }
  }

  render() {
    return (
      <div>
      <Header specialCase=""/>
      <div id='centro'>
        <h3>Crear Actividad</h3>
        <Form onSubmit={this.onSubmit}>
        <Form.Field>
        <table id='actividad'>
            <tr >
              <td >
                <label>Título: </label>
              </td>
              <td>
              <input onChange={(event) =>
                  this.setState({ activityTitle: event.target.value })
                }/>
              </td>
            </tr>
            <tr >
              <td >
                <label>Resumen: </label>
              </td>
              <td>
              <input onChange={(event) =>
                  this.setState({ activityResume: event.target.value })
                }/>
              </td>
            </tr>
            <tr >
              <td >
                <label>Descripción: </label>
              </td>
              <td>
              <textarea onChange={(event) =>
                  this.setState({ activityDescription: event.target.value })
                }/>
              </td>
            </tr>
            <tr >
              <td >
                <label>Nombre creador: </label>
              </td>
              <td>
              <input onChange={(event) =>
                  this.setState({ activityOwnersName: event.target.value })
                }/>
              </td>
            </tr>
            <tr >
              <td >
                <label>Fecha de inicio: </label>
              </td>
              <td>
              <input type='datetime-local' onChange={(event) =>
                  this.setState({ activityStarDate: event.target.value })
                }/>
              </td>
            </tr>
            <tr >
              <td >
                <label>Fecha de final: </label>
              </td>
              <td>
              <input type='datetime-local' onChange={(event) =>
                  this.setState({ activityEndDate: event.target.value })
                }/>
              </td>
            </tr>
            <tr >
              <td >
                <label>Fecha inicial permitida para apuntarse: </label>
              </td>
              <td>
              <input type='datetime-local' onChange={(event) =>
                  this.setState({ activityStarAllowedDate: event.target.value })
                }/>
              </td>
            </tr>
            <tr >
              <td >
                <label>Fecha final permitida para apuntarse: </label>
              </td>
              <td>
              <input type='datetime-local' onChange={(event) =>
                  this.setState({ activityEndAllowedDate: event.target.value })
                }/>
              </td>
            </tr>
        </table>
        </Form.Field>
        <center>{this.renderButton()}</center>
        </Form>
        </div>
        </div>
    );
  }
}
export default CrearActividad;
