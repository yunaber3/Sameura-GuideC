"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { saveDraftField } from "@/lib/actions";

// 編集モードでクリック/タップするとその場で書き換えられるテキスト。
// blur(フォーカスが外れた瞬間)に下書きへ自動保存します。
// multiline=true の場合は改行を保持するブロック要素として表示します。
export default function EditableText({
  facilityId,
  path,
  initialValue,
  placeholder,
  multiline = false,
  as: Tag = multiline ? "div" : "span",
}) {
  const [value, setValue] = useState(initialValue || "");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const router = useRouter();

  function handleBlur(e) {
    const text = (e.target.innerText || "").replace(/\n+$/, "");
    if (text === value) return;
    setValue(text);
    startTransition(async () => {
      try {
        await saveDraftField(facilityId, path, text);
        setError(null);
        // 公開状態インジケーター(未公開の変更あり/公開中)を最新化するため、
        // サーバーコンポーネントのデータを再取得する。フォーカスは外れた
        // 直後なので、入力中の体験は妨げない。
        router.refresh();
      } catch (err) {
        setError(err.message || "保存に失敗しました");
      }
    });
  }

  function handleKeyDown(e) {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  }

  return (
    <>
      <Tag
        ref={ref}
        className={multiline ? "ez ez-block" : "ez"}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder || ""}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {value}
      </Tag>
      {error && (
        <span style={{ display: "block", fontSize: 11, color: "var(--danger)" }}>{error}</span>
      )}
    </>
  );
}
