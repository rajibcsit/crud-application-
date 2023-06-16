<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\LessonRequest;
use App\Http\Resources\LessonResource;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lessons = Lesson::all();
        return LessonResource::collection($lessons);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $lessons = Lesson::create($request->all());
        return new LessonResource($lessons);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $Singlelesson = Lesson::findOrFail($id);
        return new LessonResource($Singlelesson);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(LessonRequest $request, $id)
    {
        $singleLesson = Lesson::findOrFail($id);

        $singleLesson->name = $request->name;
        $singleLesson->title = $request->title;
        $singleLesson->save();

        return response()->json([
            'message' => "lesson  successfullye update",
            "lesson" => $singleLesson
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();
        return response()->json([
            'message' => "Lesson deleted successfully",
            "lesson" => $lesson
        ], 200);
    }
}
