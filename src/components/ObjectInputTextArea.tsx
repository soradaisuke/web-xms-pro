import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { isPlainObject, trim } from 'lodash';
import React, { useCallback, useMemo } from 'react';

export type ObjectInputTextAreaProps = TextAreaProps & {
  value?: string | object;
  onChange?: (value: string | object) => void;
};

function ObjectInputTextArea({ value: propValue, onChange: propOnChange, ...restProps }: ObjectInputTextAreaProps) {
  const value = useMemo<string>(() => isPlainObject(propValue) ? JSON.stringify(propValue) : propValue as string, [
    propValue,
  ]);

  const onChange = useCallback((e) => {
    try {
      const result = JSON.parse(trim(e.target.value));
      if (!isPlainObject(result)) {
        throw new Error();
      }
      propOnChange(result);
    } catch (error) {
      propOnChange(e.target.value as string);
    }
  }, [propOnChange]);

  return (
    <Input.TextArea
      {...restProps}
      value={value}
      onChange={onChange}
    />
  );
}

ObjectInputTextArea.defaultProps = {
  value: null,
  onChange: null,
};

export default React.memo(ObjectInputTextArea);
