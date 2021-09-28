import React, { useState } from "react"
import { AddTask } from "./AddTask"

import { RiFileList2Line } from "react-icons/ri"

export default function Header() {
    const [shouldShowMain, setShouldShowMain] = useState(false)
    const [showQuickAddTask, setShowQuickAddTask] = useState(false)
    return (
        <header className="bg-black text-white text-2xl flex justify-end py-4 px-8">
            <nav>
                <div className="">
                    <ul>
                        <li className="">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowQuickAddTask(true)
                                    setShouldShowMain(true)
                                }}
                            >
                                +
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <AddTask
                showAddTaskMain={false}
                shouldShowMain={shouldShowMain}
                showQuickAddTask={showQuickAddTask}
                setShowQuickAddTask={setShowQuickAddTask}
            />
        </header>
    )
}
