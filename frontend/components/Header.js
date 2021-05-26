import React from "react";

const Header = (props) => {
  return (
    <header id='cabecera'>
      <div id='logo'>
        <a href='../'>SmartActivities
        <span className='slogan'>Haz actividades en ethereum</span></a>
      </div>
      <div id='busqueda'/>
      <div id='panel'>
       <a href={props.specialCase + './crearactividad'}>Crear Actividad</a>
       <a href={props.specialCase + './anadirusuario'}>Añadir usuario</a>
      </div>
    </header>
  );
};

export default Header;
