// components/CustomTable.js
"use client"


import { dbg } from "@/utils/method";
import React, { useState, useEffect } from 'react';

const CustomTable = (data = null) => {


    const [dataTable, setdataTable] = useState(null)

    dbg(data['data'])


    return (
        <div className="col">
            <div className="row mb-2 d-flex justify-content-end">
                <div className="col-md-9 mb-1 d-flex justify-content-start" >
                    <select style={{ maxWidth: '90px' }} className="form-control form-control-sm ">
                        <option defaultValue>10</option>
                        <option>500</option>
                        <option>100</option>
                        <option>50</option>
                        <option>10</option>
                    </select>
                </div>


                <div className="input-group input-group-sm mb-1 col-md-2">
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                    />
                </div>
                <div className="mb-1 col-md-1 d-flex justify-content-center" style={{ width: '100%', }}>
                    <button type="button" className="btn btn-primary btn-sm ">
                        Search
                    </button>

                </div>

            </div>
            <div className="table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '15px' }}>#</th>
                            {data['header'].map((item, index) => (
                                // <CustomComponent key={index} label={item} />
                                <th scope="col" key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    {data && data['data'] && (
                        <tbody>
                            {data['data'].map((body, i) => (
                                <tr key={body.id}>
                                    <td>{i + 1}</td>

                                    <td>{body['vehicle_owner']}</td>
                                    <td>{body['vehicle_number']}</td>
                                    <td>
                                        {body['order_washer_list'].map((service, index) => (

                                            <li key={index}>{service['karyawan']['name']}</li>
                                        ))}                                        
                                    </td>
                                    <td>
                                        {body['service_list_order'].map((service, index) => (

                                            <li key={index}>{service['item']['name']}</li>
                                        ))}
                                    </td>
                                    <td>
                                        {body['service_list_order'].map((service, index) => (

                                            <li key={index}>{service['price']}</li>
                                        ))}
                                    </td>
                               
                                </tr>
                            ))}

                        <tr >
                            <td colSpan={5} className="text-center">Total Page</td>
                        </tr>
                        <tr >
                            <td colSpan={5} className="text-center">Total</td>
                        </tr>
                        </tbody>
                    )}

                </table>
            </div>
            <div className="pag d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Previous
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                1
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                2
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                3
                            </a>
                        </li>
                        <li className="page-item">
                            <a className="page-link" href="#">
                                Next
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default CustomTable;
