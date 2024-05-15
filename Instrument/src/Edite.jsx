import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import './App.css'


function Edit() {

    const [instrument, setInstruments] = useState(
        {
            Nom: '',
            Categorie: '',
            Prix: ''
        }
    )
    const handleNewValue = (e) => {
        const name = e.target.name
        const value = e.target.value
        setInstruments(prevValue => ({
            ...prevValue,
            [name]: value
        }))
        console.log(instrument)
    }
    const { id } = useParams()

    const enculéxD = () => {
        const url=`http://localhost:3000/edit/instrument/${id}`
        console.log(url)
        fetch(url, {
            
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({instrument})
        })
            .then(response => response.json())
            .then(data => {
                setInstruments(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {

        const url = `http://localhost:3000/instrument/${id}`
       
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data[0])
                setInstruments(data[0])
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])

    const navigate = useNavigate();
    const navigatehome = () => {
        navigate('/');
    };

    return (
        <>


            <div>
                <h1>Modifier l'instrument</h1>
            </div>
            <div>
                <input onInput={(e)=>handleNewValue(e)} name="Nom" value={instrument.Nom} type="text" placeholder="Nom de l'instrument" />
                <input onInput={(e)=>handleNewValue(e)} name="Prix" value={instrument.Prix} type="text" placeholder="Prix de l'instrument" />
                <input onInput={(e)=>handleNewValue(e)} name="Categorie" value={instrument.Categorie} type="text" placeholder="Categorie de l'instrument" />
            </div>
            <button onClick={() => { enculéxD(); navigatehome() }}>
                Modifier
            </button>
            <h1></h1>
        </>
    )
}



export default Edit