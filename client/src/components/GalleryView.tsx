import { Image } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface GalleryViewProps {
  images: Image[];
}

export function GalleryView({ images }: GalleryViewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{image.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <img src={image.url} alt={image.title} className="w-full h-48 object-cover" />
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground">{image.description}</p>
            <p className="text-sm text-muted-foreground mt-2">{new Date(image.date).toLocaleDateString()}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}