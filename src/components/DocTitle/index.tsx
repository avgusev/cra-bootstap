import { useEffect } from 'react';

const defaultTitle = 'Система контроля дорожных фондов – СКДФ';

function DocTitle({ title, exact = false }: { title?: string; exact?: boolean }) {
  useEffect(() => {
    if (title) {
      document.title = exact ? title : `${title} | СКДФ`;
    } else {
      document.title = defaultTitle;
    }

    return () => {
      document.title = defaultTitle;
    };
  }, [title, exact]);

  return null;
}

export default DocTitle;
