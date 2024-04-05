// components/CustomTable.js
"use client"


import { dbg, getStringDate, CurrencyFormatter } from "@/utils/method";
import React, { useState, useEffect } from 'react';
import Alr from "@/components/notif"
import { forEach } from "../../public/vendor/fontawesome-free/js/v4-shims";

const CustomTable = (data = null) => {

    dbg(data)
    const headTable = ['owner name', 'Plat num', 'Date', 'washer', 'services list', 'service price']
    const [searchBox, setsearchBox] = useState('');
    const handleInputChange = (event) => {
        setsearchBox(event.target.value);
    };
    function searchByName(query) {
        if(data['data']){
            return data['data'].filter(item => item.vehicle_number.toLowerCase().includes(query.toLowerCase())
            || item.vehicle_owner.toLowerCase().includes(query.toLowerCase())

        );
        }
    
    }
    const searchResults = searchByName(searchBox);

    return (
        <div className="col">
            <div className="row mb-2 d-flex justify-content-end">
                <div className="col-md-10 mb-1 d-flex justify-content-start" >
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
                        aria-describedby="inputGroup-sizing-sm" value={searchBox}
                        onChange={handleInputChange}
                    />
                </div>


            </div>
            {(searchResults.length > 0) && (
                <div className="table">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: '15px' }}>#</th>
                                {headTable.map((item, index) => (
                                    // <CustomComponent key={index} label={item} />
                                    <th scope="col" key={index}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        {data && searchResults && (
                            <tbody>
                                {searchResults.map((body, i) => (
                                    <tr key={body.id}>
                                        <td>{i + 1}</td>

                                        <td>{body['vehicle_owner']}</td>
                                        <td>{body['vehicle_number']}</td>
                                        <td>{getStringDate(body['create_at'])}</td>

                                        <td>
                                            {body['washer_list'].map((service, index) => (

                                                <li key={index}>{service['karyawan__name']}</li>
                                            ))}
                                        </td>
                                        <td>
                                            {body['service_list'].map((service, index) => (

                                                <li key={index}>{service['item__name']}</li>
                                            ))}
                                        </td>
                                        <td>
                                            {body['service_list'].map((service, index) => (

                                                <li key={index}>{CurrencyFormatter(service['price'])}</li>
                                            ))}
                                        </td>

                                    </tr>

                                ))}
                                <tr >
                                    <td colSpan={6} className="text-center">Total Page</td>
                                    <td className="text-left">90000000</td>

                                </tr>
                                <tr >
                                    <td colSpan={6} className="text-center">Total</td>
                                    <td className="text-left">90000000</td>

                                </tr>

                            </tbody>
                        )}

                    </table>
                </div>



            )}


            {!(searchResults.length > 0) && (
                     <Alr name='Data Not Found' />

            )}

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
