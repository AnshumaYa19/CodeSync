import { useNavigate } from "react-router-dom"
function ConnectionStatusPage() {
    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-6 bg-[radial-gradient(ellipse_at_center,rgba(183,255,60,0.07),transparent_50%)] px-4 text-center">
            <ConnectionError />
        </div>
    )
}
const ConnectionError = () => {
    const navigate = useNavigate()
    const reloadPage = () => {
        window.location.reload()
    }
    const gotoHomePage = () => {
        navigate("/")
    }
    return (
        <>
            <span className="whitespace-break-spaces text-lg font-medium text-gray-300">
                Oops! Something went wrong. Please try again
            </span>
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    className="mr-4 rounded-md bg-primary px-8 py-2 font-bold text-black hover:bg-[#c7ff67]"
                    onClick={reloadPage}
                >
                    Try Again
                </button>
                <button
                    className="rounded-md border border-[#303832] bg-darkHover px-8 py-2 font-bold text-white hover:border-primary/40 hover:text-primary"
                    onClick={gotoHomePage}
                >
                    Go to HomePage
                </button>
            </div>
        </>
    )
}
export default ConnectionStatusPage
