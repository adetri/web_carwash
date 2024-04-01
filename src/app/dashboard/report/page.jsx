"use client"
import ContentTittle from "@/components/content_tittle.jsx";
import { getJwtCookie,dgb,setCookie,getCookie } from "@/utils/method";
import React, { useState } from 'react';

export default function report() {
// dgb(getCookie('athstatus'));  
  return (  
      <div>
        <ContentTittle name='Report'/>
      <p>this Dashboard content</p>
    </div>
    );
  }
  