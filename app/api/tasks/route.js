import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id, deleteAll } = await req.json();

    if (deleteAll) {
      // Delete all tasks
      await prisma.task.deleteMany();
      return NextResponse.json({ success: true, deletedAll: true }, { status: 200 });
    }

    if (!id) {
      return NextResponse.json({ success: false, error: "Task ID is required" }, { status: 400 });
    }

    const deletedTask = await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true, deletedId: deletedTask.id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
    try {
      const body = await req.text(); // Read request body as text
      if (!body) {
        return NextResponse.json({ success: false, error: "Empty request body" }, { status: 400 });
      }
  
      const { task } = JSON.parse(body); // Now parse it safely
  
      if (!task || task.trim() === "") {
        return NextResponse.json({ success: false, error: "Task cannot be empty" }, { status: 400 });
      }
  
      const newTask = await prisma.task.create({
        data: { task },
      });
  
      return NextResponse.json({ success: true, task: newTask }, { status: 201 });
    } catch (error) {
      console.error("Error in POST API:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  