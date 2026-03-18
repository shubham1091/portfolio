import { motion } from 'framer-motion';

const photos = [
  '/album/IMG-20250429-WA0128.jpg',
  '/album/IMG_20250306_164818.jpg',
  '/album/IMG_20250314_204726.jpg',
  '/album/IMG_20250429_165758.jpg',
  '/album/IMG_20250603_154854.jpg',
  '/album/IMG_20250810_124822.jpg',
  '/album/IMG_20250905_104452.jpg',
  '/album/image.png',
];

export default function PhotoGallery() {
  return (
    <div className="w-full max-w-300 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
        {photos.map((photo, i) => (
          <motion.div
            key={photo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative group overflow-hidden cursor-pointer bg-card border border-white/10 aspect-4/5"
          >
            <img
              src={photo}
              alt={`Gallery photo ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
