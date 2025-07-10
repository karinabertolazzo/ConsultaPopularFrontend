import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import styled from 'styled-components';
import ResponsiveContainer from '../components/ResponsiveContainer';


const Container = styled.div`
  max-width: 400px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
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

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RememberMe = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  input {
    margin-right: 8px;
  }
`;

export default function UsuarioLogin() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    lembrar: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }
    
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
      const response = await fetch('https://localhost:7198/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.senha
        }),
      });
      
      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
      
      const data = await response.json();
      // Salvar token e redirecionar
      */
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/'); // Redireciona para a página inicial após login
      }, 2000);
    } catch (error) {
      setErrors({
        ...errors,
        submit: error.message || 'Erro ao fazer login'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
        <ResponsiveContainer>
    <Container>
      <Title>Faça seu login</Title>
      
      <form onSubmit={handleSubmit}>
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
          <Label htmlFor="senha">Senha</Label>
          <Icon><FiLock /></Icon>
          <Input
            type={showPassword ? "text" : "password"}
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
          <PasswordToggle onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </PasswordToggle>
          {errors.senha && <ErrorMessage>{errors.senha}</ErrorMessage>}
        </FormGroup>

        <RememberMe>
          <input
            type="checkbox"
            id="lembrar"
            name="lembrar"
            checked={formData.lembrar}
            onChange={handleChange}
          />
          <label htmlFor="lembrar">Lembrar de mim</label>
        </RememberMe>

        {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
        {success && <SuccessMessage>Login realizado com sucesso! Redirecionando...</SuccessMessage>}

        <Button type="submit" disabled={isSubmitting}>
          <FiLogIn />
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <LinksContainer>
        <StyledLink to="/esqueci-senha">Esqueci minha senha</StyledLink>
        <StyledLink to="/cadastro">Criar conta</StyledLink>
      </LinksContainer>
    </Container>
     </ResponsiveContainer>
  );
}