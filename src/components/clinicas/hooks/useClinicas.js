import { useState } from 'react';
import { useToast } from '../../Toast';

export function useClinicasForm() {
  const { showToast } = useToast();

  // Estado para lista de clínicas
  const [clinicas, setClinicas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  // Estado do formulário
  const [formState, setFormState] = useState({
    nome: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    cnpj: '',
    horarioFuncionamento: {},
    especialidadesSelecionadas: []
  });

  // Adicione uma função para carregar as especialidades
async function carregarEspecialidades() {
  try {
    const res = await fetch('https://localhost:7198/api/Especialidades');
    if (!res.ok) throw new Error('Erro ao carregar especialidades');
    const data = await res.json();
    setEspecialidades(data);
  } catch (err) {
    console.error("Erro ao carregar especialidades:", err);
    showToast('Erro ao carregar especialidades', 'error');
  }
}
  // Id da clínica que está sendo editada, ou null
  const [clinicaEditando, setClinicaEditando] = useState(null);

  // Função para carregar clínicas - substituir com fetch da sua API
   async function carregarClinicas() {
  try {
    const res = await fetch('https://localhost:7198/api/Clinicas?includeEspecialidades=true');
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

    const data = await res.json();
    console.log("Dados recebidos da API:", data);
    setClinicas(data);
    
  } catch (err) {
    console.error("Erro ao carregar clínicas:", err);
    showToast('Erro ao carregar clínicas', 'error');
  }
}

  // Manipulador de inputs do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Buscar endereço por CEP
  async function buscarEnderecoPorCep(cepDigitado) {
    const cepLimpo = cepDigitado.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        showToast('CEP não encontrado.', 'error');
        return;
      }

      setFormState(prev => ({
        ...prev,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      }));
    } catch {
      showToast('Erro ao consultar CEP.', 'error');
    }
  }

  // Handler para campo CEP
  function handleCepChange(e) {
    const valor = e.target.value;
    setFormState(prev => ({ ...prev, cep: valor }));

    const cepLimpo = valor.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      buscarEnderecoPorCep(cepLimpo);
    }
  }

  // Salvar clínica (novo ou edição)
  async function salvarClinica() {
     const confirmacao = window.confirm(
    clinicaEditando 
      ? 'Tem certeza que deseja atualizar os dados da clínica?'
      : 'Tem certeza que deseja cadastrar uma nova clínica?'
  );
  try {
    // Validação
    if (!formState.nome || !formState.cep || !formState.rua) {
      showToast('Preencha os campos obrigatórios.', 'error');
      return;
    }

    // Preparar os dados para a API
    const requestData = {
      id: clinicaEditando?.id || 0,
      nome: formState.nome,
      telefone: formState.telefone,
      email: formState.email,
      cnpj: formState.cnpj,
      horarioFuncionamento: typeof formState.horarioFuncionamento === 'string' 
        ? formState.horarioFuncionamento 
        : JSON.stringify(formState.horarioFuncionamento),
      endereco: {
        rua: formState.rua,
        numero: formState.numero,
        complemento: formState.complemento,
        bairro: formState.bairro,
        cidade: formState.cidade,
        estado: formState.estado,
        cep: formState.cep
      },
      clinicaEspecialidades: formState.especialidadesSelecionadas.map(id => ({
        especialidadeId: id
      }))
    };

    const url = clinicaEditando 
      ? `https://localhost:7198/api/Clinicas/${clinicaEditando.id}`
      : 'https://localhost:7198/api/Clinicas';

    const response = await fetch(url, {
      method: clinicaEditando ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro da API:', errorText);
      throw new Error('Erro ao salvar clínica: ' + errorText);
    }

    // Obter a clínica atualizada com relacionamentos
    const clinicaAtualizada = await fetch(`https://localhost:7198/api/Clinicas/${clinicaEditando?.id || (await response.json()).id}?includeEspecialidades=true`)
      .then(res => res.json());

    // Atualizar estado local
    setClinicas(prev => clinicaEditando
      ? prev.map(c => c.id === clinicaEditando.id ? clinicaAtualizada : c)
      : [...prev, clinicaAtualizada]
    );

    showToast(
      clinicaEditando 
        ? 'Clínica atualizada com sucesso!' 
        : 'Clínica cadastrada com sucesso!',
      'success'
    );

    // Limpar formulário
    setFormState({
      nome: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      telefone: '',
      email: '',
      cnpj: '',
      horarioFuncionamento: {},
      especialidadesSelecionadas: []
    });
    setClinicaEditando(null);

  } catch (err) {
    console.error("Erro ao salvar clínica:", err);
    showToast(err.message || 'Erro ao salvar clínica.', 'error');
  }
}
  // Excluir clínica
  async function excluirClinica(id) {
  // 1. Confirmação
  if (!window.confirm('Tem certeza que deseja excluir esta clínica?')) {
    return; // Sai da função se o usuário cancelar
  }

  try {
    // 2. Chamada à API
    const response = await fetch(`https://localhost:7198/api/Clinicas/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir na API');
    }

    // 3. Atualização do estado local
    setClinicas(prev => prev.filter(c => c.id !== id));
    showToast('Clínica excluída com sucesso!', 'success');

    // 4. Limpeza se estava editando
    if (clinicaEditando?.id === id) {
      setClinicaEditando(null);
      setFormState({
        nome: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        telefone: '',
        email: '',
        cnpj: '',
        horarioFuncionamento: {},
        especialidadesSelecionadas: []
      });
    }

  } catch (err) {
    console.error("Erro ao excluir clínica:", err);
    showToast('Erro ao excluir clínica', 'error');
  }
}

  // Preparar formulário para editar clínica
  function editarClinica(clinica) {
    console.log('Editando clínica ID:', clinica.id);
    setClinicaEditando(clinica);
    // Popular formState com dados da clínica para edição
    setFormState({
      nome: clinica.nome || '',
      rua: clinica.endereco?.rua || '',
      numero: clinica.endereco?.numero || '',
      complemento: clinica.endereco?.complemento || '',
      bairro: clinica.endereco?.bairro || '',
      cidade: clinica.endereco?.cidade || '',
      estado: clinica.endereco?.estado || '',
      cep: clinica.endereco?.cep || '',
      telefone: clinica.telefone || '',
      email: clinica.email || '',
      cnpj: clinica.cnpj || '',
      horarioFuncionamento: typeof clinica.horarioFuncionamento === 'string'
  ? JSON.parse(clinica.horarioFuncionamento)
  : clinica.horarioFuncionamento || {},
      especialidadesSelecionadas: (clinica.clinicaEspecialidades || []).map(ce => ce.especialidade?.id) || []
    });
  }

  function cancelarEdicao() {
  setClinicaEditando(null);
  setFormState({
    nome: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    cnpj: '',
    horarioFuncionamento: {},
    especialidadesSelecionadas: []
  });
}

  return {
    clinicas,
    especialidades,
    carregarEspecialidades,
    carregarClinicas,
    salvarClinica,
    excluirClinica,
    editarClinica,
    cancelarEdicao,
    clinicaEditando,
    setClinicaEditando,

    formState,
    setFormState,
    handleInputChange,
    handleCepChange
  };
}
