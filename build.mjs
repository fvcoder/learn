import { existsSync } from 'fs';
import { rm, mkdir, writeFile, stat, copyFile, readFile, readdir } from 'fs/promises';
import { join, basename, relative, resolve } from 'path';
import markdown from "@wcj/markdown-to-html";
import { generateHTMLDocument, readRecursiveDir } from './utils.mjs';

const __dirname = process.cwd();
const docsPath = join(__dirname, 'docs');
const ignorePath = [
    "node_modules",
    ".vscode",
    ".git",
    "docs",
    "introduction",
]

function copyFilesAndReport(basePath, path = "/") {

}

async function deployHTML() {
    const docs = join(__dirname, 'docs', 'html');
    const srcPath = join(__dirname, 'html');
    const srcApiPath = join(srcPath, 'api');
    const srcProjectPath = join(srcPath, 'api');
    let readme = String(await readFile(join(srcPath, 'readme.md'), 'utf-8'));
    await mkdir(docs);

    
    const apiDir = (await readRecursiveDir(srcPath)).filter((x) => !String(x).endsWith(".md"))
    copyFilesAndReport(srcPath, "/")

    for (let ad of apiDir) {
        const path = relative(srcPath, ad)
        const docPath = join(docs, path)
        const name = basename(ad)
        const props = await stat(ad)

        if (props.isDirectory()) {
            if (!existsSync(docPath)) {
                await mkdir(docPath, { recursive: true })
                readme += `## ${name.toUpperCase()[0]}${name.slice(1)}\n`
            }
        } else {
            const pathDir = docPath.replace(name, "")
            if (!existsSync(resolve(pathDir))) {
                await mkdir(docPath, { recursive: true })
            }
            await copyFile(ad, docPath)
            readme += `- [${name}](./${path})\n`
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
    await writeFile(join(__dirname, 'docs', 'CNAME'), "learn.fvcoder.com");
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