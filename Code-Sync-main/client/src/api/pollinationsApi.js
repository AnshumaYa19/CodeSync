import axios from "axios"

const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const instance = axios.create({
    baseURL: `${backendUrl.replace(/\/+$/, "")}/api/copilot`,
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance