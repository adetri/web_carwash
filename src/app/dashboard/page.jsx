"use client"
import Chart from "chart.js";
import ContentTittle from "@/components/content_tittle.jsx";
import styles from './styles.module.css';
import { dbg } from "@/utils/method";

import React, { useState,useEffect } from 'react';


export default function CardBarChart() {
  const today = new Date(); // Get
  const test_arr = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - i);
    const new_data = [date.toLocaleString('en-US', { month: 'short' }), date.toLocaleString('en-US', { year: 'numeric' })];
    return new_data;
  });
  let monthNow2 = today.toLocaleString('en-US', { month: 'long' });
  

  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleMonthClick = (index) => {
    setSelectedMonth(index);
  };

  // dbg(test_arr);

  React.useEffect(() => {
    document.title = `Dashboard - ${process.env.NEXT_PUBLIC_APP_NAME}`;
    let config = {
      type: "bar",
      data: {
        labels: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
        ],
        datasets: [
          {
            label: monthNow2,
            backgroundColor: "#4e73df",
            borderColor: "#4e73df",
            data: [30, 78, 56, 34, 100, 45, 13, 232, 290, 900],
            fill: true,
            barThickness: 8,
          },

        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,

        title: {
          display: false,
          text: "Orders Chart",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(0,0,0,.4)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Date",
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0.3)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
              },
              gridLines: {
                borderDash: [2],
                drawBorder: false,
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.2)",
                zeroLineColor: "rgba(33, 37, 41, 0.15)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar = new Chart(ctx, config);
  }, []);
  return (

    <>


      <ContentTittle name='Dashboard' />


      <div className="row">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Order (Monthly)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $40,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Revenue (Monthly)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Order (Today)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $40,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Revenue (Today)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    $215,000
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}

        {/* Pending Requests Card Example */}

      </div>



      <div className="row">
        {/* Area Chart */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4" >
            {/* Card Header - Dropdown */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Monthly Sales</h6>
              <div className="dropdown no-arrow">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                  aria-labelledby="dropdownMenuLink"
                >
                  <div className="dropdown-header">Dropdown Header:</div>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </div>
            </div>
            {/* Card Body */}
            <div className="card-body m-1" style={{ minHeight: '350px',overflowX: 'auto' }} >
              <div className="date" style={{ overflowX: 'auto' }}>
                <div className="container-fluid">

                  <div className="row" style={{ minWidth: '900px' }} >
                    {test_arr.map((month, index) => (
                      <div key={index} className=" rounded d-flex flex-column bd-highlight mb-1 ml-1"   onClick={() => handleMonthClick(index)} style={{ background: selectedMonth === index ? '#4e73df' : '' }}>
                        <div className="p-1 bd-highlight d-flex justify-content-center" style={{color: selectedMonth === index ? 'white' : ''}} >{month[0]}</div>
                        <div className="p-1 bd-highlight" style={{color: selectedMonth === index ? 'white' : ''}} ><h4>{month[1]}</h4></div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
              <div className="chart-area" style={{ minHeight: '350px', minWidth: '750px' }}>
                <canvas style={{ height: '100%' }} id="bar-chart"></canvas>

              </div>
            </div>
          </div>
        </div>
        {/* Pie Chart */}

      </div>


    </>
  );
}