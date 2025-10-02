"use client";
import { FaHeading } from "react-icons/fa";
import { FaBold } from "react-icons/fa";
import { useRef } from "react";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
export default function MixedEditorToggle() {
  const editorRef = useRef<HTMLDivElement>(null);

  // Toggle format
  const toggleFormat = (tag: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return; // no text selected

    const selectedNode = range.startContainer.parentNode as HTMLElement;

    //  unwrap/remove
    if (selectedNode.tagName?.toLowerCase() === tag.toLowerCase()) {
      const parent = selectedNode.parentNode!;
      while (selectedNode.firstChild) {
        parent.insertBefore(selectedNode.firstChild, selectedNode);
      }
      parent.removeChild(selectedNode);
      return;
    }

    // new format apply 
    const wrapper = document.createElement(tag);
    wrapper.textContent = range.toString();
    range.deleteContents();
    range.insertNode(wrapper);
  };

  const saveContent = () => {
    console.log("Content:", editorRef.current?.innerHTML);
  };

  return (
    <div className="border border-zinc-300 my-3">
      {/* Toolbar */}
      <div className="my-2 flex justify-center gap-2">
        <button onClick={() => toggleFormat("strong")}>
          <FaBold />
        </button>
        <button onClick={() => toggleFormat("em")}>
          <FaItalic />
        </button>
        <button onClick={() => toggleFormat("u")}>
          <FaUnderline />
        </button>
        <button onClick={() => toggleFormat("h1")}>
          <FaHeading />
        </button>
      </div>

      {/* Editable Area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="border p-4 min-h-[200px]"
      >
        Select text and use toolbar...
      </div>

      <button
        onClick={saveContent}
        className="mt-4 bg-blue-500 text-white px-3 py-1"
      >
        Save
      </button>
    </div>
  );
}
