import { useRef } from 'react';
// import HorarioFuncionamentoDropdown from "./HorarioFuncionamentoDropdown";
import EspecialidadesDropdown from "../EspecialidadesDropdown";
// 
import EstadosDropdown from '../EstadosDropdown';
import HorarioFuncionamentoDropdown from "../HorarioFuncionamentoDropdown";




export default function ClinicaForm({
  formState,
  editandoId,
  handleInputChange,
  handleCepChange,
  salvar,
  cancelarEdicao,
  formRef,
  especialidades
}) {
  const {
    nome,
    rua,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
    telefone,
    email,
    cnpj,
    horarioFuncionamento,
    especialidadesSelecionadas
  } = formState;

   console.log('DEBUG - editandoId:', editandoId);

  return (
    <div
      ref={formRef}
      style={{
        background: '#f5f7fa',
        padding: 24,
        borderRadius: 10,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        marginBottom: 48,
      }}
    >
      <h2 style={{ marginBottom: 20, color: '#444' }}>
        {editandoId ? 'Editar Clínica' : 'Cadastrar Nova Clínica'}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 16
      }}>
        <input
          type="text"
          placeholder="Nome da Clínica *"
          name="nome"
          value={nome}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <input
          type="text"
          placeholder="CEP *"
          name="cep"
          value={cep}
          onChange={handleCepChange}
          maxLength={9}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <input
          type="text"
          placeholder="Rua *"
          name="rua"
          value={rua}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        {/* Repita para os outros campos do formulário */}
        <input
          type="text"
          placeholder="Número *"
          name="numero"
          value={numero}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <input
          type="text"
          placeholder="Complemento"
          name="complemento"
          value={complemento}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <input
          type="text"
          placeholder="Bairro *"
          name="bairro"
          value={bairro}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <input
          type="text"
          placeholder="Cidade *"
          name="cidade"
          value={cidade}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <EstadosDropdown 
          estadoSelecionado={estado} 
          setEstadoSelecionado={(value) => handleInputChange({ target: { name: 'estado', value } })}
        />

        <input
          type="text"
          placeholder="Telefone"
          name="telefone"
          value={telefone}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={email}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <input
          type="text"
          placeholder="CNPJ"
          name="cnpj"
          value={cnpj}
          onChange={handleInputChange}
          style={{ padding: 12, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
        />

        <HorarioFuncionamentoDropdown 
          key={editandoId ?? 'novo'}
          horarios={horarioFuncionamento}
          setHorarios={(value) => handleInputChange({ target: { name: 'horarioFuncionamento', value } })}
        />

        <EspecialidadesDropdown
          especialidades={especialidades}
          selecionadas={especialidadesSelecionadas}
          setSelecionadas={(value) => handleInputChange({ target: { name: 'especialidadesSelecionadas', value } })}
        />
      </div>

      <div style={{ marginTop: 30, display: 'flex', gap: 12 }}>
        <button
          onClick={salvar}
          style={{
            flex: 1,
            backgroundColor: '#2c7be5',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 0',
            fontWeight: '600',
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgb(44 123 229 / 0.4)',
            transition: 'background-color 0.2s ease',
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1a5fcc')}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = '#2c7be5')}
        >
          {editandoId ? 'Atualizar Clínica' : 'Cadastrar Clínica'}
        </button>

        {editandoId && (
          <button
            onClick={() => {
    console.log('Botão cancelar clicado');
    cancelarEdicao();
  }}
            style={{
              flex: 1,
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '14px 0',
              fontWeight: '600',
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgb(108 117 125 / 0.4)',
              transition: 'background-color 0.2s ease',
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#545b62')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#6c757d')}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}