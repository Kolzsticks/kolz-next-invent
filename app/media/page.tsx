'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon } from 'lucide-react';

const mediaItems = [
  {
    id: '1',
    name: 'Product Image 1',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    type: 'image',
  },
  // Add more sample media items...
];

export default function MediaLibraryPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Media Library</h1>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload Files
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <Card key={item.id} className="p-2">
            <div className="aspect-square relative rounded-md overflow-hidden">
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-secondary">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="mt-2 text-sm truncate">{item.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}