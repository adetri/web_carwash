import { makeRequest } from '@/utils/api.js';
import { dbg } from '@/utils/method';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle POST request
    const formData = req.body;
      // Debugging: Print the request headers
    // Process the form data as needed
    // console.log("asdasdmasmdasmdoaskdomdsakomko")

    console.log('Received form data:', formData);

    try {
        const request = await makeRequest('pegawai/try-auth','GET',null,true,req.headers['authorization']);
        if(request.status == 200){
            return res.status(200).json({msg: 'Still auth' });

        }else{
            return res.status(401).json({msg :'user not auth'})
        }
    } catch(error){
        console.log('error while processing login', error);
    }
  } else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
}
