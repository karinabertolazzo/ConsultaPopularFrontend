import { useState } from 'react';
import { useToast } from '../Toast';

export default function useCEP() {
  const { showToast } = useToast();
  const [endereco, setEndereco] = useState({
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const buscarEnderecoPorCep = async (cepDigitado) => {
    const cepLimpo = cepDigitado.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        showToast('CEP não encontrado.', 'error');
        return;
      }

      setEndereco(prev => ({
        ...prev,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      }));
    } catch (error) {
      showToast('Erro ao consultar CEP.', 'error');
      console.error('Erro na busca por CEP:', error);
    }
  };

  const handleCepChange = (e) => {
    const valor = e.target.value;
    setEndereco(prev => ({ ...prev, cep: valor }));

    const cepLimpo = valor.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      buscarEnderecoPorCep(cepLimpo);
    }
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco(prev => ({ ...prev, [name]: value }));
  };

  return {
    endereco,
    setEndereco,
    handleCepChange,
    handleEnderecoChange,
    buscarEnderecoPorCep
  };
}