import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Edit() {

    return (
        <div>
            <h1>Editer un Instrument</h1>
            <form>
                <label>Nom de l'instrument</label>
                <input type="text" name="NomInstrument" />
                <label>Prix de l'instrument</label>
                <input type="text" name="PrixInstrument" />
                <label>Categorie de l'instrument</label>
                <input type="text" name="CategorieInstrument" />
                <button>Editer</button>
            </form>
        </div>
    )


}

export default Edit