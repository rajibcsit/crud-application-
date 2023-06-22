"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { privateRequest } from "../../tokenCheck";

function addLesson() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  // const errors: {}
  const storeLesson = async (e) => {
    e.preventDefault();
    await privateRequest
      .post("lesson", { title: title, name: name })
      .then((res) => {
        console.log(res.data.data);
        router.push("/lesson");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <>
        <section className="min-h-screen flex flex-col">
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
              <form className="text-center" onSubmit={storeLesson}>
                <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Add Lesson
                </h1>
                <div className="py-2 text-left">
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    className=" border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                    placeholder="name"
                  />
                </div>
                <div className="py-2 text-left">
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                    placeholder="title"
                  />
                </div>
                <div className="py-2">
                  <button
                    type="submit"
                    className="border-2 border-gray-100 focus:outline-none bg-purple-600 text-white font-bold tracking-wider block w-full p-2 rounded-lg focus:border-gray-700 hover:bg-purple-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    </div>
  );
}

export default addLesson;
