import { useEffect } from "react";

// Sätter webbläsarens flik-titel (bra för skärmläsare och bokmärken)
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}