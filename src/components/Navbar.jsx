import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaClinicMedical, FaBars, FaTimes, FaUserCircle, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

// Estilos da Navbar
const NavbarContainer = styled.nav`
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  color: white;
  
  svg {
    font-size: 1.8rem;
    color: #3498db;
  }
  
  h1 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? '0' : '-100%')};
    width: 70%;
    height: 100vh;
    background: #2c3e50;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    transition: right 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const MenuItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${({ $isActive }) => ($isActive ? '#3498db' : 'white')};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #3498db;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    padding: 0 2rem;
    margin-top: 2rem;
  }
`;

const LoginButton = styled(Link)`
  background: transparent;
  color: white;
  border: 2px solid #3498db;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(52, 152, 219, 0.1);
  }
`;

const SignupButton = styled(LoginButton)`
  background: #3498db;
  
  &:hover {
    background: #2980b9;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    z-index: 1001;
  }
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-size: 1.8rem;
  cursor: pointer;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Fechar menu quando a rota muda
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Verifica se a rota atual corresponde ao link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <NavbarContainer>
      <Logo to="/">
        <FaClinicMedical />
        <h1>Saúde Popular</h1>
      </Logo>
      
      <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars />
      </MobileMenuButton>
      
      <Menu $isOpen={isMenuOpen}>
        <CloseButton onClick={() => setIsMenuOpen(false)} />
        
        <MenuItem>
          <NavLink to="/" $isActive={isActive('/')}>
            Início
          </NavLink>
        </MenuItem>
        
        <MenuItem>
          <NavLink to="/SobreNos" $isActive={isActive('/SobreNos')}>
            Sobre Nós
          </NavLink>
        </MenuItem>
        
        <MenuItem>
          <NavLink to="/clinicas" $isActive={isActive('/clinicas')}>
            Clínicas Disponíveis
          </NavLink>
        </MenuItem>
        
        <AuthButtons>
          <LoginButton to="/UsuarioLogin">
            <FaSignInAlt />
            Login
          </LoginButton>
          <SignupButton to="/cadastro">
            <FaUserPlus />
            Cadastre-se
          </SignupButton>
        </AuthButtons>
      </Menu>
    </NavbarContainer>
  );
}