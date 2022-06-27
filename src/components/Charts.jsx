/* eslint-disable no-unused-vars */
import React from "react";
import Chart from 'chart.js/auto';
import {Line,Bar,Doughnut} from "react-chartjs-2";

function Charts({ratingGraphData,quesGraphData,levelGraphData,tagGraphData}){
    return (
        <div className="chart-area">
            {/* <LineChart ratingGraphData={ratingGraphData}/> */}
            <Line data={ratingGraphData} options={{
                responsive: true,
                maintainAspectRatio:false,
                layout: {
                    padding:{
                        right:30,
                        left:15,
                        bottom:10
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Rating Graph',
                        position:'bottom',
                        font: {
                            size: 17
                        }
                    },
                }
            }}></Line>

            <Bar data={quesGraphData}options={{
                responsive: true,
                maintainAspectRatio:false,
                layout: {
                    padding:{
                        top:10,
                        right:30,
                        left:15,
                        bottom:15
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Number of Problems Solved on the basis of Problem Rating',
                        position:'bottom',
                        font: {
                            size: 17
                        }
                    }
                }
            }} ></Bar>

            <Bar data={levelGraphData} options={{
                responsive: true,
                maintainAspectRatio:false,
                layout: {
                    padding:{
                        top:10,
                        right:30,
                        left:15,
                        bottom:5
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Number of Problems Solved on the basis of Level',
                        position:'bottom',
                        font: {
                            size: 17
                        }
                    }
                }
            }}></Bar>

            <Doughnut data={tagGraphData} options={{
                responsive: true,
                maintainAspectRatio:false,
                layout: {
                    padding:{
                        right:30,
                        left:15,
                        bottom:40
                    }
                },
                plugins:{
                    legend:{
                        position:'right'
                    },
                    title: {
                        display: true,
                        text: 'Number of Problems Solved on the basis of Problem Tag',
                        position:'bottom',
                        font: {
                            size: 13
                        }
                    }
                }
            }}/>
        </div>
    );
}

export default Charts;