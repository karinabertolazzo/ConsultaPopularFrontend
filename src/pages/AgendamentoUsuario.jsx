import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';

export default function App() {
  const pacienteLogadoId = 1; 
  const [consultas, setConsultas] = useState([]);
  const [consultaParaOutro, setConsultaParaOutro] = useState(false);
  const [dadosPacienteOutro, setDadosPacienteOutro] = useState({
    cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '',
    nome: '', cpf: '', dataNascimento: '', telefone: '', email: '',
  });
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const navigate = useNavigate();

  // Carregar todas as consultas com dados relacionados
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primeiro busca as consultas
        const consultasRes = await fetch('https://localhost:7198/api/Consultas');
        const consultasData = await consultasRes.json();
        
        // Depois busca todas as clínicas e especialidades
        const [clinicasRes, especialidadesRes] = await Promise.all([
          fetch('https://localhost:7198/api/Clinicas'),
          fetch('https://localhost:7198/api/Especialidades')
        ]);
        
        const [clinicas, especialidades] = await Promise.all([
          clinicasRes.json(),
          especialidadesRes.json()
        ]);

        // Enriquece as consultas com os dados completos
        const consultasCompletas = consultasData.map(consulta => {
          const clinicaEspecialidade = consulta.clinicaEspecialidade 
            ? {
                ...consulta.clinicaEspecialidade,
                clinica: clinicas.find(c => c.id === consulta.clinicaEspecialidade.clinicaId),
                especialidade: especialidades.find(e => e.id === consulta.clinicaEspecialidade.especialidadeId)
              }
            : null;
          
          return { ...consulta, clinicaEspecialidade };
        });

        setConsultas(consultasCompletas);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
      }
    };

    fetchData();
  }, []);

  // Função para atualizar dados do paciente "outro"
  function handlePacienteOutroChange(e) {
    const { name, value } = e.target;
    setDadosPacienteOutro(prev => ({ ...prev, [name]: value }));

    if (name === 'cep' && value.length >= 8) {
      buscarEnderecoPorCep(value);
    }
  }

  // Buscar endereço via API pública (ViaCEP)
  async function buscarEnderecoPorCep(cep) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setDadosPacienteOutro(prev => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
      } else {
        alert('CEP não encontrado.');
      }
    } catch {
      alert('Erro ao buscar CEP.');
    }
  }

  // Agendar consulta
  async function agendarConsulta() {
    if (!consultaSelecionada) {
      alert('Selecione uma consulta');
      return;
    }

    try {
      let pacienteId = pacienteLogadoId;

      if (consultaParaOutro) {
        const resPaciente = await fetch('https://localhost:7198/api/Pacientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dadosPacienteOutro),
        });

        if (!resPaciente.ok) throw new Error('Erro ao criar paciente para outra pessoa');
        const novoPaciente = await resPaciente.json();
        pacienteId = novoPaciente.id;
      }

      const resAgendar = await fetch(`https://localhost:7198/api/Consultas/Agendar/${consultaSelecionada}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pacienteId }),
      });

      if (!resAgendar.ok) throw new Error('Erro ao agendar consulta');

      const consultaAtualizada = await resAgendar.json();
      setConsultas(prev =>
        prev.map(c => (c.id === consultaAtualizada.id ? consultaAtualizada : c))
      );

      alert('Consulta agendada com sucesso!');
      setConsultaParaOutro(false);
      setDadosPacienteOutro({
        cep: '', rua: '', numero: '', bairro: '', cidade: '', estado: '',
        nome: '', cpf: '', dataNascimento: '', telefone: '', email: '',
      });
      setConsultaSelecionada(null);
    } catch (error) {
      alert(error.message);
    }
  }

  const consultasDisponiveis = consultas.filter(c => !c.agendada);
  const minhasConsultas = consultas.filter(
    c => c.agendada && c.pacienteId === pacienteLogadoId
  );

  // Estilos
  const formGroupStyle = {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
  };

  const labelStyle = {
    fontWeight: '600',
    marginBottom: '0.3rem',
    color: '#333',
  };

  const inputStyle = {
    padding: '8px 10px',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  const sectionStyle = {
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: 6,
    backgroundColor: '#fafafa',
  };

  const naoDisponivelStyle = {
    color: '#888',
    fontStyle: 'italic'
  };

  return (
    <ResponsiveContainer>
      <div style={{ padding: 20, maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#007bff' }}>Agendamento de Consulta</h1>
        <button
          onClick={() => navigate('/')}
          style={{
            marginBottom: 20,
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 16px',
            cursor: 'pointer',
          }}
        >
          ← Voltar para Home
        </button>

        {/* Consulta para */}
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ color: '#555' }}>Consulta para</h2>
          <label style={{ marginRight: 20 }}>
            <input
              type="radio"
              checked={!consultaParaOutro}
              onChange={() => setConsultaParaOutro(false)}
            />{' '}
            Eu mesmo(a)
          </label>
          <label>
            <input
              type="radio"
              checked={consultaParaOutro}
              onChange={() => setConsultaParaOutro(true)}
            />{' '}
            Outra pessoa
          </label>
        </div>

        {/* Dados da outra pessoa */}
        {consultaParaOutro && (
          <section style={sectionStyle}>
            <h3 style={{ marginBottom: '1rem', color: '#444' }}>Dados da outra pessoa</h3>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Nome:</label>
              <input
                name="nome"
                type="text"
                value={dadosPacienteOutro.nome}
                onChange={handlePacienteOutroChange}
                style={inputStyle}
                required
              />
            </div>

            {/* ... (outros campos do formulário permanecem iguais) ... */}
          </section>
        )}

        {/* Consultas disponíveis */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#555' }}>Consultas Disponíveis</h2>
          {consultasDisponiveis.length === 0 ? (
            <p>Não há consultas disponíveis no momento.</p>
          ) : (
            <select
              value={consultaSelecionada || ''}
              onChange={e => setConsultaSelecionada(Number(e.target.value))}
              style={{ ...inputStyle, width: '100%' }}
              required
            >
              <option value="">Selecione</option>
              {consultasDisponiveis.map(c => {
                const dataFormatada = c.dataHora 
                  ? new Date(c.dataHora).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Data não informada';
                
                const clinicaNome = c.clinicaEspecialidade?.clinica?.nome;
                const especialidadeNome = c.clinicaEspecialidade?.especialidade?.nome;
                
                return (
                  <option key={c.id} value={c.id}>
  {`${dataFormatada} - ${clinicaNome || 'Clínica não disponível'} (${especialidadeNome || 'Especialidade não disponível'})`}
</option>
                );
              })}
            </select>
          )}
        </div>

        <button
          onClick={agendarConsulta}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: '1rem',
            width: '100%',
          }}
          disabled={
            !consultaSelecionada ||
            (consultaParaOutro &&
              (!dadosPacienteOutro.nome ||
                !dadosPacienteOutro.cpf ||
                !dadosPacienteOutro.dataNascimento ||
                !dadosPacienteOutro.numero))
          }
        >
          Agendar Consulta
        </button>

        {/* Minhas consultas */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ color: '#555' }}>Minhas Consultas Agendadas</h2>
          {minhasConsultas.length === 0 ? (
            <p>Você ainda não agendou nenhuma consulta.</p>
          ) : (
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {minhasConsultas.map(c => {
                const clinicaNome = c.clinicaEspecialidade?.clinica?.nome;
                const especialidadeNome = c.clinicaEspecialidade?.especialidade?.nome;
                const endereco = c.clinicaEspecialidade?.clinica?.endereco;
                
                return (
                  <li
                    key={c.id}
                    style={{
                      marginBottom: '1rem',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      backgroundColor: '#fefefe',
                    }}
                  >
                    <strong>{new Date(c.dataHora).toLocaleString('pt-BR')}</strong>
                    <br />
<span style={clinicaNome ? undefined : naoDisponivelStyle}>
                      Clínica: {clinicaNome || 'Não disponível'}
                    </span>
                    <br />
<span style={especialidadeNome ? undefined : naoDisponivelStyle}>
                      Especialidade: {especialidadeNome || 'Não disponível'}
                    </span>
                    {endereco && (
                      <>
                        <br />
                        Endereço: {endereco?.rua}, {endereco?.numero} - {endereco?.bairro}, {endereco?.cidade} - {endereco?.estado}

                      </>
                    )}
                    <br />
                    Paciente: {c.paciente?.nome || 'Nome não disponível'}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </ResponsiveContainer>
  );
}