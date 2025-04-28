import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import {PhoneIcon, Instagram} from 'lucide-react'

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <div id="footer-contacts" className="flex justify-center py-5 border-t-2 items-center">
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl my-4'>About us</h1>
                <div className="flex">
                <div className="mx-4">
                    <h1>Phone number</h1>
                    <p className='flex'><PhoneIcon className='mr-2'/>+081917161649</p>
                </div>
                <div className="mx-4">
                    <h1>Instagram</h1>
                    <p className='flex'> <Instagram className='mr-2'/>Filler instagram lmao</p>
                </div>
            </div>
            </div>
            
        </div>
    </AppLayoutTemplate>
);
