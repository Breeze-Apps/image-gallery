import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';

interface UploadImage {
  file: File;
  preview: string;
  title: string;
  description: string;
  date: string;
}

export function UploadPage() {
  const [images, setImages] = useState<UploadImage[]>([]);
  const { toast } = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: '',
      description: '',
      date: ''
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  const handleInputChange = (index: number, field: keyof UploadImage, value: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, [field]: value } : img));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image to upload.",
        variant: "destructive",
      });
      return;
    }

    for (const image of images) {
      if (!image.title || !image.description || !image.date) {
        toast({
          title: "Error",
          description: "Please fill in all fields for each image.",
          variant: "destructive",
        });
        return;
      }

      const formData = new FormData();
      formData.append('image', image.file);
      formData.append('title', image.title);
      formData.append('description', image.description);
      formData.append('date', image.date);

      try {
        const response = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to upload image "${image.title}". Please try again.`,
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Success",
      description: "All images uploaded successfully!",
    });
    setImages([]);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Upload Images</h2>
      <form onSubmit={handleSubmit}>
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 cursor-pointer">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the images here ...</p>
          ) : (
            <p>Drag 'n' drop images here, or click to select images</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader>
                <CardTitle>
                  <Input
                    placeholder="Enter title"
                    value={image.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="w-full"
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <img src={image.preview} alt={image.title} className="w-full h-48 object-cover" />
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <Textarea
                  placeholder="Enter description"
                  value={image.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  className="w-full"
                />
                <Input
                  type="date"
                  value={image.date}
                  onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                  className="w-full"
                />
              </CardFooter>
            </Card>
          ))}
        </div>
        {images.length > 0 && (
          <Button type="submit" className="mt-4">Upload All Images</Button>
        )}
      </form>
    </div>
  );
}