    import React, { useState, useEffect } from "react";
    import { NavLink, useNavigate } from 'react-router-dom'

    function Affichage() {
        const [instruments, setInstruments] = useState([]);

        const navigateedit = () => {
            navigate('/edit');
          };


        useEffect(() => {
            fetch("http://localhost:3000/instrument")
                .then((response) => response.json())
                .then((data) => setInstruments(data));
        }, []);

        return (
            <>
                <h1 className=" mb-5  font-bold">Liste des Instruments</h1>
                {instruments.map((instrument) => (
                    <div className=" flex" key={instrument.Id_instrument}>
                        <hr />
                        <h2>{instrument.Nom}</h2>
                        <p>{instrument.Categorie}</p>
                        <p>{instrument.Prix}€</p>
                        <NavLink to={`/edit/${instrument.Id_instrument}`}>Modifier             </NavLink>
                        <NavLink to={`/delete/${instrument.Id_instrument}`}>                              Supprimer</NavLink>
                        <hr />
                    </div>
                ))}
            </>
        );
    }

    export default Affichage