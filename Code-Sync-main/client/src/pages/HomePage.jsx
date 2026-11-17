import illustration from "@/assets/illustration.svg"
import FormComponent from "@/components/forms/FormComponent"
// import Footer from "@/components/common/Footer";
function HomePage() {
    return (
        <main className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(ellipse_at_18%_40%,rgba(183,255,60,0.08),transparent_38%)] px-5 sm:px-8">
            <header className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-white/10 py-5">
                <span className="text-sm font-bold tracking-[0.2em] text-white">
                    CODE <span className="text-primary">SYNC</span>
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                    REAL-TIME WORKSPACE
                </span>
            </header>
            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-8 py-12 md:flex-row md:gap-16">
                <section className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
                    <p className="mb-4 text-xs font-bold tracking-[0.22em] text-primary">
                        CODE TOGETHER
                    </p>
                    <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Your team&apos;s next idea starts here.
                    </h1>
                    <p className="mt-5 max-w-lg text-base leading-7 text-gray-400">
                        Create a room or join your team in a shared, real-time
                        coding workspace.
                    </p>
                    <div className="mt-8 hidden w-full justify-center md:flex">
                        <img
                            src={illustration}
                            alt="Code Sync Illustration"
                            className="w-[min(100%,380px)] animate-up-down"
                        />
                    </div>
                </section>
                <div className="w-full max-w-[500px] rounded-2xl border border-white/10 bg-[#121615] shadow-[0_24px_80px_rgba(0,0,0,0.4),0_0_40px_rgba(183,255,60,0.04)] md:w-1/2">
                    <FormComponent />
                </div>
            </div>
        </main>
    )
}
export default HomePage
