/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});



// React Native SQLite Demo Project (Modern Approach)
// Here's a complete demo project using modern React Native practices with TypeScript, hooks, and a clean architecture approach.

// Project Structure
// Copy
// /src
//   /components
//     UserForm.tsx
//     UserList.tsx
//   /database
//     db.ts
//     models.ts
//     queries.ts
//   /hooks
//     useUsers.ts
//   /screens
//     HomeScreen.tsx
//   App.tsx
// 1. Database Setup (/database)
// db.ts - Database initialization
// typescript
// Copy
// import SQLite from 'react-native-sqlite-storage';

// SQLite.enablePromise(true);

// interface Database {
//   name: string;
//   version: number;
// }

// const databaseConfig: Database = {
//   name: 'UserDB.db',
//   version: 1,
// };

// const openDatabase = async () => {
//   return SQLite.openDatabase(
//     databaseConfig,
//     () => console.log('Database connected'),
//     error => console.error('Database error', error)
//   );
// };

// export const getDBConnection = async () => {
//   return openDatabase();
// };

// export const closeDatabase = async () => {
//   return SQLite.closeDatabase();
// };
// models.ts - Type definitions
// typescript
// Copy
// export interface User {
//   id: number;
//   name: string;
//   email: string;
//   createdAt: string;
// }

// export type CreateUser = Omit<User, 'id' | 'createdAt'>;
// queries.ts - All SQL queries
// typescript
// Copy
// export const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;

// export const dropTableQuery = 'DROP TABLE IF EXISTS users;';

// export const getUserByIdQuery = 'SELECT * FROM users WHERE id = ?;';

// export const getAllUsersQuery = 'SELECT * FROM users ORDER BY createdAt DESC;';

// export const createUserQuery = 'INSERT INTO users (name, email) VALUES (?, ?);';

// export const updateUserQuery = 'UPDATE users SET name = ?, email = ? WHERE id = ?;';

// export const deleteUserQuery = 'DELETE FROM users WHERE id = ?;';
// 2. Custom Hook (/hooks/useUsers.ts)
// typescript
// Copy
// import { useEffect, useState } from 'react';
// import { getDBConnection } from '../database/db';
// import { User, CreateUser } from '../database/models';
// import {
//   createTableQuery,
//   getAllUsersQuery,
//   createUserQuery,
//   updateUserQuery,
//   deleteUserQuery,
// } from '../database/queries';

// export const useUsers = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const initDB = async () => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(createTableQuery);
//       const users = await fetchUsers(db);
//       setUsers(users);
//     } catch (err) {
//       setError('Failed to initialize database');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async (db: any): Promise<User[]> => {
//     try {
//       const [results] = await db.executeSql(getAllUsersQuery);
//       return results.rows.raw();
//     } catch (err) {
//       console.error(err);
//       return [];
//     }
//   };

//   const addUser = async (user: CreateUser) => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(createUserQuery, [user.name, user.email]);
//       const updatedUsers = await fetchUsers(db);
//       setUsers(updatedUsers);
//     } catch (err) {
//       setError('Failed to add user');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUser = async (id: number, user: CreateUser) => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(updateUserQuery, [user.name, user.email, id]);
//       const updatedUsers = await fetchUsers(db);
//       setUsers(updatedUsers);
//     } catch (err) {
//       setError('Failed to update user');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (id: number) => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(deleteUserQuery, [id]);
//       const updatedUsers = await fetchUsers(db);
//       setUsers(updatedUsers);
//     } catch (err) {
//       setError('Failed to delete user');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     initDB();
//   }, []);

//   return { users, loading, error, addUser, updateUser, deleteUser };
// };
// 3. Components (/components)
// UserForm.tsx
// typescript
// Copy
// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';
// import { CreateUser } from '../database/models';

// interface UserFormProps {
//   onSubmit: (user: CreateUser) => void;
//   initialValues?: CreateUser;
//   loading?: boolean;
// }

// export const UserForm: React.FC<UserFormProps> = ({
//   onSubmit,
//   initialValues = { name: '', email: '' },
//   loading,
// }) => {
//   const [user, setUser] = useState<CreateUser>(initialValues);

//   const handleSubmit = () => {
//     onSubmit(user);
//     setUser({ name: '', email: '' });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={user.name}
//         onChangeText={name => setUser({ ...user, name })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={user.email}
//         onChangeText={email => setUser({ ...user, email })}
//         keyboardType="email-address"
//       />
//       <Button
//         title={initialValues.name ? 'Update' : 'Add'}
//         onPress={handleSubmit}
//         disabled={loading || !user.name || !user.email}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });
// UserList.tsx
// typescript
// Copy
// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
// import { User } from '../database/models';

// interface UserListProps {
//   users: User[];
//   onEdit: (user: User) => void;
//   onDelete: (id: number) => void;
//   loading?: boolean;
// }

// export const UserList: React.FC<UserListProps> = ({
//   users,
//   onEdit,
//   onDelete,
//   loading,
// }) => {
//   const renderItem = ({ item }: { item: User }) => (
//     <View style={styles.item}>
//       <View>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.email}>{item.email}</Text>
//       </View>
//       <View style={styles.actions}>
//         <Button title="Edit" onPress={() => onEdit(item)} disabled
// use all .js file
// React Native SQLite Demo Project (Modern JavaScript Version)
// Here's the complete demo project using JavaScript files (.js) instead of TypeScript, following modern React Native practices with hooks and clean architecture.

// Project Structure
// Copy
// /src
//   /components
//     UserForm.js
//     UserList.js
//   /database
//     db.js
//     queries.js
//   /hooks
//     useUsers.js
//   /screens
//     HomeScreen.js
//   App.js
// 1. Database Setup (/database)
// db.js - Database initialization
// javascript
// Copy
// import SQLite from 'react-native-sqlite-storage';

// SQLite.enablePromise(true);

// const databaseConfig = {
//   name: 'UserDB.db',
//   version: 1,
// };

// const openDatabase = async () => {
//   return SQLite.openDatabase(
//     databaseConfig,
//     () => console.log('Database connected'),
//     error => console.error('Database error', error)
//   );
// };

// export const getDBConnection = async () => {
//   return openDatabase();
// };

// export const closeDatabase = async () => {
//   return SQLite.closeDatabase();
// };
// queries.js - All SQL queries
// javascript
// Copy
// export const createTableQuery = `
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   );
// `;

// export const dropTableQuery = 'DROP TABLE IF EXISTS users;';

// export const getUserByIdQuery = 'SELECT * FROM users WHERE id = ?;';

// export const getAllUsersQuery = 'SELECT * FROM users ORDER BY createdAt DESC;';

// export const createUserQuery = 'INSERT INTO users (name, email) VALUES (?, ?);';

// export const updateUserQuery = 'UPDATE users SET name = ?, email = ? WHERE id = ?;';

// export const deleteUserQuery = 'DELETE FROM users WHERE id = ?;';
// 2. Custom Hook (/hooks/useUsers.js)
// javascript
// Copy
// import { useEffect, useState } from 'react';
// import { getDBConnection } from '../database/db';
// import {
//   createTableQuery,
//   getAllUsersQuery,
//   createUserQuery,
//   updateUserQuery,
//   deleteUserQuery,
// } from '../database/queries';

// export const useUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [editingUser, setEditingUser] = useState(null);

//   const initDB = async () => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(createTableQuery);
//       const users = await fetchUsers(db);
//       setUsers(users);
//     } catch (err) {
//       setError('Failed to initialize database');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async (db) => {
//     try {
//       const [results] = await db.executeSql(getAllUsersQuery);
//       return results.rows.raw();
//     } catch (err) {
//       console.error(err);
//       return [];
//     }
//   };

//   const addUser = async (user) => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(createUserQuery, [user.name, user.email]);
//       const updatedUsers = await fetchUsers(db);
//       setUsers(updatedUsers);
//     } catch (err) {
//       setError('Failed to add user');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateUser = async (id, user) => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(updateUserQuery, [user.name, user.email, id]);
//       const updatedUsers = await fetchUsers(db);
//       setUsers(updatedUsers);
//       setEditingUser(null);
//     } catch (err) {
//       setError('Failed to update user');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       setLoading(true);
//       const db = await getDBConnection();
//       await db.executeSql(deleteUserQuery, [id]);
//       const updatedUsers = await fetchUsers(db);
//       setUsers(updatedUsers);
//     } catch (err) {
//       setError('Failed to delete user');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const startEditing = (user) => {
//     setEditingUser(user);
//   };

//   const handleSubmit = (user) => {
//     if (editingUser) {
//       updateUser(editingUser.id, user);
//     } else {
//       addUser(user);
//     }
//   };

//   useEffect(() => {
//     initDB();
//   }, []);

//   return {
//     users,
//     loading,
//     error,
//     editingUser,
//     handleSubmit,
//     deleteUser,
//     startEditing,
//     setEditingUser,
//   };
// };
// 3. Components (/components)
// UserForm.js
// javascript
// Copy
// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';

// export const UserForm = ({ onSubmit, initialValues = { name: '', email: '' }, loading, onCancel }) => {
//   const [user, setUser] = useState(initialValues);

//   useEffect(() => {
//     setUser(initialValues);
//   }, [initialValues]);

//   const handleSubmit = () => {
//     onSubmit(user);
//     setUser({ name: '', email: '' });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={user.name}
//         onChangeText={name => setUser({ ...user, name })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={user.email}
//         onChangeText={email => setUser({ ...user, email })}
//         keyboardType="email-address"
//       />
//       <View style={styles.buttons}>
//         {onCancel && (
//           <Button
//             title="Cancel"
//             onPress={onCancel}
//             color="#999"
//           />
//         )}
//         <Button
//           title={initialValues.name ? 'Update' : 'Add'}
//           onPress={handleSubmit}
//           disabled={loading || !user.name || !user.email}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
// });
// UserList.js
// javascript
// Copy
// import React from 'react';
// import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

// export const UserList = ({ users, onEdit, onDelete, loading }) => {
//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <View>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.email}>{item.email}</Text>
//       </View>
//       <View style={styles.actions}>
//         <Button title="Edit" onPress={() => onEdit(item)} disabled={loading} />
//         <Button
//           title="Delete"
//           onPress={() => onDelete(item.id)}
//           disabled={loading}
//           color="red"
//         />
//       </View>
//     </View>
//   );

//   return (
//     <FlatList
//       data={users}
//       renderItem={renderItem}
//       keyExtractor={item => item.id.toString()}
//       contentContainerStyle={styles.list}
//       ListEmptyComponent={
//         <Text style={styles.empty}>{loading ? 'Loading...' : 'No users found'}</Text>
//       }
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     padding: 16,
//   },
//   item: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     marginBottom: 8,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 4,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   email: {
//     fontSize: 14,
//     color: '#666',
//   },
//   actions: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   empty: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#666',
//   },
// });
// 4. Screen (/screens/HomeScreen.js)
// javascript
// Copy
// import React from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { UserForm } from '../components/UserForm';
// import { UserList } from '../components/UserList';
// import { useUsers } from '../hooks/useUsers';

// export const HomeScreen = () => {
//   const {
//     users,
//     loading,
//     error,
//     editingUser,
//     handleSubmit,
//     deleteUser,
//     startEditing,
//     setEditingUser,
//   } = useUsers();

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {error && <Text style={styles.error}>{error}</Text>}
      
//       <UserForm
//         onSubmit={handleSubmit}
//         initialValues={editingUser || { name: '', email: '' }}
//         loading={loading}
//         onCancel={editingUser ? () => setEditingUser(null) : null}
//       />
      
//       <UserList
//         users={users}
//         onEdit={startEditing}
//         onDelete={deleteUser}
//         loading={loading}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingBottom: 20,
//   },
//   error: {
//     color: 'red',
//     textAlign: 'center',
//     margin: 10,
//   },
// });
// 5. App Entry Point (App.js)
// javascript
// Copy
// import React from 'react';
// import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// import { HomeScreen } from './src/screens/HomeScreen';

// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <HomeScreen />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default App;
// How to Use This Demo
// Install dependencies:

// bash
// Copy
// npm install react-native-sqlite-storage
// # or
// yarn add react-native-sqlite-storage
// For iOS, install pods:

// bash
// Copy
// cd ios && pod install && cd ..
// Run the app:

// bash
// Copy
// npx react-native run-android
// # or
// npx react-native run-ios
// Key Features of This Implementation:
// Modern Hook-based Architecture: Uses custom hooks to manage database operations

// Clean Separation of Concerns: Database logic separated from UI components

// CRUD Operations: Full Create, Read, Update, Delete functionality

// Loading States: Proper loading indicators during database operations

// Error Handling: Basic error handling and display

// Edit Functionality: Inline editing of user records

// Responsive Design: Works on both iOS and Android

// This implementation provides a solid foundation that you can extend with more complex queries, relationships between tables, or additional features like search and sorting.