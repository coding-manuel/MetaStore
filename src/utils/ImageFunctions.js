import axios from "axios";
import * as CryptoJS from "crypto-js";
import { axiosInst } from "./axios";

export const getUploadDetails = async () => {
  let res = await axiosInst.get('/uploadurl');
  return res.data;
};

export const deleteFile = async (key) => {
  axiosInst.post('/deletefile', {
    fileName: key,
  });
};

export const uploadFile = async (file, product_id, path, data) => {
  const reader = new FileReader();
  reader.onload = function () {
    const hash = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(reader.result));
    // Data hashed. Now perform upload.

    // console.log(`${product_id}/product-img${index}`);

    axios({
      method: "post",
      url: data.uploadUrl,
      headers: {
        "Content-Type": "image/png",
        Authorization: data.authorizationToken,
        "X-Bz-File-Name": path,
        "X-Bz-Content-Sha1": hash,
      },
      data: file,
    });
  };
  reader.readAsBinaryString(file);
};
