import React, { useState, useEffect, useRef} from 'react'; 
import Chart from 'chart.js/auto';
export default function ReporteBarra() {
    const [lista, setlista] = useState([
    ])

    const chartBarraRef = useRef(null);

    useEffect(() => {
        fetch ('http://localhost:5000/getReporteBarra', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(res => {
            console.log(res);                         
            setlista(res.topbarras);
            console.log(lista);
    
            const labelsusuario = res.topbarras.map(itemuser => itemuser.user);
            const datapost = res.topbarras.map(itemuser => itemuser.post);
    
            const configuracion = {
                type: 'bar',
                data: {
                    labels: labelsusuario, 
                    datasets: [
                        {
                            label: 'Cantidad de Post',
                            data: datapost,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        }
                    ]
                },
                options:{
                    scales: {
                        y:{
                            beginAtZero: true
                        }
                    }
                }
            };
    
            const chartBarra = new Chart(chartBarraRef.current, configuracion);
            return () => chartBarra.destroy();
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
    }, []);
    
    return (
        <div>
            <canvas ref={chartBarraRef} width="300" height="300"></canvas>
        </div>
    );
}

