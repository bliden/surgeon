// @flow

import parseRegex from 'regex-parser';
import {
  vsprintf,
} from 'sprintf-js';
import {
  SurgeonError,
} from '../errors';
import {
  InvalidValueSentinel,
} from '../sentinels';
import Logger from '../Logger';

const log = Logger.child({
  namespace: 'subroutine:match',
});

const matchSubroutine = (subject: string, [userRule, sprintfFormat]: $ReadOnlyArray<string>) => {
  const rule: RegExp = parseRegex(userRule);

  if (typeof subject !== 'string') {
    throw new SurgeonError('Input is not a string.');
  }

  const matches = subject.match(rule);

  if (!matches) {
    log.debug({
      input: subject,
    }, 'input');

    return new InvalidValueSentinel('Input does not match "' + rule.toString() + '" regular expression.');
  }

  if (matches.length === 1) {
    throw new SurgeonError('Regular expression must define at least one capturing group.');
  }

  if (matches.length > 2 && !sprintfFormat) {
    throw new SurgeonError('Must define sprintf template when matching multiple groups.');
  }

  return vsprintf(sprintfFormat || '%s', matches.slice(1));
};

export default matchSubroutine;
