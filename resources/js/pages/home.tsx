import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/home.css';
import { useEffect, useRef, useState } from 'react';
import {animate} from 'animejs';

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
                    animate('.animated-box',{
                        size:[0, 150],
                        opacity: [0, 0.5], // Fade in
                        easing: 'easeOutQuad',
                        duration: 1000, // Animation duration in ms
                    });
                    setIsVisible(true);
                    
                    
                }
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );
        if (animatedRef.current) {
             // Trigger Anime.js animation
             animate('.animated-box',{
                translateY: [0, -10, 0], // Float effect
                easing: 'easeInOutQuad',
                duration: 3000, // Animation duration in ms
                loop: true,
                direction:'alternate'
            });
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
                <h1 className='text-6xl shizuru animate-fade-in-up'>Datz WILD!</h1>
                <div
                    ref={animatedRef}
                    className={`h-150 w-150 bg-cover bg-top animate-fade-in-up animated-box ${
                        isVisible ? 'animated-box' : 'opacity-0'
                    }`}
                    style={{ backgroundImage: "url(/box-with-things.png)" }}
                />
                <button className='bg-blue-500 hover:bg-blue-300 font-bold rounded-full text-black p-5 px-10'>Get now!</button>
                <div className="flex mt-20 justify-center items-center flex-col flex-1">
                    <h1 className='text-4xl'> What our Box Has inside of it:</h1>
                    <ul>
                        <li className='my-2'>
                            <span>Key Chains</span>
                        </li>
                        <li  className='my-2'>
                            <span>T-shirt</span>
                        </li>
                        <li  className='my-2'>
                            <span>Stickers</span>
                        </li>
                        <li  className='my-2'>
                            Thank you Letter
                        </li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
