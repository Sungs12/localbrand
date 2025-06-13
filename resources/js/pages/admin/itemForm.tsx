import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Item Form',
    href: '/admin/item-form',
  },
];

function ItemForm() {
    const [imageURL, setImageURL]= useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });

  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageURL(reader.result as string);
      setFormData(prev => ({
        ...prev,
        image: reader.result as string,
      }));
    };
        console.log(imageFile, 'imageFile')
        console.log(imageURL, 'imageURL')
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        if (imageFile) {
        data.append('image', imageFile);
        }
    
        router.post('/items', data, {
        onError: (error) => {
            setErrors(error);
        },
        onSuccess: (res) => {
            setFormData({
            name: '',
            description: '',
            price: '',
            stock: '',
            image: '',
            });
            setImageFile(null);
            setImageURL('');
            setErrors({});
            alert('Item created successfully!');
            console.log('Item created successfully!', res);
        },
        // Tell Inertia to not serialize the data as JSON:
        forceFormData: true,
        });
    };
  

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="flex text-gray-700 dark:text-gray-100 flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-transparent">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black p-6 rounded-xl shadow-md gap-4 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">Create New Item</h2>

          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Price</label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              type="file"
              name="image"
              accept='image/*'
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </AppLayout>
  );
}

export default ItemForm;
