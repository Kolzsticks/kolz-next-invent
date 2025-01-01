'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Image } from 'lucide-react';

const mediaItems = [
  {
    id: '1',
    name: 'Headphones',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '2',
    name: 'Watch Classic',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '3',
    name: 'Sunglasses',
    url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '4',
    name: 'Nike Shoes',
    url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '5',
    name: 'Camera Lens',
    url: 'https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '6',
    name: 'Coffee Machine',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '7',
    name: 'Leather Bag',
    url: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '8',
    name: 'Smart Watch',
    url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '9',
    name: 'Perfume Bottle',
    url: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '10',
    name: 'Keyboard',
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '11',
    name: 'Smartphone',
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '12',
    name: 'Laptop',
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '13',
    name: 'Sneakers',
    url: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '14',
    name: 'Backpack',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '15',
    name: 'Drone',
    url: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '16',
    name: 'Gaming Console',
    url: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '17',
    name: 'Wireless Speaker',
    url: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '18',
    name: 'Tablet',
    url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '19',
    name: 'Smart Home Device',
    url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=300&h=300&fit=crop',
    type: 'image',
  },
  {
    id: '20',
    name: 'Fitness Tracker',
    url: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?w=300&h=300&fit=crop',
    type: 'image',
  }
];

export default function MediaLibraryPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <Button>
          <UploadCloud className="mr-2 h-4 w-4" /> Upload Files
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {mediaItems.map((item) => (
          <Card key={item.id} className="p-2 hover:shadow-lg transition-shadow duration-200">
            <div className="aspect-square relative rounded-md overflow-hidden">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-secondary">
                  <Image className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="mt-2 text-sm truncate font-medium">{item.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}