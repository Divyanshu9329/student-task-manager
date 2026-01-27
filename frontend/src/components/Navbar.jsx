export default function Navbar() {
  return (
    <div
      className="
        flex flex-wrap items-center justify-between
        w-full px-4 md:px-14 py-2
        font-medium text-sm text-white text-center
        bg-linear-to-r from-violet-500 to-purple-100
      "
    >
      <p>Hello Everyone My name is Divyanshu Pandey</p>
      <a
        href="https://drive.google.com/file/d/17E4-P_UuyMuaTIkOqJ9tgmfkhx1BK6cq/view?usp=sharing"
        className="
          flex items-center gap-1 px-3 py-1 rounded-lg
          text-violet-600 bg-violet-50
          hover:bg-slate-100 transition
          active:scale-95 ml-3
        "
      >
        Get My Resume
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.91797 7H11.0846"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 2.9165L11.0833 6.99984L7 11.0832"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
