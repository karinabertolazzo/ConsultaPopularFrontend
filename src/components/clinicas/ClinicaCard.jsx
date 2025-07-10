import { useState } from 'react';


export default function ClinicaCard({ 
  clinica, 
  onEdit, 
  onDelete,
  badgeStyle 
}) {
  const [showDetails, setShowDetails] = useState(false);

  function formatarCNPJ(cnpj) {
    if (!cnpj) return 'Não informado';
    const numeros = cnpj.replace(/\D/g, '');
    return numeros.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 4px 12px rgb(0 0 0 / 0.1)',
        padding: 20,
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
      onClick={() => setShowDetails(!showDetails)}
      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseOut={e => e.currentTarget.style.transform = 'none'}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#2c7be5' }}>{clinica.nome}</h3>
          <span style={{ fontSize: 12, color: '#666' }}>
            {showDetails ? '▲' : '▼'}
          </span>
        </div>

        {showDetails && (
          <div style={{ marginTop: 12 }}>
            <p style={{ margin: '4px 0' }}>
              <strong>CNPJ:</strong> {formatarCNPJ(clinica.cnpj)}
            </p>
            <p style={{ margin: '4px 0' }}>
              <strong>Endereço:</strong> {clinica.endereco?.rua}, {clinica.endereco?.numero} - {clinica.endereco?.bairro}
            </p>
            <p style={{ margin: '4px 0' }}>
              {clinica.endereco?.cidade} - {clinica.endereco?.estado}, CEP: {clinica.endereco?.cep}
            </p>
            <p style={{ margin: '4px 0' }}><strong>Telefone:</strong> {clinica.telefone}</p>
            <p style={{ margin: '4px 0' }}><strong>E-mail:</strong> {clinica.email}</p>
            
            {clinica.horarioFuncionamento && (
              <div style={{ marginTop: 8 }}>
                <strong>Horário de Funcionamento:</strong>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {Object.entries(
                    typeof clinica.horarioFuncionamento === 'string'
                      ? JSON.parse(clinica.horarioFuncionamento)
                      : clinica.horarioFuncionamento
                  ).map(([dia, horario]) => (
                    <li key={dia}>
                      {dia}: {horario.inicio} - {horario.fim}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {clinica.clinicaEspecialidades && clinica.clinicaEspecialidades.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <strong style={{ marginRight: 8 }}>Especialidades:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 4 }}>
                  {clinica.clinicaEspecialidades.map((ce) => (
                    <span key={ce.id} style={badgeStyle}>
                      {ce.especialidade?.nome || 'Desconhecida'}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(clinica);
                }}
                style={{
                  backgroundColor: '#2c7be5',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1a5fcc')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2c7be5')}
              >
                Editar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(clinica.id);
                }}
                style={{
                  backgroundColor: '#dc3545',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 'bold',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#a71d2a')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#dc3545')}
              >
                Excluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}