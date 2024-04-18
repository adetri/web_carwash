"use client"
import Chart from "chart.js";
import ContentTittle from "@/components/content_tittle.jsx";
import styles from './styles.module.css';
import { dbg, getStringDay, getStringMonth, getStringYear, getJwtCookie, CurrencyFormatter } from "@/utils/method";
import { makeRequest } from '@/utils/api.js';
import React, { useState, useEffect } from 'react';


export default function CardBarChart() {
  const today = new Date(); // Get

  let year = getStringYear();
  let month = getStringMonth();
  let day = getStringDay();

  const [chartData, setChartData] = useState(null)
  const SearchHandler = async () => {
    const jwt = getJwtCookie();
    const data = { 'year': year, 'month': month, 'day': day }
    const getChartData = async () => {
      const request = await makeRequest('/api/getchartreport', 'POST', data, false, jwt);
      dbg(`status report is : ${request.status}`)
      dbg('data report is ', request.data)
      setChartData(request.data['data'])
    }
    await getChartData();

  }
  const test_arr = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth() - i);
    const new_data = [date.toLocaleString('en-US', { month: 'short' }), date.toLocaleString('en-US', { year: 'numeric' })];
    return new_data;
  });
  let monthNow2 = today.toLocaleString('en-US', { month: 'long' });


  const [selectedMonth, setSelectedMonth] = useState(0);

  const handleMonthClick = (index) => {
    setSelectedMonth(index);
    let sel_day = '2'
    let sel_month = test_arr[index][0]
    let sel_year = test_arr[index][1]
    const date = new Date(`${sel_year} ${sel_month} ${sel_day}`);
    const formattedDate = date.toISOString().slice(0, 10);
    const dateParts = formattedDate.split("-")

    year = sel_year
    day = sel_day
    month = dateParts[1]
    SearchHandler()
    

    
  };


  React.useEffect(() => {
    SearchHandler();


  }, []);




  if (chartData) {
    const data = chartData['monthly_recod']
    dbg(data)

    let data_label = []
    let data_nominal = []


    for (let dl = 0; dl < chartData['monthly_recod'].length; dl++) {
      data_label.push(chartData['monthly_recod'][dl][0])
      data_nominal.push(chartData['monthly_recod'][dl][1])

    }
    data_label = data_label.reverse()
    data_nominal = data_nominal.reverse()

    dbg(data_label)
    dbg(data_nominal)

    document.title = `Dashboard - ${process.env.NEXT_PUBLIC_APP_NAME}`;
    let config = {
      type: "bar",
      data: {
        labels: data_label,
        datasets: [
          {
            label: monthNow2,
            backgroundColor: "#4e73df",
            borderColor: "#4e73df",
            data: data_nominal,
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


  }
  return (

    <>

      <div>

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

                    {chartData && chartData['monthly_total_order'] && (
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {chartData['monthly_total_order']}
                      </div>
                    )}

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
                    {chartData && chartData['monthly_total'] && (
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {CurrencyFormatter(chartData['monthly_total'])}
                      </div>
                    )}

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
                    {chartData && chartData['total_today_order'] && (
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {chartData['total_today_order']}
                      </div>
                    )}

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
                    {chartData && chartData['total_today'] && (
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        {CurrencyFormatter(chartData['total_today'])}
                      </div>
                    )}
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
              <div className="card-body m-1" style={{ minHeight: '350px', overflowX: 'auto' }} >
                <div className="date" style={{ overflowX: 'auto' }}>
                  <div className="container-fluid">

                    <div className="row" style={{ minWidth: '900px' }} >
                      {test_arr.map((month, index) => (
                        <div key={index} className=" rounded d-flex flex-column bd-highlight mb-1 ml-1" onClick={() => handleMonthClick(index)} style={{ background: selectedMonth === index ? '#4e73df' : '' }}>
                          <div className="p-1 bd-highlight d-flex justify-content-center" style={{ color: selectedMonth === index ? 'white' : '' }} >{month[0]}</div>
                          <div className="p-1 bd-highlight" style={{ color: selectedMonth === index ? 'white' : '' }} ><h4>{month[1]}</h4></div>
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

      </div>
    </>
  );
}