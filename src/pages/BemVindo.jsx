import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaClinicMedical, FaCalendarAlt, FaUserMd, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

// Estilos principais
const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  background: #2c3e50;
  color: white;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  h1 {
    font-size: 2.5rem;
    margin: 0;
    color: #fff;
  }
  
  svg {
    font-size: 3rem;
    color: #3498db;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  color: #ecf0f1;
  margin: 0;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const HeroSection = styled.section`
  max-width: 800px;
  margin: 0 auto 3rem;
  
  h2 {
    font-size: 2.2rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: #34495e;
    line-height: 1.6;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto;
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  svg {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #2c3e50;
    margin: 0 0 1rem;
  }
  
  p {
    color: #7f8c8d;
    margin: 0;
  }
`;

const CtaSection = styled.section`
  margin-top: 3rem;
  
  h3 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
  
  &:hover {
    background: rgba(52, 152, 219, 0.1);
  }
`;

const Footer = styled.footer`
  background: #2c3e50;
  color: white;
  padding: 2rem;
  text-align: center;
  
  p {
    margin: 0.5rem 0;
    color: #bdc3c7;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1rem 0;
  flex-wrap: wrap;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  svg {
    color: #3498db;
  }
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <WelcomeContainer>
      <Header>
        <Logo>
          <FaClinicMedical />
          <h1>Saúde Popular</h1>
        </Logo>
        <Tagline>Cuidando da sua saúde com qualidade e acessibilidade</Tagline>
      </Header>

      <MainContent>
        <HeroSection>
          <h2>Agendamento de Consultas Médicas Acessíveis</h2>
          <p>
            Conectamos você aos melhores profissionais de saúde com preços populares. 
            Agende sua consulta de forma rápida, segura e sem burocracia.
          </p>
        </HeroSection>

        <FeaturesGrid>
          <FeatureCard>
            <FaCalendarAlt />
            <h3>Agendamento Online</h3>
            <p>Marque sua consulta em poucos cliques, 24 horas por dia</p>
          </FeatureCard>

          <FeatureCard>
            <FaUserMd />
            <h3>Profissionais Qualificados</h3>
            <p>Médicos experientes e comprometidos com seu bem-estar</p>
          </FeatureCard>

          <FeatureCard>
            <FaMapMarkerAlt />
            <h3>Várias Localizações</h3>
            <p>Unidades em diferentes regiões para sua conveniência</p>
          </FeatureCard>
        </FeaturesGrid>

        <CtaSection>
          <h3>Pronto para cuidar da sua saúde?</h3>
          <ButtonGroup>
            <PrimaryButton onClick={() => navigate('/Usuariologin')}>
              <FaClinicMedical />
              Agendar Consulta
            </PrimaryButton>
            <SecondaryButton onClick={() => navigate('/cadastro')}>
              Criar Conta
            </SecondaryButton>
          </ButtonGroup>
        </CtaSection>
      </MainContent>

      <Footer>
        <ContactInfo>
          <div>
            <FaPhoneAlt />
            <span>(XX) XXXX-XXXX</span>
          </div>
          <div>
            <FaMapMarkerAlt />
            <span>Av. Saúde Popular, 123 - Centro</span>
          </div>
        </ContactInfo>
        <p>© {new Date().getFullYear()} Saúde Popular - Todos os direitos reservados</p>
        <p>
          <a href="/politica-de-privacidade">Política de Privacidade</a> | 
          <a href="/termos-de-uso"> Termos de Uso</a>
        </p>
      </Footer>
    </WelcomeContainer>
  );
}