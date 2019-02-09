export const hasClipboardSupport = () => {
  const hasClipboardAPI = typeof (navigator as any).clipboard !== 'undefined';
  const isNotFirefox = !navigator.userAgent.toLowerCase().includes('firefox');
  return hasClipboardAPI && isNotFirefox;
};

export const readFromClipboard = async () => {
  const nav = navigator as NavigatorPermissions.NavigatorPermissions;
  if (nav.permissions) {
    const result = await nav.permissions.query({name: 'clipboard-read'});
    if (result.state === 'granted' || result.state === 'prompt') {
      return (navigator as any).clipboard.readText();
    }
  }
};

export const copyToClipboard = async (text: string) => {
  const nav = navigator as NavigatorPermissions.NavigatorPermissions;
  if (nav.permissions) {
    const result = await nav.permissions.query({name: 'clipboard-write'});
    if (result.state === 'granted' || result.state === 'prompt') {
      (navigator as any).clipboard.writeText(text);
      return true;
    }
  }
  return false;
};
