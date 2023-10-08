import { Post } from "@/types";
import fs from "fs";
import { readdir } from "fs/promises";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

const contentPath = "src/content";
interface PageData {
  frontmatter: Record<string, any>; // Update this with your frontmatter structure
  content: string;
}

// Helper function to read file content
const readFile = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8");
};

// Helper function to parse frontmatter
const parseFrontmatter = (frontmatter: any) => {
  const frontmatterString = JSON.stringify(frontmatter);
  return JSON.parse(frontmatterString);
};

// get list page data, ex: _index.md
export const getListPage = (filePath: string) => {
  const pageDataPath = path.join(contentPath, filePath);

  if (!fs.existsSync(pageDataPath)) {
    notFound();
  }

  const pageData = readFile(pageDataPath);
  const { content, data: frontmatter } = matter(pageData);

  return {
    frontmatter: parseFrontmatter(frontmatter),
    content,
    path: filePath,
  };
};

// get list page data, ex: _index.md
export const getListPage2 = (filePath: string) => {
  const folderPath = path.join(contentPath, "/blog");

  // Check if the folderPath exists
  if (!fs.existsSync(folderPath)) {
    notFound();
  }

  const allPages: Post[] = [];

  // Define a recursive function to search for .md files in the specified folder and its subfolders
  const findMdFiles = (currentFolderPath: string) => {
    // Get a list of all files in the current folder
    const filesInFolder = fs.readdirSync(currentFolderPath);

    // Loop through each file in the folder
    for (const file of filesInFolder) {
      const filePath = path.join(currentFolderPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        // If it's a subfolder, recursively search within it
        findMdFiles(filePath);
      } else if (
        file === "_index.md" &&
        filePath !== "src/content/blog/_index.md"
      ) {
        // If it's an _index.md file, read its content
        const pageData = fs.readFileSync(filePath, "utf8");
        const { content, data: frontmatter } = matter(pageData);
        const slug = path.dirname(frontmatter.image).split(path.sep).pop();

        allPages.push({
          frontmatter: parseFrontmatter(frontmatter),
          slug,
          content,
          path: currentFolderPath,
        });
      }
    }
  };

  // Start the recursive search from the specified folderPath
  findMdFiles(folderPath);

  return allPages;
};
// get list page data, ex: _index.md
export const getListPage3 = (filePath: string) => {
  const folderPath = path.join(contentPath, "/blog");

  // Check if the folderPath exists
  if (!fs.existsSync(folderPath)) {
    notFound();
  }

  const allPages: Post[] = [];

  // Define a recursive function to search for .md files in the specified folder and its subfolders
  const findMdFiles = (currentFolderPath: string) => {
    // Get a list of all files in the current folder
    const filesInFolder = fs.readdirSync(currentFolderPath);

    // Loop through each file in the folder
    for (const file of filesInFolder) {
      const filePath = path.join(currentFolderPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        // If it's a subfolder, recursively search within it
        findMdFiles(filePath);
      } else if (
        file === "_index.md" &&
        filePath !== "src/content/blog/_index.md"
      ) {
        // If it's an _index.md file, read its content
        const pageData = fs.readFileSync(filePath, "utf8");
        const { content, data: frontmatter } = matter(pageData);
        const slug = path.dirname(frontmatter.image).split(path.sep).pop();

        allPages.push({
          frontmatter: parseFrontmatter(frontmatter),
          slug,
          content,
          path: filePath,
        });
      }
    }
  };

  // Start the recursive search from the specified folderPath
  findMdFiles(folderPath);

  return allPages;
};

export const getListPagesFromSubfolders = (folderName: string) => {
  const folderPath = path.join(contentPath, folderName);

  if (!fs.existsSync(folderPath)) {
    notFound();
  }

  const listPages: PageData[] = []; // Specify the type of listPages

  // Define a recursive function to search for _index.md files
  const findIndexMdFiles = (currentFolderPath: string) => {
    const entries = fs.readdirSync(currentFolderPath);

    for (const entry of entries) {
      const entryPath = path.join(currentFolderPath, entry);
      const isDirectory = fs.statSync(entryPath).isDirectory();

      if (isDirectory) {
        // If it's a directory, recursively search within it
        findIndexMdFiles(entryPath);
      } else if (entry === "_index.md") {
        // If it's an _index.md file, read its content
        const pageData = fs.readFileSync(entryPath, "utf8");
        const { content, data: frontmatter } = matter(pageData);

        listPages.push({
          frontmatter: parseFrontmatter(frontmatter),
          content,
        });
      }
    }
  };

  // Start the recursive search from the specified folder
  findIndexMdFiles(folderPath);

  return listPages;
};

export const forFuture = (basePath: string) => {
  // Create an array to store the data from all folders
  const allData = [];

  // Get a list of all directories (categories)
  const categories = fs
    .readdirSync(path.join(contentPath, basePath), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Loop through each category folder
  for (const category of categories) {
    // Construct the path to the _index.md file in the category folder
    const indexPath = path.join(
      path.join(contentPath, basePath),
      category,
      "_index.md"
    );

    // Check if the _index.md file exists for this category
    if (fs.existsSync(indexPath)) {
      // Read the content of _index.md
      const fileContents = fs.readFileSync(indexPath, "utf8");

      // Parse the frontmatter (if used) and content
      const { data, content } = matter(fileContents);

      // Add the data to the allData array
      allData.push({
        category,
        type: "index", // Indicate that this is from _index.md
        data, // frontmatter data
        content, // content of _index.md
      });
    }

    // Construct the path to the products folder for this category
    const productsPath = path.join(path.join(contentPath, basePath), category);

    // List all files in the category folder (including products)
    const filesInCategory = fs.readdirSync(productsPath);

    // Filter out any non-Markdown files and _index.md
    const productFiles = filesInCategory.filter((file) => {
      return (
        file.endsWith(".md") &&
        !file.startsWith("_index") &&
        file !== "_index.md"
      );
    });

    // Add the product files to the allData array
    for (const productFile of productFiles) {
      allData.push({
        category,
        type: "product", // Indicate that this is a product
        product: productFile, // name of the product file
      });
    }
  }

  return allData;
};

// get all single pages, ex: blog/post.md
export const getSinglePage = (folder: string) => {
  const folderPath = path.join(contentPath, folder);

  if (!fs.existsSync(folderPath) || !fs.lstatSync(folderPath).isDirectory()) {
    notFound();
  }

  const filesPath = fs.readdirSync(folderPath);
  const sanitizeFiles = filesPath.filter((file) => file.endsWith(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );

  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");
    const filePath = path.join(folderPath, filename);
    const pageData = readFile(filePath);
    const { content, data: frontmatter } = matter(pageData);
    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return {
      frontmatter: parseFrontmatter(frontmatter),
      slug: url,
      content,
      path: filePath.replaceAll("src/content/", "").replaceAll(".md", ""),
    };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.frontmatter.draft && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.frontmatter.date || new Date()) <= new Date()
  );

  return filterByDate;
};
