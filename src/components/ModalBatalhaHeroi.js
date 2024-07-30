import React from 'react';
import '../styles/modalBatalhaHeroi.css';

const ModalBatalhaHeroi = ({ vencedor, onFechar }) => {
  return (
    <div className="modal">
      <div className="modal-conteudo">
        <img src={vencedor.images.md} alt={vencedor.name} />
        <div className="informacoes">
          <h2>Herói Vencedor</h2>
          <h3>{vencedor.name}</h3>
          <p><strong>Força:</strong> {vencedor.powerstats.strength}</p>
          <p><strong>Inteligência:</strong> {vencedor.powerstats.intelligence}</p>
          <p><strong>Velocidade:</strong> {vencedor.powerstats.speed}</p>
          <p><strong>Duração:</strong> {vencedor.powerstats.durability}</p>
          <p><strong>Poder:</strong> {vencedor.powerstats.power}</p>
          <p><strong>Combate:</strong> {vencedor.powerstats.combat}</p>
          <button className='botao' onClick={onFechar}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalBatalhaHeroi;
