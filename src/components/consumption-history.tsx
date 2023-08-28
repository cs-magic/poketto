import { ColumnDef } from "@tanstack/react-table"

import { SelectChatMessageForDetailView } from "@/ds"

import d from "@/lib/datetime"

/**
 * ref: Columns | TanStack Table Docs, https://tanstack.com/table/v8/docs/guide/column-defs
 */
export const consumptionHistoryColumns: ColumnDef<SelectChatMessageForDetailView>[] = [
  {
    accessorKey: "createdAt",
    header: "时间",
    cell: ({ getValue }) => (
      <div className={"whitespace-nowrap"}>{d(getValue() as string).format("YYYY-MM-DD HH:mm")}</div>
    ),
  },
  { accessorKey: "role", header: "角色" },
  {
    accessorKey: "content",
    header: "内容",
    cell: ({ getValue }) => <div className="max-h-12 overflow-auto">{getValue() as string}</div>,
  },
  {
    accessorKey: "cost",
    header: () => <div className={"whitespace-nowrap"}>消费</div>,
  },
]
