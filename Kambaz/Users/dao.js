import { v4 as uuidv4 } from "uuid";
import enrollments from "../Database/enrollments.js";
export default function UsersDao(db) {
 let { users } = db;
 const createUser = (user) => {
   const newUser = { ...user, _id: uuidv4() };
   users = [...users, newUser];
   return newUser;
 };
 const findAllUsers = () => users;
 const findUserById = (userId) => users.find((user) => user._id === userId);
 const findUserByUsername = (username) => users.find((user) => user.username === username);
 const findUserByCredentials = (username, password) =>
   users.find((user) => user.username === username && user.password === password);
 const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
 const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
 const findUsersByCourse = (courseId) => {
    const courseEnrollments = enrollments.filter((enrollment) => enrollment.course === courseId);
    const enrolledUserIds = courseEnrollments.map((enrollment) => enrollment.user);
    return users.filter((user) => enrolledUserIds.includes(user._id));
 }
 return {
   createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, updateUser, deleteUser, findUsersByCourse };
}
