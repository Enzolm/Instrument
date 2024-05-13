import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'


function New() {
    const [NomInstrument, setNomInstrument] = useState('')
    useEffect(() => {
        console.log(NomInstrument)       
    }, [NomInstrument])

    const [PrixInstrument, setPrixInstrument] = useState('')
    useEffect(() => {
        console.log(PrixInstrument)       
    }, [PrixInstrument])

    const [CategorieInstrument, setCategorieInstrument] = useState('')
    useEffect(() => {
        console.log(CategorieInstrument)       
    }, [CategorieInstrument])

    const log = ()=>{
        console.log(JSON.stringify({NomInstrument, PrixInstrument, CategorieInstrument}))
    }

    const inputInstrument = (e) => {
        setNomInstrument(e.target.value)
    }
    const inputPrix = (e) => {
        setPrixInstrument(e.target.value)
    }
    const inputCategorie = (e) => {
        setCategorieInstrument(e.target.value)
    }


    const [data, setData] = useState([])


    const enculéxD = () => {
        console.log(JSON.stringify({NomInstrument, PrixInstrument, CategorieInstrument}))
        fetch('http://localhost:3000/add/instrument', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({NomInstrument,CategorieInstrument, PrixInstrument})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const navigate = useNavigate();
    const navigatehome = () => {
        navigate('/');
      };

    return (
        <>
        <div>
            <h1>{NomInstrument}</h1>
        </div>
        <div>
            <input onInput={(e) => inputInstrument(e)} type="text" placeholder="Nom de l'instrument" />
            <input onInput={(e) => inputPrix(e)} type="text" placeholder="Prix de l'instrument" />
            <input onInput={(e)=> inputCategorie(e)} type="text" placeholder="Categorie de l'instrument" />
        </div>
        <button onClick={()=>{enculéxD();navigatehome()}}>
            Ajouter
        </button>
        </>
    )
}



export default New