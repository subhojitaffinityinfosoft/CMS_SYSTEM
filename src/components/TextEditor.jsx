// import React, { useCallback } from "react"
// import { useEditor, EditorContent } from "@tiptap/react"
// import StarterKit from "@tiptap/starter-kit"
// import Link from "@tiptap/extension-link"
// import Image from "@tiptap/extension-image"
// import TextAlign from "@tiptap/extension-text-align"
// import { TextStyle } from "@tiptap/extension-text-style"
// import Color from "@tiptap/extension-color"
// import Highlight from "@tiptap/extension-highlight"
// import { Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Link2, ImageIcon, Undo, Redo, Highlighter, Type } from "lucide-react"
// import { Extension } from "@tiptap/core"

// const ToolbarButton = ({ onClick, active, children, title }) => (
//     <button
//         onClick={onClick}
//         title={title}
//         className={`p-2 rounded-md border text-sm transition ${active
//             ? "bg-blue-600 text-white border-blue-600"
//             : "bg-white border-gray-300 hover:bg-gray-100"
//             }`}
//     >
//         {children}
//     </button>
// )

// const FontSize = Extension.create({
//     name: "fontSize",

//     addGlobalAttributes() {
//         return [
//             {
//                 types: ["textStyle"],
//                 attributes: {
//                     fontSize: {
//                         default: null,
//                         parseHTML: (element) => element.style.fontSize?.replace(/["']/g, "") || null,
//                         renderHTML: (attributes) => {
//                             if (!attributes.fontSize) return {}
//                             return { style: `font-size: ${attributes.fontSize}` }
//                         },
//                     },
//                 },
//             },
//         ]
//     },

//     addCommands() {
//         return {
//             setFontSize:
//                 (fontSize) =>
//                     ({ chain }) => {
//                         return chain().setMark("textStyle", { fontSize }).run()
//                     },
//             unsetFontSize:
//                 () =>
//                     ({ chain }) => {
//                         return chain()
//                             .setMark("textStyle", { fontSize: null })
//                             .removeEmptyTextStyle()
//                             .run()
//                     },
//         }
//     },
// })

// export default function TextEditor({ value, onChange, placeholder = "Compose your message..." }) {
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             Link.configure({ openOnClick: false }),
//             Image.configure({ inline: true }),
//             TextAlign.configure({ types: ["heading", "paragraph"] }),
//             TextStyle,
//             Color,
//             Highlight.configure({ multicolor: true }),
//             FontSize
//         ],
//         content: value || "",
//         onUpdate: ({ editor }) => {
//             const html = editor.getHTML();
//             onChange?.(html);
//         },

//     })

//     const addLink = useCallback(() => {
//         const url = window.prompt("Enter link URL")
//         if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
//     }, [editor])

//     const addImage = useCallback(() => {
//         const url = window.prompt("Enter image URL")
//         if (url) editor.chain().focus().setImage({ src: url }).run()
//     }, [editor])

//     if (!editor) return null

//     return (
//         <div className="border rounded-2xl p-3 shadow-sm bg-white">
//             {/* Toolbar */}
//             <div className="flex flex-wrap gap-2 border-b pb-2 mb-3">
//                 {/* Text formatting */}
//                 <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
//                     <Bold className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
//                     <Italic className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline?.().run()} active={editor.isActive("underline")} title="Underline">
//                     <Underline className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
//                     <Strikethrough className="h-4 w-4" />
//                 </ToolbarButton>

//                 <div className="relative flex items-center gap-1">
//                     <ToolbarButton
//                         onClick={() => document.getElementById("textColorPicker")?.click()}
//                         active={editor.isActive("textStyle")}
//                         title="Text color"
//                     >
//                         <Type className="h-4 w-4" />
//                     </ToolbarButton>

//                     {/* Preset color swatches */}
//                     {["#000000", "#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#6b7280"].map((color) => (
//                         <button
//                             key={color}
//                             onClick={() => editor.chain().focus().setColor(color).run()}
//                             className="w-5 h-5 rounded-full border border-gray-300"
//                             style={{ backgroundColor: color }}
//                             title={`Set color ${color}`}
//                         />
//                     ))}

//                     {/* Hidden color picker */}
//                     <input
//                         type="color"
//                         id="textColorPicker"
//                         className="absolute top-0 left-0 w-8 h-8 opacity-0 cursor-pointer"
//                         onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
//                     />
//                 </div>

//                 {/* Color / Highlight */}
//                 {/* ✨ Highlight Color */}
//                 <div className="relative flex items-center gap-1">
//                     <ToolbarButton
//                         onClick={() => document.getElementById("highlightColorPicker")?.click()}
//                         active={editor.isActive("highlight")}
//                         title="Highlight color"
//                     >
//                         <Highlighter className="h-4 w-4" />
//                     </ToolbarButton>

//                     {/* Preset highlight swatches — including "no highlight" */}
//                     {[
//                         { color: "white", label: "No highlight", border: true },
//                         { color: "#fef08a", label: "Yellow" },
//                         { color: "#fca5a5", label: "Red" },
//                         { color: "#bfdbfe", label: "Blue" },
//                         { color: "#a7f3d0", label: "Green" },
//                         { color: "#fde68a", label: "Orange" },
//                         { color: "#f9a8d4", label: "Pink" },
//                     ].map(({ color, label, border }) => (
//                         <button
//                             key={color}
//                             onClick={() => {
//                                 if (color === "transparent") {
//                                     editor.chain().focus().unsetMark("highlight").run()
//                                 } else {
//                                     editor.chain().focus().setMark("highlight", { color }).run()
//                                 }
//                             }}
//                             className={`w-5 h-5 rounded-full border ${border ? "border-gray-400 bg-white" : "border-gray-300"}`}
//                             style={{ backgroundColor: color === "transparent" ? "white" : color }}
//                             title={label}
//                         >
//                             {color === "transparent" && (
//                                 <div className="absolute w-5 h-[2px] bg-gray-500 rotate-45 translate-x-[1px]" />
//                             )}
//                         </button>
//                     ))}

//                     {/* Hidden highlight color picker */}
//                     <input
//                         type="color"
//                         id="highlightColorPicker"
//                         className="absolute top-0 left-0 w-8 h-8 opacity-0 cursor-pointer"
//                         onChange={(e) => {
//                             const color = e.target.value
//                             editor.chain().focus().setMark("highlight", { color }).run()
//                         }}
//                     />
//                 </div>

//                 <select
//                     onChange={(e) => {
//                         const size = e.target.value
//                         if (size === "default") editor.chain().focus().unsetFontSize().run()
//                         else editor.chain().focus().setFontSize(size).run()
//                     }}
//                     className="border rounded-md px-2 py-1 text-sm"
//                     defaultValue="default"
//                     title="Text size"
//                 >
//                     <option value="default">Size</option>
//                     <option value="12px">12</option>
//                     <option value="14px">14</option>
//                     <option value="16px">16</option>
//                     <option value="18px">18</option>
//                     <option value="20px">20</option>
//                     <option value="24px">24</option>
//                     <option value="32px">32</option>
//                 </select>


//                 {/* Alignment */}
//                 <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
//                     <AlignLeft className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
//                     <AlignCenter className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
//                     <AlignRight className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify">
//                     <AlignJustify className="h-4 w-4" />
//                 </ToolbarButton>

//                 {/* Lists */}
//                 <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
//                     <List className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">
//                     <ListOrdered className="h-4 w-4" />
//                 </ToolbarButton>

//                 {/* Link & Image */}
//                 <ToolbarButton onClick={addLink} title="Add Link">
//                     <Link2 className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={addImage} title="Insert Image">
//                     <ImageIcon className="h-4 w-4" />
//                 </ToolbarButton>

//                 {/* Undo / Redo */}
//                 <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
//                     <Undo className="h-4 w-4" />
//                 </ToolbarButton>
//                 <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
//                     <Redo className="h-4 w-4" />
//                 </ToolbarButton>
//             </div>

//             {/* Editor */}
//             <div className="p-3 min-h-[200px] bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all"
//                 onClick={() => editor?.chain().focus().run()}
//             >
//                 <EditorContent
//                     editor={editor}
//                     className="min-h-[150px] outline-none prose max-w-none text-gray-800"
//                     placeholder={placeholder}
//                 />
//             </div>
//         </div>
//     )
// }
