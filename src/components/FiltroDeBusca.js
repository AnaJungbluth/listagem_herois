import React from 'react';

const FiltroDeBusca = ({ termoBusca, onBuscaChange }) => {
  return (
    <input
      type="text"
      placeholder="Buscar herói..."
      value={termoBusca}
      onChange={onBuscaChange}
      className="input-busca"
    />
  );
};

export default FiltroDeBusca;
