export const globalStyles = {
  // Configurações base
  html: {
    height: '100%',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  
  body: {
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    fontFamily: '"Segoe UI", sans-serif',
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  
  // Container principal que vai em todas as páginas
  mainContainer: {
    width: '100%',
    minHeight: '100vh',
    padding: '2rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  
  // Card padrão reutilizável
  card: {
    width: '100%',
    padding: '2rem',
    borderRadius: '0.5rem',
    backgroundColor: '#fff',
    boxShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.1)',
    marginBottom: '2rem',
    boxSizing: 'border-box',
  },
  
  // Media Queries
  mediaQueries: {
    small: '@media (max-width: 768px)',
    large: '@media (min-width: 1200px)'
  },
  
  // Utilitários
  fullWidth: {
    width: '100%',
  },
  
  fullHeight: {
    height: '100%',
  },
  
  // Espaçamentos responsivos
  spacing: {
    small: '1rem',
    medium: '2rem',
    large: '3rem',
  }
};