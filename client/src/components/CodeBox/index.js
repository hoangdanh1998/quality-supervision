import React from 'react'

function CodeBox() {
  return (
    <div className='px-1'>
      <h3>Test Code</h3>
      <pre>
        <code>
          {`
  import {describe, expect, test} from '@jest/globals';
  import {sum} from './sum';

  describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });
          `}
        </code>
      </pre>
    </div>
  )
}

export default CodeBox