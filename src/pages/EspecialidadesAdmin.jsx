import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';


export default function EspecialidadesAdmin() {
  const [especialidades, setEspecialidades] = useState([]);
  const [nome, setNome] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://localhost:7198/api/Especialidades")
      .then((res) => res.json())
      .then(setEspecialidades)
      .catch(() => alert("Erro ao carregar especialidades"));
  }, []);

  function limparForm() {
    setNome("");
    setEditandoId(null);
  }

  async function salvarEspecialidade() {
    if (!nome.trim()) return alert("Informe o nome da especialidade");

    if (editandoId) {
      const res = await fetch(
        `https://localhost:7198/api/Especialidades/${editandoId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome }),
        }
      );
      if (!res.ok) return alert("Erro ao editar especialidade");
      setEspecialidades(
        especialidades.map((e) => (e.id === editandoId ? { ...e, nome } : e))
      );
    } else {
      const res = await fetch("https://localhost:7198/api/Especialidades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome }),
      });
      if (!res.ok) return alert("Erro ao criar especialidade");
      const created = await res.json();
      setEspecialidades([...especialidades, created]);
    }

    limparForm();
  }

  function editarEspecialidade(especialidade) {
    setNome(especialidade.nome);
    setEditandoId(especialidade.id);
  }

  async function excluirEspecialidade(id) {
    if (!confirm("Confirma exclusão da especialidade?")) return;
    const res = await fetch(
      `https://localhost:7198/api/Especialidades/${id}`,
      { method: "DELETE" }
    );
    if (!res.ok) return alert("Erro ao excluir especialidade");
    setEspecialidades(especialidades.filter((e) => e.id !== id));
  }

  const styles = {
    container: {
      maxWidth: 640,
      margin: "40px auto",
      padding: 30,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#2c3e50",
      backgroundColor: "#fff",
      borderRadius: 12,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    },
    title: {
      textAlign: "center",
      marginBottom: 40,
      fontWeight: "700",
      fontSize: 32,
      color: "#34495e",
      letterSpacing: "0.03em",
    },
    form: {
      display: "flex",
      marginBottom: 25,
      gap: 15,
    },
    input: {
      flex: 1,
      padding: "14px 20px",
      fontSize: 18,
      borderRadius: 10,
      border: "1.8px solid #ced4da",
      transition: "border-color 0.3s",
      outline: "none",
      boxShadow: "inset 0 1px 3px rgb(0 0 0 / 0.1)",
    },
    inputFocus: {
      borderColor: "#3f8efc",
      boxShadow: "0 0 8px #3f8efc",
    },
    button: {
      borderRadius: 10,
      padding: "14px 28px",
      fontSize: 18,
      fontWeight: 700,
      cursor: "pointer",
      border: "none",
      color: "white",
      transition: "background-color 0.3s ease",
      boxShadow: "0 5px 12px rgb(63 142 252 / 0.35)",
    },
    btnPrimary: {
      backgroundColor: "#3f8efc",
    },
    btnPrimaryHover: {
      backgroundColor: "#336fd1",
      boxShadow: "0 6px 18px rgb(51 111 209 / 0.55)",
    },
    btnSecondary: {
      backgroundColor: "#6c757d",
      boxShadow: "0 5px 12px rgb(108 117 125 / 0.35)",
    },
    btnSecondaryHover: {
      backgroundColor: "#565e64",
      boxShadow: "0 6px 18px rgb(86 94 100 / 0.55)",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      borderRadius: 12,
      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
      overflow: "hidden",
      backgroundColor: "#fefefe",
    },
    listItem: {
      padding: "18px 22px",
      borderBottom: "1px solid #e6e9ed",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 18,
      fontWeight: 500,
      color: "#212529",
      transition: "background-color 0.25s ease",
      userSelect: "none",
    },
    listItemHover: {
      backgroundColor: "#f5faff",
    },
    btnSmall: {
      borderRadius: 8,
      padding: "10px 20px",
      cursor: "pointer",
      fontWeight: 700,
      border: "none",
      color: "white",
      transition: "background-color 0.3s ease",
      boxShadow: "0 4px 10px rgb(63 142 252 / 0.3)",
      marginRight: 12,
      fontSize: 15,
    },
    btnSmallPrimary: {
      backgroundColor: "#3f8efc",
    },
    btnSmallPrimaryHover: {
      backgroundColor: "#336fd1",
      boxShadow: "0 6px 18px rgb(51 111 209 / 0.45)",
    },
    btnSmallDanger: {
      backgroundColor: "#e74c3c",
      boxShadow: "0 4px 10px rgb(231 76 60 / 0.3)",
    },
    btnSmallDangerHover: {
      backgroundColor: "#b53126",
      boxShadow: "0 6px 18px rgb(181 49 38 / 0.55)",
    },
  };

  return (
    <ResponsiveContainer>
    <div style={styles.container}>
      <h1 style={styles.title}>Administração de Especialidades</h1>
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

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Nome da especialidade"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            ...styles.input,
            ...(isFocused ? styles.inputFocus : {}),
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          onClick={salvarEspecialidade}
          style={{
            ...styles.button,
            ...styles.btnPrimary,
            ...(hoverBtn === "salvar" ? styles.btnPrimaryHover : {}),
          }}
          onMouseEnter={() => setHoverBtn("salvar")}
          onMouseLeave={() => setHoverBtn(null)}
        >
          {editandoId ? "Salvar edição" : "Adicionar"}
        </button>
        {editandoId && (
          <button
            onClick={limparForm}
            style={{
              ...styles.button,
              ...styles.btnSecondary,
              ...(hoverBtn === "cancelar" ? styles.btnSecondaryHover : {}),
            }}
            onMouseEnter={() => setHoverBtn("cancelar")}
            onMouseLeave={() => setHoverBtn(null)}
          >
            Cancelar
          </button>
        )}
      </div>

      <ul style={styles.list}>
        {especialidades.map((e) => (
          <li
            key={e.id}
            style={{
              ...styles.listItem,
              ...(hoverItem === e.id ? styles.listItemHover : {}),
            }}
            onMouseEnter={() => setHoverItem(e.id)}
            onMouseLeave={() => setHoverItem(null)}
          >
            <span>{e.nome}</span>
            <div>
              <button
                onClick={() => editarEspecialidade(e)}
                style={{
                  ...styles.btnSmall,
                  ...styles.btnSmallPrimary,
                  ...(hoverBtn === `editar-${e.id}`
                    ? styles.btnSmallPrimaryHover
                    : {}),
                }}
                onMouseEnter={() => setHoverBtn(`editar-${e.id}`)}
                onMouseLeave={() => setHoverBtn(null)}
              >
                Editar
              </button>
              <button
                onClick={() => excluirEspecialidade(e.id)}
                style={{
                  ...styles.btnSmall,
                  ...styles.btnSmallDanger,
                  ...(hoverBtn === `excluir-${e.id}`
                    ? styles.btnSmallDangerHover
                    : {}),
                }}
                onMouseEnter={() => setHoverBtn(`excluir-${e.id}`)}
                onMouseLeave={() => setHoverBtn(null)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </ResponsiveContainer>
  );
}
