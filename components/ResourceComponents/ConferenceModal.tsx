/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IModalProps {
  open: boolean;
  id: number;
  setOpen: (open: boolean) => void;
  editConference: (
    id: number,
    title: string,
    link: string,
    association: string,
    association_link: string,
    fall_start_date: Date,
    fall_end_date: Date,
    spring_start_date: Date,
    spring_end_date: Date,
    summer_start_date: Date,
    summer_end_date: Date,
    winter_start_date: Date,
    winter_end_date: Date,
    submission_deadline: Date,
    registration_deadline: Date
  ) => void;
  deleteConference: (id: number) => void;
  title: string;
  link: string;
  association: string;
  association_link: string;
  fall_start_date: Date;
  fall_end_date: Date;
  spring_start_date: Date;
  spring_end_date: Date;
  summer_start_date: Date;
  summer_end_date: Date;
  winter_start_date: Date;
  winter_end_date: Date;
  submission_deadline: Date;
  registration_deadline: Date;
}

export default function ConferenceModal({
  open,
  id,
  setOpen,
  editConference,
  title,
  link,
  association,
  association_link,
  fall_start_date,
  fall_end_date,
  spring_start_date,
  spring_end_date,
  summer_start_date,
  summer_end_date,
  winter_start_date,
  winter_end_date,
  submission_deadline,
  registration_deadline,
  deleteConference,
}: IModalProps) {
  const cancelButtonRef = useRef(null);
  const [newTitle, setNewTitle] = useState(title);
  const [newLink, setNewLink] = useState(link);
  const [newAssociation, setNewAssociation] = useState(association);
  const [newAssociationLink, setNewAssociationLink] =
    useState(association_link);
  const [newFallStartDate, setNewFallStartDate] = useState(fall_start_date);
  const [newFallEndDate, setNewFallEndDate] = useState(fall_end_date);
  const [newSpringStartDate, setNewSpringStartDate] =
    useState(spring_start_date);
  const [newSpringEndDate, setNewSpringEndDate] = useState(spring_end_date);
  const [newSummerStartDate, setNewSummerStartDate] =
    useState(summer_start_date);
  const [newSummerEndDate, setNewSummerEndDate] = useState(summer_end_date);
  const [newWinterStartDate, setNewWinterStartDate] =
    useState(winter_start_date);
  const [newWinterEndDate, setNewWinterEndDate] = useState(winter_end_date);
  const [newSubmissionDeadline, setNewSubmissionDeadline] =
    useState(submission_deadline);
  const [newRegistrationDeadline, setNewRegistrationDeadline] = useState(
    registration_deadline
  );

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
            <div className="dark:bg-dark inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-xl leading-6 font-medium text-gray-900"
                    >
                      Edit Conference
                    </Dialog.Title>
                    <div className="mt-4">
                      <label>Conference Name</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                        placeholder="Conference Name"
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Conference Link</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                        placeholder="Conference Link"
                        onChange={(e) => setNewLink(e.target.value)}
                        value={newLink}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Association</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                        placeholder="Association"
                        onChange={(e) => setNewAssociation(e.target.value)}
                        value={newAssociation}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Association Link</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                        placeholder="Association Link"
                        onChange={(e) => setNewAssociationLink(e.target.value)}
                        value={newAssociationLink}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Deadline to Submit</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                        type="date"
                        onChange={(e) =>
                          // @ts-ignore
                          setNewSubmissionDeadline(e.target.value)
                        }
                        // @ts-ignore
                        value={newSubmissionDeadline}
                      />
                    </div>
                    <div className="mt-2">
                      <label>Registration Deadline</label>
                      <input
                        className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                        type="date"
                        onChange={(e) =>
                          // @ts-ignore
                          setNewRegistrationDeadline(e.target.value)
                        }
                        // @ts-ignore
                        value={newRegistrationDeadline}
                      />
                    </div>
                    <div className="mt-2 flex space-x-4">
                      <div>
                        <label>Fall Start Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          // @ts-ignore
                          onChange={(e) => setNewFallStartDate(e.target.value)}
                          // @ts-ignore
                          value={newFallStartDate}
                        />
                      </div>
                      <div>
                        <label>Fall End Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          // @ts-ignore
                          onChange={(e) => setNewFallEndDate(e.target.value)}
                          // @ts-ignore
                          value={newFallEndDate}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-4">
                      <div>
                        <label>Spring Start Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          onChange={(e) =>
                            // @ts-ignore
                            setNewSpringStartDate(e.target.value)
                          }
                          // @ts-ignore
                          value={newSpringStartDate}
                        />
                      </div>
                      <div>
                        <label>Spring End Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          // @ts-ignore
                          onChange={(e) => setNewSpringEndDate(e.target.value)}
                          // @ts-ignore
                          value={newSpringEndDate}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-4">
                      <div>
                        <label>Summer Start Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          onChange={(e) =>
                            // @ts-ignore
                            setNewSummerStartDate(e.target.value)
                          }
                          // @ts-ignore
                          value={newSummerStartDate}
                        />
                      </div>
                      <div>
                        <label>Summer End Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          // @ts-ignore
                          onChange={(e) => setNewSummerEndDate(e.target.value)}
                          // @ts-ignore
                          value={newSummerEndDate}
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex space-x-4">
                      <div>
                        <label>Winter Start Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          onChange={(e) =>
                            // @ts-ignore
                            setNewWinterStartDate(e.target.value)
                          }
                          // @ts-ignore
                          value={newWinterStartDate}
                        />
                      </div>
                      <div>
                        <label>Winter End Date</label>
                        <input
                          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 border-dashGray dark:border-0 rounded-lg p-2 dark:bg-black"
                          type="date"
                          // @ts-ignore
                          onChange={(e) => setNewWinterEndDate(e.target.value)}
                          // @ts-ignore
                          value={newWinterEndDate}
                        />
                      </div>
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
                      deleteConference(id);
                      toast.error("Conference Deleted!", {
                        theme: "colored",
                      });
                      setOpen(false);
                    }}
                  >
                    Delete Conference
                  </button>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      editConference(
                        id,
                        newTitle,
                        newLink,
                        newAssociation,
                        newAssociationLink,
                        newFallStartDate,
                        newFallEndDate,
                        newSpringStartDate,
                        newSpringEndDate,
                        newSummerStartDate,
                        newSummerEndDate,
                        newWinterStartDate,
                        newWinterEndDate,
                        newSubmissionDeadline,
                        newRegistrationDeadline
                      );
                      toast.success("Conference Updated!", {
                        theme: "colored",
                      });
                      setOpen(false);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 dark:bg-dark focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
