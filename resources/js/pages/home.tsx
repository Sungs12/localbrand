import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/home.css';
import { useEffect, useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];

export default function Home() {
    const animatedRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        if (animatedRef.current) {
            observer.observe(animatedRef.current);
        }

        return () => {
            if (animatedRef.current) {
                observer.unobserve(animatedRef.current);
            }
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className="flex h-full justify-center items-center flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className='text-6xl'>Our LootBox!</h1>
                <div
                    ref={animatedRef}
                    className={`h-150 w-150 bg-cover bg-top  animated-box ${
                        isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ backgroundImage: "url(/box-with-things.png)" }}
                />
                <button className='bg-blue-500 hover:bg-blue-300 font-bold rounded-full text-black p-5 px-10'>Get now!</button>
                <div className="flex mt-20 justify-center items-center flex-col flex-1">
                    <h1 className='text-4xl'> What our Box Has inside of it:</h1>
                    <ul>
                        <li className='my-2'>
                            <span>hand bag</span>
                        </li>
                        <li  className='my-2'>
                            <span>bomb defuse kit</span>
                        </li>
                        <li  className='my-2'>
                            <span>dead fish</span>
                        </li>
                        <li  className='my-2'>
                            scales from an endangered local fish species
                        </li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
