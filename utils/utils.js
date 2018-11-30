const thousandSep = (num, separator) => {
  const sep = separator || ' '
  const str = ('' + num)
    .split('')
    .reverse()
    .map((el, i) => !((i + 1) % 3) ? `${sep}${el}` : el)
    .reverse()
    .join('')
  if (str[0] === sep) {
    return str.slice(1)
  } else {
    return str
  }
}

export { thousandSep }
