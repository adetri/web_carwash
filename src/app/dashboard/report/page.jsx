"use client"
import ContentTittle from "@/components/content_tittle.jsx";
import CustomTable from "@/components/table";

import { makeRequest } from '@/utils/api.js';
import { getJwtCookie, dgb, setCookie, getCookie, dbg } from "@/utils/method";
import React, { useState, useEffect } from 'react';

export default function report() {

  // dgb(getCookie('athstatus')); 
  function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const [dataOrder, setdataOrder] = useState(null);
  useEffect(() => {
    const jwt = getJwtCookie();
    const data = { 'start_date': '2024-03-1', 'end_date': '2024-03-31' }
    const getReporOrder = async () => {
      const request = await makeRequest('/api/getreportorder', 'POST', data, false, jwt);
      dbg(`status report is : ${request.status}`)
      dbg('data report is ', request.data)
      setdataOrder(request.data['data'])
    }
    getReporOrder();
  },[]
  )

  dbg('send to table is  ',dataOrder )



  return (
    <div>
      <ContentTittle name='Report' />


      <div className="col-xl-12 col-lg-12 col-md-12">
        <div className="card shadow mb-4">
          {/* Card Header - Dropdown */}
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
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
          <div className="card-body">

         <CustomTable data={dataOrder} />
          
          </div>
        </div>
      </div>
    </div>
  );
}
