    import React, { useState, useEffect } from "react";
    import { useNavigate } from 'react-router-dom'
    import Edit from "./Edite";

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
                <h1>Liste des Instruments</h1>
                {instruments.map((instrument) => (
                    <div key={instrument.Id_instrument}>
                        <hr />
                        <h2>{instrument.Nom}</h2>
                        <p>{instrument.Categorie}</p>
                        <p>{instrument.prix}€</p>
                        <button onClick={() => console.log(instrument.Id_instrument)}>Modifier</button>
                        <hr />
                    </div>
                ))}
            </>
        );
    }

    export default Affichage