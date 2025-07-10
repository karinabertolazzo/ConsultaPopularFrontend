// src/pages/ClinicasPublicas.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import ResponsiveContainer from '../components/ResponsiveContainer';


const imagensFixas = [
  "https://images.unsplash.com/photo-1576765607923-c6c3f4e65e0a?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1588776814546-85b0202b1d58?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=600&q=80",
];

export default function ClinicasPublicas() {
  const [clinicas, setClinicas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState("");
   const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://localhost:7198/api/Clinicas")
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar clínicas");
        return res.json();
      })
      .then((data) => {
        setClinicas(data);
        setErro(null);
      })
      .catch((err) => {
        console.error("Erro ao carregar clínicas públicas", err);
        setErro("Não foi possível carregar as clínicas. Tente novamente mais tarde.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtra por nome da clínica ou especialidade
  const clinicasFiltradas = clinicas.filter((clinica) => {
    const nome = clinica.nome.toLowerCase();
    const busca = filtro.toLowerCase();
    const temEspecialidade = clinica.clinicaEspecialidades?.some((ce) =>
      ce.especialidade?.nome.toLowerCase().includes(busca)
    );
    return nome.includes(busca) || temEspecialidade;
  });

  return (
      <ResponsiveContainer>
    <div
      style={{
        maxWidth: 960,
        margin: "auto",
        padding: 24,
        fontFamily: "'Inter', sans-serif",
      }}
    >

       <button
          onClick={() => navigate('/')}
          style={{
            marginBottom: 20,
            backgroundColor: '#6c757d',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '10px 16px',
            cursor: 'pointer',
          }}
        >
          ← Voltar para Home
        </button>

      <h1
        style={{
          textAlign: "center",
          marginBottom: 32,
          color: "#2c7be5",
          fontWeight: "bold",
        }}
      >
        Clínicas e Especialidades Disponíveis
      </h1>


      <input
        type="search"
        placeholder="Buscar clínicas ou especialidades..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 30,
          fontSize: 16,
          borderRadius: 8,
          border: "1px solid #ccc",
          outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#2c7be5")}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
      />

      {loading && <p style={{ textAlign: "center" }}>Carregando clínicas...</p>}
      {erro && <p style={{ textAlign: "center", color: "red" }}>{erro}</p>}

      {!loading && !erro && clinicasFiltradas.length === 0 && (
        <p style={{ textAlign: "center", fontSize: 18 }}>
          Nenhuma clínica encontrada para "{filtro}".
        </p>
      )}

      {!loading && !erro && clinicasFiltradas.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {clinicasFiltradas.map((clinica, index) => (
            <div
              key={clinica.id}
              style={{
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={imagensFixas[index % imagensFixas.length]}
                alt={clinica.nome}
                style={{ width: "100%", height: 180, objectFit: "cover" }}
                loading="lazy"
              />
              <div
                style={{
                  padding: 20,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2 style={{ color: "#2c7be5", margin: "0 0 12px 0" }}>{clinica.nome}</h2>
                <p style={{ margin: "4px 0", fontWeight: "600" }}>
                  {clinica.endereco?.rua}, {clinica.endereco?.numero} - {clinica.endereco?.bairro}
                </p>
                <p style={{ margin: "4px 0 12px 0", color: "#555" }}>
                  {clinica.endereco?.cidade} - {clinica.endereco?.estado}, CEP: {clinica.endereco?.cep}
                </p>

                {clinica.horarioFuncionamento && (
                  <div style={{ marginTop: "auto" }}>
                    <strong>Horário de Funcionamento:</strong>
                    <ul style={{ marginTop: 6, paddingLeft: 20, color: "#444" }}>
                      {Object.entries(
                        typeof clinica.horarioFuncionamento === "string"
                          ? JSON.parse(clinica.horarioFuncionamento)
                          : clinica.horarioFuncionamento
                      ).map(([dia, horario]) => (
                        <li key={dia}>
                          {dia}: {horario.inicio} - {horario.fim}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {clinica.clinicaEspecialidades && clinica.clinicaEspecialidades.length > 0 && (
                  <div style={{ marginTop: 16 }}>
                    <strong>Especialidades:</strong>
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      {clinica.clinicaEspecialidades.map((ce) => (
                        <span
                          key={ce.id}
                          style={{
                            backgroundColor: "#2c7be5",
                            color: "#fff",
                            padding: "5px 14px",
                            borderRadius: 20,
                            fontSize: 13,
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ce.especialidade?.nome || "Desconhecida"}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  style={{
                    marginTop: 20,
                    backgroundColor: "#2c7be5",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "background-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#245bb5")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2c7be5")}
                  onClick={() =>
                    alert(`Você clicou para agendar na clínica: ${clinica.nome}`)
                    /* Aqui você pode fazer navegação para a página de agendamento */
                  }
                >
                  Agendar Consulta
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </ResponsiveContainer>
  );
}
