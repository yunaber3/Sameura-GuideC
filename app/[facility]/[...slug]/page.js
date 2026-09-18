import { notFound } from "next/navigation";
import { getProperty, getPublishedContent, getByPath } from "@/lib/content";
import { isAdminRequest } from "@/lib/session";
import { normalizeLang } from "@/lib/t";
import { getPageSchema } from "@/lib/pageSchemas";
import PageHeader from "@/components/PageHeader";
import EditPageFab from "@/components/EditPageFab";
import GuestBlocks from "@/components/blocks/GuestBlocks";

// lib/pageSchemas.js に登録された全ページを、この1ファイルだけで表示します。
// 新しいページを増やすときは、pageSchemas.js に定義を足すだけで、
// ここのコードは変更不要です。
export default async function GenericGuestPage({ params, searchParams }) {
  const facilityId = params.facility;
  const slugPath = (params.slug || []).join("/");
  const lang = normalizeLang(searchParams?.lang);

  const schema = getPageSchema(slugPath);
  if (!schema) notFound();

  const [prop, content, admin] = await Promise.all([
    getProperty(facilityId),
    getPublishedContent(facilityId),
    isAdminRequest(),
  ]);
  if (!prop || !content) notFound();

  const pageKey = params.slug[params.slug.length - 1];
  const pageData = content.pages?.[pageKey] || {};
  const backHref = schema.backTo
    ? `/${facilityId}/${schema.backTo}?lang=${lang}`
    : `/${facilityId}?lang=${lang}`;

  return (
    <div className="page">
      <PageHeader facilityId={facilityId} lang={lang} backHref={backHref} currentPath={`/${facilityId}/${slugPath}`} />
      <div className="pagehead">
        <div className="en-label">{schema.enLabel}</div>
        <h1>{lang === "ja" ? schema.titleJa : schema.titleEn}</h1>
      </div>
      <GuestBlocks blocks={schema.blocks} pageData={pageData} lang={lang} content={content} />
      <div className="pagefoot">
        <a href={`/${facilityId}/help?lang=${lang}`}>{lang === "ja" ? "困ったとき" : "Need help?"}</a>
      </div>
      {admin && <EditPageFab editHref={`/admin/${facilityId}/edit/${slugPath}?lang=${lang}`} lang={lang} />}
    </div>
  );
}
