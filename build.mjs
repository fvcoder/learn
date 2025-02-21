import { existsSync } from 'fs';
import { rm, mkdir, writeFile, stat, copyFile, readFile, readdir } from 'fs/promises';
import { join, basename } from 'path';
import markdown from "@wcj/markdown-to-html";
import { generateHTMLDocument, readRecursiveDir } from './utils.mjs';

const __dirname = process.cwd();
const distPath = join(__dirname, 'dist');
const ignorePath = [
    "node_modules",
    ".vscode",
    ".git",
    "dist",
    "introduction"
]

async function deployHTML() {
    const dist = join(__dirname, 'dist', 'html');
    const srcPath = join(__dirname, 'html');
    const srcApiPath = join(srcPath, 'api');
    let readme = String(await readFile(join(srcPath, 'readme.md'), 'utf-8'));
    await mkdir(dist);

    const apiDir = await readRecursiveDir(srcApiPath)

    for (let ad of apiDir) {
        const props = await stat(ad)
        const path = String(ad).replace(srcPath, "")
        const dirPath = join(dist, path)
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
    await writeFile(join(__dirname, 'dist', 'html', 'index.html'), generateHTMLDocument("Html - Fernando Ticona", readmeHTML));
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
    
    await writeFile(join(__dirname, 'dist', 'index.html'), generateHTMLDocument("Fernando Ticona aprende", markdown(readme)));
}

async function deployMain() {
    if (existsSync(distPath)) {
        await rm(distPath, { recursive: true });
    } 
    await mkdir(distPath);

    try {
        await generateReadme();
        await deployHTML()        
    } catch (error) {
        console.error(error)
    }
}

deployMain();