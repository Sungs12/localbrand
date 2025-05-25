<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the blogs.
     */
    public function index()
{
    $blogs = Blog::with('author')->get(); // Fetch blogs with their authors

    return Inertia::render('blog', [
        'blogs' => $blogs, // Pass blogs data to the component
    ]);
}
    /**
     * Show the form for creating a new blog.
     */
    public function create()
    {
        return Inertia::render('Blogs/Create');
    }

    /**
     * Store a newly created blog in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'related_images.*' => 'string|max:2048', // Validate each image in related_images
        ]);

        $relatedImages = [];
        if ($request->hasFile('related_images')) {
            foreach ($request->file('related_images') as $image) {
                $path = $image->store('images', 'public'); // Store the image in the 'public/images' directory
                $relatedImages[] = $path; // Add the stored path to the relatedImages array
            }
        }

        Blog::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'author' => auth()->id(), // Use the authenticated user's ID
            'related_images' => $relatedImages, // Save the related images as JSON
        ]);

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully!');
    }

    /**
     * Show the form for editing the specified blog.
     */
    public function edit($id)
    {
        $blog = Blog::findOrFail($id);

        return Inertia::render('Blogs/Edit', [
            'blog' => $blog,
        ]);
    }

    /**
     * Update the specified blog in storage.
     */
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $blog->update($validated);

        return redirect()->route('blogs.index')->with('success', 'Blog updated successfully!');
    }

    /**
     * Remove the specified blog from storage.
     */
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully!');
    }
}
