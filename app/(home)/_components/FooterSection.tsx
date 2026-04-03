import Link from "next/link";
import { StarsBackground } from "@/components/ui/stars-background";

const CURRENT_YEAR = new Date().getFullYear();
const DESIGNER_NAME = "Shahad Hassan";

export default function FooterSection(): JSX.Element {
    return (
        <footer className="w-full bg-gradient-to-t from-[#0a0a1a]/95 via-[#030014]/95 to-transparent border-t border-white/[0.06] mt-10 backdrop-blur-md relative">
            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-center lg:text-left text-sm text-neutral-500">
                    <span>&copy; {CURRENT_YEAR} All Rights Reserved.</span>
                </div>
                <div className="text-center z-20 lg:text-right text-sm text-neutral-500 flex items-center gap-2">
                    <span>Designed by </span>
                    <Link
                        href="/"
                        className="gradient-text-animated font-semibold hover:underline underline-offset-2 transition"
                    >
                        {DESIGNER_NAME}
                    </Link>
                </div>
            </div>
            <StarsBackground/>
        </footer>
    )
}
