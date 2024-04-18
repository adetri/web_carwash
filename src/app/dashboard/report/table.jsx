"use client"

import React, { useState, useEffect, forwardRef } from 'react';
import { getJwtCookie, loading, loadingDone, dbg, getStringDate, CurrencyFormatter, toRegularDate } from "@/utils/method";
import { makeRequest } from '@/utils/api.js';
import DatePicker from "react-datepicker";
import Alr from "@/components/notif"


import "react-datepicker/dist/react-datepicker.css";
const TableReport = (data = null) => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const headTable = ['owner name', 'Plat num', 'Date', 'washer', 'services list', 'service price']
    const total = {
        "colspan": headTable.length,
        "text1": "Total",
    }
    const [dataOrder, setdataOrder] = useState(null);
    const [searchVal, setSeachVal] = useState("");
    const [itemCountVal, setItemCountVal] = useState(10)
    const [startAt, setStartAt] = useState(1)


    let page = 1

    // const [totalRevenue, setTotalRevenue] = useState(0);
    let total_page = 0
    const getSerachVal = (e) => {
        setSeachVal(e.target.value)
    }
    const getItemCount = (e) => {
        setItemCountVal(e.target.value)
    }
    const SearchHandler = async (page) => {
        loading()
        dbg(page)
        const jwt = getJwtCookie();
        const data = { 'start_date': toRegularDate(startDate), 'end_date': toRegularDate(endDate), 'item_count': itemCountVal, 'page': page, 'search_content': searchVal }
        const getReporOrder = async () => {
            const request = await makeRequest('/api/getreportorder', 'POST', data, false, jwt);
            // dbg(`status report is : ${request.status}`)
            dbg('data report is ', request.data)
            setdataOrder(request.data['data'])
        }
        await getReporOrder();
        loadingDone()
    }

    useEffect(() => {
        const fetchData = async () => {
            await SearchHandler(1);
        };
        fetchData();

    }, []
    )

    const btnSearchEvent = () => {
        page = 1
        setStartAt((page - 1) * itemCountVal + 1)

        SearchHandler(page);
    }


    let nextPageHandler = async () => {
        if (dataOrder['pag']['page_num'] < dataOrder['pag']['total_page']) {
            let next_page_is = dataOrder['pag']['page_num'] + 1
            page = next_page_is
            await SearchHandler(page);
            dbg("execet complite")
            setStartAt((page - 1) * itemCountVal + 1)

        }
    }

    const prevPageHandler = () => {
        if (parseInt(dataOrder['pag']['page_num']) > 1) {

            let prev_page_is = dataOrder['pag']['page_num'] - 1
            page = prev_page_is
            SearchHandler(page);
            setStartAt((page - 1) * itemCountVal + 1)



        }

    }

    if (dataOrder != null) {
        // const [startAt, setStartAt] = useState(1)
        for (let i = 0; i < dataOrder['data'].length; i++) {
            total_page += dataOrder['data'][i]['total']
        }
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="btn mr-1 btn-secondary btn-sm" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    const ExampleCustomInput2 = forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-secondary btn-sm" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));




    return (
        <div className="col">
            <div className="row mb-2 d-flex justify-content-end">
                <div className="col-md-6 mb-1 d-flex justify-content-start" >
                    <select style={{ maxWidth: '90px' }} className="form-control form-control-sm" onChange={getItemCount}>
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
                <div className="col-md-3 mb-1 d-flex justify-content-end">

                    <DatePicker
                        customInput={<ExampleCustomInput />}
                        selected={startDate}
                        maxDate={endDate}

                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd" // Date and time format
                    />
                    <DatePicker
                        customInput={<ExampleCustomInput2 />}
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd" // Date and time format
                    />
                </div>
                <div className="input-group input-group-sm mb-1 col-md-2">
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={getSerachVal}
                    />
                </div>
                <div className="col-md-1">
                    <button type="button" className="btn btn-primary btn-sm" onClick={btnSearchEvent}>
                        Search
                    </button>
                </div>
            </div>
            <div className="table">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '15px' }}>#</th>
                            {headTable.map((item, index) => (

                                <th scope="col" key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    {dataOrder && dataOrder['data'] && (
                        <tbody>
                            {dataOrder['data'].map((body, i) => (
                                <tr key={body.id} style={{ background: body['is_cancle'] == true  ? '#973333' : body['order_status'] == false ?'#f3ff42e6' : ''   }} className=''>
                                    <td>{startAt + i}</td>
                                    <td>{body['vehicle_owner']} {body['is_cancle']}</td>
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
                                <td className="text-left">{CurrencyFormatter(total_page)}</td>

                            </tr>
                        </tbody>
                    )}

                </table>
            </div>
            {dataOrder && dataOrder['data'] && (
                <div className="pag d-flex justify-content-between">
                <p>Total Data : {dataOrder['pag']['total_item']}</p>
                    <nav aria-label="..." >
                        <ul className="pagination">
                            <li onClick={prevPageHandler} className={`page-item ${dataOrder['pag']['page_num'] === 1 ? "disabled" : ""}`} >
                                <span className="page-link">Previous</span>
                            </li>
                            <li className="page-item">
                                <a className="page-link">
                                    <span>{dataOrder['pag']['page_num']} / {dataOrder['pag']['total_page']}</span>
                                </a>
                            </li>

                            <li onClick={nextPageHandler} className={`page-item ${dataOrder['pag']['page_num'] === dataOrder['pag']['total_page'] ? "disabled" : ""}`}>
                                <a className={`page-link`}>
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
            {dataOrder && dataOrder['data'].length === 0 && (
                <Alr name='Data Not Found' />
            )}
        </div>
    )
}

export default TableReport;

