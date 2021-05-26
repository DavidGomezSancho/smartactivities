import React from "react";
import web3 from '../../components/web3';
import smartActivities from '../../contracts/SmartActivities';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { Button } from "semantic-ui-react";

class Actividad extends React.Component {

  state = {
    symbol: '',
    title: 'Cargando...',
    description: 'Cargando...',
    ownersName: 'Cargando...',
    resume: 'Cargando...',
    startActivityDate: 'Cargando...',
    endActivityDate: 'Cargando...',
    startAllowedJoinActivityDate: 'Cargando...',
    endAllowedJoinActivityDate: 'Cargando...',
    inscribed: false,
    assisted: false,
    voted: false,
    starscore: 'Cargando...',
    votedCount: 0,
    activityId: 0,
    buttonEnabled: false,
    success: false,
    starsVote: 5
  };

  async componentDidMount() {
    const symbol = await smartActivities.methods.symbol().call();
    this.setState({symbol});

    const activity = await smartActivities.methods.getCompleteActivity(this.props.actividadId).call();
    const accounts = await web3.eth.getAccounts();
    const inscribed = await smartActivities.methods.getInscribed(this.props.actividadId, accounts[0]).call();
    const assisted = await smartActivities.methods.getAssisted(this.props.actividadId, accounts[0]).call();
    const voted = await smartActivities.methods.getVoted(this.props.actividadId, accounts[0]).call();
console.log(activity.inscribed);
    this.setState({title: activity.title});
    var starscore;
    if(activity.votedCount != 0) {
      starscore = (activity.stars/activity.votedCount).toFixed(2);
    } else {
      starscore = 'Sin puntuación';
    }

    console.log(activity);
    this.setState({title: activity.title});
    this.setState({description: activity.description});
    this.setState({ownersName: activity.ownersName});
    this.setState({resume: activity.resume});
    this.setState({startActivityDate: activity.startActivityDate*1000});
    this.setState({endActivityDate: activity.endActivityDate*1000});
    this.setState({startAllowedJoinActivityDate: activity.startAllowedJoinActivityDate*1000});
    this.setState({endAllowedJoinActivityDate: activity.endAllowedJoinActivityDate*1000});
    this.setState({inscribed});
    this.setState({assisted});
    this.setState({voted});
    this.setState({starscore});
    this.setState({votedCount: activity.votedCount});
    this.setState({activityId: this.props.actividadId});
    this.setState({buttonEnabled: true});

  }


  async inscribe(event, activityId) {
    this.setState({success: false});
    const accounts = await web3.eth.getAccounts();
    this.setState({buttonEnabled: false});
    await smartActivities.methods.inscribeToActivity(activityId).send({
      from: accounts[0]
    });
    this.setState({inscribed: true});
    this.setState({buttonEnabled: true});
    this.setState({success: true});
  }

  async assist(event, activityId) {
    this.setState({success: false});
    const accounts = await web3.eth.getAccounts();
    this.setState({buttonEnabled: false});
    await smartActivities.methods.assist(activityId).send({
      from: accounts[0]
    });
    this.setState({assisted: true});
    this.setState({buttonEnabled: true});
    this.setState({success: true});
  }

  async vote(event, activityId) {
    this.setState({success: false});
    let newVotedCount = this.state.votedCount + 1;
    let newStarscore = (this.state.starscore * this.state.votedCount + this.state.starsVote)/newVotedCount;
    const accounts = await web3.eth.getAccounts();
    this.setState({buttonEnabled: false});
    await smartActivities.methods.vote(activityId, this.state.starsVote).send({
      from: accounts[0]
    });
    this.setState({voted: true});
    this.setState({buttonEnabled: true});
    this.setState({success: true});
    this.setState({votedCount: newVotedCount});
    this.setState({starscore: newStarscore});
  }

  changeStarsVoteState(event) {
    this.setState({starsVote: event.target.value});
    console.log(this.state.starsVote);
  }


  renderButton() {
    var button='';
    var now = new Date();
    if(this.state.buttonEnabled) {
      if(this.state.inscribed == false) {//TODO comprobar que se pueda por fechas
        if( !(now > this.state.startAllowedJoinActivityDate && now < this.state.endAllowedJoinActivityDate) ) { return button; }
        button = <Button onClick={(event) => this.inscribe(event, this.state.activityId)} primary>Inscribirse en actividad</Button>;
      } else if(this.state.assisted == false) {
        if( now < this.state.endActivityDate ) { return button; }
        button = <Button onClick={(event) => this.assist(event, this.state.activityId)} primary>Pulse si ha asistido a la actividad</Button>;
      } else if(this.state.voted == false) {
        button = <div>0<input type="range" onChange={(event) => this.changeStarsVoteState(event)} min="0" max="5"/>5 &nbsp;&nbsp;
          <Button onClick={(event) => this.vote(event, this.state.activityId)} primary>Votar</Button></div>;
      }
    } else {
      button = <Button disabled>Procesando...</Button>;
    }
    return button;
  }

  renderSuccess() {
    if(this.state.success == true) {
      return "Operación realizada con éxito";
    }
  }

  render() {
    return (
      <div>
      <Header specialCase="." />
      <section id='izda_foto'>
  			<h2 id="titulot">Titulo:  </h2>
  			<h1><div id="tituloedb" > &nbsp;&nbsp;{this.state.title}</div></h1>
        <hr/>
        <p></p>
        <h2>Resumen: </h2>
        <h1> &nbsp;&nbsp;{this.state.resume}</h1>
		  </section>

      <section id='izda_actividad' >
			<table id='actividad'>
					<tr >
						<td >
							Descripcion:
						</td>
						<td id="descrt">
							{this.state.description}
						</td>
						<td id="descredb">
						</td>
					</tr>
					<tr>
						<td >
							Nombre creador del contrato:
						</td>
						<td id="lugart">
							{this.state.ownersName}
						</td>
						<td id="lugaredb">
						</td>
					</tr>
					<tr>
						<td>
							Puntuación sobre 5:
						</td>
						<td id="fechat">
							{this.state.starscore}
						</td>
						<td id="fechaedb">
						</td>
					</tr>
					<tr>
						<td>
							Nº votaciones:
						</td>
						<td id="horat">
							{this.state.votedCount}
						</td>
						<td id="horaedb">
						</td>
					</tr>
					<tr >
						<td>
							Empieza:
						</td>
						<td id="capazt">
							{new Date(this.state.startActivityDate).toLocaleString('en-GB')}
						</td>
						<td id="capazedb">

						</td>
					</tr>
					<tr>
						<td>
							Finaliza:
						</td>
						<td id="inscrit">
							{new Date(this.state.endActivityDate).toLocaleString('en-GB')}
						</td>
						<td>
						</td>
					</tr>
          <tr>
						<td>
							Fecha inicio permiso suscripción:
						</td>
						<td id="inscrit">
							{new Date(this.state.startAllowedJoinActivityDate).toLocaleString('en-GB')}
						</td>
						<td>
						</td>
					</tr>
          <tr>
						<td>
							Fecha final permiso suscripción:
						</td>
						<td id="inscrit">
							{new Date(this.state.endAllowedJoinActivityDate).toLocaleString('en-GB')}
						</td>
						<td>
						</td>
					</tr>
          <tr>
						<td>
							id actividad:
						</td>
						<td id="inscrit">
							{this.props.actividadId}
						</td>
						<td>
						</td>
					</tr>
					<tr>
						<td>
{this.renderButton()}
<p id="success">{this.renderSuccess()}</p>
						</td>
						<td align='center'>

							<div id="bot"></div>

						</td>
						<td>

						</td>
					</tr>
				</table>
		</section>
      </div>
    );
  }
}
export default () => {
    const router = useRouter();
    return (
        <Actividad actividadId={router.query.actividad} />
    )
}
