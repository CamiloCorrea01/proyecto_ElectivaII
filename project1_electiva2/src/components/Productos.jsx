import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/Productos.css';

const Productos = ({ token }) => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await axios.get('https://api-nodejs-da74.onrender.com/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(response.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://api-nodejs-da74.onrender.com/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  const productosFiltrados = productos.filter(
    (producto) =>
      producto.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto._id.includes(busqueda)
  );

  return (
    <div className="productos-container">
      <h1 className="productos-title">Lista de Productos</h1>
      
      <div className="productos-actions">
        <div className="search-container">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o ID"
            className="search-input"
          />
        </div>
        
        <Link to="/productos/agregar" className="add-button">
          Agregar Producto
        </Link>
      </div>

      <div className="productos-grid">
        {productosFiltrados.map((producto) => (
          <div key={producto._id} className="producto-card">
            <h3>{producto.name}</h3>
            <p>{producto.description}</p>
            <p className="producto-precio">${producto.value}</p>
            <div className="producto-actions">
              <Link to={`/actualizar/${producto._id}`} className="update-link">Actualizar</Link>
              <button onClick={() => eliminarProducto(producto._id)} className="delete-button">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;