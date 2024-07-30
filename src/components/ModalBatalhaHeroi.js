import React from 'react';
import '../styles/modalBatalhaHeroi.css';

const ModalBatalhaHeroi = ({ vencedor, onFechar }) => {
  if (!vencedor) return null;

  return (
    <div className="modal-batalha">
      <div className="modal-conteudo">
        <h2>Herói Vencedor da Batalha</h2>
        <img src={vencedor.images.lg} alt={vencedor.name} className="imagem-vencedor" />
        <p>Nome: {vencedor.name}</p>
        <p>Força: {vencedor.powerstats.strength}</p>
        <p>Velocidade: {vencedor.powerstats.speed}</p>
        <p>Inteligência: {vencedor.powerstats.intelligence}</p>
        <button onClick={onFechar}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalBatalhaHeroi;
