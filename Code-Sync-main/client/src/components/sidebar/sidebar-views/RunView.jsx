import { useRunCode } from "@/context/RunCodeContext"
import useResponsive from "@/hooks/useResponsive"
import toast from "react-hot-toast"
import { LuCopy } from "react-icons/lu"
import { PiCaretDownBold } from "react-icons/pi"
function RunView() {
    const { viewHeight } = useResponsive()
    const {
        setInput,
        output,
        isRunning,
        supportedLanguages,
        runtimeStatus,
        runtimeError,
        retryRuntimes,
        selectedLanguage,
        setSelectedLanguage,
        runCode,
    } = useRunCode()
    const handleLanguageChange = (e) => {
        const lang = JSON.parse(e.target.value)
        setSelectedLanguage(lang)
    }
    const copyOutput = () => {
        navigator.clipboard.writeText(output)
        toast.success("Output copied to clipboard")
    }
    return (
        <div
            className="flex flex-col items-center gap-2 p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Run Code</h1>
            <div className="flex h-[90%] w-full flex-col items-end gap-2 md:h-[92%]">
                <div className="relative w-full">
                    <select
                        className="w-full rounded-md border border-[#303832] bg-darkHover px-4 py-2 text-white outline-none focus-visible:border-primary"
                        value={JSON.stringify(selectedLanguage)}
                        onChange={handleLanguageChange}
                        disabled={runtimeStatus !== "ready"}
                    >
                        {supportedLanguages
                            .slice()
                            .sort((a, b) => (a.language > b.language ? 1 : -1))
                            .map((lang, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={JSON.stringify(lang)}
                                    >
                                        {lang.language +
                                            (lang.version
                                                ? ` (${lang.version})`
                                                : "")}
                                    </option>
                                )
                            })}
                    </select>
                    <PiCaretDownBold
                        size={16}
                        className="absolute bottom-3 right-4 z-10 text-white"
                    />
                </div>
                {runtimeStatus === "loading" && (
                    <p role="status" className="w-full text-sm text-gray-300">
                        Loading languages from Piston...
                    </p>
                )}
                {runtimeStatus === "error" && (
                    <div
                        role="alert"
                        className="w-full rounded-md border border-danger/20 bg-[#211719] p-3 text-sm text-white"
                    >
                        <p>{runtimeError}</p>
                        <button
                            className="mt-2 rounded bg-primary px-3 py-1 font-bold text-black hover:bg-[#c7ff67]"
                            onClick={retryRuntimes}
                        >
                            Retry connection
                        </button>
                    </div>
                )}
                <textarea
                    className="min-h-[120px] w-full resize-none rounded-md border border-[#303832] bg-darkHover p-2 text-white placeholder:text-gray-500 outline-none focus-visible:border-primary"
                    placeholder="Write you input here..."
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    className="flex w-full justify-center rounded-md bg-primary p-2 font-bold text-black shadow-[0_0_16px_rgba(183,255,60,0.12)] outline-none hover:bg-[#c7ff67] hover:shadow-[0_0_22px_rgba(183,255,60,0.24)] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={runCode}
                    disabled={isRunning || runtimeStatus !== "ready"}
                >
                    Run
                </button>
                <label className="flex w-full justify-between text-sm font-semibold text-gray-300">
                    Output
                    <button onClick={copyOutput} title="Copy Output">
                        <LuCopy
                            size={18}
                            className="cursor-pointer text-white"
                        />
                    </button>
                </label>
                <div className="w-full flex-grow resize-none overflow-y-auto rounded-md border border-[#303832] bg-[#111413] p-2 font-mono text-sm text-gray-200 outline-none">
                    <code>
                        <pre className="text-wrap">{output}</pre>
                    </code>
                </div>
            </div>
        </div>
    )
}
export default RunView
