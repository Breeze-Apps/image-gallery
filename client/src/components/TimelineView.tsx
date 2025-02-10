import { Image } from '../types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface TimelineViewProps {
  images: Image[];
}

export function TimelineView({ images }: TimelineViewProps) {
  const groupedImages = images.reduce((acc, image) => {
    const date = image.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(image);
    return acc;
  }, {} as Record<string, Image[]>);

  const sortedDates = Object.keys(groupedImages).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="space-y-12">
      {sortedDates.map((date) => (
        <div key={date} className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <div className="sticky top-16 pt-4 md:top-20"> {/* Adjusted for mobile and desktop */}
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle>{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{groupedImages[date].length} images</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            {groupedImages[date].map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{image.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <img src={image.url} alt={image.title} className="w-full h-64 object-cover" />
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                  <p className="text-sm text-muted-foreground">{image.description}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}