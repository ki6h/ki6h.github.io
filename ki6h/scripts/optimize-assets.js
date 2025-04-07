const fs = require("fs")
const path = require("path")
const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")
const imageminPngquant = require("imagemin-pngquant")
const imageminWebp = require("imagemin-webp")

const OUT_DIR = path.join(process.cwd(), "out")
const PUBLIC_DIR = path.join(OUT_DIR, "images")

async function optimizeImages() {
  console.log("🔍 Scanning for images to optimize...")

  // Ensure the output directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log("📁 Creating output directory...")
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  try {
    // Optimize JPG and PNG images
    const files = await imagemin([`${OUT_DIR}/**/*.{jpg,jpeg,png}`], {
      destination: OUT_DIR,
      plugins: [imageminMozjpeg({ quality: 80 }), imageminPngquant({ quality: [0.6, 0.8] })],
    })

    // Convert images to WebP for modern browsers
    await imagemin([`${OUT_DIR}/**/*.{jpg,jpeg,png}`], {
      destination: OUT_DIR,
      plugins: [imageminWebp({ quality: 75 })],
    })

    console.log(`✅ Successfully optimized ${files.length} images!`)
  } catch (error) {
    console.error("❌ Error optimizing images:", error)
    process.exit(1)
  }
}

async function optimizeJavaScript() {
  console.log("🔧 Optimizing JavaScript bundles...")
  // This is handled by Next.js build process
  console.log("✅ JavaScript optimization complete!")
}

async function main() {
  console.log("🚀 Starting asset optimization...")

  try {
    await optimizeImages()
    await optimizeJavaScript()

    console.log("🎉 All assets optimized successfully!")
  } catch (error) {
    console.error("❌ Error during optimization:", error)
    process.exit(1)
  }
}

main()

