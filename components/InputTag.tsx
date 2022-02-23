import React, { useState, useEffect } from "react";
import { useAuthorStore } from "../store/authorStore";
import { useKeytermStore } from "../store/keytermStore";

export default function InputTag({
  name,
  placeholder,
  table,
  id,
  initialTags,
}: any) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState(JSON.parse(initialTags) || []);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const updateAuthorTags = useAuthorStore(
    (state: any) => state.updateAuthorTags
  );
  const updateKeytermTags = useKeytermStore(
    (state: any) => state.updateKeytermTags
  );
  const updateSubAuthorTags = useAuthorStore(
    (state: any) => state.updateSubAuthorTags
  );
  const updateSubKeytermTags = useKeytermStore(
    (state: any) => state.updateSubKeytermTags
  );

  useEffect(() => {
    if (tags.length == 7) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [tags]);

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  const addTag = async () => {
    const trimmedInput = input.trim();
    // @ts-ignore
    setTags((prevState) => [...prevState, trimmedInput]);
    if (table === "author") {
      await updateAuthorTags(id, [...tags, trimmedInput]);
    }
    if (table === "keyterm") {
      await updateKeytermTags(id, [...tags, trimmedInput]);
    }
    if (table === "subauthor") {
      await updateSubAuthorTags(id, [...tags, trimmedInput]);
    }
    if (table === "subkeyterm") {
      await updateSubKeytermTags(id, [...tags, trimmedInput]);
    }
    setInput("");
  };

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimmedInput = input.trim();

    // @ts-ignore
    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      // @ts-ignore
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    // @ts-ignore
    if (
      key === "Enter" &&
      trimmedInput.length &&
      //   @ts-ignore
      !tags.includes(trimmedInput)
    ) {
      e.preventDefault();
      // @ts-ignore
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      // @ts-ignore
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = async (index: number) => {
    //   @ts-ignore
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
    //   @ts-ignore
    const filteredTags = tags.filter((tag, i) => i !== index);
    if (table === "author") {
      await updateAuthorTags(id, [...filteredTags]);
    }
    if (table === "keyterm") {
      await updateKeytermTags(id, [...filteredTags]);
    }
    if (table === "subauthor") {
      await updateSubAuthorTags(id, [...filteredTags]);
    }
    if (table === "subkeyterm") {
      await updateSubKeytermTags(id, [...filteredTags]);
    }
  };

  return (
    <div className="container">
      <label>{name}</label>
      <div className="flex">
        <input
          className="w-full mr-2 focus:outline-none focus:none focus:none border-2 dark:border-0 border-dashGray rounded-lg p-2 dark:bg-black"
          value={input}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onChange={onChange}
          disabled={disabled}
        />
        <button
          type="button"
          className="disabled:bg-silver w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-green focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => addTag()}
          disabled={disabled}
        >
          Add
        </button>
      </div>
      <div className="flex mt-2 flex-wrap">
        {tags.map((tag: any, index: any) => (
          <div className="bg-primary p-2 text-white rounded-lg m-1">
            {tag}
            <button className="ml-2" onClick={() => deleteTag(index)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
