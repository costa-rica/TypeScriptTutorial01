// ===== Minimal test harness (replace the ./unit_test import with this block) =====

// Toggle submit-only tests with an env var: SUBMIT=true npx ts-node src/main_test.ts
export const withSubmit: boolean = process.env.SUBMIT === "true";

// Simple assert implementation (subset of Node's assert.strictEqual)
export const assert = {
  strictEqual(actual: unknown, expected: unknown, message?: string) {
    // Use Object.is for precise equality (handles NaN)
    if (!Object.is(actual, expected)) {
      const err = new Error(
        message ??
          `Assertion failed: expected\n${String(expected)}\n=== actual\n${String(
            actual
          )}`
      );
      // Add a code property to mimic Node's assert style
      // @ts-ignore
      err.code = "ERR_ASSERTION";
      throw err;
    }
  },
};

type TestFn = () => void | Promise<void>;

let total = 0;
let passed = 0;

export function describe(title: string, fn: () => void | Promise<void>) {
  console.log(`\n=== ${title} ===`);
  try {
    const res = fn();
    if (res instanceof Promise) {
      // If you end up using async tests later:
      res.then(
        () => void 0,
        (e) => {
          console.error(`Unhandled error in describe("${title}"):\n`, e);
          process.exitCode = 1;
        }
      );
    }
  } catch (e) {
    console.error(`Unhandled error in describe("${title}"):\n`, e);
    process.exitCode = 1;
  } finally {
    // Summary is printed after each describe block completes
    // (Your suite is synchronous; this is fine.)
  }
}

export function it(name: string, fn: TestFn) {
  total++;
  try {
    const result = fn();
    if (result instanceof Promise) {
      // Minimal async support — wait synchronously is not possible; mark as error.
      throw new Error(
        'Async tests not supported by this minimal runner. Remove "async" or return a Promise.'
      );
    }
    console.log(`✔ ${name}`);
    passed++;
  } catch (e) {
    console.error(`✘ ${name}`);
    console.error(e);
    // mark failure via exit code at the end
    process.exitCode = 1;
  }
}

// Print a summary when Node is exiting
process.on("exit", () => {
  const failed = total - passed;
  console.log(`\nSummary: ${passed}/${total} passed, ${failed} failed`);
  if (failed > 0) {
    // non-zero exit code already set by it()
  }
});

// =========================================
// ===== Your actual tests start below =====
// =========================================


// // Exercise Chapt 5: Object Literal Types (1:07:49)
// import { processMail, Mail } from "./index";

// describe("processMail", () => {
//   const runCases = [
//     {
//       mail: {
//         from: "dan@support.ai",
//         to: ["rock@example.com", "star@example.com"],
//         subject: "Re: vim",
//         body: "Enable vim mode in settings",
//         urgent: false,
//       } as Mail,
//       expected: `FROM: dan@support.ai
// TO: rock@example.com,star@example.com
// SUBJECT: Re: vim
// BODY: Enable vim mode in settings`,
//     },
//   ];

//   const submitCases = runCases.concat([
//     {
//       mail: {
//         from: "hunter@support.ai",
//         to: ["yourmajesty@example.com", "beast@example.com"],
//         subject: "Stolen Karma",
//         body: "Your karma was stolen by a sarcastic llama",
//         urgent: true,
//       } as Mail,
//       expected: `FROM: hunter@support.ai
// TO: yourmajesty@example.com,beast@example.com
// SUBJECT: [URGENT] Stolen Karma
// BODY: Your karma was stolen by a sarcastic llama`,
//     },
//   ]);

//   let testCases = runCases;
//   if (withSubmit) {
//     testCases = submitCases;
//   }

//   for (let i = 0; i < testCases.length; i++) {
//     const { mail, expected } = testCases[i];
//     it(`Test ${i}`, () => {
//       const result = processMail(mail);
//       console.log("Expected:");
//       console.log(expected);
//       console.log("");
//       console.log("Actual:");
//       console.log(result);
//       assert.strictEqual(result, expected);
//     });
//     console.log("---------------------------------");
//   }

//   const numSkipped = submitCases.length - testCases.length;
//   if (numSkipped > 0) {
//     console.log(`- Skip: ${numSkipped} test case(s) for submit`);
//   }
// });


// // // Exercise Chapt 5:Extra Properties
// import { processMail, Mail } from "./index";
// describe("processMail", () => {
//     const runCases = [
//       {
//         mail: {
//           from: "allan@support.ai",
//           to: ["pear2pear@example.com", "baker@example.com"],
//           subject: "Salmon delivery",
//           body: "We need more salmon or else",
//           urgent: true,
//           cc: ["ballan@support.ai", "boots@support.ai"],
//         },
//         expected: `FROM: allan@support.ai
//   TO: pear2pear@example.com, baker@example.com
//   CC: ballan@support.ai,boots@support.ai
//   SUBJECT: [URGENT] Salmon delivery
//   BODY: We need more salmon or else`,
//       },
//     ];
  
//     const submitCases = runCases.concat([
//       {
//         mail: {
//           from: "waseem@support.ai",
//           to: ["david@example.com"],
//           subject: "llama llama",
//           body: "LLAMA llama llama llama",
//           urgent: false,
//           cc: ["hunter@support.ai", "lane@support.ai"],
//         },
//         expected: `FROM: waseem@support.ai
//   TO: david@example.com
//   CC: hunter@support.ai,lane@support.ai
//   SUBJECT: llama llama
//   BODY: LLAMA llama llama llama`,
//       },
//     ]);
  
//     let testCases = runCases;
//     if (withSubmit) {
//       testCases = submitCases;
//     }
  
//     for (let i = 0; i < testCases.length; i++) {
//       const { mail, expected } = testCases[i];
//       it(`Test ${i}`, () => {
//         const actual = processMail({
//           from: mail.from,
//           to: mail.to,
//           subject: mail.subject,
//           body: mail.body,
//           urgent: mail.urgent,
//           cc: mail.cc,
//         });
//         console.log("Expected:");
//         console.log(expected);
//         console.log("");
//         console.log("Actual:");
//         console.log(actual);
//         assert.strictEqual(actual, expected);
//       });
//       console.log("---------------------------------");
//     }
  
//     const numSkipped = submitCases.length - testCases.length;
//     if (numSkipped > 0) {
//       console.log(`- Skip: ${numSkipped} test case(s) for submit`);
//     }
//   });

// // Exerciese Chapt 5: Optional Object Properties
// import { processMail, Mail } from "./index";

// describe("processMail", () => {
//   const runCases = [
//     {
//       mail: {
//         from: "winston@support.ai",
//         to: ["captainfalcon@example.com", "laughinglast@example.com"],
//         subject: "The Gathering",
//         body: "The magical nexus has begun",
//         urgent: true,
//       } as Mail,
//       expected: `FROM: winston@support.ai
// TO: captainfalcon@example.com,laughinglast@example.com
// SUBJECT: [URGENT] The Gathering
// BODY: The magical nexus has begun`,
//     },
//   ];

//   const submitCases = runCases.concat([
//     {
//       mail: {
//         from: "dan.g@support.ai",
//         to: ["dan.h@example.com"],
//         subject: "Beach weather",
//         body: "bring your sunscreen and flip flops",
//         urgent: false,
//         cc: ["waseem@support.ai", "alex@support.ai"],
//       } as Mail,
//       expected: `FROM: dan.g@support.ai
// TO: dan.h@example.com
// CC: waseem@support.ai,alex@support.ai
// SUBJECT: Beach weather
// BODY: bring your sunscreen and flip flops`,
//     },
//   ]);

//   let testCases = runCases;
//   if (withSubmit) {
//     testCases = submitCases;
//   }

//   for (let i = 0; i < testCases.length; i++) {
//     const { mail, expected } = testCases[i];
//     it(`Test ${i}`, () => {
//       let result = "";
//       if (!!mail.cc) {
//         result = processMail({
//           from: mail.from,
//           to: mail.to,
//           subject: mail.subject,
//           body: mail.body,
//           urgent: mail.urgent,
//           cc: mail.cc,
//         });
//       } else {
//         result = processMail({
//           from: mail.from,
//           to: mail.to,
//           subject: mail.subject,
//           body: mail.body,
//           urgent: mail.urgent,
//         });
//       }
//       console.log("Expected:");
//       console.log(expected);
//       console.log("");
//       console.log("Actual:");
//       console.log(result);
//       assert.strictEqual(result, expected);
//     });
//     console.log("---------------------------------");
//   }

//   const numSkipped = submitCases.length - testCases.length;
//   if (numSkipped > 0) {
//     console.log(`- Skip: ${numSkipped} test case(s) for submit`);
//   }
// });

// // Chapt 5: Dynamic Keys
// import { MailPreferences, setPreference } from "./index";

// describe("setPreference", () => {
//   const runCases: {
//     preferences: MailPreferences;
//     key: string;
//     value: boolean;
//     expected: boolean;
//   }[] = [
//     {
//       preferences: {
//         darkMode: true,
//         outOfOffice: true,
//         doNotDisturb: true,
//       },
//       key: "darkMode",
//       value: false,
//       expected: true,
//     },
//     {
//       preferences: {
//         outOfOffice: false,
//         doNotDisturb: true,
//       },
//       key: "autoReply",
//       value: true,
//       expected: false,
//     },
//   ];

//   const submitCases = runCases.concat([
//     {
//       preferences: {},
//       key: "markUnread",
//       value: true,
//       expected: false,
//     },
//     {
//       preferences: {
//         attachSignature: true,
//         formatOnSave: true,
//       },
//       key: "formatOnSave",
//       value: false,
//       expected: true,
//     },
//   ]);

//   let testCases = runCases;
//   if (withSubmit) {
//     testCases = submitCases;
//   }

//   for (let i = 0; i < testCases.length; i++) {
//     const { preferences, key, value, expected } = testCases[i];
//     it(`Test ${i}`, () => {
//       console.log("Inputs:");
//       console.log("- Mail Preferences:");
//       for (const pref in preferences) {
//         console.log(`  - ${pref}: ${preferences[pref]}`);
//       }
//       console.log("- Key:", key);
//       const result = setPreference(preferences, key, value);
//       console.log("- Value:", value);
//       console.log("Expected:", expected);
//       console.log("Actual:  ", result);
//       assert.strictEqual(result, expected);
//     });
//     console.log("---------------------------------");
//   }

//   const numSkipped = submitCases.length - testCases.length;
//   if (numSkipped > 0) {
//     console.log(`- Skip: ${numSkipped} test case(s) for submit`);
//   }
// });


// Exercise Chapt 5: Dynamic Default Properties
import { MailPreferences, canContact } from "./index";

describe("canContact", () => {
  const runCases: {
    preferences: MailPreferences;
    expected: boolean;
  }[] = [
    {
      preferences: {
        doNotDisturb: false,
        outOfOffice: false,
        theme: "dark",
      },
      expected: true,
    },
    {
      preferences: {
        doNotDisturb: true,
        outOfOffice: false,
        delayDelivery: true,
      },
      expected: false,
    },
  ];

  const submitCases = runCases.concat([
    {
      preferences: {
        doNotDisturb: false,
        outOfOffice: true,
        formatOnSave: true,
      },
      expected: false,
    },
    {
      preferences: {
        doNotDisturb: true,
        outOfOffice: true,
        signature: "Miss All-Sunday",
      },
      expected: false,
    },
  ]);

  let testCases = runCases;
  if (withSubmit) {
    testCases = submitCases;
  }

  for (let i = 0; i < testCases.length; i++) {
    const { preferences, expected } = testCases[i];
    it(`Test ${i}`, () => {
      console.log("Inputs:");
      console.log("- Mail Preferences:");
      for (const pref in preferences) {
        console.log(`  - ${pref}: ${preferences[pref]}`);
      }
      const result = canContact(preferences);
      console.log("Expected:", expected);
      console.log("Actual:  ", result);
      assert.strictEqual(result, expected);
    });
    console.log("---------------------------------");
  }

  const numSkipped = submitCases.length - testCases.length;
  if (numSkipped > 0) {
    console.log(`- Skip: ${numSkipped} test case(s) for submit`);
  }
});
