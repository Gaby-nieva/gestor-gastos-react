import { useState, useEffect } from "react";
import ListaGastos from "./components/ListaGastos";
import Formulario from "./components/Formulario";
import "./App.css";



function App() {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [gastos, setGastos] = useState(() => {
    const datos = localStorage.getItem("gastos");
    return datos ? JSON.parse(datos) : [];
  });
  const [gastoEditando, setGastoEditando] = useState(null);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));

  }, [gastos]);

  const editarGasto = (gasto) => {
    setNombre(gasto.nombre);
    setMonto(gasto.monto);
    setCategoria(gasto.categoria);
    setGastoEditando(gasto.id);
  };

  const [filtro, setFiltro] = useState("");
  const gastosFiltrados = filtro ? gastos.filter(gasto => gasto.categoria === filtro) : gastos;
  const total = gastosFiltrados.reduce((acc, gasto) => {
    return acc + Number(gasto.monto);
  }, 0);


  // BOTON AGREGAR 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre === "" || monto === "" || categoria === "") {
      alert("Todos los campos son obligatorios");
      return;
    }

    // EDITAR

    if (gastoEditando) {
      const gastosActualizados = gastos.map(gasto => gasto.id === gastoEditando
        ? { ...gasto, nombre, monto, categoria } : gasto
      );

      setGastos(gastosActualizados);
      setGastoEditando(null);
    }

    // CREAR

    else {
      const nuevoGasto = {
        id: Date.now(),
        nombre,
        monto,
        categoria
      };

      setGastos([...gastos, nuevoGasto]);
    }

    setNombre("");
    setMonto("");
    setCategoria("");
  };


  //  BOTON ELIMINAR

  const eliminarGasto = (id) => {
    const nuevosGastos = gastos.filter(gasto => gasto.id !== id);
    setGastos(nuevosGastos);
  }

  const limpiarGastos = () => {
    const confirmar = window.confirm("¿Seguro que querés eliminar todos los gastos?");
    if (confirmar) {
      setGastos([]);
    }
  };


  return (
    <div className="contenedor">
      <h1>Gestor de Gastos</h1>

      <Formulario
        nombre={nombre}
        setNombre={setNombre}
        monto={monto}
        setMonto={setMonto}
        categoria={categoria}
        setCategoria={setCategoria}
        handleSubmit={handleSubmit}
        gastoEditando={gastoEditando}
      />

      <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
        <option value="">Todas</option>
        <option value="comida">Comida</option>
        <option value="transporte">Transporte</option>
        <option value="ocio">Ocio</option>
        <option value="otros">Otros</option>
      </select>

      <ListaGastos gastos={gastosFiltrados} eliminarGasto={eliminarGasto} editarGasto={editarGasto} />

      {gastos.length > 0 && (
        <div className="resumen">
          <p className="total">
            Total: ${total}
          </p>
            <button className="limpiar" onClick={limpiarGastos}>Eliminar Todo</button>
        </div>
        )}

    </div>
  );
}


export default App;