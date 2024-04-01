// utils/api.js


export async function makeRequest(url=null, method = 'GET', body = null, is_backend= false,token=null) {
    
    const data = {};
    const req_url = (is_backend == true ? process.env.HST + url : url );
    console.log('this host',req_url);
    if (token != null){
      token = token.replace(/^Bearer\s/, '');
    }
    const tkn = `Bearer ${token}`;
   
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : tkn
        },
        body: body ? JSON.stringify(body) : null,
      };
  
      const response = await fetch(req_url, options);
  
      if (!response.ok ) {
        console.log(response.status);
      }

      data['status'] = response.status;
      data['data'] = await response.json();
      return data;
    } catch (error) {
      console.error('Error making request:', error);
      throw error;
    }
  }

  



  