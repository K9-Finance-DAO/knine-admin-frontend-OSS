const getDomainFromUrl = (url) => {
  const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/i

  return domainRegex.exec(url)?.[1] ?? null
};

export default getDomainFromUrl
