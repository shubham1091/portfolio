import { motion } from "framer-motion"

const photos = [
  "/album/IMG-20250429-WA0128.jpg",
  "/album/IMG_20250306_164818.jpg",
  "/album/IMG_20250314_204726.jpg",
  "/album/IMG_20250429_165758.jpg",
  "/album/IMG_20250603_154854.jpg",
  "/album/IMG_20250810_124822.jpg",
  "/album/IMG_20250905_104452.jpg",
  "/album/image.png",
]

export default function PhotoGallery() {
  return (
    <div className="mx-auto flex w-full max-w-300 flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="mb-5 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Photo Gallery
        </h2>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          A simple photo grid from the album.
        </p>
      </div>

      <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
            className="group relative aspect-4/5 overflow-hidden border border-border/50 bg-card/70"
          >
            <img
              src={photo}
              alt={`Gallery photo ${index + 1}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-103"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
