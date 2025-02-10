import React, { ErrorInfo, Suspense, useState, useEffect } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { GalleryView } from './components/GalleryView';
import { TimelineView } from './components/TimelineView';
import { Image } from './types';
import { Grid, Clock } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { UploadPage } from './components/UploadPage';

const images: Image[] = [
  {
    id: 1,
    title: "Mountain Landscape",
    description: "A beautiful mountain landscape at sunset",
    date: "2023-05-15",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "City Skyline",
    description: "A stunning view of a city skyline at night",
    date: "2023-06-20",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2144&q=80"
  },
  {
    id: 3,
    title: "Beach Sunset",
    description: "A serene beach scene with a colorful sunset",
    date: "2023-07-10",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
  }
];

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [viewType, setViewType] = useState(() => {
    return localStorage.getItem('viewType') || 'gallery';
  });

  useEffect(() => {
    localStorage.setItem('viewType', viewType);
  }, [viewType]);

  const handleViewTypeChange = (value: string) => {
    setViewType(value);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="container mx-auto p-4 flex-grow mt-16">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/image-gallery" element={
                  <Tabs defaultValue={viewType} onValueChange={handleViewTypeChange}>
                    <div className="flex justify-center mb-6">
                      <TabsList>
                        <TabsTrigger value="gallery">
                          <Grid className="h-5 w-5 mr-2" />
                          Gallery
                        </TabsTrigger>
                        <TabsTrigger value="timeline">
                          <Clock className="h-5 w-5 mr-2" />
                          Timeline
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="gallery">
                      <GalleryView images={images} />
                    </TabsContent>
                    <TabsContent value="timeline">
                      <TimelineView images={images} />
                    </TabsContent>
                  </Tabs>
                } />
                <Route path="/upload" element={<UploadPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;