export function publicAsset(assetPath: string) {
  const cleanPath = assetPath.replace(/^\/+/, '');
  const base = import.meta.env.BASE_URL === './' ? '' : import.meta.env.BASE_URL;
  return `${base}${cleanPath}`;
}

export function publicCssUrl(assetPath: string) {
  return `url("${publicAsset(assetPath)}")`;
}
