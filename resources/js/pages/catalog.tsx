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

type CatalogProps = {
    items?: any[]; // or specify your item type if you have one
};

export default function Catalog({ items }: CatalogProps) {
    const animatedElementsRef = useRef<NodeListOf<Element> | null>(null);

    useEffect(() => {
        if (items && items.length > 0) {
            console.log('Items passed to Catalog:', items);
        } else {
            console.log('No items passed to Catalog');
        }
    }, [items]);

    useEffect(() => {
        // Your existing animation logic here, no change
        animatedElementsRef.current = document.querySelectorAll('.products');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animate('.slide-up', {
                            translateY: [50, 0],
                            opacity: [0, 1],
                            easing: 'easeOutQuad',
                            duration: 1000,
                            delay: stagger(200),
                        });

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        animatedElementsRef.current?.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Catalog" />
            <div className="flex flex-col items-center justify-center p-8 rounded-lg">
                <h1 className="about-heading text-6xl font-bold mb-6 text-center">Our Catalog Of Products</h1>
                {/* Your UI is unchanged — you can keep the static items or remove them if you want */}
                <div className="flex align-center flex-wrap justify-center products">
                   
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="flex slide-up bg-neutral-200 dark:bg-neutral-800 flex-col pb-4 rounded-lg items-center justify-center m-xl m-8">
                                <img src={item.image} className="w-96 h-96 rounded-lg shadow-lg" alt={item.image} />
                                <span className="font-bold py-4 text-4xl">{item.name}</span>
                                <p>Rp {item.price.toLocaleString('id-ID')},00</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-lg">No items available in the catalog.</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
