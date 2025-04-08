import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {userId, sessionClaims } = await auth();

    if(!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    const {room} = await req.json();

    const session = liveblocks.prepareSession(sessionClaims?.email!, {
        userInfo: {
            name: sessionClaims?.fullName!,
            email: sessionClaims?.email!,
            avatar: sessionClaims?.image!,
        },
    });

    const usersInRoom = await adminDb.collectionGroup("rooms").where("userId", "==", sessionClaims?.email).get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);
    
    if (userInRoom?.exists){
        // console.log("You are authorized to access this room.");
        session.allow(room, session.FULL_ACCESS);
        const {body, status} = await session.authorize();

        return new Response(body, { status });
    } else {
        return NextResponse.json({ error: "You are not in this Room." }, { status: 403 });
    }
}