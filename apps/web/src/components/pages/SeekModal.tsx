"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

const SeekModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Open Dialog
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <Dialog.Content
          className="
            fixed left-1/2 top-1/2
            w-[90vw] max-w-md 
            -translate-x-1/2 -translate-y-1/2 
            bg-white rounded-xl shadow-lg p-6
          "
        >
          <Dialog.Title className="text-xl font-semibold mb-4">
            Make a Decision
          </Dialog.Title>

          <form className="space-y-4">
            {/* TEXTAREA */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Describe your dilemma
              </label>
              <textarea
                className="w-full border rounded-md p-2 h-24"
                placeholder="What's on your mind?"
              />
            </div>

            {/* INPUT 1 */}
            <div>
              <label className="block text-sm font-medium mb-1">Option A</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="First option"
              />
            </div>

            {/* INPUT 2 */}
            <div>
              <label className="block text-sm font-medium mb-1">Option B</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Second option"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Submit
            </button>
          </form>

          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 text-gray-500">✕</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SeekModal;
