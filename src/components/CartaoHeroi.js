import React from 'react';

const CartaoHeroi = ({ heroi, onBatalha }) => {
  return (
    <div className="cartao-heroi">
      <img src={heroi.images.sm} alt={heroi.name} />
      <h2>{heroi.name}</h2>
      <button onClick={onBatalha}>Desafiar para Batalha</button>
    </div>
  );
};

export default CartaoHeroi;
