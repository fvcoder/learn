import { readdir, stat } from "fs/promises"
import { join } from "path"

export function generateHTMLDocument(title, content) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
        ${content}
    </body>
    </html>`
}

export async function readRecursiveDir(path) {
    const list = []

    const listFileDir = await readdir(path)

    for (const l of listFileDir) {
        let p = join(path, l)
        list.push(p)
        
        const fileProps = await stat(p)
        
        if (fileProps.isDirectory()) {
            list.push(...(await readRecursiveDir(p)))
        }
    }

    return list;
}