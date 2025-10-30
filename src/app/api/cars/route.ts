import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cars } from '@/lib/schema';

export async function GET() {
  try {
    const allCars = await db.select().from(cars);
    return NextResponse.json(allCars);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCar = await db.insert(cars).values(body).returning();
    return NextResponse.json(newCar);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
  }
}
