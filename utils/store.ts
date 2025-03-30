import { create } from "zustand";
import { Editor } from "@tiptap/react";
import { createJSONStorage, persist } from "zustand/middleware";

type EditorStore = {
  editor: Editor | null;
  setEditor: (editor: Editor) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));

interface Content {
  title: string;
  body: string;
  coverImage: string;
}
interface EditorContentStore {
  content: Content;
  setContent: (content: Content) => void;
}

export const useBlogContentStore = create<EditorContentStore>()(
  persist(
    (set) => ({
      content: {
        title: "",
        body: "",
        coverImage: "",
      },
      setContent: (content: Content) => set({ content }),
    }),
    {
      name: "blog-content-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
