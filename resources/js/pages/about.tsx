import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/home.css';
import { useEffect } from 'react';
import { animate, stagger } from 'animejs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/about',
    },
];

export default function About() {
    useEffect(() => {
        // Example animation for the heading
        animate('.about-heading',{
            translateY: [-50, 0],
            opacity: [0, 1],
            easing: 'easeOutQuad',
            duration: 1000,
            delay: stagger(400),
        });
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Us" />
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 text-gray-800 rounded-lg">
                {/* Heading Section */}
                <h1 className="about-heading text-6xl font-bold mb-6 text-center">Our Philosophy</h1>
                <p className="text-lg about-heading leading-relaxed text-center max-w-3xl mb-8">
                    Kami mengerti tantangan dalam mencari informasi yang akurat tentang perawatan ikah Lokal indonesia.
                    Banyak spesies endemik, sepertik ikan cupang liar dan ikan lokal lainnya menjadi semakin sulit ditemukan karenak
                    kerusakan habitat mereka. Ini karena banyaknya orang yang tidak bertangung jawab maenangkap ikan untuk dijual
                    dan sedikitnya orang yang peduli terhadap kelestarian ikan lokal
                </p>

                {/* Mission Section */}
                <div className="text-center max-w-3xl">
                    <h2 className="text-4xl font-semibold mb-4 about-heading">Our Mission</h2>
                    <p className="text-lg about-heading leading-relaxed">
                        Misi kami adalah untuk meningkatkan kesadaran tentang pentingnya melestarikan keanekaragaman hayati perairan Indonesia
                        dengan meningkatkan cinta terhadap ikan lokal Indonesia. Supaya Penduduk-penduduk indonesiia lebih peduli
                        terhadap pelestarian dan pemeliharaan ikan lokal Indonesia.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
