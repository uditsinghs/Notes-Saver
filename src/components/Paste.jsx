import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from '../redux/pasteSlice';
import { MdDelete, MdEdit, MdContentCopy } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosShareAlt } from "react-icons/io";
import { Link } from 'react-router-dom';

const Paste = () => {
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPastes, setFilteredPastes] = useState(pastes);

  useEffect(() => {
    const filtered = pastes.filter((paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPastes(filtered);
  }, [searchTerm, pastes]);

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: window.location.href + `pastes/${paste._id}`,
      })
        .then(() => console.log('Successfully shared'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      alert('Your browser does not support sharing');
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex space-x-2 justify-center">
        <input
          type="search"
          placeholder="Search Pastes.."
          className="border px-2 py-1 rounded bg-zinc-800 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPastes.length > 0 ? (
        filteredPastes.map((paste) => (
          <div key={paste._id} className="w-full flex justify-center ">
            <div className="flex flex-col w-[600px] mb-4 border p-3 rounded">
              <h1 className="text-xl font-bold">{paste.title}</h1>
              <p>{paste.content}</p>
              <div className="flex justify-end mr-3 gap-3 text-xl mt-3 items-center ">
                <div>{paste.createdAt}</div>
                <button onClick={() => handleDelete(paste._id)} className="border">
                  <MdDelete />
                </button>
                <Link to={`/?pasteId=${paste?._id}`}  className="border">
                  <MdEdit />
                </Link>
                <button onClick={() => navigator.clipboard.writeText(paste?.content)} >
                  <MdContentCopy className="hover:text-red-500 border" />
                </button>
                <Link to={`/pastes/${paste?._id}`}  className="border">
                  <IoEyeOutline />
                </Link>
                <button onClick={() => handleShare(paste)}  className="border">
                  <IoIosShareAlt />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No pastes found.</p>
      )}
    </div>
  );
};

export default Paste;
