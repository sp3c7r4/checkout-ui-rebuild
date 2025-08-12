import env from '@/config/env';
import axios from 'axios';


export async function uploadToS3(image: string) {
  const r = await axios({
    method: "POST",
    url: `${env.VITE_SERVER_ORIGIN}/user/image-base64`,
    data: { image }
  })
  console.log(r.data.data)
  return r.data.data
}

export async function validateEmail(email: string) {
  const r = await axios({
    method: "POST",
    url: `${env.VITE_SERVER_ORIGIN}/validate/email`,
    data: { email }
  })
  console.log(r.data.data)
  return r.data.data
}