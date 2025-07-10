import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';

export default function AdminPanel() {
  const [clinicas, setClinicas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [clinicaSelecionada, setClinicaSelecionada] = useState('');
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
  const [consultaDataHora, setConsultaDataHora] = useState('');
  const [clinicaEspecialidades, setClinicaEspecialidades] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [clinicaFiltro, setClinicaFiltro] = useState('');
  const [filtroTipoConsulta, setFiltroTipoConsulta] = useState('todas'); // Novo estado para o filtro de tipo

  const [editandoConsultaId, setEditandoConsultaId] = useState(null);
  const [novaDataHora, setNovaDataHora] = useState('');
  const [novaClinicaId, setNovaClinicaId] = useState('');
  const [novaEspecialidadeId, setNovaEspecialidadeId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://localhost:7198/api/Clinicas')
      .then(res => res.json())
      .then(setClinicas)
      .catch(err => console.error('Erro ao carregar clínicas:', err));

    fetch('https://localhost:7198/api/ClinicaEspecialidades')
      .then(res => res.json())
      .then(setClinicaEspecialidades);

    fetch('https://localhost:7198/api/Especialidades')
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) =>
          a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
        );
        setEspecialidades(data);
      })
      .catch(err => console.error('Erro ao carregar especialidades:', err));

    fetch('https://localhost:7198/api/Consultas')
      .then(res => res.json())
      .then(setConsultas)
      .catch(err => console.error('Erro ao carregar consultas:', err));
  }, []);

  const salvarTudo = async () => {
    if (!clinicaSelecionada || !especialidadeSelecionada)
      return alert('Selecione clínica e especialidade');

    const resEsp = await fetch('https://localhost:7198/api/ClinicaEspecialidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clinicaId: Number(clinicaSelecionada),
        especialidadeId: Number(especialidadeSelecionada),
      }),
    });

    if (!resEsp.ok) return alert('Erro ao salvar especialidade na clínica');
    const espSalva = await resEsp.json();
    
    const resEspCompleta = await fetch(`https://localhost:7198/api/ClinicaEspecialidades/${espSalva.id}`);
    const espCompleta = await resEspCompleta.json();
    console.log('espCompleta:', espCompleta); 

    setClinicaEspecialidades(prev => [...prev, espCompleta]);

    if (!consultaDataHora) return alert('Informe a data e hora');

    const dataHoraFormatada = consultaDataHora.substring(0, 16);

    const resConsulta = await fetch('https://localhost:7198/api/Consultas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dataHora: dataHoraFormatada,
        clinicaEspecialidadeId: espCompleta.id,
      }),
    });

    if (!resConsulta.ok) return alert('Erro ao salvar consulta');

    const consultaSalva = await resConsulta.json();
    console.log('consultaSalva:', consultaSalva);
    const resConsultasAtualizadas = await fetch('https://localhost:7198/api/Consultas');
    const consultasAtualizadas = await resConsultasAtualizadas.json();

    setConsultas(consultasAtualizadas);
    alert('Tudo salvo com sucesso!');

    setClinicaSelecionada('');
    setEspecialidadeSelecionada('');
    setConsultaDataHora('');
  };

  const consultasFiltradas = consultas
    .filter(c => {
      // Filtro por clínica
      if (clinicaFiltro && c?.clinicaEspecialidade?.clinica?.id !== Number(clinicaFiltro)) {
        return false;
      }
      
      // Filtro por tipo de consulta
      if (filtroTipoConsulta === 'disponiveis' && c.paciente) {
        return false;
      }
      if (filtroTipoConsulta === 'agendadas' && !c.paciente) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

  const iniciarEdicao = consulta => {
    setNovaClinicaId(consulta.clinicaEspecialidade?.clinica?.id?.toString() || '');
    setNovaEspecialidadeId(consulta.clinicaEspecialidade?.especialidade?.id?.toString() || '');
    setEditandoConsultaId(consulta.id);
    setNovaDataHora(consulta.dataHora ? consulta.dataHora.substring(0, 16) : '');
  };

  const cancelarEdicao = () => {
    setEditandoConsultaId(null);
    setNovaDataHora('');
  };

  const salvarEdicao = async () => {
    if (!novaDataHora) return alert('Informe a nova data e hora');
    if (!novaClinicaId || !novaEspecialidadeId) return alert('Informe clínica e especialidade');
    if (!window.confirm('Tem certeza que deseja editar esta consulta?')) return;

    const dataHoraFormatada = novaDataHora.substring(0, 16);

    const resEsp = await fetch('https://localhost:7198/api/ClinicaEspecialidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clinicaId: Number(novaClinicaId),
        especialidadeId: Number(novaEspecialidadeId),
      }),
    });

    if (!resEsp.ok) return alert('Erro ao salvar clínica/especialidade');

    const espSalva = await resEsp.json();

    const res = await fetch(`https://localhost:7198/api/Consultas/Atualizar/${editandoConsultaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editandoConsultaId,
        dataHora: dataHoraFormatada,
        clinicaEspecialidadeId: espSalva.id,
      }),
    });

    if (!res.ok) return alert('Erro ao atualizar consulta');

    const resConsultasAtualizadas = await fetch('https://localhost:7198/api/Consultas');
    const consultasAtualizadas = await resConsultasAtualizadas.json();

    cancelarEdicao();
    setConsultas(consultasAtualizadas);
    alert('Consulta editada com sucesso!');
  };

  const excluirConsulta = async id => {
    if (!window.confirm('Tem certeza que deseja excluir esta consulta?')) return;

    const res = await fetch(`https://localhost:7198/api/Consultas/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) return alert('Erro ao excluir consulta');

    setConsultas(prev => prev.filter(c => c.id !== id));
    if (editandoConsultaId === id) cancelarEdicao();
    alert('Consulta excluída com sucesso!');
  };

  // Estilos (mantidos os mesmos)
  const styles = {
    container: {
      width: '100%',
      maxWidth: 1200,
      margin: '0 auto',
      padding: '30px 20px',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#333',
      boxSizing: 'border-box',
    },
    card: {
      padding: '20px',
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      marginBottom: 40,
      width: '100%',
      boxSizing: 'border-box',
    },
    row: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginTop: 10,
      width: '100%',
    },
    input: {
      padding: 10,
      fontSize: 16,
      borderRadius: 6,
      border: '1px solid #ccc',
      flex: '1 1 200px',
      width: '100%',
      boxSizing: 'border-box',
    },
    button: {
      backgroundColor: '#2c7be5',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '12px 24px',
      fontSize: 16,
      marginTop: 30,
      cursor: 'pointer',
      width: '100%',
      maxWidth: 200,
    },
    backButton: {
      marginBottom: 20,
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '10px 16px',
      cursor: 'pointer',
    },
    consultaItem: {
      border: '1px solid #ddd',
      borderRadius: 10,
      padding: 20,
      background: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      width: '100%',
    },
    consultaContent: {
      flex: '1 1 300px',
      minWidth: 0,
    },
    actionButtons: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
    },
    editButton: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 16px',
      cursor: 'pointer',
      flex: '1 1 80px',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 16px',
      cursor: 'pointer',
      flex: '1 1 80px',
    },
    saveButton: {
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 16px',
      cursor: 'pointer',
      flex: '1 1 80px',
    },
    cancelButton: {
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 16px',
      cursor: 'pointer',
      flex: '1 1 80px',
    },
    emptyMessage: {
      marginTop: 20,
      textAlign: 'center',
      color: '#6c757d',
    },
    pacienteInfo: {
      fontSize: 14,
      color: '#d63384',
      marginTop: 4,
    },
    disponivelInfo: {
      fontSize: 14,
      color: '#28a745',
      marginTop: 4,
    }
  };

  return (
    <ResponsiveContainer>
      <div style={styles.container}>
        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
          Painel do Administrador
        </h1>

        <button
          onClick={() => navigate('/')}
          style={styles.backButton}
        >
          ← Voltar para Home
        </button>

        <div style={styles.card}>
          <h2>Cadastro de Consultas Disponíveis</h2>

          <div style={styles.row}>
            <select
              value={clinicaSelecionada}
              onChange={e => setClinicaSelecionada(e.target.value)}
              style={styles.input}
            >
              <option value="">Selecionar clínica</option>
              {clinicas.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.row}>
            <select
              value={especialidadeSelecionada}
              onChange={e => setEspecialidadeSelecionada(e.target.value)}
              style={styles.input}
            >
              <option value="">Selecionar especialidade</option>
              {especialidades.map(espec => (
                <option key={espec.id} value={espec.id}>
                  {espec.nome}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.row}>
            <input
              type="datetime-local"
              value={consultaDataHora}
              onChange={e => setConsultaDataHora(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button style={styles.button} onClick={salvarTudo}>
              Cadastrar
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <h2>Consultas Cadastradas</h2>

          <div style={{ ...styles.row, marginBottom: 20 }}>
            <select
              value={clinicaFiltro}
              onChange={e => setClinicaFiltro(e.target.value)}
              style={styles.input}
            >
              <option value="">Todas as clínicas</option>
              {clinicas.map(c => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>

            <select
              value={filtroTipoConsulta}
              onChange={e => setFiltroTipoConsulta(e.target.value)}
              style={styles.input}
            >
              <option value="todas">Todas as consultas</option>
              <option value="disponiveis">Consultas disponíveis</option>
              <option value="agendadas">Consultas agendadas</option>
            </select>
          </div>

          {consultasFiltradas.length === 0 ? (
            <p style={styles.emptyMessage}>
              Nenhuma consulta encontrada com os filtros selecionados.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
              {consultasFiltradas.map(c => (
                <div key={c.id} style={styles.consultaItem}>
                  {editandoConsultaId === c.id ? (
                    <>
                      <select
                        value={novaClinicaId}
                        onChange={e => setNovaClinicaId(e.target.value)}
                        style={styles.input}
                      >
                        <option value="">Selecionar clínica</option>
                        {clinicas.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.nome}
                          </option>
                        ))}
                      </select>

                      <select
                        value={novaEspecialidadeId}
                        onChange={e => setNovaEspecialidadeId(e.target.value)}
                        style={styles.input}
                      >
                        <option value="">Selecionar especialidade</option>
                        {especialidades.map(e => (
                          <option key={e.id} value={e.id}>
                            {e.nome}
                          </option>
                        ))}
                      </select>

                      <input
                        type="datetime-local"
                        value={novaDataHora}
                        onChange={e => setNovaDataHora(e.target.value)}
                        style={styles.input}
                      />

                      <div style={styles.actionButtons}>
                        <button
                          onClick={salvarEdicao}
                          style={styles.saveButton}
                        >
                          Salvar
                        </button>
                        <button
                          onClick={cancelarEdicao}
                          style={styles.cancelButton}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.consultaContent}>
                        <strong>
                          {c.dataHora
                            ? new Date(c.dataHora).toLocaleString('pt-BR')
                            : 'Data não informada'}
                        </strong>
                        <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>
                          <strong>Clínica:</strong> {c.clinicaEspecialidade?.clinica?.nome || 'Clínica indisponível'}
                        </div>
                        <div style={{ fontSize: 14, color: '#555' }}>
                          <strong>Especialidade:</strong> {c.clinicaEspecialidade?.especialidade?.nome || 'Especialidade indisponível'}
                        </div>
                        {c.paciente ? (
                          <div style={styles.pacienteInfo}>
                            <strong>Paciente:</strong> {c.paciente.nome || 'Nome não informado'}
                          </div>
                        ) : (
                          <div style={styles.disponivelInfo}>
                            <strong>Status:</strong> Disponível para agendamento
                          </div>
                        )}
                      </div>

                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => iniciarEdicao(c)}
                          style={styles.editButton}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => excluirConsulta(c.id)}
                          style={styles.deleteButton}
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ResponsiveContainer>
  );
}