import React, { useEffect, useState, useRef } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button'
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const PaginationTbleComponent = ({
    totalRecords,
    payload,
    onPainateClick,
    setPayload
}) => {

    const lastPageRef = useRef(null);
    const { start, length } = payload;

    // 👉 Calculations
    const currentPage = Math.floor(start / length) + 1;
    const totalPages = Math.ceil(totalRecords / length) || 1;

    const from = totalRecords === 0 ? 0 : start + 1;
    const to = Math.min(start + length, totalRecords);

    // ✅ Controlled Jump Input
    const [jumpPage, setJumpPage] = useState(currentPage);

    // 🔁 Sync input with pagination (VERY IMPORTANT)
    useEffect(() => {
        setJumpPage(currentPage);
    }, [currentPage]);

    // 👉 Change page size
    const handlePageSizeChange = (value) => {
        setPayload(prev => ({
            ...prev,
            start: 0,
            length: Number(value)
        }));
    };

    // 👉 Jump to page (validated)
    const handleJump = (page) => {
        let pageNumber = Number(page);

        if (!pageNumber) return;

        if (pageNumber < 1) pageNumber = 1;
        if (pageNumber > totalPages) pageNumber = totalPages;

        // ✅ Prevent blocking same value
        if (lastPageRef.current === pageNumber) {
            // force re-run anyway
            setPayload(prev => ({
                ...prev,
                start: (pageNumber - 1) * prev.length
            }));
        } else {
            setPayload(prev => ({
                ...prev,
                start: (pageNumber - 1) * prev.length
            }));
        }

        lastPageRef.current = pageNumber;

        setJumpPage(pageNumber);
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-3 mt-2">

            

            <Pagination>
                <PaginationContent className="flex items-center gap-2">

                    {/* First */}
                    <PaginationItem>
                        <Button
                            disabled={start === 0}
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => onPainateClick('1')}
                        >
                            <ChevronsLeft className="h-[1rem] w-[1rem] text-primary" />
                        </Button>
                    </PaginationItem>

                    {/* Prev */}
                    <PaginationItem>
                        <Button
                            variant="outline"
                            disabled={start === 0}
                            className="h-8 px-3 text-xs"
                            onClick={() => onPainateClick('P')}
                        >
                            Prev
                        </Button>
                    </PaginationItem>

                    {/* 📄 Page Info */}
                    <PaginationItem>
                        <span className="text-xs px-2">
                            Page <b>{currentPage}</b> of <b>{totalPages}</b>
                        </span>
                    </PaginationItem>

                    {/* 🔽 Page Size */}
                    <PaginationItem>
                        <Select
                            value={length.toString()}
                            onValueChange={handlePageSizeChange}
                        >
                            <SelectTrigger className="w-[90px] h-8 text-xs">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                                <SelectItem value="500">500</SelectItem>
                            </SelectContent>
                        </Select>
                    </PaginationItem>

                    {/* 🔢 Jump Input (FIXED) */}
                    <PaginationItem>
                        <Input
                            type="number"
                            min={1}
                            max={totalPages}
                            value={jumpPage}
                            onChange={(e) => setJumpPage(e.target.value)}

                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleJump(jumpPage);
                                }
                            }}

                            onBlur={() => handleJump(jumpPage)}
                        />
                    </PaginationItem>

                    {/* Next */}
                    <PaginationItem>
                        <Button
                            variant="outline"
                            disabled={(start + length) >= totalRecords}
                            className="h-8 px-3 text-xs"
                            onClick={() => onPainateClick('N')}
                        >
                            Next
                        </Button>
                    </PaginationItem>

                    {/* Last */}
                    <PaginationItem>
                        <Button
                            disabled={(start + length) >= totalRecords}
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => onPainateClick('2')}
                        >
                            <ChevronsRight className="h-[1rem] w-[1rem] text-primary" />
                        </Button>
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
            <div className="text-xs text-muted-foreground">
                Showing <span className="font-medium">{from}</span>–
                <span className="font-medium">{to}</span> of{" "}
                <span className="font-medium">{totalRecords}</span>
            </div>
        </div>
    )
}

export default PaginationTbleComponent;