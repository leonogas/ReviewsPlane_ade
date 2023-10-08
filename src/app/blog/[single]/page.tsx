import BlogCardInside from "@/components/BlogCardInside";
import Pagination from "@/components/Pagination";
import config from "@/config/config.json";
import { getListPage, getListPage3, getSinglePage } from "@/lib/contentParser";
import { getAllTaxonomy, getTaxonomy } from "@/lib/taxonomyParser";
import { sortByDate } from "@/lib/utils/sortFunctions";
import PageHeader from "@/partials/PageHeader";
import PostSidebar from "@/partials/PostSidebar";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
//import { usePathname } from "next/navigation";

const { blog_folder, pagination } = config.settings;

// for all regular pages
const PostSingle = ({ params }: { params: { single: string } }) => {
  const postIndex: Post = getListPage(
    `${blog_folder}/${params.single}/_index.md`
  );
  const { title, meta_title, description, image } = postIndex.frontmatter;
  const tempFolder = `${blog_folder}/${params.single}`;
  const posts: Post[] = getSinglePage(tempFolder);
  const allCategories = getAllTaxonomy(tempFolder, "categories");
  const categories = getTaxonomy(tempFolder, "categories");
  const tags = getTaxonomy(tempFolder, "tags");
  const sortedPosts = sortByDate(posts);
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = sortedPosts.slice(0, pagination);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />

      <PageHeader title={postIndex.frontmatter.title} />

      <section className="section">
        <div className="container">
          <div className="row gx-5">
            <div className="lg:col-12">
              <div className="row">
                {currentPosts.map((post: any, index: number) => (
                  <div key={index} className="mb-14 md:col-6">
                    <BlogCardInside data={post} cat={params.single} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;
