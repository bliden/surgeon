// @flow

import parseRegex from 'regex-parser';
import {
  SurgeonError,
} from '../errors';
import {
  InvalidValueSentinel,
} from '../sentinels';

const testSubroutine = (subject: string, [userRule]: $ReadOnlyArray<string>) => {
  const rule: RegExp = parseRegex(userRule);

  if (typeof subject !== 'string') {
    throw new SurgeonError('Input is not a string.');
  }

  if (!rule.test(subject)) {
    return new InvalidValueSentinel('Input does not match "' + rule.toString() + '" regular expression.');
  }

  return subject;
};

export default testSubroutine;
