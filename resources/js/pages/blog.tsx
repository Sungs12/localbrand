import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

interface Blog {
  id: number;
  title: string;
  content: string;
  related_images: string[]; // Array of image paths
  author?:{
    id:number, name:string, email:string, email_verified_at:string, created_at:Date, updated_at:Date
  };
  created_at: Date;
  updated_at: Date;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blogs',
        href: '/blogs',
    },
];
function Blog() {
    const [loading, setLoading] = useState(true); // State to handle loading
    const blogs:Array<Blog>= usePage<{ props: { blogs: Blog[] } }>().props.blogs;

    useEffect(() => {
    
      console.log(blogs)
      if(blogs){
        setLoading(false); // Set loading to false once data is fetched
      }
    },[]);
    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            { blogs.length > 0 ? blogs.map((blog)=>{
            const dateString:string = new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          }).format(new Date(blog.created_at));
            return(
              <div className='p-4 border rounded text-gray-800 dark:text-gray-200 mb-4' key={blog.id}>
                <div className='border-b flex py-2 items-end'> 
                  <span className='text-4xl font-bold'>{blog.title}</span> 
                  <span className='ml-4'>Authored by: {blog.author? blog.author.name: 'unknown author'}</span>
                  <span className='text-gray-400 ml-2 text-xs'>{dateString}</span>
                </div>
                <div dangerouslySetInnerHTML={{__html:blog.content}}></div>
              </div>
            )}):'noblogs'}
            {/* {blogs.length > 0 ? (
                <ul className="space-y-4">
                    {blogs.map((blog) => (
                        <li key={blog.id} className="p-4 border rounded shadow">
                            <h2 className="text-xl font-semibold">{blog.title}</h2>
                            <p className="text-gray-700">{blog.content}</p>
                            {blog.related_images && blog.related_images.length > 0 && (
                                <div className="mt-4">
                                    {blog.related_images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`/storage/${image}`}
                                            alt={`Blog Image ${index + 1}`}
                                            className="w-full max-w-xs rounded shadow mb-2"
                                        />
                                    ))}
                                </div>
                            )}
                            <p className="text-sm text-gray-500 mt-2">
                                Author: {blog.author? blog.author : 'Unknown'}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No blogs available.</p>
            )} */}
        </div>
        </AppLayout>
    );
}

export default Blog;