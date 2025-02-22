import { existsSync } from 'fs';
import { rm, mkdir, writeFile, stat, copyFile, readFile, readdir } from 'fs/promises';
import { join, basename } from 'path';
import markdown from "@wcj/markdown-to-html";
import { generateHTMLDocument, readRecursiveDir } from './utils.mjs';

const __dirname = process.cwd();
const docsPath = join(__dirname, 'docs');
const ignorePath = [
    "node_modules",
    ".vscode",
    ".git",
    "docs",
    "introduction"
]

async function deployHTML() {
    const docs = join(__dirname, 'docs', 'html');
    const srcPath = join(__dirname, 'html');
    const srcApiPath = join(srcPath, 'api');
    let readme = String(await readFile(join(srcPath, 'readme.md'), 'utf-8'));
    await mkdir(docs);

    const apiDir = await readRecursiveDir(srcApiPath)

    for (let ad of apiDir) {
        const props = await stat(ad)
        const path = String(ad).replace(srcPath, "")
        const dirPath = join(docs, path)
        const name = basename(ad)

        
        if (props.isDirectory()) {
            await mkdir(dirPath, { recursive: true })
            readme += `## ${name}\n`
        } else {
            await copyFile(ad, dirPath)
            readme += `- [${name}](./${name})\n`
        }
    }

    const readmeHTML = markdown(readme)
    await writeFile(join(__dirname, 'docs', 'html', 'index.html'), generateHTMLDocument("Html - Fernando Ticona", readmeHTML));
}

async function generateReadme() {
    let readme = String(await readFile(join(__dirname, 'readme.md'), 'utf-8'));
    readme += "\n## Indice\n";
    const apiDir = await Promise.all((await readdir(__dirname)).map(async (x) => {
        const props = await stat(x)
        return {
            isDirectory: props.isDirectory(),
            path: x
        }
    }))
    const appDirFilter = apiDir.filter((x) => x.isDirectory && !ignorePath.includes(x.path))

    for (let a of appDirFilter) {
        if (existsSync(join(__dirname, a.path, 'readme.md'))) {
            readme += `- [${a.path}](./${a.path})\n`
        }
    }
    
    await writeFile(join(__dirname, 'docs', 'index.html'), generateHTMLDocument("Fernando Ticona aprende", markdown(readme)));
}

async function deployMain() {
    if (existsSync(docsPath)) {
        await rm(docsPath, { recursive: true });
    } 
    await mkdir(docsPath);

    try {
        await generateReadme();
        await deployHTML()        
    } catch (error) {
        console.error(error)
    }
}

deployMain();