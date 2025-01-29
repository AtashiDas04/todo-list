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
    const { id } = await req.json();
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
    const { task } = await req.json();
    if (!task || task.trim() === "") {
      return NextResponse.json({ success: false, error: "Task cannot be empty" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { task },
    });

    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
