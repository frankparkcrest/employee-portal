import { copyFile, cp, mkdir, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");

await mkdir(dist, { recursive: true });

for (const name of await readdir(root)) {
  if (!name.endsWith(".html") || name === "index.html") {
    continue;
  }

  await copyFile(join(root, name), join(dist, name));
}

for (const name of ["assets", "docs"]) {
  await cp(join(root, name), join(dist, name), { recursive: true });
}

for (const name of ["CNAME"]) {
  await copyFile(join(root, name), join(dist, name));
}

await writeFile(join(dist, ".nojekyll"), "");
