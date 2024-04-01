import jwt from 'jsonwebtoken';

// utils/cookie.js

import Cookies from 'js-cookie';

export function deleteAllCookies() {
  const cookies = Cookies.getJSON();
  for (const cookie in cookies) {
    Cookies.remove(cookie);
  }
}

export function dbg(text=null,text2=null){
    console.log(text,text2)
}

// Storing the JWT token in a cookie
export function setJwtCookie(token) {
    // Set the cookie with the JWT token
    document.cookie = `jwt=${token}; path=/`;
    // console.log("token store");
    // console.log(token);

}

// Storing the JWT token in a cookie
export function setCookie(key,value) {
    // Set the cookie with the JWT token
    document.cookie = `${key}=${value}; path=/`;
    // console.log("token store");
    // console.log(token);

}

export function getCookie(key) {
    // Get all cookies
    const cookies = document.cookie.split(';');
    // Find the cookie that starts with the provided key
    const jwtCookie = cookies.find(cookie => cookie.trim().startsWith(`${key}=`));
    // If JWT cookie exists, extract and return the token
    if (jwtCookie) {
        return jwtCookie.split('=')[1];
    } else {
        return null; // JWT cookie not found
    }
}



export function deleteJwtCookie() {
    // Construct a string to set the cookie's expiration date to a time in the past
    const deletionString = `jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  
    // Set the cookie with the deletion string, effectively deleting it
    document.cookie = deletionString;
  }
  



// Retrieving the JWT token from the cookie
export function getJwtCookie() {
    // Get all cookies
    const cookies = document.cookie.split(';');
    // Find the cookie that starts with "jwt"
    const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));
    // If JWT cookie exists, extract and return the token
    if (jwtCookie) {
        return jwtCookie.split('=')[1];
    } else {
        return null; // JWT cookie not found
    }
}

export function dgb(text1=null,text2=null) {
    const dbg =  process.env.NEXT_PUBLIC_DEBUG === 'true';
    if (dbg == true) {
        console.log(text1,text2);
        
    }

    
}



export function getUserFromJwt(token) {
    try {
        const decodedToken = jwt.decode(token);
        return decodedToken;
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return null;
      }
}


export function removeBearer(token = null){
    if(token != null){
          token = token.replace(/^Bearer\s/, '');
          
    }
    return token;
}
    

