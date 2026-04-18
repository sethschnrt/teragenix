import { publicProducts, getPublicProductBySlug } from "@/data/products";
import { ProductDetail } from "./product-detail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return publicProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getPublicProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Teragenix`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getPublicProductBySlug(slug);
  if (!product) notFound();

  const related = product.relatedProductSlugs
    .map((s) => getPublicProductBySlug(s))
    .filter(Boolean) as NonNullable<ReturnType<typeof getPublicProductBySlug>>[];

  return <ProductDetail product={product} relatedProducts={related} />;
}
