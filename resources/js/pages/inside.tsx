import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/home.css';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `What's Inside`,
        href: '/inside',
    },
];

export default function Catalog() {
    const animatedElementsRef = useRef<NodeListOf<Element> | null>(null);

    useEffect(() => {
        // Select all elements with the 'slide-up' class
        animatedElementsRef.current = document.querySelectorAll('.slide-up');

        // Intersection Observer to trigger animation when elements are in the viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Trigger animation for the intersecting element
                        animate(entry.target, {
                            translateX: [-1000, 0],
                            opacity: [0, 1],
                            easing: 'easeOutQuad',
                            duration: 1000,
                            delay: stagger(200),
                        });

                        // Stop observing the element after animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the element is visible
        );

        // Observe each element
        animatedElementsRef.current?.forEach((element) => observer.observe(element));

        // Cleanup observer on component unmount
        return () => observer.disconnect();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="What's Inside?" />
            <div className="flex flex-col items-center  w-full justify-center p-8 rounded-lg">
                {/* Heading Section */}
                <h1 className="about-heading text-6xl  font-bold mb-6 text-center ">What's inside our box</h1>
                <div className="flex align-center flex-col w-full  justify-center products">
                    <div className="flex slide-up bg-neutral-800 w-full rounded-lg items-center  m-8">
                        <img src="/shirt1.png"  className="w-96 h-96 rounded-lg shadow-lg" />
                        <div className='ml-8'>
                            <span className="font-bold py-4 text-4xl">Tiger Datz T-shirt a</span>
                        </div>
                    </div>
                    <div className="flex slide-up bg-neutral-800 w-full rounded-lg items-center  m-8">
                        <img src="/shirt2.png"  className="w-96 h-96 rounded-lg shadow-lg" />
                        <div className='ml-8'>
                            <span className="font-bold py-4 text-4xl">Tiger Datz T-shirt b</span>
                        </div>
                    </div>
                    <div className="flex slide-up bg-neutral-800 w-full rounded-lg items-centerr m-xl m-8">
                        <img src="/keychain1.png" className="w-96 h-96 rounded-lg shadow-lg" />
                        <div className='ml-8 flex flex-col justify-center'>
                            <span className="font-bold py-4 text-4xl">Tiger Datz KeyChain</span>
                        </div>
                    </div>
                    <div className="flex slide-up bg-neutral-800 w-full  rounded-lg items-center  m-xl m-8">
                        <img src="/stickers.png" className="w-96 h-96 rounded-lg shadow-lg" />
                        <div className='ml-8'>
                            <span className="font-bold py-4 text-4xl">Tiger Datz Stickers</span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
