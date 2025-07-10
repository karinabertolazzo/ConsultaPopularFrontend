import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import styled from 'styled-components';
import ResponsiveContainer from '../components/ResponsiveContainer';

const Container = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #34495e;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    outline: none;
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 12px;
  top: 38px;
  color: #7f8c8d;
`;

const PasswordToggle = styled.span`
  position: absolute;
  right: 12px;
  top: 38px;
  color: #7f8c8d;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  
  &:hover {
    background: #2980b9;
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
  color: #27ae60;
  font-size: 14px;
  margin-top: 1rem;
  text-align: center;
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;
  
  a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export default function UsuarioCadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setFormData({
            ...formData,
            endereco: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          });
        } else {
          setErrors({
            ...errors,
            cep: 'CEP não encontrado'
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        setErrors({
          ...errors,
          cep: 'Erro ao buscar CEP'
        });
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.dataNascimento) newErrors.dataNascimento = 'Data de nascimento é obrigatória';
    if (!formData.cpf.trim()) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório';
    if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório';
    if (!formData.numero.trim()) newErrors.numero = 'Número é obrigatório';
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório';
    if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.estado.trim()) newErrors.estado = 'Estado é obrigatório';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    else if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não coincidem';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulação de chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aqui você faria a chamada real à API:
      /*
      const response = await fetch('https://localhost:7198/api/Pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao cadastrar usuário');
      }
      */
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/login'); // Redireciona para login após 2 segundos
      }, 2000);
    } catch (error) {
      setErrors({
        ...errors,
        submit: error.message || 'Erro ao cadastrar usuário'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <ResponsiveContainer>
    <Container>
      <Title>Crie sua conta</Title>
      
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="nome">Nome completo</Label>
          <Icon><FiUser /></Icon>
          <Input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
          />
          {errors.nome && <ErrorMessage>{errors.nome}</ErrorMessage>}
        </FormGroup>

        <TwoColumns>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Icon><FiMail /></Icon>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="telefone">Telefone</Label>
            <Icon><FiPhone /></Icon>
            <Input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
            {errors.telefone && <ErrorMessage>{errors.telefone}</ErrorMessage>}
          </FormGroup>
        </TwoColumns>

        <TwoColumns>
          <FormGroup>
            <Label htmlFor="dataNascimento">Data de Nascimento</Label>
            <Icon><FiCalendar /></Icon>
            <Input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
            />
            {errors.dataNascimento && <ErrorMessage>{errors.dataNascimento}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="cpf">CPF</Label>
            <Input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
            />
            {errors.cpf && <ErrorMessage>{errors.cpf}</ErrorMessage>}
          </FormGroup>
        </TwoColumns>

        <FormGroup>
          <Label htmlFor="cep">CEP</Label>
          <Icon><FiMapPin /></Icon>
          <Input
            type="text"
            id="cep"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
            placeholder="00000-000"
          />
          {errors.cep && <ErrorMessage>{errors.cep}</ErrorMessage>}
        </FormGroup>

        <TwoColumns>
          <FormGroup>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              type="text"
              id="endereco"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              placeholder="Rua, Avenida, etc."
            />
            {errors.endereco && <ErrorMessage>{errors.endereco}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="numero">Número</Label>
            <Input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Nº"
            />
            {errors.numero && <ErrorMessage>{errors.numero}</ErrorMessage>}
          </FormGroup>
        </TwoColumns>

        <FormGroup>
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            type="text"
            id="complemento"
            name="complemento"
            value={formData.complemento}
            onChange={handleChange}
            placeholder="Apartamento, bloco, etc."
          />
        </FormGroup>

        <TwoColumns>
          <FormGroup>
            <Label htmlFor="bairro">Bairro</Label>
            <Input
              type="text"
              id="bairro"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
              placeholder="Seu bairro"
            />
            {errors.bairro && <ErrorMessage>{errors.bairro}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
              placeholder="Sua cidade"
            />
            {errors.cidade && <ErrorMessage>{errors.cidade}</ErrorMessage>}
          </FormGroup>
        </TwoColumns>

        <FormGroup>
          <Label htmlFor="estado">Estado</Label>
          <Input
            type="text"
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            placeholder="UF"
            maxLength="2"
          />
          {errors.estado && <ErrorMessage>{errors.estado}</ErrorMessage>}
        </FormGroup>

        <TwoColumns>
          <FormGroup>
            <Label htmlFor="senha">Senha</Label>
            <Icon><FiLock /></Icon>
            <Input
              type={showPassword ? "text" : "password"}
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
            />
            <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
            {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
            <Icon><FiLock /></Icon>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Confirme sua senha"
            />
            <PasswordToggle onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
            {errors.confirmarSenha && <ErrorMessage>{errors.confirmarSenha}</ErrorMessage>}
          </FormGroup>
        </TwoColumns>

        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        {success && <SuccessMessage>Cadastro realizado com sucesso! Redirecionando...</SuccessMessage>}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>

      <LoginLink>
        Já tem uma conta? <a href="/UsuarioLogin">Faça login</a>
      </LoginLink>
    </Container>
    </ResponsiveContainer>
  );
}