import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ReportePieLikes() {
  const chartPieRef = useRef(null); // Creamos una referencia para el elemento canvas

  useEffect(() => {
    // Obtenemos los datos de la sessionStorage
    const likes = JSON.parse(sessionStorage.getItem('likes') || '{}');
    const listaObjetos = Object.keys(likes).map(id => ({ id, likes: likes[id] }));

    console.log("Likes:", likes); // Verificar si los datos de likes están disponibles
    console.log("Lista de Objetos:", listaObjetos); // Verificar si la lista de objetos se genera correctamente

    // Verificar que listaObjetos es un array
    if (!Array.isArray(listaObjetos)) {
      console.error("Error: listaObjetos debe ser un array.");
      return;
    }

    // Verificar si Chart.js está disponible
    if (typeof Chart !== 'function') {
      console.error("Error: Chart.js no está disponible.");
      return;
    }

    // Verificar si la referencia al elemento canvas está disponible
    if (!chartPieRef.current) {
      console.error("Error: Referencia al elemento canvas no encontrada.");
      return;
    }

    // Creamos los datos para la gráfica de pie
    const dataconfiguracion = {
      labels: listaObjetos.map(item => `Publicación ${item.id}`), // Etiquetas de las partes de la gráfica
      datasets: [{
        label: 'Likes por Publicación',
        data: listaObjetos.map(item => item.likes), // Datos de likes
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        hoverOffset: 5
      }]
    };

    // Configuramos la gráfica
    const configuracion = {
      type: "pie", // Tipo de gráfica
      data: dataconfiguracion // Datos de la gráfica
    };

    // Creamos una instancia de la gráfica en el elemento canvas
    const ChartPie = new Chart(chartPieRef.current, configuracion);

    return () => ChartPie.destroy();
  }, []);

  return (
    <div>
      <h2>Likes por Publicación</h2>
     <canvas ref={chartPieRef} width="400" height="400" style={{ width: '100%', height: 'auto' }}></canvas>
    </div>
  );
}
