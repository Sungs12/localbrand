<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Api\Item;

class ItemSeeder extends Seeder
{
    public function run()
    {
        $items = [
            [
                'name' => 'Tiger Datz T-shirt',
                'price' => 109999,
                'stock' => 50,
                'description' => 'High-quality cotton T-shirt with the iconic Tiger Datz logo. Comfortable and stylish for everyday wear.',
                'image' => '/shirt1.png',
            ],
            [
                'name' => 'Tiger Datz KeyChain',
                'price' => 49999,
                'stock' => 150,
                'description' => 'Durable and eye-catching Tiger Datz keychain, perfect for keeping your keys organized.',
                'image' => '/keychain1.png',
            ],
            [
                'name' => 'Tiger Datz Stickers',
                'price' => 15000,
                'stock' => 300,
                'description' => 'Set of fun and vibrant Tiger Datz stickers to decorate your laptop, notebook, or anywhere you like.',
                'image' => '/stickers.png',
            ],
            [
                'name' => 'Datz Wild Bundle',
                'price' => 200000,
                'stock' => 20,
                'description' => 'Exclusive bundle including T-shirt, keychain, and stickers. Great value for fans of Tiger Datz.',
                'image' => '/datzwild-bundle.png',
            ],
        ];

        foreach ($items as $item) {
            Item::create($item);
        }
    }
}
