import React from "react";
import * as CryptoJS from "crypto-js";
import axios from "axios";
import { burbur } from "../utils/backblazeClient";
import { useRef } from "react";
export default function Test() {
  let data = null;
  const imgt = useRef(null);

  const getUploadDetails = async () => {
    axios({
      method: "get",
      url: "http://localhost:8080/uploadurl",
    }).then(function (res) {
      data = res.data;
    });
  };

  const uploadFile = async () => {
    const file = imgt.current.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const hash = CryptoJS.SHA1(CryptoJS.enc.Latin1.parse(reader.result));
      // Data hashed. Now perform upload.

      axios({
        method: "post",
        url: data.uploadUrl,
        headers: {
          "Content-Type": "image/png",
          Authorization: data.authorizationToken,
          "X-Bz-File-Name": `chicken/${file.name}`,
          "X-Bz-Content-Sha1": hash,
        },
        data: imgt.current.files[0],
      });
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <input ref={imgt} type="file" name="" id="" />
      <button onClick={getUploadDetails}>Get Signed Url</button>
      <button onClick={uploadFile}>Upload File</button>
    </>
  );
}
