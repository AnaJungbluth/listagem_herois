import React from 'react';
import '../styles/cartaoHeroi.css'; 

const CartaoHeroi = ({ heroi, onSelecionar, selecionado }) => {
    return (
      <div
        className={`cartao-heroi ${selecionado ? 'selecionado' : ''}`}
        onClick={onSelecionar}
      >
        <img src={heroi.images.sm} alt={heroi.name} /> 
        <h2>{heroi.name}</h2> 
      </div>
    );
  };

export default CartaoHeroi;
