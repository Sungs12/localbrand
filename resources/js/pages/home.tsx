import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/home.css';
import { useEffect, useRef, useState } from 'react';
import { animate } from 'animejs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/home',
    },
];

export default function Home() {
    const animatedRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showCard, setShowCard] = useState(false); // State to toggle the card visibility

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate('.animated-box', {
                        size: [0, 150],
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
            animate('.animated-box', {
                translateY: [0, -10, 0], // Float effect
                easing: 'easeInOutQuad',
                duration: 3000, // Animation duration in ms
                loop: true,
                direction: 'alternate',
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
            {/* Hero Section */}
            <div
                className="relative flex flex-col items-center justify-center h-screen bg-cover bg-center"
                style={{ backgroundImage: 'url(/datzwild-hero.png)' }}
            >
                <h1 className="text-4xl rashkey mb-4 text-black animate-fade-in-up z-10">Here Comes The First WAVE!</h1>
                <h1 className="text-8xl rashkey text-black animate-fade-in-up z-10">DATZ WILD!</h1>
                <button
                    onClick={() => setShowCard(true)} // Show the card when clicked
                    className="bg-black animate-fade-in-up mt-4 hover:bg-yellow-600 font-bold rounded-full text-yellow p-5 px-10"
                >
                    Get now!
                </button>
                <div className="absolute inset-0 "></div>
            </div>

            {/* Content Section */}
            <div className="flex h-full justify-center items-center flex-1 flex-col gap-4 rounded-xl p-4">
                

                {/* Card Section */}
                {showCard && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
                        <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-96 flex flex-col ">
                            <h2 className="text-2xl font-bold mb-4 border-b-1 my-2 pb-2 border-white">BCA Rekening</h2>
                            <p className="text-lg mb-2">Account Name : James Tanu</p>
                            <p className="text-lg mb-4">Account Number : 1234567890</p>
                            <button
                                onClick={() => setShowCard(false)} // Close the card when clicked
                                className="bg-red-500 hover:bg-red-400 text-white font-bold self-center py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex mt-5 justify-center items-center flex-col flex-1">
                    <h1 className="text-4xl mb-5"> What We Have In Store:</h1>
                    <ul className="text-center">
                        <li className="my-2">
                            <span>Key Chains</span>
                        </li>
                        <li className="my-2">
                            <span>T-shirt</span>
                        </li>
                        <li className="my-2">
                            <span>Stickers</span>
                        </li>
                        <li className="my-2">Thank you Letter</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}
