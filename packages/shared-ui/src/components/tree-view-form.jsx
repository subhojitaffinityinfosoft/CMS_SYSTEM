'use client';
import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronRight, Edit, Pencil, Plus, Trash2, Trash2Icon } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';

const treeVariants = cva(
    'group hover:before:opacity-100 before:absolute before:rounded-lg before:left-0 px-2 before:w-full before:opacity-0 before:bg-accent/70 before:h-[2rem] before:-z-10'
)

const selectedTreeVariants = cva('before:opacity-100 before:bg-accent/70 text-accent-foreground')

const TreeViewForm = React.forwardRef((
    {
        isPopulateDone,
        data,
        initialSelectedItemId,
        onSelectChange,
        expandAll,
        defaultLeafIcon,
        defaultNodeIcon,
        className,
        onDelete,onpressOnPlus,
        onValueChange,
        ...props
    },
    ref
) => {
    const [selectedItemId, setSelectedItemId] = React.useState(initialSelectedItemId)

    const handleSelectChange = React.useCallback((item) => {
        setSelectedItemId(item?.id)
        if (onSelectChange) {
            onSelectChange(item)
        }
    }, [onSelectChange])

    const expandedItemIds = React.useMemo(() => {
        if (!initialSelectedItemId) {
            return [];
        }

        const ids = []

        function walkTreeItems(
            items,
            targetId
        ) {
            if (items instanceof Array) {
                for (let i = 0; i < items.length; i++) {
                    ids.push(items[i].id)
                    if (walkTreeItems(items[i], targetId) && !expandAll) {
                        return true
                    }
                    if (!expandAll) ids.pop()
                }
            } else if (!expandAll && items.id === targetId) {
                return true
            } else if (items.children) {
                return walkTreeItems(items.children, targetId);
            }
        }

        walkTreeItems(data, initialSelectedItemId)
        return ids
    }, [data, expandAll, initialSelectedItemId])

    return (
        (<div className={cn('overflow-hidden relative p-2', className)}>
            <TreeItem
                data={data}
                isPopulateDone={isPopulateDone}
                ref={ref}
                onValueChange={onValueChange}
                selectedItemId={selectedItemId}
                handleSelectChange={handleSelectChange}
                expandedItemIds={expandedItemIds}
                defaultLeafIcon={defaultLeafIcon}
                defaultNodeIcon={defaultNodeIcon}
                onDelete={onDelete}
                onpressOnPlus={onpressOnPlus}
                {...props} />
        </div>)
    );
})
TreeViewForm.displayName = 'TreeViewForm'

const TreeItem = React.forwardRef((
    {
        className,isPopulateDone,
        data,
        selectedItemId,
        handleSelectChange,
        expandedItemIds,
        defaultNodeIcon,
        defaultLeafIcon,
        onDelete,onpressOnPlus,onValueChange,
        ...props
    },
    ref
) => {
    if (!(data instanceof Array)) {
        data = [data]
    }
    return (
        (<div ref={ref} role="tree" className={className} {...props}>
            <ul>
                {data.map((item) => (
                    <li key={item.id} className='mb-1'>
                        {
                        !isPopulateDone ? 
                        item.children.length > 0 ? (
                            <TreeNode
                                item={item}
                                onDelete={onDelete}
                                onpressOnPlus={onpressOnPlus}
                                selectedItemId={selectedItemId}
                                expandedItemIds={expandedItemIds}
                                handleSelectChange={handleSelectChange}
                                defaultNodeIcon={defaultNodeIcon}
                                defaultLeafIcon={defaultLeafIcon} 
                                onCheckChange={onValueChange}
                                />
                        ) : (
                            <TreeLeaf
                                item={item}
                                onDelete={onDelete}
                                onpressOnPlus={onpressOnPlus}
                                selectedItemId={selectedItemId}
                                handleSelectChange={handleSelectChange}
                                defaultLeafIcon={defaultLeafIcon} onValueChange={onValueChange}/>
                        )
                        : <Skeleton/>
                    }
                    </li>
                ))}
            </ul>
        </div>)
    );
})
TreeItem.displayName = 'TreeItem'

const TreeNode = ({
    item,isPopulateDone,
    handleSelectChange,
    expandedItemIds,
    selectedItemId,
    defaultNodeIcon,
    defaultLeafIcon,
    onDelete,onpressOnPlus,onCheckChange,
    ...props
}) => {
    // console.log(expandedItemIds);
    const [value, setValue] = React.useState(expandedItemIds.includes(item.id) ? [item.id] : [])
    return (
        (<AccordionPrimitive.Root type="multiple" value={value} onValueChange={(s) => setValue(s)}>
            <AccordionPrimitive.Item value={item.id}>
                <AccordionTrigger 
                    item={item}
                    className={cn(treeVariants(), selectedItemId === item.id && selectedTreeVariants(),'my-1 relative')}
                    onClick={() => {
                        handleSelectChange(item)
                        item.onClick?.()
                    }}>
                    <TreeIcon
                        item={item}
                        isSelected={selectedItemId === item.id}
                        isOpen={value.includes(item.id)}
                        default={defaultNodeIcon} />
                    <span className="text-sm font-PoppinsMedium truncate">
                        <div className="flex items-center">
                                <input id={item.name}
                                    onChange={(e)=>{
                                        // item.onClick?.()
                                        onCheckChange(e.target.checked,'isRowSelected',item)
                                    }}
                                    checked={item.isRowSelected}
                                type="checkbox" value={item.isRowSelected} className="w-4 h-4  bg-gray-100 border-gray-300 rounded-sm"/>
                                <label htmlFor={item.name} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {item.name}
                                        <span className='text-xs font-PoppinsRegular text-destructive'>
                                        {item.children.filter(el => el.isRowSelected).length > 0 ? 
                                          - item.children.filter(el => el.isRowSelected).length + ' Selected'
                                            : ''
                                    }
                                        </span>
                                    </label>
                        </div>
                        </span>
                    <TreeActions isSelected={selectedItemId === item.id}>
                        {item.actions}
                    </TreeActions>
                        <div className='flex items-center justify-between absolute right-0 space-x-4  mr-3'>
                               <div className="flex items-center ">
                                    <input id={`${item.menuName}_Add`} type="checkbox" 
                                    disabled={!item.isRowSelected}
                                    onChange={(e)=>{
                                        onCheckChange(e.target.checked,'isAdd',item)
                                    }}
                                    checked={item.isAdd}
                                    value={item.isAdd} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                                    <label   htmlFor={`${item.menuName}_Add`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                                        ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Add</label>
                                    </div>
                                    <div className="flex items-center">
                                            <input id={`${item.menuName}_Edit`} 
                                            disabled={!item.isRowSelected}
                                            onChange={(e)=>{
                                                onCheckChange(e.target.checked,'isEdit',item)
                                            }}
                                            checked={item.isEdit}
                                            type="checkbox" value={item.isEdit} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                                            <label htmlFor={`${item.menuName}_Edit`}  className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                                                ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Edit</label>
                                    </div>
                                    <div className="flex items-center ">
                                            <input id={`${item.menuName}_View`} 
                                            disabled={!item.isRowSelected}
                                            onChange={(e)=>{
                                                onCheckChange(e.target.checked,'isView',item)
                                            }}
                                            checked={item.isView}
                                            type="checkbox" value={item.isView} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                                            <label htmlFor={`${item.menuName}_View`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                                                ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>View</label>
                                    </div>
                                    <div className="flex items-center">
                                            <input id={`${item.menuName}_Print`}
                                            disabled={!item.isRowSelected}
                                            onChange={(e)=>{
                                                onCheckChange(e.target.checked,'isPrint',item)
                                            }}
                                            checked={item.isPrint}
                                            type="checkbox" value={item.isPrint} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                                            <label htmlFor={`${item.menuName}_Print`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                                                ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Print</label>
                                    </div>

                                    {/* <div className="flex items-center">
                                            <input id={`${item.menuName}_Active`}
                                            disabled={!item.isRowSelected}
                                            onChange={(e)=>{
                                                onCheckChange(e.target.checked,'isActive',item)
                                                }}
                                            checked={item.isActive}
                                            type="checkbox" value={item.isActive} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                                            <label htmlFor={`${item.menuName}_Active`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                                                ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Active</label>
                                    </div> */}
                                    <div className="flex items-center">
                                        <input id={`${item.menuName}_Delete`}
                                        disabled={!item.isRowSelected}
                                        onChange={(e)=>{
                                            onCheckChange(e.target.checked,'isDelete',item)
                                            }}
                                        checked={item.isDelete}
                                        type="checkbox" value={item.isDelete} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                                        <label htmlFor={`${item.menuName}_Delete`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                                            ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Delete</label>
                                    </div>
                        </div>
                </AccordionTrigger>
                <AccordionContent className="ml-4 pl-1 border-l border-l-card-foreground/15">
                    <TreeItem
                        data={item.children ? item.children : item}
                        onDelete={onDelete} isPopulateDone={isPopulateDone}
                        onpressOnPlus={onpressOnPlus}
                        selectedItemId={selectedItemId}
                        handleSelectChange={handleSelectChange}
                        expandedItemIds={expandedItemIds}
                        defaultLeafIcon={defaultLeafIcon}
                        defaultNodeIcon={defaultNodeIcon} 
                        onValueChange={onCheckChange}
                        />
                        
                </AccordionContent>
               
                
            </AccordionPrimitive.Item>
        </AccordionPrimitive.Root>)
    );
}

const TreeLeaf = React.forwardRef((
    {
        className,
        item,
        selectedItemId,
        handleSelectChange,
        defaultLeafIcon,
        onDelete,onpressOnPlus,onValueChange,
        ...props
    },
    ref
) => {
    return (
        (<Button variant="ghost"
            ref={ref}
            className={cn(
                `flex rounded-none text-left items-center w-full py-2 cursor-pointer before:right-1
                    ${item.isRowSelected ? 'border-2 border-destructive bg-destructive/5 rounded-sm text-destructive' : ''}
                `,
                treeVariants(),
                className,
                selectedItemId === item.id && selectedTreeVariants()
            )}
            onClick={() => {
                handleSelectChange(item)
                item.onClick?.()
            }}
            {...props}>
            <TreeIcon
                item={item}
                isSelected={selectedItemId === item.id}
                default={defaultLeafIcon} />
            <span className="flex-grow text-sm truncate font-PoppinsMedium">
            <div className="flex items-center">
                                <input id={item.name} type="checkbox" value={item.isRowSelected}
                                    checked={item.isRowSelected}

                                onChange={(e)=>{
                                    onValueChange(e.target.checked,'isRowSelected',item)
                                }}
                                className="w-4 h-4  bg-gray-100 border-gray-300 rounded-sm"/>
                                <label htmlFor={item.name} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}</label>
                        </div>
                </span>
            <TreeActions isSelected={selectedItemId === item.id}>
                {item.actions}
            </TreeActions>
            <div className='flex items-center justify-between absolute right-0 space-x-4  mr-5'>
                <div className="flex items-center">
                        <input id={`${item.menuName}_Add`} type="checkbox" 
                        disabled={!item.isRowSelected}
                        onChange={(e)=>{
                            onValueChange(e.target.checked,'isAdd',item)
                         }}
                        checked={item.isAdd}
                        value={item.isAdd} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                        <label   htmlFor={`${item.menuName}_Add`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                            ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Add</label>
                </div>
                <div className="flex items-center">
                        <input id={`${item.menuName}_Edit`} 
                          disabled={!item.isRowSelected}
                          onChange={(e)=>{
                            onValueChange(e.target.checked,'isEdit',item)
                         }}
                        checked={item.isEdit}
                        type="checkbox" value={item.isEdit} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                        <label htmlFor={`${item.menuName}_Edit`}  className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                            ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Edit</label>
                </div>
                <div className="flex items-center">
                        <input id={`${item.menuName}_View`} 
                        disabled={!item.isRowSelected}
                        onChange={(e)=>{
                            onValueChange(e.target.checked,'isView',item)
                         }}
                        checked={item.isView}
                        type="checkbox" value={item.isView} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                        <label htmlFor={`${item.menuName}_View`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                            ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>View</label>
                </div>
                <div className="flex items-center">
                        <input id={`${item.menuName}_Print`}
                        disabled={!item.isRowSelected}
                        onChange={(e)=>{
                            onValueChange(e.target.checked,'isPrint',item)
                         }}
                        checked={item.isPrint}
                        type="checkbox" value={item.isPrint} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                        <label htmlFor={`${item.menuName}_Print`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                            ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Print</label>
                </div>

                {/* <div className="flex items-center">
                    <input id={`${item.menuName}_Active`}
                    disabled={!item.isRowSelected}
                    onChange={(e)=>{
                        onValueChange(e.target.checked,'isActive',item)
                        }}
                    checked={item.isActive}
                    type="checkbox" value={item.isActive} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                    <label htmlFor={`${item.menuName}_Active`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                        ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Active</label>
                </div> */}
                <div className="flex items-center">
                    <input id={`${item.menuName}_Delete`}
                    disabled={!item.isRowSelected}
                    onChange={(e)=>{
                        onValueChange(e.target.checked,'isDelete',item)
                        }}
                    checked={item.isDelete}
                    type="checkbox" value={item.isDelete} className="w-4 h-4  bg-gray-100 disabled:opacity-15 disabled:cursor-not-allowed border-gray-300 rounded-sm"/>
                    <label htmlFor={`${item.menuName}_Delete`} className={`ms-2 text-sm font-medium    text-gray-900 dark:text-gray-300 
                        ${!item.isRowSelected ? 'opacity-15 cursor-not-allowed' : 'cursor-pointer'}`}>Delete</label>
                </div>
            </div>
            {/* <div className='flex items-center justify-between absolute right-0 space-x-4  mr-3'>
                            {item.isSubMenuAvl ? <Button onClick={()=>{
                                    onpressOnPlus(item);
                                }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Plus className="h-[1rem] w-[1rem]  transition-all" />
                                    <span className="sr-only">Toggle theme</span>

                                </Button> : null
                            }

                        <Button onClick={()=>{
                           onDelete(item);
                        }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Trash2 className="h-[1rem] w-[1rem]  transition-all" />
                            <span className="sr-only">Toggle theme</span>

                        </Button>
                    </div> */}
        </Button>)
    );
})
TreeLeaf.displayName = 'TreeLeaf'

const AccordionTrigger = React.forwardRef(({ className, children,item, ...props }, ref) => (
    <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                `flex flex-1 w-full flex-row justify-between items-center py-2
                 ${item.isRowSelected ? 'border-2 border-destructive bg-destructive/5 rounded-sm text-destructive' : ''}
                 ${item.children.length > 0 ? '[&[data-state=open]]:bg-destructive/10  [&[data-state=open]]:rounded-sm  [&[data-state=open]]:text-destructive' : ''}  
                 transition-all hover:bg-muted/45 
                 `,
                className
            )}
            {...props}>
                <div className='flex  flex-row '>
                <ChevronRight
                className={`h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 mr-1 group-[&[data-state=open]]:text-destructive group-[&[data-state=open]]:rotate-90`} />
                    {children}
                </div>
               
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            className
        )}
        {...props}>
        <div className="pb-1 pt-0">{children}</div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

const TreeIcon = ({
    item,
    isOpen,
    isSelected,
    default: defaultIcon
}) => {
    let Icon = defaultIcon
    if (isSelected && item.selectedIcon) {
        Icon = item.selectedIcon
    } else if (isOpen && item.openIcon) {
        Icon = item.openIcon
    } else if (item.icon) {
        Icon = item.icon
    }
    return Icon ? (
        <Icon className="h-4 w-4 shrink-0 mr-2" />
    ) : (
        <></>
    );
}

const TreeActions = ({
    children,
    isSelected
}) => {
    return (
        (<div
            className={cn(isSelected ? 'block' : 'hidden', 'absolute right-3 group-hover:block')}>
            {children}
        </div>)
    );
}

export { TreeViewForm };
