import { createSlice } from "@reduxjs/toolkit";
// import { loginedUser } from "../storage";

const contactListSlice = createSlice({
  name: "contactList",
  initialState: [],
  reducers: {
    signUpR: (state, action) => {
      return [...state, action.payload.data];
    },
    addContact: (state, action) => {
      const { newContact, currentUserId, allUser } = action.payload;
      const userIndex = allUser.findIndex(
        (user) => user.userId === currentUserId
      );
      if (userIndex === -1) {
        console.error("User not found");
        return state;
      }
      const currentUser = { ...allUser[userIndex] };
      const newContactList = [...currentUser.contactList, newContact];
      const updatedUser = {
        ...currentUser,
        contactList: newContactList,
      };
      const updatedAllUser = [
        ...allUser.slice(0, userIndex),
        updatedUser,
        // ...allUser.slice(userIndex + 1),
      ];
      return updatedAllUser;
    },
    deleteContact: (state, action) => {
      const { contactId, currUser, allUser } = action.payload;
      const userIndex = allUser.findIndex((user) => user.userId == currUser);
      if (userIndex === -1) {
        console.error("User not found");
        return state;
      }
      const currentUser = { ...allUser[userIndex] };
      const newContactList = currentUser.contactList.filter(
        (contact) => contact.contactId != contactId
      );
      const updatedUser = {
        ...currentUser,
        contactList: newContactList,
      };

      const updatedAllUsers = [
        ...allUser.slice(0, userIndex),
        updatedUser,
        ...allUser.slice(userIndex + 1),
      ];

      return updatedAllUsers;
    },

    editContact: (state, action) => {
      // console.log("edit", action.payload);
      const { updatedContact, currentUserId, allUser } = action.payload;

      const userIndex = allUser.findIndex(
        (user) => user.userId === currentUserId
      );
      if (userIndex === -1) {
        console.error("User not found");
        return state;
      }
      // let updatedContactList;
      const currentUser = { ...allUser[userIndex] };
      // if (updatedContact.image) {
      const updatedContactList = currentUser.contactList.map((contact) => {
        // console.log(contact);
        if (contact.contactId === updatedContact.contactId) {
          return updatedContact;
        }
        return contact;
      });

      const updatedUser = {
        ...currentUser,
        contactList: updatedContactList,
      };

      const updatedAllUsers = [
        ...allUser.slice(0, userIndex),
        updatedUser,
        ...allUser.slice(userIndex + 1),
      ];

      return updatedAllUsers;
    },
    importContact: (state, action) => {
      // console.log("Import Reducer", state, action.payload);
      const { excelContactList, currentUserId, allUser } = action.payload;
      // const check = excelContactList.map((excelEachContact) => {
      const userIndex = allUser.findIndex(
        (user) => user.userId == currentUserId
      );
      if (userIndex === -1) {
        console.error("User not found");
        return state;
      }
      const currentUser = { ...allUser[userIndex] };
      const newContactList = [...currentUser.contactList, ...excelContactList];
      const updatedUser = {
        ...currentUser,
        contactList: newContactList,
      };
      const updatedAllUser = [
        ...allUser.slice(0, userIndex),
        updatedUser,
        ...allUser.slice(userIndex + 1),
      ];
      return updatedAllUser;
      // });
      // console.log(check);
      // return check;
    },
  },
});
export const {
  addContact,
  deleteContact,
  editContact,
  importContact,
  signUpR,
} = contactListSlice.actions;
export default contactListSlice.reducer;
