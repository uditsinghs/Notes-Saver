
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { updateToPastes, addToPastes } from '../redux/pasteSlice'
import { useEffect } from 'react';
const Home = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const allPastes = useSelector((state) => state.paste.pastes)

  const handleSubmit = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toLocaleDateString()
    };



    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    } else {
      // add
      dispatch(addToPastes(paste));
    }

    setSearchParams({});
    setTitle("");
    setValue("");
  };
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId)
      setTitle(paste?.title)
      setValue(paste?.content)
    }

  }, [pasteId,allPastes])


  return (
    <div className="p-6 h-screen">

      <div className="max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Title"
          className="block w-full mb-4 p-2 border border-gray-300 rounded bg-zinc-800 text-white"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter your paste"
          className="block w-full mb-4 p-2 border border-gray-300 rounded bg-zinc-800 text-white"
          value={value}
          rows={10}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          {pasteId ? "UPDATE Paste" : "ADD Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
