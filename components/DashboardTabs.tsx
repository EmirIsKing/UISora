'use client'
import React, {useState, useEffect} from 'react'
import {useRouter, usePathname} from 'next/navigation'


const DashboardTabs = () => {

    const router = useRouter();
    const pathname = usePathname();

    const [active, setActive] = useState<number>();
    const handleClick = (value: number, link: string) => {
      setActive(value);
      router.push(link);
    }

    useEffect(() => {
        if (pathname === '/dashboard/projects') {
            setActive(1);
        } else if (pathname === '/dashboard/inspirations') {
            setActive(2);
        }

    }, []);


    return (
        <div className={'flex h-full w-[20%] max-md:w-[70%] max-[55rem]:w-[30%] max-[65rem]:w-[25%] shadow-sm px-2 py-2 rounded-full bg-slate-800/5 justify-evenly items-center font-semibold'}>
            <button
                className={`cursor-pointer hover:bg-slate-800/7 border-2 hover:opacity-90 transition-all
                 duration-300 border-slate-800/10 p-1 rounded-full w-[95px] flex justify-center items-center
                 ${active === 1? 'border-b-purple-950/80 bg-slate-500/10 border-t-blue-600/80 border-l-purple-950/80 border-r-purple-950/80': ''}`}
                onClick={() => handleClick(1, '/dashboard/projects')}
            >
                Projects</button>
            <button
                className={`cursor-pointer hover:bg-slate-800/7 border-2 hover:opacity-90 transition-all 
                duration-300  border-slate-800/10 p-1 rounded-full w-[95px] flex justify-center items-center
                ${active === 2? 'border-b-purple-950/80 bg-slate-500/10 border-t-blue-600/80 border-l-purple-950/80 border-r-purple-950/80': ''}`}
                onClick={() => handleClick(2, '/dashboard/inspirations')}
            >
                Inspirations</button>
        </div>
    )
}
export default DashboardTabs
