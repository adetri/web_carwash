// components/CustomTable.js
"use client"


import { dbg, getStringDate, CurrencyFormatter } from "@/utils/method";
import React, { useState, useEffect } from 'react';
import Alr from "@/components/notif"
import { forEach } from "../../public/vendor/fontawesome-free/js/v4-shims";
// import 'datatables.net-responsive-dt';


const CustomTable = (data = null) => {
    let [table_status, setTableStatus] = useState(false);
    const headTable = ['owner name', 'Plat num', 'Date', 'washer', 'services list', 'service price']
    const total = {
        "colspan": headTable.length,
        "text1": "Total",
        "nominal": 0


    }
    const [dataCount, setdataCount] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handleActiveClick = (event) => {
        const value = event.target.textContent.trim(); // Get the text content of the clicked link
        const clicked_val = parseInt(value)
        // Add your logic here to handle the clicked value

        console.log(clicked_val);

    };


    const handlePreviousPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    // Event handler for navigating to the next page
    const handleNextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };
    const handleSelectChange = (event) => {
        setdataCount(event.target.value);
        // setTableStatus(searchResults);
    };
    const [searchBox, setsearchBox] = useState('');
    const handleInputChange = (event) => {
        setsearchBox(event.target.value);
        // setTableStatus(searchResults);
    };
    function searchByName(query) {
        if (data['data']) {
            let restData = data['data'].filter(item => item.vehicle_number.toLowerCase().includes(query.toLowerCase())
                || item.vehicle_owner.toLowerCase().includes(query.toLowerCase()));

            return restData
        }
    }

    let searchResults = searchByName(searchBox);
    let total_page = 1;
    let totalPages = 1;

    if (searchResults) {
        total_page = parseFloat(searchResults.length) / parseFloat(dataCount)
        totalPages = Math.ceil(total_page);

        // Calculate index range for the current page
        const startIndex = (currentPage - 1) * dataCount;
        const endIndex = Math.min(startIndex + dataCount, searchResults.length);
        // Get current page data
        const currentPageData = searchResults.slice(startIndex, endIndex);
        dbg(currentPageData,searchResults);
        searchResults = currentPageData
        let page_assign = 1
        let data_arry = { 'page': '' }
        let data_count = 0
        let temp_data = []
        for (let d = 0; d < searchResults.length; d++) {
            if (data_count == parseInt(dataCount)) {
                page_assign += 1
            }

            data_count += 1;
            total['nominal'] += searchResults[d]['total']
            // dbg(data_count)       
        }

    }
    dbg(total_page)



    return (
        <div className="col">
            <div className="row mb-2 d-flex justify-content-end">
                <div className="col-md-10 mb-1 d-flex justify-content-start" >
                    <select style={{ maxWidth: '90px' }} className="form-control form-control-sm " onChange={handleSelectChange}>
                        <option defaultValue value={10}> 10</option>
                        <option value={10}>10</option>
                        <option value={10}>30</option>

                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={300}>300</option>

                        <option value={500}>500</option>

                        <option value={1000}>1000</option>

                    
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
            {searchResults && searchResults.length > 0 && (
                <div>
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
                                        <td colSpan={total['colspan']} className="text-center">{total['text1']}</td>
                                        <td className="text-left">{CurrencyFormatter(total['nominal'])}</td>

                                    </tr>
                                </tbody>
                            )}

                        </table>
                    </div>
                    <div className="pag d-flex justify-content-end">
                        <nav aria-label="...">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`} onClick={handlePreviousPage}>
                                    <span className="page-link">Previous</span>
                                </li>
                                <li className="page-item">
                                    <a className="page-link" href="#">
                                        <span>{currentPage} / {totalPages}</span>
                                    </a>
                                </li>

                                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`} onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    <a className={`page-link`} href="#">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
            {(searchResults && searchResults.length === 0) && (
                <Alr name='Data Not Found' />

            )}
        </div>

    );
};

export default CustomTable;
