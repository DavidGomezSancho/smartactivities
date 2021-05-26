
import React from "react";



const ActivityBox = (props) => {
  return (
    <a href={'./actividad/' + props.id}><article>
      <span className='titulo1'>titulo: {props.title}</span>
      <span className='slogan'>Resumen: {props.resume}</span>
      <span className='slogan'>Fecha Fin solicitudes permitidas: {props.endAllowedJoinActivityDate}</span>
      <span className='derecha'>Id: {props.id}</span>
    </article></a>
  );
};
export default ActivityBox;
