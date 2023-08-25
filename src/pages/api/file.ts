import fs from "fs"
import type { NextApiRequest, NextApiResponse } from "next"
import path from "path"

import type { IMAGE_SIZE } from "@/ds"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Extract the filename from the URL
  const filename = req.query.filename as string
  const filesize: IMAGE_SIZE = (req.query.filesize as IMAGE_SIZE) ?? "sm"

  // console.log("file api: ", req.query)

  if (!filename) {
    res.status(400).send("Filename is required")
    return
  }

  // Set the path for images - adjust this as needed
  const imagesDir = path.join(process.cwd(), "../scrapy_flowgpt/__data__/images")
  const imagePath = path.join(imagesDir, filesize, `${filename}.jpg`)

  try {
    await fs.promises.access(imagePath)
    const readStream = fs.createReadStream(imagePath)
    readStream.pipe(res)
  } catch (err) {
    console.warn({ imagePath })
    // If error, file doesn't exist or there's an access issue
    res.status(404)
  }
}
