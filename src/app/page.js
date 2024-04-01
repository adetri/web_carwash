"use client"


import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2'
// import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { makeRequest, test_fun } from '@/utils/api.js';
import { setJwtCookie, getCookie, getJwtCookie, deleteJwtCookie, dgb } from '@/utils/method';

import appath from './appath'




export default function Home() {

  const router = useRouter();



  useEffect(() => {
    const checkStatus = async () => {
      if (getCookie('athstatus') === '200') {
        router.push('/dashboard');
      }
    };
    checkStatus();
  }, []); 
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const request = await makeRequest('api/loginhandler', 'POST', formData, false);
    if (request.status == 200) {
      setJwtCookie(request['data']['access']);
      Swal.fire({
        title: 'Login successful !',
        // text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      router.push('/dashboard');
    }else{
      Swal.fire({
        title: 'Login Failed !',
        // text: 'Do you want to continue',
        icon: 'warning',
        confirmButtonText: 'OK'
      })

    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // var auth_req = await makeRequest('/api/loginhandler.js', 'POST', formData);
  //   // console.log(auth_req);



  //   try {
  //     // Call the handleSubmit function with the form data
  //     const response = await handleSubmit(formData);
  //     console.log('Form submission response:', response);
  //     // Optionally, handle response data or show success message
  // } catch (error) {
  //     console.error('Error submitting form:', error);
  //     // Optionally, handle errors or show error message
  // }

  // try {
  //   const host=process.env.HST;
  //   alert(host);
  //   const response = await fetch(host, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   if (response.status == 200) {
  //     // Request was successful
  //     const data = await response.json(); // Parse response body as JSON
  //     // console.log('Login successful:', data.access); // Access the response data
  //     setJwtCookie(data.access);
  //     Swal.fire({
  //       title: 'Login successful !',
  //       // text: 'Do you want to continue',
  //       icon: 'success',
  //       confirmButtonText: 'OK'
  //     })
  //     router.push('/dashboard');

  //   } else {
  //     // Request failed
  //     console.error('Login failed');
  //     Swal.fire({
  //       title: 'Login failed !',
  //       // text: 'Do you want to continue',
  //       icon: 'warning',
  //       confirmButtonText: 'OK'
  //     })


  //   }
  // } catch (error) {
  //   console.error('Error:', error);
  //   Swal.fire({
  //     title: 'Error!',
  //     text: error,
  //     icon: 'error',
  //     confirmButtonText: 'OK'
  //   });
  // }

  // Reset the form after submission
  // setFormData({ username: '', password: '' });
  // };

  return (
    <>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="description" content="" />
      <meta name="author" content="" />
      <title>Login</title>
      {/* Custom fonts for this template*/}
      <link
        href="vendor/fontawesome-free/css/all.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet"
      />
      {/* Custom styles for this template*/}
      <link href="css/sb-admin-2.min.css" rel="stylesheet" />
      <div className="container">
        {/* Outer Row */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* Nested Row within Card Body */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image" />
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Username..."
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button className="btn btn-primary btn-user btn-block" type="submit">Login</button>
                        <hr />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
}