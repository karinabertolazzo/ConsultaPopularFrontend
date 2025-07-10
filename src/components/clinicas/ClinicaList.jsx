import React from 'react';

export default function ClinicaList({ clinicas, onEditar, onExcluir }) {
  const badgeStyle = {
    display: 'inline-block',
    backgroundColor: '#2c7be5',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: 12,
    marginRight: 6,
    marginBottom: 6,
  };

  function formatarCNPJ(cnpj) {
    if (!cnpj) return 'Não informado';
    const numeros = cnpj.replace(/\D/g, '');
    return numeros.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }

  if (clinicas.length === 0) {
    return <p>Nenhuma clínica cadastrada.</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
      {clinicas.map((c) => (
        <div
          key={c.id}
          style={{
            background: '#fff',
            borderRadius: 10,
            boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)',
            padding: 20,
          }}
        >
          <div>
            <h3 style={{ margin: 0, color: '#2c7be5' }}>{c.nome}</h3>
            <p style={{ margin: '4px 0' }}><strong>CNPJ:</strong> {formatarCNPJ(c.cnpj)}</p>
            <p style={{ margin: '4px 0' }}><strong>Endereço:</strong> {c.endereco?.rua}, {c.endereco?.numero} - {c.endereco?.bairro}</p>
            <p style={{ margin: '4px 0' }}>{c.endereco?.cidade} - {c.endereco?.estado}, CEP: {c.endereco?.cep}</p>
            <p style={{ margin: '4px 0' }}><strong>Telefone:</strong> {c.telefone}</p>
            <p style={{ margin: '4px 0' }}><strong>E-mail:</strong> {c.email}</p>

            {c.horarioFuncionamento && (
              <div style={{ marginTop: 8 }}>
                <strong>Horário de Funcionamento:</strong>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {Object.entries(
                    typeof c.horarioFuncionamento === 'string'
                      ? JSON.parse(c.horarioFuncionamento)
                      : c.horarioFuncionamento
                  ).map(([dia, horario]) => (
                    <li key={dia}>
                      {dia}: {horario.inicio} - {horario.fim}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {c.clinicaEspecialidades && c.clinicaEspecialidades.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong style={{ marginRight: 8 }}>Especialidades:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
                  {c.clinicaEspecialidades.map((ce) => (
                    <span key={ce.id} style={badgeStyle}>
                      {ce.especialidade?.nome || 'Desconhecida'}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
              <button
                onClick={() => onEditar(c)}
                style={{
                  backgroundColor: '#2c7be5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1a5fcc')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2c7be5')}
              >
                Editar
              </button>
              <button
                onClick={() => onExcluir(c.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 'bold',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#a71d2a')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
