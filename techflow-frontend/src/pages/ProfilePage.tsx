import React, { useEffect, useState } from 'react';
import { Layout } from '../components/common/Layout';
import { Card } from '../components/common/Card';
import { authService } from '../services/authService';
import type { User } from '../types';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      console.log('Loading profile...');
      const data = await authService.getProfile();
      setUser(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Perfil</h1>

        <Card>
          {user == null ? (
            <p className="text-gray-500">No se encontró información del usuario.</p>
          ) : (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Nombre</h2>
                <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500">Email</h2>
                <p className="text-lg text-gray-700">{user.email}</p>
              </div>

              <div>
                <h2 className="text-sm font-medium text-gray-500">ID</h2>
                <p className="text-sm text-gray-600">{user.id}</p>
              </div>

              {user.createdAt && (
                <div>
                  <h2 className="text-sm font-medium text-gray-500">Creado</h2>
                  <p className="text-sm text-gray-600">{new Date(user.createdAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;
