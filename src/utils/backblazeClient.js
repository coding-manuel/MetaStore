import B2 from "backblaze-b2"
import {Buffer} from 'buffer';
Buffer.from('anything','base64');
window.Buffer = window.Buffer || Buffer;

const b2 = new B2({
  applicationKeyId: import.meta.env.VITE_BACKBLAZE_KEY_ID, // or accountId: 'accountId'
  applicationKey: import.meta.env.VITE_BACKBLAZE_APPLICATION_KEY // or masterApplicationKey
});

export async function burbur() {
  try {
    await b2.authorize(); // must authorize first (authorization lasts 24 hrs)
    let response = await b2.getBucket({ bucketName: 'metastore-products-images' });
    console.log(response.data);
  } catch (err) {
    console.log('Error getting bucket:', err);
  }
}

