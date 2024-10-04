
import { useSelector } from 'react-redux'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
const ViewPaste = () => {
  const { id } = useParams()
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const allPastes = useSelector((state) => state.paste.pastes)
  useEffect(() => {
    if (id) {
      const paste = allPastes.find((p) => p._id === id)
      setTitle(paste?.title)
      setValue(paste?.content)
    }

  }, [id, allPastes])
  return (
    <div className="p-6 h-screen">

      <div className="max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Title"
          className="block w-full mb-4 p-2 border border-gray-300 rounded bg-zinc-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled
        />

        <textarea
          placeholder="Enter your paste"
          className="block w-full mb-4 p-2 border border-gray-300 rounded bg-zinc-800 text-white"
          value={value}
          rows={10}
          onChange={(e) => setValue(e.target.value)}
          disabled
        />
      </div>
    </div>
  );
};

export default ViewPaste;
