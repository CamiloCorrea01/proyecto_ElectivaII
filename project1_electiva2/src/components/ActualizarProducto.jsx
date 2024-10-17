import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ActualizarProducto = ({ token }) => {
  const [producto, setProducto] = useState({ name: '', description: '', value: 0, category: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  // Memoiza la función fetchProducto para que su referencia no cambie en cada renderizado
  const fetchProducto = useCallback(async () => {
    try {
      const response = await axios.get(`https://api-nodejs-da74.onrender.com/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducto(response.data);
    } catch (error) {
      console.error('Error al obtener producto:', error);
    }
  }, [id, token]); // Dependencias de fetchProducto: id y token

  useEffect(() => {
    fetchProducto();
  }, [fetchProducto]); // Añadir fetchProducto como dependencia

  const actualizarProducto = async () => {
    try {
      await axios.put(`https://api-nodejs-da74.onrender.com/products/${id}`, producto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/productos');
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Actualizar Producto</h2>
      <div className="input-group">
        <input
          value={producto.name}
          onChange={(e) => setProducto({ ...producto, name: e.target.value })}
          className="form-control"
          placeholder="Nombre"
        />
      </div>
      <div className="input-group">
        <input
          value={producto.description}
          onChange={(e) => setProducto({ ...producto, description: e.target.value })}
          className="form-control"
          placeholder="Descripción"
        />
      </div>
      <div className="input-group">
        <input
          type="number"
          value={producto.value}
          onChange={(e) => setProducto({ ...producto, value: Number(e.target.value) })}
          className="form-control"
          placeholder="Valor"
        />
      </div>
      <div className="input-group">
        <input
          value={producto.category}
          onChange={(e) => setProducto({ ...producto, category: e.target.value })}
          className="form-control"
          placeholder="ID de Categoría"
        />
      </div>
      <div className="btn-container">
        <button onClick={actualizarProducto} className="btn btn-warning">Actualizar Producto</button>
        <button onClick={() => navigate('/productos')} className="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  );
};

export default ActualizarProducto;
