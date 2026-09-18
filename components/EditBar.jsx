"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { publishFacility } from "@/lib/actions";

export default function EditBar({ facilityId, lang, dirty, guestHref, currentEditPath }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handlePublish() {
    startTransition(async () => {
      await publishFacility(facilityId);
      router.refresh();
    });
  }

  const mk = (l) => `${currentEditPath}?lang=${l}`;

  return (
    <div className="editbar">
      <a className="eb-back" href="/admin">
        ‹ {lang === "ja" ? "管理画面" : "Admin"}
      </a>
      <span className="eb-tag">{lang === "ja" ? "編集モード" : "Editing"}</span>
      <span className="langtoggle" style={{ background: "rgba(255,255,255,.12)", border: "none", boxShadow: "none" }}>
        <a href={mk("ja")} data-active={lang === "ja"} style={{ color: lang === "ja" ? "var(--ink)" : "rgba(255,255,255,.75)" }}>
          JA
        </a>
        <a href={mk("en")} data-active={lang === "en"} style={{ color: lang === "en" ? "var(--ink)" : "rgba(255,255,255,.75)" }}>
          EN
        </a>
      </span>
      <span className="eb-status">
        {dirty
          ? lang === "ja"
            ? "● 未公開の変更あり"
            : "● Unpublished changes"
          : lang === "ja"
          ? "● 公開中と同じ内容"
          : "● Matches published"}
      </span>
      <span className="eb-actions">
        <a className="eb-save" href={guestHref} target="_blank" rel="noreferrer">
          {lang === "ja" ? "公開サイトを見る" : "View live"}
        </a>
        <button className="eb-publish" onClick={handlePublish} disabled={!dirty || pending}>
          {pending ? (lang === "ja" ? "公開中…" : "Publishing…") : lang === "ja" ? "公開" : "Publish"}
        </button>
      </span>
    </div>
  );
}
