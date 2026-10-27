type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const buttonStyle =
    "rounded border border-gray-400 px-4 py-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <nav aria-label="Sidor" className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        className={buttonStyle}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Föregående
      </button>
      <span aria-live="polite">
        Sida {page} av {totalPages}
      </span>
      <button
        type="button"
        className={buttonStyle}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Nästa
      </button>
    </nav>
  );
}
