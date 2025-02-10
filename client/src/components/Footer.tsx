export function Footer() {
  return (
    <footer className="bg-secondary py-4 mt-8">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Image Gallery. All rights reserved.
      </div>
    </footer>
  );
}