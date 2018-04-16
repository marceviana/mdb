import React from "react";

const Button = ({ onClick, btnType }) => {
  return (
    <button onClick={onClick} className="btn btn-primary" >
        { btnType === 'add' && (<span><i className="mdi mdi-heart-outline" /> Agregar a Mi Lista</span>) }
        { btnType === 'remove' && (<span><i className="mdi mdi-delete" /> Remover de Mi Lista</span>) }
    </button>
  )
}

export default Button
