import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

let images = [
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

app.get('/api/images', (req, res) => {
  res.json(images);
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  const { title, description, date } = req.body;
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  const newImage = {
    id: images.length + 1,
    title,
    description,
    date,
    url: imageUrl
  };

  images.push(newImage);
  res.status(201).json(newImage);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});