import { Link } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';

export default function Home() {
  const container = {
    maxWidth: 600,
    margin: 'auto',
    padding: 40,
    textAlign: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const button = {
    display: 'block',
    margin: '10px auto',
    padding: '12px 24px',
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    width: '100%',
    maxWidth: 300,
  };

  return (
      <ResponsiveContainer>
    <div style={container}>
      <h1>Bem-vindo ao Sistema</h1>
      

      <Link to="/admin" style={button}>Painel Admin (Consultas)</Link>
      <Link to="/agendamento" style={button}>Agendamento Usuário</Link>
      <Link to="/especialidades" style={button}>Gerenciar Especialidades</Link>
      <Link to="/ClinicaCadastro" style={button}>Cadastro Clinica</Link>
      <Link to="/Home" style={button}>Home</Link>
       <Link to="/Clinicas" style={button}>Clinicas Disponíveis</Link>
       <Link to="/Cadastro" style={button}>Cadastro</Link>
       <Link to="/UsuarioLogin" style={button}>Login Usuario</Link>
       <Link to="/BemVindo" style={button}>Bem Vindo</Link>
         <Link to="/SobreNos" style={button}>Sobre Nós</Link>


    </div>
    </ResponsiveContainer>
  );
}
