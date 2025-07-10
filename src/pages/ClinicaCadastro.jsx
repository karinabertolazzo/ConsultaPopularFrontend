// React e hooks
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes globais
import ResponsiveContainer from '../components/ResponsiveContainer';
import { useToast } from '../components/Toast';


// Componentes e hooks da área de clínicas
import ClinicaList from '../components/clinicas/ClinicaList';
import ClinicaForm from '../components/clinicas/ClinicaForm';
import { useClinicasForm } from '../components/clinicas/hooks/useClinicas';


export default function ClinicasAdmin() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const formRef = useRef(null);

  const {
     formState,
    handleInputChange,
    handleCepChange,
    clinicas,
    carregarClinicas,
    salvarClinica,
    excluirClinica,
    editarClinica,
    clinicaEditando,
    setClinicaEditando,
    especialidades, 
    carregarEspecialidades,
    cancelarEdicao
  } = useClinicasForm({ showToast });

  useEffect(() => {
    carregarClinicas();
    carregarEspecialidades(); 
  }, []);

  return (
    <ResponsiveContainer>
      <div className="container">
        <h1 className="title">Gerenciar Clínicas</h1>

        <button onClick={() => navigate('/')}>← Voltar para Home</button>

        <ClinicaForm
          ref={formRef}
          formState={formState}
           editandoId={clinicaEditando?.id}                     // PASSAR formState aqui
          handleInputChange={handleInputChange}     // e handlers
          handleCepChange={handleCepChange}
          clinica={clinicaEditando}
           salvar={salvarClinica}  // Note que você estava usando onSalvar mas no form é salvar
            cancelarEdicao={cancelarEdicao}
          especialidades={especialidades}
        />

        <ClinicaList
          clinicas={clinicas}
          onEditar={editarClinica}
          onExcluir={excluirClinica}
        />
      </div>
    </ResponsiveContainer>
  );
}