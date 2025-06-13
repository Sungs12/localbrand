import React, { useEffect, useState } from 'react';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog form',
        href: '/blog-form',
    },
];

function BlogForm() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const { auth } = usePage<SharedData>().props;
    const {blogs} = usePage().props;
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); // Generate a temporary preview URL
        }
    };
    useEffect(() => {
        console.log('token', blogs)
    }, []);

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        setContent(e.currentTarget.innerHTML); // Update the content state with the inner HTML
        // Resize any images in the contentEditable div
        const contentDiv = e.currentTarget;
        const images = contentDiv.querySelectorAll('img');
        images.forEach((img) => {
            img.style.maxWidth = '80%'; // Ensure the image doesn't exceed the container width
            img.style.height = 'auto'; // Maintain aspect ratio
        });

        setContent(contentDiv.innerHTML); 
        console.log('content', content)
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imageUrl = '';

        // If an image is selected, upload it first
        if (image) {
            const imageFormData = new FormData();
            imageFormData.append('image', image);

            try {
                const imageResponse = await axios.post('/api/upload-image', imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (imageResponse.status === 200) {
                    imageUrl = imageResponse.data.url; // Assume the server returns the uploaded image URL
                } else {
                    console.error('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        // Append the image URL to the content if it exists
        const detailsWithImage = imageUrl
            ? `${content}<br><img src="${imageUrl}" alt="Uploaded Image" />`
            : content;

        // Create a FormData object to send the blog data to the server
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', detailsWithImage);

        try {
            const response = await axios.post('/blogs', {

                title: title,
                content:content,
                author: auth.user.id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Blog submitted successfully:', response.data);

                // Reset the form
                setTitle('');
                setContent('');
                setImage(null);
                setPreview(null);
            } else {
                console.error('Failed to submit blog');
            }
        } catch (error) {
            console.error('Error submitting blog:', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col items-center justify-center p-8">
                <div className="flex flex-col items-center">
                    <h1 className="text-gray-950 dark:text-gray-100">Add Blog</h1>
                    <p>author : {auth.user.email}</p>
                    <form
                        className="flex flex-col gap-4 w-full max-w-md"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder="Blog Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-100"
                        />
                        <div
                            onInput={handleContentChange}
                            contentEditable
                            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-100 min-h-[100px]"

                        ></div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:text-gray-100"
                        />
                        {preview && (
                            <div className="flex flex-col items-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full max-w-xs rounded shadow"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImage(null);
                                        setPreview(null);
                                    }}
                                    className="mt-2 text-red-500 hover:underline"
                                >
                                    Remove Image
                                </button>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

export default BlogForm;