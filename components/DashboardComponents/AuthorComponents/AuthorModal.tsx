/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputTag from "../../InputTag";

interface IModalProps {
  open: boolean;
  id: number;
  setOpen: (open: boolean) => void;
  editAuthor: (
    id: number,
    title: string,
    link: string,
    cv_link: string,
    university: string,
    professorial_status: string,
    key_article: string
  ) => void;
  deleteAuthor: (id: number) => void;
  title: string;
  link: string;
  cv_link: string;
  university: string;
  professorial_status: string;
  key_article: string;
  key_terms: string;
}

export default function AuthorModal({
  open,
  id,
  setOpen,
  editAuthor,
  title,
  link,
  cv_link,
  university,
  professorial_status,
  key_article,
  key_terms,
  deleteAuthor,
}: IModalProps) {
  const cancelButtonRef = useRef(null);
  const [newTitle, setNewTitle] = useState(title);
  const [newLink, setNewLink] = useState(link);
  const [newCvLink, setNewCvLink] = useState(cv_link);
  const [newUniversity, setNewUniversity] = useState(university);
  const [newKeyArticle, setNewKeyArticle] = useState(key_article);
  const [newProfessorialStatus, setNewProfessorialStatus] =
    useState(professorial_status);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-medium text-gray-900"
                    >
                      Edit Author
                    </Dialog.Title>
                    <div className="mt-4">
                      <label>Author Name</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray rounded-lg p-2 dark:bg-black"
                        placeholder="Author Name"
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Author Link</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray rounded-lg p-2 dark:bg-black"
                        placeholder="Author Link"
                        onChange={(e) => setNewLink(e.target.value)}
                        value={newLink}
                      />
                    </div>
                    <div className="mt-2">
                      <label>CV Link</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray rounded-lg p-2 dark:bg-black"
                        placeholder="CV Link"
                        onChange={(e) => setNewCvLink(e.target.value)}
                        value={newCvLink}
                      />
                    </div>
                    <div className="mt-2">
                      <label>University</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray rounded-lg p-2 dark:bg-black"
                        placeholder="University"
                        onChange={(e) => setNewUniversity(e.target.value)}
                        value={newUniversity}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Professorial Status</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray rounded-lg p-2 dark:bg-black"
                        placeholder="Professorial Status"
                        onChange={(e) =>
                          setNewProfessorialStatus(e.target.value)
                        }
                        value={newProfessorialStatus}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Key Article</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray rounded-lg p-2 dark:bg-black"
                        placeholder="Key Article"
                        onChange={(e) => setNewKeyArticle(e.target.value)}
                        value={newKeyArticle}
                      />
                    </div>
                    <div className="mt-2">
                      <InputTag
                        name="Key Terms"
                        placeholder="Enter a Key Term"
                        table="author"
                        id={id}
                        initialTags={key_terms}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-700 text-base font-medium text-white hover:bg-red-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      deleteAuthor(id);
                      toast.error("Author Deleted!", {
                        theme: "colored",
                      });
                      setOpen(false);
                    }}
                  >
                    Delete Author
                  </button>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      editAuthor(
                        id,
                        newTitle,
                        newLink,
                        newCvLink,
                        newUniversity,
                        newProfessorialStatus,
                        newKeyArticle
                      );
                      toast.success("Author Updated!", {
                        theme: "colored",
                      });
                      setOpen(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
