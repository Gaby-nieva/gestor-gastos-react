
function Formulario({
    nombre,
    setNombre,
    monto,
    setMonto,
    categoria,
    setCategoria,
    handleSubmit,
    gastoEditando
}) {
    return (
        <form className="formulario" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre del gasto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
            />

            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
            >
                <option value="">-- Seleccionar categoría --</option>
                <option value="comida">Comida</option>
                <option value="transporte">Transporte</option>
                <option value="ocio">Ocio</option>
                <option value="otros">Otros</option>
            </select>

            <button type="submit">
                {gastoEditando ? "Guardar cambios" : "Agregar"}
            </button>
        </form>
    )
}

export default Formulario;

