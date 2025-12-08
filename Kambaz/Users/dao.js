import { v4 as uuidv4 } from "uuid";
import enrollmentModel from "../Enrollments/model.js";
import model from "./model.js";
export default function UsersDao() {
 const createUser = (user) => {
  const newUser = { ...user, _id: uuidv4() };
  return model.create(newUser);
 };
 const findAllUsers = () => model.find();
 const findUserById = (userId) => model.findById(userId);
 const findUserByUsername = (username) => model.findOne({ username: username });
 const findUserByCredentials = (username, password) =>
   model.findOne({ username, password });
 const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
 const deleteUser = (userId) => model.deleteOne({ _id: userId });
  const findUsersByCourse = async (courseId) => {
    const courseEnrollments = await enrollmentModel.find({ course: courseId });
    
    const enrolledUserIds = courseEnrollments.map((enrollment) => enrollment.user);
    
    return await model.find({ _id: { $in: enrolledUserIds } });
 };

const findUsersByPartialName = (partialName) => {
  const fuzzyPattern = partialName.split('').join('.*');
  const regex = new RegExp(fuzzyPattern, "i");
  
  return model.find({
    $or: [
      { firstName: { $regex: regex } }, 
      { lastName: { $regex: regex } }
    ],
  });
};

 const findUsersByRole = (role) => model.find({ role: role });
 return {
   createUser, findAllUsers, findUserById, findUserByUsername, findUserByCredentials, updateUser, deleteUser, findUsersByCourse, findUsersByRole, findUsersByPartialName };
}
const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });