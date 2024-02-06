import "./App.css";
import { TbTrashFilled, TbPencilCog, TbMoonFilled } from "react-icons/tb";
import { useFetch } from "./useFetch";
import { useState } from "react";

function App() {
  const [darkTable, setDarkTable] = useState(false);
  const { data, loading, error } = useFetch(
    "http://localhost:8085/inventory/v1/clientes"
  );

  const toggleTableClass = () => {
    setDarkTable(!darkTable);
  };

  const deleteUser = (id) => {
    console.log(`Estudiante eliminado con Id: ${id}`);
  };

  return (
    <>
      <div className="btn-libre">
        <button
          onClick={toggleTableClass}
          className="btn btn-sm btn-outline-secondary"
        >
          <TbMoonFilled />
        </button>
      </div>
      <div className="container">
        <h1>Sistema de Inventario</h1>
        <div className="container__tabla">
          {error && <p>Error: {error}</p>}
          {loading && <p>Loading ...</p>}
          <table className={`table ${darkTable ? "table-dark" : ""}`}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Servicio</th>
                <th>Costo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td>{item.nombre}</td>
                  <td>{item.servicio}</td>
                  <td>{item.costo}</td>
                  <td>
                    <p
                      className={
                        item.estado === "C"
                          ? "badge-cancelo"
                          : "badge-falta-pagar"
                      }
                    >
                      {item.estado === "C" ? "Cáncelo" : "Falta"}
                    </p>
                  </td>
                  <td>
                    <div>
                      <button className="btn btn-sm btn-warning">
                        <p>
                          <TbPencilCog />
                        </p>
                      </button>

                      <button
                        onClick={() => deleteUser(item.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <TbTrashFilled color="#FFF" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
