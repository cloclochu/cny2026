// app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    const normalizedUsername = String(username || '').trim().toLowerCase();
    const allowedUsers = new Set(['yan', 'fang', 'shi', 'mathilde', 'yu']);

    if (!allowedUsers.has(normalizedUsername)) {
      return NextResponse.json(
        { error: 'Nom non autorisé' },
        { status: 403 }
      );
    }

    // Simple password check
    if (password !== 'chunjie2026') {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('chunjie'); // Database name
    const users = db.collection('users');

    // Check if user exists
    let user = await users.findOne({ username: normalizedUsername });

    if (!user) {
      // Create new user if doesn't exist
      const newUser = {
        username: normalizedUsername,
        createdAt: new Date(),
        lastLogin: new Date()
      };
      await users.insertOne(newUser);
      user = newUser;
    } else {
      // Update last login
      await users.updateOne(
        { username: username },
        { $set: { lastLogin: new Date() } }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        username: user.username,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
