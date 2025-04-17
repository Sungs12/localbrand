import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import '../../css/home.css';
import { useEffect, useRef, useState } from 'react';
import {animate} from 'animejs';
// INI TEMPLATE KOSONG
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: '/about',
    },
];

export default function About() {

    useEffect(() => {
    
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
           <h1>hello world</h1>
        </AppLayout>
    );
}
