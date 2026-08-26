'use client';
import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronRight, Edit, Edit2, Pencil, Plus, Trash2, Trash2Icon } from 'lucide-react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from './ui/button';

const treeVariants = cva(
    'group hover:before:opacity-100 before:absolute before:rounded-lg before:left-0 px-2 before:w-full before:opacity-0 before:bg-accent/70 before:h-[2rem] before:-z-10'
)

const selectedTreeVariants = cva('before:opacity-100 before:bg-accent/70 text-accent-foreground')

const TreeView = React.forwardRef((
    {
        data,
        initialSelectedItemId,
        onSelectChange,
        expandAll,
        defaultLeafIcon,
        defaultNodeIcon,
        className,
        onDelete,onpressOnPlus,onPressOnEdit,loaderData=null,
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
                ref={ref}
                selectedItemId={selectedItemId}
                handleSelectChange={handleSelectChange}
                expandedItemIds={expandedItemIds}
                defaultLeafIcon={defaultLeafIcon}
                defaultNodeIcon={defaultNodeIcon}
                onDelete={onDelete}
                onpressOnPlus={onpressOnPlus}
                onPressOnEdit={onPressOnEdit}
                loaderData={loaderData}
                {...props} />
        </div>)
    );
})
TreeView.displayName = 'TreeView'

const TreeItem = React.forwardRef((
    {
        className,
        data,
        selectedItemId,
        handleSelectChange,
        expandedItemIds,
        defaultNodeIcon,
        defaultLeafIcon,
        onDelete,onpressOnPlus,onPressOnEdit,loaderData=null,
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
                        {item.children.length > 0 ? (
                            <TreeNode
                                item={item}
                                onDelete={onDelete}
                                onpressOnPlus={onpressOnPlus}
                                selectedItemId={selectedItemId}
                                expandedItemIds={expandedItemIds}
                                handleSelectChange={handleSelectChange}
                                defaultNodeIcon={defaultNodeIcon}
                                defaultLeafIcon={defaultLeafIcon} 
                                onPressOnEdit={onPressOnEdit}
                                loaderData={loaderData}
                                />
                        ) : (
                            <TreeLeaf
                                item={item}
                                onDelete={onDelete}
                                onpressOnPlus={onpressOnPlus}
                                selectedItemId={selectedItemId}
                                handleSelectChange={handleSelectChange}
                                defaultLeafIcon={defaultLeafIcon} 
                                onPressOnEdit={onPressOnEdit}
                                loaderData={loaderData}
                                />
                        )}
                    </li>
                ))}
            </ul>
        </div>)
    );
})
TreeItem.displayName = 'TreeItem'

const TreeNode = ({
    item,
    handleSelectChange,
    expandedItemIds,
    selectedItemId,
    defaultNodeIcon,
    defaultLeafIcon,              
    onDelete,onpressOnPlus,onPressOnEdit,loaderData=null,
    ...props
}) => {
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
                    <span className="text-sm font-PoppinsMedium truncate">{item.name}</span>
                    <TreeActions isSelected={selectedItemId === item.id}>
                        {item.actions}
                    </TreeActions>
                    <div className='flex items-center justify-between absolute right-0 space-x-4  mr-3'>
                            {item.isSubMenuAvl ? (loaderData && loaderData?.isAdd   ) && <Button onClick={()=>{
                                onpressOnPlus(item);
                            }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                                <Plus className="h-[1rem] w-[1rem]  transition-all" />
                                <span className="sr-only">Toggle theme</span>

                            </Button> : null
                        }

                        {(loaderData && loaderData?.isDelete) && <Button onClick={()=>{
                            onDelete(item)
                        }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Trash2 className="h-[1rem] w-[1rem]  transition-all" />
                            <span className="sr-only">Toggle theme</span>

                        </Button>}
                         {(loaderData && loaderData?.isEdit) && <Button onClick={()=>{
                            onPressOnEdit(item)
                        }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Edit2 className="h-[1rem] w-[1rem]  transition-all" />
                            <span className="sr-only">Toggle theme</span>

                        </Button>}
                    </div>
                   
                </AccordionTrigger>
                <AccordionContent className="ml-4 pl-1 border-l border-l-card-foreground/15">
                    <TreeItem
                        data={item.children ? item.children : item}
                        onDelete={onDelete}
                        onpressOnPlus={onpressOnPlus}
                        selectedItemId={selectedItemId}
                        handleSelectChange={handleSelectChange}
                        expandedItemIds={expandedItemIds}
                        defaultLeafIcon={defaultLeafIcon}
                        defaultNodeIcon={defaultNodeIcon} 
                        onPressOnEdit={onPressOnEdit}
                        loaderData={loaderData}
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
        onDelete,onpressOnPlus,
        onPressOnEdit,loaderData=null,
        ...props
    },
    ref
) => {
    return (
        (<Button variant="ghost"
            ref={ref}
            className={cn(
                'ml-5 flex rounded-none text-left items-center w-full py-2 cursor-pointer before:right-1',
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
            <span className="flex-grow text-sm truncate font-PoppinsMedium">{item.name}</span>
            <TreeActions isSelected={selectedItemId === item.id}>
                {item.actions}
            </TreeActions>
            <div className='flex items-center justify-between absolute right-0 space-x-4  mr-3'>
                        {/* <Button onClick={()=>{
                             onpressOnPlus(item);
                        }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Pencil className="h-[1rem] w-[1rem]  transition-all" />
                            <span className="sr-only">Toggle theme</span>
                        </Button> */}

                            {item.isSubMenuAvl ? (loaderData && loaderData?.isDelete) && <Button onClick={()=>{
                                    onpressOnPlus(item);
                                }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Plus className="h-[1rem] w-[1rem]  transition-all" />
                                    <span className="sr-only">Toggle theme</span>

                                </Button> : null
                            }

                        {(loaderData && loaderData?.isDelete) && <Button onClick={()=>{
                           onDelete(item);
                        }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Trash2 className="h-[1rem] w-[1rem]  transition-all" />
                            <span className="sr-only">Toggle theme</span>

                        </Button>}
                          {(loaderData && loaderData?.isEdit) && <Button onClick={()=>{
                            onPressOnEdit(item)
                        }} variant="ghost" size="icon" className="rounded-full  h-[1rem] w-[1rem] z-50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Edit2 className="h-[1rem] w-[1rem]  transition-all" />
                            <span className="sr-only">Toggle theme</span>

                        </Button>}
                    </div>
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

export { TreeView };
