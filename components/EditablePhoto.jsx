"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadDraftPhoto, clearDraftPhoto } from "@/lib/actions";

// 編集モードで写真をクリックすると、その場でファイルを選んで差し替えられる。
export default function EditablePhoto({
  facilityId,
  slot,
  url,
  labelJa,
  labelEn,
  lang = "ja",
  className = "photoph",
}) {
  const inputRef = useRef(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleClick() {
    inputRef.current?.click();
  }

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    startTransition(async () => {
      try {
        await uploadDraftPhoto(facilityId, slot, formData);
        setError(null);
        router.refresh();
      } catch (err) {
        setError(err.message || "アップロードに失敗しました");
      }
    });
  }

  function handleClear(e) {
    e.stopPropagation();
    startTransition(async () => {
      try {
        await clearDraftPhoto(facilityId, slot);
        router.refresh();
      } catch (err) {
        setError(err.message || "削除に失敗しました");
      }
    });
  }

  return (
    <div className={className + " ez-photo"} onClick={handleClick} role="button" tabIndex={0}>
      {url ? (
        <img src={url} alt="" />
      ) : (
        <>
          <span className="icon" aria-hidden="true">
            📷
          </span>
          <span className="cap">{lang === "ja" ? labelJa || "写真は準備中です" : labelEn || "Photo coming soon"}</span>
        </>
      )}
      <span className="ez-photo-badge">
        {pending ? (lang === "ja" ? "アップロード中…" : "Uploading…") : lang === "ja" ? "写真を変更" : "Change photo"}
      </span>
      {url && (
        <button
          type="button"
          onClick={handleClear}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "rgba(0,0,0,.55)",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            width: 26,
            height: 26,
            cursor: "pointer",
          }}
          aria-label={lang === "ja" ? "写真を削除" : "Remove photo"}
        >
          ×
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {error && <p style={{ color: "var(--danger)", fontSize: 12 }}>{error}</p>}
    </div>
  );
}
