console.log("TypeScript Tutorial 01: Chapter 5");


// // Exercise Chapt 5: Object Literal Types (1:07:49)
// export type Mail ={
//   from: string;
//   to: string[];
//   subject: string;
//   body: string;
//   urgent: boolean;
// }

// /// Given:
// export function processMail(mail: Mail) {
//   return `FROM: ${mail.from}
// TO: ${mail.to}
// SUBJECT: ${mail.urgent ? "[URGENT] " : ""}${mail.subject}
// BODY: ${mail.body}`;
// }


// // Exercise Chapt 5: Extra Properties (1:07:49)
// export type Mail = {
//   from: string;
//   to: string[];
//   cc: string[];
//   subject: string;
//   body: string;
//   urgent: boolean;
// };

// // don't touch below this line

// export function processMail(mail: Mail) {
//   return `FROM: ${mail.from}
//   TO: ${mail.to.join(", ")}
//   CC: ${mail.cc.join(",")}
//   SUBJECT: ${mail.urgent ? "[URGENT] " : ""}${mail.subject}
//   BODY: ${mail.body}
//   `;
// }


// // Exercise Chapt 5: Optional Object Properties
// export type Mail = {
//   from: string;
//   to: string[];
//   subject: string;
//   body: string;
//   urgent: boolean;
//   cc?: string[];
// };

// // don't touch below this line

// export function processMail(mail: Mail) {
//   return `FROM: ${mail.from}
// TO: ${mail.to}${!mail.cc ? "" : "\nCC: " + mail.cc}
// SUBJECT: ${mail.urgent ? "[URGENT] " : ""}${mail.subject}
// BODY: ${mail.body}`;
// }

// // Exercise Chapt 5: Dynamic Keys

// export type MailPreferences = {
//   [key:string]: boolean;
// };

// // don't touch below this line

// export function setPreference(
//   preferences: MailPreferences,
//   key: string,
//   value: boolean,
// ) {
//   const exists = key in preferences;
//   preferences[key] = value;
//   return exists;
// }

// Exercise Chapt 5: Dynamic Default Properties
export type MailPreferences = {
  doNotDisturb: boolean;
  outOfOffice: boolean;
  [key:string]: boolean | string;
};

// don't touch below this line

export function canContact(preferences: MailPreferences): boolean {
  return !(preferences.doNotDisturb || preferences.outOfOffice);
}

