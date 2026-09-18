const PATHS = {
  car: '<path d="M4 16l1.5-5a2 2 0 0 1 1.9-1.4h9.2A2 2 0 0 1 18.5 11l1.5 5"/><rect x="3" y="16" width="18" height="4" rx="1.5"/><circle cx="7.5" cy="20" r="1.3"/><circle cx="16.5" cy="20" r="1.3"/>',
  home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
  leaf: '<path d="M6 18C6 10 12 5 19 5c0 7-5 13-13 13Z"/><path d="M6 18c2-4 5-7 9-9"/>',
  mappin: '<path d="M12 21s7-7.2 7-12a7 7 0 0 0-14 0c0 4.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/>',
  clipboard: '<rect x="6" y="4" width="12" height="16" rx="2"/><rect x="9" y="2.5" width="6" height="3" rx="1"/><path d="M9 11h6M9 14.5h6M9 8h3"/>',
  key: '<circle cx="8" cy="15" r="3.3"/><path d="M10.4 12.6 18 5"/><path d="M15.4 7.6 18 10.2M18 5l2.3 2.3"/>',
};

export default function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: PATHS[name] || "" }}
    />
  );
}
