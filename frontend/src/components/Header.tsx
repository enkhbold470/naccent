import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
        <header className="w-full fixed top-0 flex justify-between items-center px-4 bg-inherit h-[4rem]">
            <div className="flex items-center gap-2">
                <Image
                    src="Flag_of_the_United_States.svg"
                    alt="US Flag"
                    width={40}
                    height={40}
                    className="object-cover"
                />
            </div>
          <Link href="/home">
            <Image
                src="logo.svg"
                alt="Logo"
                width={40}
                height={40}
                />
                </Link>
        </header>
    )
}