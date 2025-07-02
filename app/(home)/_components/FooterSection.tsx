import Link from "next/link";
import { StarsBackground } from "@/components/ui/stars-background";

// Constants
const CURRENT_YEAR = new Date().getFullYear();
const DESIGNER_NAME = "Shahad Hassan";

export default function FooterSection(): JSX.Element {
    return (
        <footer className="w-full bg-gradient-to-t from-neutral-900/90 via-neutral-950/90 to-black/90 border-t border-neutral-800 mt-10 shadow-[0_-4px_24px_0_rgba(0,0,0,0.25)] backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-center lg:text-left text-sm text-neutral-400">
                    <span>&copy; {CURRENT_YEAR} All Rights Reserved.</span>
                </div>
                <div className="text-center z-20 lg:text-right text-sm text-neutral-400 flex items-center gap-2">
                    <span className="inline-block text-lg">✨</span>
                    <span>Designed by </span>
                    <Link
                        href="/"
                        className="bg-gradient-to-r from-[#FACC15] to-[#FB923C] bg-clip-text text-transparent hover:underline underline-offset-2 transition font-semibold drop-shadow-sm"
                    >
                        {DESIGNER_NAME}
                    </Link>
                </div>
            </div>
            <StarsBackground/>
        </footer>
    )
}