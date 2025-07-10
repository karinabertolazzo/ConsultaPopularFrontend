import styled from 'styled-components';
import { FaClinicMedical, FaUserMd, FaHeartbeat, FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { MdHealthAndSafety } from 'react-icons/md';

// Estilos da página
const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  border-radius: 16px;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.8rem;
    color: #2c3e50;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #34495e;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const MissionSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MissionText = styled.div`
  flex: 1;
  min-width: 300px;

  h2 {
    font-size: 2.2rem;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    color: #34495e;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const MissionImage = styled.div`
  flex: 1;
  min-width: 300px;
  height: 400px;
  background: #3498db;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 5rem;
`;

const ValuesSection = styled.section`
  margin-bottom: 4rem;

  h2 {
    text-align: center;
    font-size: 2.2rem;
    color: #2c3e50;
    margin-bottom: 3rem;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const ValueCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
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
    margin-bottom: 1rem;
  }

  p {
    color: #7f8c8d;
    line-height: 1.6;
  }
`;

const TeamSection = styled.section`
  margin-bottom: 4rem;

  h2 {
    text-align: center;
    font-size: 2.2rem;
    color: #2c3e50;
    margin-bottom: 3rem;
  }
`;

const ContactSection = styled.section`
  background: #2c3e50;
  color: white;
  padding: 3rem;
  border-radius: 16px;
  margin-bottom: 2rem;

  h2 {
    text-align: center;
    font-size: 2.2rem;
    margin-bottom: 2rem;
    color: white;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  svg {
    font-size: 2rem;
    color: #3498db;
  }

  p {
    margin: 0;
    color: #ecf0f1;
  }

  a {
    color: #3498db;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function SobreNos() {
  return (
    <AboutContainer>
      <HeroSection>
        <h1>Sobre a Saúde Popular</h1>
        <p>
          Conectando pacientes a cuidados médicos de qualidade a preços acessíveis desde 2023. 
          Nossa missão é democratizar o acesso à saúde no Brasil.
        </p>
      </HeroSection>

      <MissionSection>
        <MissionText>
          <h2>Nossa Missão</h2>
          <p>
            A Saúde Popular nasceu da necessidade de oferecer consultas médicas de qualidade a preços 
            acessíveis para toda a população. Acreditamos que a saúde é um direito fundamental e não 
            um privilégio.
          </p>
          <p>
            Nossa plataforma conecta pacientes a uma rede de profissionais comprometidos com a medicina 
            humanizada e preços justos, eliminando intermediários e burocracias.
          </p>
          <p>
            Com tecnologia inovadora, facilitamos o agendamento de consultas em diversas especialidades, 
            proporcionando conveniência e transparência em cada etapa do processo.
          </p>
        </MissionText>
        <MissionImage>
          <MdHealthAndSafety />
        </MissionImage>
      </MissionSection>

      <ValuesSection>
        <h2>Nossos Valores</h2>
        <ValuesGrid>
          <ValueCard>
            <FaClinicMedical />
            <h3>Acesso Democrático</h3>
            <p>
              Oferecemos consultas a preços populares sem comprometer a qualidade do atendimento médico.
            </p>
          </ValueCard>

          <ValueCard>
            <FaUserMd />
            <h3>Profissionais Qualificados</h3>
            <p>
              Nossa rede é composta por médicos experientes e comprometidos com a medicina de excelência.
            </p>
          </ValueCard>

          <ValueCard>
            <FaHeartbeat />
            <h3>Humanização no Atendimento</h3>
            <p>
              Acreditamos em uma medicina que valoriza a relação médico-paciente e o cuidado integral.
            </p>
          </ValueCard>

          <ValueCard>
            <FaCalendarAlt />
            <h3>Agendamento Simplificado</h3>
            <p>
              Plataforma intuitiva que permite marcar consultas em poucos cliques, 24 horas por dia.
            </p>
          </ValueCard>
        </ValuesGrid>
      </ValuesSection>

      <TeamSection>
        <h2>Nossa Equipe</h2>
        <ValuesGrid>
          <ValueCard>
            <GiHealthNormal />
            <h3>Médicos Especialistas</h3>
            <p>
              Contamos com profissionais das principais especialidades médicas, todos com CRM ativo e 
              comprovada experiência.
            </p>
          </ValueCard>

          <ValueCard>
            <FaUserMd />
            <h3>Atendimento Humanizado</h3>
            <p>
              Nossa equipe de atendimento está treinada para oferecer um serviço acolhedor e resolutivo.
            </p>
          </ValueCard>

          <ValueCard>
            <FaClinicMedical />
            <h3>Estrutura Completa</h3>
            <p>
              Clínicas equipadas com tecnologia moderna para diagnósticos precisos e tratamentos eficazes.
            </p>
          </ValueCard>
        </ValuesGrid>
      </TeamSection>

      <ContactSection>
        <h2>Entre em Contato</h2>
        <ContactGrid>
          <ContactItem>
            <FaPhoneAlt />
            <p>Atendimento ao Cliente</p>
            <a href="tel:+5511999999999">(11) 99999-9999</a>
          </ContactItem>

          <ContactItem>
            <FaMapMarkerAlt />
            <p>Nossas Unidades</p>
            <p>São Paulo - SP</p>
            <p>Rio de Janeiro - RJ</p>
            <p>Belo Horizonte - MG</p>
          </ContactItem>

          <ContactItem>
            <FaCalendarAlt />
            <p>Horário de Funcionamento</p>
            <p>Segunda a Sexta: 7h às 19h</p>
            <p>Sábados: 8h às 13h</p>
          </ContactItem>
        </ContactGrid>
      </ContactSection>
    </AboutContainer>
  );
}