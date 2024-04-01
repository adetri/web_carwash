"use client"
import ContentTittle from "@/components/content_tittle.jsx";
import { getJwtCookie,dgb,setCookie,getCookie } from "@/utils/method";
import React, { useState } from 'react';

export default function Login() {
// dgb(getCookie('athstatus'));  
  return (  
      <div>
        <ContentTittle name='Dashboard'/>
      <p>this Dashboard content</p>
    </div>
    );
  }
  