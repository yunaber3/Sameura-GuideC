import { notFound } from "next/navigation";
import { getProperty, getContentStatus } from "@/lib/content";
import { normalizeLang } from "@/lib/t";
import { getPageSchema } from "@/lib/pageSchemas";
import EditBar from "@/components/EditBar";
import EditBlocks from "@/components/blocks/EditBlocks";

export default async function GenericEditPage({ params, searchParams }) {
  const facilityId = params.facility;
  const slugPath = (params.slug || []).join("/");
  const lang = normalizeLang(searchParams?.lang);

  const schema = getPageSchema(slugPath);
  if (!schema) notFound();

  const [prop, status] = await Promise.all([getProperty(facilityId), getContentStatus(facilityId)]);
  if (!prop || !status) notFound();

  const content = status.draft;
  const pageKey = params.slug[params.slug.length - 1];
  const pageData = content.pages?.[pageKey] || {};
  const guestBackPath = schema.backTo || "";

  return (
    <div className="page">
      <EditBar
        facilityId={facilityId}
        lang={lang}
        dirty={status.dirty}
        guestHref={`/${facilityId}/${slugPath}?lang=${lang}`}
        currentEditPath={`/admin/${facilityId}/edit/${slugPath}`}
      />
      <div className="pagehead">
        <div className="en-label">{schema.enLabel}</div>
        <h1>{lang === "ja" ? schema.titleJa : schema.titleEn}</h1>
      </div>
      <EditBlocks
        blocks={schema.blocks}
        pageData={pageData}
        lang={lang}
        content={content}
        facilityId={facilityId}
        pageKey={pageKey}
      />
    </div>
  );
}
