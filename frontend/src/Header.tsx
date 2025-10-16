import {
  FaPhoneAlt,
  FaEnvelope,
  FaBullhorn,
  FaChevronDown,
  FaUser,
  FaSearch
} from "react-icons/fa";

function Header() {
  return (
    <>

      <div className="w-full bg-red-300 text-gray-700 text-xl   flex justify-between items-center px-20 py-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <FaPhoneAlt /> 9919426012, 8299609092
          </span>
          <span className="flex items-center gap-2 border-l border-white pl-4">
            <FaEnvelope /> nagendra088@gmail.com
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-gray-700">
            <FaBullhorn /> Notice:
            <a
              href="#"
              className="underline font-semibold hover:text-red-800 transition"
            >
              Examination result of B.A, B.Sc is available here
            </a>
          </span>

        
          <select
            className="ml-4 bg-red-300 text-black font-semibold px-3 py-1 rounded outline-none hover:bg-red-400 transition cursor-pointer"
            defaultValue="English"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center px-20 py-4 border-b bg-white">
        <div>
          <h1 className="text-4xl font-bold text-gray-600 cursor-pointer">
            Shri Avadhraj Singh Group Of Colleges
          </h1>
          <p className="text-gray-600 text-2xl">
            Bishunpur Bairiya, Gonda (U.P.) 271601
          </p>
        </div>
        <div className=" flex  items-center">
          <div className="flex items-center border rounded-full overflow-hidden w-96">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 flex-1 outline-none"
            />
            <button className="bg-gray-600 text-gray-300 px-8 py-5 font-semibold cursor-pointer ">
               <FaSearch className="text-lg" />
            </button>
          </div>

          <div className="ml-6 cursor-pointer">
            <FaUser className="text-2xl text-[#22416B]" />
          </div>
        </div>
      </div>

      <div className="w-full bg-red-300 text-gray-700 flex px-15 text-2xl">
        {["Home", "Institutions", "Message", "Contact Us "].map((item, i) => (
          <button
            key={i}
            className={`px-6 py-3 font-medium hover:bg-white transition ${
              item === "Home" ? "" : ""
            }`}
          >
            {item}
            {item === "Institutions" && (
              <FaChevronDown className="inline ml-2 text-sm" />
            )}
          </button>
        ))}
      </div>
    </>
  );
}

export default Header;
