import { useState, useRef, useEffect } from 'react';

const estadosBrasil = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
  'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO'
];

export default function EstadosDropdown({ estadoSelecionado, setEstadoSelecionado }) {
  const [aberto, setAberto] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickFora(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAberto(false);
      }
    }
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const selecionarEstado = (sigla) => {
    setEstadoSelecionado(sigla);
    setAberto(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
      ref={dropdownRef}
    >
      <div
        onClick={() => setAberto(!aberto)}
        style={{
          padding: '12px',
          borderRadius: 6,
          border: '1px solid #ccc',
          cursor: 'pointer',
          backgroundColor: '#fff',
          fontSize: 16,
          fontWeight: 400,
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
          minHeight: '44px',
        }}
      >
        <span style={{ color: estadoSelecionado ? '#333' : '#777' }}>
          {estadoSelecionado || 'Selecione o Estado'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#666"
          viewBox="0 0 16 16"
          style={{ transition: 'transform 0.2s', transform: aberto ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path d="M7.247 11.14 2.451 5.658c-.566-.64-.106-1.658.753-1.658h9.592c.86 0 1.32 1.018.753 1.658l-4.796 5.482a1 1 0 0 1-1.506 0z" />
        </svg>
      </div>

      {aberto && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 100,
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 6,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            maxHeight: '220px',
            overflowY: 'auto',
            width: '100%',
          }}
        >
          {estadosBrasil.map((sigla) => (
            <div
              key={sigla}
              onClick={() => selecionarEstado(sigla)}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                backgroundColor: sigla === estadoSelecionado ? '#2c7be5' : 'transparent',
                color: sigla === estadoSelecionado ? '#fff' : '#333',
                fontWeight: sigla === estadoSelecionado ? 600 : 400,
                borderRadius: 4,
                userSelect: 'none',
                transition: 'all 0.2s ease',
                fontSize: '15px',
                ':hover': {
                  backgroundColor: sigla === estadoSelecionado ? '#2c7be5' : '#e6f0ff', // Azul claro ao invés de cinza
                  color: sigla === estadoSelecionado ? '#fff' : '#2c7be5', // Texto azul no hover
                }
              }}
              onMouseEnter={(e) => {
                if (sigla !== estadoSelecionado) {
                  e.currentTarget.style.backgroundColor = '#e6f0ff';
                  e.currentTarget.style.color = '#2c7be5';
                }
              }}
              onMouseLeave={(e) => {
                if (sigla !== estadoSelecionado) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#333';
                }
              }}
            >
              {sigla}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}