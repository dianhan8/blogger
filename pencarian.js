const Pencarian = () => {
  const { useState } = React;
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listPosts, setListPosts] = useState([]);

  const classModal = classNames('fixed z-10 inset-0 overflow-y-auto', {
    'invisible': !visible,
  })

  const classOverplay = classNames(
    "fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity",
    {
      "opacity-0 ease-out duration-300": !visible,
      "opacity-100 ease-in duration-200": visible,
    }
  );

  const classContentModal = classNames(
    "relative mx-auto w-full max-w-2xl rounded-lg bg-white shadow-xl",
    {
      "opacity-0 ease-out duration-200 translate-y-4 sm:translate-y-0 sm:scale-95":
        !visible,
      "opacity-100 ease-in duration-300 opacity-100 translate-y-0 sm:scale-100":
        visible,
    }
  );

  async function getPostByKeyword(query) {
    const url = 'https://www.googleapis.com/blogger/v3/blogs/839057407940192023/posts/search?key=AIzaSyCiiU5S07er5yz_b6rQTXTVvCkqE46zYHY&q=';
    setIsLoading(true);

    try {
      const res = await axios.get(url, {
        params: {
          q: query,
          fetchBodies: false,
        },
      });
      setListPosts(get(res, "data.items", []));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  function handleChange(event) {
    if (event.target.value) {
      getPostByKeyword(event.target.value);
    }
  }

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="w-full px-4 py-2 flex items-center shadow-md rounded-md focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-sm text-grey-400">Pencarian</span>
      </button>

      <div
        className={classModal}
        ria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className={classOverplay} onClick={() => setVisible(false)} />
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className={classContentModal}>
          <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white shadow-xl">
              <div className="flex w-full items-center px-6 py-4">
                {isLoading ? (
                  <svg
                    className="h-6 w-6 animate-spin text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <input
                  className="w-full px-4 py-2 font-inter text-base focus:outline-none"
                  placeholder="Pencarian"
                  onChange={debounce(handleChange, 500)}
                />
                <button
                  onClick={() => setVisible(false)}
                  className="rounded-lg border border-gray-300 px-2 py-1 font-inter text-xs font-semibold text-black hover:shadow-lg"
                >
                  ESC
                </button>
              </div>

              <ul className="mb-4">
                {listPosts.map((items, index) => {
                  return (
                    <a key={index} href={`/blog/${items.id}`}>
                      <li
                        className="cursor-pointer space-y-2 px-4 py-2 hover:bg-gray-100"
                        role="button"
                      >
                        <label className="rounded-md bg-gray-300 px-2 py-1 font-inter text-xs text-black">
                          Postingan
                        </label>
                        <p className="font-inter text-sm">{items.title}</p>
                      </li>
                    </a>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Pencarian />, document.getElementById("search-widget"));
