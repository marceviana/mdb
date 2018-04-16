import React from "react";

const ButtonChildren = ({ children, btnType }) => {
    switch (btnType) {
        case 'add':
            return <span><i className="mdi mdi-heart-outline" /> { children } </span>
        case 'remove':
            return <span><i className="mdi mdi-delete" /> { children } </span>
        case 'viewed':
            return <span><i className="mdi mdi-eye-off" /> { children } </span>
        case 'not-viewed':
            return <span><i className="mdi mdi-eye" /> { children } </span>
        default:
            return ''
    }
}

const Button = ({ onClick, ...props }) => {
  return (
    <button onClick={onClick} className="btn btn-primary" >
        <ButtonChildren {...props}/>
    </button>
  )
}

export default Button
