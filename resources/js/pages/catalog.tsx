import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/home.css';
import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Catalog',
        href: '/catalog',
    },
];

export default function Catalog() {
    const animatedElementsRef = useRef<NodeListOf<Element> | null>(null);

    useEffect(() => {
        // Select all elements with the 'slide-up' class
        animatedElementsRef.current = document.querySelectorAll('.products');

        // Intersection Observer to trigger animation when elements are in the viewport
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Trigger animation for the intersecting element
                        animate('.slide-up', {
                            translateY: [50, 0],
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
            <Head title="Catalog" />
            <div className="flex flex-col items-center justify-center p-8 rounded-lg">
                {/* Heading Section */}
                <h1 className="about-heading text-6xl font-bold mb-6 text-center">Our Catalog Of Products</h1>
                <div className="flex align-center flex-wrap justify-center products">
                    <div className="flex slide-up bg-neutral-800 flex-col pb-4 rounded-lg items-center justify-center m-8">
                        <img src="/tshirt.png"  className="w-96 h-96 rounded-lg shadow-lg" />
                        <span className="font-bold py-4 text-4xl">Tiger Datz T-shirt</span>
                        <p>Rp 109.999,00</p>
                    </div>
                    <div className="flex slide-up bg-neutral-800 flex-col pb-4 rounded-lg items-center justify-center m-xl m-8">
                        <img src="/keychain.png" className="w-96 h-96 rounded-lg shadow-lg" />
                        <span className="font-bold py-4 text-4xl">Tiger Datz KeyChain</span>
                        <p>Rp 49.999,00</p>
                    </div>
                    <div className="flex slide-up bg-neutral-800 flex-col pb-4 rounded-lg items-center justify-center m-xl m-8">
                        <img src="/stickers.png" className="w-96 h-96 rounded-lg shadow-lg" />
                        <span className="font-bold py-4 text-4xl">Tiger Datz Stickers</span>
                        <p>Rp 15.000,00</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
