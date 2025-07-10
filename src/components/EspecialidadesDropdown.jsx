import { useState, useRef, useEffect } from 'react';

export default function EspecialidadesDropdown({ especialidades, selecionadas, setSelecionadas }) {

  // Evitar que o componente quebre caso algum prop não esteja pronto
  if (!Array.isArray(especialidades)) especialidades = [];
  if (!Array.isArray(selecionadas)) selecionadas = [];
  const [aberto, setAberto] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickFora = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const toggleSelecionada = (id) => {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter(e => e !== id));
    } else {
      setSelecionadas([...selecionadas, id]);
    }
  };

  const selecionadasLabel = selecionadas.length > 0
    ? especialidades.filter(e => selecionadas.includes(e.id)).map(e => e.nome).join(', ')
    : 'Selecionar especialidades';

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }} ref={dropdownRef}>
      {/* Botão principal */}
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
        <span style={{ color: selecionadas.length > 0 ? '#333' : '#777' }}>
          {selecionadasLabel}
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
            padding: '8px 0',
            width: '100%',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {especialidades.map(e => (
            <div
              key={e.id}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e6f0ff';
                e.currentTarget.querySelector('span').style.color = '#2c7be5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.querySelector('span').style.color = 
                  selecionadas.includes(e.id) ? '#2c7be5' : '#333';
              }}
              style={{ 
                padding: '8px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: 'transparent',
              }}
            >
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                cursor: 'pointer',
              }}>
                <input
                  type="checkbox"
                  checked={selecionadas.includes(e.id)}
                  onChange={() => toggleSelecionada(e.id)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#2c7be5'
                  }}
                />
                <span style={{ 
                  fontWeight: selecionadas.includes(e.id) ? 600 : 400,
                  color: selecionadas.includes(e.id) ? '#2c7be5' : '#333',
                  transition: 'all 0.2s ease',
                }}>
                  {e.nome}
                </span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}