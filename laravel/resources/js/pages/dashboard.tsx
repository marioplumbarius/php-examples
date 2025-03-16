import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal, CheckCircle2, AlertTriangle, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { useState } from "react"

const data: Ticket[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    title: "Server Performance Issues",
    description: "Users reporting slow response times during peak hours",
    status: "closed",
    acknowledged: true,
    assignedTo: "sarah.tech@example.com",
    createdAt: "2024-03-10T08:00:00Z",
    updatedAt: "2024-03-12T15:30:00Z"
  },
  {
    id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    title: "Database Backup Failure",
    description: "Nightly backup process failed to complete",
    status: "closed",
    acknowledged: true,
    assignedTo: "mike.ops@example.com",
    createdAt: "2024-03-11T23:00:00Z",
    updatedAt: "2024-03-12T10:15:00Z"
  },
  {
    id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    title: "User Authentication Bug",
    description: "Some users unable to login after password reset",
    status: "in progress",
    acknowledged: true,
    assignedTo: "alex.dev@example.com",
    createdAt: "2024-03-12T09:30:00Z",
    updatedAt: "2024-03-12T14:45:00Z"
  },
  {
    id: "8f9e5bc6-3e5d-4f3c-b3e9-1d8dcf2c757e",
    title: "Memory Leak Investigation",
    description: "Application memory usage increasing over time",
    status: "closed",
    acknowledged: true,
    assignedTo: "emma.debug@example.com",
    createdAt: "2024-03-09T11:20:00Z",
    updatedAt: "2024-03-11T16:40:00Z"
  },
  {
    id: "9d3f7bd9-5b1f-4ec5-8c5d-4f4a6d47f393",
    title: "API Integration Error",
    description: "Third-party API calls failing intermittently",
    status: "open",
    acknowledged: false,
    assignedTo: "james.api@example.com",
    createdAt: "2024-03-12T16:00:00Z",
    updatedAt: "2024-03-12T16:00:00Z"
  },
]

export type Ticket = {
  acknowledged: boolean
  assignedTo: string
  createdAt: string
  description: string
  id: string
  status: "open" | "in progress" | "closed"
  title: string
  updatedAt: string
}

export const columns: ColumnDef<Ticket>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div>{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <div>{row.getValue("createdAt")}</div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => (
      <div>{row.getValue("updatedAt")}</div>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => <div className="lowercase">{row.getValue("assignedTo")}</div>,
  },
  {
    accessorKey: "acknowledged",
    header: "Acknowledged",
    cell: ({ row }) => (
      <div className="flex items-center">
        {row.getValue("acknowledged") ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Acknowledge</DropdownMenuItem>
            <DropdownMenuItem>Close</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <AppLayout>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter by title..."
              value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
