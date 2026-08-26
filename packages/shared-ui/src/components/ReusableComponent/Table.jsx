import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    getFilteredRowModel
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronsLeftIcon, EllipsisVertical, EyeIcon, LucideChevronsRight, MinusCircle, Pencil, Plus, PlusCircle, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import Swal from "sweetalert2"
import CallApi from "@/services/dbIntr"
import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { NavLink } from "react-router-dom"
import { EncryptText } from "@/lib/Storage"
import uuid4 from "uuid4"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export function Tables({
    isRoleWiseMenuScreen = false,
    loaderData = null,
    showFilterOnly,
    columns,
    data,
    getParticularRow,
    deleteRow,
    sorting,
    setSorting,
    btn_title,
    optimisedVersion,
    children,
    delete_api_name,
    delete_item_key,
    sub_column,
    onPreviewClick,
    hidePagination,
    key_to_search,
    is_link,
    is_mul_del,
    isDefaultPaginationEnabled,
    SCREEN_TYPE,
    hasMenu = false,
    onPresssOnWorkingDetails,
    onPresssOnLeaveDetails,
    onPresssSalaryDetails,
    onPresssReportingApprove,
    onPressDocumentDetails,
    onPresssStatusUpdate,
    isDisabledDependOnIsActive = false
}) {

    const [columnFilters, setColumnFilters] = useState(
        []
    )
    const [expanded, setExpanded] = useState({})
    const [expandedRows, setExpandedRows] = useState([])
    const table = useReactTable({
        data,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getPaginationRowModel: isDefaultPaginationEnabled ? getPaginationRowModel() : null,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            expanded,
            columnFilters
        },
        onExpandedChange: setExpanded,
        getSubRows: (row) => row?.subRows
    })

    const toggleExpand = (index) => {
        if (expandedRows.includes(index)) {
            setExpandedRows(expandedRows.filter((i) => i !== index))
        } else {
            setExpandedRows([...expandedRows, index])
        }
    }

    const deleteItem = (row, index) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--hsl(--primary))",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Ok!",
            showLoaderOnConfirm: true,
            showLoaderOnDeny: true

        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await CallApi(2, `${delete_api_name}/${row[delete_item_key]}`);
                Swal.fire({
                    title: response.request.status == 200 ? `Deleted successfully!` : `Failed to delete`,
                    text: response.request.status == 200 ? `${btn_title} has been deleted` : 'Something went wrong!! Please try again later',
                    icon: response.request.status == 200 ? "success" : "error"
                })
                if (response.request.status == 200) {
                    deleteRow(row, index);
                }
            }
        });
    }

    return (
        <div className="rounded-md space-y-3">
            {btn_title && <div className="font-PoppinsMedium border-b border-b-accent px-2 pb-2">
                <h4 className='font-PoppinsMedium text-foreground text-sm uppercase pt-2'>{btn_title}</h4>
            </div>}
            <div className='grid grid-cols-12'>
                {!showFilterOnly && <div className='col-span-12 flex items-center justify-between px-3 space-x-5'>

                    {
                        hidePagination &&
                        <Input autoComplete="off" className="!md:w-[360px] py-1 h-9 rounded-sm" placeholder="Search" name='search' type="text"
                            value={(table.getColumn(key_to_search)?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                table.getColumn(key_to_search)?.setFilterValue(event.target.value)
                            }
                        />
                    }

                    {
                        !hidePagination &&
                        <Input autoComplete="off" className="!md:w-[360px] py-1 h-9 rounded-sm" placeholder="Search" name='search' type="text" onChange={optimisedVersion} />

                    }

                    <div className="hidden md:block">
                        {children}
                    </div>
                </div>}
                {
                    showFilterOnly && <div className='col-span-12 flex items-center justify-between px-3'>
                        <Input autoComplete="off" className="!md:w-[360px] py-1 h-9  rounded-sm" placeholder="Search" name='search' type="text"
                            value={(table.getColumn(key_to_search)?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                table.getColumn(key_to_search)?.setFilterValue(event.target.value)
                            }
                        />
                        <div className="hidden md:block">
                            {children}
                        </div>
                    </div>
                }
            </div>


            <Table className="relative">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup, index) => (
                        <TableRow key={`Table_Header_row_${new Date().getTime()}_${index}`}>
                            {headerGroup.headers.map((header, id) => {
                                return (
                                    <TableHead key={`Table_header_${header.id}_${id}`} className="md:text-left sm:text-center sm:px-2 md:p-0 h-2
                                     bg-primary text-background  text-[13px] font-PoppinsMedium">
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
                        table.getRowModel().rows.map((row, index) => (
                            <React.Fragment key={uuid4()}>
                                <TableRow
                                    key={uuid4()}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className={`px-1 py-0 border border-accent  text-muted-foreground  text-[11px] font-PoppinsMedium ${cell.column.columnDef.accessorKey == 'Preview' ? 'text-center' : 'md:text-left text-center'}`}
                                            key={uuid4()}
                                        >
                                            {
                                                cell.column.columnDef.accessorKey == 'Action' &&
                                                <div className="flex flex-row items-center justify-center space-x-1 ">
                                                    {/* Render when is_link is passed as false */}
                                                    {
                                                        hasMenu && <DropdownMenu>
                                                            <DropdownMenuTrigger><EllipsisVertical size={15} color="hsl(var(--primary))" /> </DropdownMenuTrigger>
                                                            <DropdownMenuContent>
                                                                <DropdownMenuItem className="text-xs"
                                                                    onClick={() => onPresssOnWorkingDetails(cell.row.original)}
                                                                >Working Details</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-xs"
                                                                    onClick={() => onPresssOnLeaveDetails(cell.row.original)}
                                                                >Leave Details</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-xs"
                                                                    onClick={() => onPresssSalaryDetails(cell.row.original)}
                                                                >Salary Details</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-xs"
                                                                    onClick={() => onPresssReportingApprove(cell.row.original)}
                                                                >Reporting Approve</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-xs"
                                                                    onClick={() => onPressDocumentDetails(cell.row.original)}
                                                                >Document Details</DropdownMenuItem>
                                                                <DropdownMenuItem className="text-xs"
                                                                    onClick={() => onPresssStatusUpdate(cell.row.original)}
                                                                >Employee Status Update</DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    }
                                                    {
                                                        isRoleWiseMenuScreen ? <NavLink to={EncryptText(cell.row.original[delete_item_key]?.toString())}><Button variant="ghost" size="icon" className="rounded-full">
                                                            <Pencil className="h-[1rem] w-[1rem]  transition-all" />
                                                        </Button>
                                                        </NavLink> : <>
                                                            {(!is_link && loaderData && loaderData?.isEdit) && <Button variant="ghost" size="icon" className="rounded-full" onClick={() => getParticularRow(cell.row.original, cell.row.index)}>
                                                                <Pencil className="h-[1rem] w-[1rem]  transition-all text-secondary-foreground/55" />
                                                            </Button>}
                                                            {
                                                                (is_link && loaderData && loaderData?.isEdit) ? (isDisabledDependOnIsActive ?
                                                                    <NavLink disabled={!cell.row.original?.isActive} onClick={(e) => !cell.row.original?.isActive && e.preventDefault()} to={!cell.row.original?.isActive ? "" : EncryptText(cell.row.original[delete_item_key]?.toString())}>
                                                                        <Button disabled={!cell.row.original?.isActive} variant="ghost" size="icon" className="rounded-full">
                                                                            <Pencil className="h-[1rem] w-[1rem]  transition-all" />
                                                                        </Button>
                                                                    </NavLink>
                                                                    : <NavLink to={EncryptText(cell.row.original[delete_item_key]?.toString())}>
                                                                        <Button variant="ghost" size="icon" className="rounded-full">
                                                                            <Pencil className="h-[1rem] w-[1rem]  transition-all" />
                                                                        </Button>
                                                                    </NavLink>) : null
                                                            }
                                                        </>
                                                    }


                                                    {/* End */}

                                                    {
                                                        isRoleWiseMenuScreen ? null : (loaderData && loaderData?.isDelete) && <>
                                                            {
                                                                SCREEN_TYPE == 'S' ? <>

                                                                    {
                                                                        ((row.original?.isLockAccess && !row.original.isLock) || !row.original?.approveBy) && <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="rounded-full"
                                                                            onClick={() => deleteItem(cell.row.original, cell.row.index)}>
                                                                            <Trash className="h-[1.2rem] w-[1.2rem]  transition-all text-destructive" />
                                                                        </Button>


                                                                    }
                                                                </> : is_mul_del ? <Button variant="ghost" size="icon" className="rounded-full" onClick={() => deleteRow(cell.row.original, cell.row.index)}>
                                                                    <Trash className="h-[1.2rem] w-[1.2rem]  transition-all text-destructive" />
                                                                </Button> :
                                                                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => deleteItem(cell.row.original, cell.row.index)}>
                                                                        <Trash className="h-[1.2rem] w-[1.2rem]  transition-all text-destructive" />
                                                                    </Button>
                                                            }
                                                        </>
                                                    }

                                                </div>
                                            }
                                            {
                                                cell.column.columnDef.accessorKey === 'ActionEdit' && (
                                                    <div className="flex flex-row items-center justify-center space-x-1 ">

                                                        {/* Render when is_link is passed as false */}
                                                        {(!is_link && loaderData && loaderData?.isEdit) && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="rounded-full"
                                                                onClick={() => getParticularRow(cell.row.original, cell.row.index)}
                                                            >
                                                                <Pencil className="h-[1rem] w-[1rem] transition-all text-secondary-foreground/55" />
                                                            </Button>
                                                        )}

                                                        {/* Render when is_link is passed as true */}
                                                        {(is_link && loaderData && loaderData?.isEdit) && (
                                                            <NavLink to={EncryptText(cell.row.original[delete_item_key]?.toString())}>
                                                                <Button variant="ghost" size="icon" className="rounded-full">
                                                                    <Pencil className="h-[1rem] w-[1rem] transition-all" />
                                                                </Button>
                                                            </NavLink>
                                                        )}
                                                        {
                                                            loaderData && loaderData?.isDelete && <>
                                                                {cell.column.columnDef.showDelete !== false && (
                                                                    SCREEN_TYPE === 'S' ? (
                                                                        ((row.original?.isLockAccess && !row.original.isLock) || !row.original?.approveBy) && (
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="rounded-full"
                                                                                onClick={() => deleteItem(cell.row.original, cell.row.index)}
                                                                            >
                                                                                <Trash className="h-[1.2rem] w-[1.2rem] transition-all text-destructive" />
                                                                            </Button>
                                                                        )
                                                                    ) : is_mul_del ? (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="rounded-full"
                                                                            onClick={() => deleteRow(cell.row.original, cell.row.index)}
                                                                        >
                                                                            <Trash className="h-[1.2rem] w-[1.2rem] transition-all text-destructive" />
                                                                        </Button>
                                                                    ) : (
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="rounded-full"
                                                                            onClick={() => deleteItem(cell.row.original, cell.row.index)}
                                                                        >
                                                                            <Trash className="h-[1.2rem] w-[1.2rem] transition-all text-destructive" />
                                                                        </Button>
                                                                    )
                                                                )}

                                                            </>
                                                        }

                                                    </div>
                                                )
                                            }

                                            {
                                                cell.column.columnDef.accessorKey == 'Preview' &&
                                                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => onPreviewClick(cell.row.original, cell.row.index)}>
                                                    <EyeIcon className="h-[1rem] w-[1rem]  transition-all" />
                                                </Button>
                                            }
                                            {
                                                cell.column.columnDef.accessorKey == 'nested' ?
                                                    <div className="flex items-center justify-center gap-2 ">
                                                        <Button variant="ghost" size="icon" className=" px-1 text-primary hover:underline rounded-full" onClick={() => toggleExpand(index)}>
                                                            {expandedRows.includes(index) ? (
                                                                <MinusCircle className="h-4 w-4" />
                                                            ) : (
                                                                <PlusCircle className="h-4 w-4" />
                                                            )}

                                                        </Button>
                                                    </div> : flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                                {expandedRows.includes(index) &&
                                    <TableRow key={uuid4()}>
                                        <TableCell colSpan={columns.length} className=" p-1">
                                            <Table className="border">
                                                <TableHeader>
                                                    <TableRow className="bg-primary text-foreground hover:bg-primary">
                                                        {
                                                            sub_column.map(item => {
                                                                return <TableHead key={uuid4()} className="text-background text-left  text-[12px] py-1 h-8">{item.header}</TableHead>
                                                            })
                                                        }
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody key={`collapsible_body_${row.id}_${index}`}>
                                                    {
                                                        row.original.subRows.length > 0 ?
                                                            row.original.subRows.map((dt, j) => {
                                                                return <TableRow key={uuid4()} className="bg-muted">
                                                                    {
                                                                        sub_column.map(cell_values => {
                                                                            return <TableCell key={uuid4()} className="py-1 text-xs font-PoppinsMedium  text-muted-foreground  text-[11px]">
                                                                                {cell_values.accessorKey == 'isActive' &&
                                                                                    <Badge className={'rounded-sm text-[11px] h-5 font-PoppinsLight '} variant={dt[cell_values.accessorKey] ? "success" : "destructive"}>{dt[cell_values.accessorKey] ? 'Active' : 'InActive'}</Badge>}
                                                                                {cell_values.accessorKey == 'sl_no' ? (j + 1) : dt[cell_values.accessorKey]}
                                                                            </TableCell>
                                                                        })
                                                                    }
                                                                </TableRow>
                                                            })
                                                            :
                                                            <TableRow>
                                                                <TableCell colSpan={sub_column.length} className="h-24 text-center">
                                                                    No results.
                                                                </TableCell>
                                                            </TableRow>
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableCell>
                                    </TableRow>
                                }
                            </React.Fragment>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="text-center ">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            {
                hidePagination && <div className="flex items-center justify-end mt-2 gap-2 px-5" >

                    <Button variant="ghost" size="icon"
                        onClick={() => table.setPageIndex(0)}
                        className="rounded-full">
                        <ChevronsLeftIcon className="h-[1rem] w-[1rem]  transition-all text-primary" />
                    </Button>
                    <Button variant="default" onClick={() => {
                        table.previousPage();
                    }}
                        disabled={!table.getCanPreviousPage()} className="rounded-sm h-8 text-xs">
                        Previous
                    </Button>

                    <Button variant="default" onClick={() => {
                        table.nextPage();
                    }}
                        disabled={!table.getCanNextPage()}
                        className="rounded-sm h-8 text-xs">
                        Next
                    </Button>
                    <Button size="icon"
                        variant="ghost"
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        className="rounded-full" >
                        <LucideChevronsRight className="h-[1rem] w-[1rem]  transition-all text-primary" />
                    </Button>
                </div>
            }


        </div>
    )

}