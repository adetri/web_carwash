import { makeRequest } from '@/utils/api.js';
import { dbg,removeBearer ,getUserFromJwt} from '@/utils/method';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body;
    const tkn = removeBearer(req.headers['authorization']);
    const usr_id = getUserFromJwt(tkn)['user_id'];

    dbg('server side getusr:',formData);
    try {
        const request = await makeRequest(`pegawai/get-user/${usr_id}`,'GET',null,true,req.headers['authorization']);
        if(request.status == 200){
            return res.status(200).json({ 'user': request['data']['user']['karyawan']['name'] });
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
