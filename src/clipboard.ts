export const hasClipboardSupport = (): boolean => {
  const hasClipboardAPI = typeof (navigator as any).clipboard !== 'undefined';
  const isNotFirefox = !navigator.userAgent.toLowerCase().includes('firefox');
  return hasClipboardAPI && isNotFirefox;
};

export const readFromClipboard = async (): Promise<string> => {
  let clipboardText = '';

  const nav = navigator as NavigatorPermissions.NavigatorPermissions;
  if (nav.permissions) {
    const result = await nav.permissions.query({name: 'clipboard-read'});
    if (result.state === 'granted' || result.state === 'prompt') {
      try {
        clipboardText = (navigator as any).clipboard.readText();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return clipboardText;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  let hasPermissions = false;

  const nav = navigator as NavigatorPermissions.NavigatorPermissions;
  if (nav.permissions) {
    const result = await nav.permissions.query({name: 'clipboard-write'});
    if (result.state === 'granted' || result.state === 'prompt') {
      try {
        (navigator as any).clipboard.writeText(text);
        hasPermissions = true;
      } catch (error) {
        console.error(error);
      }
    }
  }

  return hasPermissions;
};
