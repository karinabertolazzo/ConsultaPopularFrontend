import { useState, useRef, useEffect } from 'react';

export default function HorarioFuncionamentoDropdown({ horarios, setHorarios }) {
  const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const [aberto, setAberto] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickFora(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAberto(false);
      }
    }

    document.addEventListener('mousedown', handleClickFora);
    return () => document.removeEventListener('mousedown', handleClickFora);
  }, []);

  const toggleDia = dia => {
    const jaSelecionado = horarios[dia];
    setHorarios({
      ...horarios,
      [dia]: jaSelecionado
        ? undefined
        : { inicio: '08:00', fim: '17:00' },
    });
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setHorarios({
      ...horarios,
      [dia]: {
        ...horarios[dia],
        [campo]: valor,
      },
    });
  };

  const selecionados = Object.keys(horarios).length > 0
    ? Object.keys(horarios).join(', ')
    : 'Selecionar dias e horários';

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }} ref={dropdownRef}>
      {/* Botão principal (inalterado) */}
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
        <span style={{ color: Object.keys(horarios).length > 0 ? '#333' : '#777' }}>
          {selecionados}
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
            maxHeight: '350px',
            overflowY: 'auto',
          }}
        >
          {diasSemana.map(dia => (
            <div 
              key={dia}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e6f0ff';
                e.currentTarget.querySelector('span').style.color = '#2c7be5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.querySelector('span').style.color = 
                  horarios[dia] ? '#2c7be5' : '#333';
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
                  checked={!!horarios[dia]}
                  onChange={() => toggleDia(dia)}
                  style={{
                    width: '16px',
                    height: '16px',
                    cursor: 'pointer',
                    accentColor: '#2c7be5'
                  }}
                />
                <span style={{ 
                  fontWeight: horarios[dia] ? 600 : 400,
                  color: horarios[dia] ? '#2c7be5' : '#333',
                  transition: 'all 0.2s ease',
                }}>
                  {dia}
                </span>
              </label>

              {horarios[dia] && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px', 
                  marginTop: '8px',
                  paddingLeft: '26px'
                }}>
                  <input
                    type="time"
                    value={horarios[dia].inicio}
                    onChange={e => handleHorarioChange(dia, 'inicio', e.target.value)}
                    style={{ 
                      padding: '6px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  />
                  <span style={{ color: '#666', fontSize: '14px' }}>às</span>
                  <input
                    type="time"
                    value={horarios[dia].fim}
                    onChange={e => handleHorarioChange(dia, 'fim', e.target.value)}
                    style={{ 
                      padding: '6px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      fontSize: '14px',
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}