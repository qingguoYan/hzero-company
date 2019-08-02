export function digitUppercase(targetNum, targetPrec) {
  let n = targetNum;
  let precision = targetPrec;
  if (n === undefined || isNaN(n)) {
    return '';
  }
  if (precision === undefined || isNaN(precision)) {
    precision = 0;
  }
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const head = n < 0 ? '负' : '';
  n = Math.abs(n);

  let end = '点';
  const number = `${n}`;
  if (n % 1 > 0) {
    const decimal = number.substring(number.indexOf('.') + 1, number.length);
    let num = '';
    for (let i = 0; i < precision; i++) {
      if (i >= decimal.length) {
        break;
      }
      num = decimal.charAt(i);
      end += digit[num];
    }

    while (end.endsWith('零')) {
      end = end.substring(0, end.length - '零'.length);
    }
  }

  if (end === '点') {
    end = '';
  }

  let s = '';
  const integer = number.indexOf('.') >= 0 ? number.substring(0, number.indexOf('.')) : number;
  if (integer === '0') {
    s = '零';
  } else {
    let result = '';
    for (let i = 0; i < integer.length; i += 4) {
      if (i + 4 >= integer.length) {
        if (s === '' && i === 0) {
          s = processNumber(integer, 0);
        } else {
          result = processNumber(integer.substring(0, integer.length - i), i / 4);
          s =
            result +
            (result === '' || s === '' || integer.charAt(integer.length - i) !== '0' ? '' : '零') +
            s;
        }
      } else {
        result = processNumber(
          integer.substring(integer.length - i - 4, integer.length - i),
          i / 4
        );
        s =
          result +
          (result === '' || s === '' || integer.charAt(integer.length - i) !== '0' ? '' : '零') +
          s;
      }
    }
  }
  return head + s + end;
}

function processNumber(numStr, endUnit) {
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['', '万', '亿', '万亿', '亿亿'], ['', '拾', '佰', '仟']];

  let result = '';
  let num = '';
  let preIsZero = false;
  for (let i = 0; i < numStr.length; i++) {
    num = numStr.charAt(i);
    const numChar = digit[num];
    if (numChar === '零' && !preIsZero) {
      preIsZero = true;
      result += numChar;
    } else if (numChar !== '零') {
      preIsZero = false;
      result += numChar + unit[1][numStr.length - i - 1];
    }
  }

  if (result === '零') {
    return '';
  }

  while (result.endsWith('零')) {
    result = result.substring(0, result.length - '零'.length);
  }

  while (result.startsWith('零')) {
    result = result.substring('零'.length, result.length);
  }

  result += unit[0][endUnit];
  return result;
}
