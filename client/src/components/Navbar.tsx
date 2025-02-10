import { Link } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  return (
    <nav className="bg-primary/10 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Image Gallery</h1>
          <div className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/upload">
                <Plus className="h-5 w-5" />
                <span className="sr-only">Upload Image</span>
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}