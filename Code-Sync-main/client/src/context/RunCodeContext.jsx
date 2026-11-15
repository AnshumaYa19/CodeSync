import axiosInstance from "@/api/pistonApi"
import axios from "axios"
import langMap from "lang-map"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useFileSystem } from "./FileContext"
const RunCodeContext = createContext(null)
export const useRunCode = () => {
    const context = useContext(RunCodeContext)
    if (context === null) {
        throw new Error(
            "useRunCode must be used within a RunCodeContextProvider",
        )
    }
    return context
}
const RunCodeContextProvider = ({ children }) => {
    const { activeFile } = useFileSystem()
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [isRunning, setIsRunning] = useState(false)
    const [supportedLanguages, setSupportedLanguages] = useState([])
    const [runtimeStatus, setRuntimeStatus] = useState("loading")
    const [runtimeError, setRuntimeError] = useState("")
    const [runtimeRequest, setRuntimeRequest] = useState(0)
    const [selectedLanguage, setSelectedLanguage] = useState({
        language: "",
        version: "",
        aliases: [],
    })
    useEffect(() => {
        let isMounted = true
        const fetchSupportedLanguages = async () => {
            setRuntimeStatus("loading")
            setRuntimeError("")
            try {
                const response = await axiosInstance.get("/runtimes")
                const data = response.data
                const languages = Array.isArray(data)
                    ? data
                    : Array.isArray(data?.runtimes)
                      ? data.runtimes
                      : Array.isArray(data?.data)
                        ? data.data
                        : null
                if (!languages || languages.length === 0) {
                    throw new Error(
                        "Piston returned no supported languages. Check the configured Piston API.",
                    )
                }
                if (!isMounted) return
                setSupportedLanguages(languages)
                setRuntimeStatus("ready")
            } catch (error) {
                console.error("Failed to fetch runtimes:", error)
                if (!isMounted) return
                setSupportedLanguages([])
                setRuntimeStatus("error")
                setRuntimeError(
                    axios.isAxiosError(error) &&
                        error.response?.status === 401
                        ? "Piston authorization failed. Verify PISTON_API_KEY in the server environment."
                        : axios.isAxiosError(error) && !error.response
                          ? "Could not connect to the backend. Check VITE_BACKEND_URL and retry."
                          : error.response?.data?.message ||
                                error.message ||
                                "Could not load languages from Piston. Check the service and retry.",
                )
            }
        }
        fetchSupportedLanguages()
        return () => {
            isMounted = false
        }
    }, [runtimeRequest])
    // Set the selected language based on the file extension
    useEffect(() => {
        if (supportedLanguages.length === 0 || !activeFile?.name) return
        const extension = activeFile.name.split(".").pop()
        if (extension) {
            const languageName = langMap.languages(extension)
            const language = supportedLanguages.find(
                (lang) =>
                    lang.aliases.includes(extension) ||
                    languageName.includes(lang.language.toLowerCase()),
            )
            if (language) setSelectedLanguage(language)
        } else setSelectedLanguage({ language: "", version: "", aliases: [] })
    }, [activeFile?.name, supportedLanguages])
    const runCode = async () => {
        if (runtimeStatus !== "ready") {
            return toast.error(
                "Connect to Piston and load supported languages before running code",
            )
        } else if (!selectedLanguage.language) {
            return toast.error("Please select a language to run the code")
        } else if (!activeFile) {
            return toast.error("Please open a file to run the code")
        }
        const toastId = toast.loading("Running code...")
        setIsRunning(true)
        try {
            const { language, version } = selectedLanguage
            const response = await axiosInstance.post("/execute", {
                language,
                version,
                files: [{ name: activeFile.name, content: activeFile.content }],
                stdin: input,
            })
            if (response.data.run.stderr) {
                setOutput(response.data.run.stderr)
            } else {
                setOutput(response.data.run.stdout)
            }
        } catch (error) {
            console.error("Failed to run code:", error)
            if (
                axios.isAxiosError(error) &&
                error.response?.status === 401
            ) {
                toast.error(
                    "Piston authorization failed. Verify PISTON_API_KEY in the server environment.",
                )
            } else if (axios.isAxiosError(error) && !error.response) {
                toast.error(
                    "Could not connect to the backend. Check VITE_BACKEND_URL.",
                )
            } else {
                toast.error(
                    error.response?.data?.message || "Failed to run the code",
                )
            }
        } finally {
            setIsRunning(false)
            toast.dismiss(toastId)
        }
    }
    return (
        <RunCodeContext.Provider
            value={{
                setInput,
                output,
                isRunning,
                supportedLanguages,
                runtimeStatus,
                runtimeError,
                retryRuntimes: () => setRuntimeRequest((request) => request + 1),
                selectedLanguage,
                setSelectedLanguage,
                runCode,
            }}
        >
            {children}
        </RunCodeContext.Provider>
    )
}
export { RunCodeContextProvider }
export default RunCodeContext
