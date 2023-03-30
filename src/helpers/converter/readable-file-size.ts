const biByteUnits = ['B', 'kiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
const byteUnits = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
const biDivider = 1024;
const divider = 1000;
const biLog = Math.log(biDivider);
const log = Math.log10(divider);

export const bytesToHumanReadableFormat = (
  value: number,
  isBinary = true,
  units = isBinary ? biByteUnits : byteUnits,
  locale = 'en',
) => {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  if (value < 0) {
    return String(value);
  }

  value = Math.abs(value);

  const e = Math.min(units.length, Math.floor(isBinary ? Math.log(value) / biLog : Math.log10(value) / log));

  value /= Math.pow(isBinary ? biDivider : divider, e);

  return (
    value.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) +
    ' ' +
    units[e]
  );
};
