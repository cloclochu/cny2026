'use server';

import clientPromise from '@/lib/mongodb';

function formatDate(value) {
  if (!value) return '-';
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toISOString().replace('T', ' ').replace('Z', ' UTC');
}

export default async function AdminPage() {
  const client = await clientPromise;
  const db = client.db('chunjie');
  const users = await db
    .collection('users')
    .find({}, { projection: { _id: 0, username: 1, loginCount: 1, lastLogin: 1, createdAt: 1 } })
    .sort({ loginCount: -1, lastLogin: -1 })
    .toArray();
  const logs = await db
    .collection('logs')
    .find({}, { projection: { _id: 0, username: 1, action: 1, detail: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(200)
    .toArray();

  return (
    <main className="min-h-screen bg-black text-yellow-100 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <section className="space-y-4">
          <h1 className="text-3xl font-black">Admin - Connexions</h1>
          <div className="bg-gradient-to-br from-red-950/70 to-amber-950/70 border border-yellow-500/40 rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-3 text-sm font-semibold text-yellow-300">
              <div>Utilisateur</div>
              <div>Connexions</div>
              <div>Derniere connexion</div>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {users.length === 0 && <div className="text-yellow-200/60">Aucun utilisateur.</div>}
              {users.map((user) => (
                <div
                  key={user.username}
                  className="grid grid-cols-3 gap-3 bg-black/40 rounded-lg px-3 py-2"
                >
                  <div className="font-bold">{user.username}</div>
                  <div>{user.loginCount || 0}</div>
                  <div>{formatDate(user.lastLogin)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black">Historique</h2>
          <div className="bg-gradient-to-br from-red-950/70 to-amber-950/70 border border-yellow-500/40 rounded-2xl p-4">
            <div className="grid grid-cols-4 gap-3 text-sm font-semibold text-yellow-300">
              <div>Time</div>
              <div>User</div>
              <div>Action</div>
              <div>Detail</div>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {logs.length === 0 && <div className="text-yellow-200/60">Aucun log.</div>}
              {logs.map((log, index) => (
                <div key={`${log.username}-${log.createdAt}-${index}`} className="grid grid-cols-4 gap-3 bg-black/40 rounded-lg px-3 py-2">
                  <div>{formatDate(log.createdAt)}</div>
                  <div className="font-bold">{log.username || '-'}</div>
                  <div>{log.action || '-'}</div>
                  <div className="text-yellow-100/80">{log.detail || '-'}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
