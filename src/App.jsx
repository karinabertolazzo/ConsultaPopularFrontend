import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/BemVindo';
import AdminPanel from './pages/AdminPanel';
import AgendamentoUsuario from './pages/AgendamentoUsuario';
import EspecialidadesAdmin from './pages/EspecialidadesAdmin'; 
import ClinicaCadastro from './pages/ClinicaCadastro';
import { ToastProvider } from './components/Toast';
import ClinicasPublicas from './pages/Clinicas';
import Navbar from "./components/Navbar";
import UsuarioCadastro from './pages/UsuarioCadastro';
import UsuarioLogin from './pages/UsuarioLogin';
import BemVindo from './pages/BemVindo';


function App() {
  return (
        <ToastProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      <Route path="/agendamento" element={<AgendamentoUsuario />} />
      <Route path="/especialidades" element={<EspecialidadesAdmin />} />
      <Route path="/ClinicaCadastro" element={<ClinicaCadastro/>} />
      <Route path="/clinicas" element={<ClinicasPublicas />} />
       <Route path="/cadastro" element={<UsuarioCadastro />} />
       <Route path="/Usuariologin" element={<UsuarioLogin />} />
      <Route path="/BemVindo" element={<BemVindo/>} />
      <Route path="/SobreNos" element={<SobreNos/>} />



      </Routes>
    </Router>
    </ToastProvider>
  );
}

export default App;
