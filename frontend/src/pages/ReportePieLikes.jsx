import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function ReportePieLikes(){


     // Definimos los datos de ejemplo de las publicaciones
     const [listapost, setlistapost] = useState([
        { id: "Publicación 1", likes: 5, fecha_hora: "12-12-2024" },
        { id: "Publicación 2", likes: 7, fecha_hora: "12-12-2024" },
        { id: "Publicación 3", likes: 3, fecha_hora: "12-12-2024" },
        { id: "Publicación 4", likes: 10, fecha_hora: "12-12-2024" },
        { id: "Publicación 5", likes: 12, fecha_hora: "12-12-2024" }
    ])
 
    const chartPieRef = useRef(null); // Creamos una referencia para el elemento canvas

    useEffect(() => {

         // Creamos los datos para la gráfica de pie

        const dataconfiguracion = {
            labels: listapost.map(item => `${item.id}\n${item.fecha_hora}`), // Etiquetas de las partes de la gráfica
            datasets: [{
                label: 'Likes por Publicación',
                data: listapost.map(item => item.likes), // Datos de likes
                hoverOffset: 5
            }]

        }
        
        // configuracionuramos la gráfica
        const configuracion={
            type: "pie", // Tipo de gráfica
            data: dataconfiguracion // Datos de la gráfica
        }
        
         // Creamos una instancia de la gráfica en el elemento canvas
        const ChartPie = new Chart(chartPieRef.current, configuracion)

        return () => ChartPie.destroy()

    }, [])

    return (
        <div>
            <canvas ref={chartPieRef} with="400" height="100"></canvas>
        </div>
    )

}
