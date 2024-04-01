import { makeRequest } from '@/utils/api.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request
    const formData = req.body;
    // Process the form data as needed
    console.log('Received form data:', formData);

    try {
      const request_login = await makeRequest('ath/login', 'POST', formData, true);
      if (request_login['status'] == 200) {
        return res.status(200).json({ 'access': request_login['data']['access'] });
      }
      return res.status(401).json({ msg: 'Login Failed insert Corret User' })
      

      // console.log(request_login);
    } catch (error) {
      return res.status(500).json({ msg: 'error' })
      
      // console.log('error while processing login', error);
    }

  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
