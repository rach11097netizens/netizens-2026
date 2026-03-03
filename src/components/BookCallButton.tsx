import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface BookCallButtonProps {
    className?: string
    children?: React.ReactNode
    showArrow?: boolean
    variant?: "gradient" | "navy-radial" | "white"
}

export const BookCallButton = ({
    className = "",
    children,
    showArrow = true,
    variant = "gradient"
}: BookCallButtonProps) => {
    const baseStyles = "px-8 py-4 text-sm rounded-button transition-colors flex items-center justify-center gap-2 font-medium"

    const variants = {
        gradient: "bg-button-gradient text-white",
        "navy-radial": "bg-button-gradient text-white", // Defaulting to gradient for now as it's very similar
        white: "bg-white text-regal-navy border border-gray-200"
    }

    return (
        <Link
            to="/book-call"
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children || "Book a Discovery Call"}
            {showArrow && <ArrowRight size={20} />}
        </Link>
    )
}
