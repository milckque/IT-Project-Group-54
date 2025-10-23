import { useState, useMemo, Fragment } from "react";
import type { TreeNode } from "./tree";
import type { Categories } from "../../types/api";

type CategoryTreeNodeValue = {
  id: number
  category_name: string
  parent_id: number | null
}

interface CategoryTreeNode extends TreeNode<CategoryTreeNodeValue> {}

interface CategoryTreeFilterProps {
  categories?: Categories[]
  value: number[]
  onChange: (categoryId: number) => void
}

// Build tree structure from flat category array
const buildCategoryTree = (categories: Categories[] | undefined): CategoryTreeNode => {
  try {
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return {
        value: {
          id: 0,
          category_name: 'All Categories',
          parent_id: null,
        },
        children: [],
      }
    }

    const categoryMap = new Map<number, CategoryTreeNode>()

    // Create nodes for all categories
    categories.forEach((cat) => {
      categoryMap.set(cat.id, {
        value: {
          id: cat.id,
          category_name: cat.category_name,
          parent_id: cat.parent_id,
        },
        children: [],
      })
    })

    // Build tree structure
    const rootChildren: CategoryTreeNode[] = []
    categoryMap.forEach((node, id) => {
      const parentId = node.value.parent_id
      if (parentId === null || parentId === undefined) {
        rootChildren.push(node)
      } else {
        const parent = categoryMap.get(parentId)
        if (parent) {
          parent.children.push(node)
        }
      }
    })

    return {
      value: {
        id: 0,
        category_name: 'All Categories',
        parent_id: null,
      },
      children: rootChildren,
    }
  } catch (error) {
    console.error('Error building category tree:', error)
    return {
      value: {
        id: 0,
        category_name: 'All Categories',
        parent_id: null,
      },
      children: [],
    }
  }
}

export function CategoryTreeFilter({
  categories,
  value,
  onChange,
}: CategoryTreeFilterProps) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())
  const tree = useMemo(() => buildCategoryTree(categories), [categories])

  const toggleExpanded = (id: number) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  const recursiveRender = (node: CategoryTreeNode, depth: number = 0) => {
    const isSelected = value.length > 0 && value[0] === node.value.id
    const hasChildren = node.children && node.children.length > 0
    const isExpanded = expandedIds.has(node.value.id)

    // For root node, always show children
    if (node.value.id === 0) {
      return (
        <div>
          {node.children.map((child) =>
            recursiveRender(child, depth)
          )}
        </div>
      )
    }

    return (
      <div key={`cat-${node.value.id}`}>
        <div
          style={{
            paddingLeft: `${depth * 16}px`,
            paddingTop: '4px',
            paddingBottom: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
            transition: 'background-color 0.1s',
          }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleExpanded(node.value.id);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                width: '16px',
                textAlign: 'center',
                fontSize: '12px',
              }}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {!hasChildren && <div style={{ width: '16px' }} />}
          <input
            type="radio"
            checked={isSelected}
            onChange={() => onChange(node.value.id)}
            onClick={(e) => e.stopPropagation()}
            style={{
              cursor: 'pointer',
            }}
          />
          <span>{node.value.category_name}</span>
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child) =>
              recursiveRender(child, depth + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return <div>{recursiveRender(tree)}</div>
}