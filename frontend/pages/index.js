import React from "react";
import web3 from '../components/web3';
import smartActivities from '../contracts/SmartActivities';
import ActivityBox from '../components/ActivityBox';
import Header from '../components/Header';

class Index extends React.Component {

  state = {
  };

  async componentDidMount() {
    const activities = await smartActivities.methods.getReducedActivities().call();
    const now = Date.now();
    var activitiesActive = new Array();
    var activitiesInactive = new Array();

    activities.forEach((activity, i) => {
      let unixTimestamp = activity.endAllowedJoinActivityDate;
      let milliseconds = unixTimestamp*1000;
      let endAllowedJoinDate = new Date(milliseconds);
      if(endAllowedJoinDate > now) {
        activitiesActive.push(activity);
      } else {
        activitiesInactive.push(activity);
      }
    });

    this.setState({activitiesActive});
    this.setState({activitiesInactive});
  }

  renderActivitiesActive() {
    var items ;
    if(this.state.activitiesActive != undefined ) {
      items = this.state.activitiesActive.map((activity) => {
        return <ActivityBox title={activity.title}
        title={activity.title}
        endAllowedJoinActivityDate={new Date(activity.endAllowedJoinActivityDate*1000).toLocaleString('en-GB')}
        resume={activity.resume}
        id={activity.activityId}
        key = {activity.activityId}/>;
      });
    } else {
      items = "Cargando...";
    }
    return items;
  }

  renderActivitiesInactive() {
    var items ;
    if(this.state.activitiesInactive != undefined ) {
      items = this.state.activitiesInactive.map((activity) => {
        return <ActivityBox title={activity.title}
        title={activity.title}
        endAllowedJoinActivityDate={new Date(activity.endAllowedJoinActivityDate*1000).toLocaleString('en-GB')}
        resume={activity.resume}
        id={activity.activityId}
        key = {activity.activityId}/>;
      });
    } else {
      items = "Cargando...";
    }
    return items;
  }

  render() {
    return (
      <div>
      <Header specialCase=""/>
      <section id='izquierda'>
  			<h1 className='aligndech'>Actividades activas</h1>
  			<div id='izqrd'>{this.renderActivitiesActive()}</div>
  		</section>
  		<section id='izquierda'>
    		<h1 className='aligndech'>Actividades pasadas</h1>
    			<div id='drcha'>{this.renderActivitiesInactive()}</div>
  		</section>
      </div>
    );
  }
}
export default Index;
