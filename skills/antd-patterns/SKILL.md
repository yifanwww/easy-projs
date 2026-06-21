---
name: antd-patterns
description: >
  Best practices and patterns for using Ant Design (antd) with React and TypeScript. Use this skill
  whenever writing or reviewing code that uses antd components — especially Table columns, custom
  cell renderers, Modal components, and Button usage. Invoke it when the user asks about antd
  tables, modals, columns, buttons, or UI component patterns.
---

# Ant Design (antd) Patterns

Best-practice patterns for using Ant Design with React and TypeScript.

## 1. Table Columns

### Define columns outside JSX with an explicit type

Always type columns as `TableColumnType<T>[]` and define them as a `const` inside the component
(or outside if they don't depend on component state), then pass them to `<Table>`.

```tsx
import type { TableColumnType } from 'antd';
import { Table } from 'antd';

const columns: TableColumnType<Order>[] = [
  {
    key: 'id',
    title: 'ID',
    dataIndex: 'id',
  },
  {
    key: 'amount',
    title: 'Amount',
    dataIndex: 'amount',
  },
];

return <Table columns={columns} dataSource={data} rowKey="id" />;
```

**Why:** Explicit typing catches mismatches early. Defining columns outside JSX avoids re-creating
the array on every render.

## 2. Custom Cell Renderers

When a column needs a custom rendered cell, use the `render` callback. The first parameter (`_`) is
the raw cell value — ignore it with `_` when the full `record` is used instead.

```tsx
const columns: TableColumnType<Order>[] = [
  {
    key: 'status',
    title: 'Status',
    render: (_, record) => <StatusTag status={record.status} />,
  },
  {
    key: 'action',
    title: 'Action',
    align: 'center',
    width: 80,
    render: (_, record) => (
      <Button type="text" size="small" onClick={() => handleEdit(record)}>
        Edit
      </Button>
    ),
  },
];
```

**Rules:**

- Name the first argument `_` when it is unused; give it a meaningful name only when its value
  is actually read.
- Keep the renderer concise. Extract a named helper function (e.g., `renderStatus`) only when
  the JSX is too large to be readable inline.

## 3. Button — Prefer `type="text"` for CRUD Actions

For inline CRUD operations (edit, delete, view, etc.) — especially inside table action columns —
prefer `<Button type="text">`. Text buttons are visually lightweight and keep the focus on data
rather than chrome.

```tsx
<Button type="text" size="small" onClick={() => handleEdit(record)}>
    Edit
</Button>
<Button type="text" size="small" danger onClick={() => handleDelete(record)}>
    Delete
</Button>
```

**Rules:**

- Use `type="text"` for **inline / row-level** CRUD actions (table columns, list items, etc.).
- Use `type="primary"` or default type for **standalone / page-level** actions
  (e.g. "Create New Order" button outside a table).
- Pair `type="text"` with `size="small"` inside table cells for a compact look.
- Add the `danger` prop on destructive actions (delete, remove).

## 4. Modal Components — ref Pattern

Prefer **ref-based modals** over state-driven visibility props when the modal is opened
by the parent (e.g., from a table row action). This keeps modal state encapsulated and avoids
prop drilling.

### Structure

```tsx
// ExampleModal.tsx

export interface ExampleModalRef {
  open: (...args) => void; // imperative open; include any args needed to initialise the modal
}

interface ExampleModalProps {
  onSubmitted: () => void; // callback after a successful action
}

export const ExampleModal = forwardRef<ExampleModalRef, ExampleModalProps>((props, ref) => {
  const { onSubmitted } = props;

  const [isOpen, setIsOpen] = useState(false);
  // ...other state needed by the modal

  useImperativeHandle(
    ref,
    () => ({
      open: (...args) => {
        // initialise state from args
        setIsOpen(true);
      },
    }),
    [
      /* deps */
    ],
  );

  return (
    <Modal open={isOpen} onCancel={() => setIsOpen(false)} onOk={handleSubmit}>
      {/* form / content */}
    </Modal>
  );
});
```

### Usage in parent

```tsx
const exampleRef = useRef<ExampleModalRef>(null);

// inside a column renderer or button handler:
exampleRef.current?.open(record);

return (
    <>
        <Table columns={columns} ... />
        <ExampleModal ref={exampleRef} onSubmitted={mutate} />
    </>
);
```

### Naming conventions

| What                | Convention                               | Example                                       |
| ------------------- | ---------------------------------------- | --------------------------------------------- |
| Component           | `<Noun>Modal` or `<Verb><Noun>Modal`     | `AddOrderModal`, `EditOrderModal`             |
| Ref type            | `<ComponentName>Ref`                     | `AddOrderModalRef`                            |
| Props type          | `<ComponentName>Props` (keep it private) | `AddOrderModalProps`                          |
| Internal open state | `isOpen` / `open` (boolean)              | `const [isOpen, setIsOpen] = useState(false)` |

Export the **component** and its **ref type**; keep the props type unexported
(it is an implementation detail).

## 5. Form — Prefer `validateTrigger="onBlur"`

Always set `validateTrigger="onBlur"` on `<Form>`. This delays validation until the user moves
focus away from a field, rather than validating on every keystroke (`onChange`). Only override
to `"onChange"` on a specific `<Form.Item>` when real-time validation feedback is explicitly needed.

```tsx
<Form form={form} labelAlign="left" validateTrigger="onBlur">
  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
    <Input />
  </Form.Item>
</Form>
```

**Rules:**

- Set `validateTrigger="onBlur"` on every `<Form>` component.
- Only use `validateTrigger="onChange"` on individual `<Form.Item>` when instant feedback
  (e.g., password strength meter, live uniqueness check) is required.
- `onBlur` provides a less intrusive user experience while still catching errors before submission.

## 6. Quick-reference checklist

- [ ] `TableColumnType<T>[]` used for column definitions
- [ ] Columns defined as `const` (not inline in JSX)
- [ ] Unused first `render` argument named `_`
- [ ] Inline CRUD buttons use `type="text"` (table cells, list items)
- [ ] Page-level standalone buttons use `type="primary"` or default
- [ ] Destructive text buttons have the `danger` prop
- [ ] Modal uses `forwardRef` + `useImperativeHandle`
- [ ] Ref type exported alongside the component
- [ ] Props type kept unexported (private to the file)
- [ ] Modals rendered as siblings at the end of the parent's JSX, not inside table renderers
- [ ] `<Form>` sets `validateTrigger="onBlur"`
