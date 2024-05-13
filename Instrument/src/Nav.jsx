import { useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <>
        <div>
          <Link to="/">Home            </Link>
          <Link to="/new">     Ajouter un Instrument</Link>
        </div>
        </>
    )
}

export default Nav