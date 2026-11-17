import axios from "axios"
import { createContext, useContext, useState } from "react"
import toast from "react-hot-toast"
import axiosInstance from "../api/pollinationsApi"
const CopilotContext = createContext(null)
export const useCopilot = () => {
    const context = useContext(CopilotContext)
    if (context === null) {
        throw new Error(
            "useCopilot must be used within a CopilotContextProvider",
        )
    }
    return context
}
const CopilotContextProvider = ({ children }) => {
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [isRunning, setIsRunning] = useState(false)
    const generateCode = async () => {
        if (input.trim().length === 0) {
            toast.error("Please write a prompt")
            return
        }
        const toastId = toast.loading("Generating code...")
        setIsRunning(true)
        try {
            const response = await axiosInstance.post("/generate", {
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a code generator copilot for project named Code Sync. Generate code based on the given prompt without any explanation. Return only the code, formatted in Markdown using the appropriate language syntax (e.g., js for JavaScript, py for Python). Do not include any additional text or explanations. If you don't know the answer, respond with 'I don't know'.",
                    },
                    {
                        role: "user",
                        content: input,
                    },
                ],
            })
            const code = response.data.choices?.[0]?.message?.content
            if (typeof code !== "string" || code.length === 0) {
                throw new Error("Pollinations returned no generated code")
            }
            setOutput(code)
            toast.success("Code generated successfully")
        } catch (error) {
            console.error("Failed to generate code:", error)
            if (axios.isAxiosError(error) && error.response?.status === 403) {
                toast.error(
                    "Pollinations denied the request. Check model access and service permissions.",
                )
            } else {
                toast.error("Failed to generate the code")
            }
        } finally {
            setIsRunning(false)
            toast.dismiss(toastId)
        }
    }
    return (
        <CopilotContext.Provider
            value={{
                setInput,
                output,
                isRunning,
                generateCode,
            }}
        >
            {children}
        </CopilotContext.Provider>
    )
}
export { CopilotContextProvider }
export default CopilotContext
