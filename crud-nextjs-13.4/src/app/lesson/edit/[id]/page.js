"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { privateRequest } from "../../../tokenCheck";
import hook from "../../../hook";

function editLesson({ params }) {
  hook();
  const endpoint = "http://127.0.0.1:8000/api/lesson/";

  const [name, setName] = useState();
  const [title, setTitle] = useState();

  //Catch request id with UseRouter
  //   const router = useRouter();
  const id = params.id;

  const router = useRouter();

  //render Data
  useEffect(() => {
    getSinlgeLesson();
  }, []);

  //getSingleLesson
  const getSinlgeLesson = async () => {
    try {
      await privateRequest.get(`lesson/${id}`).then((res) => {
        setName(res.data.data.name);
        console.log(res.data.data.name);
        setTitle(res.data.data.title);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //updateLesson
  const updateLesson = async (e) => {
    e.preventDefault();
    await privateRequest
      .put(`lesson/${id}`, { title: title, name: name })
      .then((response) => {
        console.log(response.data);
        router.push("/lesson");
      })
      .catch((error) => {
        console.log("test__00", error.response.data.errorMsg);
      });
  };

  return (
    <div>
      <>
        <section className="min-h-screen flex flex-col">
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-lg sm:border-2 px-4 lg:px-24 py-16 lg:max-w-xl sm:max-w-md w-full text-center">
              <form className="text-center" onSubmit={updateLesson}>
                <h1 className="font-bold tracking-wider text-3xl mb-8 w-full text-gray-600">
                  Update Lesson
                </h1>
                <div className="py-2 text-left">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" border-2 border-gray-100 focus:outline-none bg-gray-100 block w-full py-2 px-4 rounded-lg focus:border-gray-700 "
                    placeholder="name"
                  />
                </div>
                <div className="py-2 text-left">
                  <input
                    type="text"
                    name="title"
                    value={title}
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
                    Update
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

export default editLesson;
