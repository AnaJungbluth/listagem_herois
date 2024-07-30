import React, { useState, useEffect } from 'react';
import CartaoHeroi from './CartaoHeroi';
import FiltroDeBusca from './FiltroDeBusca';
import ModalBatalhaHeroi from './ModalBatalhaHeroi';
import { obterHerois } from '../services/servicosHeroi';

const ITEMS_POR_PAGINA = 10;

const ListaDeHerois = () => {
  const [herois, setHerois] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [vencedorBatalha, setVencedorBatalha] = useState(null);
  const [mensagemErro, setMensagemErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    obterHerois().then(dados => {
      setCarregando(false);
      if (dados.length === 0) {
        setMensagemErro('Nenhum herói encontrado.');
      } else {
        setHerois(dados);
        setMensagemErro('');
      }
    }).catch(() => {
      setCarregando(false);
      setMensagemErro('Erro ao buscar heróis.');
    });
  }, []);

  const lidarMudancaBusca = (evento) => {
    setTermoBusca(evento.target.value);
    setPaginaAtual(1); // Resetar para a primeira página quando o filtro mudar
  };

  const heroisFiltrados = herois.filter(heroi =>
    heroi.name.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const totalPaginas = Math.ceil(heroisFiltrados.length / ITEMS_POR_PAGINA);
  const heroisNaPagina = heroisFiltrados.slice(
    (paginaAtual - 1) * ITEMS_POR_PAGINA,
    paginaAtual * ITEMS_POR_PAGINA
  );

  const lidarBatalha = (heroi) => {
    const oponente = herois[Math.floor(Math.random() * herois.length)];
    const vencedor = Math.random() > 0.5 ? heroi : oponente;
    setVencedorBatalha(vencedor);
  };

  const fecharModal = () => {
    setVencedorBatalha(null);
  };

  return (
    <div>
      <h1>Lista de Heróis</h1>
      <FiltroDeBusca termoBusca={termoBusca} onBuscaChange={lidarMudancaBusca} />
      {carregando ? (
        <p>Carregando...</p>
      ) : mensagemErro ? (
        <p>{mensagemErro}</p>
      ) : (
        <div className="lista-herois">
          {heroisNaPagina.length === 0 ? (
            <p>Nenhum herói encontrado com o termo de busca.</p>
          ) : (
            heroisNaPagina.map(heroi => (
              <CartaoHeroi key={heroi.id} heroi={heroi} onBatalha={() => lidarBatalha(heroi)} />
            ))
          )}
        </div>
      )}
      {totalPaginas > 1 && (
        <div className="paginacao">
          <button
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <span>Página {paginaAtual} de {totalPaginas}</span>
          <button
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}
      {vencedorBatalha && <ModalBatalhaHeroi vencedor={vencedorBatalha} onFechar={fecharModal} />}
    </div>
  );
};

export default ListaDeHerois;
