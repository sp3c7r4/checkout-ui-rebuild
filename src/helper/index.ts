import env from '@/config/env';
import axios, { AxiosError } from 'axios';


export async function uploadToS3(image: string) {
  const r = await axios({
    method: "POST",
    url: `${env.VITE_SERVER_ORIGIN}/user/image-base64`,
    data: { image }
  })
  console.log(r.data.data)
  return r.data.data
}

export async function validateEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const r = await axios({
      method: "POST",
      url: `${env.VITE_SERVER_ORIGIN}/validate/email`,
      data: { email }
    })
    console.log(r.data.data)
    return { success: true };
  } catch(e: unknown) {
    const error = e as AxiosError | any;
    console.error(error.response?.data || error.message);
    const errorMessage = error.response.data.message || "Failed to validate email. Please try again.";
    console.log("Testing: ",error.response.data.message)
    return { success: false, error: errorMessage };
  }
}