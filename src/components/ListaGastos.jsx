function ListaGastos({ gastos, eliminarGasto, editarGasto }) {
    return (

        <ul className="lista-gastos">
            {gastos.map(gasto => (
                <li key={gasto.id} className={gasto.categoria}> 
                    
                    <span>
                        {gasto.nombre} - ${gasto.monto} ({gasto.categoria})
                    </span>

                    <div className="acciones">
                        <button onClick={() => editarGasto(gasto)}>Editar</button>
                        <button onClick={() => eliminarGasto(gasto.id)}>Eliminar</button>
                    </div>
                </li>
             ))}
        </ul>
    );
}

export default ListaGastos;