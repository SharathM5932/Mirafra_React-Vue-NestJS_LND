import { diskStorage } from 'multer';
import { extname } from 'path';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: 'apps/product/prodimg',
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
};
