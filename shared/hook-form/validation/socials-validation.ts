export const websiteRegex =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
export const instagramLinkRegex =
  /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;

export const discordLinkRegex =
  /^(https?:\/\/)?(www\.)?(discord\.gg|discord\.com\/invite|discordapp\.com\/users)\/[a-zA-Z0-9]+\/?$/;

export const telegramLinkRegex =
  /^(https?:\/\/)?(www\.)?t\.me\/[a-zA-Z0-9_]+\/?$/;

export const mediumRegex = /^(?!http(s)?:\/\/)@?[a-z\d._]{1,}$/i;
// eslint-disable-next-line
export const siteRegex =
  /((http(s)?):\/\/)[a-z0-9_%-]+(\.[a-z0-9_%-]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9]+=[a-zA-Z0-9]+&?)?$/;
