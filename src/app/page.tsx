import { getListPage } from "@/lib/contentParser";
import SeoMeta from "@/partials/SeoMeta";
import { Button, Feature } from "@/types";
import ProductHero from "@/components/ProductHero";
import ProductHeroLayout from "@/components/ProductHeroLayout";

const Home = () => {
  const homepage = getListPage("homepage/_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
  }: {
    banner: {
      title: string;
      title2: string;
      title3: string;
      image: string;
      content?: string;
      button?: Button;
    };
    features: Feature[];
  } = frontmatter;

  return (
    <>
      <SeoMeta />
      <ProductHeroLayout
        welcomeText={banner.title}
        subtitleText={banner.title2}
        sloganText={banner.title3}
      />
    </>
  );
};

export default Home;
