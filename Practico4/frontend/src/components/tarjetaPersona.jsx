import React from "react";
import './tarjetaPersona.css';

const tarjetaPersona = ({ persona }) => {
    return (
        <div className="tarjeta-persona">
            <h2>
                {persona.nombre} {persona.apellido}
            </h2>
            <p><strong>Edad:</strong>{persona.edad}</p>
            <p><strong>Email:</strong>{persona.email}</p>
            <p><strong>ID:</strong>{persona.id}</p>
        </div>
    );
};

export default tarjetaPersona;