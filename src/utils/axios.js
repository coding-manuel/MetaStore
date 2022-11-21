import axiosClass  from "axios";

export const axiosInst = axiosClass.create({
    baseURL: import.meta.env.VITE_API_ADDRESS,
    headers: {
        Accept: "application/json",
    },
});