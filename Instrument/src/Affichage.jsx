    import React, { useState, useEffect } from "react";
    import './App.css'
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
                <h1 className=" mb-5  font-bold font">Liste des Instruments</h1>
                <div className=" flex row-span-3">
                    {instruments.map((instrument) => (
                            <div className=" bg- mx-4 rounded-lg p-2 border-solid border-2 border-black" key={instrument.Id_instrument}>
                                <h2>{instrument.Nom}</h2>
                                <p>{instrument.Categorie}</p>
                                <p>{instrument.Prix}€</p>
                                <NavLink to={`/edit/${instrument.Id_instrument}`}>Modifier             </NavLink>
                                <NavLink to={`/delete/${instrument.Id_instrument}`}>                              Supprimer</NavLink>
                            </div>
                    ))}
                </div>
            </>
        );
    }

    export default Affichage