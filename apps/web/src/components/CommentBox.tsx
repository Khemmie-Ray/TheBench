'use client';

import { useState } from "react";
import { Send } from "lucide-react";

const MAX_CHARS = 50;

export default function CommentBox() {
  const [comment, setComment] = useState("");

  return (
    <div className="border border-black/20 rounded-[21px] flex flex-col p-4 mt-4">
      <textarea
        placeholder="Enter a comment"
        value={comment}
        maxLength={MAX_CHARS}
        onChange={(e) => setComment(e.target.value)}
        className="h-[90px] w-full outline-none resize-none"
      />

      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-black/50">
          {comment.length}/{MAX_CHARS}
        </span>

        <button
          disabled={comment.length === 0}
          className="bg-black rounded-full p-3 disabled:opacity-40"
        >
          <Send className="text-white" />
        </button>
      </div>
    </div>
  );
}
