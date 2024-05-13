import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



function Delete() {

    const [instruments, setInstruments] = useState([]);
    const { id } = useParams();

const dixminmax = () => {
    const url = `http://localhost:3000/delete/instrument/${id}`
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        fetch(`http://localhost:3000/instrument/${id}`)
            .then((response) => response.json())
            .then((data) => setInstruments(data));
    }, [id]);

    const navigate = useNavigate();
    const navigatehome = () => {
        navigate('/');
      };


    return (
        <div>
        <h1>Souhaitez-vous supprimer l'instrument</h1>
        {instruments.map((instrument, index) => (
            <p key={index}>
                {instrument.Nom}, {instrument.Categorie}, {instrument.Prix}
            </p>
        ))}
        <button onClick={()=> {dixminmax(); navigatehome()}}>Supprimer</button>
    </div>
    )
}

export default Delete