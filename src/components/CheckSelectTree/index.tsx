import { Form } from 'react-bootstrap';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CheckboxTree, { Node } from 'react-checkbox-tree';
import SkdfIcon from '../SkdfIcon';

const icons = {
  expandClose: <SkdfIcon name="arrow_down" className="text-placeholder" />,
  expandOpen: <SkdfIcon name="arrow_up" className="text-placeholder" />,
};

export type CheckSelectTreeProps<Option> = {
  options?: Option[];
  value?: string[];
  search?: boolean;
  placeholder?: string;
  maxHeight?: string;
  disabled?: boolean;
  onChange: (value: string[]) => void;
  getOptionValue: (option: Option) => string;
  getOptionLabel: (option: Option) => string;
  getOptionChildren: (option: Option) => Option[];
};

// Раскрытие дерева
function expandNodes(nodes: Node[]) {
  let expanded: string[] = [];
  nodes.forEach((node) => {
    if (node.children) {
      expanded = [...expanded, node.value, ...expandNodes(node.children)];
    }
  });
  return expanded;
}

// Преобразование дерева
function treeTransform<Option>(
  options: Option[],
  getOptionValue: (option: Option) => string,
  getOptionLabel: (option: Option) => string,
  getOptionChildren: (option: Option) => Option[]
): Node[] {
  return options.map((item: Option) => {
    if (getOptionChildren(item).length > 0) {
      return {
        value: String(getOptionValue(item)), // String() used to remove key warning bug
        label: getOptionLabel(item),
        children: treeTransform(getOptionChildren(item), getOptionValue, getOptionLabel, getOptionChildren),
      };
    } else {
      return {
        value: String(getOptionValue(item)),
        label: getOptionLabel(item),
      };
    }
  });
}

function CheckSelectTree<Option>({
  options = [],
  value = [],
  search,
  placeholder,
  maxHeight = '16.75rem',
  disabled,
  onChange,
  getOptionValue,
  getOptionLabel,
  getOptionChildren,
}: CheckSelectTreeProps<Option>) {
  const [nodes, setNodes] = useState<Node[]>(treeTransform(options, getOptionValue, getOptionLabel, getOptionChildren));
  const [expanded, setExpanded] = useState<string[]>(nodes?.length > 0 ? expandNodes(nodes) : []);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  useEffect(() => {
    setNodes(treeTransform(options, getOptionValue, getOptionLabel, getOptionChildren));
  }, [getOptionChildren, getOptionLabel, getOptionValue, options]);

  const treeSearch = useCallback((nodes: Node[], query: string) => {
    nodes.forEach((node: Node) => {
      if (Array.isArray(node.children) && node.children.length > 0) {
        const children = treeSearch(node.children, query);
        if (children.some((n) => !n.disabled)) {
          node.className = '';
          node.disabled = false;
          return;
        }
      }
      if (String(node.label).toLowerCase().includes(query)) {
        node.className = '';
        node.disabled = false;
        setIsNotFound(false);
      } else {
        node.className = 'd-none';
        node.disabled = true;
      }
    });

    return [...nodes];
  }, []);

  const searchOptions = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value.toLowerCase();
    if (nodes && text.length > 1) {
      setIsNotFound(true);
      setNodes(treeSearch(nodes, text));
    } else {
      setIsNotFound(false);
      setNodes(treeTransform(options, getOptionValue, getOptionLabel, getOptionChildren));
    }
  };

  return (
    <Form>
      {search ? (
        <Form.Control
          type="search"
          size="sm"
          placeholder={placeholder}
          onChange={searchOptions}
          className="mb-3"
          disabled={disabled}
        />
      ) : null}
      <div className="mb-3 border-bottom">
        {nodes && nodes.length > 0 && !isNotFound ? (
          <div className="overflow-auto pb-2.5" style={{ maxHeight: maxHeight }}>
            <CheckboxTree
              nodes={nodes}
              disabled={disabled}
              expandOnClick={true}
              checkModel="all"
              checked={value}
              expanded={expanded}
              onCheck={onChange}
              onExpand={setExpanded}
              icons={icons}
            />
          </div>
        ) : (
          <span className="d-block pb-4 text-muted">Не найдено</span>
        )}
      </div>
    </Form>
  );
}

export default CheckSelectTree;
