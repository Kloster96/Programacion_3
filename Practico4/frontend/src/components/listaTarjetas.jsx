import React from "react";
import TarjetaPersona from "./tarjetaPersona";
import './listaTarjetas.css';

const listaTarjetas = ({personas}) => {
    if(!personas || personas.length === 0){
        return <p>No hay personas para mostrar.</p>;
    }
    console.log('--- Dentro de ListaTarjetas ---');
    console.log('Valor de la prop "personas":', personas);
    console.log('¿La prop "personas" es un array?', Array.isArray(personas));
    console.log('-----------------------------');

    return (
        <div className="lista-tarjetas">
            {personas.map(persona => (
                <TarjetaPersona key={persona.id} persona={persona} />
            ))}
        </div>
    );
};

export default listaTarjetas;