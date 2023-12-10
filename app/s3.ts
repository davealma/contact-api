import S3 from 'aws-sdk/clients/s3';
import fs  from 'fs';
import { BodyData } from 'hono/utils/body';


declare module "bun" {
    interface Env {
        AWS_REGION: string;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_KEY: string;
        AWS_BUCKET_NAME: string;
    }
}

const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
});


export async function upload(body: BodyData) {    
    const fileName = `${crypto.randomUUID()}.jpg`;
    Bun.file(await Bun.write(`./uploads/${fileName}`, body['image']));
    const fileStream = fs.createReadStream(`./uploads/${fileName}`);

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: fileName
    }

    return s3.upload(uploadParams).promise()
}