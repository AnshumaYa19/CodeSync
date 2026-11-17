import { useFileSystem } from "@/context/FileContext"
import { getIconClassName } from "@/utils/getIconClassName"
import { Icon } from "@iconify/react"
import { IoClose } from "react-icons/io5"
import cn from "classnames"
import { useEffect, useRef } from "react"
import customMapping from "@/utils/customMapping"
import { useSettings } from "@/context/SettingContext"
import langMap from "lang-map"
function FileTab() {
    const {
        openFiles,
        closeFile,
        activeFile,
        updateFileContent,
        setActiveFile,
    } = useFileSystem()
    const fileTabRef = useRef(null)
    const { setLanguage } = useSettings()
    const changeActiveFile = (fileId) => {
        // If the file is already active, do nothing
        if (activeFile?.id === fileId) return
        updateFileContent(activeFile?.id || "", activeFile?.content || "")
        const file = openFiles.find((file) => file.id === fileId)
        if (file) {
            setActiveFile(file)
        }
    }
    useEffect(() => {
        const fileTabNode = fileTabRef.current
        if (!fileTabNode) return
        const handleWheel = (e) => {
            if (e.deltaY > 0) {
                fileTabNode.scrollLeft += 100
            } else {
                fileTabNode.scrollLeft -= 100
            }
        }
        fileTabNode.addEventListener("wheel", handleWheel)
        return () => {
            fileTabNode.removeEventListener("wheel", handleWheel)
        }
    }, [])
    // Update the editor language when a file is opened
    useEffect(() => {
        if (activeFile?.name === undefined) return
        // Get file extension on file open and set language when file is opened
        const extension = activeFile.name.split(".").pop()
        if (!extension) return
        // Check if custom mapping exists
        if (customMapping[extension]) {
            setLanguage(customMapping[extension])
            return
        }
        const language = langMap.languages(extension)
        setLanguage(language[0])
    }, [activeFile?.name, setLanguage])
    return (
        <div
            className="flex h-[50px] w-full select-none gap-2 overflow-x-auto p-2 pb-0"
            ref={fileTabRef}
        >
            {openFiles.map((file) => (
                <div
                    key={file.id}
                    className={cn(
                        "flex w-fit shrink-0 items-center rounded-t-md border border-b-0 px-1 py-1 text-sm",
                        file.id === activeFile?.id
                            ? "border-[#303832] bg-darkHover shadow-[inset_0_2px_0_#b7ff3c]"
                            : "border-transparent hover:bg-[#141817]",
                    )}
                >
                    <button
                        className={cn(
                            "flex min-w-0 items-center gap-1 px-1 text-left",
                            file.id === activeFile?.id
                                ? "text-white"
                                : "text-gray-400 hover:text-gray-200",
                        )}
                        onClick={() => changeActiveFile(file.id)}
                        type="button"
                        aria-pressed={file.id === activeFile?.id}
                    >
                        <Icon
                            icon={getIconClassName(file.name)}
                            fontSize={22}
                            className="min-w-fit"
                        />
                        <span className="max-w-40 truncate" title={file.name}>
                            {file.name}
                        </span>
                    </button>
                    <button
                        className="rounded-md p-0.5 text-gray-500 hover:bg-danger/15 hover:text-danger"
                        type="button"
                        title={`Close ${file.name}`}
                        aria-label={`Close ${file.name}`}
                        onClick={() => closeFile(file.id)}
                    >
                        <IoClose size={18} />
                    </button>
                </div>
            ))}
        </div>
    )
}
export default FileTab
