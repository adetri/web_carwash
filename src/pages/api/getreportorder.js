import { makeRequest } from '@/utils/api.js';
import { dbg } from '@/utils/method';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const formData = req.body;
    dbg('Received form order data:', formData)

    try {
        const request = await makeRequest('order/order-report','POST',formData,true,req.headers['authorization']);
        if(request.status == 200){
            return res.status(200).json({data: request.data });
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
