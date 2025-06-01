
// ✅ src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/my-buffet', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFoods(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="p-4" style={{backgroundColor:'yellow'}}>
      <h2 className="text-2xl mb-4">Mes plats</h2>
      <ul className="space-y-2">
        {foods.map(food => (
          <li key={food.id} className="border p-2 rounded">
            <strong>{food.name}</strong>: {food.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;


