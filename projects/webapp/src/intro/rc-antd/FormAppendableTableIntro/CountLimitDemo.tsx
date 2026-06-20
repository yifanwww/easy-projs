import { FormAppendableTable } from '@easy-lib/rc-antd';
import { Form, Input, Select } from 'antd';

export function CountLimitDemo() {
  return (
    <Form>
      <Form.Item label="Table">
        <FormAppendableTable
          name="table"
          columns={[
            {
              key: 'key',
              title: 'Key',
              width: '50%',
              render: (_, field) => (
                <Form.Item name={[field.name, 'key']}>
                  <Input placeholder="Key" />
                </Form.Item>
              ),
            },
            {
              key: 'operator',
              title: 'Operator',
              width: 100,
              render: (_, field) => (
                <Form.Item name={[field.name, 'operator']} initialValue="==">
                  <Select
                    options={[
                      { label: '==', value: '==' },
                      { label: '!=', value: '!=' },
                    ]}
                  />
                </Form.Item>
              ),
            },
            {
              key: 'value',
              title: 'Value',
              width: '50%',
              render: (_, field) => (
                <Form.Item name={[field.name, 'value']}>
                  <Input placeholder="Value" />
                </Form.Item>
              ),
            },
          ]}
          limit={3}
        />
      </Form.Item>
    </Form>
  );
}
