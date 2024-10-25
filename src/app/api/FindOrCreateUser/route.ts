import { NextRequest, NextResponse } from "next/server";
import { eq } from 'drizzle-orm';
import { db } from "@/utils/db";
import { users } from '@/models/schema';

export async function POST(request: NextRequest) {

    const body = await request.json();
    const userEmail = body.userEmail;     

    try {
        const existingUser = await db.select().from(users).where(eq(users.user, userEmail)).limit(1);
        
        if (existingUser.length > 0) {
            return NextResponse.json(existingUser[0], { status: 200 });
        }
    
        const newUser = await db.insert(users).values({
            user: userEmail,
            credits: 0,
            maxUsageCredits: 50000,
        }).returning();
    
        return NextResponse.json(newUser[0], { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }    
}