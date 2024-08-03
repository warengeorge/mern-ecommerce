import sharp from 'sharp';
import multer, { memoryStorage } from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION

const s3client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey
  },
  region
});

const storage = memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Invalid file type'));
  }
};

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 } // 50MB file size limit 
});

export const uploadImages = async (id, images) => {
  if (!images) throw new Error('No image provided');
  const imageUrls = [];
  for (let i = 0; i < images.length; i++) {
    const folderKey = `products/${id}/image${i + 1}.png`;
    const buffer = await sharp(images[i].buffer).resize(320, 320, {
      fit: sharp.fit.outside, withoutEnlargement: true
    })
      .toFormat('png')
      .toBuffer();
    const params = {
      Bucket: bucketName,
      Key: folderKey,
      Body: buffer,
      ContentType: images[i].mimetype,
    };
    await s3client.send(new PutObjectCommand(params));
    const imageUrl = `${process.env.AWS_PREFIX}${folderKey}`;
    imageUrls.push(imageUrl);
  }
  return imageUrls;
}