// function save(data) {
//   localStorage.setItem("contactApp", JSON.stringify(data));
// }
// export function getAllUser() {
//   try {
//     const allUser = JSON.parse(localStorage.getItem("contactApp"));
//     return allUser;
//   } catch (error) {
//     console.error("An error occurred:", error.message);
//   }
// }
// export function getOneRecord(email, password) {
//   const data = getAllUser();
//   const userIdIndex = data.findIndex(
//     (dt) => dt.email == email && dt.password == password
//   );
//   if (userIdIndex != -1) {
//     const record = data[userIdIndex];
//     // console.log(record);
//     return record;
//   } else {
//     return false;
//   }
// }
// export function deleteData(userId) {
//   const cnf = confirm("Are You Sure to Delete ?");
//   if (cnf) {
//     const data = getAllUser();
//     const userIdIndex = data.findIndex((dt) => dt.userId == userId);
//     if (userIdIndex != -1) {
//       data.splice(userIdIndex, 1);
//       save(data);
//     }
//     return true;
//   } else return false;
// }

// export function setStorageUser(data) {
//   //  for storing data in local storage
//   const dataAll = getAllUser();
//   if (dataAll === null || dataAll.length === 0) {
//     const arr = [];
//     arr.push(data);
//     save(arr);
//     alert("User Registration Successfull");
//     return true;
//   } else {
//     const arr = dataAll;
//     arr.push(data);
//     save(arr);
//     alert("User Registration Successfull");
//     return true;
//   }
// }
// // export function updateData(idUser, updateInfo) {
// //   const data = getAllUser();
// //   const userIdIndex = data.findIndex((dt) => dt.userId == idUser);
// //   if (userIdIndex != -1) {
// //     data.splice(userIdIndex, 1, updateInfo);
// //     save(data);
// //     alert("Update Successfull");
// //   }
// //   return true;
// // }
// // login
// export function loginedUser(id, logined) {
//   localStorage.setItem(
//     "currentUser",
//     JSON.stringify({ userId: id, login: logined })
//   );
// }
// export function getLoginUserId() {
//   try {
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (currentUser) {
//       return currentUser;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     // console.log("unable to find user", error);
//   }
// }
// export function logout() {
//   localStorage.setItem("currentUser", "");
// }
// //add contact
// export function addContact(newContactData, imp = false) {
//   const dataAll = getAllUser();
//   const userId = getLoginUserId().userId;
//   const userIdIndex = dataAll.findIndex((dt) => dt.userId == userId);
//   const contactlist = dataAll[userIdIndex].contactList;
//   contactlist.push(newContactData);
//   if (userIdIndex != -1) {
//     save(dataAll);
//     imp ? "" : alert("Contact Added Successfull");
//     return true;
//   }
//   return true;
// }
// //display contacts of  selected user
// export function getUserContactsById(userId) {
//   const allUser = getAllUser();
//   const userIdIndex = allUser.findIndex((dt) => dt.userId == userId);
//   if (userIdIndex != -1) {
//     const record = allUser[userIdIndex];
//     return record;
//   } else {
//     return false;
//   }
// }
// //data get one contact
// export function getContactById(contactId) {
//   const userId = getLoginUserId().userId;
//   const allContacts = getUserContactsById(userId).contactList;
//   const contactIdIndex = allContacts.findIndex(
//     (contact) => contact.contactId == contactId
//   );
//   if (contactIdIndex != -1) {
//     const contact = allContacts[contactIdIndex];
//     return contact;
//   } else {
//     return false;
//   }
// }

// export function updateContact(contactData) {
//   const allUser = getAllUser();
//   const userId = getLoginUserId().userId;
//   const userIndex = allUser.findIndex((user) => user.userId == userId);
//   //for updating contact
//   const contactIdIndex = allUser[userIndex].contactList.findIndex(
//     (contact) => contact.contactId == contactData.contactId
//   );
//   if (contactIdIndex != -1) {
//     allUser[userIndex].contactList.splice(contactIdIndex, 1, contactData);
//     save(allUser);
//     alert("Update Successfull");
//   }
// }
// export function deleteContact(contactId) {
//   const allUser = getAllUser();
//   const userId = getLoginUserId().userId;
//   const userIndex = allUser.findIndex((user) => user.userId == userId);
//   //for updating contact
//   const contactIdIndex = allUser[userIndex].contactList.findIndex(
//     (contact) => contact.contactId == contactId
//   );
//   if (contactIdIndex != -1) {
//     allUser[userIndex].contactList.splice(contactIdIndex, 1);
//     save(allUser);
//     // alert("Delete Successfull");
//     return true;
//   } else {
//     alert("!!! Failed ,Something Went Wrong ");
//     return false;
//   }
// }
