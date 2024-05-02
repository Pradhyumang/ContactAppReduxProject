import { createSlice } from "@reduxjs/toolkit";
// import { loginedUser } from "../storage";

const contactListSlice = createSlice({
  name: "contactList",
  initialState: [],
  reducers: {
    // signInR: (state, action) => {
    //   loginedUser(action.payload, true);
    // },
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
      //   // console.log("if wala");
      // // } else {
      //   // console.log("Else wala works Perfect");
      //   // const currentUser = { ...allUser[userIndex] };
      //   updatedContactList = currentUser.contactList.map((contact) => {
      //     console.log(contact);
      //     if (contact.contactId == updatedContact.contactId) {
      //       return updatedContact;
      //     }
      //     return contact;
      //   });
      // }

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
    fetchContact: (state, action) => {
      console.log("fetch", state, action.payload);
    },
  },
});
export const { addContact, deleteContact, editContact, fetchContact, signUpR } =
  contactListSlice.actions;
export default contactListSlice.reducer;
