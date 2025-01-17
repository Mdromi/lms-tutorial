import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    if (!body || !body.title) {
      return new NextResponse("Invalid Request", { status: 400 });
    }
    
    const { title } = body;
    
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    
    

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
