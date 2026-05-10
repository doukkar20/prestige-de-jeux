export function publicAsset(assetPath: string) {
  const cleanPath = assetPath.replace(/^\/+/, '');
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export function publicCssUrl(assetPath: string) {
  return `url("${publicAsset(assetPath)}")`;
}
